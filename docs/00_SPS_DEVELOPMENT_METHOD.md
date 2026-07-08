# SPS Development Method

---

# 1. Purpose

Soft Premium Development Method (SPDM) defines the top-level methodology for building Soft Premium System.

It establishes how work should be understood, scoped, validated, delivered, and closed.

It defines principles, not implementation detail.

---

# 2. Vision

SPDM exists to make software delivery controlled, explainable, auditable, and sustainable.

Its purpose is not speed at any cost.

Its purpose is stable progress with clear ownership, minimal ambiguity, and strong continuity between sessions, milestones, and repository state.

---

# 3. Core Principles

* work starts with context, not assumptions,
* documentation governs decisions,
* scope must be explicit before implementation,
* the smallest safe change is preferred,
* inconsistency must stop execution,
* every milestone must be reviewable,
* repository state must remain auditable.

---

# 4. Roles

SPDM assumes explicit role separation.

* Product Owner defines priorities, approvals, and repository actions.
* Chief Architect interprets context, defines scope, reviews consistency, and protects architecture.
* Codex implements approved changes inside the allowed scope.
* GitHub records the auditable code state.

---

# 5. Single Source of Truth

SPDM requires a single source of truth model.

Documentation is the primary source of truth for project intent, scope, state, and milestone continuity.

Repository code is the source of truth for actual implementation state.

No competing narrative should replace these sources.

---

# 6. Project Context Loader

Every serious work session begins with Project Context Loader (PCL).

PCL exists to load the official project context before diagnosis or implementation starts.

Without PCL, the project is at risk of drift, duplication, or false assumptions.

---

# 7. Development Lifecycle

SPDM treats development as a controlled lifecycle:

1. Context loading
2. Integrity validation
3. Diagnosis
4. Scope definition
5. Implementation
6. Verification
7. Documentation synchronization
8. Milestone review
9. Closure

The lifecycle is sequential by default and should not be collapsed casually.

---

# 8. Minimal Patch Philosophy

SPDM prefers the smallest safe patch that solves the actual problem.

Minimal patch means:

* no opportunistic refactor,
* no side cleanup,
* no architecture drift,
* no hidden expansion of scope.

The goal is controlled progress, not broad rewrites.

---

# 9. Credit Saving Philosophy

SPDM assumes that time, tokens, and attention are limited resources.

Credit saving means:

* read only what is necessary,
* inspect before editing,
* avoid broad searches,
* avoid long-running commands unless justified,
* stop when the next safe step is unclear.

Efficiency is part of the method, not an optimization after the fact.

---

# 10. Definition of Done

Work is done only when the approved scope is completed, verified, and reflected in the appropriate source of truth.

A patch is not done merely because code was written.

A milestone is not done merely because implementation exists.

Done requires scope completion, validation, and documentation alignment.

---

# 11. Milestone Closure Review

Every milestone requires an explicit closure review.

Closure review confirms:

* the milestone scope was actually completed,
* no required follow-up work is hidden inside the same milestone,
* control files reflect the real state,
* the next milestone is correctly positioned.

Milestone closure is a formal act, not an assumption.

---

# 12. SSOT Validation

SPDM requires continuous validation of Single Source of Truth alignment.

If control files, roadmap state, changelog, or session state conflict, the inconsistency must be surfaced explicitly.

Silent reconciliation is not allowed.

Validation protects continuity across sessions and contributors.

---

# 13. Batch Mode

SPDM allows work to be split into small controlled batches when a milestone is too broad for one safe change.

Batch Mode means progress can be incremental, but each batch must still be diagnosable, reviewable, and synchronizable.

Batch Mode is not a shortcut around validation.

---

# 14. Decision Log

Important decisions must be traceable.

SPDM requires that meaningful decisions leave a documented trail through the project decision system, milestone records, or state synchronization documents.

If a decision matters later, it should not depend on memory alone.

---

# 15. Future Evolution

SPDM is foundational, but not frozen forever.

The method may evolve when the project proves that a rule is incomplete, ambiguous, or no longer sufficient.

Method changes must remain explicit, documented, and reviewable.
