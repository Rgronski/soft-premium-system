# 15_SESSION_CLOSE_PROTOCOL

---

# Document Information

**Document**
15_SESSION_CLOSE_PROTOCOL.md

**Purpose**
Define the formal session close protocol for SPS OS.

**Owner**
Chief Architect

**Status**
Draft

**Version**
1.0

**Source of Truth**
Yes

**Depends On**
00_SPS_DEVELOPMENT_METHOD.md
10_PROJECT_LIFECYCLE.md
10_SESSION_STATE.md

**Referenced By**
10_PROJECT_LIFECYCLE.md
10_SESSION_STATE.md

---

# Purpose

This document defines the formal SPS OS session closing protocol.

It exists to freeze, audit, summarize, hand off, and prepare a session for the next `SPS OS — START`.

`SPS OS — KONIEC` is an operational protocol, not a casual summary.

---

# Trigger Phrase

The formal trigger phrase is:

`SPS OS — KONIEC`

When this command is used, the assistant must switch to the Session Close Protocol.

---

# Roles

## Chief Architect

Chief Architect:

* freezes the operational session state,
* performs the session audit,
* prepares the closing report,
* separates implemented work, proposed work, and designed work,
* prepares the handoff for the next session,
* must not claim files were changed unless this was confirmed.

## Product Owner

Product Owner:

* confirms repository actions,
* confirms verification outcomes when they were actually performed,
* confirms whether commit and push occurred,
* decides whether the session is ready to be closed.

## Codex as Implementation Engine

Codex:

* may have performed implementation work earlier in the session,
* is reported as the Implementation Engine when implementation actually occurred,
* does not replace Chief Architect in the close protocol,
* does not convert proposed work into confirmed work by implication.

---

# Status Vocabulary

Use only these status values where status reporting is required:

* `PASS`
* `FAIL`
* `ACTIVE`
* `BLOCKED`
* `UNKNOWN`
* `NOT APPLICABLE`

---

# Session Audit Status Vocabulary

Use only these Session Audit statuses:

* `PASS`
* `FAIL`
* `PARTIAL`
* `BLOCKED`
* `UNKNOWN`
* `NOT APPLICABLE`

`PASS` requires evidence.

`UNKNOWN` is better than guessing.

---

# Anti-Guessing Rules

Chief Architect must not guess.

Chief Architect must not claim:

* files were changed,
* work was implemented,
* work was verified,
* documentation was updated,
* commit happened,
* push happened,
* repository state was clean,

unless this was actually confirmed from available evidence.

If evidence is missing, report `UNKNOWN` or `NOT APPLICABLE` instead of inferring.

Implemented work, proposed work, and designed work must always be separated explicitly.

---

# Session Freeze

When `SPS OS — KONIEC` is triggered:

* stop new implementation planning,
* stop expanding scope,
* freeze the reported state to confirmed information only,
* prepare the close output from available evidence.

If the session still contains unresolved uncertainty, report it instead of smoothing it over.

---

# Session Audit

After Session Freeze, Chief Architect audits the session before producing the final handoff.

The audit must check:

* Session Scope
* Active Capability / Milestone
* Work Completed
* Work Designed but Not Implemented
* Work Proposed but Not Approved
* Files Changed
* Documentation Changed
* Verification Status
* Git Context
* Repository Cleanliness
* Commit / Push Status
* Open Risks
* Blockers
* Parked Ideas
* Next Safe Step

The audit must use only factual evidence from:

* current conversation,
* confirmed user-provided terminal output,
* `sps-git-context.txt` if available,
* committed documentation,
* explicitly provided Codex output.

If evidence is missing, the status must be `UNKNOWN`.

---

# Session Audit Template

Use this deterministic audit output template:

```text
SPS OS Session Audit

1. Scope
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

2. Capability / Milestone
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

3. Completed Work
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

4. Designed but Not Implemented
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

5. Files and Documentation
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

6. Verification
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

7. Git Context
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

8. Risks / Blockers
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

9. Parked Ideas
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]

10. Next Safe Step
Status: [PASS | FAIL | PARTIAL | BLOCKED | UNKNOWN | NOT APPLICABLE]
Evidence: [CONFIRMED EVIDENCE OR UNKNOWN]
Notes: [FACTUAL NOTES OR NOT APPLICABLE]
```

Each section must require:

* status
* evidence
* notes

---

# Work Summary

Work Summary must separate:

* implemented work,
* proposed work,
* designed work.

No category may be merged implicitly into another.

---

# File Change Status

File Change Status must report only confirmed file changes.

If file change confirmation is unavailable, report `UNKNOWN`.

Chief Architect may not claim files were changed unless confirmed.

---

# Verification Status

Verification Status must distinguish:

* verified,
* not verified,
* unknown,
* not applicable.

If tests or checks were not run, the report must say so.

---

# Git Context

Git Context must report only confirmed repository facts.

If branch, working tree state, commit, commit status, or push status were not verified in the current run, report `UNKNOWN` or `NOT APPLICABLE`.

---

# Documentation Status

Documentation Status must state:

* whether documentation was changed,
* whether documentation sync is pending,
* whether the session state is ready for the next session,

using only confirmed information.

---

# Session Handoff

Session Handoff must leave enough structured information for the next safe session start.

It must include:

* confirmed current state,
* confirmed remaining work,
* confirmed unknowns,
* next safe step,
* next chat preparation.

---

# Next Chat Prompt

The close protocol must prepare a next-chat prompt suitable for the next `SPS OS — START`.

The prompt must preserve continuity without replacing SSOT validation in the next session.

---

# Session Close Contract

The close protocol is a separate operational contract from:

* the Launcher Contract,
* the Bootstrap Contract.

Session close must prepare the next start safely, but must not replace the next bootstrap.
