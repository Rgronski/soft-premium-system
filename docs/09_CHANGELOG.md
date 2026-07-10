# 09_CHANGELOG

---

# Document Information

**Document**
09_CHANGELOG.md

**Purpose**
Maintain the official history of significant changes made to Soft Premium System.

**Owner**
Chief Architect

**Status**
Draft

**Version**
1.0

**Source of Truth**
Yes

**Depends On**
None

**Referenced By**
08_CURRENT_STATE.md

---

# Purpose

This document records the history of significant changes made to Soft Premium System.

Each entry provides a concise summary of completed work and serves as a permanent historical record of the project's evolution.

This document is chronological and append-only.

---

# Changelog Principles

The Change Log records completed work only.

It does not contain:

* planned work,
* current implementation status,
* backlog items,
* architecture discussions.

Every entry should represent work that has been completed and committed.

---

# Entry Format

Each release entry should contain:

* Version
* Date
* Summary
* Completed Work
* Notes (optional)

---

# Unreleased

## Documentation Sprint

### Completed

* Added `00_PROJECT_BIBLE.md`
* Added `01_VISION.md`
* Added `02_ARCHITECTURE.md`
* Added `03_DEVELOPMENT_STANDARD.md`
* Added `04_UI_STANDARD.md`
* Added `05_ROADMAP.md`
* Added `06_BACKLOG.md`
* Added `07_DECISIONS.md`
* Added `08_CURRENT_STATE.md`
* Added `09_CHANGELOG.md`
* Documentation structure established.
* Source of Truth responsibilities defined.
* Documentation standards introduced.

## Process Update - Project Lifecycle

### Completed

* Added `10_PROJECT_LIFECYCLE.md`.
* Added `10_SESSION_STATE.md`.
* Added Session Close Protocol for `Koniec tego czatu`.
* Added ZIP handoff expectations for new AI sessions.
* Updated AI operating context to reference session lifecycle rules.

## MS-007 - Calendar View

### Completed

* Replaced the Calendar placeholder in `src/app/projects/[id]/calendar/page.tsx`.
* Calendar now reads existing Visits, Clients, and Services from project `localStorage`.
* Calendar now renders a sorted visits list by `date ASC` and `time ASC`.
* Each Calendar item now shows date, time, client, service, and status when present.
* Added empty state `No visits scheduled` with an `Add Visit` link to `/projects/{projectId}/visits/new`.

## MS-DOC-002 - Workflow Governance v1.0

### Completed

* Marked the SPS Operating Workflow as Version `1.0` and Status `Stable`.
* Added workflow governance rules, workflow change policy, workflow versioning, and product boundary rules.
* Declared the workflow as a Source of Truth architectural asset in project documentation.
* Updated session state for the active documentation governance task.

## MS-008 - Project Workspace Dashboard Polish

### Completed

* Project dashboard is no longer a placeholder and now acts as a real project workspace center.
* Added KPI cards sourced from project `localStorage`: Clients, Services, Visits, and Upcoming Visits.
* Added working Quick Actions for Add Client, Add Service, Schedule Visit, and Open Calendar using existing routes.
* Fixed lint issues by removing synchronous `setState` inside `useEffect` in the affected pages.
* Confirmed `npm run lint` passes.
* Confirmed `npm run build` passes.

## MS-DOC-003 - Platform Identity & Origins

### Completed

* Added `00_ORIGINS.md`.
* Established Platform Identity for Soft Premium System.
* Established Domain Independence for the platform core.
* Added Project Context Loader (PCL).
* Added ADR-001.

## MS-009.1 - Calendar Shell

### Completed

* Replaced the simple Calendar list layout with a Calendar Shell.
* Added Calendar header, UI-only navigation, view switcher, and workspace structure.
* Established Calendar as the first application UI consumer for the Scheduling Engine foundation.

## MS-009.2 - Scheduling Engine Month View

### Completed

* Replaced the workspace placeholder with a functional Month View.
* Added current month and year display based on browser date.
* Added monthly day grid with weekday headers and empty leading cells before the first weekday.
* Added today highlight using existing SPS UI styling.
* Added daily visit counters sourced from existing project `localStorage` visits.

## MS-009.3 - Scheduling Engine Calendar Navigation

### Completed

* Added Previous Month navigation for Month View.
* Added Next Month navigation for Month View.
* Added Today reset navigation for Month View.
* Completed Month View Navigation on top of the existing Scheduling Engine foundation.

## MS-009.4 - Scheduling Engine Day Selection

### Completed

* Added day selection in Month View.
* Only one active day can be selected.
* Added visual selected state.
* Preserved Today Highlight behaviour.
* Preserved Month Navigation introduced in MS-009.3.

## MS-009.5 - Scheduling Engine Day Details

### Completed

* Added Day Details panel.
* Added selected day information.
* Added weekday display.
* Added visit count.
* Added visit list.
* Added "Brak wizyt" empty state.
* Preserved Month Navigation.
* Preserved Day Selection.

## MS-000.2 - AI Development Workflow

### Completed

* Added the formal AI Development Workflow foundation.
* Added AGENTS.md role and execution rules.
* Added AI workflow roles, workflow stages, prompts, and Project Integrity Check checklist.
* Established the process of creating SPS as part of SPS itself.

## MS-000.3 - AI Workflow Command Center

### Completed

* Added AI Workflow Command Center foundation documentation.
* Added workflow API contract for SPS UI, ENG-000, ChatGPT, Codex, and GitHub.
* Added PCL bootloader definition as a first-class ENG-000 workflow element.
* Added ENG-000 constitution for permanent workflow rules.
* Commit: `be063e1`.

## MS-000.4 - SPS Experience Blueprint

### Completed

* Added the first SPS OS 1.0 Workspace Experience Blueprint.
* Defined Morning Experience, Workspace, The Conductor, main actions, and Closing Experience for SPS OS 1.0.
* Established design goals for the SPS workspace experience without expanding scope beyond version 1.0.
* Commit: `94a0ac7`.

## MS-000.5 - The Conductor

### Date

2026-07-06

### Completed

* Added ConductorState model.
* Added Conductor service.
* Added ConductorPanel UI.
* Integrated panel into Project Dashboard.
* Established initial orchestration layer.
* No business logic added.
* No AI added.
* Minimal architecture only.

## MS-000.6 - Roadmap Engine

### Date

2026-07-06

### Completed

* Added `docs/04_ROADMAP.md` as the formal SPS OS 1.0 roadmap contract.
* Established roadmap as the Single Source of Truth for milestone order.
* Defined milestone classification for SPS OS 1.0.
* Defined milestone contracts from `MS-000.6` to `MS-001.4`.
* Started `MS-000.6 - Roadmap Engine` as the current documentation and architecture milestone.

## MS-000.7 - Workspace Engine

### Date

2026-07-06

### Completed

* Extracted workspace structure into dedicated workspace components.
* Introduced `WorkspaceLayout`, `WorkspaceHeader`, `WorkspaceContent`, and `WorkspacePanels`.
* Preserved dashboard data logic and UI behaviour.

## MS-000.8 - Project Engine

### Date

2026-07-06

### Completed

* Added shared `Project` model.
* Added Project Engine service for `getProjects`, `getProjectById`, and `createProject`.
* Connected home, project creation, and project dashboard screens to the shared project service.

## MS-000.9 - Task Engine

### Date

2026-07-06

### Completed

* Added shared `Task` model.
* Added Task Engine service for `getTasks`, `getTask`, and `createTask`.
* Preserved storage key structure per project without migration.

## MS-001.0 - Task Workspace Integration

### Date

2026-07-06

### Completed

* Added project Tasks workspace screen.
* Added Tasks link to project workspace navigation.
* Connected task creation and task listing to the existing Task Engine.
* Preserved Project Engine and existing workspace modules without behavioural changes.

## MS-001.1 - Knowledge Engine

### Date

2026-07-06

### Completed

* Added KnowledgeEntry model.
* Added Knowledge Engine service.
* Added project-scoped knowledge storage.
* No UI added.
* No AI added.
* No search, tags, categories or workflow added.
* Minimal domain layer only.

## MS-001.2A - UI Foundation

### Date

2026-07-06

### Completed

* Added SectionCard UI component.
* Centralized primary section container style.
* Updated selected simple screens to use SectionCard.
* No visual redesign.
* No new UI variants.
* No business logic changes.

## MS-001.2B - UI Foundation Continuation

### Date

2026-07-07

### Completed

* Minimal Patch 1 completed - created `docs/06_UI_INVENTORY.md`.
* Minimal Patch 2 completed - `WorkspaceLayout` now composes `SectionCard` internally.
* Minimal Patch 3 completed - `WorkspacePanels` Quick Actions now render from a local configuration array.
* Minimal Patch 4 completed - `WorkspacePanels` KPI cards now render from a local configuration array.
* No new shared UI components were created in these patches.
* UI Foundation continuation was completed without visual redesign or architecture changes.

## MS-001.3 - Workflow Engine

### Date

2026-07-07

### Completed

* Minimal Patch 1 completed - created `docs/11_WORKFLOW_ENGINE.md`.
* Minimal Patch 2 completed - created the Workflow domain contract in `src/lib/workflow/types.ts` and `src/lib/workflow/engine.ts`.
* Minimal Patch 3 completed - added the first warning decision rule to `evaluateWorkflow()`.
* Minimal Patch 4 completed - added the first dynamic nextStep rule for active work.
* Minimal Patch 5 completed - added the second dynamic nextStep rule for starting next work.
* Minimal Patch 6 completed - unified evidence counters across all WorkflowResult branches.
* Minimal Patch 8 completed - added the first dynamic confidence policy.
* Workflow Engine now returns `health: "warning"` when blockers are absent and warnings exist.
* Decision priority is `blocked > warning > ready`.
* Workflow Engine now returns `nextStep.id: "continue-active-work"` when active work exists without blockers or warnings.
* Workflow Engine now returns `nextStep.id: "start-next-work"` when no blockers, warnings, or active work exist.
* Workflow Engine now returns evidence with `phase`, `completed`, `active`, `warnings`, and `blockers` in every branch.
* Workflow Engine now returns confidence `1.0` for `blocked`, `0.75` for `warning`, and `0.5` for ready branches.
* Workflow Engine remains isolated from UI.
* Milestone Closure Review passed and `MS-001.3 - Workflow Engine` was formally completed.

### Notes

* Minimal Patch 7 was diagnosis-only and was not implemented.
* No existing test setup was found: no `test` script, no test framework in devDependencies, and no existing test configuration.
* Test runner setup requires separate future scope before Workflow Engine tests can be added.

## SPDM-001 - Soft Premium Development Method Foundation

### Date

2026-07-08

### Completed

* Added `docs/00_SPS_DEVELOPMENT_METHOD.md`.
* Established the top-level SPS development methodology foundation.
* Defined SPDM principles, roles, SSOT, PCL, lifecycle, minimal patch philosophy, credit saving philosophy, and milestone closure review.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## SPDM-002 - Bootstrap Alignment

### Date

2026-07-08

### Completed

* Updated `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` to implement `docs/00_SPS_DEVELOPMENT_METHOD.md` as the authoritative methodology source.
* Reduced duplicated methodology in the bootstrap while preserving the operational workflow.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## CAP-001.1 - Project Domain Contract

### Date

2026-07-08

### Completed

* Added `docs/13_PROJECT_CAPABILITY.md`.
* Created the initial Project Capability domain contract.
* Defined Purpose, Vision, Responsibility, Domain Model, Lifecycle, Relationships, Capability Contract, and Future Evolution.
* Kept `CAP-001` active as parallel capability documentation work.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## SPDM-003 - Repository Access Fallback

### Date

2026-07-08

### Completed

* Updated `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` with a Repository Access Fallback section.
* Added explicit PowerShell ZIP commands for sessions where ChatGPT cannot access the local project directory.
* Defined that Project Context Loader continues according to SPDM after ZIP upload.
* Kept `CAP-001` active as parallel capability documentation work.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## SPDM-004 - SPS Launcher

### Date

2026-07-09

### Completed

* Added `docs/11_SPS_START.md`.
* Created the SPS Launcher as the first entry point for new SPS OS sessions.
* Defined Workspace Mode, ZIP Mode, and GitHub Mode.
* Preserved `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` as the operational bootstrap and `SPDM` as the authoritative method.
* Kept `CAP-001` active as parallel capability documentation work.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## SPDM-005 - Git Workflow and Active Branch Validation

### Date

2026-07-09

### Completed

* Added `docs/14_GIT_WORKFLOW.md`.
* Defined the formal Git workflow rule that repository validation must use the active development branch.
* Added Active Branch Validation to `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.
* Added required branch verification commands: `git branch --show-current`, `git status`, and `git log --oneline --decorate -n 10`.
* Kept `CAP-001` active as parallel capability documentation work.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## CAP-001.2 - Project Domain Model

### Date

2026-07-09

### Completed

* Updated `docs/13_PROJECT_CAPABILITY.md`.
* Added the `Project Domain Model` section.
* Defined conceptual project attributes: Identity, Ownership, Lifecycle, Context, Relationships, and Metadata.
* Kept `CAP-001` active as parallel capability documentation work.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## SPDM-006 - Full Startup Package

### Date

2026-07-09

### Completed

* Updated `docs/11_SPS_START.md` with a copy-paste startup prompt.
* Updated `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` to require full ZIP Mode completion after ZIP upload.
* Combined SPS Launcher, ZIP Mode, Bootstrap, and Active Branch Validation into one clear startup package.
* Recorded verified branch state: `feature/documentation-foundation`, latest commit `caba05d`, working tree `clean`.
* Kept `CAP-001` active as parallel capability documentation work.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## SPDM-007 - One Command Startup

### Date

2026-07-10

### Completed

* Updated `docs/11_SPS_START.md`.
* Updated `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.
* Defined `SPS OS — START` as the strict one-command startup protocol.
* Blocked memory-based bootstrap and previous chat memory as SSOT for startup.
* Required ZIP Mode immediately when verified repository access is missing.
* Required exact PowerShell ZIP commands and a request only for `C:\Users\p700\sps-session.zip`.
* Kept `CAP-001` active as parallel capability documentation work.
* Preserved `MS-001.4 - Release Readiness` as the next product milestone.

## CAP-002.1 - Session Close Protocol

### Date

2026-07-11

### Completed

* Started `CAP-002 - SPS Lifecycle Engine`.
* Added `docs/15_SESSION_CLOSE_PROTOCOL.md`.
* Introduced the formal Session Close Protocol for `SPS OS — KONIEC`.
* Added the session close lifecycle concept to project documentation.
* Separated session close from bootstrap and start as a distinct operational contract.

---

# Future Releases

Future releases should summarize completed milestones rather than individual implementation details whenever possible.

Each release should clearly communicate what value was delivered.

---

# Maintenance Rules

The Change Log should be updated:

* after milestone completion,
* after significant architectural changes,
* after official releases.

Routine development commits do not require individual Change Log entries unless they represent meaningful project progress.

---

# Related Documents

| Document            | Source of Truth           |
| ------------------- | ------------------------- |
| 05_ROADMAP.md       | Planned product evolution |
| 07_DECISIONS.md     | Architecture decisions    |
| 08_CURRENT_STATE.md | Current project status    |
