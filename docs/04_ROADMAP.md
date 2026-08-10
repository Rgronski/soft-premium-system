# 04_ROADMAP

---

# Document Information

**Document**
04_ROADMAP.md

**Purpose**
Define the formal SPS OS 1.0 roadmap contract for milestone order and milestone execution continuity.

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
08_CURRENT_STATE.md
10_SESSION_STATE.md
AI_CONTEXT.md

---

# Purpose

This document defines the formal roadmap contract for SPS OS 1.0.

It is the Single Source of Truth for milestone order.

PCL uses the roadmap to determine the next milestone step.

Chief Architect, Codex Handoff, and the future Conductor use this roadmap as the canonical milestone sequence reference.

Completed milestones are immutable.

New ideas should go to Parking until they are reviewed and accepted into a milestone contract.

Every milestone must have a contract.

---

# SPS OS Lifecycle

SPS OS 1.0 evolves through controlled milestone progression.

Lifecycle rule:

* roadmap defines milestone order,
* Current State identifies the active milestone,
* Session State records operational continuity,
* Change Log records completed or formally introduced roadmap work,
* PCL validates roadmap continuity before implementation starts.

The roadmap is not a backlog.

The roadmap applies only to SPS OS 1.0.

---

# Milestone Classification

* `MS-000.x` - Foundation / OS Architecture
* `MS-001.x` - Core Engines
* `MS-002.x` - Business Modules
* `MS-003.x` - Automation
* `MS-004.x` - Integrations
* `MS-9xx.x` - Maintenance / Migration / Release

---

# Roadmap Overview

## Completed

* `MS-000.1` - Foundation
* `MS-000.2` - Workflow Foundation
* `MS-000.3` - Command Center
* `MS-000.4` - Experience Blueprint
* `MS-000.5` - The Conductor
* `MS-000.7` - Workspace Engine
* `MS-000.8` - Project Engine
* `MS-000.9` - Task Engine
* `MS-001.0` - Task Workspace Integration
* `MS-001.1` - Knowledge Engine
* `MS-001.2A` - UI Foundation
* `MS-001.2B` - UI Foundation Continuation
* `MS-001.3` - Workflow Engine
* `MS-001.4` - Release Readiness
* `MS-001.5` - SPS OS 1.0 Release Candidate
* `MS-001.6` - Final Release Acceptance Review
* `MS-001.7` - SPS OS 1.0 Stabilization
* `MS-001.8` - Project Brain Engine Foundation
* `MS-001.9` - Project Brain Workflow Evaluation Bridge

## Current

NONE

## Latest Completed Product Milestone

MS-011.0 - Existing Project Intake Foundation

## Next

* `NONE`

## MS-011.0 - Existing Project Intake Foundation

**Milestone**
MS-011.0 - Existing Project Intake Foundation

**Type**
Product Milestone

**Product Owner Decision**
ACCEPT

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the smallest controlled intake contract for an existing project so the repository can record the next milestone boundary without designing GitHub repository import or parallel project work track mechanics yet.

**Product Outcome**
The repository now records the existing-project intake boundary, threads optional `repositoryUrl` through the existing project create path, and leaves GitHub repository import plus parallel project work track follow-up parked for later milestone design.

**Definition**
Existing Project Intake means accepting an already existing project into the current SPS project model and workspace through the existing project create/open flow, using the existing project model fields as the likely future implementation boundary.

**Workspace Root Decision**
Future SPS-owned working copies for accepted existing projects live under `C:\SPS_OS_WORK\<project-slug>`. Existing project metadata may still point to the source or `repositoryUrl`, but the local working copy location is separate from that source reference.

**Non-Goals**
* GitHub repository import
* cloning an external repository
* repository synchronization
* parallel project work track mechanics
* product code changes

**Dependencies**
* `MS-010.4 - SPS OS First Usable Flow Post-Copy Guidance Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* SSOT synchronization
* backlog parking for future directions
* future implementation boundary wording for the existing project create flow and project model fields

**Forbidden Scope**
* product code changes
* GitHub repository import design or implementation
* cloning
* repository synchronization
* parallel project work track design or implementation
* broad refactors

**Likely Future Implementation Boundary**
* the existing `/projects` create flow
* the existing project model fields such as `id`, `name`, `createdAt`, and optional `repositoryUrl`
* the default local working copy root `C:\SPS_OS_WORK\<project-slug>`
* related validation and persistence wording for intake, if a later implementation milestone is approved

**Implementation Evidence**
* optional `repositoryUrl` is threaded end to end through the existing project create flow
* durable project storage now includes `repository_url`
* focused create-path tests passed with `21 / 21`
* implementation commit `98241f7184b440500a79154000b03d9e66cebf5d` was pushed to `origin/main`

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the MS-011.0 contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized publication snapshot
* `docs/06_BACKLOG.md` owns the parked future directions

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `rg "MS-011.0|MS-011.1|MS-012.0" docs`

**Rollback / Safety Expectations**
* If this contract needs revision, update only the SSOT docs that define the milestone boundary and keep the future directions parked until a separate Product Owner decision is recorded.

## MS-010.4 - SPS OS First Usable Flow Post-Copy Guidance Foundation

**Milestone**
MS-010.4 - SPS OS First Usable Flow Post-Copy Guidance Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Purpose**
Make it clear that the copied task handoff is ready to paste into the next session, while keeping the task workspace completion flow local and unchanged.

**Product Outcome**
The task workspace now shows a short post-copy guidance line after `Copied locally`, and this milestone consolidates the earlier MS-010.2 save-review guidance and MS-010.3 post-completion copy guidance refinements into the final visible handoff cue.

**Allowed Implementation Scope**
* one short visible post-copy guidance line after copied state
* focused task workspace test coverage
* SSOT verification and publication metadata

**Forbidden Scope**
* route changes
* persistence changes
* lifecycle changes
* task detail changes
* dependency changes
* refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the MS-010.4 contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized publication snapshot
* product code remains limited to the task workspace completion guidance surface

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `npm.cmd test -- 'src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx'`

**Rollback / Safety Expectations**
* if the guidance needs revision, update only the task workspace copy and its directly related test
* keep the milestone minimal and local to the completion/copy boundary

## MS-010.1 - SPS OS First Usable Flow Guided Navigation Foundation

**Milestone**
MS-010.1 - SPS OS First Usable Flow Guided Navigation Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make the already usable SPS OS flow clearly guided at key transition points, without changing lifecycle logic, persistence, routes, task actions, or data flow.

**Product Outcome**
The repository now records the guided-navigation boundary for the usable SPS OS flow, so the next implementation step can improve clarity without changing the underlying product behavior.

**Allowed Discovery Scope**
* clarify the path from Home to Project to Task List to Task Detail to Task Workspace
* clarify the result-saving and completion sequence in the task workspace
* improve the current navigation guidance without changing lifecycle logic, persistence, routes, task actions, or data flow

**Forbidden Scope**
* product code edits
* refactors
* dependency changes
* any MS-010.2+ scope

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the MS-010.1 guided-navigation contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this docs-only milestone
* product code remains unchanged in this milestone

**Verification Plan**
* `git status -sb`
* `git diff --check`
* confirm no product code files changed

**Rollback / Safety Expectations**
* if the guided-navigation contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

## MS-010.0 - SPS OS First End-to-End Usable Flow Discovery Foundation

**Milestone**
MS-010.0 - SPS OS First End-to-End Usable Flow Discovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define and verify the shortest practical SPS OS user journey from app entry to completing one task in the workspace, with explicit coverage of navigation clarity, manual handoffs, recovery behavior, and unclear UI steps, without adding product code yet.

**Product Outcome**
The repository now records the first end-to-end usable flow discovery boundary, so later work can improve the user journey without adding product code in this milestone.

**Allowed Discovery Scope**
* identify the smallest real end-to-end usable flow currently present
* identify gaps where the user still needs manual prompts, ZIP handling, SSOT interpretation, or unclear UI steps
* document the discovery contract for the usable flow

**Forbidden Scope**
* product code edits
* refactors
* dependency changes
* any MS-010.1+ scope

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the MS-010.0 discovery contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this docs-only milestone
* product code remains unchanged in this milestone

**Verification Plan**
* `git status -sb`
* `git diff --check`
* confirm no product code files changed

**Rollback / Safety Expectations**
* if the discovery contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

## MS-009.11 - Dyrygent/Konduktor Boundary Validation Consumer Implementation Authorization Foundation

**Milestone**
MS-009.11 - Dyrygent/Konduktor Boundary Validation Consumer Implementation Authorization Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / PUSHED

**Purpose**
Publish SSOT authorization for the minimal controlled implementation of the consumer seam defined by `MS-009.10` so the repository can move from contract definition to an explicitly authorized future implementation boundary without changing Workflow Engine ownership, Project Brain, SSOT, UI, automation, scheduling, recovery, or executor responsibilities.

**Product Outcome**
The repository now records the authorization boundary for the minimal conductor consumer seam, so a future implementation under `src/lib/conductor` can consume boundary-validation output as explicit read-only input while keeping canonical truth and ownership boundaries intact.

**Allowed Future Implementation Target**
* a minimal controlled consumer seam under `src/lib/conductor` only
* explicit read-only consumption of the boundary-validation snapshot or validation result defined by `MS-009.10`
* preservation of `getConductorState()` compatibility
* deterministic behavior with no file reads, file writes, or runtime mutation of Project Brain or SSOT state

**Implementation Evidence**
* `src/lib/conductor/conductor.ts` exports the pure conductor boundary consumer helper and keeps `getConductorState()` compatible
* `src/lib/conductor/conductor.test.ts` covers ready and blocked consumer states plus legacy compatibility
* `npm.cmd test -- src/lib/conductor/conductor.test.ts` passed with `5 / 5` tests
* implementation commit `c9299c8c17b1f5574d7f6191080e3a079bdb5fc2` was pushed to `origin/main`
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` still preserve the MS-009.11 authorization boundary
* `.usage/session.jsonl` records the Session 065 execution-sync usage entry
* no UI, automation, scheduling, recovery, executor, Project Brain, or Workflow Engine ownership changed

**Dependencies**
* `MS-009.10 - Dyrygent/Konduktor Boundary Validation Consumption Contract Foundation`

**Allowed Implementation Scope**
* docs-only product authorization creation
* SSOT synchronization
* publication metadata
* history recording for the completed authorization milestone

**Forbidden Scope**
* `src` changes
* UI changes
* automation changes
* scheduling changes
* recovery changes
* command executor ownership changes
* any Workflow Engine ownership change
* direct writes to Project Brain facts or SSOT history outside this contract
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this docs-only milestone
* any future implementation must stay inside the allowed future implementation target and outside UI, automation, scheduling, recovery, executor, Project Brain, and Workflow Engine ownership until a separate Product Owner-approved implementation milestone is defined

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md docs/10_SESSION_STATE.md .usage/session.jsonl`
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved implementation milestone is defined.

**Rollback / Safety Expectations**
* If the authorization contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded.

## MS-009.10 - Dyrygent/Konduktor Boundary Validation Consumption Contract Foundation

**Milestone**
MS-009.10 - Dyrygent/Konduktor Boundary Validation Consumption Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the next minimal controlled step after `MS-009.8` and `MS-009.9` by recording how the new conductor boundary validator may be consumed safely by Dyrygent/Konduktor without changing Workflow Engine ownership, Project Brain, SSOT, UI, automation, scheduling, recovery, or executor responsibilities.

**Product Outcome**
The repository now records the next controlled consumption boundary for the conductor validator, so any future implementation can consume the validator output as explicit read-only input without shifting canonical truth or ownership boundaries.

**Allowed Future Implementation Target**
* a minimal controlled consumer seam under `src/lib/conductor` that accepts an explicit boundary-validation snapshot or validation result and derives the next deterministic conductor-facing decision from that input
* read-only consumption of the validator output as explicit input
* compatibility with the existing `getConductorState()` surface if the future implementation needs to expose the same compatibility boundary
* no file reads, file writes, or direct mutation of Project Brain or SSOT state

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records the MS-009.10 consumption contract and updates the latest completed product milestone baseline
* `docs/08_CURRENT_STATE.md` keeps the synchronized latest completed milestone snapshot aligned with MS-009.10
* `docs/09_CHANGELOG.md` records the published contract milestone in the official history
* `docs/10_SESSION_STATE.md` records the live Session 065 snapshot for the contract sync
* `.usage/session.jsonl` records the Session 065 contract publication usage entry
* no runtime product code, UI, automation, scheduling, recovery, executor, Project Brain, or Workflow Engine ownership changed

**Dependencies**
* `MS-009.9 - Dyrygent/Konduktor Next Controlled Step Discovery Foundation`
* `MS-009.8 - Dyrygent/Konduktor First Controlled Implementation Foundation`

**Allowed Implementation Scope**
* docs-only product contract creation
* SSOT synchronization
* publication metadata
* history recording for the completed contract milestone

**Forbidden Scope**
* `src` changes
* UI changes
* automation changes
* scheduling changes
* recovery changes
* command executor ownership changes
* any Workflow Engine ownership change
* direct writes to Project Brain facts or SSOT history outside this contract
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this docs-only milestone
* any future implementation must stay inside the allowed future implementation target and outside UI, automation, scheduling, recovery, executor, Project Brain, and Workflow Engine ownership until a separate Product Owner-approved milestone exists

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md docs/10_SESSION_STATE.md .usage/session.jsonl`
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved implementation milestone is defined.

**Rollback / Safety Expectations**
* If the contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded.

## MS-009.9 - Dyrygent/Konduktor Next Controlled Step Discovery Foundation

**Milestone**
MS-009.9 - Dyrygent/Konduktor Next Controlled Step Discovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define and record the next safe controlled implementation boundary after `MS-009.8` so the repository has a published SSOT-backed discovery contract for the next Dyrygent/Konduktor step without shifting Workflow Engine, Project Brain, or SSOT ownership.

**Product Outcome**
The repository now records the next smallest controlled implementation boundary after the first controlled Dyrygent/Konduktor validation seam, and the live product behavior remains unchanged.

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records the MS-009.9 discovery contract and updates the latest completed product milestone baseline
* `docs/08_CURRENT_STATE.md` keeps the synchronized latest completed milestone snapshot aligned with MS-009.9
* `docs/09_CHANGELOG.md` records the published discovery milestone in the official history
* `docs/10_SESSION_STATE.md` records the live Session 065 snapshot for the discovery sync
* `.usage/session.jsonl` records the Session 065 publication task usage entry
* no runtime product code, UI, automation, scheduling, recovery, executor, or Workflow Engine ownership changed

**Dependencies**
* `MS-009.8 - Dyrygent/Konduktor First Controlled Implementation Foundation`

**Allowed Implementation Scope**
* docs-only product discovery
* SSOT synchronization
* publication metadata
* history recording for the completed discovery milestone

**Forbidden Scope**
* `src` changes
* UI changes
* automation changes
* scheduling changes
* recovery changes
* command executor ownership changes
* any Workflow Engine ownership change
* direct writes to Project Brain facts or SSOT history outside this contract
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this docs-only milestone
* any future implementation must stay outside UI, automation, scheduling, recovery, executor, and Workflow Engine ownership until a separate Product Owner-approved milestone exists

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md docs/10_SESSION_STATE.md .usage/session.jsonl`
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved implementation milestone is defined.

**Rollback / Safety Expectations**
* If the discovery contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded.

## MS-009.8 - Dyrygent/Konduktor First Controlled Implementation Foundation

**Milestone**
MS-009.8 - Dyrygent/Konduktor First Controlled Implementation Foundation

**Type**
Product Milestone

**Product Owner Decision**
APPROVED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / PUSHED

**Purpose**
Publish the first controlled Dyrygent/Konduktor implementation seam so the repository can validate the published MS-009 contract boundary without displacing Workflow Engine, Project Brain, or SSOT authority.

**Product Outcome**
The repository contains one minimal orchestration validation seam that consumes the published MS-009.0 through MS-009.6 contracts as read-only input, preserves `getConductorState()` compatibility, and keeps UI, automation, scheduling, recovery, runtime state-machine, and command-executor ownership out of scope.

**Dependencies**
* closed `MS-009.7 - Dyrygent/Konduktor First Implementation Scope Foundation`
* published `MS-009.0 - Dyrygent/Konduktor Foundation`
* published `MS-009.1 - Dyrygent/Konduktor Responsibility Map Foundation`
* published `MS-009.2 - Dyrygent/Konduktor Interaction Contract Foundation`
* published `MS-009.3 - Dyrygent/Konduktor State Model Foundation`
* published `MS-009.4 - Dyrygent/Konduktor Command Boundary Foundation`
* published `MS-009.5 - Dyrygent/Konduktor Failure Boundary Foundation`
* published `MS-009.6 - Dyrygent/Konduktor Readiness Gate Foundation`

**Implementation Evidence**
* `src/lib/conductor/types.ts` exports the boundary snapshot and validation result types
* `src/lib/conductor/conductor.ts` exports the pure controlled boundary validation helper and keeps `getConductorState()` compatible
* `src/lib/conductor/conductor.test.ts` covers a valid boundary snapshot and a rejected snapshot
* `npm.cmd test -- src/lib/conductor/conductor.test.ts` passed with `2 / 2` tests
* `git diff --check` passed with line-ending warnings only
* implementation commit `1ba5f7f0584eef9c5de1643b8996d4060c4b48d8` was pushed to `origin/main`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone.

## MS-009.7 - Dyrygent/Konduktor First Implementation Scope Foundation

**Milestone**
MS-009.7 - Dyrygent/Konduktor First Implementation Scope Foundation

**Type**
Product Milestone

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the first controlled Dyrygent/Konduktor implementation milestone scope so the next implementation step can begin only inside the published MS-009 contract boundary and without displacing Workflow Engine, Project Brain, or SSOT authority.

**Allowed Implementation Scope**
* a minimal orchestration implementation seam that consumes the published MS-009.0 through MS-009.6 contracts
* read-only contract enforcement for command, signal, state, failure, and readiness checks
* deterministic orchestration validation helpers that do not mutate canonical truth
* minimal implementation verification hooks for boundary compliance and SSOT consistency
* the smallest controlled runtime surface needed to execute the published orchestration contract without expanding product behavior

**Forbidden Implementation Scope**
* UI implementation for Dyrygent or Konduktor
* automation logic, scheduling logic, or recovery engine logic
* runtime state machine ownership or command executor ownership
* direct writes to Project Brain facts or SSOT history
* any change to Workflow Engine rules or interpretation ownership
* any MS-008 reopen, refactor, or unrelated cleanup

**Pre-Implementation Verification**
* MS-009.0 through MS-009.6 are published, recorded in SSOT, and mutually consistent
* `git status` is clean before implementation begins
* `git diff --check` passes before implementation begins
* the implementation target is explicitly limited to the published MS-009 contract boundary
* no unresolved SSOT contradiction remains in `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, or `docs/10_SESSION_STATE.md`

**Post-Implementation Verification**
* focused checks confirm the new implementation stays inside the published MS-009 boundary
* verification confirms no canonical truth moved out of Project Brain or SSOT docs
* verification confirms Workflow Engine remains the rules/interpretation owner
* verification confirms no UI, automation, recovery, or runtime state-machine scope was added
* SSOT docs are updated to reflect the actual implementation result only after verification succeeds

**Implementation Authorization Rule**
* the first controlled implementation milestone may start only after the readiness gate remains satisfied and a separate Product Owner decision authorizes implementation

**Out of Scope**
* application code in this milestone
* UI changes in this milestone
* automation logic in this milestone
* refactors in this milestone

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Milestone**
NONE

## MS-009.6 - Dyrygent/Konduktor Readiness Gate Foundation

**Milestone**
MS-009.6 - Dyrygent/Konduktor Readiness Gate Foundation

**Type**
Product Milestone

**Status**
Published

**Purpose**
Define the readiness gate that decides whether the repository is allowed to start the first controlled Dyrygent/Konduktor implementation milestone without losing the published authority split, SSOT discipline, or Workflow Engine ownership.

**Required Satisfied Contracts**
* `MS-009.0` published the orchestration foundation and preserved Workflow Engine as rules/interpretation owner.
* `MS-009.1` published the responsibility map for Workflow Engine, Dyrygent, Konduktor, Project Brain, and SSOT.
* `MS-009.2` published the interaction contract for allowed signals, status flow, and user-facing guidance boundaries.
* `MS-009.3` published the bounded state model and its ownership rules.
* `MS-009.4` published the command boundary and the allowed / forbidden command classes.
* `MS-009.5` published the failure boundary and the stop / clarification rules.

**Implementation Ready Conditions**
* all six MS-009 contracts are published and mutually consistent in SSOT
* Workflow Engine remains the rules/interpretation owner
* Project Brain remains the canonical project fact source
* SSOT docs remain the canonical milestone and session history source
* the first implementation milestone is limited to controlled implementation of the published contracts, not new product behavior

**Implementation Blockers**
* any missing or contradictory MS-009.0 through MS-009.5 contract
* any attempt to move canonical truth out of Project Brain or SSOT docs
* any attempt to change Workflow Engine into an implementation agent
* any attempt to introduce UI, automation logic, runtime state machines, recovery engines, or command executors
* any attempt to reopen MS-008 or replace the published MS-009 boundary sequence

**Readiness Outcome**
* ready for the first controlled implementation milestone only when the implementation-ready conditions remain satisfied and a separate Product Owner decision authorizes that milestone

**Out of Scope**
* application code
* UI changes
* automation logic
* runtime state machine implementation
* command executor implementation
* recovery engine implementation
* refactors

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Milestone**
NONE

## MS-009.5 - Dyrygent/Konduktor Failure Boundary Foundation

**Milestone**
MS-009.5 - Dyrygent/Konduktor Failure Boundary Foundation

**Type**
Product Milestone

**Status**
Published

**Purpose**
Define the bounded failure and blocker contract for Dyrygent and Konduktor so ambiguous, forbidden, unsafe, or incomplete orchestration paths stop or request clarification before they can be treated as valid guidance.

**Failure and Blocker Categories**
* `ambiguous-input` - the requested orchestration action lacks enough context to decide safely.
* `missing-state` - a required orchestration state, signal, or handoff is absent or stale.
* `forbidden-action` - the request would cross authority boundaries or mutate canonical truth.
* `unsafe-path` - the request would imply automation, scheduling, runtime execution, or another out-of-scope action.
* `inconsistent-state` - the observable state conflicts with SSOT or Project Brain facts.

**Stop and Clarification Rules**
* Dyrygent must stop instead of deciding when the request would require inventing missing canonical facts or overriding Workflow Engine interpretation.
* Konduktor must ask for clarification instead of guiding when the request is ambiguous, incomplete, or cannot be expressed safely through the allowed command boundary.
* Dyrygent must block the path when the request is forbidden, unsafe, or would alter canonical truth.
* Konduktor must block the path when presenting guidance would imply execution authority or recovery automation.
* Neither side may fabricate a recovery path outside the published milestone contract.

**Failure-to-Signal Mapping**
* `ambiguous-input` maps to `needs-clarification` and `clarification-needed`.
* `missing-state` maps to `warning`, then `needs-clarification` if the missing state cannot be reconstructed from SSOT.
* `forbidden-action` maps to `blocked` and `cannot-continue`.
* `unsafe-path` maps to `warning`, then `blocked` if the safe boundary cannot be maintained.
* `inconsistent-state` maps to `blocked`.

**Failure-to-Command Mapping**
* `request-clarification` is the correct response for ambiguous or missing-state conditions.
* `block-command` is the correct response for forbidden, unsafe, or inconsistent-state conditions.
* `present-guidance` is forbidden while the orchestration state is `clarification-needed` or `blocked`.
* `acknowledge-state` may only follow a valid handoff that is still inside the MS-009.3 state model.

**Authority Boundaries**
* Workflow Engine remains the rules/interpretation owner.
* Project Brain remains the canonical project fact source.
* SSOT docs remain the canonical milestone and session history source.
* Dyrygent stops before deciding when the contract requires missing truth to be reconstructed from canonical sources.
* Konduktor stops before guiding when the contract requires clarification or blocking instead of presentation.

**Out of Scope**
* application code
* UI changes
* command executor implementation
* automation logic
* recovery engine implementation
* refactors

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Milestone**
NONE

## MS-009.4 - Dyrygent/Konduktor Command Boundary Foundation

**Milestone**
MS-009.4 - Dyrygent/Konduktor Command Boundary Foundation

**Type**
Product Milestone

**Status**
Published

**Purpose**
Define the bounded command boundary for Dyrygent and Konduktor so they can request, present, or block orchestration actions without gaining execution authority over canonical project state.

**Command Categories**
* `request-guidance` - ask for the next approved user-facing orchestration direction.
* `present-guidance` - surface approved guidance to the user.
* `request-clarification` - pause the cycle when the contract needs more detail.
* `block-command` - refuse a command that violates authority or canonical boundaries.
* `acknowledge-state` - confirm the current orchestration state after a valid handoff.

**Allowed Commands**
* Dyrygent may request guidance, request clarification, and acknowledge state.
* Konduktor may present guidance, acknowledge state, and block invalid presentation requests.
* Dyrygent may block commands that would bypass Workflow Engine, Project Brain, or SSOT.
* Konduktor may block commands that would change canonical truth or automate execution.

**Forbidden Commands**
* neither side may execute product code, automation, or scheduling logic
* neither side may mutate Project Brain facts
* neither side may rewrite SSOT history
* neither side may override Workflow Engine interpretation
* neither side may act as a command executor for runtime state changes

**Command-to-Signal Mapping**
* `request-guidance` maps to `next-step` or `ready` from MS-009.2.
* `present-guidance` maps to `guidance-ready` and then `guidance-delivered` from MS-009.3.
* `request-clarification` maps to `needs-clarification` from MS-009.2 and `clarification-needed` from MS-009.3.
* `block-command` maps to `blocked` and `cannot-continue`.
* `acknowledge-state` maps to `guidance-acknowledged` and `idle`.

**Authority Boundaries**
* Workflow Engine remains the rules/interpretation owner.
* Project Brain remains the canonical project fact source.
* SSOT docs remain the canonical milestone and session history source.
* Dyrygent coordinates command intent but does not execute canonical changes.
* Konduktor presents or blocks user-facing guidance but does not execute canonical changes.

**State Boundary**
* command requests may move the orchestration state between `idle`, `interpreting`, `guidance-ready`, `guidance-delivered`, `clarification-needed`, and `blocked`
* no command may create a state outside the MS-009.3 model
* no command may mutate canonical truth outside Project Brain or SSOT

**Out of Scope**
* application code
* UI changes
* command executor implementation
* automation logic
* refactors

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Milestone**
NONE

## MS-009.3 - Dyrygent/Konduktor State Model Foundation

**Milestone**
MS-009.3 - Dyrygent/Konduktor State Model Foundation

**Type**
Product Milestone

**Status**
Published

**Purpose**
Define the minimal orchestration state model for Dyrygent and Konduktor so the interaction contract can be represented as bounded state without introducing runtime automation.

**State Model**
* `idle` - no orchestration handoff is active.
* `interpreting` - Workflow Engine output is being translated into an orchestration decision boundary.
* `guidance-ready` - Konduktor can present the approved user-facing guidance.
* `guidance-delivered` - guidance has been surfaced to the user.
* `clarification-needed` - the handoff needs more information before continuing.
* `blocked` - the orchestration cannot continue safely.

**Allowed Signal Mapping**
* `ready` maps to `guidance-ready`.
* `next-step` maps to `guidance-ready`.
* `guidance-ready` maps to `guidance-delivered`.
* `guidance-acknowledged` maps to `idle`.
* `needs-clarification` maps to `clarification-needed`.
* `warning` maps to `interpreting` or `guidance-ready` depending on whether user-facing guidance can still be shown safely.
* `blocked` maps to `blocked`.
* `cannot-continue` maps to `blocked`.

**State Ownership**
* Dyrygent owns orchestration state transitions.
* Konduktor owns presentation of guidance state to the user.
* Workflow Engine owns interpretation inputs only.
* Project Brain owns canonical project facts.
* SSOT docs own published milestone order and contract history.

**Forbidden State Mutations**
* Dyrygent must not mutate Project Brain facts.
* Konduktor must not mutate canonical milestone history.
* Konduktor must not change workflow interpretation results.
* Workflow Engine must not mutate orchestration presentation state.
* SSOT docs must not behave as a runtime state machine.

**Out of Scope**
* runtime automation
* UI changes
* product code
* refactors
* scheduling logic

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Milestone**
NONE

## MS-009.2 - Dyrygent/Konduktor Interaction Contract Foundation

**Milestone**
MS-009.2 - Dyrygent/Konduktor Interaction Contract Foundation

**Type**
Product Milestone

**Status**
Published

**Purpose**
Define how Dyrygent and Konduktor exchange operational state and guidance without taking over canonical authority.

**Interaction Contract**
* Dyrygent receives workflow interpretation, blocker state, confidence, and next-step recommendation from the published SSOT and Workflow Engine boundary.
* Dyrygent emits an orchestration decision handoff that identifies the next safe guidance boundary.
* Konduktor receives that handoff and renders user-facing operational guidance only.
* Konduktor may return acknowledgment, clarification request, or surfaced-state feedback for the same interaction cycle.
* Project Brain remains the source of canonical project facts and runtime inputs.
* SSOT docs remain the source of published milestone order, contract history, and session continuity.

**Allowed Signals**
* `ready`
* `warning`
* `blocked`
* `next-step`
* `guidance-ready`
* `guidance-acknowledged`
* `needs-clarification`
* `cannot-continue`

**Status Flow**
* Workflow Engine interprets project state.
* Dyrygent converts the interpretation into a bounded orchestration decision.
* Konduktor presents the decision as operational guidance.
* The user receives the guidance and may continue or stop.
* Any canonical project update stays outside the Dyrygent/Konduktor exchange.

**Decision Handoff**
* Dyrygent owns the orchestration decision boundary.
* Konduktor owns the user-facing guidance boundary.
* No signal from Konduktor may override Workflow Engine interpretation.
* No signal from Dyrygent may rewrite Project Brain facts or SSOT history.

**Forbidden Transfers**
* Dyrygent must not become the canonical source of project truth.
* Konduktor must not define workflow rules or milestone order.
* Konduktor must not bypass Workflow Engine when describing project state.
* Dyrygent must not bypass Project Brain or SSOT when identifying canonical inputs.
* Neither side may introduce UI, automation, or scheduling logic in this contract.

**Out of Scope**
* application code
* UI changes
* automation implementation
* scheduling logic
* workflow rule changes
* refactors

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Milestone**
NONE

## MS-009.1 - Dyrygent/Konduktor Responsibility Map Foundation

**Milestone**
MS-009.1 - Dyrygent/Konduktor Responsibility Map Foundation

**Type**
Product Milestone

**Status**
Published

**Purpose**
Define the responsibility map for Dyrygent and Konduktor so orchestration ownership stays unambiguous before any implementation work begins.

**Responsibility Map**
* `Workflow Engine` interprets workflow state, blocker state, progression guidance, and recommendation confidence.
* `Dyrygent` owns orchestration sequencing, milestone boundary publication, and the coordination between published contracts.
* `Konduktor` owns presentation of operational guidance and human-facing orchestration surfaces.
* `Project Brain` owns canonical project facts and runtime project state inputs.
* `SSOT docs` own milestone order, contract publication history, and session continuity records.

**Forbidden Responsibility Transfers**
* `Workflow Engine` must not take over canonical truth from `Project Brain` or `SSOT docs`.
* `Workflow Engine` must not render UI or become a presentation layer.
* `Dyrygent` must not define workflow rules or replace Workflow Engine interpretation.
* `Dyrygent` must not become the canonical store for project facts.
* `Konduktor` must not define workflow rules or own project facts.
* `Project Brain` must not become the roadmap, session log, or changelog authority.
* `SSOT docs` must not become a runtime execution layer or bypass `Project Brain`.

**Out of Scope**
* application code
* UI changes
* scheduling automation
* workflow rule refactors
* architecture rewrites

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Milestone**
NONE

## MS-009.0 - Dyrygent/Konduktor Foundation

**Milestone**
MS-009.0 - Dyrygent/Konduktor Foundation

**Type**
Product Milestone

**Status**
Published

**Purpose**
Define the orchestration foundation boundary for the Dyrygent/Konduktor layer without changing application behavior.

**Business Goal**
Establish the orchestration contract boundary while keeping the Workflow Engine as the rules/interpretation owner and the Conductor as the presentation/operational guide.

**Scope**
* orchestration foundation contract
* workflow interpretation vs presentation boundary
* SSOT alignment for roadmap and session continuity references

**Out of Scope**
* application code
* UI changes
* scheduling work
* workflow rule ownership changes
* new canonical truth outside Project Brain or SSOT documents
* refactors

**Constraints**
* Workflow Engine remains the rules/interpretation owner.
* Conductor remains the presentation/operational guide.
* Canonical truth stays in Project Brain and SSOT docs.
* Current Product Milestone remains controlled by existing roadmap/session-state rules.

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/09_CHANGELOG.md`

## MS-008.36 - Task Workspace Repository Open Feedback Persistence Foundation

**Milestone**
MS-008.36 - Task Workspace Repository Open Feedback Persistence Foundation

**Type**
Product Milestone

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

## MS-008.35 - Task Workspace Repository Open Feedback Restore Foundation

**Milestone**
MS-008.35 - Task Workspace Repository Open Feedback Restore Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

## MS-008.34 - Task Workspace Repository Open Feedback Reset Foundation

**Milestone**
MS-008.34 - Task Workspace Repository Open Feedback Reset Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

## MS-008.33 - Task Workspace Repository Open Feedback Foundation

**Milestone**
MS-008.33 - Task Workspace Repository Open Feedback Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

## MS-008.32 - Task Workspace Codex Handoff Jump Feedback Foundation

**Milestone**
MS-008.32 - Task Workspace Codex Handoff Jump Feedback Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Give the task workspace Codex handoff link a visible local signal when the handoff is opened, without changing persistence, backend flow, or the existing completion flow.

**Product Outcome**
The task workspace now shows a local `Codex handoff opened locally.` status after the Codex handoff is opened while keeping the task handoff section visible.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now shows `Codex handoff opened locally.` after the Codex handoff link is used.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies the handoff jump message appears after clicking the Codex handoff link.
* Targeted verification for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` passed.

**Dependencies**
* `MS-008.26 - Task Workspace Copy Report Feedback Foundation`

**Allowed Implementation Scope**
* minimal local reset-feedback change in the task workspace completion path
* focused test coverage for the visible reset state
* SSOT synchronization for the completed workspace milestone

**Forbidden Scope**
* backend changes
* persistence changes
* workflow branching
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace completion reset feedback
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused verification for the reset state
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* focused manual smoke of the reset-feedback state if needed

**Rollback / Safety Expectations**
* stop if the reset-feedback state requires broader workflow changes
* stop if the fix requires backend or Project Brain engine changes
* keep the milestone minimal and local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.26 - Task Workspace Copy Report Feedback Foundation

**Milestone**
MS-008.26 - Task Workspace Copy Report Feedback Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Give the task workspace copy-report action a visible local completion signal without changing persistence, backend flow, or the existing completion handoff content.

**Product Outcome**
The task workspace completion area now shows a local `Copied locally` button state after the completion report is copied while preserving the completion summary and handoff output.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now shows `Copied locally` on the copy-report button after the completion report is copied locally.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies the copy-report button reports the copied state after a successful local copy.
* Targeted verification for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` passed.

**Dependencies**
* `MS-008.25 - Task Workspace Complete Task Feedback Foundation`

**Allowed Implementation Scope**
* minimal local copy-feedback change in the task workspace completion area
* focused test coverage for the visible copied state
* SSOT synchronization for the completed workspace milestone

**Forbidden Scope**
* backend changes
* persistence changes
* workflow branching
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace copy-report feedback
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused verification for the copied-state feedback
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* focused manual smoke of the copy-feedback state if needed

**Rollback / Safety Expectations**
* stop if the copy-feedback state requires broader workflow changes
* stop if the fix requires backend or Project Brain engine changes
* keep the milestone minimal and local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.25 - Task Workspace Complete Task Feedback Foundation

**Milestone**
MS-008.25 - Task Workspace Complete Task Feedback Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Give the task workspace complete-task action a visible local completion signal without changing persistence, backend flow, or the existing handoff content.

**Product Outcome**
The task workspace completion area now shows a local `Completed locally` button state after the task is completed while preserving the completion summary and handoff output.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now shows `Completed locally` on the complete-task button after the task is completed locally.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies the complete-task button reports the completed state after a successful local completion.
* Targeted verification for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` passed.

**Dependencies**
* `MS-008.24 - Task Workspace Evidence Review Acknowledgement Feedback Foundation`

**Allowed Implementation Scope**
* minimal local completion-feedback change in the task workspace completion area
* focused test coverage for the visible completed state
* SSOT synchronization for the completed workspace milestone

**Forbidden Scope**
* backend changes
* persistence changes
* workflow branching
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace complete-task feedback
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused verification for the completed-state feedback
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* focused manual smoke of the complete-feedback state if needed

**Rollback / Safety Expectations**
* stop if the completion-feedback state requires broader workflow changes
* stop if the fix requires backend or Project Brain engine changes
* keep the milestone minimal and local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.24 - Task Workspace Evidence Review Acknowledgement Feedback Foundation

**Milestone**
MS-008.24 - Task Workspace Evidence Review Acknowledgement Feedback Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Give the task workspace evidence-review acknowledge action a visible local completion signal without changing persistence, backend flow, or the existing completion sequence.

**Product Outcome**
The task workspace evidence review area now shows a local `Acknowledged locally` button state after the review is acknowledged while preserving the save-review-complete flow and the task completion handoff.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now shows `Acknowledged locally` on the evidence-review button after the review is acknowledged locally.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies the acknowledge button reports the acknowledged state after a successful local acknowledgement.
* Targeted verification for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` passed.

**Dependencies**
* `MS-008.23 - Task Workspace Result Notes Save Feedback Foundation`

**Allowed Implementation Scope**
* minimal local acknowledgement-feedback change in the task workspace evidence review area
* focused test coverage for the visible acknowledged state
* SSOT synchronization for the completed workspace milestone

**Forbidden Scope**
* backend changes
* persistence changes
* workflow branching
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace evidence-review acknowledgement feedback
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused verification for the acknowledged-state feedback
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* focused manual smoke of the acknowledge-feedback state if needed

**Rollback / Safety Expectations**
* stop if the acknowledgement-feedback state requires broader workflow changes
* stop if the fix requires backend or Project Brain engine changes
* keep the milestone minimal and local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.23 - Task Workspace Result Notes Save Feedback Foundation

**Milestone**
MS-008.23 - Task Workspace Result Notes Save Feedback Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Give the task workspace result-notes save action a visible local completion signal without changing persistence, backend flow, or the existing save contract.

**Product Outcome**
The task workspace result notes area now shows a local `Saved locally` save button state after a successful local save while preserving the existing save flow and the projected next step affordance.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now shows `Saved locally` on the save button after the result notes are saved locally.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies the save button reports the saved state after a successful local save.
* Targeted verification for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` passed.

**Dependencies**
* `MS-008.22 - Task Workspace Next Step Action Foundation`

**Allowed Implementation Scope**
* minimal local save-feedback change in the task workspace result notes area
* focused test coverage for the visible saved state
* SSOT synchronization for the completed workspace milestone

**Forbidden Scope**
* backend changes
* persistence changes
* workflow branching
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace result-notes save feedback
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused verification for the saved-state feedback
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* focused manual smoke of the save-feedback state if needed

**Rollback / Safety Expectations**
* stop if the save-feedback state requires broader workflow changes
* stop if the fix requires backend or Project Brain engine changes
* keep the milestone minimal and local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.22 - Task Workspace Next Step Action Foundation

**Milestone**
MS-008.22 - Task Workspace Next Step Action Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Turn the task workspace next-step block into one local action that moves focus to the task result notes area while keeping the projected next step visible.

**Product Outcome**
The task workspace start area now offers a local `Continue to result notes` action that focuses the task result notes field without changing the next-step data source.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now renders a local `Continue to result notes` action next to the next-step block and focuses the result notes field on click.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies the action focuses the `Result notes` field.
* Targeted verification for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` passed.

**Dependencies**
* `MS-008.21 - Task Workspace Next Product Step Foundation`

**Allowed Implementation Scope**
* minimal local action in the task workspace start area
* focused test coverage for the new affordance
* SSOT synchronization for the completed workspace milestone

**Forbidden Scope**
* navigation changes
* persistence changes
* workflow branching
* backend logic
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace start-area action and focus behavior
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused verification for the action
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `docs/session-handoffs/2026-08-07_062_SESSION_HANDOFF.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* focused manual smoke of the result-notes focus action if needed

**Rollback / Safety Expectations**
* stop if the next-step affordance requires broader workflow changes
* stop if the fix requires backend or Project Brain engine changes
* keep the milestone minimal and local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`
* `docs/session-handoffs/2026-08-07_062_SESSION_HANDOFF.md`

## MS-008.21 - Task Workspace Next Product Step Foundation

**Milestone**
MS-008.21 - Task Workspace Next Product Step Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Expose the existing Project Brain `workflow.nextStep` contract inside the Task Workspace start area as a small read-only block.

**Product Outcome**
The task workspace start area now shows a neutral Next Step Action block when the projected next step exists on the live canonical project/task path.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now derives the next-step view from the task workspace data path and renders the read-only block in the start area when next-step data is available.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now proves the block renders the label and description from the resolved workspace data and stays hidden when no next step exists.
* Targeted verification for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` passed.
* Smoke check confirmed the block is visible on the real live workspace route and remains neutral / read-only.

**Dependencies**
* `MS-008.20 - Task List Card Layout Fix Foundation`

**Allowed Implementation Scope**
* minimal read-only next-step block in the task workspace start area
* focused test coverage for the next-step display contract
* SSOT synchronization for the completed workspace milestone

**Forbidden Scope**
* navigation changes
* persistence changes
* workflow branching
* mutations
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace start-area next-step block
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused verification for the block
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `docs/session-handoffs/2026-08-07_062_SESSION_HANDOFF.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* smoke check of the real task workspace route to confirm the block is visible and neutral

**Rollback / Safety Expectations**
* stop if the next-step block requires broader workflow changes
* stop if the fix requires backend or Project Brain engine changes
* keep the milestone minimal and read-only

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`
* `docs/session-handoffs/2026-08-07_062_SESSION_HANDOFF.md`

## MS-008.20 - Task List Card Layout Fix Foundation

**Milestone**
MS-008.20 - Task List Card Layout Fix Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make task cards on `/projects/[id]/tasks` stretch to a consistent full-width layout while preserving the existing task link behavior.

**Product Outcome**
The project task list now renders each task card as a full-width clickable row with left-aligned content.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/page.tsx` now renders each task card link with `block w-full text-left`.
* `src/app/projects/[id]/tasks/page.test.tsx` now asserts the first task card remains a link, keeps the correct `href`, and carries the full-width layout classes.
* Targeted verification for `src/app/projects/[id]/tasks/page.test.tsx` passed.
* Smoke check confirmed the task card stays clickable, full-width, and evenly laid out.

**Dependencies**
* `MS-008.19 - Dashboard Tasks Link Project Route Fix Foundation`

**Allowed Implementation Scope**
* minimal task card layout fix on the project task list route
* focused test coverage for the task card link wrapper
* SSOT synchronization for the completed layout fix

**Forbidden Scope**
* redesign
* backend persistence
* Project Brain writes
* AI workspace changes
* broad refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/page.tsx` owns the task list card wrapper layout
* `/projects/[id]/tasks` owns the project-specific task list route
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `docs/session-handoffs/2026-08-06_061_SESSION_HANDOFF.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/tasks/page.test.tsx`
* `git diff --check`
* smoke check of `/projects/<id>/tasks` to confirm the cards stay full-width and clickable

**Rollback / Safety Expectations**
* stop if the task card requires broader page redesign
* stop if the fix requires backend or Project Brain changes
* keep the milestone minimal and layout-local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`
* `docs/session-handoffs/2026-08-06_061_SESSION_HANDOFF.md`

## MS-008.19 - Dashboard Tasks Link Project Route Fix Foundation

**Milestone**
MS-008.19 - Dashboard Tasks Link Project Route Fix Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make the dashboard `Open tasks` action route to the project-specific tasks screen by preserving the active project id in the link target.

**Product Outcome**
The project dashboard `Open tasks` CTA now routes to `/projects/[id]/tasks` instead of the shared `/projects/tasks` path.

**Implementation Evidence**
* `src/components/workspace/WorkspaceHeader.tsx` now reads the active route project id and builds the `Open tasks` link with `/projects/${projectId}/tasks`.
* `src/app/projects/[id]/page.test.tsx` now asserts the `Open tasks` link resolves to `/projects/project-1/tasks`.
* Targeted verification for `src/app/projects/[id]/page.test.tsx` passed.
* Product Owner smoke test confirmed the dashboard `Open tasks` CTA now reaches `/projects/<id>/tasks` and no longer reaches `/projects/tasks`.

**Dependencies**
* `MS-008.18 - Main Usability Recovery Regression Verification Foundation`

**Allowed Implementation Scope**
* minimal project-id-preserving route fix for the dashboard `Open tasks` CTA
* focused test coverage for the dashboard route target
* SSOT synchronization for the completed route fix

**Forbidden Scope**
* redesign
* backend persistence
* Project Brain writes
* AI workspace changes
* broad navigation refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/components/workspace/WorkspaceHeader.tsx` owns the dashboard `Open tasks` CTA target
* `/projects/[id]/tasks` owns the project-specific task list route
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `docs/session-handoffs/2026-08-06_061_SESSION_HANDOFF.md` own the synchronized close-state records for this milestone

**Verification Plan**
* targeted test for `src/app/projects/[id]/page.test.tsx`
* `git diff --check`
* smoke verification that the CTA no longer resolves to `/projects/tasks`

**Rollback / Safety Expectations**
* stop if the CTA cannot access the active project id
* stop if the fix requires a broader route or state refactor
* keep the milestone minimal and route-local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`
* `docs/session-handoffs/2026-08-06_061_SESSION_HANDOFF.md`

## MS-008.18 - Main Usability Recovery Regression Verification Foundation

**Milestone**
MS-008.18 - Main Usability Recovery Regression Verification Foundation

**Type**
Docs-Only Verification Foundation

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Record the targeted regression verification for the accumulated main SPS App usability recovery line after confirming the changed routes still pass focused tests.

**Product Outcome**
The repository now records the verification outcome while preserving the already implemented route recovery behavior in the working tree.

**Implementation Evidence**
* `npx.cmd vitest run src/app/page.test.tsx` passed.
* `npx.cmd vitest run src/app/projects/[id]/page.test.tsx` passed.
* `npx.cmd vitest run src/app/projects/[id]/tasks/page.test.tsx` passed.
* `npx.cmd vitest run src/app/projects/[id]/tasks/[taskId]/page.test.tsx` passed.
* `npx.cmd vitest run src/app/projects/[id]/knowledge/page.test.tsx` passed.
* `git diff --check` passed with only CRLF normalization warnings.

**Dependencies**
* `MS-008.17 - SPS App Usability Sweep Diagnosis Foundation`

**Allowed Implementation Scope**
* targeted verification of the main SPS App recovery routes
* docs-only recording of the verification result
* preserving the already implemented usability recovery behavior

**Forbidden Scope**
* backend persistence
* AI workspace
* Project Brain writes
* redesign
* broad navigation refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/page.test.tsx`, `src/app/projects/[id]/page.test.tsx`, `src/app/projects/[id]/tasks/page.test.tsx`, `src/app/projects/[id]/tasks/[taskId]/page.test.tsx`, and `src/app/projects/[id]/knowledge/page.test.tsx` own the already verified recovery behavior
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

## MS-008.15 - Task Detail Stale Context Recovery Foundation

**Milestone**
MS-008.15 - Task Detail Stale Context Recovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Recover the task detail route from stale or missing Project Brain context by falling back to local project and task state so `/projects/[id]/tasks/[taskId]` stays usable instead of dead-ending on a project/task-context error.

**Product Outcome**
The task detail route now recovers from stale server context by rendering locally saved project/task details when the local project and task still exist.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/page.tsx` now falls back to local project/task state when the canonical task load reports a stale project-context error.
* `src/app/projects/[id]/tasks/[taskId]/page.test.tsx` now verifies the stale Project Brain recovery path and preserves the existing task-detail coverage.
* `npx.cmd vitest run src/app/projects/[id]/tasks/[taskId]/page.test.tsx` and `git diff --check` passed during verification.

**Dependencies**
* `MS-008.14 - Project Tasks Stale Context Recovery Foundation`

**Allowed Implementation Scope**
* `src/app/projects/[id]/tasks/[taskId]/page.tsx`
* `src/app/projects/[id]/tasks/[taskId]/page.test.tsx`
* local project/task-state recovery for the task detail route

**Forbidden Scope**
* backend persistence
* AI workspace
* Project Brain writes
* redesign
* broad navigation refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/page.tsx` owns the task detail recovery behavior
* `src/app/projects/[id]/tasks/[taskId]/page.test.tsx` owns the focused recovery verification
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

## MS-008.14 - Project Tasks Stale Context Recovery Foundation

**Milestone**
MS-008.14 - Project Tasks Stale Context Recovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Recover the project tasks route from stale or missing Project Brain context by falling back to local project task state so `/projects/[id]/tasks` stays usable instead of dead-ending on a project-context error.

**Product Outcome**
The project tasks route now recovers from stale server context by rendering locally saved tasks when the local project still exists.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/page.tsx` now falls back to local project task state when the canonical task load reports a stale project-context error.
* `src/app/projects/[id]/tasks/page.test.tsx` now verifies the stale Project Brain recovery path and preserves the existing submit behavior coverage.
* `npx.cmd vitest run src/app/projects/[id]/tasks/page.test.tsx` and `git diff --check` passed during verification.

**Dependencies**
* `MS-008.13 - Project Not Found Recovery Foundation`

**Allowed Implementation Scope**
* `src/app/projects/[id]/tasks/page.tsx`
* `src/app/projects/[id]/tasks/page.test.tsx`
* local project/task-state recovery for the project tasks route

**Forbidden Scope**
* backend persistence
* AI workspace
* Project Brain writes
* redesign
* broad navigation refactor
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/page.tsx` owns the project tasks recovery behavior
* `src/app/projects/[id]/tasks/page.test.tsx` owns the focused recovery verification
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `npx.cmd vitest run src/app/projects/[id]/tasks/page.test.tsx`
* `git diff --check`
* `git status -sb`

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved application milestone is defined.

**Rollback / Safety Expectations**
* stop if recovery needs backend persistence, AI workspace work, Project Brain writes, redesign, broad navigation refactoring, or unrelated cleanup
* keep the recovery minimal and route-focused

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`

## MS-008.13 - Project Not Found Recovery Foundation

**Milestone**
MS-008.13 - Project Not Found Recovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Recover the project overview route from a stale or missing Project Brain workspace entry by falling back to local project state so `/projects/[id]` stays usable instead of dead-ending on `Project not found`.

**Product Outcome**
The project overview route now recovers from a stale Project Brain miss by rendering the local project workspace shell when local project data is still available.

**Implementation Evidence**
* `src/app/projects/[id]/page.tsx` now falls back to local project, task, and knowledge state when the Project Brain workspace entry is unavailable.
* `src/app/projects/[id]/page.test.tsx` now verifies the stale Project Brain recovery path and keeps the delete flow intact.
* `npx.cmd vitest run src/app/projects/[id]/page.test.tsx` and `git diff --check` passed during verification.

**Dependencies**
* `MS-008.12 - SPS App Usability Recovery Foundation`

**Allowed Implementation Scope**
* `src/app/projects/[id]/page.tsx`
* `src/app/projects/[id]/page.test.tsx`
* local project-state recovery for the project overview route

**Forbidden Scope**
* backend persistence
* Project Brain writes
* AI workspace
* project overview redesign
* route redesign
* broad UI polish
* unrelated refactor

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the project overview recovery behavior
* `src/app/projects/[id]/page.test.tsx` owns the focused recovery verification
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `npx.cmd vitest run src/app/projects/[id]/page.test.tsx`
* `git diff --check`
* `git status -sb`

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved application milestone is defined.

**Rollback / Safety Expectations**
* stop if recovery needs backend persistence, Project Brain writes, AI workspace work, project overview redesign, route redesign, broad UI polish, or unrelated refactoring
* keep the recovery minimal and route-focused

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`

## MS-008.12 - SPS App Usability Recovery Foundation

**Milestone**
MS-008.12 - SPS App Usability Recovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Recover the SPS App main navigation by making the Home `Continue` action open the latest real project instead of the empty workspace landing page, so the first step of the app returns the user to a useful project screen and the main project -> task -> workspace journey stays reachable.

**Product Outcome**
The Home `Continue` action now routes to the latest available project in local storage, or to `/projects` when no projects exist, instead of leading to the empty `/workspace` screen.

**Implementation Evidence**
* `src/app/page.tsx` now computes the `Continue` destination from the latest local project and falls back to `/projects`.
* `src/app/page.test.tsx` now verifies the `Continue` link opens the latest project.
* `git diff --check` and the targeted Home test passed during verification.

**Dependencies**
* `MS-008.11 - Task Workspace Completion State Persistence Foundation`

**Allowed Implementation Scope**
* `src/app/page.tsx`
* `src/app/page.test.tsx`
* Home navigation recovery for the main SPS App entrypoint

**Forbidden Scope**
* backend persistence
* Project Brain writes
* AI workspace changes
* route redesign
* broad UI polish
* unrelated refactor

**Ownership Boundaries**
* `src/app/page.tsx` owns the Home continue destination
* `src/app/page.test.tsx` owns the Home continue verification
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `npx.cmd vitest run src/app/page.test.tsx`
* `git diff --check`
* `git status -sb`

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved application milestone is defined.

**Rollback / Safety Expectations**
* stop if fixing the Home continue path needs backend persistence, Project Brain writes, AI workspace work, route redesign, broad UI polish, or unrelated refactoring
* keep the milestone minimal and navigation-focused

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`

## MS-008.11 - Task Workspace Completion State Persistence Foundation

**Milestone**
MS-008.11 - Task Workspace Completion State Persistence Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the next small application milestone after MS-008.10: persist local task completion and evidence review state for the task workspace so returning to the same project/task workspace preserves completion and review context analogously to existing result-notes persistence.

**Product Outcome**
The repository now persists local task completion and evidence review state for the task workspace so returning to the same project/task workspace preserves completion and review context analogously to existing result-notes persistence.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now stores and restores task-scoped completion and evidence-review state under local persistence keys alongside the existing result-notes persistence.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies completion state, evidence-review state, revisit restoration, and reset behavior when result notes materially change.
* `git diff --check` and the targeted workspace test passed during verification.

**Dependencies**
* `MS-008.10 - Task Workspace Usable Flow Completion Summary Foundation`

**Allowed Implementation Scope**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx`
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* local-only persistence
* task-scoped by `projectId` / `taskId`
* preserve task completion state and evidence review acknowledgement state after reload or revisit
* reset completion and review state when result notes materially change if that matches existing workspace behavior

**Forbidden Scope**
* backend persistence
* Project Brain writes
* AI workspace
* project overview redesign
* route redesign
* new task flow changes
* broad UI polish
* refactoring unrelated workspace logic

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `git status -sb`
* `git diff --check`
* targeted SSOT consistency check across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved application milestone is defined.

**Rollback / Safety Expectations**
* stop if the implementation needs backend persistence, Project Brain writes, AI workspace work, project overview redesign, route redesign, new task flow changes, broad UI polish, or unrelated workspace logic refactoring
* stop if the scope expands beyond local-only task-scoped workspace persistence
* keep the milestone minimal and documentation-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`

## MS-008.10 - Task Workspace Usable Flow Completion Summary Foundation

**Milestone**
MS-008.10 - Task Workspace Usable Flow Completion Summary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Close the current MS-008 usable task/workspace evidence line by recording a minimal completion summary that the flow now supports: entering task workspace, saving result notes, leaving/returning, and preserving task context and saved notes.

**Product Outcome**
The repository now records the usable task/workspace flow completion summary and keeps the verified result-notes persistence and return-link evidence aligned.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` already proves the workspace can save result notes, leave through the task detail route, return through the existing `Open task workspace` link, and preserve task context plus saved notes.
* `git diff --check` and the targeted workspace test passed during verification.

**Dependencies**
* `MS-008.9 - Task Workspace Return Link Usability Evidence Foundation`

**Allowed Implementation Scope**
* completion-summary SSOT updates
* focused workspace evidence alignment

**Forbidden Scope**
* route redesign
* project flow redesign
* task creation redesign
* AI workspace changes
* broad persistence layer changes
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `npx.cmd vitest run src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* `git status -sb`

**Codex Implementation Handoff Boundary**

## MS-008.9 - Task Workspace Return Link Usability Evidence Foundation

**Milestone**
MS-008.9 - Task Workspace Return Link Usability Evidence Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Prove the existing task/workspace flow remains usable after result-notes persistence: user can enter workspace, save result notes, return through existing task/project navigation, and re-enter workspace without losing task context or saved notes.

**Product Outcome**
The workspace return-link path now proves the same task context and saved result notes remain available after leaving and returning through the existing task detail navigation flow.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now proves the saved result notes and task context survive leaving the workspace, opening the task detail route, and returning through the existing `Open task workspace` link.
* `git diff --check` and the targeted workspace test passed during verification.

**Dependencies**
* `MS-008.8 - Task Workspace Result Notes Revisit Evidence Foundation`

**Allowed Implementation Scope**
* return-link usability evidence for task workspace result notes
* SSOT synchronization
* focused workspace testing

**Forbidden Scope**
* route redesign
* project flow redesign
* task creation redesign
* AI workspace changes
* broad persistence layer changes
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the return-link usability evidence
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `npx.cmd vitest run src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* `git status -sb`

**Codex Implementation Handoff Boundary**

## MS-008.8 - Task Workspace Result Notes Revisit Evidence Foundation

**Milestone**
MS-008.8 - Task Workspace Result Notes Revisit Evidence Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Verify and strengthen the existing usable task/workspace flow after MS-008.7 by proving saved result notes remain available when returning to the same task workspace from the existing project/task navigation path.

**Product Outcome**
The workspace revisit path now proves saved result notes remain available after leaving and returning through the existing task detail link flow.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now proves saved result notes survive leaving the workspace, opening the task detail route, and returning through the existing `Open task workspace` link.
* `git diff --check` and the targeted workspace test passed during verification.

**Dependencies**
* `MS-008.7 - Task Workspace Result Notes Persistence Foundation`

**Allowed Implementation Scope**
* revisit evidence for task workspace result notes
* SSOT synchronization
* focused workspace testing

**Forbidden Scope**
* route redesign
* project flow redesign
* task creation redesign
* AI workspace changes
* broad persistence layer changes
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the revisit evidence
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `npx.cmd vitest run src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* `git status -sb`

**Codex Implementation Handoff Boundary**

## MS-008.7 - Task Workspace Result Notes Persistence Foundation

**Milestone**
MS-008.7 - Task Workspace Result Notes Persistence Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make saved task workspace result notes persist through the existing SPS project/task/workspace flow and survive page reload or revisit, while keeping the change local to the workspace and avoiding any broader task, project, or route redesign.

**Product Outcome**
The task workspace now restores saved result notes for the active project task after reload or revisit, and the visible workspace behavior otherwise stays the same.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now stores saved result notes under a task-scoped local persistence key and restores them when the workspace mounts.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies saved notes survive a revisit to the same task workspace.
* `git diff --check` and the targeted workspace test passed during verification.

**Dependencies**
* `MS-008.6 - Next Usable SPS App State Discovery Foundation`

**Allowed Implementation Scope**
* task workspace result notes persistence
* SSOT synchronization
* focused workspace testing

**Forbidden Scope**
* route redesign
* project flow redesign
* task creation redesign
* AI workspace changes
* broad persistence layer changes
* unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` owns the task workspace result notes persistence behavior
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` owns the focused revisit verification
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this product milestone

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `npx.cmd vitest run src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**

## MS-008.6 - Next Usable SPS App State Discovery Foundation

**Milestone**
MS-008.6 - Next Usable SPS App State Discovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Decide and record the smallest next application milestone needed to make the SPS task/workspace flow more usable after MS-008.5, while keeping the step docs-only and avoiding any UI, route, or product behavior changes.

**Product Outcome**
The repository now records the next smallest application-state discovery boundary for the task/workspace flow, and the live product behavior remains unchanged.

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records the MS-008.6 discovery contract while preserving the MS-008.5 latest completed milestone baseline.
* `docs/08_CURRENT_STATE.md` keeps `Latest Completed Product Milestone` at `MS-008.21 - Task Workspace Next Product Step Foundation`.
* `docs/09_CHANGELOG.md` now records the published discovery milestone in the official history.
* no application code, UI, route, persistence, or product behavior changed.

**Dependencies**
* `MS-008.5 - Project and Task Flow Reliability Foundation`

**Allowed Implementation Scope**
* docs-only product discovery
* SSOT synchronization
* publication metadata
* history recording for the completed discovery milestone

**Forbidden Scope**
* UI changes
* product behavior changes
* route changes
* persistence changes
* provider/model wiring
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the synchronized SSOT snapshot for this docs-only milestone
* any future implementation must stay outside UI or product behavior until a separate Product Owner-approved milestone exists

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md`
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue after a separate Product Owner-approved application milestone is defined.

**Rollback / Safety Expectations**
* stop if the discovery step needs UI or product behavior
* stop if the scope expands beyond docs-only product discovery
* keep the milestone minimal and documentation-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`

## MS-008.5 - Project and Task Flow Reliability Foundation

**Milestone**
MS-008.5 - Project and Task Flow Reliability Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make the first practical SPS OS project-use path dependable by keeping project create/load and task create/load usable when the database-backed route layer is unavailable, while preserving the existing task detail and workspace flow.

**Product Outcome**
The project -> task -> detail -> workspace chain now falls back to a local runtime store when the database path is unavailable, so the project and task entry points stay usable for the real project workflow.

**Implementation Evidence**
* `src/lib/project/server.ts` now preserves project create/load/delete continuity with a local runtime fallback when the database is unavailable.
* `src/lib/task/server.ts` now preserves task create/load continuity with a local runtime fallback when the database is unavailable.
* `src/lib/task/http-server.ts` now checks project existence before task creation so the task intake path stays aligned with the canonical project route.
* `src/lib/project/server.test.ts`, `src/lib/task/server.test.ts`, and `src/lib/task/http-server.test.ts` now cover the fallback and route continuity behavior.
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` now keep the SSOT snapshot aligned with the published milestone.

**Dependencies**
* `MS-008.4 - Task Workspace Evidence Review Action Boundary Foundation`

**Allowed Implementation Scope**
* small project and task reliability fallback in server helpers
* focused route/server tests for project and task continuity
* SSOT verification and publication metadata
* usage record for the Codex task

**Forbidden Scope**
* task workspace UX hint work
* AI workspace changes
* project overview redesign
* broad routing redesign
* provider/model wiring
* completion-summary redesign
* evidence-review expansion
* persistence schema expansion unless strictly required for the minimal reliability fix
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* any future implementation must stay inside the project and task flow reliability surface only

**Verification Plan**
* `git status -sb`
* `git diff --check`
* targeted project/task route and server tests
* optional cheap route continuity verification if the local server is available
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md docs/10_SESSION_STATE.md src/lib/project/server.ts src/lib/project/server.test.ts src/lib/task/server.ts src/lib/task/server.test.ts src/lib/task/http-server.ts src/lib/task/http-server.test.ts`
* append exactly one `.usage/session.jsonl` record for Session 057
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue inside project and task flow reliability and must not expand into task workspace UI polish, AI workspace, project overview redesign, completion-summary redesign, or unrelated flow changes.

**Rollback / Safety Expectations**
* stop if the reliability fix needs schema changes or a broader persistence layer
* stop if the scope expands beyond project and task create/load continuity
* keep the milestone minimal and local to the project/task route and server surface

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.4 - Task Workspace Evidence Review Action Boundary Foundation

**Milestone**
MS-008.4 - Task Workspace Evidence Review Action Boundary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make the evidence review step a clearer first-class action boundary in the task workspace so the save, review, and complete progression is easier to understand without changing the local-only flow.

**Product Outcome**
The task workspace now shows a short progression hint in the evidence review area that makes the save -> review -> complete sequence clearer while keeping the behavior local.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now shows a short evidence-review progression hint in the task result panel.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now covers the visible progression hint along with the existing review and completion states.
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` now keep the SSOT snapshot aligned with the published milestone.

**Dependencies**
* `MS-008.3 - Task Workspace Evidence Review Continuation Contract Foundation`

**Allowed Implementation Scope**
* one small UI clarity improvement in the task workspace evidence review area
* focused task workspace test coverage
* SSOT verification and publication metadata
* usage record for the Codex task

**Forbidden Scope**
* persistence work
* API routes
* provider/model wiring
* routing redesign
* project overview changes
* AI workspace changes
* broad task flow redesign
* unrelated refactors
* expanding beyond the task workspace evidence review surface

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* any future implementation must stay inside the task workspace evidence review surface only

**Verification Plan**
* `git status -sb`
* `npm.cmd test -- src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md docs/10_SESSION_STATE.md src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* append exactly one `.usage/session.jsonl` record for Session 057
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue inside the task workspace evidence review surface and must not expand into persistence, routing, AI workspace, project overview, or unrelated task flow changes.

**Rollback / Safety Expectations**
* stop if the clarity hint needs broader workspace refactoring
* stop if the scope expands beyond task workspace evidence review continuity
* keep the milestone minimal and local to the task workspace evidence surface

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.3 - Task Workspace Evidence Review Continuation Contract Foundation

**Milestone**
MS-008.3 - Task Workspace Evidence Review Continuation Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Formalize the next safe continuation boundary for task workspace evidence review after the completion summary milestone without introducing product behavior or widening the task workspace surface.

**Product Outcome**
The repository now captures the MS-008.3 continuation contract as a docs-only milestone and keeps Current Product Milestone at NONE until a separate Product Owner decision is recorded.

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records the MS-008.3 continuation contract as the latest completed milestone.
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` now keep the synchronized SSOT snapshot aligned with the published contract.
* no application code, persistence, routing, AI workspace, or project overview behavior changed.

**Dependencies**
* `MS-008.2 - Task Workspace Evidence Review Completion Summary Foundation`

**Allowed Implementation Scope**
* docs-only continuation contract publication
* SSOT verification and publication metadata
* usage record for the Codex task

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* unrelated refactors
* expanding beyond the approved task workspace evidence review continuation boundary

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* any future implementation must stay inside the task workspace evidence review surface only

**Verification Plan**
* `git status -sb`
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md docs/10_SESSION_STATE.md`
* `git diff --check`
* append exactly one `.usage/session.jsonl` record for Session 057
* confirm no unrelated files were changed

**Codex Implementation Handoff Boundary**
* If implementation is approved later, Codex may only continue inside the task workspace evidence review surface and must not expand into persistence, routing, AI workspace, project overview, or unrelated task flow changes.

**Rollback / Safety Expectations**
* stop if the continuation contract needs product behavior
* stop if the scope expands beyond task workspace evidence review continuity
* keep the milestone minimal and docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.2 - Task Workspace Evidence Review Completion Summary Foundation

**Milestone**
MS-008.2 - Task Workspace Evidence Review Completion Summary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make the acknowledged evidence review outcome visible in the task workspace completion summary and final task outcome while keeping the behavior local to task workspace and tied only to existing local review state.

**Product Outcome**
The task workspace completion summary now reflects the local evidence review acknowledgement state, and the final task outcome shows the acknowledged review alongside the saved result notes.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now keeps the acknowledged review state visible through completion and shows it in the completion summary and task completion handoff.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now covers the acknowledged review state in the completion summary and confirms it clears again when the result changes.
* no persistence, project overview, AI workspace, routing, or broader handoff flow changed.

**Dependencies**
* `MS-008.1 - Task Workspace Evidence Review Action Foundation`

**Allowed Implementation Scope**
* completion summary visibility for the acknowledged evidence review state
* final task outcome visibility for the acknowledged evidence review state
* focused task workspace test coverage
* SSOT verification and publication metadata

**Forbidden Scope**
* persistence work
* project overview changes
* AI workspace changes
* routing changes
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* product implementation stays outside this contract

**Verification Plan**
* `npm.cmd test -- src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no unrelated files were changed

**Rollback / Safety Expectations**
* stop if the completion summary needs broader workspace refactoring
* keep the milestone minimal and local to the task workspace evidence surface

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.1 - Task Workspace Evidence Review Action Foundation

**Milestone**
MS-008.1 - Task Workspace Evidence Review Action Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Add the smallest explicit task workspace evidence review action directly inside the visible Evidence Review panel while keeping the action local to the task workspace and tied only to existing local result and completion state.

**Product Outcome**
The task workspace now exposes an `Acknowledge review` action in the Evidence Review panel, and the visible review state updates locally without changing persistence or unrelated task flows.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now renders the `Acknowledge review` action inside the Evidence Review panel.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now keeps the review action local to task workspace state and resets it when the underlying result changes.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now covers the disabled initial action, the visible acknowledgement state, and the reset behavior after result edits.
* no persistence, project overview, AI workspace, or unrelated task flow behavior changed.

**Dependencies**
* `MS-008.0 - Task Workspace Evidence Visibility Foundation`

**Allowed Implementation Scope**
* one explicit local evidence review action in task workspace
* local review acknowledgement state only
* focused task workspace test coverage
* SSOT verification and publication metadata

**Forbidden Scope**
* persistence work
* project overview changes
* AI workspace changes
* broader task flow redesign
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* product implementation stays outside this contract

**Verification Plan**
* `npm.cmd test -- src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no unrelated files were changed

**Rollback / Safety Expectations**
* stop if the review action requires broader workspace refactoring
* keep the milestone minimal and local to the task workspace evidence surface

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-008.0 - Task Workspace Evidence Visibility Foundation

**Milestone**
MS-008.0 - Task Workspace Evidence Visibility Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Product Owner

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make task workspace evidence and review visible at the point where task work happens without widening the new-task flow or changing unrelated project surfaces.

**Product Outcome**
The task workspace now shows a visible Evidence Review panel tied to local result notes and completion state, while preserving repository context, handoff, result capture, save, completion, and completion-summary behavior.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now renders the Evidence Review panel from local result and completion state.
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now covers the visible evidence status before save, after save, after completion, and after edits reset the status.
* no unrelated task flow, project flow, or handoff behavior changed.

**Dependencies**
* `MS-007.6 - New Task Flow Result Evidence Contract Foundation`

**Allowed Implementation Scope**
* visible task workspace evidence/review foundation
* local result-state and completion-state presentation
* focused task workspace test coverage
* SSOT verification and publication metadata

**Forbidden Scope**
* unrelated task flow changes
* project workspace redesign
* repository-context redesign
* broader completion-flow changes
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* product implementation stays outside this contract

**Verification Plan**
* `npm.cmd test -- src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx`
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no unrelated files were changed

**Rollback / Safety Expectations**
* stop if evidence visibility requires broader workspace refactoring
* keep the milestone minimal and local to the task workspace evidence surface

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-007.0 - New Task Pilot Execution Foundation

**Milestone**
MS-007.0 - New Task Pilot Execution Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the first real pilot execution foundation for the new-task flow so the next Codex step can verify real repository status, SSOT continuity, and result reporting without introducing application code.

**Product Outcome**
The repository records the pilot execution foundation, the minimal verification scope, the usage record requirement, and the next safe step for the first real new-task pilot.

**Dependencies**
* `MS-006.2 - New Task Start Contract Foundation`
* `MS-006.3 - New Task Repository / Workspace Intake Foundation`
* `MS-006.4 - New Task Handoff To Codex Foundation`
* `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`
* `docs/15_SESSION_CLOSE_PROTOCOL.md`

**Allowed Implementation Scope**
* docs-only pilot execution foundation
* real repository status verification wording
* SSOT verification and result-report wording
* usage-record wording for the Codex task
* publication metadata for the milestone

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* Project Brain write paths
* unrelated refactors
* expanding beyond the approved new-task pilot

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* `docs/session-handoffs/*` stays outside this milestone unless the session is being closed

**Verification Plan**
* `git status -sb`
* `git log --oneline -5`
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* append the required `.usage/session.jsonl` record
* confirm no `src` changes were introduced

**Rollback / Safety Expectations**
* stop if the pilot requires application code changes
* stop if the pilot requires additional architecture cleanup
* stop if repository evidence and SSOT cannot stay consistent
* keep the milestone docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-007.1 - Project Creation Server Persistence Foundation

**Milestone**
MS-007.1 - Project Creation Server Persistence Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Make project creation persist through the same server-side Project Brain/state boundary used by task APIs so a freshly created project can immediately accept tasks.

**Product Outcome**
The repository now persists newly created projects through the server-side project boundary and keeps the local workspace list in sync, allowing the fresh project to accept tasks immediately.

**Dependencies**
* `MS-007.0 - New Task Pilot Execution Foundation`
* `src/lib/project/server.ts`
* `src/lib/task/http-server.ts`

**Allowed Implementation Scope**
* server-side project persistence for creation
* client project create flow alignment
* targeted tests for the project/task creation boundary
* publication metadata for the milestone

**Forbidden Scope**
* broad storage-model replacement
* unrelated UI redesign
* client-side error hiding
* Project Brain ownership changes
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* Project Brain remains the shared server-side state boundary used by task APIs

## MS-007.2 - Task Workspace Link Route Foundation

**Milestone**
MS-007.2 - Task Workspace Link Route Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Fix the task detail workspace link so it preserves both `projectId` and `taskId` when opening the task workspace.

**Product Outcome**
The task detail `Open task workspace` link now routes directly to `/projects/[id]/tasks/[taskId]/workspace` and keeps the task workspace route intact.

**Dependencies**
* `MS-007.1 - Project Creation Server Persistence Foundation`
* `src/app/projects/[id]/tasks/[taskId]/page.tsx`
* `src/app/projects/[id]/tasks/[taskId]/page.test.tsx`

**Allowed Implementation Scope**
* task detail workspace link route
* targeted test coverage for the link href
* publication metadata for the milestone

**Forbidden Scope**
* broad route refactor
* UI redesign
* storage changes
* unrelated test cleanup
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* task workspace content remains owned by the existing workspace route

**Verification Plan**
* targeted project and task creation tests
* real pilot rerun through project creation -> task creation -> handoff surface

## MS-007.3 - New Task Flow Final Pilot Foundation

**Milestone**
MS-007.3 - New Task Flow Final Pilot Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Run the final real pilot of the new-task flow after the project persistence fix and task workspace link fix, and record the verified end-to-end result in SSOT.

**Product Outcome**
The repository now proves the final new-task flow pilot passes end to end: `/projects` creates a fresh project, the fresh project opens task intake, a fresh task opens its detail page, the task workspace link preserves both `projectId` and `taskId`, and the `Handoff to Codex` surface is visible and reachable.

**Dependencies**
* `MS-007.2 - Task Workspace Link Route Foundation`
* real browser pilot path through project creation, task creation, task detail, and task workspace

**Allowed Implementation Scope**
* docs-only final pilot publication
* real pilot verification wording
* SSOT verification and result-report wording
* usage-record wording for the Codex task
* publication metadata for the milestone

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* unrelated refactors
* expanding beyond the approved final new-task pilot

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* `docs/session-handoffs/*` stays outside this milestone unless the session is being closed

**Verification Plan**
* `git status -sb`
* `git diff --check`
* real browser pilot path through `/projects` -> create project -> add task -> open detail -> open task workspace -> confirm handoff surface
* append the required `.usage/session.jsonl` record
* confirm no `src` changes were introduced
* `git diff --check`
* confirm no unrelated `src` changes were introduced beyond the narrow boundary fix

**Rollback / Safety Expectations**
* stop if the fix requires a broad storage rewrite
* stop if the project-task boundary still leaves fresh projects invisible to tasks
* keep the milestone narrow and consistent with the existing server boundary

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-007.4 - Session Close Package Freshness Guard

**Milestone**
MS-007.4 - Session Close Package Freshness Guard

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the session-close package freshness guard that requires the final close commit to be pushed and the repository to be clean and aligned before a fresh `sps-session.zip` is generated.

**Product Outcome**
The repository now proves the fresh session package is generated only after the final close push, and the resulting package reflects the same SSOT state as the source documents.

**Dependencies**
* `MS-007.3 - New Task Flow Final Pilot Foundation`
* `docs/15_SESSION_CLOSE_PROTOCOL.md`

**Allowed Implementation Scope**
* docs-only close package freshness publication
* SSOT verification and result-report wording
* package freshness verification wording
* publication metadata for the milestone

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* unrelated refactors
* expanding beyond the approved close-package freshness guard

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* `docs/session-handoffs/*` stays outside this milestone unless the session is being closed

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `powershell -ExecutionPolicy Bypass -File .\scripts\New-SpsSession.ps1 -ValidationOnly`
* regenerate the fresh session package only after the close push and clean/aligned repo state
* confirm no `src` changes were introduced

**Rollback / Safety Expectations**
* stop if the freshness guard cannot be expressed as docs-only SSOT publication
* stop if the package generator would still consume stale milestone state
* keep the milestone narrow and consistent with the existing close protocol

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`
* `docs/session-handoffs/2026-08-04_055_SESSION_HANDOFF.md`

## MS-007.5 - New Task Flow Result Review Foundation

**Milestone**
MS-007.5 - New Task Flow Result Review Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Formalize the reviewed New Task Flow result so SSOT records the verified end-to-end outcome and review summary without changing application behavior.

**Product Outcome**
The repository now captures the reviewed New Task Flow result as a docs-only milestone and keeps the next product milestone at NONE until a separate Product Owner decision is recorded.

**Dependencies**
* `MS-007.4 - Session Close Package Freshness Guard`

**Allowed Implementation Scope**
* docs-only result review publication
* SSOT verification and result-summary wording
* publication metadata for the milestone

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* unrelated refactors
* expanding beyond the approved result review boundary

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* `docs/session-handoffs/*` stays outside this milestone unless the session is being closed

**Verification Plan**
* `git status -sb`
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`

**Rollback / Safety Expectations**
* stop if the result review requires application code or any broader follow-up
* keep the milestone narrow and docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-007.6 - New Task Flow Result Evidence Contract Foundation

**Milestone**
MS-007.6 - New Task Flow Result Evidence Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Formalize the exact evidence contract for the reviewed New Task Flow result so SSOT can record what must exist before the review is accepted as complete.

**Product Outcome**
The repository now captures the New Task Flow result evidence contract as a docs-only milestone and keeps the next product milestone at NONE until a separate Product Owner decision is recorded.

**Dependencies**
* `MS-007.5 - New Task Flow Result Review Foundation`

**Allowed Implementation Scope**
* docs-only evidence contract publication
* SSOT verification and result-evidence wording
* publication metadata for the milestone

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* unrelated refactors
* expanding beyond the approved evidence contract boundary

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* `docs/session-handoffs/*` stays outside this milestone unless the session is being closed

**Verification Plan**
* `git status -sb`
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`

**Rollback / Safety Expectations**
* stop if the evidence contract requires application code or broader follow-up
* keep the milestone narrow and docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-006.4 - New Task Handoff To Codex Foundation

**Milestone**
MS-006.4 - New Task Handoff To Codex Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Product Owner Decision**
ACCEPT

**Purpose**
Define the minimal handoff-to-Codex contract for a new task after the task start contract and repository/workspace intake foundation already exist, without expanding into any later milestone.

**Product Outcome**
The roadmap now records the handoff contents, role boundary, repository/workspace context, verification expectations, and reporting expectations for handing a new task to Codex.

**Dependencies**
* closed `MS-006.2 - New Task Start Contract Foundation`
* closed `MS-006.3 - New Task Repository / Workspace Intake Foundation`

**Required Handoff Contents**
* task title
* task objective
* repository/workspace context
* source of truth pointer
* verification expectations
* reporting expectations

**Allowed Implementation Scope**
* handoff contents wording
* role-boundary wording
* repository/workspace context wording
* verification/reporting expectation wording
* SSOT continuity updates
* publication metadata for the milestone

**Forbidden Scope**
* any post-handoff milestone
* `src` changes
* feature implementation
* expanding the queue beyond the approved three steps
* alternative product directions
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* the Codex handoff itself stays outside the next product milestone

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no `src` changes were introduced

**Rollback / Safety Expectations**
* stop if a later milestone starts before a separate Product Owner decision
* stop if handoff scope expands beyond Codex transfer preparation
* keep the contract docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-006.3 - New Task Repository / Workspace Intake Foundation

**Milestone**
MS-006.3 - New Task Repository / Workspace Intake Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Product Owner Decision**
ACCEPT

**Purpose**
Define the minimal repository/workspace intake contract for connecting a new task to the right repository or workspace while keeping the final Codex handoff flow out of scope until MS-006.4.

**Product Outcome**
The roadmap now records the intake data needed to connect a new task to a repository/workspace and the boundary that stops short of the full handoff-to-Codex flow.

**Required Inputs**
* task title
* task objective
* repository or workspace reference
* source of truth pointer for the intake
* explicit handoff constraints

**Allowed Implementation Scope**
* intake wording
* required input wording
* validation expectations
* boundary wording that excludes the final handoff flow
* SSOT continuity updates
* publication metadata for the milestone

**Forbidden Scope**
* full Codex handoff flow
* `src` changes
* feature implementation
* expanding the queue beyond the approved three steps
* alternative product directions
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* repository/workspace intake preparation stays outside the final handoff to Codex

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no `src` changes were introduced

**Rollback / Safety Expectations**
* stop if the full handoff flow needs to begin before MS-006.4
* stop if implementation scope grows beyond intake contract wording
* keep the contract docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-006.2 - New Task Start Contract Foundation

**Milestone**
MS-006.2 - New Task Start Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Product Owner Decision**
ACCEPT

**Purpose**
Define the minimal contract for starting a new task so the required inputs, handoff boundary, and role split are explicit before repository/workspace intake begins in MS-006.3.

**Product Outcome**
The roadmap now records the new-task start contract boundary, the required inputs for a new task, and the point where task start stops before repository/workspace intake.

**Required Inputs**
* task title
* task objective
* source of truth pointer for the task start
* owning session or chat context
* explicit handoff constraints

**Allowed Implementation Scope**
* start-contract wording
* required input wording
* boundary wording that excludes repository/workspace intake
* SSOT continuity updates
* publication metadata for the milestone

**Forbidden Scope**
* repository/workspace intake
* `src` changes
* feature implementation
* expanding the queue beyond the approved three steps
* alternative product directions
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* task start preparation stays outside repository/workspace intake

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no `src` changes were introduced

**Rollback / Safety Expectations**
* stop if repository/workspace intake needs to begin before MS-006.3
* stop if implementation scope grows beyond task start contract wording
* keep the contract docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-006.1 - Next Milestone Queue Foundation

**Milestone**
MS-006.1 - Next Milestone Queue Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Product Owner Decision**
ACCEPT

**Purpose**
Define a single ordered queue of the next small milestones after MS-006.0 so the next execution step can be chosen without guessing.

**Product Outcome**
The roadmap now includes a compact, ordered queue of the next executable milestones while keeping implementation out of scope until each later milestone is separately approved.

**Queued Next Milestones**
1. `MS-006.2 - New Task Start Contract Foundation`
2. `MS-006.3 - New Task Repository / Workspace Intake Foundation`
3. `MS-006.4 - New Task Handoff To Codex Foundation`

**Allowed Implementation Scope**
* queue wording for the next small milestones
* SSOT continuity updates
* publication metadata for the milestone

**Forbidden Scope**
* `src` changes
* feature implementation
* expanding the queue beyond the approved three steps
* alternative product directions
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* product implementation stays outside this contract

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no `src` changes were introduced

**Rollback / Safety Expectations**
* stop if a later step needs multiple competing options
* stop if implementation scope appears before approval of a later milestone
* keep the queue docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-006.0 - Next Milestone Direction Contract Foundation

**Milestone**
MS-006.0 - Next Milestone Direction Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
YES

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Product Owner Decision**
ACCEPT

**Purpose**
Close the post-MS-005.2 roadmap gap by naming the next approved direction contract and establishing the minimal SSOT boundary for subsequent small milestones.

**Product Outcome**
The roadmap now has an explicit current direction contract that points future work toward a single approved development axis while keeping implementation out of scope until a later milestone is separately approved.

**Allowed Implementation Scope**
* formal next-direction contract wording
* SSOT continuity updates
* publication metadata for the milestone

**Forbidden Scope**
* `src` changes
* feature implementation
* alternative product directions
* roadmap expansion beyond one approved direction
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot
* product implementation stays outside this contract

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no `src` changes were introduced

**Rollback / Safety Expectations**
* stop if the next direction needs multiple competing options
* stop if implementation scope appears before approval of a later milestone
* keep the contract docs-only

**Documentation Updates**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-004.0 - External Integrations Foundation

**Milestone**
MS-004.0 - External Integrations Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the smallest provider-neutral boundary for future external integrations so the project can name one canonical integration entry point without changing application code, Project Brain ownership, or connector-specific implementation details.

**Product Outcome**
The repository has one approved contract for an `External Integrations` entry point that can be used as the canonical starting point for future connector work while keeping project truth in Project Brain and keeping provider/model wiring out of scope.

**Dependencies**
* `MS-002.t - AI Chat, Prompts, and Agents Foundation`
* `docs/05_ROADMAP.md`

**Allowed Implementation Scope**
* one provider-neutral external integrations entry point
* ownership boundary wording for future connectors
* verification-path wording for docs-only SSOT publication

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* Project Brain write paths
* connector-specific implementation
* unrelated refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* future connector implementations own their connector-specific wiring
* Project Brain remains the canonical source of project truth
* provider/model wiring remains outside this contract

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no application, provider, persistence, or Project Brain write-path changes were introduced

**Rollback / Safety Expectations**
* stop if the integration entry point needs connector-specific implementation
* stop if the integration boundary needs Project Brain write paths
* keep the milestone non-active until Product Owner approval is recorded

**Documentation Updates**
* `docs/05_ROADMAP.md`
* `docs/06_BACKLOG.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-005.0 - SPS OS Pilot Test Foundation

**Milestone**
MS-005.0 - SPS OS Pilot Test Foundation

**Type**
Documentation Contract

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the smallest controlled SPS OS pilot test contract that spans Project creation, Task creation, Codex handoff, Result capture, Completion, Session Close, and a clean START handoff without changing application code.

**Product Outcome**
The repository documents one controlled SPS OS pilot test sequence that can be used to verify the end-to-end session flow from Project to Task to Codex Handoff to Result to Completion to Session Close to a clean START.

**Dependencies**
* `MS-004.0 - External Integrations Foundation`
* `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`
* `docs/15_SESSION_CLOSE_PROTOCOL.md`

**Allowed Implementation Scope**
* docs-only pilot test contract
* session identity and handoff wording for the controlled SPS OS flow
* verification wording for the clean START and session close sequence

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* Project Brain write paths
* executing the actual pilot test without Product Owner approval
* unrelated refactors

**Ownership Boundaries**
* `docs/10_SESSION_STATE.md` owns the session snapshot for the pilot test contract
* `docs/session-handoffs/*` owns the next-chat transfer package
* `docs/15_SESSION_CLOSE_PROTOCOL.md` and `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` remain the operational references for close/start flow
* application code remains unchanged by this contract

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no application, provider, persistence, or Project Brain behavior changes were introduced

**Rollback / Safety Expectations**
* stop if the pilot test requires application code changes
* stop if the pilot test requires execution before Product Owner approval
* keep the milestone non-active until the pilot test is explicitly authorized

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-005.1 - SPS OS Pilot Test Execution Contract

**Milestone**
MS-005.1 - SPS OS Pilot Test Execution Contract

**Type**
Documentation Contract

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Define the exact controlled SPS OS pilot execution contract so the following Codex step can run the real pilot sequence after Product Owner approval without changing application code.

**Product Outcome**
The repository documents the exact pilot execution contract, including the objective, step order, allowed artifacts, forbidden actions, pass / fail criteria, and final report fields needed for the next pilot step.

**Execution Authorization**
Product Owner approval authorizes the controlled pilot execution described in this contract.

**Dependencies**
* `MS-005.0 - SPS OS Pilot Test Foundation`
* `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`
* `docs/15_SESSION_CLOSE_PROTOCOL.md`

**Allowed Implementation Scope**
* docs-only execution contract
* exact pilot objective and step order
* allowed artifacts, forbidden actions, pass / fail criteria, and final report fields
* controlled pilot execution after Product Owner approval

**Forbidden Scope**
* application code
* API routes
* provider/model wiring
* persistence
* UI redesign
* Project Brain write paths
* unrelated refactors

**Pilot Execution Steps**
1. Verify the real repository state.
2. Read this contract and the directly referenced SSOT documents.
3. Execute the controlled pilot sequence in order: Project creation, Task creation, Codex handoff, Result capture, Completion, Session Close readiness, and Clean START readiness.
4. Record the execution result and the required Session 051 usage entry.

**Allowed Artifacts**
* `.usage/session.jsonl`
* SSOT documents required to record the pilot execution result
* repository evidence produced by the controlled pilot execution

**PASS Criteria**
* the controlled pilot sequence is executed in the order defined above
* no forbidden action occurs
* the required result record is produced
* SSOT remains consistent

**FAIL Criteria**
* the execution order is broken
* a forbidden action occurs
* required result evidence is missing
* SSOT becomes inconsistent

**Required Final Report Fields**
* Session Identity
* MS-005.1 pilot steps executed
* Pilot result
* Files changed
* Artifacts created or updated
* Verification
* SSOT consistency
* Usage record written
* Measurement status
* Real credits
* Deviations or blockers
* Git status after work
* Commit / push
* One recommended next safe step

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the execution contract
* `docs/08_CURRENT_STATE.md` and `docs/10_SESSION_STATE.md` record the enabled SSOT state
* application code remains unchanged by this contract

**Verification Plan**
* `git diff --check`
* SSOT consistency review across `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md`
* confirm no application, provider, persistence, or Project Brain changes were introduced

**Rollback / Safety Expectations**
* stop if pilot execution would require application code changes
* stop if pilot execution would require provider, persistence, UI, or Project Brain changes
* stop if required result evidence cannot be recorded

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.s - Task Completion Handoff Text Foundation

**Milestone**
MS-002.s - Task Completion Handoff Text Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Add a minimal local-only task completion handoff text block on `/projects/[id]/tasks/[taskId]/workspace` without backend persistence or Project Brain writes.

**Product Outcome**
The task workspace now shows a ready-to-copy local handoff text block after local completion, including the saved result notes and local completion status.

**Dependencies**
* closed `MS-002.r - Task Completion Report Copy Foundation`

**Allowed Implementation Scope**
* local-only handoff text block near the completion summary/report copy area
* hidden before local task completion
* resets when result notes change and the completion state resets
* focused tests for the workspace handoff interaction

**Forbidden Scope**
* backend/API route changes
* Project Brain behavior changes
* task engine/storage ownership changes
* GitHub integration
* Codex automation handoff
* route redesign
* broader UI refactor

**Ownership Boundaries**
* `/projects/[id]/tasks/[taskId]/workspace` owns the local task completion handoff text
* Task Engine and Project Brain remain outside this local UI-only handoff text block

**Verification Plan**
* focused workspace handoff interaction test
* `git diff --check`
* targeted SSOT consistency check
* confirm no backend persistence, Project Brain writes, or Task Engine changes were introduced

**Rollback / Safety Expectations**
* stop if the handoff text needs backend persistence
* stop if the handoff text requires Project Brain writes
* keep the milestone non-active until publication approval

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

MS-001.79 is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Workspace Creation Contract Foundation with commit `6881e86`.
MS-002.b is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Workspace Start Action Boundary Foundation with commit `043d744`.
MS-002.c is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Workspace Next Step Action Foundation.
MS-002.d is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Workspace Task Entry Shortcut Foundation.
MS-002.e is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Workspace Task Quick Action Foundation.
MS-002.f is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Workspace Task Collection Handoff Foundation.
MS-002.i is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Repository Link Foundation.
MS-002.j is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Task Intake Foundation.
MS-002.k is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Task Workspace Start Foundation.
MS-002.l is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Repository Context Load Foundation.
MS-002.m is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Task Handoff To Codex Foundation.
MS-002.n is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Task Result Capture Foundation.
MS-002.o is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Task Result Save Action Foundation.
MS-002.p is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Task Completion Local Action Foundation.
MS-002.q is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Task Completion Summary Foundation.
MS-002.r is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Task Completion Report Copy Foundation.

## MS-002.t - AI Chat, Prompts, and Agents Foundation

**Milestone**
MS-002.t - AI Chat, Prompts, and Agents Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Purpose**
Add the smallest chat and prompt orchestration boundary on the existing AI Workspace read surface without changing Project Brain persistence, provider wiring, or persistence ownership.

**Product Outcome**
The AI Workspace now owns the shared starter prompt catalog and prompt-orchestration state boundary in `src/lib/ai-workspace-engine/engine.ts`, while the page consumes that catalog without changing the underlying provider or Project Brain read contract.

**Dependencies**
* closed `MS-002.s - Task Completion Handoff Text Foundation`

**Allowed Implementation Scope**
* shared starter prompt catalog in the AI workspace engine boundary
* prompt orchestration state derivation on the existing AI Workspace page
* focused tests for the shared prompt catalog and orchestration boundary

**Forbidden Scope**
* API routes
* Project Brain storage/write paths
* provider/model wiring
* persistence
* route redesign
* unrelated refactors

**Ownership Boundaries**
* `src/lib/ai-workspace-engine/engine.ts` owns the shared prompt catalog and orchestration helpers
* `src/app/projects/[id]/ai/page.tsx` consumes the shared prompt catalog and boundary helpers
* Project Brain and provider wiring remain outside this milestone

**Verification Plan**
* focused engine and page tests
* `npx.cmd tsc --noEmit`
* `git diff --check`
* confirm no Project Brain write-path, provider, API, or persistence behavior changes were introduced

**Rollback / Safety Expectations**
* stop if the prompt boundary needs API routes
* stop if the prompt boundary needs Project Brain writes
* keep the milestone closed after publication

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.o - Task Result Save Action Foundation

**Milestone**
MS-002.o - Task Result Save Action Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Add a minimal local UI save action for task result notes on `/projects/[id]/tasks/[taskId]/workspace` without backend persistence or Project Brain writes.

**Product Outcome**
The task workspace now lets the user write result notes, blocks empty saves, and shows a local saved status in the current UI session.

**Dependencies**
* closed `MS-002.n - Task Result Capture Foundation`

**Allowed Implementation Scope**
* local task result save action on the existing task workspace route
* empty-note save blocking
* local saved status visibility
* focused tests for the workspace save interaction

**Forbidden Scope**
* Project Brain behavior changes
* backend/API route changes
* task engine/storage ownership changes
* GitHub integration
* Codex automation handoff
* route redesign
* broader UI refactor

**Ownership Boundaries**
* `/projects/[id]/tasks/[taskId]/workspace` owns the local task result save interaction
* Task Engine and Project Brain remain outside this local UI-only save action

**Verification Plan**
* focused workspace save interaction test
* `git diff --check`
* targeted SSOT consistency check
* confirm no backend persistence or Project Brain writes were introduced

**Rollback / Safety Expectations**
* stop if the save action needs backend persistence
* stop if the save action requires Project Brain writes
* keep the milestone non-active until approval

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.r - Task Completion Report Copy Foundation

**Milestone**
MS-002.r - Task Completion Report Copy Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Add a minimal local-only copy action for the task completion report on `/projects/[id]/tasks/[taskId]/workspace` after local task completion.

**Product Outcome**
After local task completion, the completion summary can be copied as a concise report for downstream handoff or documentation.

**Dependencies**
* closed `MS-002.q - Task Completion Summary Foundation`

**Allowed Implementation Scope**
* local completion report copy action on the existing task workspace route
* copy action hidden or disabled before local task completion
* copied report includes saved result notes and local completion status
* visible local copy status after action
* copy action/status reset when the completion summary resets
* focused tests for the workspace copy interaction

**Forbidden Scope**
* Project Brain behavior changes
* backend/API route changes
* task engine/storage ownership changes
* GitHub integration
* Codex automation handoff
* route redesign
* broader UI refactor

**Ownership Boundaries**
* `/projects/[id]/tasks/[taskId]/workspace` owns the local task completion report copy action
* Task Engine and Project Brain remain outside this local UI-only copy action

**Verification Plan**
* focused workspace copy interaction test
* `git diff --check`
* targeted SSOT consistency check
* confirm no backend persistence or Project Brain writes were introduced

**Rollback / Safety Expectations**
* stop if the copy action needs backend persistence
* stop if the copy action requires Project Brain writes
* keep the milestone non-active until approval

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.q - Task Completion Summary Foundation

**Milestone**
MS-002.q - Task Completion Summary Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Add a minimal local-only completion summary on `/projects/[id]/tasks/[taskId]/workspace` that shows the locally saved result and local completion status after the task is completed locally.

**Product Outcome**
After local task completion, the workspace shows a visible summary block with the saved result notes text and the local completion status in the current UI session.

**Dependencies**
* closed `MS-002.p - Task Completion Local Action Foundation`

**Allowed Implementation Scope**
* local completion summary on the existing task workspace route
* summary hidden or inactive before local task completion
* saved result notes text displayed in the summary
* local completion status displayed in the summary
* summary reset when result notes change after completion
* focused tests for the workspace summary interaction

**Forbidden Scope**
* Project Brain behavior changes
* backend/API route changes
* task engine/storage ownership changes
* GitHub integration
* Codex automation handoff
* route redesign
* broader UI refactor

**Ownership Boundaries**
* `/projects/[id]/tasks/[taskId]/workspace` owns the local task completion summary
* Task Engine and Project Brain remain outside this local UI-only summary

**Verification Plan**
* focused workspace summary interaction test
* `git diff --check`
* targeted SSOT consistency check
* confirm no backend persistence or Project Brain writes were introduced

**Rollback / Safety Expectations**
* stop if the summary needs backend persistence
* stop if the summary requires Project Brain writes
* keep the milestone non-active until approval

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.p - Task Completion Local Action Foundation

**Milestone**
MS-002.p - Task Completion Local Action Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Add a minimal local-only task completion action on `/projects/[id]/tasks/[taskId]/workspace` that becomes available after result notes are saved locally.

**Product Outcome**
After a local result save, the task workspace lets the user mark the task complete locally and shows a visible local completion status in the current UI session.

**Dependencies**
* closed `MS-002.o - Task Result Save Action Foundation`

**Allowed Implementation Scope**
* local task completion action on the existing task workspace route
* completion blocked until result notes are saved locally
* local completion status visibility
* focused tests for the workspace completion interaction

**Forbidden Scope**
* Project Brain behavior changes
* backend/API route changes
* task engine/storage ownership changes
* GitHub integration
* Codex automation handoff
* route redesign
* broader UI refactor

**Ownership Boundaries**
* `/projects/[id]/tasks/[taskId]/workspace` owns the local task completion interaction
* Task Engine and Project Brain remain outside this local UI-only completion action

**Verification Plan**
* focused workspace completion interaction test
* `git diff --check`
* targeted SSOT consistency check
* confirm no backend persistence or Project Brain writes were introduced

**Rollback / Safety Expectations**
* stop if the completion action needs backend persistence
* stop if the completion action requires Project Brain writes
* keep the milestone non-active until approval

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.d - Project Workspace Task Entry Shortcut Foundation

**Milestone**
MS-002.d - Project Workspace Task Entry Shortcut Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Make the `/projects/[id]/tasks` workspace flow immediately ready for task capture by focusing the task title input on mount.

**Product Outcome**
The project task screen now lands on the task title field so a user can start entering the next task without an extra click.

**Implementation Evidence**
* `src/app/projects/[id]/tasks/page.tsx` focuses the task title input on mount with a local ref and effect.
* `src/app/projects/[id]/tasks/page.test.tsx` verifies the task title input receives focus when the page mounts.

**Dependencies**
* `MS-002.c - Project Workspace Next Step Action Foundation`

**Allowed Implementation Scope**
* task-entry shortcut behavior on the existing project tasks page
* focused tests for mount-time task entry readiness

**Forbidden Scope**
* Project Brain behavior changes
* task engine, API, provider, or storage ownership changes
* broader route refactors
* salon modules
* UI redesign unrelated to task entry

**Ownership Boundaries**
* `/projects/[id]/tasks` owns the focused task-entry surface for the current project workspace
* Project Brain remains the canonical source for project truth
* the workspace header and route shell stay unchanged by this milestone

**Activation Gates**
* Product Owner approval is recorded
* SSOT contract is published and consistent
* `Current Product Milestone` remains `NONE`
* `Next Product Milestone` remains `NONE`

**Verification Plan**
* focused mount-time task-entry test
* `git diff --check`
* targeted SSOT consistency check
* confirm no Project Brain or route-shell behavior changed

**Rollback / Safety Expectations**
* stop if task-entry readiness requires Project Brain changes
* stop if the task page needs broader route or workflow refactoring
* keep the milestone non-active until approval

## MS-002.e - Project Workspace Task Quick Action Foundation

**Milestone**
MS-002.e - Project Workspace Task Quick Action Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Make `/projects/[id]` expose a direct task-creation handoff so users can jump to the task entry screen from the workspace dashboard.

**Product Outcome**
The project workspace now includes an `Add Task` quick action that routes directly to the existing tasks screen.

**Implementation Evidence**
* `src/components/workspace/WorkspacePanels.tsx` adds the `Add Task` quick action to the existing workspace quick-action set.
* `src/app/projects/[id]/page.test.tsx` verifies the project workspace shows the `Add Task` link.

**Dependencies**
* `MS-002.d - Project Workspace Task Entry Shortcut Foundation`

**Allowed Implementation Scope**
* direct task-creation handoff from the existing project workspace dashboard
* focused tests for the new visible workspace quick action

**Forbidden Scope**
* Project Brain behavior changes
* task engine, API, provider, or storage ownership changes
* broader route refactors
* salon modules
* UI redesign unrelated to the quick action handoff

**Ownership Boundaries**
* `/projects/[id]` owns the visible workspace dashboard handoff
* `/projects/[id]/tasks` owns the task entry surface
* Project Brain remains the canonical source for project truth

**Activation Gates**
* Product Owner approval is recorded
* SSOT contract is published and consistent
* `Current Product Milestone` remains `NONE`
* `Next Product Milestone` remains `NONE`

**Verification Plan**
* focused workspace dashboard test
* `git diff --check`
* targeted SSOT consistency check
* confirm no Project Brain or task model changes occurred

**Rollback / Safety Expectations**
* stop if the quick action requires Project Brain changes
* stop if the dashboard needs broader route or workflow refactoring
* keep the milestone non-active until approval

## MS-002.f - Project Workspace Task Collection Handoff Foundation

**Milestone**
MS-002.f - Project Workspace Task Collection Handoff Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Make the Tasks collection on `/projects/[id]` hand off directly to the existing task entry screen for fast navigation from the workspace dashboard.

**Product Outcome**
The workspace now exposes a `View all tasks` link from the Tasks collection so users can jump straight to the task entry screen.

**Implementation Evidence**
* `src/components/workspace/WorkspaceCollections.tsx` adds the `View all tasks` handoff beneath the Tasks collection.
* `src/app/projects/[id]/page.test.tsx` verifies the project workspace shows the `View all tasks` link.

**Dependencies**
* `MS-002.e - Project Workspace Task Quick Action Foundation`

**Allowed Implementation Scope**
* direct task-entry handoff from the existing Tasks collection
* focused tests for the new visible workspace handoff

**Forbidden Scope**
* Project Brain behavior changes
* task engine, API, provider, or storage ownership changes
* broader route refactors
* salon modules
* UI redesign unrelated to the collection handoff

**Ownership Boundaries**
* `/projects/[id]` owns the visible workspace dashboard handoff
* `/projects/[id]/tasks` owns the task entry surface
* Project Brain remains the canonical source for project truth

**Activation Gates**
* Product Owner approval is recorded
* SSOT contract is published and consistent
* `Current Product Milestone` remains `NONE`
* `Next Product Milestone` remains `NONE`

**Verification Plan**
* focused workspace dashboard test
* `git diff --check`
* targeted SSOT consistency check
* confirm no Project Brain or task model changes occurred

**Rollback / Safety Expectations**
* stop if the collection handoff requires Project Brain changes
* stop if the dashboard needs broader route or workflow refactoring
* keep the milestone non-active until approval

## MS-002.z - Workspace Project Route Shell Boundary Foundation

**Milestone**
MS-002.z - Workspace Project Route Shell Boundary Foundation

**Type**
Product Milestone

**Contract Status**
PROPOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Make the `/workspace` vs `/projects/[id]` route shell boundary real before Project Brain access changes or the first read-only Salon Module.

**Product Outcome**
The repository contains the smallest safe route shell split between `/workspace` and `/projects/[id]` while Project Brain remains canonical and Salon Modules remain workspace-scoped.

**Implementation Evidence**
* The project-facing shell already lives in `src/app/projects/[id]/layout.tsx` and owns the route-local header, navigation links, and child outlet.
* `src/app/projects/[id]/page.tsx` remains the content layer nested under that shell.

**Dependencies**
* `MS-002.x - Salon Modules Boundary Contract Foundation`
* `MS-002.y - Workspace Project Route Boundary Contract Foundation`
* `docs/02_ARCHITECTURE.md`

**Allowed Implementation Scope**
* minimal route shell split between `/workspace` and `/projects/[id]`
* route entry and handoff behavior needed for the shell boundary
* focused tests for route ownership and navigation handoff

**Forbidden Scope**
* Project Brain behavior changes
* API/provider changes
* persistence or storage ownership changes
* UI redesign
* first read-only Salon Module implementation
* broad route refactors unrelated to the shell boundary

**Ownership Boundaries**
* `/workspace` owns workspace-level navigation, shared shell behavior, and non-canonical orchestration
* `/projects/[id]` owns project-specific presentation and interaction flows
* Project Brain owns canonical project truth across both routes

**Activation Gates**
* Product Owner approval is recorded
* SSOT contract is published and consistent
* `Current Product Milestone` remains `NONE` until activation is authorized
* `Next Product Milestone` remains `NONE` unless a future SSOT note explicitly requires a candidate

**Verification Plan**
* targeted route-shell tests for ownership and navigation handoff
* `git diff --check`
* targeted SSOT consistency check
* focused review that no Project Brain behavior changed

**Rollback / Safety Expectations**
* stop if route shell work requires Project Brain changes
* stop if route shell work requires broader route refactoring
* keep the milestone non-active until approval

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.a - Project Brain Access Boundary Foundation

**Milestone**
MS-002.a - Project Brain Access Boundary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Define the smallest Project Brain access boundary used by the project workspace route.

**Product Outcome**
The `/projects/[id]` route reaches Project Brain through `getProjectWorkspaceEntry(projectId)` as its canonical workspace access point.

**Implementation Evidence**
* `src/app/projects/[id]/page.tsx` calls `getProjectWorkspaceEntry(params.id)` for the route workspace snapshot.
* `src/app/projects/[id]/page.test.tsx` proves the route uses the Project Brain boundary for the active route project id.
* `src/lib/project-brain/engine.ts` continues to own `getProjectWorkspaceEntry(projectId)` as the workspace projection boundary.

**Dependencies**
* `MS-002.z - Workspace Project Route Shell Boundary Foundation`
* `docs/02_ARCHITECTURE.md`

**Allowed Implementation Scope**
* focused route boundary proof for `/projects/[id]`
* minimal helper verification for the canonical Project Brain access point
* focused tests for the route-owned Project Brain access boundary

**Forbidden Scope**
* Salon Modules migration
* localStorage migration
* API/provider changes
* UI redesign
* broad refactor
* Project Brain ownership changes

**Ownership Boundaries**
* `/projects/[id]` owns project-specific presentation and interaction flows
* Project Brain owns the canonical project truth and the workspace read boundary used by the route
* Workspace shell behavior remains separate from Project Brain ownership

**Verification Plan**
* targeted route test for `/projects/[id]`
* `git diff --check`
* focused review that the route calls the canonical Project Brain access point

**Rollback / Safety Expectations**
* stop if route access requires Project Brain ownership changes
* stop if route access requires broader route refactoring
* keep the milestone implementation minimal and focused on the boundary proof

## MS-002.b - Project Workspace Start Action Boundary Foundation

**Milestone**
MS-002.b - Project Workspace Start Action Boundary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
YES

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Define the smallest workspace start-action boundary for `/projects/[id]`.

**Product Outcome**
The `/projects/[id]` route proves the Project Brain ready-state start boundary through the projected workflow next step surfaced by the workspace header.

**Implementation Evidence**
* `src/app/projects/[id]/page.test.tsx` proves the route surfaces `Start next work` when Project Brain has no active work.
* `src/components/workspace/WorkspaceHeader.tsx` renders the projected workflow next step from Project Brain.
* `src/lib/workflow/engine.ts` continues to own the canonical `start-next-work` readiness decision.
* `src/app/projects/[id]/page.tsx` continues to consume `getProjectWorkspaceEntry(params.id)` as the workspace boundary.

**Dependencies**
* `MS-002.a - Project Brain Access Boundary Foundation`
* `docs/02_ARCHITECTURE.md`

**Allowed Implementation Scope**
* focused route readiness proof for `/projects/[id]`
* minimal helper verification for the canonical workspace start-step projection
* focused tests for the route-owned start-action readiness boundary

**Forbidden Scope**
* Salon Modules migration
* localStorage migration
* API/provider changes
* UI redesign
* broad refactor
* Project Brain ownership changes

**Ownership Boundaries**
* `/projects/[id]` owns project-specific presentation and interaction flows
* Project Brain owns the canonical project truth and the workspace read boundary used by the route
* Workflow Engine owns the ready-state next-step decision used by the route start boundary
* Workspace shell behavior remains separate from Project Brain ownership

**Verification Plan**
* targeted route test for `/projects/[id]`
* `git diff --check`
* focused review that the route exposes the canonical Project Brain ready-state next step

**Rollback / Safety Expectations**
* stop if route access requires Project Brain ownership changes
* stop if route access requires broader route refactoring
* keep the milestone implementation minimal and focused on the boundary proof

## MS-002.c - Project Workspace Next Step Action Foundation

**Milestone**
MS-002.c - Project Workspace Next Step Action Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Purpose**
Make the projected workspace next step actionable from `/projects/[id]` without changing Project Brain ownership or the existing task route.

**Product Outcome**
The `/projects/[id]` workspace header now exposes the projected next step as an `Open tasks` action that routes to the existing project tasks screen.

**Implementation Evidence**
* `src/components/workspace/WorkspaceHeader.tsx` renders the projected next-step action and links it to `./tasks`.
* `src/app/projects/[id]/page.test.tsx` proves the workspace route shows the new tasks action alongside the projected next step.
* `src/app/projects/[id]/page.tsx` continues to own the workspace read boundary for the route project id.

**Dependencies**
* `MS-002.b - Project Workspace Start Action Boundary Foundation`
* `MS-002.a - Project Brain Access Boundary Foundation`

**Allowed Implementation Scope**
* minimal next-step action affordance in the project workspace header
* route handoff to the existing tasks screen
* focused tests for the visible workspace action

**Forbidden Scope**
* Project Brain behavior changes
* workflow engine changes
* API/provider changes
* storage or persistence ownership changes
* broad workspace or route refactors
* new task creation behavior

**Ownership Boundaries**
* `/projects/[id]` owns project-specific presentation and interaction flows
* Project Brain owns the canonical next-step decision surfaced by the workspace header
* `/projects/[id]/tasks` owns the existing task list interaction surface

**Verification Plan**
* targeted route test for `/projects/[id]`
* `git diff --check`
* focused review that the action only hands off to the existing tasks route

**Rollback / Safety Expectations**
* stop if the action requires Project Brain changes
* stop if the action requires a new task model or task write flow
* keep the milestone minimal and route-local

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

## MS-002.y - Workspace Project Route Boundary Contract Foundation

**Milestone**
MS-002.y - Workspace Project Route Boundary Contract Foundation

**Type**
Documentation Contract

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Make the `/workspace` vs `/projects/[id]` boundary explicit in SSOT documentation before any implementation begins.

**Product Outcome**
The repository now documents the route responsibility split between `/workspace`, `/projects/[id]`, and Project Brain without changing product code.

**Dependencies**
* `MS-002.x - Salon Modules Boundary Contract Foundation`
* `docs/02_ARCHITECTURE.md`

**Out of Scope**
* product code changes
* UI changes
* API/provider changes
* Project Brain behavior changes
* refactor
* dependency changes

**Documentation Updates**
* `docs/02_ARCHITECTURE.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a Product Owner-approved product milestone is introduced.

## MS-002.x - Salon Modules Boundary Contract Foundation

**Milestone**
MS-002.x - Salon Modules Boundary Contract Foundation

**Type**
Documentation Contract

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Make the Salon Modules boundary explicit in SSOT documentation before any product implementation begins.

**Product Outcome**
The repository now documents the ownership boundary between Project Brain, Workspace, and Salon Modules without changing product code.

**Dependencies**
* `MS-001.79 - Project Workspace Creation Contract Foundation`
* `docs/02_ARCHITECTURE.md`

**Out of Scope**
* product code changes
* UI changes
* API/provider changes
* Project Brain behavior changes
* refactor
* dependency changes

**Documentation Updates**
* `docs/02_ARCHITECTURE.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a Product Owner-approved product milestone is introduced.

## MS-001.76 - AI Workspace Engine Chat Project Switch State Isolation Foundation

**Milestone**
MS-001.76 - AI Workspace Engine Chat Project Switch State Isolation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Prove that AI Workspace local chat state stays isolated to the active project when `projectId` changes without changing persistence, API/provider/model behavior, Project Brain behavior, UX copy, or layout.

**Product Outcome**
The repository contains focused proof that AI Workspace local instruction, generation, conversation, and save state stay scoped to the active project, and stale previous-project async results cannot overwrite the current project view.

**Dependencies**
* closed `MS-001.75 - AI Workspace Engine Chat Copy State Non-Mutation Foundation`
* closed `MS-001.73 - AI Workspace Engine Chat Reset Context Boundary Foundation`
* closed `MS-001.72 - AI Workspace Engine Chat Exchange Boundary Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`
* `src/app/projects/[id]/ai/page.test.tsx`

**Out of Scope**
* new UX or layout changes
* copy success/failure status UI
* clipboard abstraction/service
* persistence
* Project Brain writes
* Knowledge writes
* new API routes
* provider/model changes
* agent runtime
* tool calling
* streaming
* Markdown/chat transcript system
* unrelated refactoring

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Commit**
792c970

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.test.tsx` now proves the active project view clears stale instruction, conversation, and save UI state after a `projectId` change.
* The existing project-scoped engine helpers continue to supply the active local state boundary.
* The current page still shields the active project view from stale async results from the previous project.

**Acceptance Criteria**
* Switching `projectId` rebinds or resets AI Workspace local instruction state.
* Switching `projectId` rebinds or resets generation and conversation state.
* Switching `projectId` rebinds or resets save state.
* No stale instruction text, exchange history, latest exchange, save title, or save status from the previous project remains visible on the new project.
* Copy remains local and non-mutating.
* Generate request shape remains unchanged.
* Save request shape remains unchanged.
* Context loading behavior remains unchanged.
* Stale async results from a previous project do not overwrite the current project page.

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone.

## MS-001.75 - AI Workspace Engine Chat Copy State Non-Mutation Foundation

**Milestone**
MS-001.75 - AI Workspace Engine Chat Copy State Non-Mutation Foundation

**Type**
Product Milestone

**Contract Status**
PROPOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add focused proof that the AI Workspace chat copy intent boundary is local and non-mutating without changing existing clipboard behavior, generation flow, save flow, reset flow, Project Brain boundaries, provider/model integration, or UI layout.

**Product Outcome**
The repository contains focused proof that the AI Workspace chat copy intent boundary is local and non-mutating, while the existing AI Workspace page still reuses the copy boundary before calling the browser clipboard API and preserves the exact current copy behavior.

**Dependencies**
* closed `MS-001.74 - AI Workspace Engine Chat Copy Boundary Foundation`
* closed `MS-001.73 - AI Workspace Engine Chat Reset Context Boundary Foundation`
* closed `MS-001.34 - AI Workspace Conversation Copy Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`
* `src/app/projects/[id]/ai/page.test.tsx`

**Out of Scope**
* new UX or layout changes
* copy success/failure status UI
* clipboard abstraction/service
* persistence
* Project Brain writes
* Knowledge writes
* new API routes
* provider/model changes
* agent runtime
* tool calling
* streaming
* Markdown/chat transcript system
* unrelated refactoring

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Commit**
f86e139

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.test.tsx` now proves copy keeps the instruction field, title field, generate control, reset control, conversation text, and clipboard payload unchanged
* `src/lib/ai-workspace-engine/engine.test.ts` still covers the helper as a pure non-mutating pass-through for the response text
* The copy path in `src/app/projects/[id]/ai/page.tsx` still writes the exact generated response text to `navigator.clipboard.writeText(...)`

**Acceptance Criteria**
* Copy still calls `navigator.clipboard.writeText` with the exact generated response text
* Copy remains local, non-persistent, and non-mutating
* Conversation state remains unchanged by copy
* Save state remains unchanged by copy
* Generate flow remains unchanged
* Reset flow remains unchanged
* No new endpoint, persistence, provider, Project Brain, or Knowledge behavior is introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone.

## MS-001.73 - AI Workspace Engine Chat Reset Context Boundary Foundation

**Milestone**
MS-001.73 - AI Workspace Engine Chat Reset Context Boundary Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Create the smallest pure engine-owned boundary for resetting the local AI Workspace conversation context without changing the existing generation flow, save flow, or local exchange budget behavior.

**Product Outcome**
The repository contains one minimal AI Workspace Engine helper that owns the reset of the current project conversation context derived from `GenerationUiState`, while the existing AI Workspace page reuses that helper with unchanged reset timing, conversation rendering, and generation behavior.

**Dependencies**
* closed `MS-001.72 - AI Workspace Engine Chat Exchange Boundary Foundation`

**Allowed Future Implementation Files**
* `src/app/projects/[id]/ai/page.tsx`
* `src/lib/ai-workspace-engine/engine.ts`
* `src/app/projects/[id]/ai/page.test.tsx`
* `src/lib/ai-workspace-engine/engine.test.ts`

**Out of Scope**
* agent runtime
* tool calling
* streaming
* new API routes
* persistence changes
* provider / model changes
* Project Brain writes
* chat transcript / Markdown system
* UX / layout rewrite
* unrelated refactoring

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Publication Commit**
`ae2c48c`

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveResetConversationContextState(...)` as the pure engine-owned reset boundary
* `src/app/projects/[id]/ai/page.tsx` now routes `handleResetConversation()` through the new helper while preserving `nextExchangeIdRef.current = 1`
* `src/lib/ai-workspace-engine/engine.test.ts` now covers cleared exchanges, cleared latest exchange id, and the empty post-reset conversation context

**Acceptance Criteria**
* reset still clears local exchanges
* status context after reset returns to the absence of local conversation context
* `nextExchangeIdRef.current = 1` behavior remains unchanged
* Generate flow remains unchanged
* Save flow remains unchanged
* no new endpoint, persistence, provider, or Project Brain behavior is introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone.

## MS-001.72 - AI Workspace Engine Chat Exchange Boundary Foundation

**Milestone**
MS-001.72 - AI Workspace Engine Chat Exchange Boundary Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Create the smallest engine-owned boundary for the current AI Workspace conversation context and local chat exchanges without changing the existing generation flow, save flow, or local exchange budget behavior.

**Product Outcome**
The repository contains one minimal AI Workspace Engine helper that owns the current project conversation context derived from `GenerationUiState`, while the existing AI Workspace page reuses that helper with unchanged conversation rendering and generation behavior.

**Dependencies**
* closed `MS-001.71 - AI Chat, Prompts, and Agents Foundation`

**Allowed Future Implementation Files**
* `src/app/projects/[id]/ai/page.tsx`
* `src/lib/ai-workspace-engine/engine.ts`
* `src/app/projects/[id]/ai/page.test.tsx`
* `src/lib/ai-workspace-engine/engine.test.ts`

**Out of Scope**
* agent runtime
* tool calling
* streaming
* new API routes
* persistence changes
* provider / model changes
* Project Brain writes
* chat transcript / Markdown system
* UX / layout rewrite
* unrelated refactoring

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`8fbebfb`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveConversationContextState(...)` as the single engine-owned conversation-context boundary
* `src/app/projects/[id]/ai/page.tsx` now routes the conversation context status message, generation instruction context, and conversation rendering through the new helper
* `src/lib/ai-workspace-engine/engine.test.ts` now covers matched and cross-project conversation context derivation

**Acceptance Criteria**
* the current conversation context still reflects the active generation exchange list for the current project
* the local exchange limit remains unchanged
* Generate flow remains unchanged
* Save flow remains unchanged
* no new endpoint, persistence, provider, or Project Brain behavior is introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone.

## MS-001.71 - AI Chat, Prompts, and Agents Foundation

**Milestone**
MS-001.71 - AI Chat, Prompts, and Agents Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Create the smallest pure prompt-orchestration boundary around the existing AI Workspace instruction state without changing starter prompt selection, manual instruction editing, generation flow, save flow, or the current Project Brain read boundary.

**Product Outcome**
The repository contains one minimal AI Workspace Engine helper that owns the derivation of `InstructionUiState` from the current project id, instruction value, and optional prompt id, while the existing AI Workspace page reuses that helper with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.66 - AI Workspace Engine Instruction Value Change State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/app/projects/[id]/ai/page.tsx`
* `src/lib/ai-workspace-engine/engine.ts`
* `src/app/projects/[id]/ai/page.test.tsx`
* `src/lib/ai-workspace-engine/engine.test.ts`

**Out of Scope**
* agent runtime
* tool calling
* streaming
* new API routes
* Project Brain write changes
* persistence changes
* provider / model integration
* Markdown / chat transcript system
* UX / layout rewrite
* unrelated refactoring

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`16bca08`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `derivePromptOrchestrationInstructionState(...)` as the single pure boundary for manual and starter-prompt instruction updates
* `src/app/projects/[id]/ai/page.tsx` now routes `setInstructionValue(...)` through the new engine helper without changing starter prompt selection or manual instruction editing behavior
* `src/lib/ai-workspace-engine/engine.test.ts` now covers the manual and starter-prompt orchestration branches of the new boundary

**Acceptance Criteria**
* starter prompt selection still fills the instruction field
* manual instruction editing still clears the selected prompt
* generation flow remains unchanged
* save flow remains unchanged
* no new endpoint, persistence, provider, or Project Brain behavior is introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`

## MS-001.66 - AI Workspace Engine Instruction Value Change State Derivation Foundation

**Milestone**
MS-001.66 - AI Workspace Engine Instruction Value Change State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Replace only the remaining inline `InstructionUiState` derivation in `setInstructionValue(...)` when `promptId !== null` with the existing AI Workspace Engine helper `deriveInstructionValueChangeState(projectId, value, promptId)`.

**Dependencies**
* closed `MS-001.65 - AI Workspace Engine Save Context Refresh State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/app/projects/[id]/ai/page.tsx`

**Out of Scope**
* API routes
* provider logic
* Project Brain schema or persistence contracts
* unrelated UI layout, copy, or style changes
* unrelated refactoring
* manual instruction input path changes
* dependencies and configuration

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`f65cb2e`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` now delegates the starter prompt branch in `setInstructionValue(...)` to `deriveInstructionValueChangeState(projectId, value, promptId)`
* the helper preserves the `promptId === null` manual instruction path by continuing to use `deriveManualInstructionChangeState(...)`
* required verification passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (44 / 44)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, and `git diff --check` `PASS` with line-ending warning only

**Acceptance Criteria**
* the page delegates only the `promptId !== null` branch in `setInstructionValue(...)` to `deriveInstructionValueChangeState(projectId, value, promptId)`
* the manual input path remains handled by `deriveManualInstructionChangeState(...)`
* no helper, type, UX, API, provider, Project Brain, or persistence changes are introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`

**Milestone**
MS-001.65 - AI Workspace Engine Save Context Refresh State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Replace only the remaining inline `ContextUiState` derivation in the save-flow AI project context refresh path with the existing AI Workspace Engine helper `deriveContextLoadState(projectId, result)`.

**Dependencies**
* closed `MS-001.64 - AI Workspace Engine Context Load State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/app/projects/[id]/ai/page.tsx`

**Out of Scope**
* API routes
* provider logic
* Project Brain schema or persistence contracts
* unrelated UI layout, copy, or style changes
* unrelated refactoring
* save-flow refresh warning fallback changes
* dependencies and configuration

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`7b8769c`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` now delegates the save-flow context refresh success branch to `deriveContextLoadState(projectId, contextResult)`
* the helper preserves the available branch exactly and leaves the refresh-warning fallback unchanged
* required verification passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (43 / 43)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, and `git diff --check` `PASS` with line-ending warning only

**Acceptance Criteria**
* the page delegates only the save-flow context refresh success branch to `deriveContextLoadState(projectId, contextResult)`
* the available branch behavior remains unchanged
* the refresh-warning fallback remains unchanged
* no helper, type, UX, API, provider, Project Brain, or persistence changes are introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `MS-001.65` published and do not start the next milestone without a separate Product Owner decision.

## MS-001.64 - AI Workspace Engine Context Load State Derivation Foundation

**Milestone**
MS-001.64 - AI Workspace Engine Context Load State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Replace only the inline AI project context load result state derivation in the initial `getBrowserAiProjectContext(params.id)` effect with the existing AI Workspace Engine helper `deriveContextLoadState(projectId, result)`.

**Dependencies**
* closed `MS-001.63 - AI Workspace Engine Save Title Change State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`

**Out of Scope**
* API routes
* provider logic
* Project Brain schema or persistence contracts
* unrelated UI layout, copy, or style changes
* unrelated refactoring
* save-flow refresh path changes
* dependencies and configuration

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`0eecd53`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` now delegates the initial context-load result mapping to `deriveContextLoadState(params.id, result)`
* the helper preserves the available, project-not-found, and unavailable branches exactly
* the page’s later save-flow refresh path remains unchanged
* required verification passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (43 / 43)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, `npx.cmd tsc --noEmit` `PASS`, and `git diff --check` `PASS` with line-ending warning only

**Acceptance Criteria**
* the page delegates only the initial `getBrowserAiProjectContext(params.id)` effect result mapping to `deriveContextLoadState(projectId, result)`
* the available, project-not-found, and unavailable branch behavior remains unchanged
* the save-flow refresh path remains unchanged
* no helper, type, UX, API, provider, Project Brain, or persistence changes are introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `MS-001.64` published and do not start the next milestone without a separate Product Owner decision.

## Parallel Documentation Work

* `SPDM-001` - Soft Premium Development Method Foundation completed with `docs/00_SPS_DEVELOPMENT_METHOD.md`
* `SPDM-002` - Bootstrap Alignment completed with `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` updated to implement SPDM instead of defining methodology
* `CAP-003.1` - Project Domain Contract completed with `docs/13_PROJECT_CAPABILITY.md`
* `CAP-003.2` - Project Domain Model completed with `docs/13_PROJECT_CAPABILITY.md`
* `CAP-004` - Architect-Codex Execution Boundary completed with process execution boundaries and risk-based quality review rules
* `CAP-005` - React Component Test Infrastructure Foundation completed with focused React component test infrastructure and no production code changes
* Active Capability: `NONE`
* Latest Completed Capability: `CAP-005 - React Component Test Infrastructure Foundation`
* `CAP-003` has no active work item
* This documentation foundation does not change the next product milestone order

---

# Milestone Contracts

## MS-001.60 - AI Workspace Engine Save Title Validation State Derivation Foundation

**Milestone**
MS-001.60 - AI Workspace Engine Save Title Validation State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Replace only the remaining inline `save-error` `SaveUiState` construction used when the Knowledge title is empty or whitespace-only inside `handleSaveToKnowledge` with the existing AI Workspace Engine helper `deriveSaveErrorState(...)`.

**Dependencies**
* closed `MS-001.59 - AI Workspace Engine Save Refresh Warning State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/app/projects/[id]/ai/page.tsx`

**Out of Scope**
* creating a new helper or type
* modifying `src/lib/ai-workspace-engine/engine.ts`
* modifying test files unless required by a genuine exposed contract mismatch
* title-input change-state derivation
* generation-transition save-state changes
* wider save-flow refactoring
* UX, copy, and layout changes
* API, backend, provider, and Project Brain changes
* dependencies and configuration

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`c5aee32`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` now delegates the remaining empty-title validation `save-error` state construction in `handleSaveToKnowledge` to `deriveSaveErrorState(...)`
* the validation message remains exactly `Enter a valid title.`
* the current title value, current source exchange, early return behavior, and zero save requests for invalid titles remain unchanged
* required verification passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (37 / 37)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, `npx.cmd tsc --noEmit` `PASS`, and `git diff --check` `PASS` with line-ending warning only

**Acceptance Criteria**
* the page delegates only the remaining inline empty-title validation `save-error` construction to `deriveSaveErrorState(...)`
* the validation message remains exactly `Enter a valid title.`
* the current title value remains unchanged
* the current source exchange remains unchanged
* the early return behavior remains unchanged
* invalid title input triggers zero save requests
* no helper, type, UX, API, provider, Project Brain, or broader save-flow changes are introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `MS-001.60` published and do not start the next milestone without a separate Product Owner decision.

## MS-001.63 - AI Workspace Engine Save Title Change State Derivation Foundation

**Milestone**
MS-001.63 - AI Workspace Engine Save Title Change State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Replace only the remaining inline `SaveUiState` derivation in the AI page title input change handler with the existing AI Workspace Engine helper `deriveSaveTitleChangeState(projectId, latestExchange, saveUiState, title)`.

**Dependencies**
* closed `MS-001.62 - AI Workspace Engine Generate Transition Save Reset State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`

**Out of Scope**
* API routes
* provider logic
* Project Brain schema or persistence contracts
* unrelated UI layout, copy, or style changes
* unrelated refactoring
* broader save-flow changes
* dependencies and configuration

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`96833ed`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` now delegates the inline title-input save-state derivation to `deriveSaveTitleChangeState(...)`
* the helper preserves the current saved-vs-ready-to-save state behavior and refresh-error preservation exactly
* the inline object spread is removed from the page title input handler
* required verification passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (40 / 40)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, `npx.cmd tsc --noEmit` `PASS`, and `git diff --check` `PASS` with line-ending warning only

**Acceptance Criteria**
* the page delegates only the remaining inline title-input save-state derivation to `deriveSaveTitleChangeState(...)`
* the saved-vs-ready-to-save branch behavior remains unchanged
* the refresh-error preservation remains unchanged
* the inline object spread is removed from the page title input handler
* no helper, type, UX, API, provider, Project Brain, or broader save-flow changes are introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `MS-001.63` published and do not start the next milestone without a separate Product Owner decision.

## MS-001.62 - AI Workspace Engine Generate Transition Save Reset State Derivation Foundation

**Milestone**
MS-001.62 - AI Workspace Engine Generate Transition Save Reset State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Replace only the inline save-state reset at the start of `handleGenerate` with the existing AI Workspace Engine helper `deriveResetSaveState(params.id)`.

**Dependencies**
* closed `MS-001.61 - AI Workspace Engine Save Ready State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/app/projects/[id]/ai/page.tsx`

**Out of Scope**
* engine.ts changes
* title-input derivation
* save-error, saving, saved, refresh-warning, or generation-success logic changes
* any generation-flow behavior change
* UX, copy, layout, API, backend, provider, Project Brain, dependencies, or configuration changes
* refactoring or formatting cleanup

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`9e876e4`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` now delegates the inline save-state reset at the start of `handleGenerate` to `deriveResetSaveState(params.id)`
* the reset timing and behavior remain unchanged
* generation flow remains unchanged
* required verification passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (38 / 38)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, `npx.cmd tsc --noEmit` `PASS`, and `git diff --check` `PASS` with line-ending warning only

**Acceptance Criteria**
* the page delegates only the inline save-state reset at the start of `handleGenerate` to `deriveResetSaveState(params.id)`
* the reset timing remains unchanged
* generation flow behavior remains unchanged
* no title-input, save-error, saving, saved, refresh-warning, or generation-success changes are introduced
* no helper, type, UX, API, provider, Project Brain, or broader save-flow changes are introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `MS-001.62` ready for publication and do not start the next milestone without a separate Product Owner decision.

## MS-001.61 - AI Workspace Engine Save Ready State Derivation Foundation

**Milestone**
MS-001.61 - AI Workspace Engine Save Ready State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Extract only the inline ready-to-save `SaveUiState` literal created after successful generation into the existing AI Workspace Engine helper `deriveSaveReadyState(...)`, then use that helper in `src/app/projects/[id]/ai/page.tsx` with identical behavior.

**Dependencies**
* closed `MS-001.60 - AI Workspace Engine Save Title Validation State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/app/projects/[id]/ai/page.tsx`
* `src/lib/ai-workspace-engine/engine.test.ts` if required by a genuine exposed contract mismatch
* `src/app/projects/[id]/ai/page.test.tsx` if required by a genuine exposed contract mismatch

**Out of Scope**
* title validation or title-input change derivation
* changes to saving, saved, save-error, or refresh-warning logic
* generation-flow changes
* save-flow refactoring
* API, backend, provider, and Project Brain changes
* dependencies and configuration
* unrelated cleanup or formatting

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`11c2616`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exposes `deriveSaveReadyState(projectId, latestExchange)` as a pure helper
* `src/app/projects/[id]/ai/page.tsx` now delegates the ready-to-save state construction after successful generation to `deriveSaveReadyState(params.id, exchange)`
* the title and source exchange values remain unchanged
* generation and save transitions remain unchanged
* required verification passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (38 / 38)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, `npx.cmd tsc --noEmit` `PASS`, and `git diff --check` `PASS` with line-ending warning only

**Acceptance Criteria**
* the page delegates only the ready-to-save `SaveUiState` literal created after successful generation to `deriveSaveReadyState(...)`
* the title value remains unchanged
* the source exchange remains unchanged
* generation and save transitions remain unchanged
* no title validation, save-error, save-saving, saved, or refresh-warning behavior changes are introduced
* no helper, type, UX, API, provider, Project Brain, or broader save-flow changes are introduced

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Keep `MS-001.61` ready for publication and do not start the next milestone without a separate Product Owner decision.

## MS-001.59 - AI Workspace Engine Save Refresh Warning State Derivation Foundation

**Milestone**
MS-001.59 - AI Workspace Engine Save Refresh Warning State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the existing deterministic `saved-with-refresh-warning` `SaveUiState` construction from the save-success refresh-warning branches of `handleSaveToKnowledge` into the AI Workspace Engine.

**Dependencies**
* closed `MS-001.58 - AI Workspace Engine Save Error State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`

**Out of Scope**
* validation-title derivation
* title-input change-state derivation
* further save-error, save-saving, or save-success changes
* full save-flow refactoring
* refresh orchestration changes
* Generate and Reset changes
* UX, copy, and layout
* backend, API, provider wiring, and Project Brain
* dependencies

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED

**Publication Status**
PUBLISHED

**Publication Commit**
`0d11707`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveSaveRefreshWarningState(projectId, latestExchange, title)`
* the helper reproduces exactly the existing `saved` `SaveUiState` field values with `errorMessage: null` and the unchanged refresh warning message
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for the exact refresh-warning derivation result
* `src/app/projects/[id]/ai/page.tsx` now delegates exactly the two existing refresh-warning save-state constructions to the engine helper
* verified gates passed: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (37 / 37)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, `npx.cmd tsc --noEmit` `PASS`, and `git diff --check` `PASS`
* architectural review passed with no contract deviations

**Acceptance Criteria**
* the engine exposes exactly one helper for the existing `saved-with-refresh-warning` `SaveUiState`
* the page delegates exactly the two current local constructions to that helper
* `state` remains `saved`
* `errorMessage` remains `null`
* `refreshErrorMessage` remains exactly `Saved to Knowledge, but AI project context could not be refreshed.`
* save flow order and successful-save semantics remain unchanged
* validation-title and broader refresh orchestration remain untouched
* required focused tests and `npx.cmd tsc --noEmit` pass during implementation verification

**Verification Contract**
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts`
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Run `SPS OS - KONIEC` for Session 033.

---

## MS-001.58 - AI Workspace Engine Save Error State Derivation Foundation

**Milestone**
MS-001.58 - AI Workspace Engine Save Error State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the existing deterministic `save-error` `SaveUiState` construction from the save-error branches of `handleSaveToKnowledge` into the AI Workspace Engine.

**Dependencies**
* closed `MS-001.57 - AI Workspace Engine Save Success State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`
* `src/app/projects/[id]/ai/page.test.tsx`

**Out of Scope**
* refresh-warning derivation
* validation-title derivation
* full save-flow refactoring
* Generate and Reset changes
* UX, copy, and layout
* backend, API, provider wiring, and Project Brain
* dependencies

**Product Owner Decision**
ACCEPT

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveSaveErrorState(projectId, latestExchange, title, errorMessage)`
* the helper reproduces exactly the existing `save-error` `SaveUiState` field values
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for the exact `save-error` state result
* `src/app/projects/[id]/ai/page.tsx` now delegates the controlled save-error response branch and rejected save-request branch to the engine helper
* no UX, text, layout, refresh-warning, validation-title, backend/API, provider, or Project Brain changes were introduced
* previously verified implementation evidence remains: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` `PASS (36 / 36)`, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` `PASS (32 / 32)`, `npx.cmd tsc --noEmit` `PASS`, and `git diff --check` `PASS`

**Acceptance Criteria**
* the engine exposes one helper that constructs the existing `save-error` `SaveUiState`
* the page delegates only the two existing save-error state constructions to that helper
* `projectId`, `latestExchange`, `title`, `errorMessage`, and current texts remain unchanged
* save flow order and behavior remain unchanged
* scope does not include refresh-warning or validation-title derivation

**Verification Contract**
* focused engine test
* focused AI page test
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

## MS-005.2 - Project Delete Action Foundation

**Milestone**
MS-005.2 - Project Delete Action Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Owner**
Chief Architect

**Implementation Engine**
Codex

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Product Owner Decision**
ACCEPT

**Purpose**
Add a confirmation-gated project delete action from Recent Projects and the project detail page, with both the local project list/storage and the canonical Project Brain/project data path removed on confirmed delete.

**Product Outcome**
The repository exposes a minimal project deletion flow that lets users remove a project safely from the recent-projects list or the project detail page after confirmation, while returning to the home view after a detail-page delete.

**Dependencies**
* `MS-005.1 - SPS OS Pilot Test Execution Contract`

**Allowed Implementation Scope**
* right-side delete action in Recent Projects
* delete action on the project detail page
* confirmation prompt before delete
* local project list/storage removal
* canonical project data deletion through the project API route
* redirect to the projects/home view after detail-page delete
* targeted tests for delete confirmation, cancellation, removal, and redirect behavior

**Forbidden Scope**
* broad refactors
* unrelated cleanup
* destructive delete without confirmation
* changes beyond the approved delete semantics

**Ownership Boundaries**
* the home Recent Projects list owns the local project list/storage presentation
* the project detail route owns the canonical project view and redirect after delete
* `src/app/api/projects/[id]/route.ts` owns the canonical delete transport boundary
* Project Brain remains the canonical project data source for project detail reads

**Verification Plan**
* `npm.cmd test -- src/lib/project/project.test.ts src/lib/project/browser-server.test.ts src/lib/project/server.test.ts src/app/page.test.tsx src/app/projects/[id]/page.test.tsx`
* `npx.cmd tsc --noEmit`
* `git diff --check`
* `git status -sb`

**Rollback / Safety Expectations**
* stop if deletion needs broader storage migration
* stop if deletion needs additional product scopes
* keep the milestone minimal and confirmation-gated

**Implementation Evidence**
* `src/app/page.tsx` adds the Recent Projects delete action and confirmation flow
* `src/app/projects/[id]/page.tsx` adds the project detail delete action and redirect flow
* `src/app/api/projects/[id]/route.ts` now supports `DELETE`
* `src/lib/project/project.ts` now removes a project from the local project list
* `src/lib/project/server.ts` now deletes the canonical project row
* targeted tests passed for local list deletion, browser/server delete transport, canonical server delete, and both UI entry points

**Documentation Updates**
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

---

## MS-000.6 - Roadmap Engine

**Milestone**
MS-000.6 - Roadmap Engine

**Status**
Completed

**Purpose**
Establish the formal SPS OS 1.0 roadmap as a first-class project control document.

**Business Goal**
Provide one trusted source for milestone sequence and planning continuity.

**Technical Goal**
Introduce a formal roadmap contract used by PCL, Chief Architect, Codex Handoff, and the future Conductor.

**Dependencies**
* `00_PROJECT_BIBLE.md`
* `01_VISION.md`
* `02_ARCHITECTURE.md`
* `08_CURRENT_STATE.md`
* `10_SESSION_STATE.md`

**Definition of Ready**
* SPS OS 1.0 milestone path is identified.
* Completed milestones are confirmed.
* Current and next roadmap positions are known.

**Implementation Scope**
* Create the formal roadmap contract document.
* Define roadmap rules.
* Define milestone classes.
* Define milestone contracts from `MS-000.6` to `MS-001.4`.

**Out of Scope**
* SPS 2.0 planning
* AI implementation
* marketplace
* plugins
* enterprise expansion

**Artifacts**
* `docs/04_ROADMAP.md`
* updated `08_CURRENT_STATE.md`
* updated `09_CHANGELOG.md`
* updated `10_SESSION_STATE.md`

**Definition of Done**
* roadmap exists as a formal contract document,
* milestone order is explicit,
* current milestone is explicit,
* next milestone is explicit.

**Documentation Updates**
* `08_CURRENT_STATE.md`
* `09_CHANGELOG.md`
* `10_SESSION_STATE.md`

**Next Milestone**
MS-000.7 - Workspace Engine

## MS-000.7 - Workspace Engine

**Milestone**
MS-000.7 - Workspace Engine

**Status**
Completed

**Purpose**
Define the primary workspace operating layer of SPS OS 1.0.

**Business Goal**
Give SPS OS a stable workspace foundation for guided daily work.

**Technical Goal**
Establish the Workspace Engine contract and baseline structure.

**Dependencies**
* `MS-000.6 - Roadmap Engine`

**Definition of Ready**
* roadmap contract is active,
* SPS OS workspace direction is defined.

**Implementation Scope**
* workspace engine definition,
* workspace structure contract,
* workspace operating boundaries.

**Out of Scope**
* advanced automation
* external integrations

**Artifacts**
* workspace engine documentation
* state document updates

**Definition of Done**
* workspace engine is formally defined and accepted.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-000.8 - Project Engine

## MS-000.8 - Project Engine

**Milestone**
MS-000.8 - Project Engine

**Status**
Completed

**Purpose**
Define project-level operating structure in SPS OS 1.0.

**Business Goal**
Make projects first-class managed units of work.

**Technical Goal**
Establish the Project Engine contract and boundaries.

**Dependencies**
* `MS-000.7 - Workspace Engine`

**Definition of Ready**
* workspace engine contract exists.

**Implementation Scope**
* project engine definition,
* project operating model,
* project context contract.

**Out of Scope**
* AI orchestration
* provider integrations

**Artifacts**
* project engine documentation
* state document updates

**Definition of Done**
* project engine is formally defined and accepted.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-000.9 - Task Engine

## MS-000.9 - Task Engine

**Milestone**
MS-000.9 - Task Engine

**Status**
Completed

**Purpose**
Define task-level execution structure for SPS OS 1.0.

**Business Goal**
Enable work decomposition into controlled execution units.

**Technical Goal**
Establish the Task Engine contract and lifecycle boundaries.

**Dependencies**
* `MS-000.8 - Project Engine`

**Definition of Ready**
* project engine contract exists.

**Implementation Scope**
* task engine definition,
* task contract structure,
* task progression rules.

**Out of Scope**
* automation engine
* integrations

**Artifacts**
* task engine documentation
* state document updates

**Definition of Done**
* task engine is formally defined and accepted.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.0 - Knowledge Engine

## MS-001.0 - Task Workspace Integration

**Milestone**
MS-001.0 - Task Workspace Integration

**Status**
Completed

**Purpose**
Integrate the Task Engine into the project workspace as the first usable task screen.

**Business Goal**
Make tasks visible and usable inside project workspace flow.

**Technical Goal**
Connect Task Engine to project routing and workspace UI without changing Project Engine.

**Dependencies**
* `MS-000.9 - Task Engine`

**Definition of Ready**
* task engine exists,
* project workspace routing is available.

**Implementation Scope**
* add project Tasks screen,
* add Tasks navigation entry,
* connect Task Engine reads and writes to workspace UI.

**Out of Scope**
* knowledge modeling
* AI agent behavior
* enterprise expansion

**Artifacts**
* Tasks workspace route
* project navigation update
* state document updates

**Definition of Done**
* tasks are accessible in project workspace,
* task creation works through Task Engine,
* task list renders without direct localStorage access in UI.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.1 - Knowledge Engine

## MS-001.1 - Knowledge Engine

**Milestone**
MS-001.1 - Knowledge Engine

**Status**
Completed

**Purpose**
Define the knowledge management engine for SPS OS 1.0.

**Business Goal**
Create a stable knowledge layer supporting continuity and decision quality.

**Technical Goal**
Establish the Knowledge Engine contract and source-of-truth boundaries.

**Dependencies**
* `MS-001.0 - Task Workspace Integration`

**Definition of Ready**
* task workspace integration exists.

**Implementation Scope**
* knowledge engine definition,
* knowledge lifecycle rules,
* knowledge ownership boundaries.

**Out of Scope**
* AI agent behavior
* enterprise expansion

**Artifacts**
* knowledge engine documentation
* state document updates

**Definition of Done**
* knowledge engine is formally defined and accepted.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.2A - UI Foundation / SectionCard

## MS-001.2A - UI Foundation / SectionCard

**Milestone**
MS-001.2A - UI Foundation / SectionCard

**Status**
Completed

**Purpose**
Introduce the first shared UI foundation component without changing visual design.

**Business Goal**
Start UI consistency work through a safe reusable section container.

**Technical Goal**
Introduce `SectionCard` and connect selected simple screens to the shared container.

**Dependencies**
* `MS-001.1 - Knowledge Engine`

**Definition of Ready**
* knowledge engine contract exists.

**Implementation Scope**
* add `SectionCard`,
* centralize primary section container style,
* update selected simple screens,
* preserve current appearance 1:1.

**Out of Scope**
* visual redesign
* new UI variants
* button system
* input system
* plugins

**Artifacts**
* `SectionCard` UI component
* updated simple screens
* state document updates

**Definition of Done**
* SectionCard exists,
* selected screens use it,
* no visual or business logic changes were introduced.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.2B - UI Foundation Continuation

## MS-001.2B - UI Foundation Continuation

**Milestone**
MS-001.2B - UI Foundation Continuation

**Status**
Completed

**Purpose**
Continue UI foundation work in small, safe increments after SectionCard.

**Business Goal**
Expand UI consistency while preserving the existing visual language.

**Technical Goal**
Continue extracting repeated UI primitives without changing behaviour.

**Dependencies**
* `MS-001.2A - UI Foundation / SectionCard`

**Definition of Ready**
* SectionCard milestone is completed,
* repeated UI patterns are identified.

**Implementation Scope**
* continue low-risk UI extraction,
* preserve visual parity,
* keep scope limited to foundational UI reuse.

**Out of Scope**
* visual redesign
* new UI variants
* design system overhaul
* plugins

**Artifacts**
* additional UI foundation updates
* `docs/06_UI_INVENTORY.md`
* state document updates

**Current Progress**
* Minimal Patch 1 completed - created `docs/06_UI_INVENTORY.md`
* Minimal Patch 2 completed - `WorkspaceLayout` now composes `SectionCard` internally
* Minimal Patch 3 completed - `WorkspacePanels` Quick Actions now render from a local configuration array
* Minimal Patch 4 completed - `WorkspacePanels` KPI cards now render from a local configuration array

**Definition of Done**
* next safe UI foundation slice is completed and verified.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.3 - Workflow Engine

## MS-001.3 - Workflow Engine

**Milestone**
MS-001.3 - Workflow Engine

**Status**
Completed

**Purpose**
Define workflow execution boundaries for SPS OS 1.0.

**Business Goal**
Make workflow progression explicit, repeatable, and controllable.

**Technical Goal**
Establish the Workflow Engine contract without implementing advanced automation.

**Dependencies**
* `MS-001.2A - UI Foundation / SectionCard`
* `MS-001.2B - UI Foundation Continuation`

**Definition of Ready**
* UI system contract exists.

**Implementation Scope**
* workflow engine definition,
* workflow state boundaries,
* workflow contract artifacts.

**Out of Scope**
* AI autonomy
* external integrations

**Artifacts**
* `docs/11_WORKFLOW_ENGINE.md`
* `src/lib/workflow/types.ts`
* `src/lib/workflow/engine.ts`
* state document updates

**Current Progress**
* Minimal Patch 1 completed - created `docs/11_WORKFLOW_ENGINE.md`
* Minimal Patch 2 completed - Workflow domain contract created
* Minimal Patch 3 completed - first warning decision rule added
* Minimal Patch 4 completed - first dynamic nextStep rule added
* Minimal Patch 5 completed - second dynamic nextStep rule added
* Minimal Patch 6 completed - evidence counters unified across all decision branches
* Minimal Patch 8 completed - first dynamic confidence policy added
* Added `src/lib/workflow/types.ts`
* Added `src/lib/workflow/engine.ts`
* Commit: `287803c` - `feat(ms-001.3): add workflow engine foundation`
* Workflow Engine remains isolated from UI
* Workflow Engine now returns `warning` when blockers are absent and warnings exist
* Decision priority is now `blocked > warning > ready`
* Workflow Engine now returns `continue-active-work` when active work exists without blockers or warnings
* Workflow Engine now returns `start-next-work` when no blockers, warnings, or active work exist
* Workflow Engine now returns consistent evidence with `phase`, `completed`, `active`, `warnings`, and `blockers` in every branch
* Workflow Engine now returns confidence `1.0` for `blocked`, `0.75` for `warning`, and `0.5` for ready branches
* Minimal Patch 7 diagnosis completed - not implemented because no existing test setup was found
* Test runner setup requires separate future scope before Workflow Engine tests can be added
* Milestone Closure Review passed

**Definition of Done**
* workflow engine is formally defined and accepted.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.4 - Release Readiness

## MS-001.4 - Release Readiness

**Milestone**
MS-001.4 - Release Readiness

**Status**
Completed

**Purpose**
Prepare SPS OS 1.0 for controlled release qualification.

**Business Goal**
Ensure the platform is organized for release evaluation.

**Technical Goal**
Establish the release-readiness contract and validation boundaries.

**Dependencies**
* `MS-001.3 - Workflow Engine`

**Definition of Ready**
* workflow engine contract exists.

**Implementation Scope**
* release readiness definition,
* release validation contract,
* release criteria alignment.

**Release Readiness Validation Categories**
* SSOT consistency
* Bootstrap/runtime startup
* Session package generation
* Git/repository state
* Documentation completeness
* Milestone closure evidence
* Out-of-scope boundary confirmation

**Release Readiness Evidence Checklist**

Status vocabulary:

* `PASS`
* `FAIL`
* `PARTIAL`
* `MISSING`
* `NOT APPLICABLE`

Checklist:

* Category: SSOT consistency
  Required Evidence: roadmap, current state, changelog, session state, and lifecycle documents do not conflict.
  Evidence Source: SSOT documentation and bootstrap validation output.
  Status Vocabulary: `PASS` / `FAIL` / `PARTIAL` / `MISSING` / `NOT APPLICABLE`
  Notes / Decision Rule: any unresolved SSOT conflict blocks release-readiness decision.

* Category: Bootstrap/runtime startup
  Required Evidence: `SPS OS — START` completes required bootstrap gates and Runtime Dashboard output is valid.
  Evidence Source: latest bootstrap Runtime Dashboard.
  Status Vocabulary: `PASS` / `FAIL` / `PARTIAL` / `MISSING` / `NOT APPLICABLE`
  Notes / Decision Rule: failed bootstrap, failed SSOT Validation, or failed Consistency Gate blocks release-readiness decision.

* Category: Session package generation
  Required Evidence: session package includes readable Git Context, Session Summary, and available Session Handoff.
  Evidence Source: generated `sps-session.zip`, `sps-git-context.txt`, `sps-session-summary.txt`, and session handoff if available.
  Status Vocabulary: `PASS` / `FAIL` / `PARTIAL` / `MISSING` / `NOT APPLICABLE`
  Notes / Decision Rule: missing package context must be documented before release-readiness decision.

* Category: Git/repository state
  Required Evidence: branch, working tree state, latest commit, and remote sync status are known.
  Evidence Source: confirmed Git output or package Git Context.
  Status Vocabulary: `PASS` / `FAIL` / `PARTIAL` / `MISSING` / `NOT APPLICABLE`
  Notes / Decision Rule: unknown or dirty repository state blocks release-readiness decision unless Product Owner explicitly accepts the condition.

* Category: Documentation completeness
  Required Evidence: required roadmap, current state, changelog, session state, bootstrap, close protocol, package, and capability documentation are present and aligned.
  Evidence Source: SSOT documentation review.
  Status Vocabulary: `PASS` / `FAIL` / `PARTIAL` / `MISSING` / `NOT APPLICABLE`
  Notes / Decision Rule: missing required documentation blocks release-readiness decision.

* Category: Milestone closure evidence
  Required Evidence: completed milestones required for SPS OS 1.0 release path have closure evidence.
  Evidence Source: roadmap, current state, changelog, and session state.
  Status Vocabulary: `PASS` / `FAIL` / `PARTIAL` / `MISSING` / `NOT APPLICABLE`
  Notes / Decision Rule: missing closure evidence for required prior milestones blocks release-readiness decision.

* Category: Out-of-scope boundary confirmation
  Required Evidence: SPS 2.0 scope, new business modules, source-code feature implementation, and test runner setup remain outside MS-001.4 unless separately approved.
  Evidence Source: this milestone contract and Product Owner-approved scope.
  Status Vocabulary: `PASS` / `FAIL` / `PARTIAL` / `MISSING` / `NOT APPLICABLE`
  Notes / Decision Rule: scope expansion blocks release-readiness decision until explicitly approved.

Decision boundary:

MS-001.4 may proceed to release-readiness decision only when all required categories are `PASS` or explicitly `NOT APPLICABLE`.
Any `FAIL` or `MISSING` blocks the decision.
`PARTIAL` requires a documented follow-up or Product Owner decision.

**First Evidence Assessment**

Some categories are now marked `PASS` based on the latest successful `SPS OS — START`.
Any `MISSING` category blocks release-readiness decision.
Any `PARTIAL` category requires follow-up evidence or Product Owner decision.
Release-readiness decision remains blocked because not all required categories are `PASS` or `NOT APPLICABLE`.

* Category: SSOT consistency
  Status: `PASS`
  Evidence found: roadmap/backlog ownership was clarified by commit `1356170 docs(ssot): clarify roadmap and backlog ownership`; `04_ROADMAP.md` is milestone order SSOT; `05_ROADMAP.md` is strategic product direction, not milestone order; `06_BACKLOG.md` owns candidate future work; `docs/BACKLOG.md` is legacy from the current-state perspective.
  Evidence missing: none for this category.
  Blocks release-readiness decision: NO

* Category: Bootstrap/runtime startup
  Status: `PASS`
  Evidence found: latest successful `SPS OS — START` reported Bootstrap Status `PASS`, Project Context Loader `PASS`, Project Integrity `PASS`, SSOT Validation `PASS`, Consistency Gate `PASS`, Runtime Lock `ACTIVE`, and Session Lock `ACTIVE`.
  Evidence missing: none for this category.
  Blocks release-readiness decision: NO

* Category: Session package generation
  Status: `PARTIAL`
  Evidence found: latest successful `SPS OS — START` reported Package Detected `YES`, Git Context `PRESENT`, Session Summary `PRESENT`, and Session Handoff `PRESENT`.
  Evidence missing: Current Session ID, Suggested Chat Title, and Next Session ID are `UNKNOWN`; Package Consistency is `PARTIAL`.
  Blocks release-readiness decision: YES

* Category: Git/repository state
  Status: `PASS`
  Evidence found: latest successful `SPS OS — START` reported branch `feature/documentation-foundation`, Repository Status `CLEAN`, and Latest Commit `3616fa3 docs(ms-001.4): record first readiness evidence assessment`; Product Owner confirmed remote state was up to date before package generation.
  Evidence missing: none for this category.
  Blocks release-readiness decision: NO

* Category: Documentation completeness
  Status: `PARTIAL`
  Evidence found: required roadmap, current state, changelog, session state, bootstrap, close protocol, package, and capability documents exist.
  Evidence missing: formal completeness review for this release-readiness assessment.
  Blocks release-readiness decision: YES

* Category: Milestone closure evidence
  Status: `PARTIAL`
  Evidence found: MS-001.3 is recorded as completed and Milestone Closure Review passed.
  Evidence missing: full closure-evidence review for all required prior SPS OS 1.0 release-path milestones.
  Blocks release-readiness decision: YES

* Category: Out-of-scope boundary confirmation
  Status: `PARTIAL`
  Evidence found: MS-001.4 explicitly excludes SPS 2.0 scope, new business modules, source-code feature implementation, and test runner setup unless separately approved.
  Evidence missing: current Product Owner confirmation or release-readiness review confirming no scope expansion.
  Blocks release-readiness decision: YES

**Out of Scope**
* SPS 2.0 scope
* new business modules
* source-code feature implementation
* test runner setup unless separately approved

**Artifacts**
* release readiness documentation
* state document updates

**Definition of Done**
* release readiness categories are documented,
* validation boundaries are accepted,
* required release evidence is known,
* next release decision can be made safely.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.5 - SPS OS 1.0 Release Candidate

## MS-001.5 - SPS OS 1.0 Release Candidate

**Milestone**
MS-001.5 - SPS OS 1.0 Release Candidate

**Status**
Completed

**Purpose**
Define the final release candidate milestone for SPS OS 1.0.

**Business Goal**
Create the controlled final milestone before SPS OS 1.0 release acceptance.

**Technical Goal**
Establish the release candidate contract and completion boundary for SPS OS 1.0.

**Dependencies**
* `MS-001.4 - Release Readiness`

**Definition of Ready**
* release readiness milestone exists.

**Implementation Scope**
* release candidate definition,
* final milestone contract,
* final SPS OS 1.0 release boundary.

**Out of Scope**
* SPS OS 2.0 definition
* marketplace
* plugins
* enterprise expansion

**Artifacts**
* release candidate documentation
* state document updates

**Definition of Done**
* release candidate milestone is formally defined and accepted.

**Documentation Updates**
* Current State
* Session State
* Change Log

**Next Milestone**
MS-001.6 - Final Release Acceptance Review

## MS-001.6 - Final Release Acceptance Review

**Milestone**
MS-001.6 - Final Release Acceptance Review

**Status**
Completed

**Purpose**
Record final release acceptance for SPS OS 1.0.

**Release Decision**
* Final Release Acceptance: ACCEPTED
* Offline Git limitation: accepted
* SPS OS 1.0: Released / Accepted

**Implementation Scope**
Documentation-only acceptance record. No code or architecture changes.

**Definition of Done**
* MS-001.6 accepted by Product Owner.
* SPS OS 1.0 release state recorded as Released / Accepted.
* Current product milestone is NONE.
* Blockers are NONE.
* Next stage is not active without a separate Product Owner-approved contract.

**Next Milestone**
MS-001.7 - SPS OS 1.0 Stabilization

## MS-001.7 - SPS OS 1.0 Stabilization

**Milestone**
MS-001.7 - SPS OS 1.0 Stabilization

**Status**
Completed

**Purpose**
Stabilize the accepted SPS OS 1.0 baseline before further core platform development.

**Business Goal**
Provide a technically verified and maintainable foundation for Project Brain Engine and subsequent SPS development.

**Technical Goal**
Verify repository baseline, clean-environment operation, minimal automated testing, and current SSOT accuracy without expanding product functionality.

**Dependencies**
* `MS-001.6 - Final Release Acceptance Review`
* SPS OS 1.0 release state recorded as `Released / Accepted`
* synchronized local and remote repository state

**Definition of Ready**
* MS-001.6 is completed.
* SPS OS 1.0 Final Release Acceptance is `ACCEPTED`.
* repository working tree is clean,
* local branch and remote branch are synchronized,
* no product milestone is currently active,
* Product Owner approved stabilization as the next development stage.

**Implementation Scope**
* repository baseline and branch-strategy review,
* clean dependency installation verification,
* production build verification,
* lint and startup verification,
* minimal test-runner selection and setup,
* baseline tests for critical SPS engines,
* confirmed documentation cleanup,
* final Stabilization Review.

**Verification Scope**
* dependency installation succeeds from a clean environment,
* production build completes,
* lint result is known and documented,
* application starts,
* primary project flow can be smoke-tested,
* critical engine tests execute successfully,
* SSOT documents reflect the current project state,
* Git and remote synchronization state are known.

**Initial Test Scope**
* Workflow Engine,
* Project Engine,
* Task Engine,
* Knowledge Engine.

Tests should cover only:
* basic happy paths,
* input validation where already defined,
* critical decision rules,
* stability of public engine contracts.

**Out of Scope**
* Project Brain Engine implementation,
* AI Workspace,
* new business functionality,
* GitHub, Vercel, Supabase, or AI-provider integrations,
* UI redesign,
* migration away from localStorage,
* broad refactoring,
* SPS OS 2.0.

**Artifacts**
* stabilization verification evidence,
* minimal test-runner configuration if approved during execution,
* baseline engine tests,
* synchronized state documentation,
* Stabilization Review result.

**Current Progress**
* Repository Baseline Review completed.
* `main` confirmed as ancestor of the feature branch.
* fast-forward merge completed.
* `main` HEAD after merge: `5348116`.
* dependency installation `PASS`.
* lint `PASS` with one accepted non-blocking warning in `src/app/projects/[id]/tasks/page.tsx`.
* production build `PASS`.
* runtime startup `PASS`.
* minimal Vitest foundation added.
* `4` engine tests `PASS`.
* test foundation commit: `13933d8`.
* working tree `CLEAN`.
* `origin/main` synchronized `0 / 0`.
* feature branch retained.
* no blockers.

**Definition of Done**
* repository and branch strategy are explicitly confirmed,
* clean installation and production build pass,
* runtime smoke verification passes,
* minimal test runner works,
* agreed baseline engine tests pass,
* known documentation inconsistencies are resolved,
* no unresolved stabilization blocker exists,
* final Stabilization Review returns `PASS`,
* Product Owner accepts milestone closure.

**Documentation Updates**
* `08_CURRENT_STATE.md`
* `09_CHANGELOG.md`
* `10_SESSION_STATE.md`

These documents are updated only after the milestone is formally activated or its work changes project state.

**Next Milestone**
MS-001.8 - Project Brain Engine Foundation

---

## MS-001.8 - Project Brain Engine Foundation

**Milestone**
MS-001.8 - Project Brain Engine Foundation

**Status**
Completed

**Purpose**
Establish a minimal central runtime read layer for one projectId.

**Business Goal**
Provide one stable access point to current project context for future representations and workflow consumers.

**Technical Goal**
Compose a deterministic read-only ProjectBrainSnapshot from existing Project, Task and Knowledge modules and build workflow-ready state without duplicating storage or write ownership.

**Dependencies**
* `MS-001.7 - SPS OS 1.0 Stabilization`
* Project module
* Task module
* Knowledge module
* Workflow Engine
* Vitest

**Definition of Ready**
* Product Owner approval confirmed
* milestone ID approved
* read-only boundary approved
* two-operation API approved
* snapshot shape approved
* temporary storage strategy approved
* error model approved
* verification contract approved
* no competing active milestone
* DoR Review PASS

**Implementation Scope**
* one project-brain module
* one ProjectBrainSnapshot type
* read aggregation for one projectId
* workflow-ready state construction
* internal validation
* unit and integration tests

**Public API**
* `getProjectBrainSnapshot(projectId)`
* `buildProjectWorkflowState(projectId)`

**Snapshot Shape**
* `project`
* `tasks`
* `knowledgeEntries`
* `workflowState`

**Storage Strategy**
* no new storage
* no new localStorage key
* no persisted aggregate
* no migration
* existing modules remain data sources and write owners

**Error Model**
* `invalid-project-id`
* `project-not-found`
* `source-read-failed`
* `invalid-snapshot`

**Out of Scope**
* UI
* routing
* write API
* AI Workspace
* document generation
* export layer
* integrations
* database
* ORM
* versioning
* synchronization
* multi-user
* permissions
* migration
* replacing SPS OS documentation SSOT
* other Canonical Project Model domains
* refactoring existing engines

**Artifacts**
* `src/lib/project-brain/types.ts`
* `src/lib/project-brain/engine.ts`
* Project Brain tests
* synchronized SSOT documentation

**Current Progress**
* implementation commit: `94d7b0f`
* implementation published: YES
* read-only Project Brain snapshot foundation implemented
* public API:
* `getProjectBrainSnapshot(projectId)`
* `buildProjectWorkflowState(projectId)`
* snapshot:
* `project`
* `tasks`
* `knowledgeEntries`
* `workflowState`
* no new storage
* no persisted aggregate
* no UI changes
* tests, lint, and build: PASS
* Milestone Closure Review: PASS

**Verification**
* `npm test`
* `npm run lint`
* `npm run build`
* snapshot returned for existing project
* tasks filtered by projectId
* knowledge filtered by projectId
* deterministic workflow state
* project-not-found handled
* no new localStorage writes
* existing tests remain PASS

**Definition of Done**
* module exists
* API matches contract
* snapshot deterministic
* no new storage
* no UI changes
* Project Brain tests PASS
* existing tests PASS
* lint PASS
* build PASS
* SSOT synchronized
* Milestone Closure Review PASS
* commit and push explicitly confirmed

**Next Milestone**
MS-001.9 - Project Brain Workflow Evaluation Bridge

---

## MS-001.9 - Project Brain Workflow Evaluation Bridge

**Milestone**
MS-001.9 - Project Brain Workflow Evaluation Bridge

**Status**
Completed

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose one minimal read-only bridge between the published Project Brain snapshot and the existing Workflow Engine.

**One Intention**
Connect the existing read-only `ProjectBrainSnapshot.workflowState` to the existing Workflow Engine and expose one deterministic workflow evaluation result for one `projectId`.

**Problem Statement**
* `MS-001.8` can build a deterministic `ProjectBrainSnapshot`
* the snapshot already contains `workflowState`
* the existing Workflow Engine can evaluate a provided `ProjectState`
* no public runtime path yet reads Project Brain state for one `projectId` and returns a Workflow Engine result
* future consumers would otherwise need to compose these modules themselves

**Business Goal**
For an existing project, one public read returns a deterministic workflow evaluation based on the current Project Brain snapshot without requiring future consumers to compose the modules manually.

**Technical Goal**
* read the current Project Brain snapshot for `projectId`
* pass `snapshot.workflowState` to existing `evaluateWorkflow`
* return the existing `WorkflowResult`
* preserve current storage and error boundaries

**API Owner**
* `src/lib/project-brain`

**Public API**
* `evaluateProjectWorkflow(projectId)`

**Return Type**
* existing `WorkflowResult`

**Data Flow**
* `projectId`
* `getProjectBrainSnapshot(projectId)`
* `snapshot.workflowState`
* `evaluateWorkflow(workflowState)`
* `WorkflowResult`

**Read/Write Boundary**
* read-only milestone
* bridge performs no writes
* result is not persisted
* Project, Task, and Knowledge remain write owners
* Workflow Engine remains a pure evaluator
* no write API

**Storage Strategy**
* no new storage
* no new localStorage key
* no migration
* no cache
* no persisted `WorkflowResult`
* no persisted bridge state
* current Project Brain sources remain authoritative

**Error Behavior**
* direct propagation of `invalid-project-id`
* direct propagation of `project-not-found`
* direct propagation of `source-read-failed`
* direct propagation of `invalid-snapshot`
* no bridge-specific error

**Dependencies**
* `MS-001.8 - Project Brain Engine Foundation`
* Project Brain module
* Workflow Engine
* `ProjectState`
* `WorkflowResult`
* existing Project Brain errors
* Vitest
* TypeScript
* package.json scripts

**Implementation Scope**
* one new public operation
* composition of `getProjectBrainSnapshot()` and `evaluateWorkflow()`
* reuse of existing `WorkflowResult`
* propagation of existing Project Brain errors
* bridge tests
* deterministic-result verification
* no-write verification

**Out of Scope**
* UI
* routing
* workflow execution
* automatic next-step execution
* Workflow Engine changes
* `ProjectState` changes
* `WorkflowResult` changes
* write API
* storage
* cache
* migrations
* batch evaluation
* AI
* integrations
* exports
* refactor
* expanding Project Brain to additional domains

**Verification Contract**
* returns `WorkflowResult` for an existing project
* result comes from evaluating `snapshot.workflowState`
* result is deterministic for the same data
* preserves existing Workflow Engine evaluation order
* propagates `invalid-project-id`
* propagates `project-not-found`
* propagates `source-read-failed`
* propagates `invalid-snapshot`
* performs no `localStorage.setItem`
* does not persist `WorkflowResult`
* does not mutate snapshot or `workflowState`
* existing tests remain `PASS`
* `npm test`
* `npm run lint`
* `npm run build`

**Definition of Ready**
* Product Owner approves the problem and expected result
* `MS-001.9` is approved
* one intention is approved
* API owner is approved
* public operation name is approved
* return type `WorkflowResult` is approved
* read-only boundary is approved
* data flow is approved
* error propagation is approved
* storage strategy is approved
* verification contract is approved
* exact implementation files are confirmed
* lifecycle sync documents are identified
* no competing active milestone exists
* Product Owner Approval: PASS
* Definition of Ready Review: PASS

**Definition of Done**
* one approved public operation exists
* operation uses the public Project Brain API
* operation uses existing `evaluateWorkflow`
* operation returns existing `WorkflowResult`
* no Workflow Engine logic is duplicated
* `ProjectState` is unchanged
* `WorkflowResult` is unchanged
* Project Brain errors are correctly propagated
* result is deterministic
* no new storage exists
* no writes are performed
* no UI changes exist
* no existing engine refactor was introduced
* bridge tests pass
* all existing tests pass
* lint passes
* build passes
* implementation commit is explicitly confirmed
* push is explicitly confirmed
* lifecycle SSOT documentation is synchronized
* Milestone Closure Review returns `PASS`

**Implementation Evidence**
* Implementation Status: `COMPLETED / PUBLISHED`
* Implementation Commit: `acecbfe`
* Implementation Publication: `origin/main`
* Tests: `29 PASS`
* Lint: `PASS` with one existing unrelated warning
* Build: `PASS`
* Definition of Done Review: `PASS`
* Milestone Closure Review: `PASS`

**Documentation Impact**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Implementation Status**
COMPLETED / PUBLISHED

**Next Milestone**
MS-001.10 - Project Brain Workflow Consumer Snapshot

---

## MS-001.10 - Project Brain Workflow Consumer Snapshot

**Milestone**
MS-001.10 - Project Brain Workflow Consumer Snapshot

**Status**
Completed

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose one consumer-ready read-only Project Brain operation that returns the current project snapshot together with its evaluated workflow result for one `projectId`.

**One Intention**
Return one consistent `ProjectBrainSnapshot` and its corresponding `WorkflowResult` through a single read-only Project Brain operation for one `projectId`.

**Problem Statement**
* the repository already exposes `getProjectBrainSnapshot(projectId)`
* the repository already exposes `evaluateProjectWorkflow(projectId)`
* a future consumer would still need to coordinate two separate reads to obtain project context and workflow evaluation
* no single consumer-ready read model yet returns both the current snapshot and the workflow result together

**Business Goal**
Provide future consumers one coherent and deterministic read model without requiring them to compose Project Brain and Workflow Engine manually.

**Technical Goal**
* read one `ProjectBrainSnapshot` for `projectId`
* evaluate `snapshot.workflowState`
* return the same snapshot together with the resulting `WorkflowResult`
* preserve current storage, error, and engine boundaries

**API Owner**
* `src/lib/project-brain`

**Public API**
* `getProjectWorkflowSnapshot(projectId)`

**Return Type**
* `ProjectWorkflowSnapshot`

**Aggregate Type Shape**
```ts
type ProjectWorkflowSnapshot = {
  snapshot: ProjectBrainSnapshot;
  workflowResult: WorkflowResult;
};
```

**Single-Read Consistency Rule**
* operation reads `ProjectBrainSnapshot` exactly once
* operation evaluates `snapshot.workflowState`
* operation returns that same snapshot together with the workflow result
* operation must not perform two independent snapshot reads

**Data Flow**
* `projectId`
* `getProjectBrainSnapshot(projectId)`
* `snapshot.workflowState`
* `evaluateWorkflow(snapshot.workflowState)`
* `{ snapshot, workflowResult }`

**Read/Write Boundary**
* read-only milestone
* no write API
* no writes
* Project, Task, and Knowledge remain write owners
* Workflow Engine remains a pure evaluator

**Storage Strategy**
* no new storage
* no new localStorage key
* no cache
* no migration
* no persisted aggregate
* no persisted `WorkflowResult`
* no persisted snapshot copy

**Error Behavior**
* direct propagation of `invalid-project-id`
* direct propagation of `project-not-found`
* direct propagation of `source-read-failed`
* direct propagation of `invalid-snapshot`
* no aggregate-specific error
* no wrapper
* no remapping
* no `try/catch`

**Dependencies**
* `MS-001.9 - Project Brain Workflow Evaluation Bridge`
* Project Brain module
* Workflow Engine
* `ProjectBrainSnapshot`
* `WorkflowResult`
* existing Project Brain errors
* Vitest
* TypeScript
* package.json scripts

**Expected Implementation Scope**
* one new public operation
* one aggregate return type
* composition of `getProjectBrainSnapshot(projectId)` and `evaluateWorkflow(snapshot.workflowState)`
* no-write verification
* deterministic-result verification
* single-read consistency verification

**Out of Scope**
* UI
* routing
* React hooks
* Server Actions
* API endpoints
* workflow execution
* automatic next steps
* write API
* storage
* cache
* migrations
* new localStorage keys
* Workflow Engine changes
* `ProjectState` changes
* `WorkflowResult` changes
* new Project Brain domains
* document export
* integrations
* GitHub
* Supabase
* Vercel
* AI Workspace
* multi-project reads
* batch API
* synchronization
* multi-user
* permissions
* refactor

**Verification Contract**
* returns `ProjectWorkflowSnapshot` for an existing project
* returned `snapshot` matches `getProjectBrainSnapshot(projectId)`
* returned `workflowResult` matches `evaluateWorkflow(returnedSnapshot.workflowState)`
* snapshot is read exactly once within the operation
* result is deterministic for the same data
* `workflowResult` and `snapshot.workflowState` remain consistent
* active-work behavior remains aligned with Workflow Engine
* ready behavior remains aligned with Workflow Engine
* existing Project Brain errors are propagated unchanged
* operation performs no `localStorage.setItem`
* aggregate is not persisted
* snapshot is not mutated
* `workflowState` is not mutated
* existing Project Brain APIs remain unchanged
* existing tests remain `PASS`
* `npm test`
* `npm run lint`
* `npm run build`

**Definition of Ready**
* Product Owner approves the problem
* Product Owner approves the business goal
* milestone ID `MS-001.10` is approved
* milestone name is approved
* one intention is approved
* API owner is approved
* public operation is approved
* aggregate type and its exact shape are approved
* single-read consistency rule is approved
* data flow is approved
* read-only boundary is approved
* storage strategy is approved
* error behavior is approved
* verification contract is approved
* exact implementation files are confirmed
* no competing active milestone exists
* Product Owner Approval: PASS
* Definition of Ready Review: PASS

**Definition of Done**
* one approved public operation exists
* one approved aggregate type exists
* operation reads snapshot exactly once
* `workflowResult` is computed from the returned snapshot workflow state
* operation uses existing Project Brain API
* operation uses existing Workflow Engine
* Workflow Engine logic is not duplicated
* result is deterministic
* existing errors are propagated unchanged
* snapshot is not mutated
* `workflowState` is not mutated
* no new storage exists
* no writes are performed
* no UI changes exist
* no Workflow Engine changes exist
* aggregate API tests pass
* all existing tests pass
* lint passes
* build passes
* implementation commit is published
* lifecycle SSOT is synchronized
* Milestone Closure Review returns `PASS`

**Documentation Impact**
* `docs/04_ROADMAP.md`
* `docs/08_CURRENT_STATE.md`
* `docs/09_CHANGELOG.md`
* `docs/10_SESSION_STATE.md`

**Product Owner Approval**
PASS

**Definition of Ready Review**
PASS

**Implementation Evidence**
* Implementation Status: `COMPLETED / PUBLISHED`
* Implementation Commit: `1f20905`
* Implementation Publication: `origin/main`
* Public type: `ProjectWorkflowSnapshot`
* Public API: `getProjectWorkflowSnapshot(projectId)`
* Tests: `40 PASS`
* Lint: `PASS` with one existing unrelated warning
* Build: `PASS`
* Definition of Done Review: `PASS`
* Milestone Closure Review: `PASS`

**Implementation Status**
COMPLETED / PUBLISHED

**Next Milestone**
MS-001.12 - Project Brain Consumer Workspace Model

---

## MS-001.11 - Project Brain Consumer Overview Model

**Milestone**
MS-001.11 - Project Brain Consumer Overview Model

**Contract Status**
APPROVED

**Runtime Status**
COMPLETED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Introduce a minimal, read-only consumer overview model that presents the most important Project Brain information in a compact and deterministic form.

**One Intention**
Create one canonical consumer-facing overview projection over the existing `ProjectWorkflowSnapshot`.

**Problem Statement**
* `MS-001.10` introduced `getProjectWorkflowSnapshot(projectId)` returning the complete `ProjectBrainSnapshot` and `WorkflowResult`
* future consumers would still need to inspect nested structures, calculate counters, and select overview-relevant workflow fields
* repeated consumer-side projection would risk duplicated calculations and inconsistent interpretations
* no canonical compact overview model exists yet

**Business Goal**
Provide future SPS consumers with one stable and understandable project overview model.

**Technical Goal**
Add a deterministic read-only projection derived from one `ProjectWorkflowSnapshot`.

**Dependencies**
* `MS-001.8 - Project Brain Engine Foundation`
* `MS-001.9 - Project Brain Workflow Evaluation Bridge`
* `MS-001.10 - Project Brain Workflow Consumer Snapshot`
* `getProjectWorkflowSnapshot(projectId)`
* `ProjectWorkflowSnapshot`
* `ProjectBrainSnapshot`
* `WorkflowResult`

**API Owner**
* `src/lib/project-brain`

**Proposed Public API**
* `getProjectConsumerOverview(projectId)`

**Proposed Public Return Type**
* `ProjectConsumerOverview`

**Proposed Model Shape**
```ts
export type ProjectConsumerOverview = {
  project: {
    id: string;
    name: string;
  };
  counts: {
    tasks: number;
    knowledgeEntries: number;
  };
  workflow: {
    health: WorkflowResult["health"];
    confidence: number;
    nextStep: WorkflowResult["nextStep"];
    warnings: number;
    blockers: number;
  };
};
```

**Field Source Rules**
* project identity is copied from `workflowSnapshot.snapshot.project`
* task count equals `workflowSnapshot.snapshot.tasks.length`
* knowledge entry count equals `workflowSnapshot.snapshot.knowledgeEntries.length`
* workflow health, confidence, and next step are copied from `workflowSnapshot.workflowResult`
* warning and blocker counts are derived only from canonical workflow evaluation evidence
* no field may require an additional project, task, knowledge, or workflow read

**Data Flow**
* `projectId`
* `getProjectWorkflowSnapshot(projectId)`
* deterministic overview projection
* `ProjectConsumerOverview`

**Single-Read Consistency Rule**
* `getProjectConsumerOverview(projectId)` calls `getProjectWorkflowSnapshot(projectId)` exactly once
* every overview field is derived from that returned aggregate
* the operation must not separately call Project Engine, Task Engine, Knowledge Engine, `getProjectBrainSnapshot(projectId)`, `evaluateProjectWorkflow(projectId)`, or `evaluateWorkflow(...)`

**Read/Write Boundary**
* strictly read-only
* no create, update, or delete operation
* no storage write
* no cache
* no persisted overview or snapshot copy
* no source data mutation

**Source of Truth Rule**
* `ProjectConsumerOverview` is a disposable consumer projection, not a new source of truth
* Project, Task, and Knowledge Engines remain write owners
* Workflow Engine remains the workflow evaluation owner
* Project Brain remains the canonical aggregation boundary

**Determinism Rule**
* the same `ProjectWorkflowSnapshot` must always produce the same `ProjectConsumerOverview`
* no dependency on time, randomness, UI state, route state, external APIs, or unrelated mutable global state

**Error Behavior**
* preserve existing Project Brain errors unchanged
* expected inherited errors: `invalid-project-id`, `project-not-found`, `source-read-failed`, `invalid-snapshot`
* no fallback overview data
* no swallowing, renaming, or remapping of inherited errors

**Expected Implementation Scope**
* `src/lib/project-brain/types.ts`
* `src/lib/project-brain/engine.ts`
* `src/lib/project-brain/engine.test.ts`
* one public overview type
* one public overview operation
* focused projection, single-read, error propagation, determinism, and no-write tests

**Out of Scope**
* UI, dashboard, React components, routing, CSS
* Workspace Engine changes
* Workflow Engine or workflow decision-rule changes
* Project, Task, or Knowledge Engine changes
* storage, localStorage keys, cache, persistence, migrations
* analytics, history, trends, timestamps, external integrations
* new business rules or writable consumer models
* API routes
* refactor

**Verification Contract**
* public type is exported
* project identity matches the source snapshot
* task and knowledge counts match source collection lengths
* workflow values match the canonical `WorkflowResult`
* empty collections produce zero counters
* `getProjectWorkflowSnapshot(projectId)` is invoked exactly once
* no independent workflow evaluation occurs
* inherited Project Brain errors propagate unchanged
* no storage write occurs
* `npm test` passes
* `npm run lint` passes subject only to previously accepted warnings
* `npm run build` passes

**Definition of Ready**
* milestone ID and name accepted
* Purpose and One Intention accepted
* API and return type names accepted
* exact model shape accepted
* field source rules accepted
* single-read rule accepted
* read-only and SSOT boundaries accepted
* implementation scope and Out of Scope accepted
* verification contract accepted
* Product Owner approval recorded
* approved contract synchronized into lifecycle SSOT
* separate Definition of Ready Review returns `PASS`
* no competing active milestone exists

**Definition of Done**
* approved type and operation exist
* operation performs one workflow snapshot read
* all fields derive from the same aggregate
* no UI, storage, write, or Workflow Engine changes exist
* focused and full tests pass
* lint and build pass
* implementation is reviewed and published
* lifecycle SSOT and closure evidence are synchronized
* Milestone Closure Review returns `PASS`

**Activation Boundary**
* contract approval and SSOT synchronization do not activate the milestone
* activation requires a separate Definition of Ready Review and explicit Product Owner authorization

**Product Owner Approval**
PASS

**Definition of Ready Review**
PASS

**Activation Status**
ACTIVATED

**Activation Decision**
APPROVED BY PRODUCT OWNER

**Active Session**
007

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Runtime Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
IMPLEMENTED / PUBLISHED / VERIFIED

**Next Safe Step**
Prepare MS-001.12 Implementation Handoff

---

## MS-001.12 - Project Brain Consumer Workspace Model

**Milestone**
MS-001.12 - Project Brain Consumer Workspace Model

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Introduce one deterministic, read-only consumer workspace model that exposes overview, task, and knowledge projections for one project through a single Project Brain read.

**One Intention**
Create one deterministic consumer-facing workspace projection over one existing `ProjectWorkflowSnapshot`.

**Problem Statement**
* `MS-001.11` introduced `getProjectConsumerOverview(projectId)` for a compact overview projection
* future consumers would still need to inspect the original workflow snapshot to read task and knowledge collections
* repeated consumer-side projection would duplicate mapping logic and risk inconsistent consumer workspace interpretations
* no canonical consumer workspace projection exists yet

**Business Goal**
Provide future SPS consumers one stable workspace read model that exposes overview, tasks, and knowledge entries without requiring extra domain composition.

**Technical Goal**
Add one deterministic read-only projection derived from one existing `ProjectWorkflowSnapshot` without additional domain reads or workflow changes.

**Dependencies**
* `MS-001.11 - Project Brain Consumer Overview Model`
* `MS-001.10 - Project Brain Workflow Consumer Snapshot`
* `getProjectWorkflowSnapshot(projectId)`
* `ProjectWorkflowSnapshot`
* `ProjectConsumerOverview`
* `ProjectBrainSnapshot`

**API Owner**
* `src/lib/project-brain`

**Proposed Public API**
* `getProjectConsumerWorkspace(projectId)`

**Proposed Public Return Type**
* `ProjectConsumerWorkspace`

**Proposed Supporting Types**
```ts
export type ProjectConsumerTask = {
  id: string;
  title: string;
};

export type ProjectConsumerKnowledgeEntry = {
  id: string;
  title: string;
};

export type ProjectConsumerWorkspace = {
  overview: ProjectConsumerOverview;
  tasks: ProjectConsumerTask[];
  knowledgeEntries: ProjectConsumerKnowledgeEntry[];
};
```

**Model Boundary**
* one consumer-facing workspace projection only
* workspace is derived from one existing `ProjectWorkflowSnapshot`
* no new source of truth is introduced

**Field Source Rules**
* `overview` is derived directly from the same snapshot and workflow aggregate used for the workspace projection
* `tasks` are derived from source task collection entries in source order
* `knowledgeEntries` are derived from source knowledge entry collection entries in source order
* each projected task includes only `id` and `title`
* each projected knowledge entry includes only `id` and `title`
* no field may require an additional project, task, knowledge, or workflow read

**Data Flow**
* `projectId`
* `getProjectWorkflowSnapshot(projectId)`
* deterministic workspace projection
* `ProjectConsumerWorkspace`

**Single-Read Consistency Rule**
* `getProjectConsumerWorkspace(projectId)` calls `getProjectWorkflowSnapshot(projectId)` exactly once
* all returned fields are derived from that one returned aggregate
* the operation must not perform any additional domain read

**Overview Consistency Rule**
* workspace overview is derived from the same aggregate as tasks and knowledge entries
* the operation must not call `getProjectConsumerOverview(projectId)`
* no workspace field may be derived from a second projection pass over separately loaded data

**Read/Write Boundary**
* strictly read-only
* no create, update, or delete operation
* no storage write
* no cache
* no persisted workspace copy
* no source data mutation

**Source of Truth Rule**
* `ProjectConsumerWorkspace` is a disposable consumer projection, not a new source of truth
* Project, Task, and Knowledge Engines remain write owners
* Workflow Engine remains the workflow evaluation owner
* Project Brain remains the canonical aggregation boundary

**Determinism Rule**
* the same `ProjectWorkflowSnapshot` must always produce the same `ProjectConsumerWorkspace`
* no dependency on time, randomness, UI state, route state, external APIs, or unrelated mutable global state

**Collection Rules**
* preserve source collection order
* no sorting
* no filtering
* no pagination
* no derived grouping

**Error Behavior**
* preserve existing Project Brain errors unchanged
* expected inherited errors: `invalid-project-id`, `project-not-found`, `source-read-failed`, `invalid-snapshot`
* no fallback workspace data
* no swallowing, renaming, or remapping of inherited errors

**Expected Implementation Scope**
* `src/lib/project-brain/types.ts`
* `src/lib/project-brain/engine.ts`
* `src/lib/project-brain/engine.test.ts`
* one public workspace type
* one public workspace operation
* focused projection, single-read, order-preservation, error propagation, determinism, and no-write tests

**Out of Scope**
* UI, dashboard, React components, routing, CSS
* Workflow Engine or workflow decision-rule changes
* Project, Task, or Knowledge Engine changes
* storage, localStorage keys, cache, persistence, migrations
* sorting, filtering, pagination, search, grouping
* additional domain reads
* `getProjectConsumerOverview(projectId)` calls
* new business rules or writable consumer models
* API routes
* refactor

**Verification Contract**
* public type is exported
* `overview` is derived from the same aggregate as tasks and knowledge entries
* task projection preserves source order
* knowledge projection preserves source order
* each task exposes only approved fields
* each knowledge entry exposes only approved fields
* `getProjectWorkflowSnapshot(projectId)` is invoked exactly once
* no call to `getProjectConsumerOverview(projectId)` occurs
* no independent workflow evaluation occurs
* inherited Project Brain errors propagate unchanged
* no storage write occurs
* `npm test` passes
* `npm run lint` passes subject only to previously accepted warnings
* `npm run build` passes

**Definition of Ready**
* milestone ID and name accepted
* Purpose and One Intention accepted
* API and return type names accepted
* supporting types accepted
* model boundary accepted
* field source rules accepted
* single-read and overview consistency rules accepted
* read-only and SSOT boundaries accepted
* implementation scope and Out of Scope accepted
* verification contract accepted
* Product Owner approval recorded
* approved contract synchronized into lifecycle SSOT
* separate Definition of Ready Review returns `PASS`
* no competing active milestone exists

**Definition of Done**
* approved type and operation exist
* operation performs one workflow snapshot read
* all fields derive from the same aggregate
* source order is preserved for both collections
* no additional domain read occurs
* no `getProjectConsumerOverview(projectId)` call occurs
* no UI, storage, write, or Workflow Engine changes exist
* focused and full tests pass
* lint and build pass
* implementation is reviewed and published
* lifecycle SSOT and closure evidence are synchronized
* Milestone Closure Review returns `PASS`

**Activation Boundary**
* contract approval and SSOT synchronization do not activate the milestone
* activation requires a separate Definition of Ready Review and explicit Product Owner authorization

**Product Owner Approval**
APPROVED

**Definition of Ready Review**
PASS

**Activation Status**
ACTIVATED

**Activation Decision**
AUTHORIZED

**Active Session**
NONE

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Runtime Status**
CLOSED

**Implementation Status**
IMPLEMENTED

**Implementation Review**
PASS

**Original Implementation Commit**
29802f3 - feat: add Project Brain consumer workspace model

**Single-Read Fix Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Single-Read Fix Commit**
d6913e5 - fix: remove duplicate Project Brain source reads

**Post-Fix Evidence Commit**
e75c773 - docs: synchronize MS-001.12 post-fix evidence

**Final Blocker Cleanup Commit**
0c356ef - docs: resolve MS-001.12 closure blockers

**Post-Fix Verification**
* focused tests: `PASS - 60 tests`
* full tests: `PASS - 64 tests`
* lint: `PASS - one previously accepted warning`
* build: `PASS`
* git diff --check: `PASS`

**Read Count Contract**
PASS - 1 project / 1 tasks / 1 knowledge / 1 workflow evaluation

**Milestone Closure Review**
PASS

**Closure Blockers**
NONE

**Previous Blockers**
ALL RESOLVED

**Product Owner Closure Decision**
APPROVED

**Next Safe Step**
Run Next Product Milestone Contract Discovery

---

## MS-001.13 - Project Workspace Consumer Overview

**Milestone**
MS-001.13 - Project Workspace Consumer Overview

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Connect the existing Project Workspace overview surface to the canonical Project Brain consumer workspace model.

**One Intention**
Render one read-only Project Overview section from one call to `getProjectConsumerWorkspace(projectId)`.

**Approved Overview Fields**
* project name
* task count
* knowledge entry count
* workflow health
* workflow confidence
* workflow next-step label
* warning count
* blocker count

**Implementation Scope**
* `src/app/projects/[id]/page.tsx`
* `src/components/workspace/WorkspaceHeader.tsx`

**Implementation Evidence**
* Product Owner Acceptance Review: `PASS`
* Implementation Review: `PASS`
* Technical Verification: `PASS`
* Tests: `PASS - 64 tests`
* Lint: `PASS - one previously accepted warning outside milestone scope`
* Build: `PASS`
* git diff --check: `PASS`
* Contract Deviations: `NONE`
* Publication Status: `PUBLISHED`
* Publication Commit: `78f28eb95b88d8ddecd66a09dc77c1962216e716`
* Remote Branch: `origin/main`

**Product Owner Approval**
PASS

**Definition of Ready Review**
PASS

**Activation Status**
ACTIVATED

**Activation Decision**
AUTHORIZED

**Active Session**
NONE

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
COMPLETED

**Implementation Review**
PASS

**Implementation Publication**
origin/main @ `78f28eb95b88d8ddecd66a09dc77c1962216e716`

**Milestone Closure Review**
PASS

**Closure Blockers**
NONE

**Product Owner Closure Decision**
APPROVED

**Next Safe Step**
Run Next Product Milestone Contract Discovery

---

## MS-001.14 - Project Workspace Consumer Collections

**Milestone**
MS-001.14 - Project Workspace Consumer Collections

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the canonical task and knowledge-entry collections already delivered by `ProjectConsumerWorkspace` inside the Project Workspace UI.

**One Intention**
Render one read-only Project Workspace collections section from the existing `ProjectConsumerWorkspace`, using only canonical `tasks` and `knowledgeEntries`.

**Approved Presentation Fields**
* Tasks visible field: `title`
* Tasks technical key: `id`
* Knowledge Entries visible field: `title`
* Knowledge Entries technical key: `id`

**Implementation Boundary**
* reuse the existing single `getProjectConsumerWorkspace(projectId)` result
* no second Project Brain consumer read
* no direct Task Engine read
* no direct Knowledge Engine read
* render exactly two read-only lists: `Tasks` and `Knowledge Entries`
* preserve canonical collection order
* provide minimal empty states
* keep legacy `WorkspacePanels` outside the new consumer-data boundary
* maximum expected production scope: route plus one workspace presentation component

**Out of Scope**
* create, edit, delete, complete, or reorder actions
* navigation to collection details
* task status, priority, dates, project, description, or other task fields
* knowledge-entry type, category, content, dates, project, or other knowledge-entry fields
* sorting, filtering, searching, grouping, or pagination
* new Project Brain APIs or model fields
* changes to Task Engine, Knowledge Engine, or Workflow Engine
* additional reads, cache, or persistence
* removal or redesign of legacy panels
* unrelated refactor

**Product Owner Approval**
PASS

**Definition of Ready Review**
PASS

**Activation Status**
ACTIVATED

**Activation Decision**
AUTHORIZED

**Active Session**
NONE

**Implementation Evidence**
* Product Owner Acceptance Review: `PASS`
* Implementation Review: `PASS`
* Technical Verification: `PASS`
* Contract Deviations: `NONE`
* Publication Status: `PUBLISHED`
* Publication Commit: `e8f8e6270316ea2199800aa8e8ee3c788315f2df`
* Milestone Closure Review: `PASS`
* Closure Status: `CLOSED`

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
COMPLETED

**Next Safe Step**
Run Next Product Milestone Contract Discovery

---

## MS-001.15 - Project Brain Engine Foundation

**Milestone**
MS-001.15 - Project Brain Engine Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish one official public Project Brain Engine read operation for the current Project Brain state without changing the existing storage, UI, or Project Brain success model.

**One Intention**
Expose `getCurrentProjectBrainState(projectId)` as the official public current-state read and route the existing consumer workflow path through it.

**Approved Technical Contract**
* Engine location remains `src/lib/project-brain/engine.ts`
* public operation: `getCurrentProjectBrainState(projectId)`
* success type: `ProjectBrainSnapshot`
* error model: existing `Error & { code }`
* allowed error codes:
  * `invalid-project-id`
  * `project-not-found`
  * `source-read-failed`
  * `invalid-snapshot`
* no separate `state-unavailable`
* empty `tasks` and empty `knowledgeEntries` remain valid states

**Proof of Integration**
* `getProjectConsumerWorkspace()`
* `getProjectWorkflowSnapshot()`
* `getCurrentProjectBrainState()`

**Implementation Scope**
* reuse existing `getProjectBrainSnapshot(projectId)` read and validation logic
* add one public current-state operation
* route the existing workflow snapshot path through the new public operation
* keep the consumer UI contract unchanged

**Out of Scope**
* UI changes
* storage changes
* new DTOs
* new `Result` type
* write operations
* cache
* external integrations
* unrelated refactor

**Implementation Evidence**
* implementation files:
  * `src/lib/project-brain/engine.ts`
  * `src/lib/project-brain/engine.test.ts`
* verification: `PASS - 67 / 67 tests`
* publication commit: `70e1be2`
* publication status: `PUBLISHED`
* milestone closure review: `PASS`
* closure status: `CLOSED`

**Process Note**
Formal lifecycle synchronization for `MS-001.15` was recorded after implementation publication, based on the published commit `70e1be2` and verified test evidence. No earlier activation timeline is reconstructed.

**Blockers**
NONE

**Milestone Status**
APPROVED / IMPLEMENTED / COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
IMPLEMENTED

**Next Safe Step**
Run Next Product Milestone Contract Discovery

---

## MS-001.16 - Project Brain Command Foundation

**Milestone**
MS-001.16 - Project Brain Command Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the first public Project Brain write command that creates one task through the existing Task Engine and returns the full current Project Brain snapshot.

**One Intention**
Expose `createProjectBrainTask(projectId, title)` as the first public Project Brain write operation.

**Public API**
* `createProjectBrainTask(projectId, title)`
* return type: `ProjectBrainSnapshot`

**Implementation Scope**
* normalize `projectId`
* normalize task title
* reject invalid input before write
* verify project existence before write
* delegate exactly one write to existing `createTask`
* map Task Engine exception or `null` to `source-write-failed`
* call `getCurrentProjectBrainState(projectId)` after successful write
* return the full current `ProjectBrainSnapshot`

**Out of Scope**
* UI
* form handling
* other Project Brain commands
* edit or delete flows
* command bus
* rollback
* transactions
* storage changes
* new DTOs or domain types
* Task Engine refactor
* ESLint configuration changes

**Implementation Evidence**
* implementation commit: `6671e69`
* production file: `src/lib/project-brain/engine.ts`
* test file: `src/lib/project-brain/engine.test.ts`
* targeted tests: `PASS`
* full tests: `PASS`
* TypeScript: `PASS`
* lint: `PASS - one previously accepted warning outside milestone scope`
* production build: `PASS`
* CodeRabbit review: `PASS WITH ACCEPTED RISK`

**Accepted Risk**
Lack of idempotency remains accepted when the write succeeds but the post-write read fails, because the milestone intentionally performs no rollback or transaction logic.

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Next Safe Step**
Run Next Product Milestone Contract Discovery

---

## MS-001.17 - Project Brain Command Reliability Foundation

**Milestone**
MS-001.17 - Project Brain Command Reliability Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Make `createProjectBrainTask` execution unambiguous and retry-safe while keeping Task Engine as the only task write owner.

**One Intention**
Add durable command identity and an explicit post-write result to the public Project Brain task command without introducing a command bus, rollback, or new storage subsystem.

**Achieved Result**
* public command object `CreateProjectBrainTaskCommand`
* explicit result union: `completed` / `completed-with-refresh-failure`
* durable `commandId` idempotency persisted in the same Task Engine task write
* safe retry without duplicate task creation
* explicit `command-identity-conflict` on reused `commandId` with different normalized input
* Task Engine remains the only task write owner
* legacy tasks without `commandId` remain compatible

**Implementation Evidence**
* production files:
  * `src/lib/project-brain/engine.ts`
  * `src/lib/task/task.ts`
* test files:
  * `src/lib/project-brain/engine.test.ts`
  * `src/lib/task/task.test.ts`
* UI call-site follow-up:
  * `src/app/projects/[id]/tasks/page.tsx`
* verification:
  * targeted tests: `PASS - 85 / 85`
  * full tests: `PASS - 88 / 88`
  * TypeScript: `PASS`
  * lint: `PASS - one previously existing warning outside milestone scope`
  * production build: `PASS`
  * `git diff --check`: `PASS`

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Next Safe Step**
Run Session Close Protocol

---

## CAP-004 - Architect-Codex Execution Boundary

**Capability**
CAP-004 - Architect-Codex Execution Boundary

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Enforce the execution boundary between architecture, implementation, repository publication, and risk-based quality review.

**One Intention**
Make Codex the explicit Implementation Engine and prevent Chief Architect from taking over production implementation.

**Implementation Evidence**
* implementation commit: `688df2b`
* changed files:
  * `AGENTS.md`
  * `docs/03_DEVELOPMENT_STANDARD.md`
  * `docs/06_BACKLOG.md`
  * `docs/10_PROJECT_LIFECYCLE.md`
  * `docs/AI_CONTEXT.md`
  * `docs/ai-workflow/ROLES.md`
* verification:
  * `npm test`: `PASS - 79 / 79`
  * `TypeScript`: `PASS`
  * `lint`: `PASS - one existing warning outside capability scope`
  * `build`: `PASS`
  * `git diff --check`: `PASS`

**Blockers**
NONE

**Capability Status**
COMPLETED / PUBLISHED / CLOSED

**Next Safe Step**
Run Session Close Protocol

---

## CAP-005 - React Component Test Infrastructure Foundation

**Capability**
CAP-005 - React Component Test Infrastructure Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the smallest React component test infrastructure needed to verify the reference Project Brain command consumer without changing production code.

**One Intention**
Enable focused Vitest component coverage for `src/app/projects/[id]/tasks/page.tsx` with the smallest approved infrastructure addition.

**Implementation Evidence**
* changed files:
  * `package.json`
  * `package-lock.json`
  * `vitest.config.ts`
  * `src/app/projects/[id]/tasks/page.test.tsx`
  * `docs/04_ROADMAP.md`
  * `docs/06_BACKLOG.md`
  * `docs/08_CURRENT_STATE.md`
  * `docs/09_CHANGELOG.md`
  * `docs/10_SESSION_STATE.md`
* achieved result:
  * Vitest remains the only test runner
  * `jsdom` is enabled per-file only
  * `@testing-library/react` enables component rendering
  * `vitest.config.ts` adds only the `@` to `src` alias
  * no global setup or global mocks were introduced
  * no production files were changed
  * one reference component test covers `src/app/projects/[id]/tasks/page.tsx`
  * four focused tests confirm the consumer contract
* verification:
  * focused component tests: `PASS - 4 / 4`
  * focused domain tests: `PASS - 85 / 85`
  * full tests: `PASS - 92 / 92`
  * `TypeScript`: `PASS`
  * `lint`: `PASS - one existing warning outside capability scope`
  * `build`: `PASS`
  * `git diff --check`: `PASS`
* operational note:
  * local Avast HTTPS interception required one-time `NODE_OPTIONS=--use-system-ca` only for dependency installation
  * the environment variable was removed immediately after the install command
  * `strict-ssl` and system security settings were not changed

**Blockers**
NONE

**Capability Status**
COMPLETED / PUBLISHED / CLOSED

**Next Safe Step**
Run Session Close Protocol or resume `MS-001.18` only through a separate authorized decision

---

## MS-001.18 - Project Brain Command Consumer Foundation

**Milestone**
MS-001.18 - Project Brain Command Consumer Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Formalize the minimal public consumer contract for `createProjectBrainTask` without introducing new consumer abstractions or changing the already working production flow.

**One Intention**
Resume and close the command consumer milestone using the approved architectural variant `A`: no extraction, single-consumer contract only.

**Implementation Evidence**
* resumed status:
  * `MS-001.18` resumed after `CAP-005` removed the focused component test blocker
* achieved result:
  * milestone completed with no production code changes
  * approved variant recorded as `no extraction, single-consumer contract only`
  * `src/app/projects/[id]/tasks/page.tsx` remains the single reference application consumer
  * the UI contract remains centered on the public `createProjectBrainTask` command, not direct Task Engine writes
  * one explicit Add click maps to one new consumer intent
  * each new intent receives a new `commandId`
  * `completed` and `completed-with-refresh-failure` both represent confirmed command success
  * partial success does not trigger a second write attempt
  * task-list refresh remains a separate read-only flow
* production changes:
  * none
* verification:
  * focused component tests: `PASS - 4 / 4`
  * full tests: `PASS - 92 / 92`
  * `TypeScript`: `PASS`
  * `lint`: `PASS - one existing warning outside milestone scope`
  * `build`: `PASS`
  * `git diff --check`: `PASS`

**Blockers**
NONE

**Milestone Status**
RESUMED / COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
VERIFIED / PUBLISHED / CLOSED

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision

---

## MS-001.19 - AI Workspace Project Brain Read Foundation

**Milestone**
MS-001.19 - AI Workspace Project Brain Read Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the first controlled read-only AI project context boundary sourced only from Project Brain without introducing UI, model integration, storage changes, or refactors.

**One Intention**
Publish the approved `Option B - Narrow AI projection` as the smallest safe public Project Brain read contract for one project AI context.

**Implementation Evidence**
* changed files:
  * `src/lib/project-brain/types.ts`
  * `src/lib/project-brain/engine.ts`
  * `src/lib/project-brain/engine.test.ts`
  * `docs/04_ROADMAP.md`
  * `docs/06_BACKLOG.md`
  * `docs/08_CURRENT_STATE.md`
  * `docs/09_CHANGELOG.md`
  * `docs/10_SESSION_STATE.md`
* achieved result:
  * milestone established the first controlled read-only AI project context boundary
  * approved architecture decision recorded as `Option B - Narrow AI projection`
  * public types `AiProjectContext` and `AiProjectContextResult` were added
  * public read-only function `getAiProjectContext(projectId)` was added
  * the boundary projects only `projectId`, `projectName`, `tasks: { id, title }`, and `knowledgeEntries: { id, title, content }`
  * the boundary does not expose `workflowState`, `createdAt`, child `projectId`, or storage internals
  * no UI was added
  * no model integration was added
  * no storage changes were made
* verification:
  * focused Project Brain tests: `PASS - 91 / 91`
  * full tests: `PASS - 102 / 102`
  * `TypeScript`: `PASS`
  * `lint`: `PASS - one existing warning outside milestone scope`
  * `build`: `PASS`
  * `git diff --check`: `PASS`

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision

---

## MS-001.20 - AI Workspace Read-Only UI Consumer Foundation

**Milestone**
MS-001.20 - AI Workspace Read-Only UI Consumer Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the first real application UI consumer of the published read-only AI project context without introducing model integration, network access, storage access, or write behavior.

**One Intention**
Publish one minimal project-scoped AI Workspace page that consumes `getAiProjectContext(projectId)` and renders explicit read-only result states.

**Implementation Evidence**
* changed files:
  * `src/app/projects/[id]/ai/page.tsx`
  * `src/app/projects/[id]/ai/page.test.tsx`
  * `src/app/projects/[id]/layout.tsx`
  * `docs/04_ROADMAP.md`
  * `docs/06_BACKLOG.md`
  * `docs/08_CURRENT_STATE.md`
  * `docs/09_CHANGELOG.md`
  * `docs/10_SESSION_STATE.md`
* achieved result:
  * milestone established the first real read-only AI Workspace UI consumer
  * route `/projects/[id]/ai` was added
  * the route is implemented as a Client Component
  * `projectId` comes from `useParams<{ id: string }>()`
  * the page consumes only `getAiProjectContext(projectId)`
  * the UI renders explicit inline states for `available`, empty tasks, empty knowledge, `project-not-found`, and `unavailable`
  * knowledge entry content is visible
  * one project-scoped `AI Workspace` link was added to the existing project sidebar
  * no model integration was added
  * no network access was added
  * no storage access was added in the consumer
  * no write behavior was added
* verification:
  * focused AI page tests: `PASS - 5 / 5`
  * focused Project Brain tests: `PASS - 91 / 91`
  * full tests: `PASS - 107 / 107`
  * `TypeScript`: `PASS`
  * `lint`: `PASS - one existing warning outside milestone scope`
  * `build`: `PASS`
  * `git diff --check`: `PASS`

**Blockers**
NONE

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision

---

## MS-001.21 - AI Model Boundary Foundation

**Milestone**
MS-001.21 - AI Model Boundary Foundation

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the first controlled application boundary between SPS OS and an AI model, using only the published read-only AI project context supplied through Project Brain.

**One Intention**
Introduce one minimal read-only application contract that obtains canonical project context through `getAiProjectContext(projectId)`, transforms that context into a controlled model request, invokes a model through an internal provider boundary, and returns one explicit textual result or controlled failure.

**Implementation Boundary**
* one AI application service or use-case boundary
* explicit input and result types
* one internal provider interface
* one deterministic test provider only
* no production provider integration
* no change to `getAiProjectContext(projectId)`
* no UI activation
* no network requirement
* no write behavior

**Out of Scope**
* production model API integration
* provider SDK installation
* API keys or secret configuration
* HTTP endpoints
* streaming responses
* chat UI
* conversation history
* persistence
* agents
* tool calling
* project mutations
* unrelated refactor

**Product Owner Approval**
APPROVED

**Definition of Ready Review**
PASS

**Activation Status**
AUTHORIZED

**Activation Decision**
AUTHORIZED

**Implementation Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Implementation Evidence**
* created:
  * `src/lib/ai-model/types.ts`
  * `src/lib/ai-model/engine.ts`
  * `src/lib/ai-model/engine.test.ts`
* application boundary accepts `projectId` and `instruction`
* context is read only through `getAiProjectContext(projectId)`
* provider is injected explicitly
* no global mutable state
* no storage bypass
* no network access
* no production provider
* no write behavior
* provider statuses and provider exceptions are mapped explicitly
* local fake provider exists only in tests

**Technical Verification**
* focused AI model tests: `PASS - 10 / 10`
* focused Project Brain tests: `PASS - 91 / 91`
* full tests: `PASS - 117 / 117`
* `TypeScript`: `PASS - npx tsc --noEmit`
* `lint`: `PASS - 0 errors, 1 existing warning outside milestone scope`
* production build: `PASS`

**Implementation Review**
PASS

**Contract Deviations**
NONE

**Publication Status**
PUBLISHED

**Publication Commit**
345b835

**Closure Status**
CLOSED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Publication Evidence**
* publication commit: `345b835`
* branch: `main`
* origin/main synchronization after publication: `0 / 0`
* working tree after publication: `CLEAN`
* published files:
  * `src/lib/ai-model/types.ts`
  * `src/lib/ai-model/engine.ts`
  * `src/lib/ai-model/engine.test.ts`
  * `docs/04_ROADMAP.md`
  * `docs/08_CURRENT_STATE.md`
  * `docs/09_CHANGELOG.md`
  * `docs/10_SESSION_STATE.md`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision

---

## MS-001.22 - AI Model Server Transport Boundary

**Milestone**
MS-001.22 - AI Model Server Transport Boundary

**Contract Status**
APPROVED

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the first controlled server-side transport surface for the existing AI model application boundary.

**One Intention**
Add one read-only server-side request/response path that accepts `projectId` and `instruction`, validates the transport request, delegates generation to the existing AI application boundary, and returns an explicit transport representation of `GenerateAiProjectResponseResult`.

**Server Surface**
* transport-only milestone
* exactly one Next.js Route Handler
* accepted route: `POST /api/projects/[id]/ai/generate`
* explicit SPS status remains in response JSON
* approved HTTP/result mapping applies at the transport boundary

**Runtime State**
* temporary server-side unavailable-provider composition is accepted
* valid runtime may return `{ status: "provider-unavailable" }`
* no real provider is included in this milestone

**Implementation Boundary**
* maximum two production files:
  * `src/app/api/projects/[id]/ai/generate/route.ts`
  * `src/lib/ai-model/server.ts`
* maximum one test file:
  * `src/lib/ai-model/server.test.ts`
* existing `createGenerateAiProjectResponse` must be reused
* no Project Brain bypass
* no direct storage access

**Out of Scope**
* real provider integration
* provider SDK installation
* secrets or env rollout
* network calls to external AI services
* UI changes
* chat behavior
* streaming
* agents
* tool calling
* write flows

**Product Owner Approval**
APPROVED

**Definition of Ready Review**
PASS

**Activation Status**
AUTHORIZED

**Activation Decision**
AUTHORIZED

**Implementation Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Implementation Review**
PASS

**Contract Deviations**
NONE

**Publication Status**
PUBLISHED

**Closure Status**
CLOSED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision

---

## MS-001.23 - AI Model Production Provider Foundation

**Milestone**
MS-001.23 - AI Model Production Provider Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the first real production provider behind the existing AI model boundary without expanding the published transport or UI scope.

**Product Outcome**
One real provider-backed generation flow is available through the existing `POST /api/projects/[id]/ai/generate` route and the existing AI application/provider boundaries.

**Problem Statement**
The published AI generation path currently terminates with controlled `provider-unavailable` because no production provider implementation exists behind the current `AiModelProvider.generate(request)` boundary.

**One Intention**
Add exactly one production provider implementation behind the existing provider interface so the current published route can complete one controlled text-generation request and return one controlled success or failure result.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`

**Provider Decision**
Product Owner accepted the following contract decisions:

* Provider: `OpenAI`
* Integration method: official `OpenAI Node SDK`
* API method: `client.responses.create(...)`
* Model: `gpt-5-nano`
* Generation mode: single non-streaming text generation
* Output mapping: `response.output_text`
* Server secret: `OPENAI_API_KEY`

**Product Owner Decision**
ACCEPT

**OpenAI Model Decision**
ACCEPT

No provider implementation, SDK installation, secret creation, or network call is authorized by this draft.

**Secrets Boundary**
This milestone may define only the minimum runtime secret boundary required for one approved provider integration.

Allowed contract scope:

* one server-side provider API key in `OPENAI_API_KEY` for local runtime verification
* one explicit missing-secret failure path

Out of scope for this milestone:

* committing any `.env` file
* storing any real secret in the repository
* preview/production secret rollout
* multi-environment secret management
* secret rotation
* secret vault integration

**In Scope**
* exactly one production implementation of the existing `AiModelProvider.generate(request)` contract
* exactly one controlled text-generation path
* minimal runtime configuration contract required for one provider
* preservation of the existing `POST /api/projects/[id]/ai/generate` transport boundary
* preservation of the existing `createGenerateAiProjectResponse` application boundary
* controlled mapping for provider success, unavailable configuration, and provider failure
* testable production composition

**Implementation Boundary**
* provider integration must remain behind the existing provider interface
* existing route contract and application contract must remain the only published entry path
* exactly one provider and exactly one integration method are allowed
* no bypass of `createGenerateAiProjectResponse`
* no bypass of `getAiProjectContext(projectId)`
* no expansion into model routing or provider fallback

**Out of Scope**
* AI Workspace UI changes
* new UI generate consumer
* streaming
* chat behavior
* conversation history
* agents
* tool calling
* write behavior
* project mutations
* persistence of generation results
* additional endpoints
* multiple providers
* automatic provider fallback
* model routing
* expanded cost management
* telemetry unrelated to acceptance of this boundary
* refactoring of the existing transport or application boundaries

**Product Owner Approval**
APPROVED

**Definition of Ready Review**
PASS

**Activation Status**
CLOSED

**Activation Decision**
AUTHORIZED

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / READY FOR PUBLICATION

**Published Implementation State**
* local implementation exists for:
  * OpenAI provider adapter
  * production provider wiring
* the local code remains valid publication evidence pending approved push to `origin/main`

**Completion Blocker**
NONE

**Required Prerequisite**
`MS-001.24 - Server-Readable Read-Only Project Context Foundation`

**Continuation Rule**
`MS-001.24` is completed and published, so `MS-001.23` may resume from the existing provider-backed foundation.

**Acceptance Criteria**
1. PASS - Exactly one production implementation exists for the current `AiModelProvider.generate(request)` contract.
2. PASS - The existing `createGenerateAiProjectResponse` application service delegates to that provider implementation without bypassing the established application boundary.
3. PASS - The existing `POST /api/projects/[id]/ai/generate` route executed one controlled provider-backed request through the existing transport and application boundaries.
4. PASS - A valid request returned one controlled generated-text result through the existing route.
5. PASS - Missing or invalid `OPENAI_API_KEY` configuration remained a controlled failure path rather than an uncontrolled exception.
6. PASS - Provider failure remains mapped to a controlled application result and does not leak as an uncaught exception.
7. PASS - No UI, streaming, agents, tool calling, additional endpoints, or write flow were added.
8. PASS - The closed boundaries of `MS-001.21` and `MS-001.22` remain preserved.

**Verification Strategy**
Do not execute verification at draft stage.

Required milestone verification should remain minimal and boundary-focused:

* unit tests for the provider adapter
* application-boundary test proving controlled delegation and failure mapping
* transport-boundary test proving the existing route uses the provider-backed production composition
* one controlled integration test that requires an approved runtime secret
* one explicit verification of behavior when the secret is missing

Full build, broad regression expansion, and unrelated milestone verification are not required unless the implementation changes force them.

**Completion Boundary**
This milestone may be considered complete only when:

* one real provider-backed flow works through the existing route
* success and failure paths are controlled
* scope remains limited to the provider/runtime boundary
* no UI or broader AI feature scope is introduced
* SSOT documents the real post-implementation state
* required verification and publication pass under SPS OS rules

Completion Boundary: PASS

**Implementation Evidence**
* OpenAI provider adapter works through the existing `AiModelProvider.generate(...)` boundary.
* The existing `POST /api/projects/[id]/ai/generate` route returned HTTP `200`.
* SPS response status: `generated`.
* Generated text returned: `YES`.
* Exactly one provider attempt was used.
* `maxRetries: 0`.
* Retry count: `0`.
* Data writes: `0`.
* No UI, routing, streaming, agents, tool calling, or write flow changes were introduced.
* Canonical Project Brain context was used through the existing boundaries.
* Earlier failures were caused by malformed local `OPENAI_API_KEY` configuration, not SPS architecture.

**Blockers**
NONE

**Next Safe Step**
Prepare publication of the two local commits and SSOT documentation, then request explicit Product Owner approval before push. Do not assign the next product milestone until a separate Product Owner decision.

---

## MS-001.24 - Server-Readable Read-Only Project Context Foundation

**Milestone**
MS-001.24 - Server-Readable Read-Only Project Context Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish one canonical read-only project context that can be reached through Project Brain from both browser runtime and server runtime without expanding into broader persistence redesign.

**Product Outcome**
One canonical, read-only project context is available to both the browser AI Workspace consumer and the server-side AI application boundary through Project Brain without bypassing Project Brain.

**Problem Statement**
Current project data is stored only in browser localStorage. The server-side AI route cannot read the project and terminates with `project-not-found` before reaching the provider boundary.

**Dependencies**
* active contract correction from `MS-001.23 - AI Model Production Provider Foundation`
* preservation of the closed boundaries of `MS-001.19 - AI Workspace Project Brain Read Foundation`
* preservation of the closed boundaries of `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* preservation of the closed boundaries of `MS-001.21 - AI Model Boundary Foundation`
* preservation of the closed boundaries of `MS-001.22 - AI Model Server Transport Boundary`

**Product Owner Decision**
GO

**Product Owner Approval**
APPROVED

**Definition of Ready Review**
PASS

**Activation Status**
AUTHORIZED

**Activation Decision**
AUTHORIZED

**Implementation Status**
IMPLEMENTED / VERIFIED / PUBLISHED

**Architecture Decision Required before implementation**
Canonical server-readable project source

**Architecture Decision**
`ADR-0005 - Canonical Serverless Project Repository for Project Identity`

**Selected Mechanism**
`managed serverless PostgreSQL`

**Selected Provider**
`Neon`

**Selected Product**
`Neon Serverless Postgres`

**Preferred Region**
`AWS Europe Central 1 (Frankfurt)`

**Runtime Connection**
`pooled`

**Migration Connection**
`direct`

**Required Environment Variable Names**
* `DATABASE_URL`
* `DATABASE_URL_DIRECT`

**Provider Selection Completed**
YES

**Infrastructure Configured**
YES - minimal Neon infrastructure only

**Default Neon Branch**
`production`

**Initial Neon Database**
`present`

**Initial Neon Role**
`present`

**Pooled Connection Available**
YES

**Direct Connection Available**
YES

**Application Secret Configuration**
COMPLETED LOCALLY

**Schema Status**
MINIMAL CANONICAL PROJECT / TASK / KNOWLEDGE READ SUPPORT PUBLISHED

**Projects Table**
CREATED

**Application Connectivity Verification**
PASS

**In Scope**
* exactly one canonical read-only project-context boundary that is reachable in browser runtime and server runtime
* preservation of Project Brain as the only read boundary for AI project context
* enabling `getAiProjectContext(projectId)` to read a valid project in server runtime
* preservation of the existing browser AI Workspace consumer
* controlled `project-not-found` for a non-existent project
* minimal tests for browser/server read-boundary behavior
* confirmation that the AI route without `OPENAI_API_KEY` reaches `provider-unavailable` rather than `project-not-found`
* minimal server-first create boundary for `Tasks` and `KnowledgeEntries` only when required to feed the canonical read-only project context
* minimal server-readable read contracts and schema for `Tasks` and `KnowledgeEntries` only when required to feed the canonical read-only project context
* server-side generation or persistence of IDs and timestamps only for the minimal `Tasks` and `KnowledgeEntries` create boundary

**Out of Scope**
* OpenAI integration changes
* adapter changes
* another live OpenAI request
* full write flow beyond the minimal server-first create boundary required to feed the canonical read-only project context
* server-side project editing
* offline synchronization
* full application migration away from `localStorage`
* multi-user behavior
* authentication
* authorization
* full backend persistence redesign
* Supabase or any other concrete backend not required by later discovery
* UI redesign
* chat behavior
* streaming
* agents
* tool calling
* additional endpoints not directly required for read-only project context
* update operations
* delete operations
* bulk operations
* full CRUD
* retry queue
* conflict resolution

**Acceptance Criteria**
1. Exactly one canonical source of read-only project context exists and is used by Project Brain.
2. The browser AI Workspace can still read an existing project.
3. Server runtime can read the same canonical project through the existing boundary.
4. `getAiProjectContext(projectId)` does not bypass Project Brain.
5. An existing project in server runtime does not return `project-not-found`.
6. A non-existent project still returns controlled `project-not-found`.
7. Without `OPENAI_API_KEY`, the existing AI route reaches the provider boundary and returns:
   * HTTP `503`
   * `provider-unavailable`
8. No write flow beyond the minimal server-first create boundary required to feed the canonical read-only project context, and no auth, multi-user behavior, or full persistence redesign is added.
9. After this milestone is completed, `MS-001.23` may resume exactly one live OpenAI request.

**Completion Boundary**
This milestone may be considered complete only when:

* browser runtime and server runtime read the same canonical read-only project context
* Project Brain remains the mandatory boundary
* local preflight without secret for an existing project terminates with `provider-unavailable`
* SSOT documents the real architecture
* required tests and publication pass under SPS OS rules

**Blockers**
NONE

**Next Safe Step**
Keep `MS-001.24` closed and resume `MS-001.23` through the existing provider boundary.

**Implementation Evidence**
* canonical Project server reader delivered
* canonical Tasks reader delivered
* canonical KnowledgeEntries reader delivered
* server Project Brain context delivered
* browser Project Brain context delivered
* server AI integration delivered
* browser AI Workspace integration delivered
* minimal server-first write boundaries required to feed canonical read context delivered
* browser runtime and server runtime now use the same canonical read-only Project Brain context through shared `composeProjectBrainSnapshot(...)` and `aiProjectContextFromSnapshot(...)`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

---

## MS-001.25 - AI Workspace Generation UI Foundation

**Milestone**
MS-001.25 - AI Workspace Generation UI Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add the first controlled AI generation flow to the existing AI Workspace without changing Project Brain, the AI engine, or the canonical server-side context boundary.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` preserves the canonical read-only project context, accepts one instruction, sends exactly `{ instruction }` to `POST /api/projects/[id]/ai/generate`, blocks empty and whitespace-only input locally, blocks duplicate submit while a request is active, renders one text result, and renders controlled errors without persistence, chat, streaming, retry, Markdown, agents, or Project Brain writes.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`

**Product Owner Decision**
GO

**Chief Architect Closure Decision**
FORMALLY ACCEPTED

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED

**Implementation Evidence**
* AI Workspace generate UI published in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace component coverage published in `src/app/projects/[id]/ai/page.test.tsx`
* browser request body remains exactly `{ instruction }`
* browser request body does not include `projectId` or project context
* generated result remains ephemeral UI state only
* final repository verification passed with full tests `21 / 258`, TypeScript `PASS`, lint `PASS`, build `PASS`, and `git diff --check` `PASS`
* final milestone and DoD unblock commits: `19da642`, `002f95f`, `4c08b7c`, `398470a`, `7fbc023`, `f4672ec`, `f63e285`, `db0c1a3`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone. Repository commits remain local until push is explicitly approved.

---

## MS-001.26 - AI Workspace Controlled Knowledge Save

**Milestone**
MS-001.26 - AI Workspace Controlled Knowledge Save

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one explicit and controlled AI Workspace action that saves the current generated result as a new Knowledge entry through the existing canonical write boundary.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` preserves the existing generation flow, shows Knowledge save controls only after a successful generation, requires a non-empty explicit title, sends exactly `{ title, content }` to `POST /api/projects/[id]/knowledge`, blocks duplicate save while a request is active, prevents re-saving the same generated result after success, preserves the generated result on save error with conscious retry, resets save state on a new generation, and protects against stale save completion after a new generation or project change without auto-save, canonical refresh, new browser write boundary, chat, streaming, retry UI, agents, or storage changes.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`

**Product Owner Decision**
GO

**Chief Architect Closure Decision**
FORMALLY ACCEPTED

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED

**Implementation Evidence**
* AI Workspace save UI published in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace save-flow component coverage published in `src/app/projects/[id]/ai/page.test.tsx`
* browser save request uses exactly `POST /api/projects/[id]/knowledge`
* browser save request body remains exactly `{ title, content }`
* browser save request does not include `projectId` or project context
* duplicate save and stale save protections are implemented in local UI state only
* existing Knowledge boundary, Project Brain boundary, and storage boundary remain unchanged
* final repository verification passed with full tests `21 / 267`, TypeScript `PASS`, lint `PASS`, build `PASS`, and `git diff --check` `PASS`
* implementation commit: `ff7dc59`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone. Repository commits remain local until push is explicitly approved.

---

## MS-001.27 - AI Workspace Controlled Prompt Foundation

**Milestone**
MS-001.27 - AI Workspace Controlled Prompt Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add the first controlled prompt-selection capability to the existing AI Workspace without changing the AI generation endpoint, Project Brain, Knowledge boundaries, AI provider integration, or persistence model.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` provides a small static catalog of approved starter prompts. Selecting one prompt fills the existing instruction field, manual editing remains allowed, manual generation remains required, and the browser request body remains exactly `{ instruction }`.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED

**Implementation Evidence**
* AI Workspace starter-prompt UI published in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace prompt-selection component coverage published in `src/app/projects/[id]/ai/page.test.tsx`
* a static local catalog of 5 approved starter prompts was added
* selecting a prompt fills the existing instruction field and replaces the previous instruction deterministically
* manual instruction editing remains allowed and clears the selected prompt UI state
* prompt selection does not trigger automatic generation
* browser generation request body remains exactly `{ instruction }`
* existing AI endpoint, provider composition, Project Brain boundary, Knowledge boundary, and persistence model remain unchanged
* final repository verification passed with full tests `21 / 269`, TypeScript `PASS`, lint `PASS`, build `PASS`, and `git diff --check` `PASS`
* implementation commit: `1e5158f`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone. Repository commits remain local until push is explicitly approved.

---

## MS-001.28 - AI Workspace Controlled Knowledge Refresh

**Milestone**
MS-001.28 - AI Workspace Controlled Knowledge Refresh

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Refresh the visible AI Workspace Knowledge context after a confirmed successful Knowledge save without changing the existing AI or persistence boundaries.

**Product Outcome**
After a successful save to `POST /api/projects/[id]/knowledge`, the AI Workspace performs exactly one read-only refresh of the existing canonical project context, updates the visible Knowledge list from the reader result, preserves the generated result and save success state, and keeps refresh failure separate from save failure.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`
* closed `MS-001.27 - AI Workspace Controlled Prompt Foundation`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED

**Implementation Evidence**
* AI Workspace Knowledge refresh behavior is published in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace refresh-flow component coverage is published in `src/app/projects/[id]/ai/page.test.tsx`
* after successful Knowledge save, exactly one existing canonical context reader refresh is executed
* after successful refresh, the Knowledge list shows the state returned by the reader
* generated result remains visible after refresh
* save success remains preserved after refresh
* refresh failure uses a separate user-visible message and does not become save failure
* save failure does not trigger refresh
* stale refresh from a previous project cannot overwrite the current project state
* no optimistic update was introduced
* request contracts remain exactly `{ instruction }` for generate and `{ title, content }` for save
* existing endpoints, Project Brain, Knowledge model, provider composition, and persistence remain unchanged
* final repository verification passed with full tests `21 / 272`, TypeScript `PASS`, lint `PASS`, build `PASS`, and `git diff --check` `PASS`
* implementation commit: `0d56046`

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone. Repository commits remain local until push is explicitly approved.

---

## MS-001.29 - AI Workspace Controlled Conversation Foundation

**Milestone**
MS-001.29 - AI Workspace Controlled Conversation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one minimal local non-persistent conversation flow inside the AI Workspace so the user can complete more than one exchange in a single UI view without changing the existing AI or persistence boundaries.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` keeps a local in-memory list of user instruction and AI response exchanges, appends one new exchange after each successful `Generate`, and keeps the existing Save to Knowledge flow bound only to the latest generated result.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`
* closed `MS-001.27 - AI Workspace Controlled Prompt Foundation`
* closed `MS-001.28 - AI Workspace Controlled Knowledge Refresh`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* AI Workspace local conversation behavior is implemented in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace conversation coverage is implemented in `src/app/projects/[id]/ai/page.test.tsx`
* each successful `Generate` appends one local exchange with the submitted instruction and the returned response
* existing starter prompts remain unchanged
* existing Knowledge refresh behavior remains unchanged
* browser generate request body remains exactly `{ instruction }`
* browser save request body remains exactly `{ title, content }`
* Save to Knowledge remains bound only to the latest generated result
* no persistence, new endpoint, streaming, agents, Markdown rendering, retry UI, or Project Brain change was introduced
* targeted component verification passed with `27 / 27` tests in `src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit` passed
* full tests, lint, and build were not run in this implementation handoff

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.57 - AI Workspace Engine Save Success State Derivation Foundation

**Milestone**
MS-001.57 - AI Workspace Engine Save Success State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the existing deterministic `saved` `SaveUiState` construction from the success branch of `handleSaveToKnowledge` into the AI Workspace Engine.

**Dependencies**
* closed `MS-001.56 - AI Workspace Engine Save Saving State Derivation Foundation`

**Allowed Future Implementation Files**
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`
* `src/app/projects/[id]/ai/page.test.tsx` only if existing tests do not confirm behavior after delegation

**Out of Scope**
* save-error derivation
* refresh-warning derivation
* save flow changes
* UX, text, and layout
* backend, API, and provider wiring
* Project Brain
* full save-flow refactoring

**Product Owner Decision**
ACCEPT

**Activation Status**
CLOSED

**Implementation Status**
COMPLETED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Acceptance Criteria**
* the engine exposes one helper that constructs the existing `saved` `SaveUiState`
* the page delegates only the success-state construction to that helper
* state shape and save-success behavior remain unchanged
* the post-save refresh path remains unchanged
* scope does not include error states or refresh-warning states

**Verification Contract**
* focused engine test
* focused AI page test
* `npx.cmd tsc --noEmit`
* `git diff --check`

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.56 - AI Workspace Engine Save Saving State Derivation Foundation

**Milestone**
MS-001.56 - AI Workspace Engine Save Saving State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the deterministic `saving` `SaveUiState` construction from the AI Workspace page component into the AI Workspace engine without changing UX, save flow, API behavior, provider wiring, or Project Brain boundaries.

**Product Outcome**
The AI Workspace engine now owns the deterministic `saving` `SaveUiState` derivation through `deriveSaveSavingState`, while `handleSaveToKnowledge` delegates the matching save-start construction with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.55 - AI Workspace Engine Generation Success State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`bfb889b`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveSaveSavingState(projectId, latestExchange, title)`
* the helper returns the existing `saving` `SaveUiState` with identical field values and no side effects
* `src/app/projects/[id]/ai/page.tsx` now delegates only the matching inline `saving` construction to the engine helper
* save success derivation, save error derivation, validation error derivation, refresh-warning derivation, reset and active-save derivations, Copy Result, backend/API, provider wiring, Project Brain, and full save-flow refactoring remained out of scope
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `34 / 34` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.55 - AI Workspace Engine Generation Success State Derivation Foundation

**Milestone**
MS-001.55 - AI Workspace Engine Generation Success State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the remaining generation-success UI-state derivation from the AI Workspace page component into the AI Workspace engine without changing UX, copy, layout, API/fetch/provider behavior, Project Brain behavior, Knowledge save behavior, reset behavior, or instruction behavior.

**Product Outcome**
The AI Workspace engine now owns generation-success state derivation, while `handleGenerate` delegates the approved success-state `GenerationUiState` construction to the engine with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.54 - AI Workspace Engine Generation Error State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveGenerationSuccessState(projectId, currentState, exchange, latestExchangeId)`
* the helper always returns `state: "generated"` and applies the provided `projectId`, `exchange`, and `latestExchangeId`
* previous exchanges are preserved only when the current generation state belongs to the same `projectId`
* generation-success state starts a new history with only the new exchange for a different `projectId`
* `errorMessage` is reset to `null`
* `src/app/projects/[id]/ai/page.tsx` now delegates the success-state generation construction to the engine helper
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for matched and fallback generation-success-state derivation
* no UX, copy, layout, API/fetch/provider, Project Brain, Knowledge save, reset, or instruction behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `33 / 33` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.54 - AI Workspace Engine Generation Error State Derivation Foundation

**Milestone**
MS-001.54 - AI Workspace Engine Generation Error State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the repeated generation-error UI-state derivation from the AI Workspace page component into the AI Workspace engine without changing UX, copy, layout, API/fetch/provider behavior, Project Brain behavior, Knowledge save behavior, generation success behavior, reset behavior, or instruction behavior.

**Product Outcome**
The AI Workspace engine now owns generation-error state derivation, while `handleGenerate` delegates the three approved error-state `GenerationUiState` constructions to the engine with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.53 - AI Workspace Engine Generation Start State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveGenerationErrorState(projectId, currentState, errorMessage)`
* the helper always returns `state: "error"` and applies the provided `errorMessage`
* exchanges and `latestExchangeId` are preserved only when the current generation state belongs to the same `projectId`
* generation-error state resets to empty exchanges and `null` latest exchange id for a different `projectId`
* `src/app/projects/[id]/ai/page.tsx` now delegates the empty-instruction, endpoint-error, and transport-exception error states to the engine helper
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for matched and fallback generation-error-state derivation
* no UX, copy, layout, API/fetch/provider, Project Brain, Knowledge save, generation success, reset, or instruction behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `31 / 31` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.53 - AI Workspace Engine Generation Start State Derivation Foundation

**Milestone**
MS-001.53 - AI Workspace Engine Generation Start State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the pure generation-start UI-state derivation from the AI Workspace page component into the AI Workspace engine without changing UX, copy, layout, API/fetch/provider behavior, Project Brain behavior, Knowledge save behavior, reset behavior, starter prompt behavior, or manual instruction behavior.

**Product Outcome**
The AI Workspace engine now owns generation-start state derivation, while `handleGenerate` delegates the `"generating"` `GenerationUiState` construction to the engine with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.52 - AI Workspace Engine Reset State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports a helper that derives the `"generating"` `GenerationUiState`
* `src/app/projects/[id]/ai/page.tsx` now delegates generation-start state construction to the engine helper
* existing exchanges and `latestExchangeId` are preserved only when the current generation state belongs to the same `projectId`
* generation-start state still resets to empty exchanges and `null` latest exchange id for a different `projectId`
* no UX, copy, layout, API/fetch/provider, Project Brain, Knowledge save, reset, starter prompt, or manual instruction behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `29 / 29` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.52 - AI Workspace Engine Reset State Derivation Foundation

**Milestone**
MS-001.52 - AI Workspace Engine Reset State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the pure reset-state derivation for AI Workspace conversation reset from the page component into the AI Workspace Engine without changing UX, copy, layout, API/fetch/provider behavior, Project Brain behavior, Knowledge save behavior, starter prompt behavior, or manual instruction behavior.

**Product Outcome**
The AI Workspace engine now owns reset-state derivation for `GenerationUiState` and `SaveUiState`, while the existing AI Workspace page reset handler delegates those state objects to engine helpers with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.51 - AI Workspace Engine Manual Instruction Change Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports reset-state helpers for `GenerationUiState` and `SaveUiState`
* `src/app/projects/[id]/ai/page.tsx` now delegates reset-state object construction to the engine helpers while preserving `nextExchangeIdRef.current = 1`
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for the reset generation-state and reset save-state helpers
* no UX, copy, layout, API/fetch/provider, Project Brain, Knowledge save, starter prompt, or manual instruction behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.51 - AI Workspace Engine Manual Instruction Change Derivation Foundation

**Milestone**
MS-001.51 - AI Workspace Engine Manual Instruction Change Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the pure manual instruction change derivation into the AI Workspace Engine without changing prompt content, UX, generation behavior, save behavior, or broader page logic.

**Product Outcome**
The repository now contains one minimal AI Workspace Engine helper that owns the derivation of `InstructionUiState` from the current project id and manual instruction text input, while the existing AI Workspace page reuses that helper with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.50 - AI Workspace Engine Starter Prompt Selection Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveManualInstructionChangeState(projectId, value)`
* the helper derives `InstructionUiState.value` from manual instruction input and preserves `InstructionUiState.selectedPromptId` as `null`
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for the new pure derivation helper
* `src/app/projects/[id]/ai/page.tsx` now uses the engine helper for the manual instruction edit path
* no prompt text, generate, save, reset, copy, context-loading, or layout behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `25 / 25` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed with line-ending warnings only

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.30 - AI Workspace Controlled Conversation Context Foundation

**Milestone**
MS-001.30 - AI Workspace Controlled Conversation Context Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one minimal local non-persistent conversation-context layer inside the AI Workspace so second and later Generate actions reuse previous exchanges from the current UI session without changing the existing AI or persistence boundaries.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` sends the first `Generate` with no conversation history, sends second and later `Generate` actions with one controlled local context built from prior successful exchanges in the current UI session, keeps that context local and non-persistent, and keeps Save to Knowledge bound only to the latest generated result.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`
* closed `MS-001.27 - AI Workspace Controlled Prompt Foundation`
* closed `MS-001.28 - AI Workspace Controlled Knowledge Refresh`
* closed `MS-001.29 - AI Workspace Controlled Conversation Foundation`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* AI Workspace controlled conversation-context behavior is implemented in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace conversation-context coverage is implemented in `src/app/projects/[id]/ai/page.test.tsx`
* first `Generate` sends no conversation history
* second and later `Generate` actions include one controlled local context derived from prior successful exchanges in the same UI session
* conversation context remains local and non-persistent
* browser generate request body remains exactly `{ instruction }`
* browser save request body remains exactly `{ title, content }`
* Save to Knowledge remains bound only to the latest generated result
* existing starter prompts remain unchanged
* existing Knowledge refresh behavior remains unchanged
* no persistence, new endpoint, streaming, agents, tool calling, or Project Brain change was introduced
* targeted component verification passed with `29 / 29` tests in `src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.31 - AI Workspace Conversation Reset Control Foundation

**Milestone**
MS-001.31 - AI Workspace Conversation Reset Control Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one minimal explicit reset control inside the AI Workspace so the user can consciously clear the current local conversation state without changing the existing AI or persistence boundaries.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` provides one reset control that clears the current local non-persistent conversation state, makes the next `Generate` behave like a first request with no prior history, and keeps later `Generate` actions using only the new post-reset local context.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`
* closed `MS-001.27 - AI Workspace Controlled Prompt Foundation`
* closed `MS-001.28 - AI Workspace Controlled Knowledge Refresh`
* closed `MS-001.29 - AI Workspace Controlled Conversation Foundation`
* closed `MS-001.30 - AI Workspace Controlled Conversation Context Foundation`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* AI Workspace conversation reset control is implemented in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace reset-flow coverage is implemented in `src/app/projects/[id]/ai/page.test.tsx`
* one explicit reset control clears the current local conversation state
* after reset, the next `Generate` sends no prior conversation history
* after reset and one new successful exchange, later `Generate` actions use only the new post-reset local context
* browser generate request body remains exactly `{ instruction }`
* browser save request body remains exactly `{ title, content }`
* Save to Knowledge remains bound only to the latest generated result
* existing starter prompts and Knowledge refresh behavior remain unchanged
* no persistence, new endpoint, streaming, agents, tool calling, Markdown rendering, retry UI, or Project Brain change was introduced
* targeted component verification passed with `30 / 30` tests in `src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.32 - AI Workspace Conversation Context Budget Foundation

**Milestone**
MS-001.32 - AI Workspace Conversation Context Budget Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one minimal fixed local conversation-context budget inside the AI Workspace so later `Generate` actions do not send an unbounded local session history.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` sends the first `Generate` with no conversation history, sends later `Generate` actions with only the last 3 successful local exchanges from the current UI session, keeps reset behavior from `MS-001.31`, and keeps Save to Knowledge bound only to the latest generated result.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`
* closed `MS-001.27 - AI Workspace Controlled Prompt Foundation`
* closed `MS-001.28 - AI Workspace Controlled Knowledge Refresh`
* closed `MS-001.29 - AI Workspace Controlled Conversation Foundation`
* closed `MS-001.30 - AI Workspace Controlled Conversation Context Foundation`
* closed `MS-001.31 - AI Workspace Conversation Reset Control Foundation`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* AI Workspace fixed conversation-context budget behavior is implemented in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace context-budget coverage is implemented in `src/app/projects/[id]/ai/page.test.tsx`
* first `Generate` sends no conversation history
* later `Generate` actions include only the last 3 successful local exchanges from the current UI session
* older exchanges beyond that budget do not enter the next `instruction`
* reset still clears the local conversation state
* browser generate request body remains exactly `{ instruction }`
* browser save request body remains exactly `{ title, content }`
* Save to Knowledge remains bound only to the latest generated result
* no persistence, new endpoint, streaming, agents, tool calling, Markdown rendering, retry UI, or Project Brain change was introduced
* targeted component verification passed with `31 / 31` tests in `src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.33 - AI Workspace Conversation Context Visibility Foundation

**Milestone**
MS-001.33 - AI Workspace Conversation Context Visibility Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one minimal visibility layer inside the AI Workspace so the user can see whether the next `Generate` will use local conversation context without exposing full local conversation content.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` shows a simple status for the next `Generate`, starts with no local conversation context, reports use of the last `X` exchanges within the existing budget from `MS-001.32`, returns to no context after reset, and keeps Save to Knowledge bound only to the latest generated result.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`
* closed `MS-001.27 - AI Workspace Controlled Prompt Foundation`
* closed `MS-001.28 - AI Workspace Controlled Knowledge Refresh`
* closed `MS-001.29 - AI Workspace Controlled Conversation Foundation`
* closed `MS-001.30 - AI Workspace Controlled Conversation Context Foundation`
* closed `MS-001.31 - AI Workspace Conversation Reset Control Foundation`
* closed `MS-001.32 - AI Workspace Conversation Context Budget Foundation`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* AI Workspace context-visibility status is implemented in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace context-visibility coverage is implemented in `src/app/projects/[id]/ai/page.test.tsx`
* initial state shows no local conversation context for the next `Generate`
* after successful generations, the status shows use of the last `X` local exchanges within the current fixed budget
* after reset, the status returns to no local conversation context
* full conversation content is not exposed through the new status
* browser generate request body remains exactly `{ instruction }`
* browser save request body remains exactly `{ title, content }`
* Save to Knowledge remains bound only to the latest generated result
* no persistence, new endpoint, streaming, agents, tool calling, Markdown rendering, retry UI, or Project Brain change was introduced
* targeted component verification passed with `32 / 32` tests in `src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Keep `Current Product Milestone` at `NONE` until a separate Product Owner decision defines the next milestone.

---

## MS-001.34 - AI Workspace Conversation Copy Foundation

**Milestone**
MS-001.34 - AI Workspace Conversation Copy Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one minimal explicit copy control for generated AI Workspace results without changing the existing generation, Knowledge save, Project Brain, or persistence boundaries.

**Product Outcome**
The AI Workspace at `/projects/[id]/ai` shows one visible `Copy` control for generated result text and copies the exact response text through the browser clipboard API without mutating conversation state, save state, Project Brain state, Knowledge state, or local persistence.

**Dependencies**
* closed `MS-001.19 - AI Workspace Project Brain Read Foundation`
* closed `MS-001.20 - AI Workspace Read-Only UI Consumer Foundation`
* closed `MS-001.21 - AI Model Boundary Foundation`
* closed `MS-001.22 - AI Model Server Transport Boundary`
* closed `MS-001.23 - AI Model Production Provider Foundation`
* closed `MS-001.24 - Server-Readable Read-Only Project Context Foundation`
* closed `MS-001.25 - AI Workspace Generation UI Foundation`
* closed `MS-001.26 - AI Workspace Controlled Knowledge Save`
* closed `MS-001.27 - AI Workspace Controlled Prompt Foundation`
* closed `MS-001.28 - AI Workspace Controlled Knowledge Refresh`
* closed `MS-001.29 - AI Workspace Controlled Conversation Foundation`
* closed `MS-001.30 - AI Workspace Controlled Conversation Context Foundation`
* closed `MS-001.31 - AI Workspace Conversation Reset Control Foundation`
* closed `MS-001.32 - AI Workspace Conversation Context Budget Foundation`
* closed `MS-001.33 - AI Workspace Conversation Context Visibility Foundation`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* AI Workspace result copy control is implemented in `src/app/projects/[id]/ai/page.tsx`
* AI Workspace copy-flow coverage is implemented in `src/app/projects/[id]/ai/page.test.tsx`
* one visible `Copy` control exists for generated AI response text
* clicking `Copy` calls `navigator.clipboard.writeText` with the exact generated response text
* generate, reset conversation, and save to Knowledge behavior remain unchanged
* copy does not mutate conversation state, save state, Project Brain state, Knowledge state, or persistence state
* focused component verification passed with `32 / 32` tests in `src/app/projects/[id]/ai/page.test.tsx`
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed
* implementation commit: `8991a45`

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.35 - AI Workspace Engine Contract Foundation

**Milestone**
MS-001.35 - AI Workspace Engine Contract Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add one minimal architecture and documentation contract for AI Workspace Engine readiness without changing UI runtime, backend behavior, provider wiring, or Project Brain ownership boundaries.

**Product Outcome**
The repository contains one explicit AI Workspace Engine contract that defines AI Workspace Engine as a consumer and coordinator over Project Brain, separates local workspace conversation state from canonical project knowledge, and defines the minimal operation boundaries for load, generate, reset, copy, and explicit save.

**Dependencies**
* closed `MS-001.34 - AI Workspace Conversation Copy Foundation`

**Product Owner Decision**
GO

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* AI Workspace Engine readiness contract is published in `docs/ai-workflow/AI_WORKSPACE_ENGINE_CONTRACT.md`
* the contract preserves Project Brain as the Single Source of Truth
* the contract defines local AI Workspace conversation state as non-canonical
* the contract defines explicit save as the only path from generated text to canonical Knowledge
* the contract defines local copy as non-persistent and non-mutating
* documentation consistency review was completed against `docs/00_SPS_DEVELOPMENT_METHOD.md`, `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`, `docs/ai-workflow/ROLES.md`, and `docs/ai-workflow/COMMAND_CENTER.md`
* `git diff --check` passed
* implementation commit: `2cda65b`

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.36 - AI Workspace Engine Runtime Foundation

**Milestone**
MS-001.36 - AI Workspace Engine Runtime Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Create one minimal AI Workspace Engine runtime layer by extracting the pure local AI Workspace conversation logic from the page into a controlled engine module without changing UX, persistence, provider wiring, or Project Brain ownership boundaries.

**Product Outcome**
The repository contains one small AI Workspace Engine runtime module that owns the local conversation exchange type, fixed context budget of `3` exchanges, conversation context status message, and bounded generation instruction builder, while the existing AI Workspace page reuses that module with unchanged behavior.

**Dependencies**
* closed `MS-001.35 - AI Workspace Engine Contract Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` contains the pure local AI Workspace runtime logic
* `src/lib/ai-workspace-engine/engine.test.ts` provides focused unit coverage for the new engine module
* `src/app/projects/[id]/ai/page.tsx` reuses the engine module without changing UI text, request shape, reset behavior, or save boundaries
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `5 / 5` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.37 - AI Workspace Engine Status Mapping Foundation

**Milestone**
MS-001.37 - AI Workspace Engine Status Mapping Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure AI Workspace status and error message mapping logic into the AI Workspace Engine module without changing UX, UI text, save flow, generation behavior, provider wiring, or Project Brain ownership boundaries.

**Product Outcome**
The repository contains one small extension of the AI Workspace Engine runtime module that owns the generation error/status message mapping and save-to-Knowledge error/status message mapping, while the existing AI Workspace page reuses those exports with unchanged UI behavior and text.

**Dependencies**
* closed `MS-001.36 - AI Workspace Engine Runtime Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / VERIFIED / PUSHED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the pure generation and save status/error message mapping functions
* `src/lib/ai-workspace-engine/engine.test.ts` contains focused unit coverage for the moved mappings
* `src/app/projects/[id]/ai/page.tsx` reuses the engine exports and no longer defines those mappings locally
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `7 / 7` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.38 - AI Workspace Engine Save State Derivation Foundation

**Milestone**
MS-001.38 - AI Workspace Engine Save State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure active save-state derivation logic for the latest AI Workspace exchange into the AI Workspace Engine module without changing UX, UI text, save semantics, API flows, provider wiring, or Project Brain ownership boundaries.

**Product Outcome**
The repository contains one small extension of the AI Workspace Engine runtime module that owns the typed active save-state derivation rule for the latest local exchange, while the existing AI Workspace page reuses that helper with unchanged copy, save, reset, and refresh behavior.

**Dependencies**
* closed `MS-001.37 - AI Workspace Engine Status Mapping Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Publication Commit**
`a7b7696`

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the typed active save-state derivation helper and save-state types
* `src/lib/ai-workspace-engine/engine.test.ts` contains focused unit coverage for matching save-state reuse and default fallback derivation
* `src/app/projects/[id]/ai/page.tsx` reuses the engine helper and no longer derives the active save state inline
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `10 / 10` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.39 - AI Workspace Engine Latest Exchange Derivation Foundation

**Milestone**
MS-001.39 - AI Workspace Engine Latest Exchange Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure latest-exchange derivation logic from the AI Workspace page into the AI Workspace Engine module without changing UX, UI text, save semantics, provider wiring, Project Brain boundaries, or broader generation/save state management.

**Product Outcome**
The repository contains one small extension of the AI Workspace Engine runtime module that owns the typed derivation of the latest local exchange from `latestExchangeId` and `exchanges`, while the existing AI Workspace page reuses that helper with unchanged behavior.

**Dependencies**
* closed `MS-001.38 - AI Workspace Engine Save State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`4eac640`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the typed latest-exchange derivation helper
* `src/lib/ai-workspace-engine/engine.test.ts` contains focused unit coverage for null, found, and not-found latest-exchange derivation
* `src/app/projects/[id]/ai/page.tsx` reuses the engine helper and no longer derives the latest exchange inline
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `13 / 13` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.40 - AI Workspace Engine Active Generation State Derivation Foundation

**Milestone**
MS-001.40 - AI Workspace Engine Active Generation State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure active-generation-state derivation logic from the AI Workspace page into the AI Workspace Engine module without changing UX, UI text, request shapes, provider wiring, Project Brain boundaries, or broader generation/save state management.

**Product Outcome**
The repository contains one small extension of the AI Workspace Engine runtime module that owns the typed derivation of the active local generation state from `projectId` and `generationUiState`, while the existing AI Workspace page reuses that helper with unchanged behavior.

**Dependencies**
* closed `MS-001.39 - AI Workspace Engine Latest Exchange Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`6a608d1`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the typed active-generation-state derivation helper and generation-state types
* `src/lib/ai-workspace-engine/engine.test.ts` contains focused unit coverage for matched and fallback active-generation-state derivation
* `src/app/projects/[id]/ai/page.tsx` reuses the engine helper and no longer derives the active generation state inline
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `15 / 15` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
Obtain Product Owner publication approval for `MS-001.40`.

---

## MS-001.41 - AI Workspace Engine Active Save State Derivation Foundation

**Milestone**
MS-001.41 - AI Workspace Engine Active Save State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Formalize the pure active-save-state derivation already used by the AI Workspace page as a verified milestone without changing UX, UI text, request shapes, save mutation flow, provider wiring, or Project Brain boundaries.

**Product Outcome**
The repository already contains a small AI Workspace Engine runtime helper that owns the typed derivation of the active local save state from `projectId`, `saveUiState`, and `latestExchange`, while the existing AI Workspace page already reuses that helper with unchanged behavior.

**Dependencies**
* closed `MS-001.40 - AI Workspace Engine Active Generation State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`48ad94e`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` already contains the typed active-save-state derivation helper
* `src/app/projects/[id]/ai/page.tsx` already reuses the engine helper and does not derive the active save state inline
* `src/lib/ai-workspace-engine/engine.test.ts` already contains focused unit coverage for matched and fallback active-save-state derivation
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `15 / 15` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.42 - AI Workspace Engine Save Action Presentation Derivation Foundation

**Milestone**
MS-001.42 - AI Workspace Engine Save Action Presentation Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure save-action presentation derivation logic from the AI Workspace page into the AI Workspace Engine module without changing button text, disabled behavior, save flow, provider wiring, Project Brain boundaries, or broader component structure.

**Product Outcome**
The repository contains one small extension of the AI Workspace Engine runtime module that owns the pure derivation of the Save action presentation from the active save state, while the existing AI Workspace page reuses that helper with unchanged behavior.

**Dependencies**
* closed `MS-001.41 - AI Workspace Engine Active Save State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the typed save-action presentation derivation helper
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for editable, saving, and saved save-action presentation states
* `src/app/projects/[id]/ai/page.tsx` now reuses the engine helper for the Save action label and disabled state without changing the save flow
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `17 / 17` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.43 - AI Workspace Engine Generate Action Presentation Derivation Foundation

**Milestone**
MS-001.43 - AI Workspace Engine Generate Action Presentation Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure generate-action presentation derivation logic from the AI Workspace page into the AI Workspace Engine module without changing button text, disabled behavior, generation flow, provider wiring, Project Brain boundaries, or broader component structure.

**Product Outcome**
The repository contains one small extension of the AI Workspace Engine runtime module that owns the pure derivation of the Generate action presentation from the active generation state, while the existing AI Workspace page reuses that helper with unchanged behavior.

**Dependencies**
* closed `MS-001.42 - AI Workspace Engine Save Action Presentation Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the typed generate-action presentation derivation helper
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for idle, generating, generated, and error generate-action presentation states
* `src/app/projects/[id]/ai/page.tsx` now reuses the engine helper for the Generate action label and disabled state without changing the generation flow
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `19 / 19` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.44 - AI Workspace Engine Reset Action Presentation Derivation Foundation

**Milestone**
MS-001.44 - AI Workspace Engine Reset Action Presentation Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure reset-action presentation derivation logic from the AI Workspace page into the AI Workspace Engine module without changing button text, disabled behavior, visibility behavior, generation flow, provider wiring, Project Brain boundaries, or broader component structure.

**Product Outcome**
The repository contains one small extension of the AI Workspace Engine runtime module that owns the pure derivation of the Reset action presentation from the active generation state and local exchanges, while the existing AI Workspace page reuses that helper with unchanged behavior.

**Dependencies**
* closed `MS-001.43 - AI Workspace Engine Generate Action Presentation Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the typed reset-action presentation derivation helper
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for hidden, visible, and generating reset-action presentation states
* `src/app/projects/[id]/ai/page.tsx` now reuses the engine helper for the Reset action label, visibility, and disabled state without changing the generation flow
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `21 / 21` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed

**Blockers**
NONE

**Next Safe Step**
None.

---

## MS-001.45 - AI Workspace Engine Instruction State Derivation Foundation

**Milestone**
MS-001.45 - AI Workspace Engine Instruction State Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move only the pure active instruction-state derivation for the current project from the AI Workspace page into the AI Workspace Engine without changing request shapes, generated instruction behavior, starter prompt behavior, UX text, provider wiring, or broader component structure.

**Product Outcome**
The repository now contains one small extension of the AI Workspace Engine runtime module that owns the pure derivation of the active instruction text and selected starter prompt id for the current project, while the existing AI Workspace page reuses that helper with unchanged behavior.

**Dependencies**
* closed `MS-001.44 - AI Workspace Engine Reset Action Presentation Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`ba6f3fa`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now contains the typed active instruction-state derivation helper
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for matching and fallback active instruction-state derivation
* `src/app/projects/[id]/ai/page.tsx` now reuses the engine helper for the active instruction text and selected starter prompt id without changing the generate, save, reset, or copy flows
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `23 / 23` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed
* published on `origin/main` in commit `ba6f3fa`

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.46 - AI Workspace Engine Save UI Type Adoption Foundation

**Milestone**
MS-001.46 - AI Workspace Engine Save UI Type Adoption Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Adopt the existing engine-owned `SaveState` and `SaveUiState` types in the AI Workspace page without changing fetch flow, save logic, reset or copy behavior, layout behavior, provider wiring, or broader state management.

**Product Outcome**
The repository now contains one minimal AI Workspace page update that removes duplicate local save UI type declarations and reuses the engine-owned `SaveUiState` type directly, while preserving the existing runtime behavior.

**Dependencies**
* closed `MS-001.45 - AI Workspace Engine Instruction State Derivation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Publication Commit**
`826ad96`

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` no longer declares local duplicate `SaveState` and `SaveUiState` types
* `src/app/projects/[id]/ai/page.tsx` now reuses the engine-owned `SaveUiState` type directly
* no fetch, save, reset, copy, or layout behavior changes were introduced
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed with line-ending warnings only
* published on `origin/main` in commit `826ad96`

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.47 - AI Workspace Engine Instruction UI Type Adoption Foundation

**Milestone**
MS-001.47 - AI Workspace Engine Instruction UI Type Adoption Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Adopt the existing engine-owned `InstructionUiState` type in the AI Workspace page without changing starter prompt behavior, instruction editing behavior, fetch flow, generation flow, save flow, reset flow, copy flow, provider wiring, or broader state management.

**Product Outcome**
The repository now contains one minimal AI Workspace page update that reuses the engine-owned `InstructionUiState` type directly and removes the local `selectedPromptId` typing workaround, while preserving the existing runtime behavior.

**Dependencies**
* closed `MS-001.46 - AI Workspace Engine Save UI Type Adoption Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/ai/page.tsx` now imports and reuses the engine-owned `InstructionUiState` type directly
* `src/app/projects/[id]/ai/page.tsx` no longer uses the local `selectedPromptId: null as string | null` typing workaround
* no starter prompt, instruction editing, generate, save, reset, copy, or layout behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `23 / 23` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed with line-ending warnings only

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.48 - AI Workspace Engine Context UI State Type Foundation

**Milestone**
MS-001.48 - AI Workspace Engine Context UI State Type Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the AI Workspace context UI state type boundary into the AI Workspace Engine contract without changing context loading behavior, Project Brain reads, UX text, provider wiring, or broader page logic.

**Product Outcome**
The repository now contains one minimal AI Workspace Engine type addition that owns the `ContextUiState` union for context availability, while the existing AI Workspace page reuses that type with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.47 - AI Workspace Engine Instruction UI Type Adoption Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports the engine-owned `ContextUiState` type
* `ContextUiState` preserves the existing `loading`, `available`, `project-not-found`, and `unavailable` variants exactly
* `src/app/projects/[id]/ai/page.tsx` now imports and reuses `ContextUiState`
* `src/app/projects/[id]/ai/page.tsx` no longer declares the local `ContextState` type or imports `AiProjectContext` directly for that local alias
* no context loading, generate, save, reset, copy, prompt, or layout behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `23 / 23` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed with line-ending warnings only

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.49 - AI Workspace Engine Prompt UI Type Foundation

**Milestone**
MS-001.49 - AI Workspace Engine Prompt UI Type Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the AI Workspace prompt UI type boundary into the AI Workspace Engine contract without changing prompt content, UX, generation behavior, save behavior, or broader page logic.

**Product Outcome**
The repository now contains one minimal AI Workspace Engine type addition that owns the `StarterPromptUiState` shape for starter prompts, while the existing AI Workspace page reuses that type with unchanged prompt content and runtime behavior.

**Dependencies**
* closed `MS-001.48 - AI Workspace Engine Context UI State Type Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports the engine-owned `StarterPromptUiState` type
* `StarterPromptUiState` preserves the existing `id`, `label`, and `instruction` shape exactly
* `src/app/projects/[id]/ai/page.tsx` now types `STARTER_PROMPTS` with `StarterPromptUiState`
* `src/app/projects/[id]/ai/page.tsx` no longer declares the local `StarterPrompt` alias
* no prompt text, generate, save, reset, copy, context-loading, or layout behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `23 / 23` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed with line-ending warnings only

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

## MS-001.50 - AI Workspace Engine Starter Prompt Selection Derivation Foundation

**Milestone**
MS-001.50 - AI Workspace Engine Starter Prompt Selection Derivation Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Move the pure starter prompt selection derivation into the AI Workspace Engine without changing prompt content, UX, generation behavior, save behavior, or broader page logic.

**Product Outcome**
The repository now contains one minimal AI Workspace Engine helper that owns the derivation of `InstructionUiState` from the current project id and a selected `StarterPromptUiState`, while the existing AI Workspace page reuses that helper with unchanged runtime behavior.

**Dependencies**
* closed `MS-001.49 - AI Workspace Engine Prompt UI Type Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/ai-workspace-engine/engine.ts` now exports `deriveSelectedStarterPromptInstructionState(projectId, starterPromptUiState)`
* the helper derives `InstructionUiState.value` from `starterPromptUiState.instruction` and `InstructionUiState.selectedPromptId` from `starterPromptUiState.id`
* `src/lib/ai-workspace-engine/engine.test.ts` now contains focused unit coverage for the new pure derivation helper
* `src/app/projects/[id]/ai/page.tsx` now uses the engine helper when a starter prompt is selected
* no prompt text, generate, save, reset, copy, context-loading, or layout behavior changes were introduced
* `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` passed with `24 / 24` tests
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` passed with `32 / 32` tests
* `npx.cmd tsc --noEmit` passed
* `git diff --check` passed with line-ending warnings only

**Blockers**
NONE

**Next Safe Step**
Run Next Product Milestone Contract Discovery.

---

# Release Criteria

SPS OS 1.0 release progression requires:

* milestone order preserved by roadmap,
* milestone contract defined before implementation,
* PCL validation before work starts,
* Current State and Session State aligned,
* completed milestones treated as immutable,
* documentation updated at every milestone boundary.

No milestone should be considered complete without contract closure and documentation synchronization.

---

# Future Expansion

Future expansion remains outside SPS OS 1.0 roadmap execution.

Future directions may include:

* Parking
* SPS OS 2.0
* AI
* Agents
* Marketplace
* Plugins
* Enterprise
