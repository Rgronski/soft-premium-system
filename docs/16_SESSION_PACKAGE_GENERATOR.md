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

# Relation To SPS OS â€” KONIEC

`SPS OS â€” KONIEC` closes the session, audits facts, updates Session State, prepares Session Handoff, and may prepare a session package for the next chat.

The generator supports the close protocol by collecting confirmed context into a portable package.

---

# Relation To SPS OS â€” START

`SPS OS â€” START` may use the session package as input for the next bootstrap.

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

`docs/10_SESSION_STATE.md` is the single source of truth for operational summary fields.

Session State provides `Latest Verified Commit`.

---

# Relation To Session Handoff

Session Handoff remains the transfer package for the next chat.

The generator may include the current session handoff if available.

The generator must not rewrite handoff content.

The current handoff must be selected by `Current Session ID`, not by file modification time alone.

---

# Core Rule

The generator does not decide what is true about the project.

The generator only collects confirmed project context into a package.

Git remains the source of repository facts such as branch, working tree state, ahead / behind status, and current HEAD.

Git also provides Package HEAD for the generated package.

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
* current session handoff if available.

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

* current session id,
* current chat title,
* next session id,
* suggested next chat title,
* active capability,
* active work item,
* latest completed capability item,
* current mode,
* current product milestone,
* verification status,
* blockers,
* open risks,
* repository state,
* latest verified commit,
* package head,
* next safe step,
* current handoff path if available,
* package consistency status.

The generator must read these operational fields from the deterministic Session State snapshot.

Before ZIP generation, the generator must validate agreement between Session State and current Session Handoff for:

* `Current Session ID`
* `Current Chat Title`
* `Next Session ID`
* `Suggested Next Chat Title`
* `Next Safe Step`

If any critical identity or Next Safe Step mismatch is detected, the generator must stop before ZIP creation.

Before ZIP generation, the generator must also validate `Latest Verified Commit` by checking:

* `git cat-file -e <LatestVerifiedCommit>^{commit}`
* `git merge-base --is-ancestor <LatestVerifiedCommit> HEAD`

If the commit does not exist or is not an ancestor of `HEAD`, the generator must fail critically.

`Latest Verified Commit` does not need to equal Package HEAD.

ZIP success may be reported only after package consistency is `PASS`.

The generator must report the exact ZIP path after successful generation.

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

Session Package supports the next `SPS OS â€” START`.

---

# Implementation Status

Recommended future script name:

```text
New-SpsSession.ps1
```

Script implementation is planned for `CAP-002.5b`.
