param()

$ErrorActionPreference = "Stop"

function Invoke-Git {
    param(
        [Parameter(Mandatory = $true)]
        [string[]] $Arguments,

        [Parameter(Mandatory = $true)]
        [string] $WorkingDirectory
    )

    try {
        $output = & git -C $WorkingDirectory @Arguments 2>$null
        if ($LASTEXITCODE -ne 0) {
            return $null
        }

        return $output
    }
    catch {
        return $null
    }
}

function Get-FirstOrUnknown {
    param([object] $Value)

    if ($null -eq $Value) {
        return "UNKNOWN"
    }

    $text = @($Value | Where-Object { $_ -ne $null -and "$_".Trim() -ne "" }) | Select-Object -First 1
    if ($null -eq $text) {
        return "UNKNOWN"
    }

    return "$text".Trim()
}

function Fail-Critical {
    param([Parameter(Mandatory = $true)][string] $Message)

    Write-Error "CRITICAL: $Message"
    exit 1
}

function Get-WorkingTreeStatus {
    param(
        [Parameter(Mandatory = $true)]
        [string] $WorkingDirectory
    )

    try {
        $output = & git -C $WorkingDirectory status --porcelain 2>$null
        if ($LASTEXITCODE -ne 0) {
            return "UNKNOWN"
        }

        if ($null -eq $output -or @($output).Count -eq 0) {
            return "CLEAN"
        }

        return "DIRTY"
    }
    catch {
        return "UNKNOWN"
    }
}

function Get-AheadBehindStatus {
    param(
        [Parameter(Mandatory = $true)]
        [string] $WorkingDirectory
    )

    $counts = Invoke-Git -Arguments @("rev-list", "--left-right", "--count", "origin/main...HEAD") -WorkingDirectory $WorkingDirectory
    $line = Get-FirstOrUnknown $counts
    if ($line -eq "UNKNOWN") {
        return "UNKNOWN"
    }

    if ($line -match "^(?<left>\d+)\s+(?<right>\d+)$") {
        return "$($Matches.left) / $($Matches.right)"
    }

    return "UNKNOWN"
}

function Get-KeyValueFields {
    param(
        [Parameter(Mandatory = $true)]
        [AllowEmptyString()]
        [string[]] $Lines
    )

    $fields = [ordered]@{}
    foreach ($line in $Lines) {
        $trimmed = "$line".Trim()
        if ($trimmed -match "^(?<name>[^:]+):\s*(?<value>.*)$") {
            $fields[$Matches.name.Trim()] = $Matches.value.Trim()
        }
    }

    return $fields
}

function Get-SessionStateSnapshot {
    param(
        [Parameter(Mandatory = $true)]
        [string] $SessionStatePath
    )

    if (-not (Test-Path -LiteralPath $SessionStatePath)) {
        Fail-Critical "Session State file not found: $SessionStatePath"
    }

    $lines = Get-Content -LiteralPath $SessionStatePath -Encoding utf8
    $inCodeBlock = $false
    $snapshotStart = -1

    for ($i = 0; $i -lt $lines.Count; $i++) {
        $trimmed = "$($lines[$i])".Trim()
        if ($trimmed.StartsWith('```')) {
            $inCodeBlock = -not $inCodeBlock
            continue
        }

        if (-not $inCodeBlock -and $trimmed -eq "SPS OS Session State") {
            $snapshotStart = $i
        }
    }

    if ($snapshotStart -lt 0) {
        Fail-Critical "Deterministic Session State snapshot not found."
    }

    $snapshotLines = New-Object System.Collections.Generic.List[string]
    $nextSafeStepCount = 0

    for ($i = $snapshotStart + 1; $i -lt $lines.Count; $i++) {
        $trimmed = "$($lines[$i])".Trim()
        if ($trimmed -eq "" ) {
            continue
        }

        if ($trimmed.StartsWith("#") -or $trimmed -eq "---" -or $trimmed.StartsWith('```')) {
            break
        }

        if ($trimmed -like "Next Safe Step:*") {
            $nextSafeStepCount++
        }

        $snapshotLines.Add($trimmed)
    }

    $fields = Get-KeyValueFields -Lines $snapshotLines.ToArray()

    return @{
        Fields = $fields
        NextSafeStepCount = $nextSafeStepCount
    }
}

function Get-RequiredField {
    param(
        [Parameter(Mandatory = $true)]
        [hashtable] $Fields,

        [Parameter(Mandatory = $true)]
        [string] $FieldName
    )

    if (-not $Fields.Contains($FieldName)) {
        Fail-Critical "Required field missing: $FieldName"
    }

    $value = "$($Fields[$FieldName])".Trim()
    if ($value -eq "" -or $value -eq "UNKNOWN") {
        Fail-Critical "Required field is empty or UNKNOWN: $FieldName"
    }

    return $value
}

function Get-DocumentFields {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Path
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        Fail-Critical "Required document not found: $Path"
    }

    $lines = Get-Content -LiteralPath $Path -Encoding utf8
    return Get-KeyValueFields -Lines $lines
}

function Test-CommitExists {
    param(
        [Parameter(Mandatory = $true)]
        [string] $WorkingDirectory,

        [Parameter(Mandatory = $true)]
        [string] $Commit
    )

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = New-Object System.Diagnostics.ProcessStartInfo
    $process.StartInfo.FileName = "git"
    $process.StartInfo.Arguments = "-C `"$WorkingDirectory`" cat-file -e `"$Commit`^{commit}`""
    $process.StartInfo.UseShellExecute = $false
    $process.StartInfo.RedirectStandardOutput = $true
    $process.StartInfo.RedirectStandardError = $true
    $process.StartInfo.CreateNoWindow = $true
    try {
        [void]$process.Start()
        $process.WaitForExit()
        return ($process.ExitCode -eq 0)
    }
    finally {
        $process.Dispose()
    }
}

function Test-IsAncestorCommit {
    param(
        [Parameter(Mandatory = $true)]
        [string] $WorkingDirectory,

        [Parameter(Mandatory = $true)]
        [string] $Commit
    )

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = New-Object System.Diagnostics.ProcessStartInfo
    $process.StartInfo.FileName = "git"
    $process.StartInfo.Arguments = "-C `"$WorkingDirectory`" merge-base --is-ancestor $Commit HEAD"
    $process.StartInfo.UseShellExecute = $false
    $process.StartInfo.RedirectStandardOutput = $true
    $process.StartInfo.RedirectStandardError = $true
    $process.StartInfo.CreateNoWindow = $true
    try {
        [void]$process.Start()
        $process.WaitForExit()
        return ($process.ExitCode -eq 0)
    }
    finally {
        $process.Dispose()
    }
}

$scriptRoot = Split-Path -Parent $PSCommandPath
$candidateRoot = Split-Path -Parent $scriptRoot
$gitRoot = Invoke-Git -Arguments @("rev-parse", "--show-toplevel") -WorkingDirectory $candidateRoot
$repoRoot = Get-FirstOrUnknown $gitRoot

if ($repoRoot -eq "UNKNOWN") {
    $repoRoot = $candidateRoot
}

$repoRoot = (Resolve-Path -LiteralPath $repoRoot).Path
$generatedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss zzz")

$sessionStatePath = Join-Path $repoRoot "docs\10_SESSION_STATE.md"
$sessionState = Get-SessionStateSnapshot -SessionStatePath $sessionStatePath
$sessionFields = $sessionState.Fields

$requiredSummaryFields = @(
    "Date",
    "Current Session ID",
    "Current Chat Title",
    "Next Session ID",
    "Suggested Next Chat Title",
    "Active Capability",
    "Active Work Item",
    "Current Mode",
    "Current Product Milestone",
    "Latest Completed Capability Item",
    "Verification Status",
    "Blockers",
    "Open Risks",
    "Next Safe Step",
    "Repository Branch",
    "Repository Working Tree State",
    "Latest Verified Commit"
)

foreach ($fieldName in $requiredSummaryFields) {
    [void](Get-RequiredField -Fields $sessionFields -FieldName $fieldName)
}

if ($sessionState.NextSafeStepCount -ne 1) {
    Fail-Critical "Next Safe Step must appear exactly once in the Session State snapshot."
}

$currentSessionId = Get-RequiredField -Fields $sessionFields -FieldName "Current Session ID"
$currentChatTitle = Get-RequiredField -Fields $sessionFields -FieldName "Current Chat Title"
$nextSessionId = Get-RequiredField -Fields $sessionFields -FieldName "Next Session ID"
$suggestedNextChatTitle = Get-RequiredField -Fields $sessionFields -FieldName "Suggested Next Chat Title"
$activeCapability = Get-RequiredField -Fields $sessionFields -FieldName "Active Capability"
$activeWorkItem = Get-RequiredField -Fields $sessionFields -FieldName "Active Work Item"
$currentMode = Get-RequiredField -Fields $sessionFields -FieldName "Current Mode"
$currentProductMilestone = Get-RequiredField -Fields $sessionFields -FieldName "Current Product Milestone"
$latestCompletedCapabilityItem = Get-RequiredField -Fields $sessionFields -FieldName "Latest Completed Capability Item"
$verificationStatus = Get-RequiredField -Fields $sessionFields -FieldName "Verification Status"
$blockers = Get-RequiredField -Fields $sessionFields -FieldName "Blockers"
$openRisks = Get-RequiredField -Fields $sessionFields -FieldName "Open Risks"
$nextSafeStep = Get-RequiredField -Fields $sessionFields -FieldName "Next Safe Step"
$expectedBranch = Get-RequiredField -Fields $sessionFields -FieldName "Repository Branch"
$expectedWorkingTree = Get-RequiredField -Fields $sessionFields -FieldName "Repository Working Tree State"
$latestVerifiedCommit = Get-RequiredField -Fields $sessionFields -FieldName "Latest Verified Commit"
$sessionDate = Get-RequiredField -Fields $sessionFields -FieldName "Date"

$branch = Get-FirstOrUnknown (Invoke-Git -Arguments @("branch", "--show-current") -WorkingDirectory $repoRoot)
$workingTreeStatus = Get-WorkingTreeStatus -WorkingDirectory $repoRoot
$aheadBehind = Get-AheadBehindStatus -WorkingDirectory $repoRoot
$packageHead = Get-FirstOrUnknown (Invoke-Git -Arguments @("rev-parse", "HEAD") -WorkingDirectory $repoRoot)
$latestCommit = Get-FirstOrUnknown (Invoke-Git -Arguments @("log", "-1", "--oneline", "--decorate") -WorkingDirectory $repoRoot)
$recentCommits = Invoke-Git -Arguments @("log", "--oneline", "--decorate", "-n", "10") -WorkingDirectory $repoRoot

if ($null -eq $recentCommits -or @($recentCommits).Count -eq 0) {
    $recentCommits = @("UNKNOWN")
}

if ($branch -ne $expectedBranch) {
    Fail-Critical "Repository branch '$branch' does not match Session State '$expectedBranch'."
}

if ($workingTreeStatus -ne $expectedWorkingTree) {
    Fail-Critical "Working tree state '$workingTreeStatus' does not match Session State '$expectedWorkingTree'."
}

if (-not (Test-CommitExists -WorkingDirectory $repoRoot -Commit $latestVerifiedCommit)) {
    Fail-Critical "Latest verified commit '$latestVerifiedCommit' does not exist in the repository."
}

if (-not (Test-IsAncestorCommit -WorkingDirectory $repoRoot -Commit $latestVerifiedCommit)) {
    Fail-Critical "Latest verified commit '$latestVerifiedCommit' is not an ancestor of Package HEAD '$packageHead'."
}

$handoffFileName = "{0}_{1}_SESSION_HANDOFF.md" -f $sessionDate, $currentSessionId
$handoffPath = Join-Path $repoRoot ("docs\session-handoffs\" + $handoffFileName)
$handoffFields = Get-DocumentFields -Path $handoffPath

$handoffCurrentSessionId = Get-RequiredField -Fields $handoffFields -FieldName "Current Session ID"
$handoffCurrentChatTitle = Get-RequiredField -Fields $handoffFields -FieldName "Current Chat Title"
$handoffNextSessionId = Get-RequiredField -Fields $handoffFields -FieldName "Next Session ID"
$handoffSuggestedNextChatTitle = Get-RequiredField -Fields $handoffFields -FieldName "Suggested Next Chat Title"
$handoffNextSafeStep = Get-RequiredField -Fields $handoffFields -FieldName "Next Safe Step"

if ($handoffCurrentSessionId -ne $currentSessionId) {
    Fail-Critical "Handoff Current Session ID does not match Session State."
}

if ($handoffCurrentChatTitle -ne $currentChatTitle) {
    Fail-Critical "Handoff Current Chat Title does not match Session State."
}

if ($handoffNextSessionId -ne $nextSessionId) {
    Fail-Critical "Handoff Next Session ID does not match Session State."
}

if ($handoffSuggestedNextChatTitle -ne $suggestedNextChatTitle) {
    Fail-Critical "Handoff Suggested Next Chat Title does not match Session State."
}

if ($handoffNextSafeStep -ne $nextSafeStep) {
    Fail-Critical "Handoff Next Safe Step does not match Session State."
}

$gitContextPath = Join-Path $repoRoot "sps-git-context.txt"
$sessionSummaryPath = Join-Path $repoRoot "sps-session-summary.txt"
$zipPath = Join-Path $repoRoot "sps-session.zip"
$currentHandoffPath = Resolve-Path -LiteralPath $handoffPath -Relative

$gitContext = @(
    "Generated at:"
    $generatedAt
    ""
    "Branch:"
    $branch
    ""
    "Working tree status:"
    $workingTreeStatus
    ""
    "Ahead / behind status:"
    $aheadBehind
    ""
    "Latest commit:"
    $latestCommit
    ""
    "Recent commits:"
) + @($recentCommits)

$sessionSummary = @(
    "Generated at:"
    $generatedAt
    ""
    "Repository root:"
    $repoRoot
    ""
    "Current Session ID:"
    $currentSessionId
    ""
    "Current Chat Title:"
    $currentChatTitle
    ""
    "Next Session ID:"
    $nextSessionId
    ""
    "Suggested Next Chat Title:"
    $suggestedNextChatTitle
    ""
    "Active Capability:"
    $activeCapability
    ""
    "Active Work Item:"
    $activeWorkItem
    ""
    "Current Mode:"
    $currentMode
    ""
    "Current Product Milestone:"
    $currentProductMilestone
    ""
    "Latest Completed Capability Item:"
    $latestCompletedCapabilityItem
    ""
    "Verification Status:"
    $verificationStatus
    ""
    "Blockers:"
    $blockers
    ""
    "Open Risks:"
    $openRisks
    ""
    "Repository Branch:"
    $branch
    ""
    "Working Tree State:"
    $workingTreeStatus
    ""
    "Ahead / Behind:"
    $aheadBehind
    ""
    "Latest Verified Commit:"
    $latestVerifiedCommit
    ""
    "Package HEAD:"
    $packageHead
    ""
    "Latest Commit:"
    $latestCommit
    ""
    "Next Safe Step:"
    $nextSafeStep
    ""
    "Current Handoff Path:"
    $currentHandoffPath
    ""
    "Package Consistency:"
    "PASS"
)

$gitContext | Out-File -FilePath $gitContextPath -Encoding utf8 -Force
$sessionSummary | Out-File -FilePath $sessionSummaryPath -Encoding utf8 -Force

$zipItems = New-Object System.Collections.Generic.List[string]
foreach ($relativePath in @("package.json", "tsconfig.json", "src", "docs", "sps-git-context.txt", "sps-session-summary.txt")) {
    $path = Join-Path $repoRoot $relativePath
    if (Test-Path -LiteralPath $path) {
        $zipItems.Add($path)
    }
}

Get-ChildItem -LiteralPath $repoRoot -Filter "next.config.*" -File -ErrorAction SilentlyContinue |
    ForEach-Object { $zipItems.Add($_.FullName) }

if (Test-Path -LiteralPath $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -LiteralPath $zipItems.ToArray() -DestinationPath $zipPath -Force

Write-Host "SPS session package generated."
Write-Host "Repository root: $repoRoot"
Write-Host "Branch: $branch"
Write-Host "Working tree status: $workingTreeStatus"
Write-Host "Latest commit: $latestCommit"
Write-Host "Current Session ID: $currentSessionId"
Write-Host "Next Session ID: $nextSessionId"
Write-Host "Current handoff path: $currentHandoffPath"
Write-Host "Package Consistency: PASS"
Write-Host "Generated files:"
Write-Host "- $gitContextPath"
Write-Host "- $sessionSummaryPath"
Write-Host "- $zipPath"
Write-Host "ZIP path: $zipPath"
