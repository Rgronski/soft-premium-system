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
* `MS-022.1` - Project Brain Context Visibility Refinement Foundation
* `MS-022.2` - Project Brain Context Action Clarity Foundation
* `MS-022.3` - Project Brain Context Empty State Clarity Foundation
* `MS-023.0` - Konduktor Project Brain Guidance Foundation
* `MS-023.1` - Konduktor Recommendation Empty/Weak State Clarity Foundation
* `MS-023.2` - Konduktor Recommendation Source Transparency Foundation
* `MS-023.3` - Konduktor Recommendation User Trust Copy Foundation
* `MS-024.0` - Konduktor Recommendation Action Readiness Foundation
* `MS-024.1` - Konduktor Recommendation Reason Clarity Foundation
* `MS-024.2` - Konduktor Recommendation Caution Signal Foundation
* `MS-024.3` - Konduktor Recommendation Card Hierarchy Foundation
* `MS-025.0` - Konduktor Next Milestone Selection Guidance Foundation
* `MS-025.1` - Konduktor Next Milestone Reason Specificity Foundation
* `MS-025.2` - Konduktor Product Owner Decision Prompt Clarity Foundation
* `MS-025.3` - Konduktor Decision Boundary Trust Copy Foundation
* `MS-026.0` - Polish UI Language Consistency Live Readiness Foundation
* `MS-027.2` - Real Project Duplicate Detection Foundation
* `MS-027.3` - Real Project Source Binding Status Foundation
* `MS-027.4` - GitHub Repository Import / Bind Decision Foundation
* `MS-027.5` - Project Scoped Data Rebinding Guard Foundation
* `MS-028.0` - GitHub Repository Branch Work Mode Decision Foundation
* `MS-028.1` - GitHub Repository Working Branch Name Foundation
* `MS-028.2` - GitHub Repository Branch Work Mode Summary Foundation
* `MS-028.3` - GitHub Repository Connection Readiness Foundation
* `MS-028.4` - GitHub Repository Local Clone Readiness Foundation
* `MS-028.5` - GitHub Repository Real Execution Contract Foundation
* `MS-028.6` - GitHub Real Connection Readiness Check Foundation
* `MS-028.11` - GitHub First Operation Candidate Decision Foundation
* `MS-028.13` - GitHub First Authorized Operation Preflight Foundation
* `MS-028.16` - GitHub Repo Checkout Folder Derivation Foundation
* `MS-028.17` - GitHub Local Setup Success Copy Correction
* `MS-028.18` - GitHub Multi-Account Auth Guidance Foundation
* `MS-028.19` - GitHub Post-Clone Source Status Reconciliation Foundation
* `MS-028.20` - GitHub Checkout Status Revalidation Foundation
* `MS-028.21` - Git Checkout Status Revalidation UX Foundation
* `MS-028.22` - AI Workspace Project Lookup Fix Foundation
* `MS-028.23` - AI Workspace Repo Context Boundary and Knowledge Refresh Foundation
* `MS-028.24` - Project Conductor Context Rebinding Foundation
* `MS-028.25` - Project Brain Filesystem Metadata Root Foundation
* `MS-028.27` - SPS Core Doctrine Knowledge Store Foundation
* `MS-028.28` - Project Knowledge Promotion Candidate Foundation
* `MS-028.29a` - App Version Marker 1.028.29 Publication
* `MS-028.30` - Core Doctrine UI Visibility Foundation
* `MS-028.31` - Decisions and Conductor State Store Foundation
* `MS-028.32` - Conductor State UI Wiring Foundation
* `MS-028.34` - Delete/Re-import Project Validation Foundation
* `MS-028.35` - Project Delete Execution Confirmation Foundation
* `MS-028.36` - Project Delete Disk Execution Foundation
* `MS-028.37` - Project Delete UI Execution Wiring Foundation
* `MS-028.38` - Delete/Re-import Manual Validation Run Foundation
* `MS-028.39` - Project Re-import/Re-open Action Foundation
* `MS-028.40` - Delete/Re-import Live Project Trial Decision Foundation
* `MS-028.41` - Delete/Re-import Live Trial Execution Foundation
* `MS-028.42` - Delete/Re-import Live Trial Product Owner Execution Decision
* `MS-028.72` - AI Workspace Task Fallback Alignment After Project Rebinding Foundation
* `MS-028.71` - Project API Filesystem Rebinding Fallback Foundation
* `MS-028.70` - AI Workspace Project Identity Divergence Instrumentation Foundation
* `MS-028.69` - AI Workspace Knowledge Server Fallback Alignment Foundation
* `MS-028.68` - AI Workspace Project Brain Browser Profile Divergence Diagnosis Foundation
* `MS-028.67` - AI Workspace Browser State Consistency Diagnosis Foundation
* `MS-028.66` - Session Handoff Encoding Source Boundary Diagnosis Foundation
* `MS-028.65` - Linear App Version Policy Correction Foundation
* `MS-028.64` - App Version Commit Trace Policy Foundation
* `MS-028.63` - Mojibake / Krzaczki Cleanup Batch 3 Foundation
* `MS-028.62` - Mojibake / Krzaczki Cleanup Batch 2 Foundation
* `MS-028.61` - Mojibake / Krzaczki Cleanup Foundation
* `MS-028.60` - AI Workbench Handoff Panel Live Use Trial Foundation
* `MS-028.59` - AI Workbench Codex Handoff Operating Rules Fields Foundation
* `MS-028.58` - AI Workbench Manual Context Fill Guidance Foundation
* `MS-028.57` - AI Workbench Handoff Panel Usability Review Foundation
* `MS-028.56` - AI Workbench Project Context Read-Only Hint Foundation
* `MS-028.55` - AI Workbench Handoff Template Context Fields Foundation
* `MS-028.54` - AI Workbench Handoff Copy Action Foundation
* `MS-028.53` - AI Workbench Copy-Ready Codex Handoff Panel Foundation
* `MS-028.52` - TypeScript Baseline Recovery Version Publication Foundation
* `MS-028.51` - Project Settings TypeScript Nullability Recovery Foundation
* `MS-028.50` - Working Branch Setup Mode Type Recovery Foundation
* `MS-028.49` - AI Generate Project Context Result Shape Recovery Foundation
* `MS-028.47` - Project Delete Validation Summary Type Recovery Foundation
* `MS-028.46` - TypeScript Baseline Recovery Diagnosis Foundation
* `MS-028.45` - Codex Operating Charter and Copy-Block Communication Foundation
* `MS-028.48` - AI Workspace Literal Label Type Recovery Foundation
* `MS-028.44` - Project AI Workbench Direction Foundation
* `MS-028.43` - Operator Guide Delete/Re-import Foundation
* `MS-028.42a` - App Version Marker 1.028.42 Publication

## Current

NONE / Product Owner decision required

## Latest Completed Product Milestone

## MS-028.74d - App Version Publication Drift Recovery Foundation

**Milestone**
MS-028.74d - App Version Publication Drift Recovery Foundation

**Type**
SPS OS / App Version Publication Drift Recovery Foundation

This checkpoint records the recovery from app version publication drift after several product-relevant publications were pushed without bumping the canonical app version. The authoritative app version source is `src/lib/app-version.ts`. The previous recorded app version was `1.0008`, the last verified correct bump was `MS-028.73 - Codex Report Copy-Block Compliance Guard Foundation` at commit `8322cda`, and 11 product-relevant publications followed without a matching version bump. The corrected app version is `1.0019`, and `LAST_PUBLISHED_MS` now tracks `MS-030.11 - Project Map Evidence Scanner Contract Foundation`. Future product-relevant publication handoffs must pass the App Version Gate before any commit or push. This milestone is recovery only and does not change product behavior.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
App version recovery only.

**Allowed Implementation Scope**
* recover the canonical app version source
* record the App Version Gate for future publication handoffs
* append the required usage record

**Forbidden Scope**
* implement product work
* change unrelated UI, layout, or Project Map logic
* inspect or modify Beauty Client PRO
* commit / push actions

**Dependencies**
* closed `MS-028.65 - Linear App Version Policy Correction Foundation`
* closed `MS-030.11 - Project Map Evidence Scanner Contract Foundation`

## MS-030.15 - Project Map UI Readiness Contract Foundation

**Milestone**
MS-030.15 - Project Map UI Readiness Contract Foundation

**Type**
SPS OS / Project Map UI Readiness Contract Foundation

This checkpoint records the readiness contract for the future Project Map tab or view before any UI implementation. The Project Map UI is a future project-facing view, not implemented in this milestone. The UI must show the project foundation checklist for Project Identity, SSOT, Project Bible, Project Map, Working Source, First Layout, First Working Flow, and Publication Path. The UI must show foundation status for each item as `check` or completed, planned, blocked, parked, absent, unknown, or needs review, and it must show product areas and milestones where Project Map data or the reconstruction candidate supports them. Completed blocks must appear with a clear check state, planned work must remain separate from completed work, parked ideas / udogodnienia must appear under the relevant product area or milestone when evidence supports them, and missing, ambiguous, conflicting, weak, and inferred items must remain visible instead of being hidden. The UI must distinguish canonical Project Map data from reconstruction candidate data, make source / evidence / provenance inspectable where available, and must not allow silent canonical write or promotion. Any future accept or write action must require explicit Product Owner or project authority confirmation. The UI should support SPS OS itself as a future validation project, and it should support client projects such as Beauty Client PRO in the future without inspecting or modifying them in this milestone. This milestone is contract only and does not implement UI code.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project map UI readiness contract only.

**Allowed Implementation Scope**
* record the UI readiness contract in SSOT
* preserve the MS-030.14 canonical write boundary contract as the prior baseline
* keep UI implementation outside this milestone
* preserve source / evidence / provenance inspectability requirements for the future UI

**Dependencies**
* closed `MS-028.65 - Linear App Version Policy Correction Foundation`
* closed `MS-030.11 - Project Map Evidence Scanner Contract Foundation`
* closed `MS-030.12 - Project Map Evidence Classification Contract Foundation`
* closed `MS-030.13 - Project Map Reconstruction Candidate Contract Foundation`
* closed `MS-030.14 - Project Map Canonical Write Boundary Contract Foundation`

## MS-030.14 - Project Map Canonical Write Boundary Contract Foundation

**Milestone**
MS-030.14 - Project Map Canonical Write Boundary Contract Foundation

**Type**
SPS OS / Project Map Canonical Write Boundary Contract Foundation

This checkpoint records the boundary between a Project Map reconstruction candidate and the canonical project-owned Project Map. The canonical Project Map is the accepted project-owned map, not the reconstruction candidate. The reconstruction candidate must remain reviewable until accepted by Product Owner or an explicit project authority, and SPS OS must not silently promote a candidate to canonical Project Map. Canonical write or export requires explicit approval, with the write target made explicit before writing to a project-owned source path, `.sps-meta` cache, export artifact, or future configured destination. Writing to `.sps-meta` is operational or cache state only unless the project explicitly defines it as canonical. Source ownership remains with the project after write or export, and canonical write should preserve evidence links or provenance where possible. Conflicting, weak, inferred, missing, or ambiguous items must remain visible before acceptance, missing evidence must not be written as completed or `check`, and accepted items may be written as `check` or completed only when supported by direct evidence or explicit Product Owner decision. Rejected candidate items should remain parked, ignored, or deferred according to Product Owner decision when useful, and canonical write should be reversible and auditable in future implementation. SPS OS itself may be used as a future validation project, while Beauty Client PRO remains a future client-project validation candidate only without inspection or modification. This milestone is contract only and does not implement canonical write code.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project map canonical write boundary contract only.

**Allowed Implementation Scope**
* record the canonical write boundary contract in SSOT
* preserve the MS-030.13 reconstruction candidate contract as the prior baseline
* keep canonical write/export outside this milestone
* preserve source ownership and provenance for the canonical boundary

**Dependencies**
* closed `MS-028.65 - Linear App Version Policy Correction Foundation`
* closed `MS-030.11 - Project Map Evidence Scanner Contract Foundation`
* closed `MS-030.12 - Project Map Evidence Classification Contract Foundation`
* closed `MS-030.13 - Project Map Reconstruction Candidate Contract Foundation`

## MS-030.13 - Project Map Reconstruction Candidate Contract Foundation

**Milestone**
MS-030.13 - Project Map Reconstruction Candidate Contract Foundation

**Type**
SPS OS / Project Map Reconstruction Candidate Contract Foundation

This checkpoint records the contract for producing a proposed Project Map reconstruction candidate from classified project evidence. The reconstruction candidate is a proposed Project Map view, not the canonical Project Map. It may be built from classified evidence produced by the future scanner / classifier flow, preserves evidence links for every proposed foundation, area, milestone, and status, and distinguishes confirmed, inferred, weak, conflicting, and missing items. Confirmed or explicitly supported evidence may mark items as `check` or completed, but the candidate must not silently resolve conflicts or treat missing evidence as complete. The candidate should include foundation checklist status for Project Identity, SSOT, Project Bible, Project Map, Working Source, First Layout, First Working Flow, and Publication Path, and should include product-area / milestone status where evidence supports it. Parked ideas remain visible when evidence supports parked, deferred, future, later, or not-active-scope intent, and unknown or ambiguous areas remain visible for Product Owner review. Writing or exporting the candidate into the canonical project-owned Project Map remains a separate future step. `.sps-meta` may cache candidate context, but source ownership and canonical truth remain with the project. SPS OS itself may be used as a future validation project, while Beauty Client PRO remains a future client-project validation candidate only without inspection or modification. This milestone is contract only and does not implement reconstruction code.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project map reconstruction candidate contract only.

**Allowed Implementation Scope**
* record the reconstruction candidate contract in SSOT
* preserve the MS-030.12 evidence classification contract as the prior baseline
* keep canonical Project Map writing outside this milestone
* preserve source ownership and evidence links for the proposed candidate

**Dependencies**
* closed `MS-028.65 - Linear App Version Policy Correction Foundation`
* closed `MS-030.11 - Project Map Evidence Scanner Contract Foundation`
* closed `MS-030.12 - Project Map Evidence Classification Contract Foundation`

## MS-030.12 - Project Map Evidence Classification Contract Foundation

**Milestone**
MS-030.12 - Project Map Evidence Classification Contract Foundation

**Type**
SPS OS / Project Map Evidence Classification Contract Foundation

This checkpoint records the contract for future read-model classification over scanner-discovered evidence. Each evidence item carries an evidence type, source path or source identifier, source owner, discovery status, confidence, and timestamp when available. Evidence types include `bible`, `roadmap`, `current-state`, `changelog`, `session-state`, `decision/ADR`, `handoff`, `readme`, `package/config`, `deployment`, `working-source`, and `unknown`. Discovery status includes `found`, `missing`, `unavailable`, `unreadable`, `ambiguous`, and `ignored`. Confidence distinguishes direct evidence, inferred evidence, weak evidence, and conflicting evidence. Evidence links to foundation areas such as Project Identity, SSOT, Project Bible, Project Map, Working Source, First Layout, First Working Flow, and Publication Path when applicable, and it may link to milestone states such as completed, planned, blocked, parked, absent, or unknown. The classification preserves source ownership and does not make SPS OS metadata the source of truth. Weak or inferred evidence must not be upgraded to completed or check without explicit support, conflicting evidence must be represented explicitly, missing evidence must not be treated as complete, and the output may feed reconstruction candidates while canonical Project Map writing remains a separate future step. The classification should support SPS OS itself as a future validation project. Beauty Client PRO remains a future client-project validation candidate only without inspection or modification. This milestone is contract only and does not implement classifier code.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project map evidence classification contract only.

**Allowed Implementation Scope**
* record the classification contract in SSOT
* preserve the MS-030.11 evidence scanner contract as the prior baseline
* keep scanner-discovered evidence read-only input only
* append the required usage record

**Forbidden Scope**
* implement classifier code
* change project file contents
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.11 - Project Map Evidence Scanner Contract Foundation`

## MS-030.11 - Project Map Evidence Scanner Contract Foundation

**Milestone**
MS-030.11 - Project Map Evidence Scanner Contract Foundation

**Type**
SPS OS / Project Map Evidence Scanner Contract Foundation

This checkpoint records the contract for future read-only discovery over project-owned sources used to build or reconstruct a Project Map. The scanner may inspect configured repository URL metadata and local working source path metadata, and it may inspect known documentation candidates such as Project Bible, roadmap, current state, changelog, session state, decisions / ADR, handoff docs, README, package / config files, and deployment docs. It classifies evidence by foundation area: Project Identity, SSOT, Project Bible, Project Map, Working Source, First Layout, First Working Flow, and Publication Path. It classifies milestone evidence as `completed`, `planned`, `blocked`, `parked`, `absent`, or `unknown`. The scanner preserves source ownership and discovery does not transfer ownership to SPS OS. It is read-only by default and must not create, modify, or delete project files. Missing evidence must not be treated as complete; missing, unavailable, and unreadable evidence must be reported explicitly. The scanner may produce reconstruction candidates, but writing a canonical Project Map remains a separate future step. It may cache derived evidence context in `.sps-meta` without making `.sps-meta` the source of project truth. The SPS OS repository itself may serve as a future validation project because it already has Bible, roadmap, current, session, and changelog evidence. Beauty Client PRO remains a future client-project validation candidate only without inspection or modification. This milestone is contract only and does not implement scanner code.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project map evidence scanner contract only.

**Allowed Implementation Scope**
* record the scanner contract in SSOT
* preserve the MS-030.10 checklist contract as the prior baseline
* keep project-owned evidence as read-only input only
* append the required usage record

**Forbidden Scope**
* implement scanner code
* change project file contents
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.10 - Project Creation Foundation Checklist Contract Foundation`

## MS-030.10 - Project Creation Foundation Checklist Contract Foundation

**Milestone**
MS-030.10 - Project Creation Foundation Checklist Contract Foundation

**Type**
SPS OS / Project Creation Foundation Checklist Contract Foundation

This checkpoint records the foundation checklist used when SPS OS creates, imports, reconstructs, or evaluates a project. The checklist is derived from the MS-030.9 triad: SSOT + Project Bible + Project Map. Project Identity is the first required foundation for every SPS OS-managed project. SSOT is required to define the authoritative project truth source. Project Bible is required to define purpose, quality rules, scope sense, and anti-noise guidance. Project Map is required to define areas, completed work, planned work, blocked work, parked ideas, and next candidates. Working Source must identify where project-owned files or code live. First Layout is a planned / checkable foundation item for app or site projects. First Working Flow is a planned / checkable foundation item for usable projects. Publication Path is a planned / checkable foundation item when the project will be deployed, exported, or delivered. Existing project evidence may mark checklist items as `check`, but missing items must be represented as `planned`, `blocked`, `parked`, or absent instead of being silently treated as complete. SPS OS may reconstruct this checklist from available evidence, but source ownership remains with the project. This checklist is a contract / read-model foundation only and does not implement code.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project creation foundation checklist contract only.

**Allowed Implementation Scope**
* record the checklist contract in SSOT
* preserve the MS-030.9 triad contract as the source foundation
* keep project-owned evidence as input only
* append the required usage record

**Forbidden Scope**
* implement checklist code
* change project creation behavior
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.9 - Project Foundation Triad Contract Foundation`

## MS-030.9 - Project Foundation Triad Contract Foundation

**Milestone**
MS-030.9 - Project Foundation Triad Contract Foundation

**Type**
SPS OS / Project Foundation Triad Contract Foundation

This checkpoint records the project foundation triad for SPS OS: SSOT, Project Bible, and Project Map. SSOT defines the authoritative source for project truth. Project Bible defines purpose, quality rules, scope sense, and whether work serves the project or is only noise / fajerwerki / wodotrysk. Project Map defines the product-area map, completed work, planned work, blocked work, parked ideas, and next candidates. The SPS OS Project Bible acts as a quality and decision compass for SPS OS itself and as a guidance standard for client projects. The SPS OS Project Map acts as a template / metamap for other project maps, not as a replacement for them. Client projects may have their own Project Bible and Project Map, and client ownership remains with the client project. SPS OS may reconstruct a client Project Map when absent by comparing project evidence to the SPS OS Project Map template / metamap, and if a client project already has its own map SPS OS can compare it against that template / metamap to help choose the safest path forward. SPS OS may cache or operate on client map context in its `.sps-meta` metadata root, but source ownership remains with the client project when exported or written back. Beauty Client PRO remains a future candidate for this triad without inspection or modification. This milestone is contract only and does not implement code.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project foundation triad contract only.

**Allowed Implementation Scope**
* record the triad contract in SSOT
* preserve MS-030.8 as the missing-read baseline
* keep project-owned evidence as input only
* append the required usage record

**Forbidden Scope**
* implement triad code
* change storage or read behavior
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.8 - Project Map Missing Read Result Foundation`

## MS-030.8 - Project Map Missing Read Result Foundation

**Milestone**
MS-030.8 - Project Map Missing Read Result Foundation

**Type**
SPS OS / Project Map Missing Read Result Foundation

This checkpoint records the first minimal Project Map read result for SPS OS. The helper uses the MS-030.7 storage-path resolver, returns `missing` when `map.json` is absent, and returns `unavailable` for invalid project identity or for the present-map state that still remains outside the parser boundary. It does not parse maps, reconstruct maps, inspect project-owned roadmap/docs/repo evidence, modify client/project repositories, or create runtime files. Beauty Client PRO remains a future candidate without inspection or modification.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map missing read result only.

**Allowed Implementation Scope**
* add the minimal read-result helper and tests
* preserve MS-030.7 as the storage-path baseline
* keep project-owned docs as input evidence only
* append the required usage record

**Forbidden Scope**
* parse available map data
* reconstruct Project Maps
* create runtime files
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.7 - Project Map Storage Path Resolver Foundation`

## MS-030.7 - Project Map Storage Path Resolver Foundation

**Milestone**
MS-030.7 - Project Map Storage Path Resolver Foundation

**Type**
SPS OS / Project Map Storage Path Resolver Foundation

This checkpoint records the minimal Project Map storage path resolver for SPS OS. The resolver derives the operational Project Map root from the existing project metadata/project-key boundary and returns `C:\SPS_OS_WORK\.sps-meta\<project-key>\project-map\` without creating directories or files. It supports SPS OS itself and imported/existing client applications through the same project-key boundary, does not read project-owned roadmap/docs/repo evidence, does not modify client/project repositories, and does not inspect Beauty Client PRO. Missing or invalid project identity returns an explicit unavailable result instead of guessing. No runtime files are created in this milestone, and no TypeScript types or source code are implemented beyond the resolver. MS-030.6 remains the preceding storage skeleton baseline.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map storage path resolver only.

**Allowed Implementation Scope**
* resolve the operational Project Map root path
* preserve MS-030.6 as the storage skeleton baseline
* keep project-owned docs as input evidence only
* append the required usage record

**Forbidden Scope**
* create runtime map files or directories
* load or reconstruct Project Maps
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.6 - Project Map Storage Skeleton Foundation`

## MS-030.6 - Project Map Storage Skeleton Foundation

**Milestone**
MS-030.6 - Project Map Storage Skeleton Foundation

**Type**
SPS OS / Project Map Storage Skeleton Foundation

This checkpoint records the future Project Map storage skeleton for SPS OS. The operational Project Map will live in `C:\SPS_OS_WORK\.sps-meta\<project-key>\project-map\`, with a minimal file layout of `map.json`, `sources.jsonl`, `parked-ideas.jsonl`, and `events.jsonl`. `map.json` holds the normalized MS-030.3 read model, `sources.jsonl` records source evidence from project-owned roadmap/docs/repo files, `parked-ideas.jsonl` keeps ideas and improvements attached to the relevant product-area block or milestone, and `events.jsonl` records lifecycle and audit events such as created, loaded, reconstructed, reviewed, updated, and blocked. The skeleton applies to SPS OS itself and imported/existing client applications, does not require modifying client/project repositories, keeps export / write-back to project repositories as a separate future Product Owner-approved milestone, and leaves Beauty Client PRO as a future candidate without inspection or modification. No runtime files are created in this milestone, and no TypeScript types or source code are implemented here.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map storage skeleton only.

**Allowed Implementation Scope**
* record the storage skeleton contract in SSOT
* preserve MS-030.5 as the missing-state baseline
* keep project-owned docs as input evidence only
* append the required usage record

**Forbidden Scope**
* implement storage skeleton files or runtime file creation
* change storage authority, loader, or missing-state behavior
* modify runtime product behavior
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.5 - Project Map Missing State Contract Foundation`

## MS-030.5 - Project Map Missing State Contract Foundation

**Milestone**
MS-030.5 - Project Map Missing State Contract Foundation

**Type**
SPS OS / Project Map Missing State Contract Foundation

This checkpoint records the Project Map missing state contract for SPS OS. Missing operational Project Map must be explicit, not silently treated as an empty complete map. The read model state labels distinguish `available`, `missing`, `empty`, `partial`, `unreadable`, `source-unavailable`, and `error`. `UNKNOWN` is used for unknown fields rather than guessed values. Project Brain exposes blockers and warnings for missing, unreadable, unavailable, partial, and error states, while AI Workspace, Conductor, and future MAPA projektu UI show the same states as guidance or blockers instead of pretending the map is ready. Missing map may later trigger reconstruction flow, but reconstruction is not part of this milestone. Empty map means a valid operational map exists but contains no product-area blocks yet. Partial map means reconstruction or source evidence is incomplete and needs Product Owner review. Unreadable or corrupt map means the operational map exists but cannot be safely parsed or trusted. Source-unavailable means project-owned evidence cannot be read, but the operational map state stays honest. Loader error means a technical loader failure occurred and must be visible. Beauty Client PRO remains a future candidate for missing/reconstruction validation without inspection or modification.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map missing state contract only.

**Allowed Implementation Scope**
* record the missing-state contract in SSOT
* preserve MS-030.4 as the loader baseline
* keep project-owned docs as input evidence only
* append the required usage record

**Forbidden Scope**
* implement missing-state handling code
* change storage authority or loader behavior
* modify runtime product behavior
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.4 - Project Map Loader Contract Foundation`

## MS-030.4 - Project Map Loader Contract Foundation

**Milestone**
MS-030.4 - Project Map Loader Contract Foundation

**Type**
SPS OS / Project Map Loader Contract Foundation

This checkpoint records the Project Map loader contract for SPS OS. The loader triggers when SPS OS enters or opens a project, determines the stable project key using the existing SPS-owned project identity strategy, and checks the SPS-owned metadata root at `C:\SPS_OS_WORK\.sps-meta\<project-key>\project-map\`. When the operational Project Map is present, the loader reads it from the SPS-owned metadata root and returns the MS-030.3 read model shape to Project Brain. Project-owned roadmap/map/docs from the working directory or repository remain input evidence only, must not be modified, and are read only as supporting evidence. Missing operational map data is reported as `UNKNOWN` or not available rather than guessed, and any later reconstruction handoff remains a separate future flow outside this milestone. Project Brain owns the loaded operational Project Map context, while AI Workspace, Conductor, and future MAPA projektu UI consume the loaded read model through Project Brain. Loader errors must stay visible as blockers or warnings, and Beauty Client PRO remains a future candidate without inspection or modification.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map loader contract only.

**Allowed Implementation Scope**
* record the loader contract in SSOT
* preserve MS-030.3 as the read-model baseline
* keep project-owned docs as input evidence only
* append the required usage record

**Forbidden Scope**
* implement loader code
* change storage authority or read-model behavior
* modify runtime product behavior
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.3 - Project Map Read Model Contract Foundation`

## MS-030.3 - Project Map Read Model Contract Foundation

**Milestone**
MS-030.3 - Project Map Read Model Contract Foundation

**Type**
SPS OS / Project Map Read Model Contract Foundation

This checkpoint records the Project Map read model contract for SPS OS. The read model is the project-facing projection that the Project Brain, AI Workspace, and Conductor can consume from the SPS-owned metadata root. It treats the storage-authority contract from MS-030.2 as the source boundary, reads Project Map evidence without redefining storage ownership, and keeps project-owned roadmap/map/docs as preserved source evidence when present. The contract defines read-side shape and usage only; it does not add storage, editing, export, or UI implementation, and Beauty Client PRO remains a future candidate without inspection or modification.

The normalized project-map view includes project identity, map source, source authority, generated/reconstructed status, and last updated / evidence timestamp when available. It includes product-area blocks, child milestones, status values `check`, `active`, `planned`, `parked`, and `blocked`, parked ideas, improvements / enhancements, risks / gaps, related ADR / decisions, evidence sources, and the next candidate. The read model is a read-only consumer boundary: Project Brain owns the operational map context, while AI Workspace, Conductor, and future MAPA projektu UI consume but do not own the read model. It supports SPS OS itself and imported/existing client applications. If reconstructed data is incomplete, the contract uses `UNKNOWN` instead of guessing. No TypeScript types or source code are implemented in this milestone.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map read model contract only.

**Allowed Implementation Scope**
* record the read model contract in SSOT
* preserve MS-030.2 as the storage-authority baseline
* keep project-owned roadmap/map/docs as source evidence when present
* append the required usage record

**Forbidden Scope**
* implement read model code
* change storage authority or write-back behavior
* modify runtime product behavior
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.2 - Project Map Storage Authority Contract Foundation`

## MS-030.2 - Project Map Storage Authority Contract Foundation

**Milestone**
MS-030.2 - Project Map Storage Authority Contract Foundation

**Type**
SPS OS / Project Map Storage Authority Contract Foundation

This checkpoint records the storage authority contract for Project Map. The default operational Project Map lives in the SPS-owned metadata root at `C:\SPS_OS_WORK\.sps-meta\<project-key>\project-map\`. Project-owned roadmap/map/docs inside the project repository or working directory are input evidence, are not automatically modified by SPS OS, and may be read and preserved as source evidence when present. If a project lacks its own roadmap/map, SPS OS may later reconstruct a proposed Project Map into the SPS-owned metadata root. The Project Brain uses the SPS-owned Project Map as operational context, and AI Workspace, Conductor, and future MAPA projektu UI consume that context. Exporting or writing a map back into a client/project repository remains a separate future Product Owner-approved milestone. Beauty Client PRO remains a future candidate for this flow without inspection or modification, and no implementation is introduced here.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map storage authority contract only.

**Allowed Implementation Scope**
* record the storage authority contract in SSOT
* preserve project-owned roadmap/map/docs as input evidence when present
* preserve the existing milestone chronology
* append the required usage record

**Forbidden Scope**
* implement filesystem/storage logic
* change runtime product behavior
* inspect or modify Beauty Client PRO
* modify client repositories or working directories
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.1 - Project Map Inventory Contract Foundation`

## MS-030.1 - Project Map Inventory Contract Foundation

**Milestone**
MS-030.1 - Project Map Inventory Contract Foundation

**Type**
SPS OS / Project Map Inventory Contract Foundation

This checkpoint records the minimum Project Map inventory contract. A map item can represent a large product area / major MS block or a small MS / child milestone, carry a status of `check`, `active`, `planned`, `parked`, or `blocked`, and include a title or name, product area, summary, evidence source, related SSOT documents, related ADR / decision contracts, completed items, parked ideas, improvements / enhancements, risks / gaps, and the next candidate. The contract applies to SPS OS and imported/existing client applications, does not depend on a perfect roadmap, preserves an existing roadmap/map when present, and supports later reconstruction from application evidence if no map exists. Schema files, UI, parsers, scanners, and reconstruction logic remain out of scope, and MS-030.0 remains the preceding source/reconstruction contract baseline.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map inventory contract only.

**Allowed Implementation Scope**
* record the Project Map inventory contract in SSOT
* preserve an existing roadmap/map when present
* describe later reconstruction from application evidence when no map exists
* keep the milestone chronology intact
* append the required usage record

**Forbidden Scope**
* implement schema files, UI, parsers, scanners, or reconstruction logic
* change runtime product behavior
* inspect or modify Beauty Client PRO
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-030.0 - Project Map Source and Reconstruction Contract Foundation`

## MS-030.0 - Project Map Source and Reconstruction Contract Foundation

**Milestone**
MS-030.0 - Project Map Source and Reconstruction Contract Foundation

**Type**
SPS OS / Project Map and Milestone Intelligence Contract Foundation

This checkpoint records the Product Owner contract that Project Map is a first-class Project Brain context module. SPS OS should load a project map from the working directory / repository when entering a project, and SPS OS, Project Brain, AI Workspace, and Conductor should use the map to understand what belongs where. It should preserve an existing roadmap/map when one is present, or reconstruct a proposed map from the existing application when one is absent. Implemented foundations/features should be marked `check`, missing future work should be marked `planned` or `blocked`, parked ideas and improvements should stay attached to the relevant product-area block, Beauty Client PRO remains a future reconstruction candidate without inspection or modification, and further MS-029 layout work stays paused after MS-029.0 / MS-029.1.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Project Map and Milestone Intelligence contract only.

**Allowed Implementation Scope**
* record the project map source and reconstruction contract in SSOT
* load or preserve a project map from the working directory / repository
* reconstruct a proposed project map when one is absent
* mark implemented foundations/features as `check`
* mark missing future work as `planned` or `blocked`
* keep parked ideas and improvements attached to the relevant product-area block
* preserve the existing milestone chronology
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* implement source-map extraction or reconstruction logic
* change runtime product behavior
* inspect or modify Beauty Client PRO
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-029.1 - Milestone Map and Parked Ideas Visibility Foundation`

## MS-029.1 - Milestone Map and Parked Ideas Visibility Foundation

**Milestone**
MS-029.1 - Milestone Map and Parked Ideas Visibility Foundation

**Type**
SPS OS / Milestone Map Visibility Foundation

This checkpoint records the Product Owner direction for a future SPS OS milestone map that shows larger product milestone blocks with `check`, `active`, `planned`, `parked`, and `blocked` status labels and keeps parked ideas, improvements, and future enhancements visible under the relevant block/MS instead of losing them in chat history.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Milestone/block map visibility direction only.

**Allowed Implementation Scope**
* record the milestone/block map direction in SSOT
* keep parked ideas visible under the relevant block/MS
* preserve the existing milestone chronology
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* implement the milestone map UI
* change runtime product behavior
* change color or theme direction
* change app version
* commit / push actions

**Dependencies**
* closed `MS-029.0 - SPS OS Layout System First Implementation Foundation`
* closed `MS-028.74 - AI Workspace Layout Direction Foundation`

## MS-029.0 - SPS OS Layout System First Implementation Foundation

**Milestone**
MS-029.0 - SPS OS Layout System First Implementation Foundation

**Type**
SPS OS / Layout System First Implementation Foundation

This checkpoint records the first real SPS OS layout system implementation based on the Product Owner sketch. The layout now keeps the top project workspace band, the section/navigation band below it, the main workspace split between AI chat and Codex, and a separate project context/value/description panel while preserving the existing AI Workspace behavior and leaving colors/theme unchanged.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
SPS OS layout system first implementation.

**Allowed Implementation Scope**
* implement the minimal AI Workspace layout change in the page surface
* preserve existing AI Workspace behavior, data loading, and diagnostics
* keep the layout responsive on desktop and mobile
* keep color and theme unchanged
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* change AI engine, Project Brain, task, knowledge, conductor, API, filesystem, or storage logic
* redesign colors or theme
* introduce new dependencies
* commit / push actions

**Dependencies**
* closed `MS-028.74 - AI Workspace Layout Direction Foundation`

## MS-028.74 - AI Workspace Layout Direction Foundation

**Milestone**
MS-028.74 - AI Workspace Layout Direction Foundation

**Type**
AI Workspace / Project Workspace Layout Direction Foundation

This checkpoint records the Product Owner layout direction decision for the future AI Workspace / Project Workspace surface. The direction keeps the top project workspace band, the section/navigation band beneath it, the main work area split between AI chat and Codex, and a project value / description context panel, while explicitly leaving layout implementation for a later milestone.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
AI Workspace layout direction decision only.

**Allowed Implementation Scope**
* record the Product Owner layout direction decision in SSOT
* keep the milestone docs-only
* preserve the current color/theme direction
* defer layout implementation to a future milestone
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* implement the AI Workspace / Project Workspace layout
* change runtime product behavior
* change app version
* alter colors or theme direction
* commit / push actions

**Dependencies**
* closed `MS-028.73 - Codex Report Copy-Block Compliance Guard Foundation`

## MS-028.73 - Codex Report Copy-Block Compliance Guard Foundation

**Milestone**
MS-028.73 - Codex Report Copy-Block Compliance Guard Foundation

**Type**
Codex Report / Communication Contract Foundation

This checkpoint makes the expected Codex report envelope explicit and machine-reviewable by requiring one clean copy-ready fenced block with exact start/end markers, no escaped markers, and no loose Markdown outside the block. It keeps self-reported report compliance tied to the actual rendered block rather than the presence of a PASS string alone.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Codex report copy-block compliance.

**Allowed Implementation Scope**
* clarify the canonical Codex report envelope in the authoritative operating charter
* require exact literal start/end markers for copy-ready reports
* treat escaped markers and loose Markdown outside the block as non-compliant
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* add a Codex runner or parser
* change app version
* redesign AI Workspace or Project Brain
* change runtime product behavior
* commit / push actions

**Dependencies**
* closed `MS-028.73a - AI Workspace Knowledge Profile Parity Foundation`

## MS-028.73a - AI Workspace Knowledge Profile Parity Foundation

**Milestone**
MS-028.73a - AI Workspace Knowledge Profile Parity Foundation

**Type**
Knowledge / Project Brain Parity Foundation

This checkpoint keeps the AI Workspace default knowledge list aligned with canonical server-backed Project Brain truth by showing canonical knowledge only when it is available and using browser-local knowledge only as a recovery fallback when the server knowledge read fails.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
AI Workspace knowledge profile parity.

**Allowed Implementation Scope**
* keep the default AI Workspace knowledge list canonical when server-backed knowledge is available
* preserve browser-local knowledge as recovery fallback only when canonical knowledge cannot be read
* keep task fallback alignment and project API rebinding intact
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* browser-data deletion
* browser data migration
* runtime UI redesign
* broad Project Brain refactor
* app version changes
* commit / push actions

**Dependencies**
* closed `MS-028.72 - AI Workspace Task Fallback Alignment After Project Rebinding Foundation`

## MS-028.72 - AI Workspace Task Fallback Alignment After Project Rebinding Foundation

**Milestone**
MS-028.72 - AI Workspace Task Fallback Alignment After Project Rebinding Foundation

**Type**
Task / Project Brain Alignment Foundation

This checkpoint keeps the AI Workspace task list aligned after project rebinding by reading the canonical `<working-directory-slug>--<shortProjectId>` task store first and using the `projectId`-only task store only as a legacy recovery path if the canonical root is unavailable.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
AI Workspace task fallback alignment.

**Allowed Implementation Scope**
* keep the AI Workspace task list readable after project rebinding
* align task store resolution with the existing canonical metadata root path and a narrow legacy recovery path
* preserve the existing browser-side task load flow
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* browser-data deletion
* repo-wide cleanup
* runtime UI redesign
* broad Project Brain refactor
* app version changes
* commit / push actions

**Dependencies**
* closed `MS-028.71 - Project API Filesystem Rebinding Fallback Foundation`

## MS-028.71 - Project API Filesystem Rebinding Fallback Foundation

**Milestone**
MS-028.71 - Project API Filesystem Rebinding Fallback Foundation

**Type**
Server / Filesystem Rebinding Foundation

This checkpoint lets `/api/projects/[id]` recover the known Beauty Client PRO project from the SPS-owned workspace manifest when the server registry misses it, so AI Workspace can resolve the canonical server project instead of falling back to browser-local project truth for the known project.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
Project API filesystem rebinding fallback.

**Allowed Implementation Scope**
* recover a known project from the SPS-owned workspace manifest when the server registry misses it
* align project API lookup with the existing task filesystem recovery pattern where safe
* keep AI Workspace on the canonical server project path for the known Beauty Client PRO project
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* browser-data deletion
* repo-wide cleanup
* runtime UI redesign
* broad Project Brain refactor
* app version changes
* commit / push actions

**Dependencies**
* closed `MS-028.70 - AI Workspace Project Identity Divergence Instrumentation Foundation`

## MS-028.70 - AI Workspace Project Identity Divergence Instrumentation Foundation

## MS-028.70 - AI Workspace Project Identity Divergence Instrumentation Foundation

**Milestone**
MS-028.70 - AI Workspace Project Identity Divergence Instrumentation Foundation

**Type**
Diagnostic / Instrumentation Milestone

This checkpoint adds the smallest controlled diagnostic surface needed to compare the route project id, the server project response, task and knowledge counts, and the branch used by AI Workspace so the remaining normal-vs-incognito divergence can be observed without guessing or deleting browser data.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
AI Workspace project identity divergence instrumentation.

**Allowed Implementation Scope**
* instrument the AI Workspace project context derivation path
* report the route project id, project response, task count, knowledge count, and branch used
* keep the diagnostic surface developer-only or test-driven
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* browser-data deletion
* repo-wide cleanup
* runtime UI redesign
* broad Project Brain refactor
* app version changes
* commit / push actions

**Dependencies**
* closed `MS-028.69 - AI Workspace Knowledge Server Fallback Alignment Foundation`

## MS-028.69 - AI Workspace Knowledge Server Fallback Alignment Foundation

**Milestone**
MS-028.69 - AI Workspace Knowledge Server Fallback Alignment Foundation

**Type**
Documentation / Knowledge Fallback Alignment Milestone

This checkpoint keeps AI Workspace knowledge and recovered memory aligned with server-backed Project Brain state by preferring the canonical browser-server knowledge entries over browser-local fallback content whenever the project context is available, while preserving localStorage only as a recovery fallback when server-backed knowledge is truly unavailable.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
AI Workspace knowledge fallback alignment.

**Allowed Implementation Scope**
* confirm the browser/local precedence boundary for AI Workspace knowledge
* keep server-backed knowledge authoritative when it is available
* preserve localStorage only as a recovery fallback when server-backed knowledge is unavailable
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* browser-data deletion
* repo-wide cleanup
* runtime UI redesign
* broad Project Brain refactor
* app version changes
* commit / push actions

**Dependencies**
* closed `MS-028.68 - AI Workspace Project Brain Browser Profile Divergence Diagnosis Foundation`

MS-028.68 - AI Workspace Project Brain Browser Profile Divergence Diagnosis Foundation

## MS-028.68 - AI Workspace Project Brain Browser Profile Divergence Diagnosis Foundation

**Milestone**
MS-028.68 - AI Workspace Project Brain Browser Profile Divergence Diagnosis Foundation

**Type**
Documentation / Browser Profile Divergence Milestone

This checkpoint confirms the remaining AI Workspace browser-profile divergence boundary by showing that the browser context can still fall back to local Project Brain state when the server project reader is unavailable, while tasks continue to read from the fresh browser/server task boundary. Knowledge and recovered memory stay profile-dependent until a safe shared reload boundary is confirmed.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
AI Workspace browser-profile divergence diagnosis.

**Allowed Implementation Scope**
* confirm the exact source boundary for the remaining browser-profile divergence
* inspect localStorage/project context fallback and browser-side Project Brain/knowledge merge behavior
* synchronize the SSOT control files
* append the required usage record
* apply a minimal fix only if the source boundary is confirmed and safe

**Forbidden Scope**
* browser-data deletion
* repo-wide cleanup
* runtime UI redesign
* broad Project Brain refactor
* commit / push actions

**Dependencies**
* closed `MS-028.67 - AI Workspace Browser State Consistency Diagnosis Foundation`

## MS-028.67 - AI Workspace Browser State Consistency Diagnosis Foundation

**Milestone**
MS-028.67 - AI Workspace Browser State Consistency Diagnosis Foundation

**Type**
Documentation / Browser State Consistency Milestone

This checkpoint confirms the AI Workspace browser state boundary by forcing fresh project, task, and knowledge reads so normal and incognito browser contexts converge on the same canonical project truth instead of profile-specific cached responses.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
AI Workspace browser-state consistency diagnosis.

**Allowed Implementation Scope**
* confirm the exact source boundary for the AI Workspace browser-state divergence
* correct the browser-side fetch boundary when the divergence is cache-related
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* repo-wide state cleanup
* runtime UI redesign
* broad Project Brain refactor
* browser-data deletion
* commit / push actions

**Dependencies**
* closed `MS-028.66 - Session Handoff Encoding Source Boundary Diagnosis Foundation`

## MS-028.66 - Session Handoff Encoding Source Boundary Diagnosis Foundation

**Milestone**
MS-028.66 - Session Handoff Encoding Source Boundary Diagnosis Foundation

**Type**
Documentation / Session Boundary Milestone

This checkpoint confirms the source boundary for the Session 090 handoff mojibake, corrects the permanent Next Chat Prompt contract text in the session handoff README, and keeps the session handoff / session package boundary readable and traceable with the smallest safe docs-only scope.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
Session handoff encoding source boundary diagnosis.

**Allowed Implementation Scope**
* confirm the exact source boundary for the session handoff mojibake
* correct the matching handoff contract text when the boundary is local and safe
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* repo-wide mojibake cleanup
* runtime source changes
* UI text changes
* generator refactors
* commit / push actions

**Dependencies**
* closed `MS-028.65 - Linear App Version Policy Correction Foundation`

## MS-028.62 - Mojibake / Krzaczki Cleanup Batch 2 Foundation

**Milestone**
MS-028.62 - Mojibake / Krzaczki Cleanup Batch 2 Foundation

**Type**
Product Milestone

This checkpoint corrects the next visible mojibake / krzaczki area in the SPS OS Polish UI with the smallest safe cleanup scope, preserving wording and behavior while restoring readable Polish characters in the selected project creation surface and its focused test.

**Contract Status**
APPROVED

**Publication Status**
READY FOR PUBLICATION

**Milestone Status**
COMPLETED / VERIFIED

**Active**
Visible Polish character cleanup only.

**Allowed Implementation Scope**
* correct confirmed mojibake in the selected visible Polish UI surface
* correct confirmed mojibake in the directly affected targeted test when string expectations change
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* wording redesign
* broad localization work
* component refactors
* behavior changes
* Project Brain / Conductor / AI Workspace logic changes
* Git/GitHub logic changes
* storage changes

**Dependencies**
* closed `MS-028.61 - Mojibake / Krzaczki Cleanup Foundation`

## MS-028.61 - Mojibake / Krzaczki Cleanup Foundation

**Milestone**
MS-028.61 - Mojibake / Krzaczki Cleanup Foundation

**Type**
Product Milestone

This checkpoint corrects obvious mojibake / krzaczki in the visible SPS OS Polish text with the smallest safe cleanup scope, preserving wording and behavior while restoring readable Polish characters in the affected UI and documentation surfaces.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Visible Polish character cleanup only.

**Allowed Implementation Scope**
* correct confirmed mojibake in visible Polish UI text
* correct confirmed mojibake in directly affected tests when string expectations change
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* wording redesign
* broad localization work
* component refactors
* behavior changes
* Project Brain / Conductor / AI Workspace logic changes
* Git/GitHub logic changes
* storage changes

**Dependencies**
* closed `MS-028.60 - AI Workbench Handoff Panel Live Use Trial Foundation`

## MS-028.60 - AI Workbench Handoff Panel Live Use Trial Foundation

**Milestone**
MS-028.60 - AI Workbench Handoff Panel Live Use Trial Foundation

**Type**
Product Milestone

This checkpoint confirms the existing AI Workbench handoff panel can be used as a live-use trial surface: it is visible in AI Workspace, copy-ready, contains the expected role / SSOT / scope / verification / reporting fields, remains static, does not execute Codex work, and does not mutate Project Brain or repository state by itself.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Live-use trial foundation only.

**Allowed Implementation Scope**
* confirm the visible AI Workspace handoff panel stays copy-ready
* confirm the expected role / SSOT / scope / verification / reporting fields are present
* confirm the panel remains static and non-executable
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* Codex execution inside the app
* repository mutation from UI
* Project Brain storage mutation from the panel
* AI Workspace redesign or broad refactor
* shell execution from UI
* commit / push / merge / PR automation

**Dependencies**
* closed `MS-028.59 - AI Workbench Codex Handoff Operating Rules Fields Foundation`

## MS-028.59 - AI Workbench Codex Handoff Operating Rules Fields Foundation

**Milestone**
MS-028.59 - AI Workbench Codex Handoff Operating Rules Fields Foundation

**Type**
Product Milestone

This checkpoint extends the static AI Workbench handoff template with a compact `Zasady pracy:` section and keeps the copied block aligned with the visible panel while remaining static, copy-ready, and non-executable.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Operating rules template checkpoint only.

## MS-028.58 - AI Workbench Manual Context Fill Guidance Foundation

**Milestone**
MS-028.58 - AI Workbench Manual Context Fill Guidance Foundation

**Type**
Product Milestone

This checkpoint adds a short manual-fill guidance section beside the static AI Workbench handoff template. The guidance explains where to copy `Session Identity`, `Repository`, `Cel`, `Zakres`, `Dozwolone pliki`, `Zakazane pliki`, and `Weryfikacja` from while keeping the panel read-only and static.

## MS-028.57 - AI Workbench Handoff Panel Usability Review Foundation

**Milestone**
MS-028.57 - AI Workbench Handoff Panel Usability Review Foundation

**Type**
Product Milestone

This checkpoint reviews the static AI Workbench handoff panel after MS-028.53 through MS-028.56 and records that it remains compact, readable, and safely non-executable. The panel is usable as a copy-ready handoff surface, the CTA is clear, and no auto-fill or generator behavior is introduced.

## MS-028.56 - AI Workbench Project Context Read-Only Hint Foundation

**Milestone**
MS-028.56 - AI Workbench Project Context Read-Only Hint Foundation

**Type**
Product Milestone

This checkpoint adds a compact read-only hint next to the static AI Workbench handoff template. The hint explains where the Product Owner should manually take `Session Identity`, `Repository`, `Zakres`, and `Weryfikacja` values from, while keeping the template static and copy-ready with no auto-fill.

## MS-028.55 - AI Workbench Handoff Template Context Fields Foundation

**Milestone**
MS-028.55 - AI Workbench Handoff Template Context Fields Foundation

**Type**
Product Milestone

This checkpoint extends the static AI Workbench handoff template with the core SPS OS context fields and keeps the template copy-ready. The visible panel and copied block now include `Session Identity:`, `Repository:`, `Cel:`, `Zakres:`, `Dozwolone pliki:`, `Zakazane pliki:`, and `Weryfikacja:` while remaining static and compact.

## MS-028.54 - AI Workbench Handoff Copy Action Foundation

**Milestone**
MS-028.54 - AI Workbench Handoff Copy Action Foundation

**Type**
Product Milestone

This checkpoint adds a compact `Kopiuj handoff` action to the existing AI Workbench handoff panel. The copy action writes the static Codex handoff block to the clipboard, shows a copied state, and keeps AI Workspace behavior unchanged.

## MS-028.52 - TypeScript Baseline Recovery Version Publication Foundation

**Milestone**
MS-028.52 - TypeScript Baseline Recovery Version Publication Foundation

**Type**
Product Milestone

This checkpoint records the recovered TypeScript baseline after MS-028.46 through MS-028.51 and bumps the visible app version marker to `1.028.52` without adding features or changing product behavior.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Version publication checkpoint only.

## MS-028.51 - Project Settings TypeScript Nullability Recovery Foundation

**Milestone**
MS-028.51 - Project Settings TypeScript Nullability Recovery Foundation

**Type**
Product Milestone

This milestone restores the Project Settings type contract by adding the missing `ProjectSourceWorkingTreeState` import and narrowing nullable `project` paths in `src/app/projects/[id]/settings/page.tsx` without changing the page UX, source-status semantics, or Git/GitHub execution boundaries.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Minimal nullability recovery only.

## MS-028.50 - Working Branch Setup Mode Type Recovery Foundation

**Milestone**
MS-028.50 - Working Branch Setup Mode Type Recovery Foundation

**Type**
Product Milestone

This milestone restores the working-branch setup route contract by narrowing the `branchWorkMode` value passed into `src/app/api/projects/[id]/working-branch/setup/route.ts` so the helper only receives the exact `"working-branch"` mode it requires, without changing Git/GitHub execution boundaries or Project Settings behavior.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Minimal type-shape recovery only.

## MS-028.49 - AI Generate Project Context Result Shape Recovery Foundation

**Milestone**
MS-028.49 - AI Generate Project Context Result Shape Recovery Foundation

**Type**
Product Milestone

This milestone restores the AI generate project-context result contract by adding the required `projectId` field to the `project-not-found` result shape in `src/app/api/projects/[id]/ai/generate/route.ts` without changing AI generation logic or the Project Brain boundary.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
Minimal type-shape recovery only.

## MS-028.48 - AI Workspace Literal Label Type Recovery Foundation

**Milestone**
MS-028.48 - AI Workspace Literal Label Type Recovery Foundation

**Type**
Product Milestone

This milestone restores the AI Workspace literal label contract by changing the three mismatched labels in `src/lib/ai-workspace-engine/engine.ts` to match the existing Polish literal unions.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Recover the minimal AI Workspace label type contract without changing the state model or broader AI Workspace architecture.

**Product Outcome**
`src/lib/ai-workspace-engine/engine.ts` now compiles for the targeted literal labels while preserving existing behavior and the existing Polish label contract.

**Implementation Note**
This milestone is label-recovery only and does not change runtime behavior beyond the required label values.

**Dependencies**
MS-028.47 - Project Delete Validation Summary Type Recovery Foundation

**Implementation Scope**
AI Workspace Literal Label Type Recovery Foundation.

## MS-028.47 - Project Delete Validation Summary Type Recovery Foundation

**Milestone**
MS-028.47 - Project Delete Validation Summary Type Recovery Foundation

**Type**
Product Milestone

This milestone restores the missing `ProjectDeleteValidationSummary` type symbol used by `src/lib/project/server.ts` so the project-delete validation helpers can compile again without changing execution behavior.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Recover the missing project-delete validation type symbol with the smallest safe change.

**Product Outcome**
`src/lib/project/server.ts` now compiles with the recovered `ProjectDeleteValidationSummary` type symbol while keeping delete/re-import semantics unchanged.

**Implementation Note**
This milestone is type-recovery only and does not change runtime behavior.

**Dependencies**
MS-028.46 - TypeScript Baseline Recovery Diagnosis Foundation

**Implementation Scope**
Project Delete Validation Summary Type Recovery Foundation.

## MS-028.46 - TypeScript Baseline Recovery Diagnosis Foundation

**Milestone**
MS-028.46 - TypeScript Baseline Recovery Diagnosis Foundation

**Type**
Diagnostic Milestone

This milestone captures the exact TypeScript baseline blockers currently reported by `npx.cmd tsc --noEmit` without fixing them.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / DIAGNOSED / PUBLISHED / CLOSED

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
Record the current TypeScript baseline blockers and identify one minimal future fix candidate.

**Product Outcome**
The repository now contains a concise diagnosis of the current TypeScript blockers, grouped by file and category, plus one minimal first fix candidate for a follow-up milestone.

**Implementation Note**
This milestone is diagnosis-only and does not change product behavior.

**Dependencies**
MS-028.45 - Codex Operating Charter and Copy-Block Communication Foundation

**Implementation Scope**
TypeScript Baseline Recovery Diagnosis Foundation.

## MS-028.45 - Codex Operating Charter and Copy-Block Communication Foundation

**Milestone**
MS-028.45 - Codex Operating Charter and Copy-Block Communication Foundation

**Type**
Product Milestone

This milestone adds a permanent Codex operating charter that defines role separation, minimal patch behavior, SSOT rules, and the copy-ready handoff and report block formats used in SPS OS.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Make the Codex operating rules explicit and reusable for future SPS OS handoffs.

**Product Outcome**
The repository now exposes a concise charter that explains who Codex is, how Codex must behave, and how Chief Architect -> Codex and Codex -> Chief Architect communication blocks must be formatted.

**Implementation Note**
This milestone is documentation-only and does not change product behavior.

**Dependencies**
MS-028.44 - Project AI Workbench Direction Foundation

**Implementation Scope**
Codex Operating Charter and Copy-Block Communication Foundation.

## MS-028.44 - Project AI Workbench Direction Foundation

**Milestone**
MS-028.44 - Project AI Workbench Direction Foundation

**Type**
Product Milestone

This milestone adds a compact AI Workbench direction block to the existing AI Workspace so the project UI makes the current boundary visible: AI Workspace is the project chat/work window, Codex stays handoff-based and copy-ready, Project Brain provides the project context, and Conductor points to the next safe step. It does not add Codex execution or repo automation.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Make the AI Workspace direction understandable in the project UI without changing behavior, repo automation, or Project Brain storage.

**Product Outcome**
The project AI surface now shows a small AI Workbench boundary note that explains the chat/work window, the handoff-based Codex boundary, the Project Brain context source, and the Conductor guidance boundary.

**Implementation Note**
This milestone is UI-direction only and stays within the existing AI Workspace surface.

**Dependencies**
MS-028.43 - Operator Guide Delete/Re-import Foundation

**Implementation Scope**
Project AI Workbench Direction Foundation.

**Next Product Milestone**
NONE / Product Owner decision required

**Allowed Scope**
* add a compact AI Workbench direction block to the existing AI Workspace
* reuse the existing copy-ready handoff-oriented affordance nearby by reference only
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* Codex API integration
* command execution from UI
* repo mutation from UI
* Project Brain storage changes
* AI Workspace architecture rewrite
* large layout refactor
* repo automation

## MS-028.43 - Operator Guide Delete/Re-import Foundation

**Milestone**
MS-028.43 - Operator Guide Delete/Re-import Foundation

**Type**
Product Milestone

This milestone publishes a concise operator guide for safe project delete, browser/localStorage cleanup, Project Brain metadata root handling, working directory / repo checkout handling, and safe re-import / re-open work. It keeps the real Beauty Client PRO destructive delete postponed and does not change application behavior.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Publish a short operator guide that explains the safe delete boundary and the minimum reopen flow after the MS-028.35 to MS-028.42a delete/re-import work.

**Product Outcome**
Operators now have one practical guide for safe project removal, safe re-import, and the post-reimport checklist without changing product behavior.

**Implementation Note**
This milestone is documentation-only and only synchronizes the SSOT control files plus the operator guide.

**Dependencies**
MS-028.42a - App Version Marker 1.028.42 Publication

**Implementation Scope**
Operator Guide Delete/Re-import Foundation.

**Next Product Milestone**
NONE / Product Owner decision required

**Allowed Scope**
* add the operator guide in the docs tree
* synchronize the SSOT control files
* append the required usage record

**Forbidden Scope**
* application behavior changes
* product code changes
* real destructive delete of Beauty Client PRO
* real clone, checkout, branch, merge, commit, push, or PR actions

## MS-028.42a - App Version Marker 1.028.42 Publication

**Milestone**
MS-028.42a - App Version Marker 1.028.42 Publication

**Type**
Product Milestone

This milestone publishes the controlled app version marker `1.028.42` after the delete/re-import block closes. It keeps the app version source aligned with the accepted milestone boundary and does not change AI Workspace, Project Brain, Core Doctrine, or delete/re-import behavior.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Publish the visible app version marker `1.028.42` after the delete/re-import block has been closed by the Product Owner.

**Product Outcome**
The repository now exposes `1.028.42` as the canonical app version marker and keeps the visible badge/test aligned with that value.

**Implementation Note**
This milestone only updates the app version marker and the corresponding SSOT records.

**Dependencies**
MS-028.42 - Delete/Re-import Live Trial Product Owner Execution Decision

**Implementation Scope**
App Version Marker 1.028.42 Publication.

**Next Product Milestone**
NONE / Product Owner decision required

**Allowed Scope**
* update the controlled app version source to `1.028.42`
* keep the visible version badge/test aligned with the controlled version source
* synchronize the SSOT records for the version publication

**Forbidden Scope**
* AI Workspace changes
* Project Brain changes
* Core Doctrine changes
* delete/re-import behavior changes
* Workflow Engine changes
* task store changes
* knowledge store changes
* conductor store changes
* Codex panel work

## MS-028.38 - Delete/Re-import Manual Validation Run Foundation

**Milestone**
MS-028.38 - Delete/Re-import Manual Validation Run Foundation

**Type**
Product Milestone

This milestone closes the fixture-backed manual validation of the delete/re-open path without introducing a full product re-import wizard. The repository confirms that safe detach stays nondestructive, browser/localStorage cleanup stays nondestructive, metadata root delete works on a temp fixture, working directory / checkout delete works on a temp fixture, and a delete -> recreate/re-open -> rediscovery path works on the fixture. The milestone keeps the real Beauty Client PRO data untouched and does not add UI, API, or Codex panel changes.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a controlled manual validation confirmation that the destructive delete path and fixture-backed rediscovery path are operationally readable and safe before any future product re-import decision.

**Product Outcome**
The project delete flow is validated end-to-end on a fixture without touching live Beauty Client PRO data, and the remaining full re-import capability stays as a separate Product Owner decision.

**Implementation Note**
This milestone is validation-only. It does not introduce a full re-import wizard, UI changes, API changes, or Codex panel work.

**Dependencies**
MS-028.37 - Project Delete UI Execution Wiring Foundation

**Implementation Scope**
Delete/Re-import Manual Validation Run Foundation.

**Next Product Milestone**
MS-028.39 - Project Re-import/Re-open Action Foundation

**Allowed Scope**
* validate safe detach on a fixture
* validate browser/localStorage cleanup on a fixture
* validate metadata root delete on a fixture
* validate working directory / checkout delete on a fixture
* validate delete -> recreate/re-open -> rediscovery on a fixture

## MS-028.39 - Project Re-import/Re-open Action Foundation

**Milestone**
MS-028.39 - Project Re-import/Re-open Action Foundation

**Type**
Product Milestone

This milestone adds the smallest product-facing re-import / re-open action after a project has been detached or its local browser entry has disappeared. The projects page gets a visible `Wykryj projekty z dysku` refresh action that reruns the existing filesystem discovery flow, lets the user see the discovered project again, and keeps the existing `Otwórz` and `Przypnij` actions intact.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a minimal discover-and-reopen path for filesystem projects without introducing a full import wizard or changing the discovery API surface.

**Product Outcome**
The projects page can rerun existing discovery, reveal a project that was previously detached or whose local browser entry disappeared, and open or pin the discovered project again.

**Implementation Note**
This milestone keeps the discovery API and server project helper unchanged, does not add destructive delete, and does not add a full re-import wizard or Codex panel.

**Dependencies**
MS-028.38 - Delete/Re-import Manual Validation Run Foundation

**Implementation Scope**
Project Re-import/Re-open Action Foundation.

**Next Product Milestone**
MS-028.40 - Delete/Re-import Live Project Trial Decision Foundation

**Allowed Scope**
* add a visible `Wykryj projekty z dysku` discovery refresh action on the projects page
* rerun the existing `GET /api/projects` discovery flow
* keep `Otwórz` seeding local browser state and opening the discovered project
* keep `Przypnij` attaching the discovered project locally

**Forbidden Scope**
* new import wizard
* API route changes
* server project helper changes
* destructive delete
* Codex panel work
* AI Workspace changes
* Core Doctrine changes
* task store changes
* knowledge store changes
* conductor store changes

## MS-028.40 - Delete/Re-import Live Project Trial Decision Foundation

**Milestone**
MS-028.40 - Delete/Re-import Live Project Trial Decision Foundation

**Type**
Product Milestone

This milestone records the decision contract for the first live delete/re-import trial and keeps it read-only. The settings page now includes a `Kontrakt decyzji live trial` panel that explains the approved scope, forbidden scope, abort conditions, success conditions, and rollback / odzyskanie path before any live destructive execution is attempted.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a project-facing decision foundation for the first live delete/re-import trial without performing destructive execution.

**Product Outcome**
The project settings page now exposes the live-trial decision contract next to the existing safe delete contract, so the Product Owner can confirm scope and rollback expectations before any future live destructive step.

**Implementation Note**
This milestone keeps destructive delete out of scope, does not add a live execution route, and does not change the project discovery or re-open actions.

**Dependencies**
MS-028.39 - Project Re-import/Re-open Action Foundation

**Implementation Scope**
Delete/Re-import Live Project Trial Decision Foundation.

**Next Product Milestone**
MS-028.41 - Delete/Re-import Live Trial Execution Foundation

**Allowed Scope**
* add a read-only live trial decision contract panel on the project settings page
* state the allowed delete scope, forbidden scope, abort conditions, success conditions, and rollback / odzyskanie path
* keep the panel adjacent to the existing safe delete contract

**Forbidden Scope**
* destructive delete execution
* live trial on Beauty Client PRO
* full re-import wizard
* API route changes
* project server helper changes
* AI Workspace changes
* Workflow Engine changes
* task store changes
* knowledge store changes
* conductor store changes

**Forbidden Scope**
* real delete of Beauty Client PRO
* full product re-import wizard
* UI changes
* API changes
* Codex panel work
* AI Workspace changes
* Workflow Engine refactor
* store architecture changes

## MS-028.42 - Delete/Re-import Live Trial Product Owner Execution Decision

**Milestone**
MS-028.42 - Delete/Re-import Live Trial Product Owner Execution Decision

**Type**
Product Milestone

This milestone records the Product Owner decision to keep the real destructive delete postponed. The previously validated live-trial blocked run on the real Beauty Client PRO context remains the latest execution evidence, but no destructive execution is performed in this milestone.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Validate the live trial execution gate on the real project context without performing destructive delete.

**Product Outcome**
The live trial request for Beauty Client PRO was blocked and returned `requestedActions` for metadata-root and working-directory / repo-checkout deletion, but no `deletedPaths` because `explicitProductOwnerApproval` was false.

**Implementation Note**
The live delete remains deferred. Beauty Client PRO stays intact, `C:\SPS_OS_WORK\beauty-client-pro` remains present, and `C:\SPS_OS_WORK\.sps-meta\beauty-client-pro--0d3e28cb` remains present.

**Dependencies**
MS-028.40 - Delete/Re-import Live Project Trial Decision Foundation

**Implementation Scope**
Delete/Re-import Live Trial Execution Foundation.

**Next Product Milestone**
MS-028.42a - App Version Marker 1.028.42 Publication

**Allowed Scope**
* record the Product Owner decision that live destructive delete is postponed
* keep the latest blocked live-trial evidence as the last execution reference
* keep real Beauty Client PRO data untouched

**Forbidden Scope**
* destructive delete execution
* live delete of Beauty Client PRO
* re-import wizard
* API route changes beyond the existing execution contract
* project server helper changes
* AI Workspace changes
* Workflow Engine changes
* task store changes
* knowledge store changes
* conductor store changes

## MS-028.37 - Project Delete UI Execution Wiring Foundation

**Milestone**
MS-028.37 - Project Delete UI Execution Wiring Foundation

**Type**
Product Milestone

This milestone wires the existing project delete gate to the browser-accessible delete execution route for destructive variants only. The UI keeps `Odpinanie z SPS OS` as the safe default, requires the exact project name plus an explicit Product Owner approval checkbox for destructive variants, and surfaces the returned result status together with `deletedPaths` and `blockedReasons`. The milestone keeps real Beauty Client PRO data untouched and does not add re-import or Codex panel behavior.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide the narrowest safe browser/UI wiring for destructive delete execution without enabling accidental disk removal.

**Product Outcome**
The project page can route destructive delete choices to the server-side execution helper and render the execution result for blocked, dry-run, deleted, or partial outcomes.

**Implementation Note**
This milestone keeps safe detach unchanged, uses the existing guarded delete helper, and does not introduce re-import or Codex panel work.

**Dependencies**
MS-028.36 - Project Delete Disk Execution Foundation

**Implementation Scope**
Project Delete UI Execution Wiring Foundation.

**Next Product Milestone**
MS-028.38 - Delete/Re-import Manual Validation Run Foundation

**Allowed Scope**
* add browser-accessible route for destructive delete execution
* wire the project page delete gate to the route only for destructive variants
* require exact project name and explicit Product Owner approval for destructive variants
* surface blocked / dry-run / deleted / partial results with deleted paths and blocked reasons

## MS-028.36 - Project Delete Disk Execution Foundation

**Milestone**
MS-028.36 - Project Delete Disk Execution Foundation

**Type**
Product Milestone

This milestone adds the smallest safe server-side foundation for destructive project disk deletion. The helper validates `projectId`, `projectName`, exact `typedConfirmation`, and `explicitProductOwnerApproval === true` before any destructive execution is allowed. The helper stays limited to the Project Brain metadata root and the working directory / repo checkout, defaults to dry-run or validation behavior, and keeps real Beauty Client PRO data untouched.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a guarded server-side foundation for disk deletion without enabling accidental removal of live SPS OS data.

**Product Outcome**
The delete execution helper can validate destructive requests, produce dry-run or blocked summaries, and execute only on temp fixtures when explicit approval and exact confirmation are supplied.

**Implementation Note**
This milestone keeps the execution path separate from UI wiring, re-import, and Codex panel work. It uses test-only path overrides for safe fixture coverage and does not touch the real Beauty Client PRO directories.

**Dependencies**
MS-028.35 - Project Delete Execution Confirmation Foundation

**Implementation Scope**
Project Delete Disk Execution Foundation.

**Next Product Milestone**
MS-028.37 - Project Delete UI Execution Wiring Foundation

**Allowed Scope**
* add server-side destructive delete execution helper
* validate projectId, projectName, exact typed confirmation, and Product Owner approval
* support Project Brain metadata root and working directory / repo checkout deletion
* prefer dry-run / validation summaries before execution
* support test-only fixture path overrides

**Forbidden Scope**
* real delete of Beauty Client PRO
* real delete of any live project without explicit Product Owner approval
* re-import flows
* UI wiring
* Codex panel work
* Workflow Engine refactor
* AI Workspace changes
* Core Doctrine changes
* project knowledge store changes
* task store changes

## MS-028.33 - AI Workspace Metadata Context Loader Foundation

**Milestone**
MS-028.33 - AI Workspace Metadata Context Loader Foundation

**Type**
Product Milestone

This milestone adds a controlled AI Workspace metadata context loader that summarizes the available project metadata modules and clearly marks repository files as not included.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a controlled AI Workspace metadata summary without analyzing repo files or pretending to expose repository contents.

**Product Outcome**
The AI Workspace generation route now receives a compact metadata context summary that reports the available Project Brain modules, the global Core Doctrine status, and the explicit `repoFilesIncluded: false` boundary.

**Implementation Note**
This milestone keeps the metadata summary separate from repo analysis, does not broaden the AI Workspace into file ingestion, and does not change the project page.

**Dependencies**
MS-028.32 - Conductor State UI Wiring Foundation

**Implementation Scope**
AI Workspace Metadata Context Loader Foundation.

**Next Product Milestone**
MS-028.36 - Project Delete Disk Execution Foundation

**Allowed Scope**
* add controlled AI Workspace metadata context loader
* summarize available Project Brain metadata modules
* include Core Doctrine status as a separate global summary
* mark repo files as not included
* pass metadata summary into AI generation without repo file analysis

**Forbidden Scope**
* repo file analysis
* full context ingestion
* promotion approval flow
* project page changes
* AI Workspace repo summary claims
* Workflow Engine refactor
* Core Doctrine changes
* project knowledge store changes
* task store changes
* delete/re-import flows
* Codex panel work

## MS-028.34 - Delete/Re-import Project Validation Foundation

**Milestone**
MS-028.34 - Delete/Re-import Project Validation Foundation

**Type**
Product Milestone

This milestone adds a read-only, non-destructive delete/re-import validation preview that separates project data, SPS OS removal, browser/localStorage state, Project Brain metadata root, working directory, and repo checkout. It makes clear that destructive disk deletion and re-import are separate Product Owner decisions.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a safe, read-only validation preview for delete/re-import boundaries without performing any destructive filesystem action.

**Product Outcome**
The project settings page now shows a `Bezpieczny kontrakt usuwania` preview that clearly splits the delete contract into separate resources and keeps destructive delete and re-import out of scope until the Product Owner makes a separate decision.

**Implementation Note**
This milestone keeps the preview separate from real delete execution, does not add re-import, and does not change the project page beyond the validation contract surface.

**Dependencies**
MS-028.33 - AI Workspace Metadata Context Loader Foundation

**Implementation Scope**
Delete/Re-import Project Validation Foundation.

**Next Product Milestone**
MS-028.35 - Project Delete Execution Confirmation Foundation

**Allowed Scope**
* add read-only non-destructive delete/re-import validation preview
* distinguish project, SPS OS removal, browser/localStorage, Project Brain metadata root, working directory, and repo checkout
* show metadata root as a separate resource
* require explicit Product Owner decision before any disk deletion

**Forbidden Scope**
* destructive delete
* re-import flow
* real delete button execution
* project page changes
* AI Workspace changes
* Workflow Engine refactor
* project knowledge store changes
* task store changes
* Codex panel work

## MS-028.31 - Decisions and Conductor State Store Foundation

**Milestone**
MS-028.31 - Decisions and Conductor State Store Foundation

**Type**
Product Milestone

This milestone adds project-scoped filesystem-backed decisions and conductor state stores on the SPS-owned metadata root, keeps decisions auditable in JSONL, keeps conductor state in JSON, and returns an honest empty/decision state when no project-specific conductor state exists.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Persist project-scoped decisions and conductor state without wiring the UI yet.

**Product Outcome**
The repository now stores project-scoped decisions and conductor state on the shared SPS-owned metadata root and keeps the honest empty/decision fallback when no conductor state exists.

**Implementation Note**
This milestone keeps the new project-scoped stores separate from Core Doctrine and project knowledge, does not add UI wiring, and does not refactor Workflow Engine or remove the legacy global fallback.

**Dependencies**
MS-028.30 - Core Doctrine UI Visibility Foundation

**Implementation Scope**
Decisions and conductor state store foundation.

**Next Product Milestone**
MS-028.32 - Conductor State UI Wiring Foundation

**Allowed Scope**
* add project-scoped decisions storage
* add project-scoped conductor state storage
* use the shared metadata root strategy from tasks and knowledge
* keep decisions in JSONL and conductor state in JSON
* return an honest empty/decision state when conductor state is missing

**Forbidden Scope**
* UI wiring
* Workflow Engine refactor
* AI Workspace changes
* Core Doctrine changes
* project knowledge store changes
* task store changes
* delete/re-import flows
* Codex panel work

## MS-028.30 - Core Doctrine UI Visibility Foundation

**Milestone**
MS-028.30 - Core Doctrine UI Visibility Foundation

**Type**
Product Milestone

This milestone adds the first visible Core Doctrine status block on the Home page, using the bootstrap helper to show availability, store path, and entry count for the global SPS OS doctrine store.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Make the SPS OS global doctrine visible in the app without mixing it into project-scoped knowledge or AI Workspace context.

**Product Outcome**
The Home page now explicitly shows that Core Doctrine is global SPS OS knowledge, not project knowledge, and exposes the store path and current entry count.

**Implementation Note**
The UI change keeps AI Workspace disconnected from Core Doctrine and preserves the existing client-side Home content in a separate component split.

**Dependencies**
MS-028.29a - App Version Marker 1.028.29 Publication

**Implementation Scope**
Core Doctrine UI visibility foundation.

**Next Product Milestone**
MS-028.31 - Decisions and Conductor State Store Foundation

**Allowed Scope**
* show Core Doctrine availability on Home
* call `getCoreDoctrineBootstrapStatus()`
* display the global store path and entry count
* keep the UI explicitly separate from project knowledge
* keep AI Workspace disconnected from Core Doctrine

**Forbidden Scope**
* promotion approval flow
* AI Workspace context loader changes
* decisions store wiring
* conductor store wiring
* project knowledge store changes
* task store changes
* delete/re-import flows
* Codex panel work
* OpenAI configuration changes
* persistent conversation memory
* Git/GitHub flow changes
* New Project Git intake flow
* unrelated UI or domain changes

**Sequencing**
1. MS-028.27 added the separate global Core Doctrine store.
2. MS-028.28 adds the project-scoped candidate bridge without promotion.
3. MS-028.29 can describe bootstrap visibility for the core doctrine path.

## MS-028.27 - SPS Core Doctrine Knowledge Store Foundation

**Milestone**
MS-028.27 - SPS Core Doctrine Knowledge Store Foundation

**Type**
Product Milestone

This milestone adds an SPS-owned global Core Doctrine store outside the client repo at `C:\\SPS_OS_WORK\\.sps-meta\\core\\doctrine.jsonl`, seeds a minimal auditable set of SPS OS principles, and keeps it separate from project knowledge so Project Brain project data and global doctrine do not mix.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define a durable SPS OS Core Doctrine store that preserves the system's foundation principles in a filesystem-backed, auditable runtime location without copying the full documentation set.

**Product Outcome**
The repository now writes a separate global doctrine store on disk and can seed the core principles that govern SPS OS execution while leaving project knowledge unchanged.

**Implementation Note**
This milestone does not add project knowledge promotion, decisions/conductor storage, AI Workspace context loading, or delete/re-import flows.

**Dependencies**
MS-028.25 - Project Brain Filesystem Metadata Root Foundation

**Implementation Scope**
SPS Core Doctrine knowledge store foundation.

**Next Product Milestone**
MS-028.28 - Project Knowledge Promotion Candidate Foundation

**Allowed Scope**
* define the SPS-owned global Core Doctrine store outside the client repo
* use `C:\\SPS_OS_WORK\\.sps-meta\\core\\doctrine.jsonl`
* seed a minimal auditable set of SPS OS principles
* keep core doctrine separate from project knowledge
* leave AI Workspace context loading untouched

**Forbidden Scope**
* project knowledge promotion flow
* decisions store wiring
* conductor store wiring
* AI Workspace context loader changes
* repository analysis engine
* repository file summaries or filesystem scans
* model provider changes
* OpenAI configuration changes
* persistent conversation memory
* Git/GitHub flow changes
* New Project Git intake flow
* unrelated UI or domain changes

**Sequencing**
1. MS-028.25 established the SPS-owned filesystem metadata root for project-scoped stores.
2. MS-028.26 added the project-scoped filesystem knowledge store.
3. MS-028.27 adds the separate global Core Doctrine store without mixing it into project knowledge.

## MS-028.25 - Project Brain Filesystem Metadata Root Foundation

**Milestone**
MS-028.25 - Project Brain Filesystem Metadata Root Foundation

**Type**
Product Milestone

This milestone defines the SPS-owned sidecar metadata root outside the client repo, uses the stable `<working-directory-slug>--<shortProjectId>` folder strategy, and introduces the first filesystem-backed Project Brain task store module at `tasks/open.jsonl` while keeping knowledge, decisions, conductor, AI context, and delete/re-import flows out of scope.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the SPS-owned metadata root and the first durable task-store module for Project Brain without changing client-repo contents.

**Product Outcome**
The repository now writes project task state into an SPS-owned sidecar metadata root on disk instead of keeping it only in browser/UI context, and the first module is the auditable JSONL task store at `tasks/open.jsonl`.

**Implementation Note**
This milestone does not wire knowledge, decisions, conductor, or AI context, and it does not implement delete/re-import flows.

**Dependencies**
MS-028.24 - Project Conductor Context Rebinding Foundation

**Implementation Scope**
Project Brain filesystem metadata root foundation.

**Next Product Milestone**
NONE / Product Owner decision required

**Allowed Scope**
* define the SPS-owned metadata root outside the client repo
* use `<working-directory-slug>--<shortProjectId>` for the project metadata folder
* persist tasks to `tasks/open.jsonl` as JSONL
* keep the task store auditable and project-scoped
* leave knowledge, decisions, conductor, and AI context untouched

**Forbidden Scope**
* full knowledge store wiring
* decisions store wiring
* conductor store wiring
* AI context rebinding
* delete/re-import flows
* repository analysis engine
* repository file summaries or filesystem scans
* model provider changes
* OpenAI configuration changes
* persistent conversation memory
* Git/GitHub flow changes
* New Project Git intake flow
* unrelated UI or domain changes

**Sequencing**
1. MS-028.24 removed the legacy conductor fallback from the project-facing panel without adding a full conductor engine.
2. MS-028.25 establishes the SPS-owned filesystem metadata root and the first task-store module.
3. Future Project Brain storage milestones can extend knowledge, decisions, and other contexts only after Product Owner decision.

## MS-028.24 - Project Conductor Context Rebinding Foundation

## MS-028.24 - Project Conductor Context Rebinding Foundation

**Milestone**
MS-028.24 - Project Conductor Context Rebinding Foundation

**Type**
Product Milestone

This milestone removes the legacy `MS-000.5 - Konduktor` fallback from the project-facing Conductor panel, shows an honest Polish empty/decision state when a project does not have its own conductor state, and keeps the existing project-facing workflow hint without introducing a full project-specific conductor engine.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
State the project-facing Conductor boundary honestly so users understand when the project does not yet have its own conductor state, while keeping the existing project-specific workflow hint visible.

**Product Outcome**
The project-facing Conductor panel now shows a short Polish empty/decision state instead of the legacy `MS-000.5 - Konduktor` fallback, and the visible workflow hint remains available without suggesting an active project-specific conductor engine.

**Implementation Note**
This milestone does not build a full project-specific conductor engine, does not refactor Workflow Engine, and does not change AI Workspace, persistent memory, or Git/GitHub flow behavior.

**Dependencies**
MS-028.23 - AI Workspace Repo Context Boundary and Knowledge Refresh Foundation

**Implementation Scope**
Project-facing Conductor context rebinding publication.

**Next Product Milestone**
MS-028.25 - Project Brain Filesystem Task Store Foundation

**Allowed Scope**
* remove legacy `MS-000.5 - Konduktor` from the project-facing panel
* show project-facing empty/decision state when no project-specific conductor state exists
* preserve the existing workflow hint copy on the project page
* focused test coverage for the existing project page

**Forbidden Scope**
* full project-specific conductor engine
* Workflow Engine refactor
* AI Workspace changes
* repository analysis engine
* repository file summaries or filesystem scans
* model provider changes
* OpenAI configuration changes
* persistent conversation memory
* Git/GitHub flow changes
* New Project Git intake flow
* unrelated UI or domain changes

**Sequencing**
1. MS-028.23 clarified the Project Brain boundary and removed the false save-refresh warning without adding repo analysis.
2. MS-028.24 removes the legacy conductor fallback from the project-facing panel without adding a full conductor engine.
3. MS-028.25 is the next Product Owner-selected milestone for the project brain filesystem task store foundation.

## MS-028.22 - AI Workspace Project Lookup Fix Foundation

**Milestone**
MS-028.22 - AI Workspace Project Lookup Fix Foundation

**Type**
Product Milestone

This milestone fixes the AI Workspace generate flow so the route prefers the canonical project context already assembled by the page and only falls back to server lookup when needed, preventing a rendered Beauty Client PRO workspace from failing with `Project not found.` during generation.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Keep AI Workspace generation bound to the same canonical project context that renders the page so project lookup errors do not break prompt generation for an already visible project.

**Product Outcome**
The AI Workspace page now sends the canonical `AiProjectContext` in the generate request body, and the generate route uses that canonical context before falling back to server lookup. The user-facing prompt generation remains limited to the canonical project context, while model/provider configuration and Project Brain architecture remain unchanged.

**Implementation Note**
This bugfix removes the `Project not found.` failure for the rendered AI Workspace project without introducing new AI features, persistent memory, or Git/GitHub flow changes.

**Dependencies**
MS-028.21 - Git Checkout Status Revalidation UX Foundation

**Implementation Scope**
AI Workspace project lookup fix publication.

**Allowed Scope**
* canonical AI Workspace project lookup
* request-body project context reuse
* focused test coverage for existing project generation
* existing AI Workspace prompt generation contract

**Forbidden Scope**
* model provider changes
* OpenAI configuration changes
* persistent conversation memory
* Project Brain redesign
* Git/GitHub flow changes
* New Project Git intake flow
* unrelated UI or domain changes

**Sequencing**
1. MS-028.21 publishes the checkout revalidation UX confirmation.
2. MS-028.22 fixes AI Workspace generation lookup so the rendered project and generation path share the same canonical context.
3. MS-028.23 clarifies the Project Brain boundary and visible knowledge refresh behavior without adding repo analysis.
4. Real AI feature expansion remains outside the milestone.

## MS-028.21 - Git Checkout Status Revalidation UX Foundation

**Milestone**
MS-028.21 - Git Checkout Status Revalidation UX Foundation

**Type**
Product Milestone

This milestone adds the minimal settings-page UX copy that explicitly confirms the repo status was verified from filesystem-backed state after checkout revalidation, while keeping commit/push/merge/PR and any broader refresh flow out of scope.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Confirm filesystem-backed checkout verification in the settings UX so the status panel explicitly says the repo status was verified from filesystem-derived state.

**Product Outcome**
The settings page now shows a minimal Polish copy cue that the repo status was verified from filesystem-backed revalidation, while the derived checkout status, repository context, and real Git/GitHub execution boundaries remain unchanged.

**Implementation Note**
The accepted settings-page copy makes the verification source visible without adding refresh actions, commit readiness, or new Git/GitHub execution paths.

**Dependencies**
MS-028.20 - GitHub Checkout Status Revalidation Foundation

**Implementation Scope**
UX copy publication for checkout-status revalidation feedback.

**Allowed Scope**
* minimal filesystem-backed verification copy
* existing settings-page source-status presentation
* targeted wording and test coverage
* future guidance for the already revalidated checkout status

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* secret storage
* real clone/checkout/working-branch execution
* commit
* push
* merge
* pull request
* refresh/status button flow
* unrelated UI or domain changes

**Sequencing**
1. MS-028.20 establishes filesystem-backed checkout-status revalidation.
2. MS-028.21 adds the minimal UX confirmation that this status was verified from filesystem state.
3. Real Git/GitHub execution remains outside the milestone.

## MS-028.15 - GitHub Local Clone And Working Branch Execution Foundation

**Milestone**
MS-028.15 - GitHub Local Clone And Working Branch Execution Foundation

**Type**
Product Milestone

This milestone now has an SPS OS-controlled execution route and settings action for local clone/checkout/working-branch setup. Commit/push/merge/PR remain out of scope.

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the docs-first contract for the first SPS OS-controlled local clone and working branch execution step after the local working branch action foundation.

**Product Outcome**
After the project settings store the GitHub URL, local workspace path, branch work mode, and working branch name, this milestone defines the controlled local execution step that SPS OS will eventually run. The contract requires validation of the GitHub URL, the workspace path, and the working branch name; keeps the workspace outside the SPS OS repo root; prefers `C:\SPS_OS_WORK`; and stops on blockers if the destination already exists as a conflicting git repository or remote. The contract keeps the action inside SPS OS settings and action flow rather than a manual Codex bypass. The milestone does not create commit, push, merge, or PR artifacts and does not perform sync-to-main.

**Implementation Note**
The SPS OS-controlled route, settings action, and targeted tests for local clone and working branch setup were implemented and verified after publication. Live action against Beauty Client PRO remains a separate manual verification step after publication, and commit/push/merge/PR remain out of scope.

**Dependencies**
* MS-028.14 - GitHub Local Working Branch Creation Action Foundation

**Implementation Scope**
Docs-first contract publication for the local clone and working branch execution foundation.

**Allowed Scope**
* docs publication
* GitHub URL validation wording
* local workspace path validation wording
* working branch name validation wording
* clone and checkout safety rules
* existing-repository and remote-conflict blocker guidance
* future-work guidance for the next real Git/GitHub implementation step

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* secret storage
* real clone/checkout/working-branch execution
* commit
* push
* merge
* pull request
* sync-to-main
* unrelated UI or domain changes

**Sequencing**
1. MS-028.14 defines the SPS OS-controlled local working branch creation action foundation.
2. MS-028.15 defines the SPS OS-controlled local clone and working branch execution foundation after the saved settings and action foundation are ready.
3. Real commit/push/merge/PR and sync-to-main remain blocked until later explicit Product Owner-approved milestones.

## MS-028.16 - GitHub Repo Checkout Folder Derivation Foundation

**Milestone**
MS-028.16 - GitHub Repo Checkout Folder Derivation Foundation

**Type**
Product Milestone

This milestone defines the derivation rule that separates the project workspace folder from the Git repo checkout folder. The workspace root holds the manifest-only project folder, and the repo checkout lives one level deeper in a dedicated `repo` subfolder.

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the docs-first contract for deriving a safe checkout folder when SPS OS prepares the first Git clone / working-branch flow for a manifest-only project workspace.

**Product Outcome**
If the project workspace folder already exists and contains `sps-project.json`, SPS OS must treat that folder as the project workspace folder, not the Git repo checkout folder. When the user chooses the Git clone / working-branch flow and a saved GitHub URL exists, the derived checkout folder should default to `C:\SPS_OS_WORK\<project-slug>\repo`. A manually chosen repo folder may still be respected, but it must not conflict with the manifest-only workspace folder. The milestone keeps real clone/checkout/branch execution out of scope in this docs-first step.

The milestone is now published and closed; no live clone/checkout/branch execution was performed in this milestone.

**Dependencies**
MS-028.15 - GitHub Local Clone And Working Branch Execution Foundation

**Implementation Scope**
Docs-first contract publication for repository checkout folder derivation.

**Allowed Scope**
* project workspace folder versus repo checkout folder wording
* `sps-project.json` manifest-only folder distinction
* checkout-folder derivation guidance
* manual repo-folder conflict guidance
* future-work guidance for the first real clone/setup implementation step

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* secret storage
* real clone/checkout/working-branch execution
* commit
* push
* merge
* pull request
* unrelated UI or domain changes

**Sequencing**
1. MS-028.15 defines the first SPS OS-controlled local clone and working branch execution foundation.
2. MS-028.16 defines the safe derivation rule that keeps the manifest-only workspace folder separate from the Git repo checkout folder.
3. Real clone/setup work can then target the derived checkout folder rather than the manifest-only workspace folder.

## MS-028.17 - GitHub Local Setup Success Copy Correction

**Milestone**
MS-028.17 - GitHub Local Setup Success Copy Correction

**Type**
Product Milestone

This milestone corrects the success copy after local Git setup so the UI says `local clone/branch setup: completed`, while commit/push/merge/PR remain blocked or out of scope.

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the docs-first contract for correcting the success copy after the first live local Git setup so it no longer says real Git/GitHub execution remains blocked when the local setup has already completed.

**Product Outcome**
After the local clone and working branch setup succeeds, the UI should say that local clone/branch setup is completed. The UI should still state that commit, push, merge, and PR are blocked or out of scope. This milestone does not change Git logic and does not introduce any new execution.

The success-copy correction is published and closed, and it does not change the local clone/branch execution path itself.

**Dependencies**
MS-028.16 - GitHub Repo Checkout Folder Derivation Foundation

**Implementation Scope**
Docs-first contract publication for local setup success copy correction.

**Allowed Scope**
* local clone/branch setup completed wording
* commit/push/merge/PR blocked or out-of-scope wording
* success-copy correction guidance
* future-work guidance for the already completed local Git setup path

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* secret storage
* real clone/checkout/working-branch execution
* commit
* push
* merge
* pull request
* unrelated UI or domain changes
4. Real commit/push/merge/PR remain blocked until later explicit Product Owner-approved milestones.

## MS-028.18 - GitHub Multi-Account Auth Guidance Foundation

**Milestone**
MS-028.18 - GitHub Multi-Account Auth Guidance Foundation

**Type**
Product Milestone

This milestone captures GitHub multi-account auth guidance for SPS OS and client/project repos. The practical default is HTTPS + Git Credential Manager + path-based credentials via `git config --global credential.https://github.com.useHttpPath true`, with GitHub CLI account switching and SSH host aliases as alternatives.

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Capture the guidance for separating the auth context of the SPS OS repo from the auth context of client/project repos.

**Product Outcome**
The repository now documents the known failure modes where GitHub returns `Repository not found` when the current Git auth account lacks access and `403 Permission denied` when the current Git auth account lacks write permission. The guidance keeps OAuth/token storage out of scope, does not install `gh`, does not create SSH keys, and does not change Git logic.

**Dependencies**
MS-028.17 - GitHub Local Setup Success Copy Correction

**Implementation Scope**
Docs-first guidance publication for multi-account GitHub auth.

**Allowed Scope**
* docs publication
* GitHub multi-account auth guidance wording
* practical HTTPS + Git Credential Manager guidance
* GitHub CLI switching and SSH host alias alternatives
* failure-mode wording for `Repository not found` and `403 Permission denied`

**Forbidden Scope**
* OAuth/token storage
* installing `gh`
* creating SSH keys
* real clone/push execution
* unrelated UI or domain changes

**Sequencing**
1. The repository records the guidance for SPS OS and client/project auth contexts.
2. The repository keeps the practical default and alternatives visible for future setup decisions.
3. Real Git/GitHub execution remains outside the milestone.

## MS-028.19 - GitHub Post-Clone Source Status Reconciliation Foundation

**Milestone**
MS-028.19 - GitHub Post-Clone Source Status Reconciliation Foundation

**Type**
Product Milestone

This milestone captures the docs-first contract for reconciling source status after a successful local clone and working branch setup. The repository should stop looking manifest-only when a valid repo checkout exists, and it should distinguish the manifest-only workspace folder, the repo checkout folder, the local git repo presence, the GitHub remote URL, the active working branch, and clean/dirty workspace state if available.

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Reconcile source status after clone/setup so the workspace and repo checkout are represented correctly.

**Product Outcome**
The repository now documents the post-clone source-status boundary and keeps real clone/checkout/branch execution, commit/push/merge/PR, and any UI/API implementation out of scope.

**Dependencies**
MS-028.18 - GitHub Multi-Account Auth Guidance Foundation

**Implementation Scope**
Docs-first source-status reconciliation contract only.

## MS-028.20 - GitHub Checkout Status Revalidation Foundation

**Milestone**
MS-028.20 - GitHub Checkout Status Revalidation Foundation

**Type**
Product Milestone

This milestone captures the docs-first contract for revalidating checkout status after a successful local clone and working branch setup. The repository should re-check the filesystem-backed repo checkout instead of trusting stale browser-state or localStorage data, and it should treat the saved manifest-only workspace folder and the derived repo checkout folder as distinct paths.

**Contract Status**
APPROVED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Revalidate checkout status from filesystem-backed repository state so the UI does not keep showing a manifest-only project when a valid repo checkout already exists.

**Product Outcome**
The repository documents the revalidation boundary for repo checkout availability, local git repo presence, GitHub remote URL, active working branch, and working tree state when available. If the saved repo path still points to the manifest-only workspace folder but the derived repo checkout folder exists and is a valid Git repo, the project should show the checkout as available. The milestone keeps missing checkout folders, missing `.git`, remote mismatches, branch mismatches, and stale workspace-state mismatches as blockers or unknowns.

**Implementation Note**
Checkout status revalidation is now backed by filesystem-derived repo state rather than stale browser-state or localStorage alone. The shared source-status helper/model is used by overview and settings, valid checkout at the repo checkout folder reconciles the UI to `git-repo`, and missing checkout folder, missing `.git`, remote mismatch, active branch mismatch, and working tree dirty/clean/unknown remain explicit blocker or unknown cases. OAuth/token storage was not added and no real clone/checkout/branch was executed in this sync step.

**Dependencies**
MS-028.19 - GitHub Post-Clone Source Status Reconciliation Foundation

**Implementation Scope**
Docs-first checkout-status revalidation contract only.

**Allowed Scope**
* docs publication
* revalidation wording for filesystem-backed checkout status
* manifest-only workspace versus repo checkout distinction
* remote URL, active branch, and working tree state wording
* blocker and unknown-state guidance for stale checkout data

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* secret storage
* real clone/checkout/working-branch execution
* commit
* push
* merge
* pull request
* sync-to-main
* unrelated UI or domain changes

**Sequencing**
1. The repository records the docs-first contract for checkout-status revalidation.
2. The repository keeps filesystem-backed checkout status distinct from stale browser-state or localStorage values.
3. Real Git/GitHub execution remains outside the milestone.

## MS-028.14 - GitHub Local Working Branch Creation Action Foundation

**Milestone**
MS-028.14 - GitHub Local Working Branch Creation Action Foundation

**Type**
Product Milestone

This is an SPS OS-controlled action foundation only. Real clone/checkout/branch execution was not added in this milestone.

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the docs-first contract for the first SPS OS-controlled local working branch creation action driven by saved GitHub settings.

**Product Outcome**
After the project settings store the GitHub URL, local workspace path, branch work mode, and working branch name, this milestone defines the controlled local working-branch creation action that SPS OS will eventually execute. The contract keeps saved settings separate from preflight readiness, separates the future local clone action from the future local branch creation action, and leaves future sync-to-main work outside the milestone. Setting the branch name alone does not create a branch, and the action must be initiated by SPS OS settings/action flow rather than by a manual Codex workaround. The milestone does not yet create clone, checkout, branch, commit, push, merge, or PR artifacts.

**Dependencies**
* MS-028.13 - GitHub First Authorized Operation Preflight Foundation

**Implementation Scope**
Docs-first contract publication for the local working branch creation action.

**Allowed Scope**
* docs publication
* local working branch creation wording
* branch work mode and working branch name contract rules
* local workspace path and GitHub URL contract rules
* future-work guidance for the next real Git/GitHub implementation step

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* real Git operations
* clone/fetch/checkout
* branch creation on disk or remote
* push
* merge
* pull request
* sync-to-main
* backend persistence
* unrelated UI or domain changes

**Sequencing**
1. MS-028.13 defines the local preflight for the first authorized operation.
2. MS-028.14 defines the SPS OS-controlled local working branch creation action after the saved settings and branch name are ready.
3. Real clone/checkout/branch execution remains blocked until a later explicit Product Owner-approved implementation milestone.

## MS-028.13 - GitHub First Authorized Operation Preflight Foundation

**Milestone**
MS-028.13 - GitHub First Authorized Operation Preflight Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the local preflight for the first authorized GitHub operation after MS-028.12 without enabling real execution.

**Product Outcome**
After MS-028.12 marks the first operation as authorized to execute in local UI/browser state, this milestone defines a local preflight that shows what is ready and what still blocks real execution. The preflight uses only known local SPS OS UI/browser state, keeps real Git/GitHub execution blocked, and does not create OAuth, tokens, clone, fetch, checkout, branch, commit, push, or PR artifacts.

**Dependencies**
* MS-028.12 - GitHub First Operation Authorization Boundary Foundation

**Implementation Scope**
Docs-first preflight contract publication for the first authorized GitHub operation.

**Allowed Scope**
* docs publication
* preflight wording
* local readiness/blocker framing for authorized operation
* future-work guidance for the next real Git/GitHub implementation step

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* real Git operations
* clone/fetch/checkout
* branch creation on disk or remote
* push
* merge
* pull request
* sync-to-main
* backend persistence
* unrelated UI or domain changes

**Sequencing**
1. MS-028.12 defines the local authorization boundary for the first candidate.
2. MS-028.13 defines the local preflight for the first authorized operation.
3. Real Git/GitHub execution remains blocked until a later explicit Product Owner-approved implementation milestone.

## MS-028.12 - GitHub First Operation Authorization Boundary Foundation

**Milestone**
MS-028.12 - GitHub First Operation Authorization Boundary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the authorization boundary for the first locally selected GitHub operation candidate after MS-028.11 without enabling real execution.

**Product Outcome**
After MS-028.11 records the Product Owner decision for the locally selected first operation candidate, this milestone defines the separate local authorization boundary for that same candidate. The boundary distinguishes the selected candidate from the state approved for further preparation, from the state requiring authorization, and from the state authorized to execute, while keeping real Git/GitHub execution blocked. The milestone does not create OAuth, tokens, clone, fetch, checkout, branch, commit, push, or PR artifacts.

**Dependencies**
* MS-028.11 - GitHub First Operation Candidate Decision Foundation

**Implementation Scope**
Docs-first authorization-boundary contract publication for the GitHub real-execution boundary.

**Allowed Scope**
* docs publication
* authorization-boundary wording
* bounded decision-state terminology for selected candidate, approved for further preparation, authorization required, and authorized to execute
* future-work guidance for the next real Git/GitHub implementation step

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* real Git operations
* clone/fetch/checkout
* branch creation on disk or remote
* push
* merge
* pull request
* sync-to-main
* backend persistence
* unrelated UI or domain changes

**Sequencing**
1. MS-028.11 records the Product Owner decision for the first locally selected GitHub operation candidate.
2. MS-028.12 defines the separate authorization boundary for that same candidate.
3. Real Git/GitHub execution remains blocked until a later explicit Product Owner-approved implementation milestone.

## MS-028.11 - GitHub First Operation Candidate Decision Foundation

**Milestone**
MS-028.11 - GitHub First Operation Candidate Decision Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Record the Product Owner decision for the first locally selected GitHub operation candidate after MS-028.9 and MS-028.10 without authorizing real execution.

**Product Outcome**
After MS-028.9 selects the first real operation candidate and MS-028.10 records the readiness detail for that candidate, this milestone records the Product Owner decision for that already selected local candidate only. The decision distinguishes the selected candidate from the state approved for further preparation and from the state authorized to execute, and keeps real Git/GitHub execution blocked. The milestone was verified by the targeted settings page test file with 13 tests passing. The milestone does not create OAuth, tokens, clone, checkout, branch, commit, push, or PR artifacts.

**Dependencies**
* MS-028.9 - GitHub First Real Operation Selection Foundation
* MS-028.10 - GitHub Selected Operation Readiness Detail Foundation

**Implementation Scope**
Docs-first candidate-decision contract publication for the GitHub real-execution boundary.

**Allowed Scope**
* docs publication
* local candidate-decision wording
* bounded decision-state terminology for selected candidate, approved for further preparation, and real execution blocked
* future-work guidance for the next real Git/GitHub implementation step

**Forbidden Scope**
* GitHub OAuth
* access tokens
* GitHub API integration
* real Git operations
* clone/fetch/checkout
* branch creation on disk or remote
* push
* merge
* pull request
* sync-to-main
* backend persistence
* unrelated UI or domain changes

**Sequencing**
1. MS-028.9 selects the first real operation candidate.
2. MS-028.10 records readiness detail for the selected candidate.
3. MS-028.11 records the Product Owner decision for that already selected candidate only.
4. Real Git/GitHub execution remains blocked until a later explicit Product Owner-approved implementation milestone.

## MS-028.6 - GitHub Real Connection Readiness Check Foundation

**Milestone**
MS-028.6 - GitHub Real Connection Readiness Check Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a first real-readiness gate for future GitHub execution using existing local UI/browser state only, without implementing any execution.

**Product Outcome**
After GitHub repository URL, branch work mode, branch name when needed, GitHub connection readiness, and local clone readiness foundations are in place through MS-028.5, this milestone adds a derived readiness checklist that shows what is already ready and what is still blocking real GitHub/Git execution. The checklist reports repository URL ready, branch work mode ready or missing, working branch name ready, missing, or not required, GitHub connection/authentication missing or required, local clone/workspace missing or required, and real Git execution blocked until explicit Product Owner confirmation. The gate derives from local UI/browser state only and does not perform execution.

**Dependencies**
MS-028.5 - GitHub Repository Real Execution Contract Foundation

**Implementation Scope**
Docs-only readiness-gate publication for the first real Git/GitHub execution readiness check.

**Allowed Scope**
Docs publication, sequencing guidance, readiness-check wording, and blocker conditions for future Git/GitHub execution.

**Forbidden Scope**
GitHub OAuth, access tokens, GitHub API integration, real Git operations, clone/fetch/checkout, branch creation on disk or remote, push, merge, pull request, sync-to-main, backend persistence, filesystem checks, and unrelated UI or domain changes.

**Sequencing**
1. Readiness UI/status foundations are complete through MS-028.5.
2. MS-028.6 defines the first real-readiness gate only.
3. A future milestone may implement the first real readiness check or clone/setup action only after Product Owner approval.
4. Future sync, merge, and PR to main remains later and separate.

## MS-028.7 - GitHub Real Readiness Action Foundation

**Milestone**
MS-028.7 - GitHub Real Readiness Action Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the readiness/action decision layer for future GitHub real operations using only local UI/browser state and preserving a strict execution block.

**Product Outcome**
After MS-028.6 establishes the derived readiness checklist, this milestone adds the compact local readiness-action UI layer on the project settings page that translates local UI/browser state into `ready`, `blocked`, and `requires confirmation` decision states. The ready state means ready for Product Owner confirmation only, and the action layer keeps explicit Product Owner confirmation required before any real Git/GitHub operation while real Git/GitHub execution remains blocked until a later approved implementation milestone.

**Dependencies**
MS-028.6 - GitHub Real Connection Readiness Check Foundation

**Implementation Scope**
Readiness/action UI implementation and SSOT publication for the GitHub real-readiness boundary.

**Allowed Scope**
UI implementation, docs publication, sequencing guidance, readiness-action wording, derived-state terminology, test coverage for local decision states, and blocker conditions for future Git/GitHub execution.

**Forbidden Scope**
GitHub OAuth, access tokens, GitHub API integration, real Git operations, clone/fetch/checkout, branch creation on disk or remote, push, merge, pull request, sync-to-main, backend persistence, filesystem writes for clone/workspace setup, automatic work on main, remote synchronization, UI implementation, source code changes, and unrelated UI or domain changes.

**Sequencing**
1. MS-028.6 defines the derived readiness checklist using local UI/browser state only.
2. MS-028.7 defines the readiness/action decision layer only.
3. Any real Git/GitHub execution remains blocked until a later explicit Product Owner-approved implementation milestone.
4. Sync, merge, and PR to main remain later and separate.

## MS-028.8 - GitHub Real Execution Confirmation Gate Foundation

**Milestone**
MS-028.8 - GitHub Real Execution Confirmation Gate Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the explicit confirmation gate that follows the local ready-for-confirmation state and preserves the non-execution boundary before any real Git/GitHub operation.

**Product Outcome**
After MS-028.7 provides the local `ready`, `blocked`, and `requires confirmation` decision layer, this milestone defines the confirmation gate that remains based only on local UI/browser state, keeps `ready` limited to Product Owner confirmation only, and requires explicit Product Owner approval before any real Git/GitHub operation. Real Git/GitHub execution remains blocked.

**Dependencies**
MS-028.7 - GitHub Real Readiness Action Foundation

**Implementation Scope**
Docs-only confirmation-gate publication and UI implementation boundary for the GitHub real-execution boundary.

**Allowed Scope**
Docs publication, sequencing guidance, confirmation-gate wording, preservation of the ready-for-confirmation versus ready-to-execute distinction, UI confirmation disclosure wording, targeted test coverage, and blocker conditions for future Git/GitHub execution.

**Forbidden Scope**
GitHub OAuth, access tokens, GitHub API integration, real Git operations, clone/fetch/checkout, branch creation on disk or remote, push, merge, pull request, sync-to-main, backend persistence, filesystem writes for clone/workspace setup, automatic work on main, remote synchronization, UI implementation, source code changes, and unrelated UI or domain changes.

**Sequencing**
1. MS-028.7 defines the ready-for-confirmation layer only.
2. MS-028.8 defines the confirmation gate only.
3. Any real Git/GitHub execution remains blocked until a later explicit Product Owner-approved implementation milestone.
4. Sync, merge, and PR to main remain later and separate.

## MS-028.9 - GitHub First Real Operation Selection Foundation

**Milestone**
MS-028.9 - GitHub First Real Operation Selection Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Record the completed bounded selection boundary for the first real Git/GitHub operation type after the confirmation gate, without authorizing execution.

**Product Outcome**
After MS-028.8 provides the confirmation gate, this milestone lets Product Owner select the first real operation type as a candidate only, based on local readiness context and explicit Product Owner choice. The selection remains distinct from authorization to execute, names only bounded candidate labels such as `connection check`, `local clone/workspace check`, `clone preparation`, and `branch check`, and keeps real Git/GitHub execution blocked until a later separate milestone.

**Dependencies**
MS-028.8 - GitHub Real Execution Confirmation Gate Foundation

**Implementation Scope**
Docs-first operation-selection contract publication for the GitHub real-execution boundary.

**Allowed Scope**
Docs publication, sequencing guidance, operation-selection wording, candidate-label terminology, preservation of the selected-as-candidate versus authorized-to-execute distinction, and blocker conditions for future Git/GitHub execution.

**Forbidden Scope**
GitHub OAuth, access tokens, GitHub API integration, real Git operations, clone/fetch/checkout, branch creation on disk or remote, push, merge, pull request, sync-to-main, backend persistence, filesystem writes for clone/workspace setup, automatic work on main, remote synchronization, UI implementation, source code changes, and unrelated UI or domain changes.

**Sequencing**
1. MS-028.8 defines the confirmation gate only.
2. MS-028.9 defines the first real operation selection boundary only.
3. Any real Git/GitHub execution remains blocked until a later explicit Product Owner-approved implementation milestone.
4. Sync, merge, and PR to main remain later and separate.

## MS-028.10 - GitHub Selected Operation Readiness Detail Foundation

**Milestone**
MS-028.10 - GitHub Selected Operation Readiness Detail Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the selected-operation readiness detail layer for the currently selected operation candidate without authorizing execution.

**Product Outcome**
After MS-028.9 selects the first real operation candidate, this milestone shows candidate readiness detail derived from local UI/browser state and the already selected candidate only. The detail is informational and confirmatory, keeps selected as candidate distinct from authorized to execute, keeps readiness detail distinct from real execution, names only bounded candidate families such as `connection check`, `local clone/workspace check`, `clone preparation`, and `branch check`, and keeps real Git/GitHub execution blocked until a later separate milestone.

**Dependencies**
MS-028.9 - GitHub First Real Operation Selection Foundation

**Implementation Scope**
Docs-first selected-operation readiness-detail contract publication for the GitHub real-execution boundary.

**Allowed Scope**
Docs publication, sequencing guidance, readiness-detail wording, candidate-detail terminology, preservation of selected-as-candidate versus authorized-to-execute distinction, preservation of readiness-detail versus real-execution distinction, and blocker conditions for future Git/GitHub execution.

**Forbidden Scope**
GitHub OAuth, access tokens, GitHub API integration, real Git operations, clone/fetch/checkout, branch creation on disk or remote, push, merge, pull request, sync-to-main, backend persistence, filesystem writes for clone/workspace setup, automatic work on main, remote synchronization, UI implementation, source code changes, authorizing execution, selecting an operation for the Product Owner, and unrelated UI or domain changes.

**Sequencing**
1. MS-028.9 defines the first real operation selection boundary only.
2. MS-028.10 defines the selected-operation readiness detail layer only.
3. Any real Git/GitHub execution remains blocked until a later explicit Product Owner-approved implementation milestone.
4. Sync, merge, and PR to main remain later and separate.

## MS-028.5 - GitHub Repository Real Execution Contract Foundation

**Milestone**
MS-028.5 - GitHub Repository Real Execution Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the contract and safety boundary for the first real Git/GitHub execution work without implementing any real execution in this milestone.

**Product Outcome**
After readiness UI/status foundations are complete through MS-028.4, this milestone defines the execution contract only. Real Git/GitHub execution may start only after the repository URL exists, GitHub connection/authentication is explicitly available or approved, the local clone/workspace location is configured or approved, the Product Owner has selected main or working branch mode, the working branch name is present and confirmed when working branch mode is selected, and the Product Owner explicitly confirms the specific real operation before execution. The contract requires that no silent work on main occurs, no branch is created without Product Owner confirmation, no clone/fetch/checkout/push/merge/PR/sync occurs without explicit Product Owner confirmation, sync back to main stays a separate future milestone, and execution must stop with a blocker when the repository state is dirty, ambiguous, unauthenticated, or missing local clone context.

**Dependencies**
MS-028.4 - GitHub Repository Local Clone Readiness Foundation

**Implementation Scope**
Docs-only real execution contract and safety boundary for future Git/GitHub execution.

**Allowed Scope**
Docs publication, sequencing guidance, execution safety rules, and blocker conditions for the future first real operation.

**Forbidden Scope**
GitHub OAuth, access tokens, GitHub API integration, real Git operations, clone/fetch/checkout, branch creation on disk or remote, push, merge, pull request, sync-to-main, backend persistence, filesystem checks, and unrelated UI or domain changes.

**Sequencing**
1. Readiness UI/status foundations are complete through MS-028.4.
2. MS-028.5 defines the execution contract only.
3. A future milestone may implement the first real readiness check or clone/setup action only after Product Owner approval.
4. Future sync, merge, and PR to main remains later and separate.

## MS-028.4 - GitHub Repository Local Clone Readiness Foundation

**Milestone**
MS-028.2 - GitHub Repository Branch Work Mode Summary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Capture a compact visible confirmation of the selected GitHub repository branch work setup after the Product Owner chooses a branch work mode, without adding Git workflow execution in this milestone.

**Product Outcome**
After a GitHub repository URL exists and the Product Owner chooses a branch work mode, project settings now show a compact summary of the current branch work setup. The summary says the project is prepared to work on `main` when `main` is selected, or shows the selected working branch name when `working-branch` is selected. When needed, the summary falls back to the suggested `work/<project-slug>` shape. The summary uses the existing local browser-state values `soft-premium-system.projects.<id>.branch-work-mode` and `soft-premium-system.projects.<id>.working-branch-name`. Real branch creation, checkout, synchronization, merge, pull request, and GitHub API flow remain future work.

**Dependencies**
MS-028.1 - GitHub Repository Working Branch Name Foundation

**Implementation Scope**
Project settings branch work mode summary and confirmation UI/state contract only.

**Allowed Scope**
Docs publication, settings UI/test foundation, and local browser-state summary for the selected branch work setup.

**Forbidden Scope**
Real Git operations, GitHub API integration, branch creation on disk or remote, checkout, merge, pull request, sync-to-main, backend persistence, and unrelated UI or domain changes.

## MS-028.1 - GitHub Repository Working Branch Name Foundation

## MS-028.1 - GitHub Repository Working Branch Name Foundation

**Milestone**
MS-028.1 - GitHub Repository Working Branch Name Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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

**Product Outcome**
After a GitHub repository URL exists and the Product Owner chooses `Utwórz i użyj gałęzi roboczej`, project settings show a local working branch name input with a simple suggested value such as `work/<project-slug>`. The value is editable and persists per project in local browser state using `soft-premium-system.projects.<id>.working-branch-name`. Real Git branch creation, checkout, merge, pull request, and sync-to-main remain future work.

**Dependencies**
MS-028.0 - GitHub Repository Branch Work Mode Decision Foundation

**Implementation Scope**
Project settings branch work mode and working branch name UI/state contract only.

**Allowed Scope**
Docs publication, settings UI/test foundation, and local browser-state persistence for the proposed working branch name.

**Forbidden Scope**
Real Git operations, GitHub API integration, branch creation on disk or remote, checkout, merge, pull request, sync-to-main, backend persistence, and unrelated UI or domain changes.

## MS-028.0 - GitHub Repository Branch Work Mode Decision Foundation

## MS-028.0 - GitHub Repository Branch Work Mode Decision Foundation

**Milestone**
MS-028.0 - GitHub Repository Branch Work Mode Decision Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Capture the controlled Product Owner decision for GitHub-backed projects to work on `main` or on a working branch, without adding Git operations or sync-to-main behavior in this milestone.

**Product Outcome**
After a GitHub repository URL exists in project settings, the repository now shows a controlled Product Owner branch work mode decision instead of silently assuming work on `main`. The available choices are `Pracuj na main` and `Utwórz i użyj gałęzi roboczej`. The decision is persisted in local browser state per project using `soft-premium-system.projects.<id>.branch-work-mode`, and the UI explicitly states that synchronizing approved changes back to `main` is future work that is not implemented in this milestone.

**Dependencies**
* closed `MS-027.5 - Project Scoped Data Rebinding Guard Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* controlled branch work mode decision UI and browser-state persistence
* clear future-work guidance for sync back to `main`
* focused tests for the directly touched path

**Forbidden Scope**
* real Git branch creation
* GitHub API integration
* sync/merge/PR to `main`
* backend persistence
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot
* `src/app/projects/[id]/settings/page.tsx` and `src/app/projects/[id]/settings/page.test.tsx` own the minimal UI/state contract for the decision foundation

## MS-027.5 - Project Scoped Data Rebinding Guard Foundation

## MS-027.5 - Project Scoped Data Rebinding Guard Foundation

**Milestone**
MS-027.5 - Project Scoped Data Rebinding Guard Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Provide a future/legacy-safe guard that preserves existing project-scoped task and knowledge collections when a duplicate project id is merged away during dedupe or upsert.

**Product Outcome**
The repository now keeps scoped task and knowledge collections intact when they already exist under a merge-away project id, rewrites the stored `projectId` values to the canonical project, and avoids creating fake data when no scoped collections are present. This guard is explicitly not a recovery of the previously lost live BCP-MS-001 task.

**Dependencies**
* closed `MS-027.4 - GitHub Repository Import / Bind Decision Foundation`
* closed `MS-027.3 - Real Project Source Binding Status Foundation`
* closed `MS-027.2 - Real Project Duplicate Detection Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* legacy-safe project-scoped task and knowledge rebinding guard
* preserving canonical project-scoped data during dedupe/upsert
* focused tests for the directly touched path

**Forbidden Scope**
* manual task recreation
* automatic clone/import
* GitHub API integration
* Beauty Client PRO code changes
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot
* `src/lib/project/project.ts` and `src/lib/project/project.test.ts` own the minimal rebinding guard surface

## MS-027.4 - GitHub Repository Import / Bind Decision Foundation

**Milestone**
MS-027.4 - GitHub Repository Import / Bind Decision Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Give manifest-only real projects a controlled Product Owner decision path for source binding without adding automatic clone/import behavior.

**Product Outcome**
The repository now lets a manifest-only project surface a controlled next-step decision for keeping the project manifest-only, binding an existing local repo, or attaching a GitHub URL while keeping clone/import as future work. The binding decision remains metadata-only and does not create duplicate project records or mutate the Beauty Client PRO source.

**Dependencies**
* closed `MS-027.3 - Real Project Source Binding Status Foundation`
* closed `MS-027.2 - Real Project Duplicate Detection Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* controlled binding decision metadata and UI guidance for manifest-only projects
* preserving the existing dedupe and source-status behavior
* focused tests for the directly touched path

**Forbidden Scope**
* automatic clone/import
* GitHub API integration
* Beauty Client PRO code changes
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot
* `src/lib/project/project.ts`, `src/app/projects/page.tsx`, `src/app/projects/[id]/page.tsx`, `src/app/projects/[id]/settings/page.tsx`, and related tests own the minimal binding decision surface

## MS-027.3 - Real Project Source Binding Status Foundation

**Milestone**
MS-027.3 - Real Project Source Binding Status Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Surface a clear source and repository binding status for real projects so Product Owner can see whether a project is manifest-only, local-source only, git-repo backed, or unknown.

**Product Outcome**
The repository now derives a read-only source binding status for real projects and shows why repository context is unavailable when no local Git metadata exists. The status remains diagnostic and does not change source binding behavior.

**Dependencies**
* closed `MS-027.2 - Real Project Duplicate Detection Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* read-only source binding status derivation
* UI guidance for missing repository context
* focused tests for the directly touched path

**Forbidden Scope**
* automatic clone/import
* GitHub API integration
* Beauty Client PRO code changes
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot
* `src/lib/project/project.ts`, `src/app/projects/[id]/page.tsx`, `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx`, and related tests own the minimal source-status surface

## MS-027.2 - Real Project Duplicate Detection Foundation

**Milestone**
MS-027.2 - Real Project Duplicate Detection Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Prevent duplicate local project records when the same real project/source is created, pinned, or reopened more than once.

**Product Outcome**
The repository now canonicalizes the real-project intake identity path so the same source path, manifest identity, or normalized project identity reuses the existing record instead of creating a duplicate local project entry. Beauty Client PRO remains a single canonical project record.

**Allowed Implementation Scope**
* docs-only contract publication
* canonical project identity comparison and deduplication
* keeping existing task data attached to the canonical project id
* focused tests for the directly touched path

**Forbidden Scope**
* automatic clone/import
* GitHub API integration
* Beauty Client PRO code changes
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot
* `src/lib/project/project.ts`, `src/app/projects/page.tsx`, and related tests own the minimal intake dedupe surface

## MS-026.1c - Polish UI product terms verification

**Milestone**
MS-026.1c - Polish UI product terms verification

## MS-026.1c - Polish UI product terms verification

**Milestone**
MS-026.1c - Polish UI product terms verification

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Improve Polish UI language consistency for the live-test shell, especially home, workspace, sidebar, and navigation labels, and clean obvious mojibake artifacts in the edited visible UI shell files while keeping the app structure and live readiness intact.

**Product Outcome**
The repository now confirms the accepted MS-026.1-series Polish UI overlay cleanup for the live-test shell, workspace, AI workspace, and workflow paths. The remaining visible product terms render in Polish for the user-facing labels that were verified in this session, while the program backbone, identifiers, routes, engine states, contracts, and internal logic remain English. `src/lib/app-version.ts` still exposes `1.026.0` as the Product Owner-approved live-test branch/build marker. No routing, data-flow, API, storage, Project Brain logic, Workflow Engine logic, Konduktor logic, automation, or scheduling changed.

**Version Decision**
The app version decision for this Product Owner-approved live-readiness `.0` milestone remains intentional and unchanged: the canonical app version continues to expose `1.026.0` as the visible live-test branch/build marker.

**Dependencies**
* closed `MS-025.3 - Konduktor Decision Boundary Trust Copy Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing live-readiness UI language and version-marker seam
* SSOT synchronization for milestone publication
* confirmation of the existing visible shell copy and version-marker read path
* Polish UI and mojibake cleanup derived from existing visible UI strings

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/page.tsx`, `src/app/workspace/page.tsx`, `src/app/projects/[id]/layout.tsx`, and `src/components/workspace/WorkspaceHeader.tsx` own the visible UI shell copy
* `src/lib/app-version.ts` owns the visible app version/build marker
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-025.3 - Konduktor Decision Boundary Trust Copy Foundation

**Milestone**
MS-025.3 - Konduktor Decision Boundary Trust Copy Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor state the trust boundary more clearly so it advises the next direction while Product Owner still approves the milestone and decides when work starts, while staying read-only and non-executable.

**Product Outcome**
The repository now refines the existing Konduktor `start-next-work` / `requires-product-owner-decision` copy so the decision boundary is explicit: Konduktor advises the next direction, but Product Owner approves the milestone and decides when work starts. Konduktor still does not approve a next milestone, start work, or execute any action. No runtime data source, workflow rule, Project Brain logic, UI panel, API, storage, automation, scheduling, or app version source changed.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-025.3` is a read-only guidance publication rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-025.2 - Konduktor Product Owner Decision Prompt Clarity Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor decision boundary seam
* SSOT synchronization for milestone publication
* confirmation of the existing `start-next-work` / `requires-product-owner-decision` read path
* trust/boundary copy refinement derived from existing decision-required data

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-025.2 - Konduktor Product Owner Decision Prompt Clarity Foundation

**Milestone**
MS-025.2 - Konduktor Product Owner Decision Prompt Clarity Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor explain the existing `start-next-work` / `requires-product-owner-decision` prompt more clearly so it tells Product Owner to choose the next priority or milestone direction, while staying read-only and non-executable.

**Product Outcome**
The repository now refines the existing Konduktor `start-next-work` / `requires-product-owner-decision` prompt copy so it explicitly asks Product Owner to choose the next priority or milestone direction after the published MS-025.1 guidance milestone, while remaining read-only, non-executable, and still requiring Product Owner decision. No runtime data source, workflow rule, Project Brain logic, UI panel, API, storage, automation, scheduling, or app version source changed.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-025.2` is a read-only guidance publication rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-025.1 - Konduktor Next Milestone Reason Specificity Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor decision prompt seam
* SSOT synchronization for milestone publication
* confirmation of the existing `start-next-work` / `requires-product-owner-decision` read path
* prompt clarity refinement derived from existing decision-required data

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-025.1 - Konduktor Next Milestone Reason Specificity Foundation

**Milestone**
MS-025.1 - Konduktor Next Milestone Reason Specificity Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor explain more specifically why the published MS-025.0 guidance now points Product Owner toward choosing the next platform priority, while still requiring Product Owner decision and staying read-only.

**Product Outcome**
The repository now refines the existing Konduktor `start-next-work` / `requires-product-owner-decision` reason copy so it explains more specifically why Konduktor points Product Owner toward choosing the next platform priority after the published MS-025.0 guidance milestone, while remaining read-only, non-executable, and still requiring Product Owner decision. No runtime data source, workflow rule, Project Brain logic, UI panel, API, storage, automation, scheduling, or app version source changed.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-025.1` is a read-only guidance publication rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-025.0 - Konduktor Next Milestone Selection Guidance Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing `workflowNextStep` read path
* reason-specific copy refinement derived from existing `start-next-work` / `requires-product-owner-decision` data

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-025.0 - Konduktor Next Milestone Selection Guidance Foundation

**Milestone**
MS-025.0 - Konduktor Next Milestone Selection Guidance Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor show one calm next-milestone direction when the current signal is `start-next-work`, while still requiring Product Owner decision and staying read-only.

**Product Outcome**
The repository now improves the existing Konduktor `start-next-work` / `requires-product-owner-decision` guidance copy so it adds a calm next-direction signal, `kolejny priorytet platformy`, while remaining read-only, non-executable, and still requiring Product Owner decision. No runtime data source, workflow rule, Project Brain logic, UI panel, API, storage, automation, scheduling, or app version source changed.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-025.0` is a read-only guidance publication rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-024.3 - Konduktor Recommendation Card Hierarchy Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing `workflowNextStep` read path
* calm next-direction copy refinement derived from existing `start-next-work` / `requires-product-owner-decision` data

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-024.3 - Konduktor Recommendation Card Hierarchy Foundation

**Milestone**
MS-024.3 - Konduktor Recommendation Card Hierarchy Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor present its recommendation card with a clearer reading hierarchy for recommendation, action readiness, reason, and source/trust copy while staying read-only.

**Product Outcome**
The repository now improves the existing Konduktor recommendation card hierarchy so the recommendation, action readiness, reason, and source/trust copy read more clearly while keeping readiness, reason, caution signal, source transparency, and trust-copy semantics unchanged and preserving read-only, non-executable guidance.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-024.3` is a Konduktor read-only guidance presentation refinement rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-024.2 - Konduktor Recommendation Caution Signal Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing `actionReadiness` / readiness read path
* card hierarchy refinement derived from existing recommendation, readiness, reason, and source/trust copy data

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the existing Project Brain data handoff
* `src/components/workspace/WorkspacePanels.tsx` owns the host-path prop seam
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `src/lib/conductor/conductor.test.ts` and `src/app/projects/[id]/page.test.tsx` own the focused verification
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

**Milestone**
MS-024.1 - Konduktor Recommendation Reason Clarity Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor show a short read-only reason explaining its action-readiness status using only existing `workflowNextStep` and readiness data.

**Product Outcome**
The repository now explains why Konduktor is ready to act, needs Product Owner decision, or is informational only, while keeping the readiness behavior unchanged and preserving read-only, non-executable guidance.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-024.1` is a Konduktor read-only guidance explanation refinement rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-024.0 - Konduktor Recommendation Action Readiness Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing Project Brain `workflowNextStep` read path
* short reason-copy refinement derived from existing readiness data

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the existing Project Brain data handoff
* `src/components/workspace/WorkspacePanels.tsx` owns the host-path prop seam
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `src/lib/conductor/conductor.test.ts` and `src/app/projects/[id]/page.test.tsx` own the focused verification
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-024.0 - Konduktor Recommendation Action Readiness Foundation

**Milestone**
MS-024.0 - Konduktor Recommendation Action Readiness Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor show whether its recommendation is ready to act on, requires Product Owner decision, or is informational only while staying read-only.

**Product Outcome**
The repository now presents a read-only Konduktor action-readiness state derived from existing `workflowNextStep.id` values, keeps the recommendation non-executable, and does not change Project Brain, Workflow Engine, automation, scheduling, execution, API, storage, or command behavior.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-024.0` is a Konduktor read-only guidance presentation refinement rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-023.3 - Konduktor Recommendation User Trust Copy Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing Project Brain `workflowNextStep.id` read path

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the existing Project Brain data handoff
* `src/components/workspace/WorkspacePanels.tsx` owns the host-path prop seam
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `src/lib/conductor/conductor.test.ts` and `src/app/projects/[id]/page.test.tsx` own the focused verification
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-023.3 - Konduktor Recommendation User Trust Copy Foundation

## MS-023.3 - Konduktor Recommendation User Trust Copy Foundation

**Milestone**
MS-023.3 - Konduktor Recommendation User Trust Copy Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor explain its recommendation in calm trust-building copy without implying command, execution, automation, or ownership.

**Product Outcome**
The repository now presents a calm read-only recommendation with explicit trust copy so users can understand that the guidance comes from Project Brain, remains limited, and is not a new system decision.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-023.3` is a Konduktor guidance copy refinement rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-023.2 - Konduktor Recommendation Source Transparency Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing Project Brain `workflowNextStep` read path

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the existing Project Brain data handoff
* `src/components/workspace/WorkspacePanels.tsx` owns the host-path prop seam
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `src/lib/conductor/conductor.test.ts` and `src/app/projects/[id]/page.test.tsx` own the focused verification
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-023.2 - Konduktor Recommendation Source Transparency Foundation

**Milestone**
MS-023.2 - Konduktor Recommendation Source Transparency Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor visibly present that its recommendation comes from Project Brain, remains read-only, and reflects the current Project Brain state.

**Product Outcome**
The repository now shows compact source transparency on Konduktor guidance so users can see the recommendation comes from Project Brain, is read-only, and is based on the current state without changing the underlying data path or ownership split.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-023.2` is a Konduktor guidance transparency publication rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-023.1 - Konduktor Recommendation Empty/Weak State Clarity Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing Project Brain `workflowNextStep` read path

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the existing Project Brain data handoff
* `src/components/workspace/WorkspacePanels.tsx` owns the host-path prop seam
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `src/lib/conductor/conductor.test.ts` and `src/app/projects/[id]/page.test.tsx` own the focused verification
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-023.1 - Konduktor Recommendation Empty/Weak State Clarity Foundation

**Milestone**
MS-023.1 - Konduktor Recommendation Empty/Weak State Clarity Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor present a calm read-only clarification when Project Brain guidance is weak, generic, or empty without overstating a recommendation.

**Product Outcome**
The repository now shows a limited read-only guidance message for weak Project Brain signals, keeps strong guidance as a calm recommendation, and preserves the Workflow Engine and Project Brain ownership split.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-023.1` is a Konduktor guidance refinement publication rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-023.0 - Konduktor Project Brain Guidance Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing Project Brain `workflowNextStep` read path

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the existing Project Brain data handoff
* `src/components/workspace/WorkspacePanels.tsx` owns the host-path prop seam
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `src/lib/conductor/conductor.test.ts` and `src/app/projects/[id]/page.test.tsx` own the focused verification
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

## MS-023.0 - Konduktor Project Brain Guidance Foundation

**Milestone**
MS-023.0 - Konduktor Project Brain Guidance Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Let Konduktor present one calm read-only recommendation derived from existing Project Brain workflowNextStep data without changing Project Brain mechanics.

**Product Outcome**
The repository now lets Konduktor surface a calm Project Brain guidance block from the existing `workflowNextStep` signal, keeps weak or generic guidance gentle and non-executable, and preserves the Workflow Engine and Project Brain ownership split.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-023.0` is a Konduktor guidance foundation publication rather than an app/platform version milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-022.3 - Project Brain Context Empty State Clarity Foundation`

**Allowed Implementation Scope**
* docs-only publication of the existing read-only Konduktor guidance seam
* SSOT synchronization for milestone publication
* confirmation of the existing Project Brain `workflowNextStep` read path

**Forbidden Scope**
* Project Brain engine changes
* Workflow Engine rule changes
* storage, API, provider, automation, scheduling, or execution changes
* app version source changes
* broad refactors or unrelated cleanup

**Ownership Boundaries**
* `src/app/projects/[id]/page.tsx` owns the existing Project Brain data handoff
* `src/components/workspace/WorkspacePanels.tsx` owns the host-path prop seam
* `src/components/conductor/ConductorPanel.tsx` owns the read-only guidance presentation
* `src/lib/conductor/conductor.ts` owns the small pure mapping helper
* `src/lib/conductor/conductor.test.ts` and `src/app/projects/[id]/page.test.tsx` own the focused verification
* `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized publication snapshot

**Verification Plan**
* `git branch --show-current`
* `git status -sb`
* `npm.cmd test -- src/lib/conductor/conductor.test.ts src/app/projects/[id]/page.test.tsx`
* `git diff --check`
* `git status --short`

## MS-022.3 - Project Brain Context Empty State Clarity Foundation

**Milestone**
MS-022.3 - Project Brain Context Empty State Clarity Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Clarify the Project Brain context when there is no visible `workflowNextStep` signal yet so the header stays calm instead of feeling silent or broken.

**Product Outcome**
The Project Brain header now shows a short calm empty-state message for the generic `start-next-work` context, keeps the same `workflowNextStep` mechanics, and preserves the existing CTA to `/projects/:id/tasks`. The existing implementation remains the source of truth for the visible context signal.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-022.3` is an empty-state clarity refinement milestone rather than a `.0` milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-022.2 - Project Brain Context Action Clarity Foundation`

**Allowed Implementation Scope**
* small UI/content empty-state refinement on the existing project screen
* targeted test coverage for the existing project page/header behavior
* SSOT synchronization
* version decision recording

**Forbidden Scope**
* Project Brain engine changes
* backend, registry, scanner, or AI provider changes
* local project discovery changes
* dashboard redesign
* broad component refactor
* app version bump
* unrelated cleanup

**Ownership Boundaries**
* `src/components/workspace/WorkspaceHeader.tsx` owns the visible next-step presentation
* `src/app/projects/[id]/page.test.tsx` owns the targeted behavior test
* `src/lib/app-version.ts` remains unchanged for this milestone
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `npm.cmd test -- 'src/app/projects/[id]/page.test.tsx'`
* `npx.cmd tsc --noEmit`
* confirm the app version remains `0.021.6`

## MS-022.2 - Project Brain Context Action Clarity Foundation

**Milestone**
MS-022.2 - Project Brain Context Action Clarity Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

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
Make the existing Project Brain `Następny krok` / `workflowNextStep` context signal lead the user to a clearer next action on the project screen without changing Project Brain mechanics.

**Product Outcome**
The Project Brain action CTA now reads `Przejdź do zadań` instead of `Otwórz zadania` while preserving the same data, the same conditional rendering, and the same `workflowNextStep` mechanics. The existing implementation remains the source of truth for the visible context signal.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-022.2` is an action-clarity refinement milestone rather than a `.0` milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-022.1 - Project Brain Context Visibility Refinement Foundation`

**Allowed Implementation Scope**
* small UI/content clarity refinement on the existing project screen
* targeted test coverage for the existing project page/header behavior
* SSOT synchronization
* version decision recording

**Forbidden Scope**
* Project Brain engine changes
* backend, registry, scanner, or AI provider changes
* local project discovery changes
* dashboard redesign
* broad component refactor
* app version bump
* unrelated cleanup

**Ownership Boundaries**
* `src/components/workspace/WorkspaceHeader.tsx` owns the visible next-step presentation
* `src/app/projects/[id]/page.test.tsx` owns the targeted behavior test
* `src/lib/app-version.ts` remains unchanged for this milestone
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `npm.cmd test -- 'src/app/projects/[id]/page.test.tsx'`
* `npx.cmd tsc --noEmit`
* confirm the app version remains `0.021.6`

## MS-022.1 - Project Brain Context Visibility Refinement Foundation

**Milestone**
MS-022.1 - Project Brain Context Visibility Refinement Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

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
Make the existing Project Brain `Następny krok` / `workflowNextStep` context signal easier to notice and understand on the project screen without changing Project Brain mechanics.

**Product Outcome**
The Project Brain next-step block now uses a stronger visual accent and a small visible `Project Brain` label while preserving the same data, the same conditional rendering, and the same `workflowNextStep` mechanics. The existing implementation remains the source of truth for the visible context signal.

**Version Decision**
No app version bump is required. The repository rule recorded in SSOT says accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`, and `MS-022.1` is a visibility refinement milestone rather than a `.0` milestone. The canonical app version therefore remains `0.021.6`.

**Dependencies**
* closed `MS-022.0 - Project Brain Next Useful Context Foundation`

**Allowed Implementation Scope**
* small UI/content visibility refinement on the existing project screen
* targeted test coverage for the existing project page/header behavior
* SSOT synchronization
* version decision recording

**Forbidden Scope**
* Project Brain engine changes
* backend, registry, scanner, or AI provider changes
* local project discovery changes
* dashboard redesign
* broad component refactor
* app version bump
* unrelated cleanup

**Ownership Boundaries**
* `src/components/workspace/WorkspaceHeader.tsx` owns the visible next-step presentation
* `src/app/projects/[id]/page.test.tsx` owns the targeted behavior test
* `src/lib/app-version.ts` remains unchanged for this milestone
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `npm.cmd test -- 'src/app/projects/[id]/page.test.tsx'`
* `npx.cmd tsc --noEmit`
* confirm the app version remains `0.021.6`

Session 080 synchronized the accepted `MS-022.3` control files in the current local workspace, and the roadmap remains aligned with `NONE / Product Owner decision required` for the next milestone.

## MS-022.0 - Project Brain Next Useful Context Foundation

**Milestone**
MS-022.0 - Project Brain Next Useful Context Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

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
Define the smallest visible or retrievable "what Project Brain knows / next useful context" signal after opening an existing or current project.

**Product Outcome**
The repository already exposes the Project Brain workspace projection in `src/lib/project-brain/engine.ts`, the project page already passes `workflowNextStep`, and `WorkspaceHeader` already renders the counts, `Następny krok`, and the step description. No product code patch was required for this milestone, and the canonical app version remains unchanged.

**Dependencies**
* closed `MS-021.17 - Local Project Discovery Conflict Decision Reset Foundation`

**Allowed Implementation Scope**
* docs-only publication of the already satisfied Project Brain context boundary
* control-file synchronization
* focused verification of the existing route and header projection

**Forbidden Scope**
* new AI provider logic
* memory engine expansion
* backend registry changes
* scanner changes
* database or storage redesign
* broad dashboard redesign
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone
* `src/lib/project-brain/engine.ts`, `src/app/projects/[id]/page.tsx`, and `src/components/workspace/WorkspaceHeader.tsx` remain the existing implementation surfaces that already satisfy the contract

**Verification Plan**
* `git diff --check`
* `npx.cmd tsc --noEmit`
* `npm.cmd test -- 'src/app/projects/[id]/page.test.tsx'`
* confirm no product source changes were required

Session 080 synchronized the accepted `MS-022.0` control files in the current local workspace, and the roadmap remains aligned with `NONE / Product Owner decision required` for the next milestone.

## MS-021.17 - Local Project Discovery Conflict Decision Reset Foundation

**Milestone**
MS-021.17 - Local Project Discovery Conflict Decision Reset Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Preserve the smallest local reset boundary for resolved filesystem-discovered project source-conflict decisions per `project.id`.

**Product Outcome**
The repository now exposes a local `Cofnij decyzję` action for resolved source-conflict decisions so the browser-state resolved flag can be cleared for that `project.id`. Reset does not mutate the local project, and if the discovered project still differs after reset, the conflict can appear again as unresolved. The MS-021.16 persistence behavior and MS-021.15 feedback remain preserved, and the behavior stays local/browser-state only without backend, API, discovery, scanner, registry, or routing changes.

**Dependencies**
* closed `MS-021.16 - Local Project Discovery Conflict Decision State Persistence Foundation`

**Allowed Implementation Scope**
* local browser-state reset for resolved conflict decisions per `project.id`
* preserve the MS-021.16 persistence behavior
* preserve the MS-021.15 feedback messages
* preserve MS-021.14 local mutation rules and compared-field updates
* focused page/UI test coverage for the reset boundary

**Forbidden Scope**
* backend registry changes
* API or discovery helper changes
* scanner changes
* routing changes
* app version bump
* UI redesign

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the reset behavior
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `npx.cmd tsc --noEmit`
* `npm.cmd test -- src/app/projects/page.test.tsx`
* confirm `Cofnij decyzję` clears only the browser-state resolved flag and can re-expose the conflict when data still differs

## MS-021.16 - Local Project Discovery Conflict Decision State Persistence Foundation

## MS-021.16 - Local Project Discovery Conflict Decision State Persistence Foundation

**Milestone**
MS-021.16 - Local Project Discovery Conflict Decision State Persistence Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Preserve the smallest local persistence boundary for resolved filesystem-discovered project source-conflict decisions per `project.id`.

**Product Outcome**
The repository now stores each resolved conflict decision in browser state so the same discovered project no longer reappears as an unresolved conflict in the current session after `Zachowaj lokalnÄ… wersjÄ™` or `Zaakceptuj wykryty projekt`. The MS-021.15 feedback remains visible, the MS-021.14 mutation rules remain intact, and the behavior stays local/browser-state only without backend, API, discovery, scanner, registry, or routing changes.

**Dependencies**
* closed `MS-021.15 - Local Project Discovery Conflict Decision Feedback Foundation`

**Allowed Implementation Scope**
* local browser-state persistence for resolved conflict decisions per `project.id`
* preserve the MS-021.15 feedback messages
* preserve MS-021.14 local mutation rules and compared-field updates
* focused page/UI test coverage for the persistence boundary

**Forbidden Scope**
* backend registry changes
* API or discovery helper changes
* scanner changes
* routing changes
* app version bump
* UI redesign

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the persistence behavior
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `npx.cmd tsc --noEmit`
* `npm.cmd test -- src/app/projects/page.test.tsx`
* confirm the same project no longer reappears as unresolved after either conflict decision in the current browser-state session

## MS-021.15 - Local Project Discovery Conflict Decision Feedback Foundation

## Next

NONE / Product Owner decision required

## MS-021.15 - Local Project Discovery Conflict Decision Feedback Foundation

**Milestone**
MS-021.15 - Local Project Discovery Conflict Decision Feedback Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Provide the smallest local feedback boundary after a filesystem-discovered project source-conflict decision is made.

**Product Outcome**
The repository now shows local browser-state feedback after both conflict decisions: `Zachowano lokalną wersję projektu` after `Zachowaj lokalną wersję` and `Zaakceptowano dane z wykrytego projektu` after `Zaakceptuj wykryty projekt`. The feedback is local/browser-state UI only and preserves the MS-021.14 conflict decision behavior without introducing backend, API, discovery, scanner, registry, or routing changes.

**Dependencies**
* closed `MS-021.14 - Local Project Discovery Source Conflict Resolution Decision Foundation`

**Allowed Implementation Scope**
* local browser-state feedback after conflict decisions
* preserve existing conflict details, `Zobacz różnice`, `Przypięty lokalnie`, `Otwórz`, and disabled `Przypnij`
* focused page/UI test coverage for feedback visibility
* preserve browser-state-only project identity updates

**Forbidden Scope**
* backend registry changes
* API or discovery helper changes
* scanner changes
* routing changes
* app version bump
* UI redesign

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the feedback UI
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `npx.cmd tsc --noEmit`
* `npm.cmd test -- src/app/projects/page.test.tsx`
* confirm both conflict decisions leave the intended local feedback visible

## MS-021.14 - Local Project Discovery Source Conflict Resolution Decision Foundation

**Milestone**
MS-021.14 - Local Project Discovery Source Conflict Resolution Decision Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the smallest safe local decision boundary for filesystem-discovered project source conflicts when a discovered project collides with a locally attached browser-state project.

**Product Outcome**
The repository now offers explicit conflict decision actions for attached discovered projects: `Zachowaj lokalną wersję` closes the conflict decision without mutating the local project, and `Zaakceptuj wykryty projekt` updates only the compared local fields (`name`, `workingDirectory`, and `repositoryUrl` when present). The behavior remains local/browser-state only and does not add backend, API, discovery, scanner, registry, or routing changes.

**Dependencies**
* closed `MS-021.13 - Local Project Discovery Source Conflict Action Contract Foundation`

**Allowed Implementation Scope**
* explicit local decision boundary for filesystem-discovered project source conflicts
* preserve existing conflict details, `Zobacz różnice`, `Przypięty lokalnie`, `Otwórz`, and disabled `Przypnij`
* focused page/UI test coverage for decision actions
* preserve browser-state-only project identity updates

**Forbidden Scope**
* automatic sync or broader registry behavior
* backend registry changes
* API or discovery helper changes
* scanner changes
* routing changes
* app version bump
* UI redesign

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the decision action UI
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `npx.cmd tsc --noEmit`
* `npm.cmd test -- src/app/projects/page.test.tsx`
* confirm `Zachowaj lokalną wersję` leaves the local project unchanged and `Zaakceptuj wykryty projekt` updates only the compared fields

## MS-021.13 - Local Project Discovery Source Conflict Action Contract Foundation

**Milestone**
MS-021.13 - Local Project Discovery Source Conflict Action Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the smallest safe read-only source-conflict action boundary for filesystem-discovered projects when the attached local browser-state entry differs from the discovered metadata.

**Product Outcome**
The repository now shows `Zobacz różnice` for discovered projects with detected source conflicts and reveals a minimal inline read-only comparison block with only the fields that actually differ: `Nazwa`, `Katalog roboczy`, and `Repozytorium` when both sides have it and it differs. The existing conflict status, `Przypięty lokalnie`, the source label derived from `workingDirectory`, `Otwórz`, and disabled `Przypnij` are preserved.

**Dependencies**
* closed `MS-021.12 - Local Project Discovery Source Conflict Visibility Foundation`

**Allowed Implementation Scope**
* restrained source-conflict action for attached discovered projects
* minimal inline read-only comparison of existing local/discovered project fields
* focused page/UI test coverage for conflict details visibility
* preserve the existing attach/open/localStorage boundary

**Forbidden Scope**
* resolve / update-local / overwrite / merge actions
* automatic upsert or overwrite of local project state
* backend registry changes
* API or discovery helper changes
* manifest format changes
* storage helper refactor
* UI redesign
* new routes

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the source-conflict action contract UI
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `git status -sb`
* confirm `Zobacz różnice` reveals only the conflicting fields and preserves the existing conflict status and button states

## MS-021.12 - Local Project Discovery Source Conflict Visibility Foundation

**Milestone**
MS-021.12 - Local Project Discovery Source Conflict Visibility Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the smallest safe read-only source-conflict visibility boundary for filesystem-discovered projects when the attached local browser-state entry differs from the discovered metadata.

**Product Outcome**
The repository now shows a restrained read-only conflict status for discovered projects when the same project id is already attached locally but the discovered metadata differs from the local browser-state entry. Conflict detection compares `name`, `workingDirectory`, and `repositoryUrl` when present on both sides, while preserving `Przypięty lokalnie`, the source label derived from `workingDirectory`, `Otwórz`, and disabled `Przypnij`.

**Dependencies**
* closed `MS-021.11 - Local Project Discovery Attached Source Visibility Foundation`

**Allowed Implementation Scope**
* restrained source-conflict label rendering for attached discovered projects
* read-only comparison of existing local/discovered project fields
* focused page/UI test coverage for conflict visibility
* preserve the existing attach/open/localStorage boundary

**Forbidden Scope**
* automatic conflict resolution
* overwrite or merge of local project state
* backend registry changes
* API or discovery helper changes
* manifest format changes
* storage helper refactor
* UI redesign
* new routes

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the source-conflict visibility UI contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- src/app/projects/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm attached discovered projects show a restrained conflict status when their discovered metadata differs from the local browser-state entry

## MS-021.11 - Local Project Discovery Attached Source Visibility Foundation

**Milestone**
MS-021.11 - Local Project Discovery Attached Source Visibility Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the smallest safe source-visibility boundary for filesystem-discovered projects after attachment by showing a restrained read-only source label for projects that already have a local working directory.

**Product Outcome**
The repository now shows a restrained read-only source label for attached filesystem-discovered projects in the local projects list, derives the label from `workingDirectory`, keeps `Przypięty lokalnie` visible, keeps `Otwórz` available, and keeps `Przypnij` disabled for already attached discovered projects.

**Dependencies**
* closed `MS-021.10 - Local Project Discovery Attached Project Revisit Foundation`

**Allowed Implementation Scope**
* restrained source label rendering for attached discovered projects
* read-only UI copy derived from existing project fields
* focused page/UI test coverage for attached source visibility
* preserve the existing attach/open/localStorage boundary

**Forbidden Scope**
* backend registry changes
* API or discovery helper changes
* manifest format changes
* storage helper refactor
* UI redesign
* new routes

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the attached source-visibility UI contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- src/app/projects/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm attached discovered projects display `Z C:\SPS_OS_WORK` while preserving `Przypięty lokalnie`, disabled `Przypnij`, and available `Otwórz`

## MS-021.10 - Local Project Discovery Attached Project Revisit Foundation

**Milestone**
MS-021.10 - Local Project Discovery Attached Project Revisit Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the smallest safe revisit boundary for filesystem-discovered projects after attachment by confirming the attached-status UI remains visible across unmount and remount of the projects list.

**Product Outcome**
The repository now confirms the existing page behavior already satisfies revisit requirements: after attaching a discovered project, revisiting the projects list still shows the project in local browser state, the discovered card status remains `Przypięty lokalnie`, `Przypnij` remains disabled, and `Otwórz` remains available.

**Dependencies**
* closed `MS-021.9 - Local Project Discovery Attached Status Visibility Foundation`

**Allowed Implementation Scope**
* focused revisit/re-render test coverage
* confirmation of the localStorage-backed attached state boundary
* preserve the existing page behavior unchanged when it already satisfies the contract

**Forbidden Scope**
* storage helper refactor
* backend registry changes
* API or discovery helper changes
* manifest format changes
* UI redesign
* new routes

**Ownership Boundaries**
* `src/app/projects/page.test.tsx` owns the revisit verification coverage
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- src/app/projects/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm revisit preserves `Przypięty lokalnie`, disabled `Przypnij`, and available `Otwórz`

## MS-021.9 - Local Project Discovery Attached Status Visibility Foundation

**Milestone**
MS-021.9 - Local Project Discovery Attached Status Visibility Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the smallest safe attached-status visibility boundary for filesystem-discovered projects by surfacing whether an already discovered project is already present in the existing local browser project list.

**Product Outcome**
The repository now loads the current local browser project list with `getProjects()`, checks each discovered project id against local state, shows `Przypięty lokalnie` for already attached discovered projects, disables `Przypnij` for those projects, and keeps `Otwórz` available. Not-yet-attached discovered projects keep `Przypnij` enabled and `Otwórz` available.

**Dependencies**
* closed `MS-021.8 - Local Project Discovery Attach Existing Project Foundation`

**Allowed Implementation Scope**
* local UI status detection from existing browser project list state
* restrained attached-status label and button state change
* focused page/UI test coverage for already-attached status
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* backend registry changes
* API or discovery helper changes
* manifest format changes
* storage helper refactor
* UI redesign
* new routes

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the attached-status visibility UI contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `git diff --check`
* `git status -sb`
* confirm discovered projects display `Przypięty lokalnie` when already present in local browser state
* confirm `Przypnij` is disabled only for already attached discovered projects

## MS-021.8 - Local Project Discovery Attach Existing Project Foundation

**Milestone**
MS-021.8 - Local Project Discovery Attach Existing Project Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the smallest safe attach action for filesystem-discovered projects by saving the discovered project into the existing browser local-state project flow before preserving the discovered list boundary.

**Product Outcome**
The repository now shows a `Przypnij` action for filesystem-discovered projects, writes the discovered project into browser/localStorage through the existing local project state flow, preserves `id`, `name`, `repositoryUrl`, `workingDirectory`, and filesystem status, and keeps the discovered list separate until explicit user action. The attach path also deduplicates by project id so an already-known local project is replaced instead of duplicated.

**Dependencies**
* closed `MS-021.7 - Local Project Discovery Open Existing Project Foundation`

**Allowed Implementation Scope**
* explicit attach action on discovered projects
* minimal browser-state seeding for attach
* anti-duplication handling for the existing local project state helper
* focused page/UI and helper tests for the touched boundary
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* full Attach/sync/register-to-database flow
* automatic merge into browser/localStorage project state
* manifest format changes
* new storage providers
* UI redesign
* route restructuring beyond the minimal attach action

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the attach-existing-project UI contract
* `src/lib/project/project.ts` and `src/lib/project/project.test.ts` own the local-state attach helper contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- src/app/projects/page.test.tsx`
* `npm.cmd test -- src/lib/project/project.test.ts`
* `git diff --check`
* `git status -sb`
* confirm discovered projects can be attached into the existing local project state
* confirm duplicate local entries are not created for the same discovered project id

## MS-021.7 - Local Project Discovery Open Existing Project Foundation

**Milestone**
MS-021.7 - Local Project Discovery Open Existing Project Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED

**Active**
NO

**Runtime Status**
PUBLISHED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the smallest safe open action for filesystem-discovered projects by seeding the discovered project into the existing browser local-state create flow before navigating to the existing project detail route.

**Product Outcome**
The repository now shows an `Otwórz` action for filesystem-discovered projects, writes the discovered project into local browser state through the existing `createProject(...)` flow, preserves `id`, `name`, `repositoryUrl`, `workingDirectory`, and filesystem status, and navigates to `/projects/[id]`. Discovered projects remain separate from browser/localStorage project state until explicitly opened.

**Dependencies**
* closed `MS-021.6 - Local Project Discovery UI Read-Only Foundation`

**Allowed Implementation Scope**
* minimal Open action on discovered projects
* minimal browser-state seeding before navigation
* focused page/UI tests for the touched boundary
* SSOT synchronization for the open-existing-project milestone
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* full Attach/sync/register-to-database flow
* automatic merge into browser/localStorage project state
* manifest format changes
* new storage providers
* UI redesign
* route restructuring beyond the minimal open action

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the open-existing-project UI contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- src/app/projects/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm discovered projects can be opened through the existing project detail route
* confirm the future database-backed registry/sync path remains unimplemented

## MS-021.6 - Local Project Discovery UI Read-Only Foundation

**Milestone**
MS-021.6 - Local Project Discovery UI Read-Only Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the conservative local project discovery boundary through the smallest safe read-only UI surface so the project list page can present filesystem-discovered projects from `GET /api/projects` without importing, merging, or migrating them into browser state.

**Product Outcome**
The repository now fetches `GET /api/projects` on the project list page, renders a separate read-only filesystem-discovered projects section, keeps discovered projects separate from browser/localStorage project state, and preserves the existing browser create flow. The canonical app version is now `0.021.6`.

**Dependencies**
* closed `MS-021.5 - Local Project Discovery API Foundation`

**Allowed Implementation Scope**
* minimal read-only UI discovery section on the project list page
* conservative rendering of filesystem-discovered local projects
* focused page/UI tests for the touched UI boundary
* SSOT synchronization for the read-only discovery milestone
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* import workflow
* automatic localStorage merge
* database sync
* storage migration
* task/knowledge/history disk loading
* Project Brain rewrite
* route restructuring beyond the minimal UI change

**Ownership Boundaries**
* `src/app/projects/page.tsx` and `src/app/projects/page.test.tsx` own the read-only UI discovery contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- --run src/app/projects/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm the page renders filesystem-discovered projects as read-only UI
* confirm the future database-backed registry/sync path remains unimplemented

## MS-021.5 - Local Project Discovery API Foundation

**Milestone**
MS-021.5 - Local Project Discovery API Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the conservative local project discovery boundary through the smallest safe API surface so the server can return discovered manifest-backed projects from `C:\SPS_OS_WORK` without introducing UI discovery, import orchestration, or storage migration.

**Product Outcome**
The repository now serves `GET /api/projects`, which returns `{ projects: [...] }` from `discoverServerProjectsFromWorkingRoot("C:\\SPS_OS_WORK")` and only exposes valid manifest-backed local projects. The canonical app version is now `0.021.5`.

**Dependencies**
* closed `MS-021.4 - Local Project Directory Discovery Contract Foundation`

**Allowed Implementation Scope**
* minimal server-only discovery API
* conservative response shape for discovered local projects
* focused route/server tests for the touched API boundary
* SSOT synchronization for the discovery API milestone
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* UI scanner
* import workflow
* automatic localStorage merge
* database sync
* storage migration
* task/knowledge/history disk loading
* Project Brain rewrite
* route restructuring beyond the minimal API route

**Ownership Boundaries**
* `src/app/api/projects/route.ts` and `src/app/api/projects/route.test.ts` own the API discovery contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- --run src/app/api/projects/route.test.ts`
* `git diff --check`
* `git status -sb`
* confirm the API returns only manifest-backed discovered projects
* confirm the future database-backed registry/sync path remains unimplemented

## MS-021.4 - Local Project Directory Discovery Contract Foundation

**Milestone**
MS-021.4 - Local Project Directory Discovery Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the smallest conservative discovery boundary for local project directories under `C:\SPS_OS_WORK` so the server can enumerate immediate child directories and reopen only valid manifest-backed projects without introducing a UI scanner, import flow, or storage migration.

**Product Outcome**
The repository now exposes `discoverServerProjectsFromWorkingRoot(workingRoot)` so the server can inspect immediate child directories of a known work root, reuse `getServerProjectByWorkingDirectory(...)`, and return only valid manifest-backed projects while ignoring missing or invalid manifests safely. The canonical app version is now `0.021.4`.

**Dependencies**
* closed `MS-021.3 - Local Project Directory Reopen Discovery Foundation`

**Allowed Implementation Scope**
* minimal server-side discovery helper
* immediate child directory enumeration under the configured SPS work root
* focused tests for the touched project server helper
* SSOT synchronization for the discovery contract milestone
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* UI scanner
* import workflow
* database registry/sync
* localStorage migration
* task/knowledge/history disk loading
* Project Brain rewrite
* route restructuring
* broad refactor

**Ownership Boundaries**
* `src/lib/project/server.ts` and `src/lib/project/server.test.ts` own the discovery contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- --run src/components/app-version-badge.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm the discovery helper reuses known-directory reopen logic and filters invalid entries safely
* confirm the future database-backed registry/sync path remains unimplemented

## MS-021.3 - Local Project Directory Reopen Discovery Foundation

**Milestone**
MS-021.3 - Local Project Directory Reopen Discovery Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Establish the smallest safe server-side boundary for reopening a known local project directory from `sps-project.json`, without introducing a full import, scanner UI, database sync, or storage migration.

**Product Outcome**
The repository now exposes `getServerProjectByWorkingDirectory(workingDirectory)` so a known local project directory can be reopened from disk authority by reading and validating `sps-project.json`. The helper returns a `Project` with `projectFilesystemStatus: "manifest-present"` for valid manifests and `null` for missing or invalid manifests. The canonical app version is now `0.021.3`.

**Dependencies**
* closed `MS-021.2 - Local Project Directory Initialization Contents Foundation`

**Allowed Implementation Scope**
* minimal server helper for reading and validating `sps-project.json`
* focused tests for the touched project server helper
* SSOT synchronization for the reopen-discovery milestone
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* full project import UI
* recursive filesystem scanner UI
* database registry/sync
* localStorage migration
* task/knowledge/history disk loading
* Project Brain rewrite
* route restructuring
* broad refactor

**Ownership Boundaries**
* `src/lib/project/server.ts` and `src/lib/project/server.test.ts` own the reopen-discovery contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- --run src/lib/project/server.test.ts`
* `git diff --check`
* `git status -sb`
* confirm the helper reopens valid manifests and rejects missing or invalid ones
* confirm the future database-backed registry/sync path remains unimplemented

## MS-021.2 - Local Project Directory Initialization Contents Foundation

**Milestone**
MS-021.2 - Local Project Directory Initialization Contents Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Give newly created local project directories a deterministic starter presence so they are no longer an effectively empty filesystem artifact after creation, while preserving the `sps-project.json` manifest contract, the filesystem status contract, and the future database-backed registry/sync path.

**Product Outcome**
The repository now writes a minimal `README.md` into newly created local project directories so the directory identifies the project name and id, states that SPS OS owns the directory, and explains that `sps-project.json` is the canonical manifest. The canonical app version is now `0.021.2`.

**Dependencies**
* closed `MS-021.1 - Local Project Filesystem Status Visibility Foundation`

**Allowed Implementation Scope**
* minimal starter content in the existing project creation flow
* deterministic project-local `README.md`
* focused tests for the touched server path
* SSOT synchronization for the initialization contents milestone
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* task/knowledge/history migration
* database sync
* registry implementation
* project template system
* Git initialization inside project directory
* broad folder architecture
* UI redesign
* route restructuring

**Ownership Boundaries**
* `src/lib/project/server.ts` and `src/lib/project/server.test.ts` own the initialization contents contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- --run src/lib/project/server.test.ts src/lib/project/project.test.ts src/lib/project/project-task-flow.test.ts`
* `git diff --check`
* `git status -sb`
* confirm the created directory now contains a deterministic `README.md`
* confirm the future database-backed registry/sync path remains unimplemented

## MS-021.1 - Local Project Filesystem Status Visibility Foundation

**Milestone**
MS-021.1 - Local Project Filesystem Status Visibility Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Expose the physical filesystem project authority signal in the smallest safe way so project views can distinguish a project with a manifest from a browser/local-only or incomplete project state, while preserving the future database-backed registry or sync path for a later milestone.

**Product Outcome**
The repository now distinguishes `manifest-present`, `manifest-missing`, and `unknown` project filesystem status values when the working directory is known, shows a restrained filesystem status indicator on the existing project detail surface, and keeps the future database-backed registry or sync path preserved for a later milestone. The canonical app version is now `0.021.1`.

**Dependencies**
* closed `MS-021.0 - Local Project Filesystem Authority Foundation`

**Allowed Implementation Scope**
* project filesystem status detection from the existing project read path
* restrained filesystem status visibility on existing project surfaces
* focused tests for the touched project helper and UI path
* SSOT synchronization for the status visibility milestone
* preserve the future database-backed registry/sync path

**Forbidden Scope**
* full localStorage replacement
* database sync
* registry implementation
* Project Brain rewrite
* task/knowledge/history migration
* broad UI redesign
* route restructuring
* unrelated cleanup

**Ownership Boundaries**
* `src/lib/project/` owns the filesystem status helpers and read path contract
* `src/app/projects/` owns the restrained project detail visibility surface
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- --run src/lib/project/server.test.ts src/lib/project/project-task-flow.test.ts src/lib/project/project.test.ts src/app/projects/page.test.tsx src/app/projects/[id]/page.filesystem-status.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm the project detail surface distinguishes manifest-present, manifest-missing, and unknown states
* confirm the future database-backed registry/sync path remains unimplemented

## MS-021.0 - Local Project Filesystem Authority Foundation

**Milestone**
MS-021.0 - Local Project Filesystem Authority Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Anchor project identity physically on disk with the smallest safe manifest written into the project working directory, without replacing the existing database insert path or introducing a broader storage migration.

**Product Outcome**
The repository now writes a minimal `sps-project.json` manifest into the project working directory during project creation so project identity is physically anchored on disk while the existing database insert path remains intact. The local filesystem manifest is now the first authority anchor, and the future database-backed registry or sync path remains preserved for a later milestone.

**Dependencies**
* closed `MS-020.0 - Polish UI Language Overlay Foundation`

**Allowed Implementation Scope**
* minimal project manifest write in the existing project creation helper
* focused tests for the touched project helper and task-flow path
* SSOT synchronization for the new milestone
* preserve the future database registry/sync path

**Forbidden Scope**
* full storage migration
* full localStorage replacement
* database sync
* Project Brain rewrite
* task/knowledge/history migration
* broad UI redesign
* route restructuring
* unrelated cleanup

**Ownership Boundaries**
* `src/lib/project/server.ts`
* `src/lib/project/server.test.ts`
* `src/lib/project/project-task-flow.test.ts`
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- --run src/lib/project/server.test.ts src/lib/project/project-task-flow.test.ts`
* `git diff --check`
* `git status -sb`
* confirm `sps-project.json` is written inside the project working directory
* confirm the future database registry/sync path remains unimplemented

## MS-020.0 - Polish UI Language Overlay Foundation

**Milestone**
MS-020.0 - Polish UI Language Overlay Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Apply the smallest safe Polish UI language overlay to existing visible SPS OS surfaces without introducing a new i18n system or changing storage, routing, or product behavior.

**Product Outcome**
The repository now presents a first Polish UI overlay across the existing home, project, overview, task, and AI Workspace surfaces while keeping the canonical app version badge and existing task and knowledge flows intact. MS-020.0 also bumps the canonical app version to `0.020.0`.

**Dependencies**
* closed `MS-019.0 - Application Version Visibility Foundation`

**Allowed Implementation Scope**
* replace visible English labels with Polish copy on existing surfaces
* keep canonical version strings unchanged
* focused tests for the touched surfaces
* SSOT synchronization for the overlay milestone

**Forbidden Scope**
* new i18n framework
* route restructuring
* storage architecture changes
* AI provider changes
* broad redesign
* unrelated cleanup

**Ownership Boundaries**
* `src/app/page.tsx`
* `src/app/projects/page.tsx`
* `src/app/projects/[id]/page.tsx`
* `src/app/projects/[id]/tasks/page.tsx`
* `src/app/projects/[id]/ai/page.tsx`
* shared workspace UI components used by those surfaces
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- src/app/page.test.tsx src/app/projects/page.test.tsx src/app/projects/[id]/page.test.tsx src/app/projects/[id]/tasks/page.test.tsx src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm the visible copy is Polish on the touched surfaces
* confirm `MS-020.0` is the latest completed milestone

## MS-019.0 - Application Version Visibility Foundation

**Milestone**
MS-019.0 - Application Version Visibility Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
YES

**Runtime Status**
OPEN

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Introduce the smallest visible application version contract so the SPS OS shell clearly exposes the current app version after refresh while keeping the canonical version source controlled and simple.

**Product Outcome**
The repository now uses the canonical app version `0.000.0` from `src/lib/app-version.ts` and shows it in a small unobtrusive badge in the app shell. The version is visible on refresh and remains aligned with the accepted live PASS.

**Dependencies**
* closed `MS-018.3 - Create Task From Retrieved Memory Foundation`

**Allowed Implementation Scope**
* one canonical app version source
* one small visible version badge in the existing app shell
* focused tests for the visible version surface
* milestone version bumps for `.0` app/platform milestones use `0.XXX.0`
* SSOT synchronization for versioning rules

**Forbidden Scope**
* broad layout redesign
* versioning automation
* package-manager churn
* unrelated UI polish
* patch/live-fix version policy expansion

**Ownership Boundaries**
* `src/lib/app-version.ts` owns the canonical app version string
* `src/app/layout.tsx` owns the visible shell badge
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone

**Verification Plan**
* `npm.cmd test -- src/components/app-version-badge.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm the visible badge shows `APP v0.000.0`
* confirm `MS-019.0` is the latest completed milestone

## MS-018.3 - Create Task From Retrieved Memory Foundation

**Milestone**
MS-018.3 - Create Task From Retrieved Memory Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Add the smallest user-initiated task creation path from the retrieved memory panel using the existing task browser/server helpers, without implying automatic recovery of the missing original task.

**Product Outcome**
The repository now exposes one explicit `Create task from memory` action on the AI Workspace retrieved-memory panel, creates a new task with a conservative memory-derived title through the existing task storage path, and leaves the Knowledge and Project Brain read paths unchanged.
The milestone is live verified in the current workspace and the persisted task remains visible on AI Workspace, Overview, and `/tasks`.

**Dependencies**
* closed `MS-018.1 - Project Brain Memory Retrieval UX First Surface Foundation`

**Allowed Implementation Scope**
* one explicit user-initiated action on the existing AI Workspace retrieved-memory panel
* existing task browser/server create helper
* focused tests for the touched surface
* SSOT synchronization if product behavior changes

**Forbidden Scope**
* automatic task restoration
* claims that the original missing task was found
* storage architecture change
* migration system
* AI provider changes
* route restructuring
* broad AI Workspace redesign
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone
* `src/app/projects/[id]/ai/page.tsx` and `src/app/projects/[id]/ai/page.test.tsx` are the only touched implementation surfaces in this milestone

**Verification Plan**
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm task creation uses `soft-premium-system.projects.${projectId}.tasks`
* confirm Knowledge storage remains untouched
* confirm `MS-018.3` remains published and closed as the latest completed milestone
* confirm `MS-018.1` remains preserved as the prior completed milestone

## MS-018.1 - Project Brain Memory Retrieval UX First Surface Foundation

**Milestone**
MS-018.1 - Project Brain Memory Retrieval UX First Surface Foundation

**Type**
Product Milestone

**Contract Status**
APPROVED

**Active**
YES

**Runtime Status**
OPEN

**Owner**
Product Owner

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Implement the smallest useful Project Brain memory retrieval UX surface using the existing saved Knowledge and Project Brain browser read paths.

**Product Outcome**
The repository now exposes a small retrieved-memory area on the existing AI Workspace surface so the user can see recently retrieved project knowledge context without changing storage architecture or AI provider behavior.

**Dependencies**
* closed `MS-018.0 - Project Brain First Useful Memory Retrieval Foundation`

**Allowed Implementation Scope**
* one small UI/read-path improvement on an existing route
* existing project-scoped AI Workspace surface
* focused tests for the touched surface
* SSOT synchronization if product behavior changes

**Forbidden Scope**
* storage architecture change
* new AI provider logic
* large AI Workspace redesign
* Konduktor redesign
* new module system
* route restructuring
* broad CSS redesign
* opportunistic cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this milestone
* `src/app/projects/[id]/ai/page.tsx` and `src/app/projects/[id]/ai/page.test.tsx` are the only touched implementation surfaces in this milestone

**Verification Plan**
* `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx`
* `git diff --check`
* `git status -sb`
* confirm `MS-018.0` remains published and closed as the latest completed milestone
* confirm `MS-018.3` is the only new active product milestone

**Milestone**
MS-018.0 - Project Brain First Useful Memory Retrieval Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the smallest controlled Project Brain memory retrieval boundary for returning useful project context after a save or revisit without changing runtime behavior in this milestone.

**Product Outcome**
The repository now records a docs-only contract for the first useful Project Brain memory retrieval path and confirms the existing browser read and recovery surfaces remain the supported boundary for this step.

**Dependencies**
* closed `MS-017.2 - Project Brain Knowledge Read Recovery Boundary Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* diagnostic confirmation of existing Project Brain read and recovery surfaces
* SSOT synchronization for milestone publication
* no source code changes in this milestone

**Forbidden Scope**
* UI changes
* storage or persistence changes
* new routes
* new AI provider logic
* broad Project Brain refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this docs-only milestone
* `src/lib/project-brain/browser.ts`, `src/lib/project-brain/types.ts`, `src/lib/knowledge/browser-server.ts`, `src/app/projects/[id]/knowledge/page.tsx`, and `src/app/projects/[id]/ai/page.tsx` remain unchanged in this milestone

**Verification Plan**
* `git status -sb`
* `rg -n "MS-018.0|Project Brain|knowledge|fallback" docs src`
* confirm the existing browser and Knowledge read and recovery surfaces already satisfy the smallest useful retrieval boundary
* confirm no `src` change was required for this contract step

## MS-015.0 - First Real User Flow Polish Foundation

**Milestone**
MS-015.0 - First Real User Flow Polish Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Make the first real SPS user journey feel coherent end to end using the existing application surfaces and mechanics.

**Product Outcome**
The primary happy path now reads coherently across Home, Create Project, Open Project, Task List, Task Detail, Task Workspace, Save Result, Acknowledge Review, Complete Task, and Copy Handoff without adding new routes or storage changes.

**Dependencies**
* closed `MS-014.0 - Application Metadata and Locale Stabilization Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/page.tsx`
* `src/app/projects/[id]/tasks/page.tsx`
* `src/app/projects/[id]/tasks/[taskId]/page.tsx`

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.10 - Parallel Project Work Track Workspace Continuation Verification Foundation

**Milestone**
MS-012.10 - Parallel Project Work Track Workspace Continuation Verification Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Verify the controlled continuation after MS-012.9 from task workspace back to the task list by confirming the return path remains coherent without changing the existing handoff flow.

**Product Outcome**
The repository now records `MS-012.10` as the next controlled continuation after `MS-012.9`, keeps `MS-011.0` through `MS-012.9` immutable, and confirms the workspace return path already points the user back to the task list without a product code patch.

**Dependencies**
* closed `MS-012.9 - Parallel Project Work Track First Guided Next Action Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` already renders `Return to task list` with the task list route target
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` already verifies the link label and `href`
* the existing `Continue to result notes` and `Copy handoff` flow remains unchanged
* no product code patch was required because the continuation path was already correct

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.9 - Parallel Project Work Track First Guided Next Action Foundation

**Milestone**
MS-012.9 - Parallel Project Work Track First Guided Next Action Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first guided next action after MS-012.8 for continuing parallel project work from the task workspace back toward the task list without broad orchestration.

**Product Outcome**
The repository now records `MS-012.9` as the next controlled continuation after `MS-012.8`, keeps `MS-011.0` through `MS-012.8` immutable, and adds one visible workspace cue that returns the user to the task list while preserving the existing task workspace handoff path.

**Dependencies**
* closed `MS-012.8 - Parallel Project Work Track First Functional Handoff Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` now includes a visible `Return to task list` cue alongside the existing next-step action block
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.test.tsx` now verifies the task list return cue
* the existing `Continue to result notes` and `Copy handoff` flow remains unchanged
* no broader project, task list, or task detail changes were required

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.8 - Parallel Project Work Track First Functional Handoff Foundation

**Milestone**
MS-012.8 - Parallel Project Work Track First Functional Handoff Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first visible, controlled functional handoff after MS-012.7 for continuing parallel project work across an existing project, its task list, a task detail view, and a task workspace without broad orchestration.

**Product Outcome**
The repository now records `MS-012.8` as the next controlled continuation after `MS-012.7`, keeps `MS-011.0` through `MS-012.7` immutable, and confirms the existing project, task list, task detail, and task workspace surfaces already expose the controlled handoff boundary without a product code patch.

**Dependencies**
* closed `MS-012.7 - Parallel Project Work Track First Readiness Gate Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/page.tsx` already exposes `Open tasks` and the task list continuation entry points from the project surface
* `src/app/projects/[id]/tasks/page.tsx` already lists tasks as the continuation surface into task work
* `src/app/projects/[id]/tasks/[taskId]/page.tsx` already exposes `Open task workspace`
* `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx` already exposes the visible next-step action and the `Copy handoff` completion boundary
* targeted route tests already cover the existing project, task list, task detail, and task workspace continuation surfaces
* no product code patch was required because the functional handoff boundary already exists in the repository

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.7 - Parallel Project Work Track First Readiness Gate Foundation

**Milestone**
MS-012.7 - Parallel Project Work Track First Readiness Gate Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first readiness gate after the MS-012.6 verification contract for continuing parallel project work across an existing project, its task list, and a task workspace without broad orchestration.

**Product Outcome**
The repository now records `MS-012.7` as the next controlled continuation after `MS-012.6`, keeps `MS-011.0`, `MS-011.1`, `MS-012.0`, `MS-012.1`, `MS-012.2`, `MS-012.3`, `MS-012.4`, `MS-012.5`, and `MS-012.6` immutable, and keeps the parallel work track limited to the existing project, task list, and task workspace readiness contract.

**Dependencies**
* closed `MS-012.6 - Parallel Project Work Track First Verification Contract Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.7` as the next controlled continuation after `MS-012.6`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.7`
* `docs/09_CHANGELOG.md` now records the `MS-012.7` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.7`
* no product code patch was required because the existing project, task list, and task workspace surfaces already expose the readiness-gate boundary

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.6 - Parallel Project Work Track First Verification Contract Foundation

**Milestone**
MS-012.6 - Parallel Project Work Track First Verification Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first verification contract after the MS-012.5 controlled execution contract for continuing parallel project work across an existing project, its task list, and a task workspace without broad orchestration.

**Product Outcome**
The repository now records `MS-012.6` as the next controlled continuation after `MS-012.5`, keeps `MS-011.0`, `MS-011.1`, `MS-012.0`, `MS-012.1`, `MS-012.2`, `MS-012.3`, `MS-012.4`, and `MS-012.5` immutable, and keeps the parallel work track limited to the existing project, task list, and task workspace verification contract.

**Dependencies**
* closed `MS-012.5 - Parallel Project Work Track First Controlled Execution Contract Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.6` as the next controlled continuation after `MS-012.5`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.6`
* `docs/09_CHANGELOG.md` now records the `MS-012.6` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.6`
* no product code patch was required because the existing project, task list, and task workspace surfaces already expose the verification contract boundary

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.5 - Parallel Project Work Track First Controlled Execution Contract Foundation

**Milestone**
MS-012.5 - Parallel Project Work Track First Controlled Execution Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first controlled execution contract after the MS-012.4 execution boundary for continuing parallel project work across an existing project, its task list, and a task workspace without broad orchestration.

**Product Outcome**
The repository now records `MS-012.5` as the next controlled continuation after `MS-012.4`, keeps `MS-011.0`, `MS-011.1`, `MS-012.0`, `MS-012.1`, `MS-012.2`, `MS-012.3`, and `MS-012.4` immutable, and keeps the parallel work track limited to the existing project, task list, and task workspace execution contract.

**Dependencies**
* closed `MS-012.4 - Parallel Project Work Track First Execution Boundary Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.5` as the next controlled continuation after `MS-012.4`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.5`
* `docs/09_CHANGELOG.md` now records the `MS-012.5` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.5`
* no product code patch was required because the existing project, task list, and task workspace surfaces already expose the controlled execution contract boundary

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.4 - Parallel Project Work Track First Execution Boundary Foundation

**Milestone**
MS-012.4 - Parallel Project Work Track First Execution Boundary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first execution boundary after the continuation contract boundary for continuing parallel project work across an existing project, its task list, and a task workspace without broad orchestration.

**Product Outcome**
The repository now records `MS-012.4` as the next controlled continuation after `MS-012.3`, keeps `MS-011.0`, `MS-011.1`, `MS-012.0`, `MS-012.1`, `MS-012.2`, and `MS-012.3` immutable, and keeps the parallel work track limited to the existing project, task list, and task workspace execution boundary.

**Dependencies**
* closed `MS-012.3 - Parallel Project Work Track First Continuation Contract Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.4` as the next controlled continuation after `MS-012.3`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.4`
* `docs/09_CHANGELOG.md` now records the `MS-012.4` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.4`
* no product code patch was required because the existing project, task list, and task workspace surfaces already expose the execution boundary

**Blockers**
NONE

**Next Safe Step**
None.

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
The repository now records the existing-project intake boundary, threads optional `repositoryUrl` through the existing project create path, and positions `MS-011.1 - Existing Project Intake First Controlled Flow Foundation` as the next controlled continuation while reserving parallel project work track mechanics for later implementation.

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

## MS-011.1 - Existing Project Intake First Controlled Flow Foundation

**Milestone**
MS-011.1 - Existing Project Intake First Controlled Flow Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first controlled flow after `MS-011.0` for existing project intake without broad implementation, refactor, or starting `MS-012.0`.

**Product Outcome**
The repository now records the next controlled continuation for existing project intake, keeps `MS-011.0` immutable, and positions `MS-012.0` as the next controlled continuation.

**Dependencies**
* closed `MS-011.0 - Existing Project Intake Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-011.1` as the next controlled continuation after `MS-011.0`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-011.1`
* `docs/09_CHANGELOG.md` now records the `MS-011.1` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot
* `docs/06_BACKLOG.md` no longer parks the old `MS-011.1` GitHub import label

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.0 - Parallel Project Work Track Foundation

**Milestone**
MS-012.0 - Parallel Project Work Track Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first controlled foundation for a parallel project work track after existing project intake without implementing broad multi-project orchestration yet.

**Product Outcome**
The repository now records `MS-012.0` as the next controlled continuation after `MS-011.1`, keeps `MS-011.0` and `MS-011.1` immutable, and reserves parallel-work-track mechanics for later implementation.

**Dependencies**
* closed `MS-011.1 - Existing Project Intake First Controlled Flow Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.0` as the next controlled continuation after `MS-011.1`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.0`
* `docs/09_CHANGELOG.md` now records the `MS-012.0` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.0`
* `docs/06_BACKLOG.md` no longer parks `MS-012.0` as future work

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.1 - Parallel Project Work Track First Controlled Scope Foundation

**Milestone**
MS-012.1 - Parallel Project Work Track First Controlled Scope Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first controlled scope for parallel project work track behavior after `MS-012.0` without implementing broad multi-project orchestration or cross-project switching.

**Product Outcome**
The repository now records `MS-012.1` as the next controlled continuation after `MS-012.0`, keeps `MS-011.0`, `MS-011.1`, and `MS-012.0` immutable, and limits the parallel work track to the existing project, task list, and task workspace continuity boundary.

**Dependencies**
* closed `MS-012.0 - Parallel Project Work Track Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.1` as the next controlled continuation after `MS-012.0`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.1`
* `docs/09_CHANGELOG.md` now records the `MS-012.1` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.1`
* no product code patch was required because the existing project, task list, and task workspace surfaces already expose the narrow continuity boundary

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.2 - Parallel Project Work Track First Usability Review Foundation

**Milestone**
MS-012.2 - Parallel Project Work Track First Usability Review Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first usability review boundary for continuing work across an existing project, its task list, and a task workspace without implementing broad multi-project orchestration.

**Product Outcome**
The repository now records `MS-012.2` as the next controlled continuation after `MS-012.1`, keeps `MS-011.0`, `MS-011.1`, `MS-012.0`, and `MS-012.1` immutable, and limits the usability review boundary to the existing project, task list, and task workspace continuity path.

**Dependencies**
* closed `MS-012.1 - Parallel Project Work Track First Controlled Scope Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.2` as the next controlled continuation after `MS-012.1`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.2`
* `docs/09_CHANGELOG.md` now records the `MS-012.2` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.2`
* no product code patch was required because the existing project, task list, and task workspace surfaces already expose the narrow usability review boundary

**Blockers**
NONE

**Next Safe Step**
None.

## MS-012.3 - Parallel Project Work Track First Continuation Contract Foundation

**Milestone**
MS-012.3 - Parallel Project Work Track First Continuation Contract Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first continuation contract after the usability review boundary for continuing work across an existing project, its task list, and a task workspace without broad orchestration.

**Product Outcome**
The repository now records `MS-012.3` as the next controlled continuation after `MS-012.2`, keeps `MS-011.0`, `MS-011.1`, `MS-012.0`, `MS-012.1`, and `MS-012.2` immutable, and keeps the parallel work track limited to the existing project, task list, and task workspace continuity path.

**Dependencies**
* closed `MS-012.2 - Parallel Project Work Track First Usability Review Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records `MS-012.3` as the next controlled continuation after `MS-012.2`
* `docs/08_CURRENT_STATE.md` now keeps the current state aligned with `MS-012.3`
* `docs/09_CHANGELOG.md` now records the `MS-012.3` publication sync
* `docs/10_SESSION_STATE.md` now records the Session 069 operational snapshot for `MS-012.3`
* no product code patch was required because the existing project, task list, and task workspace surfaces already expose the continuation contract boundary

**Blockers**
NONE

**Next Safe Step**
None.

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
 * `docs/08_CURRENT_STATE.md` keeps `Latest Completed Product Milestone` at `MS-014.0 - Application Metadata and Locale Stabilization Foundation`.
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

## MS-013.0 - Project Working Directory Creation Prompt Foundation

**Milestone**
MS-013.0 - Project Working Directory Creation Prompt Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the first controlled boundary for project working-directory creation during new project intake so the repository can require an explicit local working-directory decision before project setup is considered complete.

**Product Outcome**
The repository now records the working-directory decision boundary for new project creation, supports the default local workspace root `C:\SPS_OS_WORK\<project-slug>` as the SPS-owned local working copy path, and keeps `repositoryUrl` and other source metadata separate from the local working copy location without implementing directory creation yet.

**Dependencies**
* closed `MS-012.10 - Parallel Project Work Track Workspace Continuation Verification Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `docs/04_ROADMAP.md` now records the MS-013.0 working-directory decision boundary
* `docs/08_CURRENT_STATE.md` now records MS-013.0 as the next controlled milestone
* `docs/09_CHANGELOG.md` now records the MS-013.0 publication sync
* `docs/10_SESSION_STATE.md` now records the Session 071 operational snapshot
* `.usage/session.jsonl` now records the Session 071 contract publication usage entry
* no product code changed

**Allowed Implementation Scope**
* docs-only contract publication
* SSOT synchronization
* publication metadata
* history recording for the completed contract milestone

**Forbidden Scope**
* `src` changes
* working-directory creation implementation
* UI changes
* route changes
* product code changes
* broad refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this docs-only milestone
* any future implementation must stay inside the approved working-directory creation boundary and outside product code until a separate Product Owner-approved implementation milestone exists

**Verification Plan**
* `git status -sb`
* `git diff --check`
* `git diff -- docs/04_ROADMAP.md docs/08_CURRENT_STATE.md docs/09_CHANGELOG.md docs/10_SESSION_STATE.md .usage/session.jsonl`
* confirm no product code files changed

**Rollback / Safety Expectations**
* if the contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

## MS-013.1 - Project Working Directory Creation Prompt Implementation Foundation

**Milestone**
MS-013.1 - Project Working Directory Creation Prompt Implementation Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Implement the first controlled project working-directory decision prompt in the new project creation flow so setup cannot complete without an intended local working-directory value.

**Product Outcome**
The new project flow now records an explicit working-directory decision, shows the default intended local workspace root `C:\SPS_OS_WORK\<project-slug>`, and stores that intended local working copy path separately from `repositoryUrl` or other source metadata without creating the physical folder yet.

**Dependencies**
* closed `MS-013.0 - Project Working Directory Creation Prompt Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/page.tsx` now asks for an intended working directory and sends it with the project create request
* `src/lib/project/project.ts` now stores the intended working directory in the local project record and falls back to the default `C:\SPS_OS_WORK\<project-slug>` path
* `src/app/projects/page.test.tsx` now verifies the default local workspace path and the create-request payload
* `src/lib/project/project.test.ts` now verifies the default working-directory storage behavior
* no physical folder creation was added in this milestone

**Allowed Implementation Scope**
* docs-only contract publication
* SSOT synchronization
* local project record persistence for the intended working directory
* project creation prompt behavior

**Forbidden Scope**
* physical filesystem folder creation
* unrelated UI redesign
* unrelated project/task/workspace behavior changes
* broad refactors

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this milestone
* any future physical folder creation work must wait for a separate Product Owner-approved implementation milestone

**Verification Plan**
* `git status -sb`
* `npm.cmd test -- src/lib/project/project.test.ts src/app/projects/page.test.tsx`
* `npm.cmd test -- --runInBand`
* `npm.cmd run lint`
* `npm.cmd run build`
* `git diff --check`
* `git diff --stat`
* `git status -sb`

**Rollback / Safety Expectations**
* if the contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

## MS-013.2 - Project Creation Readiness Gate Foundation

**Milestone**
MS-013.2 - Project Creation Readiness Gate Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Add the minimum controlled readiness gate for project creation so SPS OS does not treat a project as ready unless the project metadata, local working directory, and Project Brain status are explicit.

**Product Outcome**
New project creation now creates the selected or default working directory, records an explicit `projectBrainStatus` state, and surfaces the non-ready state when Project Brain is unavailable instead of silently presenting a false-ready project.

**Dependencies**
* closed `MS-013.1 - Project Working Directory Creation Prompt Implementation Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/project/server.ts` now creates the selected or default local working directory before persisting a new project record and raises a clear error when directory creation fails
* `src/lib/project/http-server.ts` and `src/app/projects/page.tsx` now surface the working-directory failure path back to the project create flow
* `src/lib/project/project.ts` and `src/app/projects/[id]/page.tsx` now keep `projectBrainStatus` explicit and show the pending readiness state when Project Brain is unavailable
* `src/lib/project/project-task-flow.test.ts`, `src/lib/project/server.test.ts`, `src/lib/project/http-server.test.ts`, `src/lib/project/project.test.ts`, `src/app/projects/page.test.tsx`, and `src/app/projects/[id]/page.test.tsx` now cover the readiness-gate flow, failure path, and pending banner behavior
* task storage fallback behavior was left explicit and deferred to a later milestone rather than being redesigned here

**Allowed Implementation Scope**
* project creation readiness gate
* working directory physical creation
* explicit Project Brain availability status
* focused tests
* SSOT synchronization

**Forbidden Scope**
* broad refactors
* full Project Brain redesign
* Git clone/init behavior
* unrelated task workspace changes
* unrelated lint/build fixes

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this milestone
* any future Project Brain initialization or task fallback redesign must wait for a separate Product Owner-approved milestone

**Verification Plan**
* `git branch --show-current`
* `git status -sb`
* `npm.cmd test -- src/lib/project/project.test.ts src/lib/project/server.test.ts src/lib/project/http-server.test.ts src/app/projects/page.test.tsx src/app/projects/[id]/page.test.tsx`
* `npm.cmd test`
* `npm.cmd run lint`
* `npm.cmd run build`
* `git diff --check`
* `git diff --stat`
* `git status -sb`

**Rollback / Safety Expectations**
* if the contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

## MS-013.3 - Project Readiness / Workflow Health Status Alignment Foundation

**Milestone**
MS-013.3 - Project Readiness / Workflow Health Status Alignment Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Align the project dashboard workflow health display with explicit project readiness so the UI does not imply full readiness while Project Brain is pending.

**Product Outcome**
The project detail dashboard now derives workflow health from explicit project readiness, keeping the Project Brain pending state visible and preventing the dashboard from presenting a misleading ready state while tasks remain usable.

**Dependencies**
* closed `MS-013.2 - Project Creation Readiness Gate Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/projects/[id]/page.tsx` now derives the dashboard workflow-health display from the local project readiness state
* `src/app/projects/[id]/page.test.tsx` now verifies that a pending Project Brain state renders the warning workflow-health display instead of a misleading ready state
* `src/lib/project/project.ts` and `src/lib/project/types.ts` continue to keep the Project Brain status explicit without changing task storage behavior
* `npm.cmd test -- src/app/projects/[id]/page.test.tsx src/lib/project/project.test.ts` passed
* `npm.cmd test` passed with `30 / 30` files and `382 / 382` tests
* `npm.cmd run build` passed
* `npm.cmd run lint` still reports the known unrelated `react-hooks/set-state-in-effect` issue in `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx:324`

**Allowed Implementation Scope**
* dashboard / project detail readiness display
* workflow health / status derivation
* focused tests
* SSOT synchronization

**Forbidden Scope**
* full Project Brain implementation
* Git clone/init behavior
* broad task workspace refactor
* unrelated lint fixes
* side branch changes

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this milestone
* any future Project Brain redesign must wait for a separate Product Owner-approved milestone

**Verification Plan**
* `git branch --show-current`
* `git status -sb`
* `npm.cmd test -- src/app/projects/[id]/page.test.tsx src/lib/project/project.test.ts`
* `npm.cmd test`
* `npm.cmd run lint`
* `npm.cmd run build`
* `git diff --check`
* `git diff --stat`
* `git status -sb`

**Rollback / Safety Expectations**
* if the contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

## MS-013.4 - AI Workspace Project Access Boundary Alignment Foundation

**Milestone**
MS-013.4 - AI Workspace Project Access Boundary Alignment Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Align the AI Workspace project access boundary with Overview and Tasks so the AI route resolves the same existing project that the user can already open elsewhere in the product.

**Product Outcome**
The AI Workspace now falls back to the local project boundary when the server-backed project lookup misses, so a real project that exists in Overview and Tasks is no longer misreported as not found on the AI route.

**Dependencies**
* closed `MS-013.3 - Project Readiness / Workflow Health Status Alignment Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/project-brain/browser.ts` now falls back to the local AI project boundary when the server-backed project lookup returns `project-not-found`
* `src/lib/project-brain/browser.test.ts` now verifies the local boundary fallback when the server project is missing
* the AI route page itself did not need a route-specific access rewrite because the shared browser helper now aligns the boundary
* `npm.cmd test -- src/lib/project-brain/browser.test.ts` passed
* `npm.cmd test` passed with `30 / 30` files and `383 / 383` tests
* `npm.cmd run build` passed
* `npm.cmd run lint` still reports the known unrelated `react-hooks/set-state-in-effect` issue in `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx:324`

**Allowed Implementation Scope**
* AI Workspace project access boundary alignment
* shared browser project context resolution
* focused tests
* SSOT synchronization

**Forbidden Scope**
* task flow changes
* Project Brain readiness changes
* project creation changes
* broad task workspace refactor
* unrelated lint fixes

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this milestone
* any future AI Workspace redesign must wait for a separate Product Owner-approved milestone

**Verification Plan**
* `git branch --show-current`
* `git status -sb`
* `npm.cmd test -- src/lib/project-brain/browser.test.ts`
* `npm.cmd test`
* `npm.cmd run lint`
* `npm.cmd run build`
* `git diff --check`
* `git diff --stat`
* `git status -sb`

**Rollback / Safety Expectations**
* if the contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

## MS-013.5 - Task Intake Project Access Boundary Alignment Foundation

**Milestone**
MS-013.5 - Task Intake Project Access Boundary Alignment Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Align the task API/project access boundary with Overview and AI Workspace so task list and task creation recognize the same existing project boundary.

**Product Outcome**
The task API now operates on task storage for the route project id instead of blocking on a server-side project lookup, so a real project that Overview and AI can resolve is no longer rejected as missing by the task API.

**Dependencies**
* closed `MS-013.4 - AI Workspace Project Access Boundary Alignment Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/lib/task/http-server.ts` now serves task GET and POST directly from the task storage boundary instead of returning `project-not-found` when the server-side project lookup misses
* `src/lib/task/http-server.test.ts` now verifies that task GET continues for a missing project boundary and task POST no longer depends on the project lookup
* `src/lib/project-brain/browser.ts` and `src/app/projects/[id]/ai/page.tsx` remain unchanged by this milestone
* `npm.cmd test -- src/lib/task/http-server.test.ts` passed
* `npm.cmd test` passed with `30 / 30` files and `381 / 381` tests
* `npm.cmd run build` passed
* `npm.cmd run lint` still reports the known unrelated `react-hooks/set-state-in-effect` issue in `src/app/projects/[id]/tasks/[taskId]/workspace/page.tsx:324`

**Allowed Implementation Scope**
* task API route/project lookup boundary
* task storage access boundary
* focused tests
* SSOT synchronization

**Forbidden Scope**
* changing AI Workspace behavior
* changing Project Brain readiness logic
* broad task workspace refactor
* unrelated lint fixes

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this milestone
* any future task workspace redesign must wait for a separate Product Owner-approved milestone

**Verification Plan**
* `git branch --show-current`
* `git status -sb`
* `npm.cmd test -- src/lib/task/http-server.test.ts`
* `npm.cmd test`
* `npm.cmd run lint`
* `npm.cmd run build`
* `git diff --check`

---

## MS-014.0 - Application Metadata and Locale Stabilization Foundation

**Milestone**
MS-014.0 - Application Metadata and Locale Stabilization Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Replace the template-default app metadata and align the root document language with the Polish-heavy UI without changing product flows.

**Product Outcome**
The app root layout now publishes product-aligned metadata and uses `pl` as the document language, removing the default Next template title and description from the root response while leaving product flows unchanged.

**Dependencies**
* closed `MS-013.5 - Task Intake Project Access Boundary Alignment Foundation`

**Product Owner Decision**
ACCEPT

**Implementation Status**
COMPLETED / VERIFIED

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Implementation Evidence**
* `src/app/layout.tsx` now sets the root metadata title to `Soft Premium System` and the description to `SPS OS workspace for project and task operations.`
* `src/app/layout.tsx` now sets the document language to `pl`
* `npm.cmd run test -- src/app/page.test.tsx src/app/projects/page.test.tsx` passed
* `npm.cmd run test` passed
* the live root response no longer exposed `Create Next App` metadata and returned `<html lang="pl">`
* `git diff --check` passed

**Allowed Implementation Scope**
* root layout metadata
* root document language
* focused tests
* SSOT synchronization

**Forbidden Scope**
* product-flow changes
* route behavior changes
* broad refactor
* unrelated file edits

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/10_SESSION_STATE.md`, and `.usage/session.jsonl` own the synchronized SSOT snapshot for this milestone
* any future product-flow change must wait for a separate Product Owner-approved milestone

**Verification Plan**
* `git branch --show-current`
* `git status -sb`
* `npm.cmd run test -- src/app/page.test.tsx src/app/projects/page.test.tsx`
* `npm.cmd run test`
* `git diff --check`
* live root response check
* `git diff --stat`
* `git status -sb`

**Rollback / Safety Expectations**
* if the contract needs revision, update only the SSOT docs that define the milestone boundary and keep `Current Product Milestone` at `NONE` until a separate Product Owner decision is recorded

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

# MS-017.0 - Project Brain Knowledge Intake Foundation

**Milestone**
MS-017.0 - Project Brain Knowledge Intake Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Active**
NO

**Runtime Status**
CLOSED

**Owner**
Chief Architect

**Architecture Owner**
Chief Architect

**Implementation Engine**
Codex

**Purpose**
Define the smallest controlled Project Brain knowledge intake boundary as a docs-only milestone without changing knowledge storage, knowledge creation, UI behavior, routes, or any existing Project Brain read/write mechanics.

**Product Outcome**
The repository now records one minimal Project Brain knowledge intake contract that keeps knowledge intake scope narrow, read-only for this milestone, and free of runtime behavior changes.

**Dependencies**
* closed `MS-016.2 - Project Brain Status Verification UX Foundation`

**Allowed Implementation Scope**
* docs-only product contract creation
* SSOT synchronization
* publication metadata
* history recording for the completed contract milestone

**Forbidden Scope**
* `src` changes
* UI changes
* new routes
* knowledge writes
* Project Brain write-path changes
* storage or persistence changes
* broad refactors
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this docs-only milestone
* `src/lib/project-brain` and the knowledge routes remain unchanged in this milestone
* any future implementation must stay inside a separate Product Owner-approved milestone

**Verification Plan**
* `git status -sb`
* `git branch --show-current`
* `git log -1 --oneline`
* `rg -n "MS-017.0|Project Brain|Knowledge Intake|knowledge intake" docs src`
* `git diff --check`
* confirm `Current Product Milestone`, `Latest Completed Product Milestone`, and `Next Product Milestone` agree across changed SSOT docs

## MS-017.1 - Project Brain Knowledge Intake Controlled Write Boundary Foundation

**Milestone**
MS-017.1 - Project Brain Knowledge Intake Controlled Write Boundary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the smallest controlled write boundary for Project Brain knowledge intake on the existing canonical save flow, without adding new routes, UI redesign, dependency changes, or broad refactors.

**Product Outcome**
The repository now has one approved controlled write boundary contract for the existing AI Workspace save-to-Knowledge flow that keeps the existing `POST /api/projects/[id]/knowledge` path, the Project Brain read boundary, and the canonical knowledge write path aligned.

**Dependencies**
* closed `MS-017.0 - Project Brain Knowledge Intake Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* diagnostic confirmation of the existing controlled write path
* minimal write-path implementation only if the diagnosis proves a single safe boundary
* focused tests for the directly touched path

**Forbidden Scope**
* new routes
* UI redesign
* dependency changes
* broad refactors
* bypassing Project Brain
* introducing a second knowledge write boundary
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md` and `docs/09_CHANGELOG.md` own the milestone publication snapshot
* `src/lib/knowledge/server.ts`, `src/lib/knowledge/knowledge.ts`, `src/lib/project-brain/engine.ts`, `src/lib/project-brain/server.ts`, and `src/lib/project-brain/browser.ts` are the only allowed implementation boundaries after diagnosis
* any future expansion must stay outside new routes, UI redesign, dependency changes, and broad refactors

**Verification Plan**
* `git status -sb`
* `rg -n "MS-017.1|knowledge intake|controlled write|POST /api/projects/.*/knowledge" docs src`
* confirm the existing knowledge write path already uses the canonical save endpoint and Project Brain boundary
* if implementation is needed, keep it inside the allowed implementation files only

## MS-017.2 - Project Brain Knowledge Read Recovery Boundary Foundation

**Milestone**
MS-017.2 - Project Brain Knowledge Read Recovery Boundary Foundation

**Type**
Product Milestone

**Contract Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

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
Define the smallest safe read/recovery boundary for Knowledge visibility after a canonical save, while keeping the existing local fallback explicitly allowed as a recovery path when Project Brain context is temporarily unavailable.

**Product Outcome**
The repository now records one minimal read/recovery contract for Knowledge visibility after save, keeps the canonical Project Brain read boundary intact, and does not change the POST/write path.

**Publication Status**
PUBLISHED

**Milestone Status**
COMPLETED / VERIFIED / PUBLISHED / CLOSED

**Dependencies**
* closed `MS-017.1 - Project Brain Knowledge Intake Controlled Write Boundary Foundation`

**Allowed Implementation Scope**
* docs-only contract publication
* diagnosis of the current Knowledge page read path
* diagnosis of the local fallback in `src/lib/knowledge/knowledge.ts`
* explicit allowance or narrowing of the fallback as a recovery path
* minimal `src` patch only if diagnosis proves one concrete read/recovery inconsistency
* focused tests for the directly touched path

**Forbidden Scope**
* `POST` / write-path changes
* new routes
* UI redesign
* dependency changes
* broad Project Brain refactors
* removing the fallback without a confirmed Product Owner decision
* unrelated cleanup

**Ownership Boundaries**
* `docs/04_ROADMAP.md` owns the milestone contract
* `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, and `docs/10_SESSION_STATE.md` own the synchronized SSOT snapshot for this docs-only milestone
* `src/app/projects/[id]/knowledge/page.tsx` and `src/lib/knowledge/knowledge.ts` are the only allowed implementation boundaries if a future patch is approved
* the existing canonical knowledge write boundary remains unchanged

**Verification Plan**
* `git status -sb`
* `rg -n "MS-017.2|knowledge read recovery|local fallback|Knowledge page" docs src`
* confirm the Knowledge page still shows saved knowledge after a successful save
* confirm the fallback behavior is explicitly documented as allowed recovery, or narrowed only by an approved future decision

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
