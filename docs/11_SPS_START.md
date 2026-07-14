# 11_SPS_START

---

# One Command Startup

The official one-command startup protocol for new SPS OS sessions is:

`SPS OS — START`

When this command is used, the assistant must treat it as a strict bootstrap trigger, not as a normal conversational prompt.

Mandatory behavior:

* If the assistant has no verified repo access, it must immediately enter ZIP Mode.
* It must not claim PCL is complete from memory.
* It must not use previous chat memory as SSOT.
* It must not say "ready to continue" before full bootstrap is complete.
* It must provide exact PowerShell ZIP commands.
* It must ask only for `C:\Users\p700\sps-session.zip`.
* After ZIP upload, it must complete PCL, SSOT Validation, Active Branch Validation, Roadmap Summary, Recommendation, and Next Safe Step.

Forbidden startup responses:

* "Project Context loaded from previous conversation"
* "Bootstrap completed from memory"
* "Send any project files"
* "I am ready to continue"

# Purpose

SPS_START is the launcher for SPS OS sessions.

Its purpose is to define the correct entry mode before Project Context Loader begins.

SPS_START is operational.

It does not replace SPDM.

It does not replace `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.

---

# SPS OS Runtime Command Rules

SPS OS commands are system runtime commands and must not be interpreted casually.

## SPS OS — START

`SPS OS — START`:

* is a system runtime command,
* starts repository access mode selection,
* starts full bootstrap,
* requires SPDM and `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`,
* must not end with a readiness declaration only,
* may activate runtime only after required bootstrap gates pass.

## SPS OS — KONIEC

`SPS OS — KONIEC`:

* is a system runtime command,
* starts or enforces Session Close Protocol,
* is not a casual statement that the conversation is ending,
* does not automatically mean:
  * `Session runtime: CLOSED`
  * `Session Close PASS`
  * `Session closed`

Immediately after command recognition, the required state is:

* `Session Close Protocol: REQUIRED`
* `Session runtime: CLOSURE PENDING`

After procedure start, the required state is:

* `Session Close Protocol: IN PROGRESS`
* `Session runtime: CLOSURE PENDING`

Final state may be declared only after full protocol evidence is `PASS`:

* `Session Close Protocol: PASS`
* `Session runtime: CLOSED`

---

# Session Modes

## 1. Workspace Mode

Use Workspace Mode when the assistant has direct access to the local repository.

In this mode, continue with Project Context Loader using the local project files.

---

## 2. ZIP Mode

Use ZIP Mode when the assistant does not have access to the local repository.

In this mode, immediately ask only for `C:\Users\p700\sps-session.zip` and provide these exact PowerShell commands:

```powershell
cd C:\Users\p700\soft-premium-system

@(
  "Branch:"
  git branch --show-current
  ""
  "Status:"
  git status
  ""
  "Recent commits:"
  git log --oneline --decorate -n 10
) | Out-File -FilePath C:\Users\p700\sps-git-context.txt -Encoding utf8

Compress-Archive -Path `
  C:\Users\p700\sps-git-context.txt, `
  package.json, `
  tsconfig.json, `
  next.config.* , `
  src, `
  docs `
  -DestinationPath C:\Users\p700\sps-session.zip -Force
```

After ZIP upload, continue Project Context Loader according to SPDM and `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.

---

## 3. GitHub Mode

Use GitHub Mode when the assistant can work from an available GitHub repository instead of the local workspace.

In this mode, confirm repository access first and then continue Project Context Loader using the available repository state.

---

# Operating Rule

Always select the session mode first.

After the mode is known, continue with SPDM and `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.

Do not stop after saying "ready to continue".

Complete bootstrap.

---

# Copy-paste Startup Prompt

```text
Continue Soft Premium System in credit-saving mode.

If you do not have direct repository access, start in ZIP Mode.

In ZIP Mode:
- provide exact PowerShell ZIP commands,
- wait for ZIP upload,
- after ZIP, run full Project Context Loader,
- perform SSOT Validation,
- perform Active Branch Validation,
- if ZIP does not contain .git data, ask only for:
  git branch --show-current
  git status
  git log --oneline --decorate -n 10

PowerShell ZIP commands:

cd C:\Users\p700\soft-premium-system

@(
  "Branch:"
  git branch --show-current
  ""
  "Status:"
  git status
  ""
  "Recent commits:"
  git log --oneline --decorate -n 10
) | Out-File -FilePath C:\Users\p700\sps-git-context.txt -Encoding utf8

Compress-Archive -Path `
  C:\Users\p700\sps-git-context.txt, `
  package.json, `
  tsconfig.json, `
  next.config.* , `
  src, `
  docs `
  -DestinationPath C:\Users\p700\sps-session.zip -Force

After ZIP upload, continue with SPDM and docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md.

Return exactly:
1. Status projektu
2. Wynik Integrity Check
3. Roadmap Summary
4. Jedna Recommendation
5. Jeden Next Safe Step
```
