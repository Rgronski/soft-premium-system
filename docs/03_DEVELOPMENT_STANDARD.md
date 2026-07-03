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
* implementation constraints under the Minimal Patch rule.

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

# Testing Standard

Every completed workflow must be verified.

Verification should confirm:

* expected behavior,
* architectural consistency,
* absence of regressions,
* compliance with acceptance criteria.

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

A workflow is complete only when all of the following conditions are satisfied:

* Project Integrity Check completed
* Diagnosis completed
* Review completed
* Scope approved
* Chief Architect -> Codex handoff completed
* Implementation finished
* Tests completed
* Commit created
* Changes pushed
* Documentation updated
* Session closed or next-session state prepared

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
