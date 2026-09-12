# 03_DEVELOPMENT_STANDARD

---

# Document Information

**Document**
03_DEVELOPMENT_STANDARD.md

**Purpose**
Define the standard development process for Soft Premium System.

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
01_VISION.md
02_ARCHITECTURE.md

**Referenced By**
04_UI_STANDARD.md
05_ROADMAP.md
07_DECISIONS.md
08_CURRENT_STATE.md
09_CHANGELOG.md
AI_CONTEXT.md
10_PROJECT_LIFECYCLE.md

---

# Purpose

This document defines the standard software development process used in Soft Premium System.

Its purpose is to ensure that every project is developed in a consistent, predictable, and maintainable way.

---

# Development Principles

All development work follows these principles:

* Build products, not demonstrations.
* Diagnose before implementation.
* Prefer the smallest possible change.
* Simplicity is preferred over cleverness.
* Avoid premature optimization.
* Documentation is part of the product.
* Every significant decision should be understandable in the future.
* Document discoveries, not assumptions.

---

# Standard Workflow

Every workflow follows the same sequence.

```text
Project Integrity Check
    ->
Diagnosis
    ->
Review
    ->
Scope Approval
    ->
Chief Architect -> Codex Handoff
    ->
Implementation
    ->
Testing
    ->
Chief Architect Review
    ->
Risk-Based Quality Second Opinion
    ->
Product Owner Approval
    ->
Commit
    ->
Push
    ->
Documentation Update
    ->
Session Close
```

Diagnosis must not begin before a successful Project Integrity Check.

Implementation must never begin before diagnosis, scope approval, and Chief Architect -> Codex Handoff.

---

# Diagnosis Standard

Every implementation begins with a diagnosis.

Diagnosis may begin only after a positive Project Integrity Check confirms that the project documentation and confirmed repository state are consistent enough to continue safely.

The diagnosis should include:

* problem statement,
* hypothesis,
* supporting evidence,
* minimal implementation scope,
* affected files,
* verification plan,
* decisions requiring Product Owner approval.

---

# Review Standard

Before implementation, every proposed solution should be reviewed.

The review verifies:

* architectural consistency,
* compliance with project standards,
* implementation scope,
* possible risks,
* alternative solutions.

---

# Chief Architect -> Codex Handoff Standard

After Scope Approval and before implementation, Chief Architect prepares the implementation prompt for Codex.

The handoff prompt must include:

* task objective,
* approved scope,
* files that may be changed,
* files that must not be changed,
* verification plan,
* implementation constraints under the Minimal Patch rule,
* expected cost class,
* model baseline,
* cost controls.

This handoff formalizes the transition from diagnosis and architectural control to local repository implementation by Codex.

---

# Implementation Standard

Implementation should:

* solve one problem,
* avoid unrelated changes,
* preserve existing architecture,
* remain consistent with project standards,
* introduce the smallest possible change.

Large refactoring is not performed unless explicitly planned.

---

# Credit Saving Mode Standard

SPS OS uses Credit Saving Mode / Tryb oszczędny as the default Codex operating mode.

Each handoff should state:

* expected cost class,
* model baseline,
* cost controls.

Allowed cost classes are:

* `niski`,
* `średni`,
* `wysoki`,
* `bardzo wysoki`.

Codex should keep work economical by default:

* diagnose before editing,
* keep the patch minimal,
* change only narrow allowed files,
* respect explicit forbidden files,
* run targeted tests first,
* avoid broad build unless needed,
* avoid dev server or browser run unless needed,
* avoid broad repository scans unless needed,
* avoid unrelated refactors,
* avoid duplicate usage records.

Escalation is reserved for hard bugs, larger refactors, unclear architecture, repeated verification failure, or materially unsafe scope ambiguity.

Estimated usage must never be presented as real credits.

---

# Testing Standard

Every completed workflow must be verified.

Verification should confirm:

* expected behavior,
* architectural consistency,
* absence of regressions,
* compliance with acceptance criteria.

---

# Codex Report Standard

Codex must provide a report after verification and before any commit or push decision.

The report must include:

1. repository state before the change,
2. diagnosis before editing,
3. changed files list,
4. diff summary,
5. verification command results,
6. `git diff --check`,
7. `git diff --stat`,
8. `git status --short`,
9. intentional non-changes,
10. whether commit or push happened,
11. blockers and contract deviations,
12. expected cost class,
13. observed cost class,
14. model used or baseline,
15. real credits if visible,
16. avoided cost,
17. missing usage components.

If provider counters are unavailable, Codex must report usage measurement as estimated and real credits as not visible.

---

# Usage Record Standard

SPS OS keeps Codex usage records in `.usage/session.jsonl`.

Usage record rules:

* append exactly one usage record per Codex task/report,
* use the current `session_id`,
* do not store prompts,
* do not store source code,
* do not store secrets,
* do not store personal data,
* if provider counters are unavailable, set `measurement` to `estimated`,
* token fields may remain `0` when measured counters are unavailable,
* estimated records must not be reported as real credits.

---

# Commit Standard

Each commit should:

* represent a single logical change,
* have a clear and descriptive message,
* be understandable without additional explanation.

Examples:

* feat: add project workspace
* fix: correct project validation
* docs: add Architecture
* refactor: simplify visit form

---

# Publication Control

Commit and push are approval-gated repository actions.

Codex may complete implementation and verification, but commit and push require explicit Product Owner approval.

---

# Quality Second Opinion

Risk-Based Quality Second Opinion is an additional stage after Chief Architect review.

It may be used for additional feedback such as CodeRabbit when risk, scope, or explicit instruction justifies it.

Quality Second Opinion is REQUIRED when the change:

* affects security, authorization, or data,
* changes a public API,
* spans multiple modules,
* includes a migration,
* carries high risk,
* is requested by the Chief Architect or Product Owner.

Quality Second Opinion is OPTIONAL when the patch:

* is small,
* touches 1-2 files,
* has a closed contract,
* has complete targeted tests,
* passes full tests, typecheck, lint, and build,
* is easy for direct Chief Architect review.

Quality Second Opinion does not automatically expand scope.

Findings outside the patch do not block current publication without a Chief Architect decision.

The tool does not replace tests, Chief Architect review, or Product Owner approval.

Each finding must be classified as one of:

* `VALID / FIX NOW`
* `VALID / PARKED`
* `INVALID`
* `OUT OF SCOPE`

---

# Documentation Standard

Documentation must evolve together with the project.

Documentation updates are required whenever:

* architecture changes,
* development standards change,
* new decisions are accepted,
* milestones are completed,
* project status changes.

Documentation should never become outdated intentionally.

---

# Definition of Done

## Implementation Done

Implementation Done requires all of the following:

* Project Integrity Check completed
* Diagnosis completed
* Review completed
* Scope approved
* Chief Architect -> Codex handoff completed
* patch completed
* tests executed
* Codex report delivered
* Chief Architect review completed

## Publication Done

Publication Done requires all of the following:

* Implementation Done completed
* explicit Product Owner approval
* commit created
* push confirmed
* `origin/main` synchronization confirmed
* documentation updated
* session closed or next-session state prepared

---

# Related Documents

| Document                   | Source of Truth                     |
| -------------------------- | ----------------------------------- |
| 00_PROJECT_BIBLE.md        | Project philosophy                  |
| 01_VISION.md               | Product vision                      |
| 02_ARCHITECTURE.md         | System architecture                 |
| 04_UI_STANDARD.md          | User interface standards            |
| 07_DECISIONS.md            | Architecture Decision Records       |
| AI_CONTEXT.md              | AI operating model and SPS Commands |
| 10_PROJECT_LIFECYCLE.md    | Session lifecycle and close protocol |
