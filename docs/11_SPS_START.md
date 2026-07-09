# 11_SPS_START

---

# Purpose

SPS_START is the launcher for SPS OS sessions.

Its purpose is to define the correct entry mode before Project Context Loader begins.

SPS_START is operational.

It does not replace SPDM.

It does not replace `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.

---

# Session Modes

## 1. Workspace Mode

Use Workspace Mode when the assistant has direct access to the local repository.

In this mode, continue with Project Context Loader using the local project files.

---

## 2. ZIP Mode

Use ZIP Mode when the assistant does not have access to the local repository.

In this mode, immediately ask for a fresh ZIP and provide these PowerShell commands:

```powershell
cd C:\Users\p700\soft-premium-system

git status
git log --oneline --decorate -n 10

Compress-Archive -Path `
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
