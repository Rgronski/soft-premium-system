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

    return "$text"
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

        if (@($output).Count -eq 0) {
            return "CLEAN"
        }

        return "DIRTY"
    }
    catch {
        return "UNKNOWN"
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

$branch = Get-FirstOrUnknown (Invoke-Git -Arguments @("branch", "--show-current") -WorkingDirectory $repoRoot)
$statusBranch = Invoke-Git -Arguments @("status", "--short", "--branch") -WorkingDirectory $repoRoot
$latestCommit = Get-FirstOrUnknown (Invoke-Git -Arguments @("log", "-1", "--oneline", "--decorate") -WorkingDirectory $repoRoot)
$recentCommits = Invoke-Git -Arguments @("log", "--oneline", "--decorate", "-n", "10") -WorkingDirectory $repoRoot

$workingTreeStatus = Get-WorkingTreeStatus -WorkingDirectory $repoRoot

$aheadBehind = "UNKNOWN"
if ($null -ne $statusBranch) {
    $branchLine = @($statusBranch) | Select-Object -First 1
    if ($branchLine -match "\[(.+)\]") {
        $aheadBehind = $Matches[1]
    }
    elseif ($branchLine -match "^##\s+\S+$") {
        $aheadBehind = "none"
    }
}

if ($null -eq $recentCommits -or @($recentCommits).Count -eq 0) {
    $recentCommits = @("UNKNOWN")
}

$handoffDir = Join-Path $repoRoot "docs\session-handoffs"
$latestHandoff = "UNKNOWN"
if (Test-Path -LiteralPath $handoffDir) {
    $handoff = Get-ChildItem -LiteralPath $handoffDir -Filter "*_SESSION_HANDOFF.md" -File -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if ($null -ne $handoff) {
        $latestHandoff = Resolve-Path -LiteralPath $handoff.FullName -Relative
    }
}

$gitContextPath = Join-Path $repoRoot "sps-git-context.txt"
$sessionSummaryPath = Join-Path $repoRoot "sps-session-summary.txt"
$zipPath = Join-Path $repoRoot "sps-session.zip"

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

$gitContext | Out-File -FilePath $gitContextPath -Encoding utf8 -Force

$sessionSummary = @(
    "Generated at:"
    $generatedAt
    ""
    "Repository root:"
    $repoRoot
    ""
    "Active capability:"
    "UNKNOWN"
    ""
    "Active work item:"
    "UNKNOWN"
    ""
    "Latest completed capability item:"
    "UNKNOWN"
    ""
    "Current mode:"
    "UNKNOWN"
    ""
    "Repository state:"
    $workingTreeStatus
    ""
    "Branch:"
    $branch
    ""
    "Latest commit:"
    $latestCommit
    ""
    "Recent commits:"
) + @($recentCommits) + @(
    ""
    "Next safe step:"
    "UNKNOWN"
    ""
    "Latest handoff path:"
    $latestHandoff
)

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
Write-Host "Generated files:"
Write-Host "- $gitContextPath"
Write-Host "- $sessionSummaryPath"
Write-Host "- $zipPath"
Write-Host "ZIP path: $zipPath"
