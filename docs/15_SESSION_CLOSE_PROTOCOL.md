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

It exists to freeze, audit, summarize, hand off, and prepare a session for the next `SPS OS â€” START`.

`SPS OS â€” KONIEC` is an operational protocol, not a casual summary.

---

# Trigger Phrase

The formal trigger phrase is:

`SPS OS â€” KONIEC`

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

When `SPS OS â€” KONIEC` is triggered:

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

# Session Close Minimal Patch Rule

Before declaring `Session Close PASS`, always check whether a required minimal session-close patch exists.

The minimal session-close patch includes at least:

* current `docs/10_SESSION_STATE.md`
* current next-session handoff in `docs/session-handoffs/`
* consistent `Next Session ID`
* consistent `Suggested Next Chat Title`
* state that allows generation of a fresh `sps-session.zip`

If any required element is missing:

* do not declare `Session Close PASS`
* do not declare `Session runtime: CLOSED`
* do not declare `Session closed`
* first prepare, verify, and publish the required minimal patch according to this protocol

Mandatory sequence after recognizing `SPS OS — KONIEC`:

1. Recognize `SPS OS — KONIEC`.
2. Set:
   * `Session Close Protocol: REQUIRED`
   * `Session runtime: CLOSURE PENDING`
3. Read and apply:
   * `docs/15_SESSION_CLOSE_PROTOCOL.md`
   * `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`
   * `docs/00_SPS_DEVELOPMENT_METHOD.md`
4. Set:
   * `Session Close Protocol: IN PROGRESS`
   * `Session runtime: CLOSURE PENDING`
5. Perform session audit and check whether a minimal patch is required.
6. Synchronize required documents.
7. Prepare the current next-session handoff.
8. Confirm consistency of:
   * Current Session ID
   * Next Session ID
   * Suggested Next Chat Title
9. Perform required commit and push if the protocol requires repository changes.
10. Run Session Package Generator.
11. Generate a fresh `sps-session.zip`.
12. Confirm `Package Consistency: PASS`.
13. Check final repository state:
   * correct branch
   * working tree clean
   * local/origin synchronized
   * correct HEAD
14. Only then declare:
   * `SPS OS Session Close — PASS`
   * `Session Close Protocol: PASS`
   * `Session runtime: CLOSED`

Missing evidence for any required step means closure remains `CLOSURE PENDING`.

Missing evidence must not be replaced by assumption, declaration, or prediction.

Preparing instructions, prompts, patches, or commands is not execution of Session Close Protocol.

Commit without push, handoff without generator, or ZIP without `Package Consistency: PASS` is not sufficient for session closure.

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

# Session State Update

Session close follows this operational order:

```text
Session Audit
    ->
Session State Update
    ->
Session Handoff
    ->
Session Package
    ->
Next START
```

Session Audit checks facts.

Session State records the current operational snapshot.

Session Handoff transfers only the context needed by the next chat.

Session Package prepares the ZIP/context for the next chat.

Next START uses the handoff together with a fresh ZIP / Git Context.

The Session State update contract is defined in `docs/10_SESSION_STATE.md`.

The Session Handoff contract is defined in `docs/session-handoffs/README.md`.

The Session Package Generator contract is defined in `docs/16_SESSION_PACKAGE_GENERATOR.md`.

Do not duplicate the full Session State template in this document.

Do not duplicate the full Session Handoff template in this document.

Do not duplicate the full Session Package Generator contract in this document.

---

# Session Numbering

`SPS OS â€” KONIEC` should record current session identity, calculate or confirm the next session number, and include Suggested Next Chat Title in the handoff.

Session ID is a chat lifecycle identifier.

A session starts only with `SPS OS â€” START` and closes only with `SPS OS â€” KONIEC`.

Tasks, milestones, capabilities, commits, discoveries and implementation stages performed inside one chat do not increment the Session ID.

The next Session ID equals the closed chat Session ID plus one and becomes active only in the next chat after `SPS OS â€” START`.

If the current session number is `UNKNOWN`, do not guess. Mark it as `UNKNOWN` and ask Product Owner to confirm if needed.

The Suggested Next Chat Title is guidance for the next chat. It does not guarantee that the ChatGPT UI title was changed.

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

The full handoff contract and deterministic template are defined in `docs/session-handoffs/README.md`.

Do not duplicate the full handoff template in this document.

---

# Session Close PASS Checklist

Before Session Close can be reported as `PASS`, all of the following must be present and consistent:

* SPS OS version present
* Current Session ID present
* Current Chat Title present
* Next Session ID present
* Suggested Next Chat Title present
* Session Audit completed
* Session State synchronized
* current Session Handoff created
* Git Context generated
* Session Summary generated
* ZIP generated
* ZIP consistency `PASS`
* exactly one Next Safe Step

If any critical field is missing or inconsistent, the result must be `PARTIAL` or `FAIL`, never `PASS`.

`Session runtime: CLOSED` must not be declared before these preconditions and the mandatory final handoff sequence are fully satisfied.

---

# Mandatory Final Handoff Sequence

Every `SPS OS â€” KONIEC` must end in this exact sequence:

1. Session Audit
2. Session State synchronized
3. Current Session Handoff created
4. documentation changes committed
5. documentation changes pushed
6. Product Owner instructed to run `New-SpsSession.ps1`
7. generator result confirmed
8. Package Consistency confirmed as `PASS`
9. exact ZIP path and fresh timestamp confirmed
10. Suggested Next Chat Title presented
11. ready-to-use START prompt presented
12. explicit instruction to attach `sps-session.zip` in the new chat
13. Session Close may be declared `PASS`

Rules:

* the final START prompt must not be presented before fresh ZIP confirmation
* Session Close must not be declared `PASS` before fresh ZIP confirmation
* `Session runtime: CLOSED` must not be declared before fresh ZIP confirmation
* the assistant must explicitly provide the PowerShell generator command
* the assistant must explicitly ask the Product Owner to confirm:
* `Package Consistency: PASS`
* ZIP path
* ZIP `LastWriteTime`
* Current Session ID
* Next Session ID
* Suggested Next Chat Title
* after confirmation, the assistant must explicitly instruct:
* open a new chat
* attach `sps-session.zip`
* paste the supplied START prompt
* a local filesystem path written inside the prompt does not give the new chat access to the ZIP
* the ZIP must be manually attached to the new conversation
* absence of proof for any mandatory step keeps closure in `CLOSURE PENDING`

---

# Session Package

Session Package prepares the ZIP/context for the next chat.

It must include fresh Git Context.

It may include Session Handoff.

The package generator contract is defined in `docs/16_SESSION_PACKAGE_GENERATOR.md`.

The final `SPS OS â€” KONIEC` sequence requires a fresh Session Package.

The next Bootstrap consumes Session Package according to `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.

Do not duplicate the full generator contract in this document.

---

# Next Chat Prompt

The close protocol must prepare a next-chat prompt suitable for the next `SPS OS â€” START`.

The prompt must preserve continuity without replacing SSOT validation in the next session.

---

# Session Close Contract

The close protocol is a separate operational contract from:

* the Launcher Contract,
* the Bootstrap Contract.

Session close must prepare the next start safely, but must not replace the next bootstrap.
