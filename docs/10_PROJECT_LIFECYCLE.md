# 10_PROJECT_LIFECYCLE

---

# Document Information

**Document**
10_PROJECT_LIFECYCLE.md

**Purpose**
Define the standard lifecycle for starting, running, and closing Soft Premium System development sessions.

**Owner**
Chief Architect

**Status**
Draft

**Version**
1.0

**Source of Truth**
Yes

**Depends On**
00_PROJECT_BIBLE.md
03_DEVELOPMENT_STANDARD.md
08_CURRENT_STATE.md
09_CHANGELOG.md
AI_CONTEXT.md

**Referenced By**
03_DEVELOPMENT_STANDARD.md
AI_CONTEXT.md

---

# Purpose

This document defines the lifecycle of a Soft Premium System development session.

Its purpose is to make every session predictable, recoverable, and easy to continue in a new AI conversation.

The lifecycle does not replace the Development Standard. It extends it with session start and session close procedures.

---

# Session Lifecycle

Every development session follows this sequence.

```text
Start Session
    ↓
Load Context
    ↓
Verify Project State
    ↓
Work According To Development Standard
    ↓
Verify Work
    ↓
Commit
    ↓
Push
    ↓
Update Documentation
    ↓
Close Session
    ↓
Prepare Next Session Prompt
```

---

# Start Session

A new session begins by loading the current project context.

AI must not assume access to the Product Owner's local filesystem.

If the project is local, AI should ask the Product Owner to upload a ZIP package containing the project or the smallest useful diagnostic subset.

Recommended PowerShell command for a standard session package:

```powershell
cd C:\Users\p700\soft-premium-system

Compress-Archive -Path `
  package.json, `
  tsconfig.json, `
  next.config.* , `
  src, `
  docs `
  -DestinationPath C:\Users\p700\sps-session.zip -Force
```

Fallback PowerShell command for a smaller diagnostic package:

```powershell
cd C:\Users\p700\soft-premium-system

Compress-Archive -Path `
  package.json, `
  src\app, `
  src\components, `
  docs `
  -DestinationPath C:\Users\p700\sps-session-small.zip -Force
```

---

# Load Context

AI must read the documentation in `docs/` before beginning project work.

Required documents:

* `00_PROJECT_BIBLE.md`
* `01_VISION.md`
* `02_ARCHITECTURE.md`
* `03_DEVELOPMENT_STANDARD.md`
* `04_UI_STANDARD.md`
* `05_ROADMAP.md`
* `06_BACKLOG.md`
* `07_DECISIONS.md`
* `08_CURRENT_STATE.md`
* `09_CHANGELOG.md`
* `10_PROJECT_LIFECYCLE.md`
* `10_SESSION_STATE.md`
* `AI_CONTEXT.md`

Documentation remains the Single Source of Truth.

Code inspection may clarify implementation details, but it must not override project documentation silently.

---

# Verify Project State

Before implementation, AI should identify:

* current milestone,
* relevant existing routes and components,
* existing data ownership,
* likely files affected,
* whether documentation and code appear consistent,
* whether the requested work requires Product Owner approval.

If the uploaded project package is incomplete, AI must say so explicitly and limit its conclusions to the available files.

---

# Work According To Development Standard

Product work follows the standard workflow defined in `03_DEVELOPMENT_STANDARD.md`.

Implementation must not begin before diagnosis, review, and scope approval.

Work should remain focused on one intention per session unless the Product Owner explicitly changes the goal.

New ideas unrelated to the active milestone should be parked and revisited only when the Product Owner asks for them.

---

# Close Session

The Product Owner may close a session by writing:

```text
Koniec tego czatu
```

When this command is received, AI performs the Session Close Protocol.

---

# Session Close Protocol

AI should prepare a closing report containing:

1. What was achieved in the session.
2. Which files were changed.
3. Whether changes were verified.
4. Whether documentation was updated.
5. Whether changes were committed.
6. Whether changes were pushed.
7. What could not be confirmed.
8. The next logical step.
9. A ready-to-use prompt for the next chat.

AI must not claim that files were saved, committed, pushed, or verified unless this was actually confirmed.

If AI only worked on an uploaded ZIP copy, it must clearly state that the Product Owner still needs to apply the changes locally.

---

# Next Session Prompt

The closing report should include a prompt that can be pasted into a new chat.

The prompt should include:

* project name,
* current milestone,
* last confirmed state,
* next step,
* required ZIP upload instruction,
* PowerShell commands for creating the ZIP package,
* instruction to load `docs/` as Source of Truth,
* instruction not to implement before diagnosis and scope approval.

---

# Session State Document

`10_SESSION_STATE.md` stores the latest known session state.

It is not a changelog and does not replace `08_CURRENT_STATE.md` or `09_CHANGELOG.md`.

Its purpose is to help the next session resume safely.

---

# Related Documents

| Document                   | Source of Truth                         |
| -------------------------- | --------------------------------------- |
| 03_DEVELOPMENT_STANDARD.md | Product development workflow            |
| 08_CURRENT_STATE.md        | Current product status                  |
| 09_CHANGELOG.md            | Historical completed changes            |
| 10_SESSION_STATE.md        | Latest working session state            |
| AI_CONTEXT.md              | AI operating model and SPS Commands     |
