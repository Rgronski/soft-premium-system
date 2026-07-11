# 16_SESSION_PACKAGE_GENERATOR

---

# Purpose

This document defines the Session Package Generator contract for SPS OS.

The future recommended PowerShell command name is:

```text
New-SpsSession.ps1
```

This document defines the contract only.

Script implementation is a separate step planned for `CAP-002.5b`.

---

# Relation To SPS OS — KONIEC

`SPS OS — KONIEC` closes the session, audits facts, updates Session State, prepares Session Handoff, and may prepare a session package for the next chat.

The generator supports the close protocol by collecting confirmed context into a portable package.

---

# Relation To SPS OS — START

`SPS OS — START` may use the session package as input for the next bootstrap.

The package supports bootstrap, but it does not replace PCL, SSOT Validation, Git Context validation, or Runtime Dashboard rules.

---

# Relation To Session Audit

Session Audit checks what is known, unknown, blocked, verified, or not verified.

The generator may collect audit-related outputs only after they exist as confirmed session evidence.

---

# Relation To Session State

Session State remains the source operational snapshot.

The generator may summarize Session State into `sps-session-summary.txt`.

The generator must not invent missing state.

---

# Relation To Session Handoff

Session Handoff remains the transfer package for the next chat.

The generator may include the latest session handoff if available.

The generator must not rewrite handoff content.

---

# Core Rule

The generator does not decide what is true about the project.

The generator only collects confirmed project context into a package.

---

# Forbidden Behavior

The generator must not:

* interpret roadmap status,
* invent project state,
* change documentation,
* change source code,
* resolve SSOT conflicts,
* perform architecture decisions,
* commit changes,
* push to origin,
* run implementation tasks.

---

# Allowed Collection

The generator may collect:

* `package.json`,
* `tsconfig.json`,
* `next.config.*`,
* `src`,
* `docs`,
* `sps-git-context.txt`,
* `sps-session-summary.txt`,
* latest session handoff if available.

---

# Expected Generated Files

## sps-git-context.txt

`sps-git-context.txt` should contain:

* branch,
* working tree status,
* ahead / behind status,
* latest commit,
* recent commits,
* timestamp of generation.

## sps-session-summary.txt

`sps-session-summary.txt` should contain:

* active capability,
* active work item,
* latest completed capability item,
* current mode,
* repository state,
* next safe step,
* link/path to latest handoff if available.

---

# Expected ZIP Output

The expected ZIP output is:

```text
sps-session.zip
```

---

# Bootstrap Consumption

`New-SpsSession.ps1` creates package context.

Bootstrap consumes package context.

Bootstrap must still verify package context against SSOT.

Missing package context must become `UNKNOWN`, not guessed.

Session Package supports the next `SPS OS — START`.

---

# Implementation Status

Recommended future script name:

```text
New-SpsSession.ps1
```

Script implementation is planned for `CAP-002.5b`.
