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

MS-001.10 - Project Brain Workflow Consumer Snapshot

## Next

None - MS-001.11 is the current active product milestone

## Parallel Documentation Work

* `SPDM-001` - Soft Premium Development Method Foundation completed with `docs/00_SPS_DEVELOPMENT_METHOD.md`
* `SPDM-002` - Bootstrap Alignment completed with `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` updated to implement SPDM instead of defining methodology
* `CAP-003.1` - Project Domain Contract completed with `docs/13_PROJECT_CAPABILITY.md`
* `CAP-003.2` - Project Domain Model completed with `docs/13_PROJECT_CAPABILITY.md`
* `CAP-003` has no active work item
* This documentation foundation does not change the next product milestone order

---

# Milestone Contracts

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
MS-001.11 - Project Brain Consumer Overview Model

---

## MS-001.11 - Project Brain Consumer Overview Model

**Milestone**
MS-001.11 - Project Brain Consumer Overview Model

**Contract Status**
APPROVED

**Runtime Status**
ACTIVE

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

**Implementation Status**
IMPLEMENTED / LOCAL / VERIFIED

**Next Safe Step**
Prepare the first implementation batch for `MS-001.11` without changing lifecycle or implementation status until work actually starts.

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
