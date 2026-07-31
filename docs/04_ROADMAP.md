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

MS-001.65 - AI Workspace Engine Save Context Refresh State Derivation Foundation

## Next

NONE

## MS-001.65 - AI Workspace Engine Save Context Refresh State Derivation Foundation

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
