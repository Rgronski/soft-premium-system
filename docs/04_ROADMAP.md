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

## Current

None

## Next

* `MS-001.3` - Workflow Engine
* `MS-001.4` - Release Readiness
* `MS-001.5` - SPS OS 1.0 Release Candidate

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
Current

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
Planned

**Purpose**
Define workflow execution boundaries for SPS OS 1.0.

**Business Goal**
Make workflow progression explicit, repeatable, and controllable.

**Technical Goal**
Establish the Workflow Engine contract without implementing advanced automation.

**Dependencies**
* `MS-001.2 - UI System`

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
* workflow engine documentation
* state document updates

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
Planned

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

**Out of Scope**
* SPS 2.0 scope
* new business modules

**Artifacts**
* release readiness documentation
* state document updates

**Definition of Done**
* release readiness milestone is formally defined and accepted.

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
Planned

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
To be planned after SPS OS 1.0 release candidate review.

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
