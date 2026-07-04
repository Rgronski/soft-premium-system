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
