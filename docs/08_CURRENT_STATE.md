# 08_CURRENT_STATE

---

# Document Information

**Document**
08_CURRENT_STATE.md

**Purpose**
Provide the current operational status of Soft Premium System.

**Owner**
Chief Architect

**Status**
Draft

**Version**
1.0

**Source of Truth**
Yes

**Depends On**
04_ROADMAP.md

**Referenced By**
AI_CONTEXT.md

---

# Purpose

This document provides a snapshot of the current state of the Soft Premium System project.

It reflects the current milestone, completed work, active work, upcoming priorities, and known issues.

Unlike the roadmap, this document changes frequently as the project evolves.

---

# Current Milestone

MS-028.8 - GitHub Real Execution Confirmation Gate Foundation

**Latest Completed Milestone**
MS-028.7 - GitHub Real Readiness Action Foundation

**Next Milestone**
NONE / Product Owner decision required

MS-028.8 is APPROVED as the GitHub Real Execution Confirmation Gate Foundation docs-only contract/design milestone in the current local workspace. The repository now defines the explicit confirmation gate that follows the MS-028.7 ready-for-confirmation state, remains based only on local UI/browser state, preserves the distinction between ready for Product Owner confirmation and ready to execute, and keeps real Git/GitHub execution blocked until explicit Product Owner approval for a later implementation milestone.

MS-028.7 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the GitHub Real Readiness Action Foundation. The project settings page now exposes a compact readiness-action layer derived from local UI/browser state only, expressing `ready`, `blocked`, and `requires confirmation` states. The `ready` state means ready for Product Owner confirmation only, and real Git/GitHub execution remains blocked until later explicit approval. The milestone was verified by the targeted settings page test file with 10 tests passing.

MS-028.6 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the GitHub Real Connection Readiness Check Foundation. After a GitHub repository URL exists in project settings, the repository now shows a compact derived real-readiness checklist for future GitHub execution that reports repository URL ready, branch work mode ready or missing, working branch name ready, missing, or not required, GitHub connection/authentication missing or required, local clone/workspace missing or required, and real Git execution blocked until explicit Product Owner confirmation. The gate derives from local UI/browser state only and does not perform execution. The repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-028.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the GitHub Repository Branch Work Mode Summary Foundation. After a GitHub repository URL exists in project settings and a branch work mode has been chosen, the repository now shows a compact visible summary of the branch work setup instead of leaving the choice implicit. The summary confirms work on `main` when `main` is selected, shows the selected working branch name when `working-branch` is selected, and falls back to the suggested `work/<project-slug>` shape when needed. The summary uses the existing local browser-state values `soft-premium-system.projects.<id>.branch-work-mode` and `soft-premium-system.projects.<id>.working-branch-name`, and real branch creation, checkout, synchronization, merge, pull request, and GitHub API flow remain future work. The repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-027.5 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Scoped Data Rebinding Guard Foundation. The repository now preserves existing task and knowledge collections when a duplicate project id is merged away during dedupe or upsert, rewrites their stored `projectId` values to the canonical project, and avoids creating fake scoped data when none exists. This is a future/legacy-safe guard and does not recover the previously lost live BCP-MS-001 task. Product Owner manually recreated BCP-MS-001 after the live browser storage proved unrecoverable. The repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-027.4 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the GitHub Repository Import / Bind Decision Foundation. The repository now gives manifest-only real projects a controlled Product Owner decision path for source binding, keeps clone/import as future work, and preserves the MS-027.2 duplicate-detection and MS-027.3 source-status behavior. Session 084 also fixed the Home hydration regression by moving localStorage-dependent project loading behind mount so the first server and client render match, while still showing Beauty Client PRO once the client state loads. No Beauty Client PRO code changed, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-026.1c is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Polish UI product terms verification milestone. The repository now confirms the accepted MS-026.1-series Polish UI overlay cleanup for the live-test shell, workspace, AI workspace, and workflow paths. The remaining visible product terms render in Polish for the user-facing labels verified in this session, while the program backbone, identifiers, routes, engine states, contracts, and internal logic remain English. `src/lib/app-version.ts` still exposes `1.026.0` as the Product Owner-approved live-test branch/build marker. No routing, data-flow, API, storage, Project Brain logic, Workflow Engine logic, Konduktor logic, automation, or scheduling changed. Session 083 synchronized the accepted `MS-026.1 / MS-026.1b / MS-026.1c` control files in the current local workspace, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-024.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Konduktor Recommendation Card Hierarchy Foundation. The repository now presents the existing Konduktor recommendation card with a clearer reading hierarchy for recommendation, action readiness, reason, and source/trust copy while keeping readiness, reason, caution signal, source transparency, and trust-copy semantics unchanged. The canonical app version remains `0.021.6` because this publication records a Konduktor guidance presentation refinement and does not change the controlled app version source. Session 082 synchronized the accepted `MS-024.3` control files in the current local workspace, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-023.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Konduktor Recommendation Source Transparency Foundation. The repository now shows a compact source label on Konduktor guidance so users can see that the recommendation comes from Project Brain, stays read-only, and reflects the current Project Brain state. The canonical app version remains `0.021.6` because this publication records a Konduktor guidance transparency refinement and does not change the controlled app version source. Session 081 synchronized the accepted `MS-023.2` control files in the current local workspace, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-023.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Konduktor Recommendation Empty/Weak State Clarity Foundation. The repository now makes weak, generic, and empty Project Brain guidance explicit about being read-only and limited, while keeping strong guidance as a calm recommendation derived from existing Project Brain workflowNextStep data. The canonical app version remains `0.021.6` because this publication records a Konduktor guidance refinement and does not change the controlled app version source. Session 081 synchronized the accepted `MS-023.1` control files in the current local workspace, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-023.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Konduktor Project Brain Guidance Foundation. The repository now lets Konduktor present one calm read-only recommendation derived from existing Project Brain workflowNextStep data while keeping weak or generic guidance gentle and non-executable. The canonical app version remains `0.021.6` because this publication records a Konduktor guidance foundation and does not change the controlled app version source. Session 081 synchronized the accepted `MS-023.0` control files in the current local workspace, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-022.2 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Project Brain Context Action Clarity Foundation. The repository now changes the Project Brain action CTA from `OtwĂłrz zadania` to `PrzejdĹş do zadaĹ„` while preserving the same data, the same conditional rendering, and the same `workflowNextStep` mechanics. The canonical app version remains `0.021.6` because the SSOT version rule only bumps accepted app/platform `.0` milestones, and MS-022.2 is an action-clarity refinement milestone rather than a `.0` milestone. Session 080 synchronized the accepted `MS-022.2` control files in the current local workspace, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-022.1 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Project Brain Context Visibility Refinement Foundation. The repository now gives the existing `NastÄ™pny krok` / `workflowNextStep` block a stronger visual accent and a small visible `Project Brain` label while preserving the same data, the same conditional rendering, and the same `workflowNextStep` mechanics. The canonical app version remains `0.021.6` because the SSOT version rule only bumps accepted app/platform `.0` milestones, and MS-022.1 is a visibility refinement milestone rather than a `.0` milestone. Session 080 synchronized the accepted `MS-022.1` control files in the current local workspace, and the repository remains aligned with `NONE / Product Owner decision required` for the next milestone.

MS-018.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Create Task From Retrieved Memory Foundation; the repository now records the user-initiated task creation flow from retrieved memory on AI Workspace, and the live browser verification accepted by the Product Owner shows the created task remains visible on AI Workspace, Overview, and `/tasks`.

MS-019.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Application Version Visibility Foundation; the repository now records the canonical application version `0.000.0` in `src/lib/app-version.ts` and exposes it as a small visible badge in the app shell after refresh. The live browser verification accepted by the Product Owner shows `Workspace v0.000.0` near the home heading and `APP v0.000.0` in the lower-right shell badge.

MS-020.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Polish UI Language Overlay Foundation; the repository now applies the smallest Polish copy overlay to the existing visible home, project, overview, task, and AI Workspace surfaces while keeping the canonical version badge, task storage behavior, and Knowledge behavior unchanged. The canonical app version is now `0.020.0`.

MS-021.13 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Discovery Source Conflict Action Contract Foundation; the repository now shows `Zobacz rĂłĹĽnice` for discovered projects with detected source conflicts and reveals a minimal inline read-only comparison block with only the fields that actually differ: `Nazwa`, `Katalog roboczy`, and `Repozytorium` when both sides have it and it differs. The repository preserves the existing conflict status, `PrzypiÄ™ty lokalnie`, the source label derived from `workingDirectory`, `OtwĂłrz`, and disabled `Przypnij`. The canonical app version remains `0.021.6`.

MS-021.12 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Source Conflict Visibility Foundation; the repository now shows a restrained read-only conflict status for attached filesystem-discovered projects when discovered metadata differs from the local browser-state entry, compares `name`, `workingDirectory`, and `repositoryUrl` when present on both sides, and preserves `PrzypiÄ™ty lokalnie`, the source label derived from `workingDirectory`, `OtwĂłrz`, and disabled `Przypnij`. The canonical app version remains `0.021.6`.

Session 078 synchronized the accepted `MS-021.13` control files in the current local workspace, and the repository is clean and synchronized with `origin/main` and `origin/product-intake-soft-premium-system` at commit `37634f1`.

MS-021.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Filesystem Authority Foundation; the repository now writes a minimal `sps-project.json` manifest into the project working directory during project creation so project identity is physically anchored on disk while the existing database insert path remains intact. The local filesystem manifest is now the first authority anchor, and the future database-backed registry or sync path remains preserved for a later milestone.

MS-021.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Filesystem Status Visibility Foundation; the repository now distinguishes `manifest-present`, `manifest-missing`, and `unknown` filesystem status values on project reads when a working directory is available, shows a restrained status indicator on the project detail surface, and keeps the future database-backed registry or sync path preserved for a later milestone. The canonical app version is now `0.021.1`.

MS-021.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Directory Initialization Contents Foundation; the repository now writes a deterministic `README.md` into newly created local project directories so they are no longer an effectively empty filesystem artifact, while keeping `sps-project.json` unchanged as the canonical manifest and preserving the future database-backed registry or sync path. The canonical app version is now `0.021.2`.

MS-021.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Directory Reopen Discovery Foundation; the repository now exposes a minimal server helper that reads and validates `sps-project.json` from a known local project directory so a project can be reopened from filesystem authority without a broader import or scanner flow. The helper returns `manifest-present` for valid manifests and `null` for missing or invalid manifests. The canonical app version is now `0.021.3`.

MS-021.4 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Directory Discovery Contract Foundation; the repository now exposes a minimal server discovery helper that inspects immediate child directories of `C:\SPS_OS_WORK`, reuses the known-directory reopen helper, and returns only valid manifest-backed projects while ignoring missing or invalid manifests safely. The canonical app version is now `0.021.4`.

MS-021.5 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Discovery API Foundation; the repository now serves a minimal `GET /api/projects` route that returns discovered manifest-backed projects from `discoverServerProjectsFromWorkingRoot("C:\\SPS_OS_WORK")` with a conservative `{ projects: [...] }` response shape. The canonical app version is now `0.021.5`.

MS-021.6 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Discovery UI Read-Only Foundation; the repository now fetches `GET /api/projects` on mount from the project list page, renders a separate read-only filesystem-discovered projects section, keeps discovered projects separate from browser/localStorage project state, and preserves the existing browser create flow. The canonical app version is now `0.021.6`.

MS-021.7 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Open Existing Project Foundation; the repository now shows an `OtwÄ‚Ĺ‚rz` action for filesystem-discovered projects, seeds the discovered project into browser/localStorage through the existing `createProject(...)` flow before navigation, keeps the discovered list separate from browser state until explicit open, and navigates to the existing project detail route. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.8 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attach Existing Project Foundation; the repository now shows a `Przypnij` action for filesystem-discovered projects, saves the discovered project into browser/localStorage through the existing local project state flow, keeps the discovered list separate until explicit attach, and prevents duplicate local entries for the same discovered project id. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.9 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Status Visibility Foundation; the repository now shows `PrzypiĂ„â„˘ty lokalnie` for discovered projects that already exist in local browser state, disables `Przypnij` for those projects, keeps `OtwÄ‚Ĺ‚rz` available, and keeps not-yet-attached discovered projects attachable. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiÄ‚â€žĂ˘â€žËty lokalnie`, disabled `Przypnij`, and available `OtwĂ„â€šÄąâ€šrz`. The canonical app version remains `0.021.6`.

MS-021.10 is COMPLETED / VERIFIED / PUBLISHED in the current local workspace as the Local Project Discovery Attached Project Revisit Foundation; the repository now confirms the existing page behavior already satisfies revisit requirements, and after attaching a discovered project the revisited projects list still shows the project in local browser state, `PrzypiĂ„â„˘ty lokalnie`, disabled `Przypnij`, and available `OtwÄ‚Ĺ‚rz`. The canonical app version remains `0.021.6`.
Versioning rule: accepted app/platform `.0` milestones bump the controlled app version source to `0.XXX.0`. Patch and live-fix handling remains deferred until needed, and non-MS categories such as WF remain deferred until needed.

Branch sync rule: `product-intake-soft-premium-system` stays synchronized to `main` through event-based fast-forward updates after accepted milestone commits or accepted live-test patches.

MS-018.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Brain Memory Retrieval UX First Surface Foundation; the repository now records the retrieved-memory surface on AI Workspace, keeps the existing browser read path unchanged, and remains the prior completed foundation beneath MS-018.3.

MS-018.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Brain First Useful Memory Retrieval Foundation; the repository now records the smallest controlled Project Brain memory retrieval contract boundary for returning useful project context after a save or revisit, keeps the existing browser read and recovery surfaces unchanged, and does not add new runtime behavior.

MS-017.2 is PUBLISHED / CLOSED in the current local workspace as the Project Brain Knowledge Read Recovery Boundary Foundation; the repository now records the smallest controlled Project Brain knowledge read/recovery contract boundary as a docs-only publication, keeps the existing local fallback allowed as a recovery path, and does not add new runtime behavior.

MS-017.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Brain Knowledge Intake Controlled Write Boundary Foundation; the repository now confirms the existing canonical knowledge save path already exists, keeps the write boundary narrow, and did not require a source patch during diagnosis.

MS-017.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Brain Knowledge Intake Foundation; the repository now records the smallest controlled Project Brain knowledge intake contract boundary as a docs-only publication, keeps knowledge intake read-only in this milestone, and does not add new runtime behavior.

MS-016.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Brain Existing Project Status Repair Foundation; the repository now repairs eligible legacy projects from `pending` to `available` when they already have a persisted working directory and project record, while preserving `pending` / warning behavior when the data is missing or corrupted.

MS-016.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Brain Activation Foundation; the repository now marks newly created projects with persisted baseline workspace data as `projectBrainStatus: "available"` while preserving the pending warning state when the activation condition is not met.

MS-016.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Brain Status Verification UX Foundation; the project dashboard now suppresses the readiness warning when Project Brain is `available` and keeps the warning visible for pending, unavailable, or corrupt project states.

MS-015.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the First Real User Flow Polish Foundation; the repository now records the primary happy-path copy and label polish across Home, Task List, Task Detail, and Task Workspace while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-010.4 is PUBLISHED / CLOSED in the current local workspace as the SPS OS First Usable Flow Post-Copy Guidance Foundation; the repository now shows `Next action: Copy handoff.` and the copied handoff now tells the user it can be pasted into the next session, consolidating the earlier MS-010.2 save-review guidance and MS-010.3 post-completion copy guidance refinements while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-011.0 is now COMPLETED / VERIFIED / PUBLISHED / CLOSED as the existing project intake foundation; the repository records the completed intake boundary for accepting an already existing project into the current SPS project model and workspace through the existing project create/open flow, while keeping the controlled `MS-011.1` continuation published and reserving the parallel work track follow-up for `MS-012.10`.

MS-011.1 is now the completed controlled continuation for existing project intake; the repository records the first controlled flow after `MS-011.0` without broad implementation, refactor, or parallel work track activation.

MS-012.0 is now the completed parallel project work track foundation; the repository records the first controlled parallel-track continuation without broad multi-project orchestration.

MS-012.1 is now the completed first controlled scope foundation; the repository records the narrow continuation boundary across the existing project, task list, and task workspace surfaces.

MS-012.2 is now the completed usability review foundation; the repository records the usability boundary for continuing work across the existing project, task list, and task workspace surfaces.

MS-012.3 is now the completed continuation contract foundation; the repository records the first continuation contract after the usability review boundary without broad orchestration.

MS-012.4 is now the completed execution boundary foundation; the repository records the first execution boundary before the controlled execution contract.

MS-012.5 is now the completed controlled execution contract foundation; the repository records the first controlled execution contract before the verification contract.

MS-012.6 is now the completed verification contract foundation; the repository records the verification boundary before the readiness gate.

MS-013.1 is PUBLISHED / CLOSED in the current local workspace as the Project Working Directory Creation Prompt Implementation Foundation; the repository now asks for and stores an intended working-directory value before new project creation completes, supports the default local workspace root `C:\SPS_OS_WORK\<project-slug>`, and keeps `repositoryUrl` and other source metadata separate from the local working copy path while physical folder creation remains pending.

MS-013.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Creation Readiness Gate Foundation; the repository now creates the selected or default local working directory during new project creation, keeps `projectBrainStatus` explicit, shows the pending readiness state when Project Brain is unavailable, and does not present a false-ready project when the runtime context is missing.

MS-013.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Readiness / Workflow Health Status Alignment Foundation; the repository now keeps the dashboard workflow health aligned with explicit project readiness so a pending Project Brain state does not look fully ready while tasks remain usable.

MS-013.4 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the AI Workspace Project Access Boundary Alignment Foundation; the repository now makes the AI Workspace resolve the same existing project boundary as Overview and Tasks by falling back to the local project context when the server-backed project lookup misses.

MS-013.5 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Intake Project Access Boundary Alignment Foundation; the repository now lets task GET and POST operate directly on task storage for the route project id instead of returning `project-not-found` when the server-side project lookup misses.

MS-013.0 is PUBLISHED / CLOSED in the current local workspace as the Project Working Directory Creation Prompt Foundation; the repository now records the pre-implementation contract boundary for the working-directory decision and keeps the default local workspace root `C:\SPS_OS_WORK\<project-slug>` reserved for the future implementation boundary.

MS-012.8 is PUBLISHED / CLOSED in the current local workspace as the Parallel Project Work Track First Functional Handoff Foundation; the repository now records the visible handoff boundary across the existing project, task list, task detail, and task workspace surfaces while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-012.9 is PUBLISHED / CLOSED in the current local workspace as the Parallel Project Work Track First Guided Next Action Foundation; the repository now records the guided next-action cue on the task workspace surface while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-012.10 is PUBLISHED / CLOSED in the current local workspace as the Parallel Project Work Track Workspace Continuation Verification Foundation; the repository now confirms the workspace return path back to the task list while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-010.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the SPS OS First Usable Flow Guided Navigation Foundation; the repository now records the guided-navigation boundary for the usable SPS OS flow, clarifies the path across Home, Project, Task List, Task Detail, and Task Workspace, and keeps product code unchanged while Current Product Milestone remains NONE until a separate Product Owner decision is recorded.

MS-010.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the SPS OS First End-to-End Usable Flow Discovery Foundation; the repository now records the shortest practical SPS OS user journey from app entry to completing one task in the workspace, identifies the remaining manual handoffs and unclear UI steps, and keeps product code unchanged while Current Product Milestone remains NONE until a separate Product Owner decision is recorded.

MS-009.11 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Boundary Validation Consumer Implementation Authorization Foundation; the repository now contains the minimal controlled conductor consumer seam under `src/lib/conductor`, consumes the boundary-validation result as explicit read-only input, preserves `getConductorState()` compatibility, and records pushed implementation commit `c9299c8c17b1f5574d7f6191080e3a079bdb5fc2` while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-009.10 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Boundary Validation Consumption Contract Foundation; the repository now records the next controlled consumption boundary for the conductor validator, keeps the contract docs-only, and preserves Workflow Engine, Project Brain, SSOT, UI, automation, scheduling, recovery, and executor boundaries while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-009.9 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Next Controlled Step Discovery Foundation; the repository now records the next safe controlled implementation boundary after MS-009.8, keeps the discovery docs-only, and preserves Workflow Engine, Project Brain, and SSOT boundaries while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-009.8 is COMPLETED / VERIFIED / PUBLISHED / PUSHED in the current local workspace as the Dyrygent/Konduktor First Controlled Implementation Foundation; the repository now contains the first controlled orchestration validation seam, keeps the validation deterministic and read-only, and preserves Workflow Engine, Project Brain, and SSOT boundaries while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-009.7 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor First Implementation Scope Foundation; the repository now defines the first controlled implementation perimeter, the allowed and forbidden implementation scope, and the pre/post verification gates while keeping Workflow Engine as the rules/interpretation owner and keeping Project Brain and SSOT docs as canonical truth.

MS-009.6 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Readiness Gate Foundation; the repository now defines the conditions that allow or block the first controlled Dyrygent/Konduktor implementation milestone while keeping Workflow Engine as the rules/interpretation owner and keeping Project Brain and SSOT docs as canonical truth.

MS-009.5 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Failure Boundary Foundation; the repository now defines the bounded failure and blocker contract for ambiguous, forbidden, unsafe, inconsistent, or incomplete orchestration paths while keeping Workflow Engine as the rules/interpretation owner and keeping Project Brain and SSOT docs as canonical truth.

MS-009.4 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Command Boundary Foundation; the repository now defines the allowed command categories, forbidden commands, and authority boundaries while keeping Workflow Engine as the rules/interpretation owner and keeping Project Brain and SSOT docs as canonical truth.

MS-009.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor State Model Foundation; the repository now defines the minimal orchestration state model, the allowed signal mapping, and the forbidden state mutations while keeping Workflow Engine as the rules/interpretation owner and keeping Project Brain and SSOT docs as canonical truth.

MS-009.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Interaction Contract Foundation; the repository now defines the allowed signal flow, decision handoff, and user-facing guidance boundary while keeping Workflow Engine as the rules/interpretation owner and keeping Project Brain and SSOT docs as canonical truth.

MS-009.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dyrygent/Konduktor Responsibility Map Foundation; the repository now records the responsibility split between Workflow Engine, Dyrygent, Konduktor, Project Brain, and SSOT docs while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.36 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Repository Open Feedback Persistence Foundation; the repository now restores a local `Repository opened locally.` status after refresh or revisit while keeping the repository context visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008 is stopped after the continuation gate returned B and the micro-sequence reached its natural boundary.

MS-008.35 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Repository Open Feedback Restore Foundation; the repository now shows a local `Repository open restored locally.` status after saving updated result notes again while keeping the repository context visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.34 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Repository Open Feedback Reset Foundation; the repository now shows a local `Repository open reset locally.` status after saving updated result notes clears the repository-open signal while keeping the repository context visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.33 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Repository Open Feedback Foundation; the repository now shows a local `Repository opened locally.` status after the repository link is used while keeping the repository context visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.32 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Codex Handoff Jump Feedback Foundation; the repository now shows a local `Codex handoff opened locally.` status after the Codex handoff link is used while keeping the task handoff section visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.31 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Completion Handoff Restore Feedback Foundation; the repository now shows a local `Completion handoff restored locally.` status after updated result notes restore a copied completion handoff while keeping the completion summary and handoff output visible after the restoration and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.30 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Completion Handoff Reset Feedback Foundation; the repository now shows a local `Completion handoff reset locally.` status after edited result notes clear a copied completion handoff while keeping the completion summary and handoff output visible until the edit clears it and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.29 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Completion Handoff Copy Feedback Foundation; the repository now shows a local `Completion handoff copied.` status after the task completion handoff is copied while keeping the completion summary and handoff output visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.28 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Completion Restore Feedback Foundation; the repository now shows a local `Completion restored locally.` status after saving updated result notes following a completion reset while restoring the completion flow and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.23 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Result Notes Save Feedback Foundation; the repository now shows a local `Saved locally` state on the result-notes save button after a successful local save while keeping the projected next step visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.24 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Evidence Review Acknowledgement Feedback Foundation; the repository now shows a local `Acknowledged locally` state on the evidence-review button after the review is acknowledged while keeping the save-review-complete flow and the task completion handoff visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.25 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Complete Task Feedback Foundation; the repository now shows a local `Completed locally` state on the complete-task button after the task is completed while keeping the completion summary and handoff output visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.26 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Copy Report Feedback Foundation; the repository now shows a local `Copied locally` state on the copy-report button after the completion report is copied while keeping the completion summary and handoff output visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.27 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Completion Reset Feedback Foundation; the repository now shows a local `Completion reset locally.` status after editing result notes from the completed task state while keeping the completion summary and handoff output visible until the edit clears it and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.22 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Next Step Action Foundation; the repository now offers a local `Continue to result notes` action that focuses the task result notes field while keeping the projected next step visible and keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.21 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Next Product Step Foundation; the repository now shows the projected next step as a neutral read-only block in the task workspace start area while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.20 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task List Card Layout Fix Foundation; the repository now renders each task card on `/projects/[id]/tasks` as a full-width clickable row with left-aligned content while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.19 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Dashboard Tasks Link Project Route Fix Foundation; the repository now preserves the project-specific `Open tasks` dashboard route so `/projects/[id]/tasks` stays reachable from the project workspace header while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.18 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Main Usability Recovery Regression Verification Foundation; the repository now records the regression verification outcome for the accumulated usability recovery line while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.17 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the SPS App Usability Sweep Diagnosis Foundation; the repository now records the sweep result and the selected next usability issue while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.16 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Knowledge Stale Context Recovery Foundation; the repository now recovers the project knowledge route from stale Project Brain context by falling back to local project and knowledge state so `/projects/[id]/knowledge` stays usable instead of dead-ending on a project-context error while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.15 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Detail Stale Context Recovery Foundation; the repository now recovers the task detail route from stale Project Brain context by falling back to local project and task state so `/projects/[id]/tasks/[taskId]` stays usable instead of dead-ending on a project/task-context error while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.14 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Tasks Stale Context Recovery Foundation; the repository now recovers the project tasks route from stale Project Brain context by falling back to local project task state so `/projects/[id]/tasks` stays usable instead of dead-ending on a project-context error while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.13 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Not Found Recovery Foundation; the repository now recovers the project overview route from stale Project Brain context by falling back to local project state so `/projects/[id]` stays usable instead of dead-ending on `Project not found` while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.12 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the SPS App Usability Recovery Foundation; the repository now routes the Home `Continue` action to the latest real project instead of the empty workspace landing page while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.11 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Completion State Persistence Foundation; the repository now persists local completion and evidence-review state for the task workspace while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.10 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Usable Flow Completion Summary Foundation; the repository now records the minimal completion summary for the workspace flow while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.9 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Return Link Usability Evidence Foundation; the repository now proves the same task context and saved result notes remain available when returning through the existing task detail navigation path while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.8 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Result Notes Revisit Evidence Foundation; the repository now proves saved task workspace result notes remain available when returning through the existing task detail navigation path while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.7 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Result Notes Persistence Foundation; the repository now restores saved task workspace result notes after reload or revisit while keeping Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.5 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project and Task Flow Reliability Foundation; the repository now keeps the latest completed milestone baseline stable while the next usable app state discovery remains documented separately.

MS-006.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Next Milestone Queue Foundation; the repository now records the next three small milestones toward the New Task / New Project Start Flow without introducing application code after Session 053 close.

MS-006.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Next Milestone Direction Contract Foundation; the repository now records a single approved post-MS-005.2 direction contract without introducing application code.

MS-006.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the New Task Start Contract Foundation; the repository now records the minimal task-start contract boundary and keeps repository/workspace intake for MS-006.3.

MS-006.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the New Task Repository / Workspace Intake Foundation; the repository now records the intake contract boundary needed to connect a new task to a repository/workspace while leaving the full Codex handoff for MS-006.4.

MS-006.4 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the New Task Handoff To Codex Foundation; the repository now records the handoff contract boundary needed to prepare a new task for Codex while leaving any later milestone out of scope.

MS-007.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED and now PASS / unblocked in the current local workspace as the New Task Pilot Execution Foundation; after MS-007.1, the repository proves that a freshly created server-persisted project can accept a task and expose the Codex handoff surface.

MS-007.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Creation Server Persistence Foundation; the repository now persists project creation through the server-side Project Brain/state boundary used by task APIs, so a freshly created project can immediately accept tasks.

MS-007.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Link Route Foundation; the task detail `Open task workspace` link now preserves both `projectId` and `taskId` and routes directly to the task workspace surface.

MS-007.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the New Task Flow Final Pilot Foundation; the final real pilot now proves the new-task flow passes end to end from fresh project creation through the task workspace handoff surface.

MS-007.4 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Session Close Package Freshness Guard; the repository now proves the fresh session package is generated only after the final close push and that the generated package reflects the same SSOT state.

MS-007.5 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the New Task Flow Result Review Foundation; the repository now records the reviewed New Task Flow outcome as a docs-only milestone and keeps Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-007.6 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the New Task Flow Result Evidence Contract Foundation; the repository now records the exact evidence contract for the reviewed New Task Flow result as a docs-only milestone and keeps Current Product Milestone at NONE until a separate Product Owner decision is recorded.

MS-008.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Evidence Visibility Foundation; the task workspace now shows a visible Evidence Review panel tied to local result notes and completion state while keeping the rest of the task flow unchanged.

MS-008.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Evidence Review Action Foundation; the task workspace now exposes a local `Acknowledge review` action in the Evidence Review panel and keeps the action tied to local result notes and completion state only.

MS-008.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Evidence Review Completion Summary Foundation; the task workspace completion summary now reflects the acknowledged evidence review state and carries it into the final task outcome while keeping the behavior local.

MS-008.3 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Evidence Review Continuation Contract Foundation; the repository now records the next safe continuation boundary for task workspace evidence review as a docs-only milestone and keeps the behavior local.

MS-008.4 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Workspace Evidence Review Action Boundary Foundation; the task workspace now shows a short progression hint in the evidence review area so the save, review, and complete sequence is easier to understand while keeping the behavior local.

MS-002.s is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Task Completion Handoff Text Foundation; the task workspace route now shows a local handoff text block after completion.
MS-002.t is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the AI Chat, Prompts, and Agents Foundation; the AI Workspace now owns the starter prompt catalog in the engine boundary.
MS-004.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the External Integrations Foundation; the project keeps Current Product Milestone at NONE until Product Owner approval is recorded.
MS-005.0 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the SPS OS Pilot Test Foundation; the repository now documents the controlled Project -> Task -> Codex Handoff -> Result -> Completion -> Session Close -> Clean START sequence.
MS-005.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the SPS OS Pilot Test Execution Contract; Product Owner approval now authorizes the controlled pilot execution described in the contract.
MS-005.2 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Project Delete Action Foundation; the repository now exposes a confirmation-gated project delete action from Recent Projects and the project detail page with canonical project removal and redirect back to the home view.
MS-006.1 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Next Milestone Queue Foundation; the approved queue now leads to `MS-006.2 - New Task Start Contract Foundation`, `MS-006.3 - New Task Repository / Workspace Intake Foundation`, and `MS-006.4 - New Task Handoff To Codex Foundation`.

MS-001.76 is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the AI Workspace Engine Chat Project Switch State Isolation Foundation with commit `792c970`.
MS-001.77 is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the AI Workspace Engine Generate Project Switch Stale Result Guard Foundation with commit `78743a3`.
MS-001.79 is COMPLETED / VERIFIED / PUBLISHED / CLOSED after formal publication of the Project Workspace Creation Contract Foundation with commit `6881e86`.
MS-002.x is COMPLETED / VERIFIED / PUBLISHED / CLOSED as a docs-only boundary contract after formal publication of the Salon Modules boundary contract in `docs/02_ARCHITECTURE.md`.
MS-002.y is COMPLETED / VERIFIED / PUBLISHED / CLOSED as a docs-only route boundary contract after formal publication of the `/workspace` vs `/projects/[id]` boundary in `docs/02_ARCHITECTURE.md`.
MS-002.z is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Workspace Project Route Shell Boundary Foundation; the project-facing shell already exists in `src/app/projects/[id]/layout.tsx`, and this session synchronized SSOT to match the live route tree.
MS-002.a is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Brain Access Boundary Foundation; the project workspace route now proves its canonical access point through `getProjectWorkspaceEntry(projectId)`.
MS-002.b is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Workspace Start Action Boundary Foundation; the project workspace route now proves its ready-state start boundary through the projected workflow next step surfaced by the workspace header.
MS-002.c is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Workspace Next Step Action Foundation; the project workspace header now exposes the projected next step as an Open tasks action that routes to the existing project tasks screen.
MS-002.d is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Workspace Task Entry Shortcut Foundation; the project task screen now autofocuses the task title input on mount for faster task capture.
MS-002.e is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Workspace Task Quick Action Foundation; the project workspace dashboard now exposes an `Add Task` handoff to the task entry screen.
MS-002.f is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Workspace Task Collection Handoff Foundation; the project workspace dashboard now exposes a `View all tasks` handoff from the Tasks collection.
MS-002.i is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Repository Link Foundation; the project contract now includes an optional `repositoryUrl`, Project Brain carries it through the consumer overview, `/projects/[id]` passes it into `WorkspaceHeader`, and `WorkspaceHeader` shows `Open repository` only when `repositoryUrl` exists.
MS-002.j is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Project Task Intake Foundation; the project task screen now labels the intake surface explicitly and keeps the existing task form, focus behavior, and task list flow.
MS-002.k is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Workspace Start Foundation; the task detail page now links to the task workspace route and the new `/projects/[id]/tasks/[taskId]/workspace` route renders a minimal task-workspace start surface without repository context loading.
MS-002.l is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Repository Context Load Foundation; the task workspace route now loads Project Brain workspace context via `getProjectWorkspaceEntry(projectId)`, displays a minimal Repository Context block, and shows `Open repository` only when `repositoryUrl` exists.
MS-002.m is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Handoff To Codex Foundation; the task workspace route now includes a minimal Task Handoff block and a `Handoff to Codex` anchor action that stays on the same page and does not automate handoff.
MS-002.n is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Result Capture Foundation; the task workspace route now includes a minimal local-only Task Result / Result Capture block while keeping the Repository Context and Handoff to Codex surfaces intact.
MS-002.o is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Result Save Action Foundation; the task workspace route now includes a minimal local-only Save result action that blocks empty notes and shows a local saved status.
MS-002.p is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Completion Local Action Foundation; the task workspace route now includes a minimal local-only Complete task action that becomes available after a local result save.
MS-002.q is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Completion Summary Foundation; the task workspace route now shows a local completion summary with the saved result notes text and local completion status after completion.
MS-002.r is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Completion Report Copy Foundation; the task workspace route now adds a local-only Copy report action and copies the saved result notes with local completion status.
MS-002.s is COMPLETED / VERIFIED / PUBLISHED / CLOSED as the Task Completion Handoff Text Foundation; the task workspace route now adds a local-only handoff text block with the saved result notes and local completion status.
No runtime product code, UI, API, provider, or Project Brain behavior changed in this SSOT synchronization.

**MS-001.17 State**
COMPLETED / PUBLISHED / CLOSED

Objective:

`MS-001.17 - Project Brain Command Reliability Foundation` made the public Project Brain write command retry-safe by changing `createProjectBrainTask` to a command object with stable `commandId`, returning an explicit `completed` / `completed-with-refresh-failure` result, and persisting idempotency in the Task Engine task write path.

Project Status:

MS-001.3 completed and closed after Milestone Closure Review passed.
SPDM-001 completed and accepted with `docs/00_SPS_DEVELOPMENT_METHOD.md`.
SPDM-002 completed and accepted with `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md` aligned to implement SPDM instead of defining methodology.
SPDM-003 completed and accepted with Repository Access Fallback added to `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.
SPDM-004 completed and accepted with `docs/11_SPS_START.md` created as the SPS session launcher.
SPDM-005 completed and accepted with `docs/14_GIT_WORKFLOW.md` created and Active Branch Validation added to `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`.
SPDM-006 completed and accepted with a full SPS startup package combining `docs/11_SPS_START.md`, ZIP Mode, `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`, and Active Branch Validation.
SPDM-007 completed and accepted with one-command startup rules that block memory-based bootstrap and require ZIP/PCL-first startup behavior.
CAP-003.1 completed and accepted with `docs/13_PROJECT_CAPABILITY.md` created as the Project Capability domain contract.
CAP-003.2 completed and accepted with Project Domain Model added to `docs/13_PROJECT_CAPABILITY.md`.
MS-001.4 release readiness evidence checklist is defined with status vocabulary and decision boundary in `docs/04_ROADMAP.md`.
MS-001.4 readiness evidence was updated after successful `SPS OS Ă˘â‚¬â€ť START`: Bootstrap/runtime startup is `PASS`, Git/repository state is `PASS`, and Session package generation remains `PARTIAL`.
MS-001.5 release candidate milestone is completed.
MS-001.6 Final Release Acceptance Review is completed.
Final Release Acceptance: ACCEPTED.
Offline Git limitation: accepted.
SPS OS 1.0: Released / Accepted.
Current Product Milestone: NONE / Product Owner decision required
Latest Completed Product Milestone: MS-028.6 - GitHub Real Connection Readiness Check Foundation
Next Product Milestone: NONE / Product Owner decision required
Session 085 synchronized the accepted `MS-028.6` control files in the current local workspace. The repository now records the first real-readiness gate for future GitHub execution only: the derived checklist shows repository URL ready, branch work mode ready or missing, working branch name ready, missing, or not required, GitHub connection/authentication missing or required, local clone/workspace missing or required, and real Git execution blocked until explicit Product Owner confirmation. The gate derives from local UI/browser state only and does not perform execution.

MS-021.17 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Discovery Conflict Decision Reset Foundation; the repository now exposes a local `Cofnij decyzjÄ™` action for resolved source-conflict decisions so the browser-state resolved flag can be cleared for that `project.id`. Reset does not mutate the local project, and if the discovered project still differs after reset, the conflict can appear again as unresolved. The MS-021.16 persistence behavior and MS-021.15 feedback remain preserved, and the behavior stays local/browser-state only without backend, API, discovery, scanner, registry, or routing changes.

MS-021.16 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Discovery Conflict Decision State Persistence Foundation; the repository now stores resolved conflict decisions per `project.id` in browser state so the same discovered project no longer reappears as unresolved during the current session after either `Zachowaj lokalnĂ„â€¦ wersjĂ„â„˘` or `Zaakceptuj wykryty projekt`. The MS-021.15 feedback remains visible, the MS-021.14 mutation rules remain intact, and the behavior stays local/browser-state only without backend, API, discovery, scanner, registry, or routing changes.

MS-021.15 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Discovery Conflict Decision Feedback Foundation; the repository now shows `Zachowano lokalnÄ… wersjÄ™ projektu` after `Zachowaj lokalnÄ… wersjÄ™` and `Zaakceptowano dane z wykrytego projektu` after `Zaakceptuj wykryty projekt`. The feedback is local/browser-state UI only and preserves the MS-021.14 conflict decision behavior without introducing backend, API, discovery, scanner, registry, or routing changes.

MS-021.14 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Local Project Discovery Source Conflict Resolution Decision Foundation; the repository now offers explicit conflict decision actions for attached filesystem-discovered projects, keeps `Zobacz rĂłĹĽnice`, `PrzypiÄ™ty lokalnie`, `OtwĂłrz`, and disabled `Przypnij`, and lets `Zachowaj lokalnÄ… wersjÄ™` close the conflict decision without mutating the local project while `Zaakceptuj wykryty projekt` updates only `name`, `workingDirectory`, and `repositoryUrl` when present. The behavior remains local/browser-state only and does not introduce backend, API, discovery, scanner, registry, or routing changes.

MS-008.6 is COMPLETED / VERIFIED / PUBLISHED / CLOSED in the current local workspace as the Next Usable SPS App State Discovery Foundation; the repository keeps Current Product Milestone at NONE until a separate Product Owner decision is recorded.
Active Sprint: NONE
Active Capability: NONE
Latest Completed Capability: CAP-005 - React Component Test Infrastructure Foundation
CAP-005 status: COMPLETED / PUBLISHED / CLOSED
CAP-005 blockers: NONE
CAP-005 verification: focused component `4 / 4` PASS, focused domain `85 / 85` PASS, full tests `92 / 92` PASS, TypeScript PASS, lint PASS with one existing warning, build PASS.
CAP-005 achieved the minimal React component test foundation without production code changes.
Vitest remains the only test runner.
`jsdom` is enabled per-file only for the reference component test.
`@testing-library/react` now supports rendering the reference tasks page component in Vitest.
`vitest.config.ts` adds only the `@/*` alias to `src`.
No global setup file or global mock layer was introduced.
The reference component test file is `src/app/projects/[id]/tasks/page.test.tsx`.
The four focused tests confirm the `createProjectBrainTask` consumer contract for no-write render, `completed`, `completed-with-refresh-failure`, and two explicit user intents.
MS-001.18 is COMPLETED / PUBLISHED / CLOSED after formalizing the single-consumer contract without production changes.
MS-001.25 is COMPLETED / VERIFIED after formal acceptance of the first controlled AI Workspace generation flow, and the related commits remain local because push has not been performed.
MS-001.26 is COMPLETED / VERIFIED after formal acceptance of the controlled AI Workspace Knowledge save flow, and the related implementation commit remains local because push has not been performed.
MS-001.27 is COMPLETED / VERIFIED after formal acceptance of the controlled AI Workspace starter prompt foundation, and the related implementation commit remains local because push has not been performed.
MS-001.28 is COMPLETED / VERIFIED after formal acceptance of the controlled AI Workspace Knowledge refresh flow, and the related implementation commit remains local because push has not been performed.
MS-001.29 is COMPLETED / VERIFIED after formal acceptance of the controlled AI Workspace local conversation foundation, and the related implementation commit remains local because push has not been performed.
MS-001.30 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the controlled AI Workspace conversation-context foundation.
MS-001.31 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the AI Workspace conversation reset control foundation.
MS-001.32 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the AI Workspace conversation context budget foundation.
MS-001.33 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the AI Workspace conversation context visibility foundation.
MS-001.34 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the AI Workspace conversation copy foundation.
MS-001.35 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the AI Workspace engine contract foundation.
MS-001.36 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the AI Workspace engine runtime foundation.
MS-001.37 is COMPLETED / VERIFIED / PUSHED after formal acceptance of the AI Workspace engine status mapping foundation.
MS-001.38 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine save-state derivation foundation with commit `a7b7696`.
MS-001.39 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine latest-exchange derivation foundation with commit `4eac640`.
MS-001.40 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine active-generation-state derivation foundation with commit `6a608d1`.
MS-001.41 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine active-save-state derivation foundation with commit `48ad94e`.
MS-001.42 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine save-action presentation derivation foundation.
MS-001.43 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine generate-action presentation derivation foundation.
MS-001.44 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine reset-action presentation derivation foundation.
MS-001.45 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine instruction-state derivation foundation with commit `ba6f3fa`.
MS-001.46 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine Save UI type adoption foundation with commit `826ad96`.
MS-001.47 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine Instruction UI type adoption foundation.
MS-001.48 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine Context UI state type foundation.
MS-001.49 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine Prompt UI type foundation.
MS-001.50 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine starter prompt selection derivation foundation.
MS-001.51 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine manual instruction change derivation foundation.
MS-001.52 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine reset-state derivation foundation.
MS-001.53 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine generation-start state derivation foundation.
MS-001.54 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine generation-error-state derivation foundation.
MS-001.55 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine generation-success-state derivation foundation.
MS-001.60 contract status: APPROVED.
MS-001.60 runtime status: CLOSED.
MS-001.60 activation status: CLOSED.
MS-001.60 activation decision: AUTHORIZED.
MS-001.60 implementation status: COMPLETED / VERIFIED.
MS-001.60 publication status: PUBLISHED.
MS-001.60 publication commit: `c5aee32`.
MS-001.60 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.60 product outcome: the AI Workspace page now delegates the remaining empty-title validation `save-error` state construction in `handleSaveToKnowledge` to the existing `deriveSaveErrorState(...)` helper while preserving the same validation message, title value, source exchange, early return, and zero-request behavior for invalid titles.
MS-001.60 preserved boundaries:
* no new helper or type
* no `engine.ts` change
* no title-input change-state derivation
* no generation-transition save-state changes
* no wider save-flow refactoring
* no UX, copy, or layout changes
* no API, backend, provider, or Project Brain changes
MS-001.60 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`37 / 37`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warning only.
MS-001.60 blocker status: NONE.
MS-001.60 publication evidence:
* commit `c5aee32`
* branch `main`
* published file `src/app/projects/[id]/ai/page.tsx`

MS-001.61 contract status: APPROVED.
MS-001.61 runtime status: CLOSED.
MS-001.61 activation status: CLOSED.
MS-001.61 activation decision: AUTHORIZED.
MS-001.61 implementation status: COMPLETED / VERIFIED.
MS-001.61 publication status: PUBLISHED.
MS-001.61 publication commit: `11c2616`.
MS-001.61 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.61 product outcome: the AI Workspace page now delegates the ready-to-save `SaveUiState` construction after successful generation to the existing `deriveSaveReadyState(...)` helper while preserving the same title and source exchange values and all generation/save transitions.
MS-001.61 preserved boundaries:
* no title validation derivation
* no save-error, save-saving, saved, or refresh-warning logic changes
* no generation-flow changes
* no save-flow refactoring
* no UX, copy, or layout changes
* no API, backend, provider, or Project Brain changes
MS-001.61 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`38 / 38`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warning only.
MS-001.61 blocker status: NONE.
MS-001.61 publication evidence:
* commit `11c2616`
* branch `main`
* published files `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`

MS-001.62 contract status: APPROVED.
MS-001.62 runtime status: CLOSED.
MS-001.62 activation status: CLOSED.
MS-001.62 activation decision: AUTHORIZED.
MS-001.62 implementation status: COMPLETED / VERIFIED.
MS-001.62 publication status: PUBLISHED.
MS-001.62 publication commit: `9e876e4`.
MS-001.62 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.62 product outcome: the AI Workspace page now delegates the inline save-state reset at the start of `handleGenerate` to the existing `deriveResetSaveState(params.id)` helper while preserving the same timing and generation behavior.
MS-001.62 preserved boundaries:
* no engine.ts changes
* no title-input derivation
* no save-error, saving, saved, refresh-warning, or generation-success logic changes
* no generation-flow behavior change
* no UX, copy, or layout changes
* no API, backend, provider, or Project Brain changes
MS-001.62 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`38 / 38`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warning only.
MS-001.62 blocker status: NONE.
MS-001.62 publication evidence:
* commit `9e876e4`
* branch `main`
* published file `src/app/projects/[id]/ai/page.tsx`

MS-001.59 contract status: APPROVED.
MS-001.59 runtime status: CLOSED.
MS-001.59 activation status: CLOSED.
MS-001.59 activation decision: AUTHORIZED.
MS-001.59 implementation status: COMPLETED.
MS-001.59 architectural review: PASS.
MS-001.59 publication status: PUBLISHED.
MS-001.59 publication commit: `0d11707`.
MS-001.59 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.59 product outcome: the AI Workspace engine now owns the deterministic `saved-with-refresh-warning` `SaveUiState` derivation via `deriveSaveRefreshWarningState` while `handleSaveToKnowledge` delegates exactly the two existing refresh-warning save-state constructions and preserves the existing save and refresh operation order.
MS-001.59 preserved boundaries:
* no validation-title derivation
* no title-input change-state derivation
* no further save-error, save-saving, or save-success changes
* no full save-flow refactoring
* no refresh orchestration changes
* no Generate or Reset changes
* no UX, copy, or layout changes
* no backend, API, provider, or Project Brain changes
MS-001.59 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`37 / 37`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.59 blocker status: NONE.
MS-001.59 local completion evidence:
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`
MS-001.58 contract status: APPROVED.
MS-001.58 runtime status: CLOSED.
MS-001.58 activation status: CLOSED.
MS-001.58 activation decision: AUTHORIZED.
MS-001.58 implementation status: COMPLETED.
MS-001.58 publication status: PUBLISHED.
MS-001.58 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.58 product outcome: the AI Workspace engine now owns the deterministic `save-error` `SaveUiState` derivation, and the AI Workspace page delegates the existing controlled save-error response branch and rejected save-request branch to the engine without changing save flow behavior.
MS-001.58 preserved boundaries:
* no refresh-warning derivation
* no validation-title derivation
* no full save-flow refactoring
* no Generate or Reset changes
* no UX, copy, or layout changes
* no backend, API, provider, or Project Brain changes
MS-001.58 final verification: focused engine tests `36 / 36` PASS, focused AI page tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.58 blocker status: NONE.
MS-001.58 local completion evidence:
* `src/lib/ai-workspace-engine/engine.ts`
* `src/lib/ai-workspace-engine/engine.test.ts`
* `src/app/projects/[id]/ai/page.tsx`
MS-001.57 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine save-success-state derivation foundation.
MS-001.56 is COMPLETED / PUBLISHED / CLOSED after formal publication of the AI Workspace engine save-saving-state derivation foundation with commit `bfb889b`.
No new capability is active.
Operational note: local Avast HTTPS interception required one-time `NODE_OPTIONS=--use-system-ca` only for npm dependency installation; the variable was not persisted and security settings were not changed.
`src/app/projects/[id]/tasks/page.tsx` is the only real application consumer of `createProjectBrainTask`.
The approved `MS-001.18` variant is `A`: no extraction, single-consumer contract only.
One explicit Add click represents one new user intent.
Each new user intent receives a new `commandId`.
`completed` means confirmed task creation success.
`completed-with-refresh-failure` also means confirmed task creation success.
After partial success, the UI does not retry the write path.
Task-list refresh after command completion is a separate read-only flow.
The UI uses `createProjectBrainTask` and does not call the Task Engine write API directly.
MS-001.19 is COMPLETED / PUBLISHED / CLOSED after establishing the first controlled read-only AI project context boundary from Project Brain.
The approved `MS-001.19` variant is `Option B`: Narrow AI projection.
The public AI read types are `AiProjectContext` and `AiProjectContextResult`.
The public AI read function is `getAiProjectContext(projectId)`.
`AiProjectContext` projects:
* `projectId`
* `projectName`
* `tasks` with only `id` and `title`
* `knowledgeEntries` with only `id`, `title`, and `content`
The AI read boundary does not expose:
* `workflowState`
* `createdAt`
* child `projectId`
* storage internals
`AiProjectContextResult` uses:
* `available`
* `project-not-found`
* `unavailable`
`invalid-project-id` remains an error rather than a result status.
Unknown errors are not masked as `unavailable`.
The AI read boundary remains strictly read-only:
* no write
* no commands
* no localStorage
* no model or network access
No AI UI, routing, storage, dependency, or model integration changes were introduced by `MS-001.19`.
MS-001.20 is COMPLETED / PUBLISHED / CLOSED after establishing the first real read-only AI Workspace UI consumer.
The AI Workspace UI route is `/projects/[id]/ai`.
The page is a Client Component.
The page obtains `projectId` through `useParams<{ id: string }>()`.
`getAiProjectContext(projectId)` is the only public read boundary consumed by the page.
The UI renders explicit states for:
* `available`
* empty tasks
* empty knowledge
* `project-not-found`
* `unavailable`
Knowledge entry content is visible in the UI.
One `AI Workspace` link exists in the project sidebar.
The UI exposes no write controls.
The UI uses no `localStorage`.
The UI uses no `fetch`.
The UI uses no network or model access.
The Project Brain public contract remains unchanged by `MS-001.20`.
MS-001.21 contract status: APPROVED.
MS-001.21 runtime status: CLOSED.
MS-001.21 activation status: AUTHORIZED.
MS-001.21 implementation status: IMPLEMENTED / VERIFIED / PUBLISHED.
MS-001.21 DoR status: PASS.
MS-001.21 is completed, published, and closed.
MS-001.21 implementation review: PASS.
MS-001.21 contract deviations: NONE.
MS-001.21 publication status: PUBLISHED.
MS-001.21 closure status: CLOSED.
MS-001.21 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.21 publication commit: `345b835`.
MS-001.21 branch: `main`.
MS-001.21 origin/main synchronization after publication: `0 / 0`.
MS-001.21 working tree after publication: `CLEAN`.
MS-001.21 created:
* `src/lib/ai-model/types.ts`
* `src/lib/ai-model/engine.ts`
* `src/lib/ai-model/engine.test.ts`
MS-001.21 accepts `projectId` and `instruction`.
MS-001.21 reads context only through `getAiProjectContext(projectId)`.
MS-001.21 injects the provider explicitly with no global mutable state.
MS-001.21 introduces no storage bypass, network access, production provider, or write behavior.
MS-001.21 maps provider statuses and provider exceptions explicitly.
MS-001.21 keeps the local fake provider only in tests.
MS-001.21 verification: focused AI model tests `10 / 10` PASS, focused Project Brain tests `91 / 91` PASS, full tests `117 / 117` PASS, TypeScript `PASS` via `npx tsc --noEmit`, lint `PASS` with 0 errors and 1 existing warning outside milestone scope, production build `PASS`.
MS-001.22 contract status: APPROVED.
MS-001.22 runtime status: CLOSED.
MS-001.22 activation status: AUTHORIZED.
MS-001.22 implementation status: IMPLEMENTED / VERIFIED / PUBLISHED.
MS-001.22 DoR status: PASS.
MS-001.22 closure status: CLOSED.
MS-001.22 accepted route: `POST /api/projects/[id]/ai/generate`.
MS-001.22 reuses `createGenerateAiProjectResponse`.
MS-001.22 implementation review: PASS.
MS-001.22 contract deviations: NONE.
MS-001.22 publication status: PUBLISHED.
MS-001.22 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.22 implementation created exactly `src/lib/ai-model/server.ts`, `src/lib/ai-model/server.test.ts`, and `src/app/api/projects/[id]/ai/generate/route.ts`.
MS-001.22 uses exactly one POST Route Handler.
MS-001.22 reads `projectId` from awaited route params and `instruction` from JSON body.
MS-001.22 validates only transport request shape and preserves domain validation in the application boundary.
MS-001.22 delegates exactly once to `createGenerateAiProjectResponse`.
MS-001.22 preserves SPS status in response JSON with explicit HTTP mapping.
MS-001.22 production composition returns `provider-unavailable` with no real provider, SDK, secrets, external network access, or write behavior.
MS-001.22 route.ts is delegation only.
MS-001.22 verification: focused server transport tests `13 / 13` PASS, focused AI model boundary tests `10 / 10` PASS, focused Project Brain tests `91 / 91` PASS, full tests `130 / 130` PASS, TypeScript `PASS` via `npx tsc --noEmit`, lint `PASS` with 0 errors and 1 existing warning outside milestone scope, production build `PASS`, implementation review `PASS`, contract deviations `NONE`.
MS-001.22 publication evidence: commit `4e9a600`; branch `main`; origin/main synchronization after publication `0 / 0`; working tree after publication `CLEAN`; published files `src/lib/ai-model/server.ts`, `src/lib/ai-model/server.test.ts`, `src/app/api/projects/[id]/ai/generate/route.ts`, `docs/04_ROADMAP.md`, `docs/08_CURRENT_STATE.md`, `docs/09_CHANGELOG.md`, `docs/10_SESSION_STATE.md`.
MS-001.23 contract status: APPROVED.
MS-001.23 runtime status: CLOSED.
MS-001.23 activation status: CLOSED.
MS-001.23 Product Owner Decision: ACCEPT.
MS-001.23 DoR status: PASS.
MS-001.23 implementation status: COMPLETED / VERIFIED.
MS-001.23 milestone status: COMPLETED / VERIFIED / READY FOR PUBLICATION.
MS-001.23 published implementation state:
* OpenAI provider adapter: LOCAL COMPLETION VERIFIED
* production provider wiring: LOCAL COMPLETION VERIFIED
* completion verification: PASS
MS-001.23 controlled verification without secret: PASS.
MS-001.23 live OpenAI request: PASS.
MS-001.23 final HTTP status: 200.
MS-001.23 SPS status: generated.
MS-001.23 generated text returned: YES.
MS-001.23 provider attempts: 1.
MS-001.23 retry count: 0.
MS-001.23 data writes: 0.
MS-001.23 completion blocker: NONE.
MS-001.23 required prerequisite satisfied: `MS-001.24 - Server-Readable Read-Only Project Context Foundation`.
MS-001.23 durable corrections:
* OpenAI SDK automatic retries disabled through `maxRetries: 0`.
* Provider client type aligned with the installed OpenAI SDK using `Pick<OpenAI, "responses">`.
* Public route and provider result contracts unchanged.
MS-001.24 contract status: APPROVED.
MS-001.24 runtime status: CLOSED.
MS-001.24 activation status: CLOSED.
MS-001.24 Product Owner Decision: GO.
MS-001.24 Product Owner Approval: APPROVED.
MS-001.24 DoR status: PASS.
MS-001.24 implementation status: COMPLETED / VERIFIED / PUBLISHED.
MS-001.24 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.24 product outcome: one canonical read-only project context must be available through Project Brain to both browser runtime and server runtime without bypassing Project Brain.
MS-001.24 architecture decision required before implementation: canonical server-readable project source.
MS-001.24 architecture decision: `ADR-0005 - Canonical Serverless Project Repository for Project Identity`.
MS-001.24 approved mechanism: managed serverless PostgreSQL.
MS-001.24 provider selection: COMPLETED.
MS-001.24 selected provider: Neon.
MS-001.24 selected product: Neon Serverless Postgres.
MS-001.24 preferred region: AWS Europe Central 1 (Frankfurt).
MS-001.24 runtime connection: pooled.
MS-001.24 migration/admin connection: direct.
MS-001.24 required environment variable names: `DATABASE_URL`, `DATABASE_URL_DIRECT`.
MS-001.24 minimal Neon infrastructure: PROVISIONED.
MS-001.24 default Neon branch: production.
MS-001.24 initial Neon database: present.
MS-001.24 initial Neon role: present.
MS-001.24 pooled connection available: YES.
MS-001.24 direct connection available: YES.
MS-001.24 application secret configuration: COMPLETED LOCALLY; `.env.local` contains `DATABASE_URL` and `DATABASE_URL_DIRECT` and remains ignored by Git.
MS-001.24 schema status: MINIMAL canonical Project / Task / Knowledge read support is published.
MS-001.24 `projects` table status: CREATED.
MS-001.24 existing project seed record status: CREATED AND VERIFIED.
MS-001.24 application connectivity verification: PASS - one live read through `getServerProjectById()` returned the known seeded project record.
MS-001.24 canonical server repositories are published for Project, Tasks, and KnowledgeEntries.
MS-001.24 runtime dependency: `@neondatabase/serverless` `1.1.0`.
MS-001.24 browser-safe canonical read clients are published for Project, Tasks, and KnowledgeEntries.
MS-001.24 Tasks page uses canonical GET/POST with read-after-write refresh.
MS-001.24 server Project Brain uses canonical server context.
MS-001.24 browser AI Workspace uses canonical browser Project Brain context.
MS-001.24 server AI flow uses canonical server Project Brain context.
MS-001.24 browser and server share the same central Project Brain composition through `composeProjectBrainSnapshot(...)` and `aiProjectContextFromSnapshot(...)`.
MS-001.24 AI Project guard remains as the consciously accepted additional Project read before provider access.
MS-001.24 runtime uses only `DATABASE_URL`.
MS-001.24 runtime does not use `DATABASE_URL_DIRECT`.
MS-001.24 canonical source target is Neon for `Project`, `Tasks`, and `KnowledgeEntries`.
MS-001.24 selected boundary model: server-first.
MS-001.24 minimal server-first create boundary for `Tasks` and `KnowledgeEntries` is allowed only as the required exception for feeding the canonical read-only project context.
MS-001.24 this exception does not approve full CRUD, full write-flow migration, or general write-architecture redesign.
MS-001.24 does not require full migration of the whole application away from `localStorage`, browser Knowledge create/read UI, removal of the extra AI Project guard read, full CRUD, auth, or multi-user behavior.
MS-001.25 contract status: APPROVED.
MS-001.25 runtime status: CLOSED.
MS-001.25 activation status: CLOSED.
MS-001.25 Chief Architect closure decision: FORMALLY ACCEPTED.
MS-001.25 implementation status: COMPLETED / VERIFIED.
MS-001.25 milestone status: COMPLETED / VERIFIED.
MS-001.25 product outcome: one controlled AI Workspace generation flow exists on top of the published canonical read-only project context and existing AI route.
MS-001.25 preserved boundaries:
* browser sends exactly `{ instruction }`
* browser does not send `projectId` or canonical project context in request body
* Project Brain remains the only canonical context source
* generated output remains ephemeral UI state only
* no chat, history, streaming, retry, Markdown, agents, tool calling, or writes to Project Brain were introduced
MS-001.25 user-visible behavior:
* one instruction field exists
* one `Generate` action exists
* empty and whitespace-only instruction is blocked locally
* duplicate submit is blocked during the active request
* generating state is visible
* one text result is rendered
* controlled error messages are rendered
MS-001.25 final verification: full tests `21 / 258` PASS, `npx.cmd tsc --noEmit` PASS, `npm.cmd run lint` PASS, `npm.cmd run build` PASS, `git diff --check` PASS.
MS-001.25 blocker status: NONE.
MS-001.25 local completion evidence commits:
* `19da642` - `feat: add AI workspace generation UI`
* `002f95f` - `fix: narrow browser transport errors`
* `4c08b7c` - `fix: validate project brain project shape`
* `398470a` - `fix: preserve task submit state across projects`
* `7fbc023` - `test: align project brain mock with vitest`
* `f4672ec` - `test: type task submission deferreds`
* `f63e285` - `test: align openai mocks with sdk`
* `db0c1a3` - `test: provide complete openai test env`
MS-001.26 contract status: APPROVED.
MS-001.26 runtime status: CLOSED.
MS-001.26 activation status: CLOSED.
MS-001.26 Chief Architect closure decision: FORMALLY ACCEPTED.
MS-001.26 implementation status: COMPLETED / VERIFIED.
MS-001.26 milestone status: COMPLETED / VERIFIED.
MS-001.26 product outcome: one controlled AI Workspace Knowledge save flow exists on top of the published AI Workspace generation flow and the existing canonical Knowledge write endpoint.
MS-001.26 preserved boundaries:
* save UI appears only after successful generation
* browser sends exactly `{ title, content }`
* browser does not send `projectId` or canonical project context in request body
* current generated result is used as `content`
* explicit non-empty `Title` is required
* duplicate save is blocked during the active request
* re-saving the same generated result is blocked after `saved`
* stale save completion is blocked after a new generation and project change
* no auto-save, canonical refresh, Knowledge boundary change, browser client addition, chat, streaming, retry UI, agents, or storage change was introduced
MS-001.26 final verification: full tests `21 / 267` PASS, `npx.cmd tsc --noEmit` PASS, `npm.cmd run lint` PASS, `npm.cmd run build` PASS, `git diff --check` PASS.
MS-001.26 blocker status: NONE.
MS-001.26 local completion evidence commit:
* `ff7dc59` - `feat: save AI results to knowledge`
MS-001.27 contract status: APPROVED.
MS-001.27 runtime status: CLOSED.
MS-001.27 activation status: CLOSED.
MS-001.27 implementation status: COMPLETED / VERIFIED.
MS-001.27 milestone status: COMPLETED / VERIFIED.
MS-001.27 product outcome: one controlled static starter-prompt catalog exists in the AI Workspace without changing the existing AI route, Project Brain, Knowledge, provider, or persistence boundaries.
MS-001.27 preserved boundaries:
* prompt selection fills the existing instruction field only
* prompt selection replaces the previous instruction deterministically
* manual instruction editing clears the selected prompt UI state
* prompt selection does not trigger automatic generation
* browser generation request body remains exactly `{ instruction }`
* browser request body still does not include `projectId`, prompt metadata, or project context
* no endpoint, provider, Project Brain, Knowledge, or persistence changes were introduced
MS-001.27 final verification: full tests `21 / 269` PASS, `npx.cmd tsc --noEmit` PASS, `npm.cmd run lint` PASS, `npm.cmd run build` PASS, `git diff --check` PASS.
MS-001.27 blocker status: NONE.
MS-001.27 local completion evidence commit:
* `1e5158f` - `feat: add controlled AI starter prompts`
MS-001.28 contract status: APPROVED.
MS-001.28 runtime status: CLOSED.
MS-001.28 activation status: CLOSED.
MS-001.28 implementation status: COMPLETED / VERIFIED.
MS-001.28 milestone status: COMPLETED / VERIFIED.
MS-001.28 product outcome: one controlled read-after-save AI Workspace Knowledge refresh exists on top of the published AI Workspace save flow and the existing canonical Project Brain context reader.
MS-001.28 preserved boundaries:
* exactly one canonical context refresh runs only after successful Knowledge save
* the visible Knowledge list is updated only from the existing reader result
* generated result remains visible
* save success remains preserved
* refresh failure uses a separate message and does not become save failure
* save failure does not trigger refresh
* stale refresh from a previous project cannot overwrite the current project state
* no optimistic update was introduced
* generate request body remains exactly `{ instruction }`
* save request body remains exactly `{ title, content }`
* no endpoint, Project Brain, Knowledge model, provider, or persistence changes were introduced
MS-001.28 final verification: full tests `21 / 272` PASS, `npx.cmd tsc --noEmit` PASS, `npm.cmd run lint` PASS, `npm.cmd run build` PASS, `git diff --check` PASS.
MS-001.28 blocker status: NONE.
MS-001.28 local completion evidence commit:
* `0d56046` - `feat: refresh AI knowledge context after save`
MS-001.29 contract status: APPROVED.
MS-001.29 runtime status: CLOSED.
MS-001.29 activation status: CLOSED.
MS-001.29 implementation status: COMPLETED / VERIFIED.
MS-001.29 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.29 product outcome: one local non-persistent multi-exchange AI Workspace conversation exists without changing the existing generation endpoint, Project Brain boundaries, or persistence model.
MS-001.29 preserved boundaries:
* scope remains only `/projects/[id]/ai` and its nearest tests
* each successful `Generate` appends one local instruction/response pair to the visible conversation
* Save to Knowledge remains bound only to the latest generated result
* starter prompts remain unchanged
* Knowledge refresh remains unchanged
* generate request body remains exactly `{ instruction }`
* save request body remains exactly `{ title, content }`
* no persistence, new endpoint, streaming, agents, Markdown rendering, retry UI, or Project Brain change was introduced
MS-001.29 verification: targeted component tests `27 / 27` PASS, `npx.cmd tsc --noEmit` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.29 blocker status: NONE.
MS-001.29 local completion evidence commit: `573fa5a` - `feat(ai-workspace): add controlled conversation foundation`.
MS-001.30 contract status: APPROVED.
MS-001.30 runtime status: CLOSED.
MS-001.30 activation status: CLOSED.
MS-001.30 implementation status: COMPLETED / VERIFIED.
MS-001.30 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.30 product outcome: controlled local conversation context now exists in the AI Workspace without changing the existing generation endpoint, Project Brain boundaries, or persistence model.
MS-001.30 preserved boundaries:
* scope remains only `/projects/[id]/ai` and its nearest tests
* the first `Generate` sends no conversation history
* the second and later `Generate` actions include controlled local context from prior successful exchanges in the same UI session
* conversation context remains local and non-persistent
* Save to Knowledge remains bound only to the latest generated result
* starter prompts remain unchanged
* Knowledge refresh remains unchanged
* generate request body remains exactly `{ instruction }`
* save request body remains exactly `{ title, content }`
* no persistence, new endpoint, streaming, agents, Markdown rendering, retry UI, or Project Brain change was introduced
MS-001.30 verification: targeted component tests `29 / 29` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.30 blocker status: NONE.
MS-001.30 local completion evidence commit: `422b44e` - `feat(ai-workspace): add controlled conversation context`.
MS-001.31 contract status: APPROVED.
MS-001.31 runtime status: CLOSED.
MS-001.31 activation status: CLOSED.
MS-001.31 implementation status: COMPLETED / VERIFIED.
MS-001.31 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.31 product outcome: one explicit local conversation reset control now exists in the AI Workspace without changing the existing generation endpoint, Project Brain boundaries, or persistence model.
MS-001.31 preserved boundaries:
* scope remains only `/projects/[id]/ai` and its nearest tests
* one reset control clears only the current local conversation state
* after reset, the next `Generate` sends no prior conversation history
* after a new successful exchange, later `Generate` actions use only the new post-reset local context
* Save to Knowledge remains bound only to the latest generated result
* starter prompts remain unchanged
* Knowledge refresh remains unchanged
* generate request body remains exactly `{ instruction }`
* save request body remains exactly `{ title, content }`
* no persistence, new endpoint, streaming, agents, Markdown rendering, retry UI, or Project Brain change was introduced
MS-001.31 verification: targeted component tests `30 / 30` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.31 blocker status: NONE.
MS-001.31 local completion evidence commit: `f756a57` - `feat(ai-workspace): add conversation reset control`.
MS-001.32 contract status: APPROVED.
MS-001.32 runtime status: CLOSED.
MS-001.32 activation status: CLOSED.
MS-001.32 implementation status: COMPLETED / VERIFIED.
MS-001.32 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.32 product outcome: one fixed local conversation-context budget now exists in the AI Workspace without changing the existing generation endpoint, Project Brain boundaries, or persistence model.
MS-001.32 preserved boundaries:
* scope remains only `/projects/[id]/ai` and its nearest tests
* first `Generate` sends no conversation history
* later `Generate` actions include only the last 3 successful local exchanges from the current UI session
* older exchanges outside the budget do not enter the next `instruction`
* reset still clears the local conversation state
* Save to Knowledge remains bound only to the latest generated result
* generate request body remains exactly `{ instruction }`
* save request body remains exactly `{ title, content }`
* no persistence, new endpoint, streaming, agents, Markdown rendering, retry UI, or Project Brain change was introduced
MS-001.32 verification: targeted component tests `31 / 31` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.32 blocker status: NONE.
MS-001.32 local completion evidence commit: `ba5e13b` - `feat(ai-workspace): limit conversation context budget`.
MS-001.33 contract status: APPROVED.
MS-001.33 runtime status: CLOSED.
MS-001.33 activation status: CLOSED.
MS-001.33 implementation status: COMPLETED / VERIFIED.
MS-001.33 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.33 product outcome: one minimal visibility status for local conversation context now exists in the AI Workspace without changing the existing generation endpoint, Project Brain boundaries, or persistence model.
MS-001.33 preserved boundaries:
* scope remains only `/projects/[id]/ai` and its nearest tests
* initial state shows no local conversation context
* after successful generations, status shows use of the last `X` local exchanges within the existing fixed budget
* after reset, status returns to no local conversation context
* full conversation content is not exposed through the new status
* generate request body remains exactly `{ instruction }`
* save request body remains exactly `{ title, content }`
* Save to Knowledge remains bound only to the latest generated result
* no persistence, new endpoint, streaming, agents, Markdown rendering, retry UI, or Project Brain change was introduced
MS-001.33 verification: targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.33 blocker status: NONE.
MS-001.33 local completion evidence commit: `14acba9` - `feat(ai-workspace): show conversation context status`.
MS-001.34 contract status: APPROVED.
MS-001.34 runtime status: CLOSED.
MS-001.34 activation status: CLOSED.
MS-001.34 implementation status: COMPLETED / VERIFIED.
MS-001.34 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.34 product outcome: one visible copy control now exists for generated AI Workspace result text without changing the existing generation, Knowledge save, Project Brain, or persistence boundaries.
MS-001.34 preserved boundaries:
* clicking `Copy` uses the browser clipboard API only
* copy uses the exact generated result text
* generate, reset conversation, and save to Knowledge behavior remain unchanged
* copy does not mutate conversation state, save state, Project Brain state, Knowledge state, or persistence state
MS-001.34 verification: targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.34 blocker status: NONE.
MS-001.34 publication commit: `8991a45` - `feat(ai-workspace): add response copy control`.
MS-001.35 contract status: APPROVED.
MS-001.35 runtime status: CLOSED.
MS-001.35 activation status: CLOSED.
MS-001.35 implementation status: COMPLETED / VERIFIED.
MS-001.35 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.35 product outcome: one explicit AI Workspace Engine readiness contract now defines the engine as a consumer and coordinator over Project Brain with non-canonical local conversation state and explicit save boundaries.
MS-001.35 preserved boundaries:
* Project Brain remains the Single Source of Truth
* no production UI behavior changed
* no backend or provider behavior changed
* no dependency or configuration change was introduced
MS-001.35 verification: documentation consistency review PASS, `git diff --check` PASS.
MS-001.35 blocker status: NONE.
MS-001.35 publication commit: `2cda65b` - `docs(ai-workspace): add engine contract foundation`.
MS-001.36 contract status: APPROVED.
MS-001.36 runtime status: CLOSED.
MS-001.36 activation status: CLOSED.
MS-001.36 implementation status: COMPLETED / VERIFIED.
MS-001.36 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.36 product outcome: one minimal AI Workspace Engine runtime module now owns the pure local conversation exchange type, fixed context budget, context visibility message, and bounded generation instruction builder while the existing AI Workspace page reuses that module with unchanged UX and behavior.
MS-001.36 preserved boundaries:
* no new UI controls
* no persistence or localStorage
* no fetch, provider, or API route changes
* no Project Brain write boundary changes
* local conversation remains non-canonical
MS-001.36 verification: targeted engine tests `5 / 5` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.36 blocker status: NONE.
MS-001.37 contract status: APPROVED.
MS-001.37 runtime status: CLOSED.
MS-001.37 activation status: CLOSED.
MS-001.37 implementation status: COMPLETED / VERIFIED.
MS-001.37 milestone status: COMPLETED / VERIFIED / PUSHED.
MS-001.37 product outcome: one minimal AI Workspace Engine status-mapping layer now owns the pure generation error/status message mapping and save-to-Knowledge error/status message mapping while the existing AI Workspace page reuses those engine exports with unchanged UI text and behavior.
MS-001.37 preserved boundaries:
* no UI text changes
* no new UI controls
* no save-flow behavior changes
* no generation behavior changes
* no provider, API route, or Project Brain boundary changes
MS-001.37 verification: targeted engine tests `7 / 7` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.37 blocker status: NONE.
MS-001.38 contract status: APPROVED.
MS-001.38 runtime status: CLOSED.
MS-001.38 activation status: CLOSED.
MS-001.38 implementation status: COMPLETED / VERIFIED.
MS-001.38 publication status: PUBLISHED.
MS-001.38 publication commit: `a7b7696`.
MS-001.38 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.38 product outcome: one minimal AI Workspace Engine save-state derivation layer now owns the pure active save-state matching rule for the latest exchange while the existing AI Workspace page reuses that helper with unchanged UI behavior and save semantics.
MS-001.38 preserved boundaries:
* no UI text changes
* no new UI controls
* no save-semantic changes
* no copy or reset behavior changes
* no provider, API route, or Project Brain boundary changes
MS-001.38 verification: targeted engine tests `10 / 10` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.38 blocker status: NONE.
MS-001.39 contract status: APPROVED.
MS-001.39 runtime status: CLOSED.
MS-001.39 activation status: CLOSED.
MS-001.39 implementation status: COMPLETED / VERIFIED.
MS-001.39 publication status: PUBLISHED.
MS-001.39 publication commit: `4eac640`.
MS-001.39 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.39 product outcome: one minimal AI Workspace Engine latest-exchange derivation layer now owns the pure lookup of the latest local exchange from `latestExchangeId` and `exchanges` while the existing AI Workspace page reuses that helper with unchanged behavior.
MS-001.39 preserved boundaries:
* no UI text changes
* no new UI controls
* no save-semantic changes
* no provider, API route, or Project Brain boundary changes
* no async handler extraction or broader state-management extraction
MS-001.39 verification: targeted engine tests `13 / 13` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.39 blocker status: NONE.
MS-001.40 contract status: APPROVED.
MS-001.40 runtime status: CLOSED.
MS-001.40 activation status: CLOSED.
MS-001.40 implementation status: COMPLETED / VERIFIED.
MS-001.40 publication status: PUBLISHED.
MS-001.40 publication commit: `6a608d1`.
MS-001.40 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.40 product outcome: one minimal AI Workspace Engine active-generation-state derivation layer now owns the pure lookup of the active local generation state from `projectId` and `generationUiState` while the existing AI Workspace page reuses that helper with unchanged behavior.
MS-001.40 preserved boundaries:
* no UI text changes
* no new UI controls
* no request-shape changes
* no provider, API route, or Project Brain boundary changes
* no async handler extraction or broader state-management extraction
MS-001.40 verification: targeted engine tests `15 / 15` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.40 blocker status: NONE.
MS-001.41 contract status: APPROVED.
MS-001.41 runtime status: CLOSED.
MS-001.41 activation status: CLOSED.
MS-001.41 implementation status: COMPLETED / VERIFIED.
MS-001.41 publication status: PUBLISHED.
MS-001.41 publication commit: `48ad94e`.
MS-001.41 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.41 product outcome: the repository already contains one minimal AI Workspace Engine active-save-state derivation layer that owns the pure derivation of the active local save state from `projectId`, `saveUiState`, and `latestExchange` while the existing AI Workspace page already reuses that helper with unchanged behavior.
MS-001.41 preserved boundaries:
* no UI text changes
* no new UI controls
* no request-shape changes
* no save mutation refactor
* no provider, API route, or Project Brain boundary changes
MS-001.41 verification: targeted engine tests `15 / 15` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.41 blocker status: NONE.
MS-001.42 contract status: APPROVED.
MS-001.42 runtime status: CLOSED.
MS-001.42 activation status: CLOSED.
MS-001.42 implementation status: COMPLETED / VERIFIED.
MS-001.42 publication status: PUBLISHED.
MS-001.42 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.42 product outcome: the repository now contains one minimal AI Workspace Engine save-action presentation derivation layer that owns the pure Save button label and disabled-state derivation from the active save state while the existing AI Workspace page reuses that helper with unchanged behavior.
MS-001.42 preserved boundaries:
* no button text changes
* no disabled-state behavior changes
* no save mutation flow changes
* no provider, API route, or Project Brain boundary changes
* no broader component refactor
MS-001.42 verification: targeted engine tests `17 / 17` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.42 blocker status: NONE.
MS-001.43 contract status: APPROVED.
MS-001.43 runtime status: CLOSED.
MS-001.43 activation status: CLOSED.
MS-001.43 implementation status: COMPLETED / VERIFIED.
MS-001.43 publication status: PUBLISHED.
MS-001.43 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.43 product outcome: the repository now contains one minimal AI Workspace Engine generate-action presentation derivation layer that owns the pure Generate button label and disabled-state derivation from the active generation state while the existing AI Workspace page reuses that helper with unchanged behavior.
MS-001.43 preserved boundaries:
* no button text changes
* no disabled-state behavior changes
* no generation flow changes
* no provider, API route, or Project Brain boundary changes
* no broader component refactor
MS-001.43 verification: targeted engine tests `19 / 19` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.43 blocker status: NONE.
MS-001.44 contract status: APPROVED.
MS-001.44 runtime status: CLOSED.
MS-001.44 activation status: CLOSED.
MS-001.44 implementation status: COMPLETED / VERIFIED.
MS-001.44 publication status: PUBLISHED.
MS-001.44 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.44 product outcome: the repository now contains one minimal AI Workspace Engine reset-action presentation derivation layer that owns the pure Reset button label, visibility, and disabled-state derivation from the active generation state and local exchanges while the existing AI Workspace page reuses that helper with unchanged behavior.
MS-001.44 preserved boundaries:
* no button text changes
* no visibility behavior changes
* no disabled-state behavior changes
* no generation flow changes
* no provider, API route, or Project Brain boundary changes
* no broader component refactor
MS-001.44 verification: targeted engine tests `21 / 21` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.44 blocker status: NONE.
MS-001.45 contract status: APPROVED.
MS-001.45 runtime status: CLOSED.
MS-001.45 activation status: CLOSED.
MS-001.45 implementation status: COMPLETED / VERIFIED.
MS-001.45 publication status: PUBLISHED.
MS-001.45 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.45 product outcome: the repository now contains one minimal AI Workspace Engine instruction-state derivation layer that owns the pure active instruction text and selected starter prompt id derivation for the current project while the existing AI Workspace page reuses that helper with unchanged behavior.
MS-001.45 preserved boundaries:
* no request shape changes
* no generated instruction behavior changes
* no starter prompt behavior changes
* no UX text changes
* no provider, API route, or Project Brain boundary changes
* no broader component refactor
MS-001.45 verification: targeted engine tests `23 / 23` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.45 publication commit: `ba6f3fa`.
MS-001.45 blocker status: NONE.
MS-001.46 contract status: APPROVED.
MS-001.46 runtime status: CLOSED.
MS-001.46 activation status: CLOSED.
MS-001.46 implementation status: COMPLETED / VERIFIED.
MS-001.46 publication status: PUBLISHED.
MS-001.46 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.46 product outcome: the repository now contains one minimal AI Workspace page update that removes duplicate local `SaveState` and `SaveUiState` declarations and reuses the engine-owned `SaveUiState` type directly while preserving the existing behavior.
MS-001.46 preserved boundaries:
* no fetch flow changes
* no save logic changes
* no reset, copy, or layout behavior changes
* no provider, API route, or Project Brain boundary changes
* no broader component refactor
MS-001.46 verification: targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warnings only, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.46 publication commit: `826ad96`.
MS-001.46 blocker status: NONE.
MS-001.47 contract status: APPROVED.
MS-001.47 runtime status: CLOSED.
MS-001.47 activation status: CLOSED.
MS-001.47 implementation status: COMPLETED / VERIFIED.
MS-001.47 publication status: PUBLISHED.
MS-001.47 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.47 product outcome: the repository now contains one minimal AI Workspace page update that reuses the engine-owned `InstructionUiState` type directly and removes the local `selectedPromptId` typing workaround while preserving the existing behavior.
MS-001.47 preserved boundaries:
* no starter prompt behavior changes
* no instruction editing behavior changes
* no fetch, generate, save, reset, or copy flow changes
* no provider, API route, or Project Brain boundary changes
* no broader component refactor
MS-001.47 verification: targeted engine tests `23 / 23` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warnings only, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.47 blocker status: NONE.
MS-001.48 contract status: APPROVED.
MS-001.48 runtime status: CLOSED.
MS-001.48 activation status: CLOSED.
MS-001.48 implementation status: COMPLETED / VERIFIED.
MS-001.48 publication status: PUBLISHED.
MS-001.48 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.48 product outcome: the repository now contains one minimal AI Workspace Engine type addition that owns the `ContextUiState` union for context availability, while the AI Workspace page reuses that type with unchanged behavior.
MS-001.48 preserved boundaries:
* no context loading behavior changes
* no Project Brain read changes
* no generate, save, reset, or copy flow changes
* no provider, API route, or prompt changes
* no broader component refactor
MS-001.48 verification: targeted engine tests `23 / 23` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warnings only, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.48 blocker status: NONE.
MS-001.49 contract status: APPROVED.
MS-001.49 runtime status: CLOSED.
MS-001.49 activation status: CLOSED.
MS-001.49 implementation status: COMPLETED / VERIFIED.
MS-001.49 publication status: PUBLISHED.
MS-001.49 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.49 product outcome: the repository now contains one minimal AI Workspace Engine type addition that owns the `StarterPromptUiState` shape for starter prompts, while the AI Workspace page reuses that type with unchanged behavior.
MS-001.49 preserved boundaries:
* no prompt text/content changes
* no generation, save, reset, or copy flow changes
* no context loading changes
* no Project Brain, provider, or API route changes
* no broader component refactor
MS-001.49 verification: targeted engine tests `23 / 23` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warnings only, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.49 blocker status: NONE.
MS-001.50 contract status: APPROVED.
MS-001.50 runtime status: CLOSED.
MS-001.50 activation status: CLOSED.
MS-001.50 implementation status: COMPLETED / VERIFIED.
MS-001.50 publication status: PUBLISHED.
MS-001.50 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.50 product outcome: the repository now contains one minimal AI Workspace Engine helper that owns the derivation of `InstructionUiState` from the current project id and a selected `StarterPromptUiState`, while the AI Workspace page reuses that helper with unchanged behavior.
MS-001.50 preserved boundaries:
* no prompt text/content changes
* no generation, save, reset, or copy flow changes
* no context loading changes
* no Project Brain, provider, or API route changes
* no broader component refactor
MS-001.50 verification: targeted engine tests `24 / 24` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warnings only, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.50 blocker status: NONE.
MS-001.51 contract status: APPROVED.
MS-001.51 runtime status: CLOSED.
MS-001.51 activation status: CLOSED.
MS-001.51 implementation status: COMPLETED / VERIFIED.
MS-001.51 publication status: PUBLISHED.
MS-001.51 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.51 product outcome: the repository now contains one minimal AI Workspace Engine helper that owns the derivation of `InstructionUiState` from the current project id and manual instruction text input, while the AI Workspace page reuses that helper with unchanged behavior.
MS-001.51 preserved boundaries:
* no prompt text/content changes
* no generation, save, reset, or copy flow changes
* no context loading changes
* no Project Brain, provider, or API route changes
* no broader component refactor
MS-001.51 verification: targeted engine tests `25 / 25` PASS, targeted component tests `32 / 32` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS with line-ending warnings only, full tests NOT RUN, lint NOT RUN, build NOT RUN.
MS-001.51 blocker status: NONE.
MS-001.52 contract status: APPROVED.
MS-001.52 runtime status: CLOSED.
MS-001.52 activation status: CLOSED.
MS-001.52 implementation status: COMPLETED / VERIFIED.
MS-001.52 publication status: PUBLISHED.
MS-001.52 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.52 product outcome: the AI Workspace engine now owns reset-state derivation for `GenerationUiState` and `SaveUiState`; the AI Workspace page reset handler delegates those state objects to engine helpers while preserving behavior.
MS-001.52 preserved boundaries:
* no UX changes
* no copy changes
* no layout changes
* no API/fetch/provider changes
* no Project Brain behavior changes
* no Knowledge save behavior changes
* no starter prompt behavior changes
* no manual instruction behavior changes
MS-001.52 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS, `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS, `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.52 blocker status: NONE.
MS-001.53 contract status: APPROVED.
MS-001.53 runtime status: CLOSED.
MS-001.53 activation status: CLOSED.
MS-001.53 implementation status: COMPLETED / VERIFIED.
MS-001.53 publication status: PUBLISHED.
MS-001.53 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.53 product outcome: the AI Workspace engine now owns generation-start state derivation; `handleGenerate` delegates the `"generating"` `GenerationUiState` construction to the engine while preserving existing exchanges/latestExchangeId behavior for the same `projectId` and reset behavior for a different `projectId`.
MS-001.53 preserved boundaries:
* no UX changes
* no copy changes
* no layout changes
* no API/fetch/provider changes
* no Project Brain behavior changes
* no Knowledge save behavior changes
* no reset behavior changes
* no starter prompt behavior changes
* no manual instruction behavior changes
MS-001.53 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`29 / 29`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.53 blocker status: NONE.
MS-001.54 contract status: APPROVED.
MS-001.54 runtime status: CLOSED.
MS-001.54 activation status: CLOSED.
MS-001.54 implementation status: COMPLETED / VERIFIED.
MS-001.54 publication status: PUBLISHED.
MS-001.54 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.54 product outcome: the AI Workspace engine now owns generation-error state derivation; `handleGenerate` delegates the three approved `"error"` `GenerationUiState` constructions to the engine while preserving exchanges/latestExchangeId for the same `projectId` and resetting them for a different `projectId`.
MS-001.54 preserved boundaries:
* no UX changes
* no copy changes
* no layout changes
* no API/fetch/provider changes
* no Project Brain behavior changes
* no Knowledge save behavior changes
* no generation success behavior changes
* no reset behavior changes
* no instruction behavior changes
MS-001.54 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`31 / 31`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.54 blocker status: NONE.
MS-001.55 contract status: APPROVED.
MS-001.55 runtime status: CLOSED.
MS-001.55 activation status: CLOSED.
MS-001.55 implementation status: COMPLETED / VERIFIED.
MS-001.55 publication status: PUBLISHED.
MS-001.55 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.55 product outcome: the AI Workspace engine now owns generation-success state derivation; `handleGenerate` delegates the approved `"generated"` `GenerationUiState` construction to the engine while preserving existing exchanges for the same `projectId` and starting history from only the new exchange for a different `projectId`.
MS-001.55 preserved boundaries:
* no UX changes
* no copy changes
* no layout changes
* no API/fetch/provider changes
* no Project Brain behavior changes
* no Knowledge save behavior changes
* no reset behavior changes
* no instruction behavior changes
MS-001.55 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`33 / 33`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.55 blocker status: NONE.
MS-001.57 contract status: APPROVED.
MS-001.57 runtime status: CLOSED.
MS-001.57 activation status: CLOSED.
MS-001.57 implementation status: COMPLETED.
MS-001.57 publication status: PUBLISHED.
MS-001.57 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.57 product outcome: the AI Workspace engine now owns the deterministic `saved` `SaveUiState` derivation via `deriveSaveSuccessState` while `handleSaveToKnowledge` delegates only the save-success state construction and preserves the existing save flow and refresh path behavior.
MS-001.57 preserved boundaries:
* no save-error derivation
* no refresh-warning derivation
* no save flow changes
* no UX, text, or layout changes
* no backend, API, or provider wiring changes
* no Project Brain changes
* no full save-flow refactoring
MS-001.57 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`35 / 35`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.57 blocker status: NONE.
MS-001.56 contract status: APPROVED.
MS-001.56 runtime status: CLOSED.
MS-001.56 activation status: CLOSED.
MS-001.56 implementation status: COMPLETED / VERIFIED.
MS-001.56 publication status: PUBLISHED.
MS-001.56 publication commit: `bfb889b`.
MS-001.56 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.56 product outcome: the AI Workspace engine now owns the deterministic `saving` `SaveUiState` derivation via `deriveSaveSavingState` while `handleSaveToKnowledge` preserves the existing save runtime behavior and operation order.
MS-001.56 preserved boundaries:
* no save success derivation
* no save error derivation
* no validation error derivation
* no refresh-warning derivation
* no reset or active-save derivation changes
* no Copy Result changes
* no UX or text changes
* no backend, API, provider, Project Brain, or knowledge model changes
MS-001.56 verification: `npm.cmd test -- src/lib/ai-workspace-engine/engine.test.ts` PASS (`34 / 34`), `npm.cmd test -- src/app/projects/[id]/ai/page.test.tsx` PASS (`32 / 32`), `npx.cmd tsc --noEmit` PASS, `git diff --check` PASS.
MS-001.56 blocker status: NONE.
Live OpenAI request remains not allowed.
Pending deployment topic: `Deployment Architecture Discovery - OVH VPS + Coolify + Neon` is pending discovery only, is not an accepted ADR, and had no implementation in this session.
CAP-004 status: COMPLETED / PUBLISHED / CLOSED
CAP-004 publication commit: `688df2b`
CAP-004 blockers: NONE
Codex is the Implementation Engine.
Chief Architect does not implement production code.
Implementation pauses when no Implementation Engine is available.
Commit and push require explicit Product Owner approval.
Implementation Done and Publication Done are separate states.
CodeRabbit / Quality Second Opinion is risk-based.
Project Brain Command Reliability / Idempotency is implemented and closed by `MS-001.17`.
Proposed Next Milestone: NONE.
Proposal Status: NONE.
Activation: NONE.
Implementation: NONE.
MS-001.17 contract status: APPROVED.
MS-001.17 runtime status: CLOSED.
MS-001.17 implementation status: IMPLEMENTED / VERIFIED / PUBLISHED.
MS-001.17 Product Owner Contract Approval: PASS.
MS-001.17 technical verification: PASS - targeted tests, full tests, TypeScript, lint, and production build.
MS-001.17 implementation review: PASS.
MS-001.17 contract deviations: NONE.
MS-001.17 publication status: PUBLISHED.
MS-001.17 milestone closure review: PASS.
MS-001.17 closure status: CLOSED.
MS-001.17 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.17 blockers: NONE.
`createProjectBrainTask(command)` is now the official public Project Brain write operation.
`createProjectBrainTask(command)` accepts `{ commandId, projectId, title }`.
`createProjectBrainTask(command)` returns `completed` with `snapshot` or `completed-with-refresh-failure` after a confirmed write.
Task Engine remains the only task write owner.
Retrying the same logical command does not create a duplicate task.
Reusing a known `commandId` with different normalized input is rejected as a command identity conflict.
Legacy task records without `commandId` remain compatible.
The one existing `react-hooks/exhaustive-deps` warning in `src/app/projects/[id]/tasks/page.tsx` remains non-blocking and outside milestone scope.
MS-001.16 remains completed and published as the earlier Project Brain command foundation baseline.
MS-001.13 contract status: APPROVED.
MS-001.13 runtime status: CLOSED.
MS-001.13 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.13 implementation status: COMPLETED.
MS-001.13 implementation review: PASS.
MS-001.13 technical verification: PASS.
MS-001.13 Product Owner Acceptance Review: PASS.
MS-001.13 publication status: PUBLISHED.
MS-001.13 publication commit: `78f28eb95b88d8ddecd66a09dc77c1962216e716`.
MS-001.13 milestone closure review: PASS.
MS-001.13 contract deviations: NONE.
MS-001.13 closure status: CLOSED.
MS-001.12 contract status: APPROVED.
MS-001.12 runtime status: CLOSED.
MS-001.12 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.12 implementation status: IMPLEMENTED.
MS-001.12 Original Implementation Commit: `29802f3`.
MS-001.12 Single-Read Fix Commit: `d6913e5`.
MS-001.12 Single-Read Contract: PASS.
MS-001.12 read-count contract: `1 / 1 / 1 / 1`.
MS-001.12 milestone closure review: PASS.
MS-001.12 Previous Blockers: ALL RESOLVED.
MS-001.12 Definition of Ready Review: PASS.
MS-001.12 activation status: ACTIVATED.
MS-001.12 activation decision: AUTHORIZED.
MS-001.12 Product Owner Closure Decision: APPROVED.
MS-001.11 contract status: APPROVED.
MS-001.11 runtime status: CLOSED.
MS-001.11 Definition of Ready status: PASS.
MS-001.11 implementation status: IMPLEMENTED / PUBLISHED / VERIFIED.
MS-001.11 milestone status: COMPLETED / PUBLISHED / CLOSED.
MS-001.11 activation status: ACTIVATED.
MS-001.11 activation decision: APPROVED BY PRODUCT OWNER.
MS-001.11 closure session: 007.
MS-001.11 boundary: deterministic read-only consumer projection over one `ProjectWorkflowSnapshot`.
MS-001.11 planned API owner: `src/lib/project-brain`.
MS-001.11 planned public API: `getProjectConsumerOverview(projectId)`.
MS-001.11 planned return type: `ProjectConsumerOverview`.
MS-001.11 has no UI, storage, persistence, cache, new source of truth, or Workflow Engine changes in scope.
MS-001.11 planned implementation scope is limited to `src/lib/project-brain/types.ts`, `src/lib/project-brain/engine.ts`, and `src/lib/project-brain/engine.test.ts`.
Active Capability: NONE.
Active Parallel Capability: NONE.
Blockers: NONE.
MS-001.11 implementation commit `dac997f` is published on `origin/main`.
MS-001.11 verification status: `npm test` PASS, `npm run lint` PASS with one accepted out-of-scope warning, `npm run build` PASS.
MS-001.11 closure status: completed; current product milestone is `NONE`.
MS-001.10 status: COMPLETED / PUBLISHED.
MS-001.10 implementation status: COMPLETED / PUBLISHED.
MS-001.10 contract approval: PASS.
MS-001.10 DoR: PASS.
MS-001.10 API owner: `src/lib/project-brain`.
MS-001.10 public API: `getProjectWorkflowSnapshot(projectId)`.
MS-001.10 return type: `ProjectWorkflowSnapshot`.
MS-001.10 public type: `ProjectWorkflowSnapshot`.
MS-001.10 aggregate type shape: `{ snapshot: ProjectBrainSnapshot; workflowResult: WorkflowResult; }`.
MS-001.10 aggregate contains `snapshot` and `workflowResult`.
MS-001.10 single-read consistency rule: snapshot is read exactly once, `workflowResult` is computed from returned `snapshot.workflowState`, and the same snapshot is returned.
MS-001.10 internal bridge rule: no internal use of `evaluateProjectWorkflow(projectId)`.
MS-001.10 data flow: `projectId` -> `getProjectBrainSnapshot(projectId)` -> `snapshot.workflowState` -> `evaluateWorkflow(snapshot.workflowState)` -> `{ snapshot, workflowResult }`.
MS-001.10 boundary: read-only.
MS-001.10 implementation commit: `1f20905`.
MS-001.10 implementation publication: `origin/main`.
MS-001.7 completed and accepted.
SPS OS 1.0 remains Released / Accepted.
Known limitation: one non-blocking lint warning in `src/app/projects/[id]/tasks/page.tsx`.
Project Brain consumer snapshot remains read-only.
Project, Task, and Knowledge remain write owners.
No new storage.
No new localStorage key.
No cache.
No migration.
No persisted aggregate.
No persisted WorkflowResult.
No persisted snapshot copy.
No UI changes.
No Workflow Engine changes.
No workflow type changes.
No write API.
No writes.
main contains the published MS-001.16 product baseline and the published CAP-004 process baseline.
Verified branch: main.
Repository working tree: CLEAN.
Ahead / behind: 0 / 0.
install PASS.
lint PASS with one previously accepted warning in `src/app/projects/[id]/tasks/page.tsx`.
build PASS.
startup PASS.
Project Brain tests PASS.
focused milestone verification: AI page `5 / 5` PASS and Project Brain `91 / 91` PASS.
full tests: `107 / 107` PASS.
git diff --check PASS.
implementation published to origin/main.

CAP-001 is reserved for the historical Bootstrap Engine. Project Capability documentation work is tracked as CAP-003.

Completed in this milestone:

* Minimal Patch 1 completed
* Created `docs/11_WORKFLOW_ENGINE.md`
* Minimal Patch 2 completed
* Workflow domain contract created
* Minimal Patch 3 completed
* First warning decision rule added to `evaluateWorkflow()`
* Minimal Patch 4 completed
* First dynamic nextStep rule added for active work
* Minimal Patch 5 completed
* Second dynamic nextStep rule added for starting next work
* Minimal Patch 6 completed
* Evidence counters unified across all WorkflowResult branches
* Minimal Patch 8 completed
* First dynamic confidence policy added
* Added `src/lib/workflow/types.ts`
* Added `src/lib/workflow/engine.ts`
* Commit: `7f6c634` - `feat(ms-001.3): add workflow engine foundation`
* Workflow Engine remains isolated from UI
* Workflow Engine now returns `health: "warning"` when blockers are absent and warnings exist
* Decision priority is `blocked > warning > ready`
* Workflow Engine now returns `nextStep.id: "continue-active-work"` when active work exists without blockers or warnings
* Workflow Engine now returns `nextStep.id: "start-next-work"` when no blockers, warnings, or active work exist
* Workflow Engine now returns consistent evidence with `phase`, `completed`, `active`, `warnings`, and `blockers` in every branch
* Workflow Engine now returns confidence `1.0` for `blocked`, `0.75` for `warning`, and `0.5` for ready branches
* Minimal Patch 7 remained diagnosis-only and was not implemented
* No existing test setup was found in `package.json`, devDependencies, or test configuration
* Test runner setup requires separate future scope

Status:

* Completed

Next:

* Keep `SPDM-001` recorded as completed documentation foundation work
* Keep `SPDM-002` recorded as completed bootstrap alignment work
* Keep `SPDM-003` recorded as completed repository access fallback work
* Keep `SPDM-004` recorded as completed SPS launcher work
* Keep `SPDM-005` recorded as completed active branch validation work
* Keep `SPDM-006` recorded as completed full startup package work
* Keep `SPDM-007` recorded as completed one-command startup enforcement work

---

# Completed

## Foundation

* 00_SPS_DEVELOPMENT_METHOD.md
* 00_ORIGINS.md
* 00_PROJECT_BIBLE.md
* 01_VISION.md
* 02_ARCHITECTURE.md
* 03_DEVELOPMENT_STANDARD.md
* 04_UI_STANDARD.md
* 05_ROADMAP.md
* 06_BACKLOG.md
* 07_DECISIONS.md
* 13_PROJECT_CAPABILITY.md
* 14_GIT_WORKFLOW.md

## Product Work

* Project creation with localStorage persistence
* Home view with Recent Projects list
* Project workspace layout with shared header and sidebar
* Overview page for project workspace
* Placeholder workspace modules for Clients, Calendar, Invoices, and Settings
* Clients list, create flow, and details view
* Services list, create flow, and details view
* Visits list, create flow, and details view
* Calendar View implemented as a read-only list over existing Visits, Clients, and Services data
* Workflow governance established for SPS Operating Workflow v1.0
* SPS Operating Workflow marked as Version 1.0 and Status Stable
* Project workspace dashboard upgraded from placeholder to active workspace center
* Dashboard KPI cards now show Clients, Services, Visits, and Upcoming Visits from project localStorage
* Dashboard Quick Actions now route to Add Client, Add Service, Schedule Visit, and Open Calendar
* Platform identity formally established for Soft Premium System
* Domain independence formally established for platform core
* Project Context Loader (PCL) added as the official first stage of workflow context loading
* ADR-001 added for Platform Identity & Domain Independence
* MS-000.2 completed with formal AI Development Workflow foundation, roles, workflow stages, prompts, and Project Integrity Check checklist
* MS-000.3 completed with AI Workflow Command Center, workflow API contract, PCL bootloader definition, and ENG-000 constitution
* MS-000.4 completed with the first SPS OS 1.0 Experience Blueprint for workspace experience
* MS-000.5 completed with ConductorState model, Conductor service, ConductorPanel, and Project Dashboard integration
* MS-000.7 completed with Workspace Engine extraction for dashboard workspace structure
* MS-000.8 completed with Project Engine MVP for shared project model and service
* MS-000.9 completed with Task Engine MVP for shared task model and service
* MS-001.0 completed with Task Workspace Integration for project tasks screen and workspace navigation
* MS-001.1 completed with KnowledgeEntry model, Knowledge Engine service, and project-scoped knowledge storage
* MS-001.2A completed with SectionCard UI component and selected simple screens updated to use the shared section container
* MS-009.1 completed with Calendar Shell structure for Header, Navigation, View Switcher, and Workspace
* MS-009.2 completed with functional Month View, current month label, today highlight, and visit counters per day
* MS-009.3 completed with Previous Month, Next Month, Today, and Month View navigation
* MS-009.4 completed with day selection, single active day state, visual selected state, and preserved Today Highlight behaviour
* MS-009.5 completed with Day Details panel, selected day information, weekday display, visit count, visit list, and Brak wizyt empty state
* SPDM-001 completed with `docs/00_SPS_DEVELOPMENT_METHOD.md` as the top-level SPS development methodology foundation document
* SPDM-003 completed with Repository Access Fallback added to `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`
* SPDM-004 completed with `docs/11_SPS_START.md` as the SPS session launcher
* SPDM-005 completed with `docs/14_GIT_WORKFLOW.md` and Active Branch Validation added to `docs/12_DEVELOPMENT_SESSION_BOOTSTRAP.md`
* SPDM-006 completed with the full SPS startup package integrating SPS_START, ZIP Mode, Bootstrap, and Active Branch Validation
* SPDM-007 completed with one-command startup enforcement that blocks memory-based bootstrap
* CAP-003.1 completed with `docs/13_PROJECT_CAPABILITY.md` as the initial Project Capability domain contract
* CAP-003.2 completed with Project Domain Model added to `docs/13_PROJECT_CAPABILITY.md`

---

# In Progress

* `Current Product Milestone` is `MS-028.8 - GitHub Real Execution Confirmation Gate Foundation`
* `Latest Completed Product Milestone` is `MS-028.7 - GitHub Real Readiness Action Foundation`
* `Next Product Milestone` is `NONE / Product Owner decision required`
* `MS-028.8` is `APPROVED` as the docs-only confirmation-gate contract that follows MS-028.7, stays based only on local UI/browser state, preserves ready-for-confirmation versus ready-to-execute, and keeps real Git/GitHub execution blocked.
* `MS-012.9` is `PUBLISHED / CLOSED` in the current local workspace as the Parallel Project Work Track First Guided Next Action Foundation; the repository now records the guided next-action cue on the task workspace surface while keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-012.8` is `PUBLISHED / CLOSED` in the current local workspace as the Parallel Project Work Track First Functional Handoff Foundation; the repository now records the visible handoff boundary across the existing project, task list, task detail, and task workspace surfaces while keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-012.7` close decision: the next milestone now requires Product Owner direction while future SPS-owned working copies still live under `C:\SPS_OS_WORK\<project-slug>` and existing project metadata may still point to the source or `repositoryUrl`.
* `MS-008.32` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Codex Handoff Jump Feedback Foundation; the repository now shows a local `Codex handoff opened locally.` status after the Codex handoff link is used while keeping the task handoff section visible and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.31` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Completion Handoff Restore Feedback Foundation; the repository now shows a local `Completion handoff restored locally.` status after updated result notes restore a copied completion handoff while keeping the completion summary and handoff output visible after the restoration and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.30` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Completion Handoff Reset Feedback Foundation; the repository now shows a local `Completion handoff reset locally.` status after edited result notes clear a copied completion handoff while keeping the completion summary and handoff output visible until the edit clears it and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.29` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Completion Handoff Copy Feedback Foundation; the repository now shows a local `Completion handoff copied.` status after the task completion handoff is copied while keeping the completion summary and handoff output visible and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.28` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Completion Restore Feedback Foundation; the repository now shows a local `Completion restored locally.` status after saving updated result notes following a completion reset while restoring the completion flow and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.27` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Completion Reset Feedback Foundation; the repository now shows a local `Completion reset locally.` status after editing result notes from the completed task state while keeping the completion summary and handoff output visible until the edit clears it and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.26` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Copy Report Feedback Foundation; the repository now shows a local `Copied locally` state on the copy-report button after the completion report is copied while keeping the completion summary and handoff output visible and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.25` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Complete Task Feedback Foundation; the repository now shows a local `Completed locally` state on the complete-task button after the task is completed while keeping the completion summary and handoff output visible and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.24` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Evidence Review Acknowledgement Feedback Foundation; the repository now shows a local `Acknowledged locally` state on the evidence-review button after the review is acknowledged while keeping the save-review-complete flow and the task completion handoff visible and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.23` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Result Notes Save Feedback Foundation; the repository now shows a local `Saved locally` state on the result-notes save button after a successful local save while keeping the projected next step visible and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.22` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED` in the current local workspace as the Task Workspace Next Step Action Foundation; the repository now offers a local `Continue to result notes` action that focuses the task result notes field while keeping the projected next step visible and keeping Current Product Milestone at `NONE` until a separate Product Owner decision is recorded.
* `MS-008.12` is `COMPLETED / VERIFIED / PUBLISHED / CLOSED`
* `Latest Completed Capability` is `CAP-005 - React Component Test Infrastructure Foundation`
* `CAP-005` is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.18` is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.19` is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.20` is `COMPLETED / PUBLISHED / CLOSED`
* proposed next milestone is `NONE`
* proposal status is `NONE`
* current activation is `NONE`
* current implementation is `NONE`
* `MS-001.21` implementation status is `IMPLEMENTED / VERIFIED / PUBLISHED`
* `MS-001.21` implementation review is `PASS`
* `MS-001.21` contract deviations are `NONE`
* `MS-001.21` publication status is `PUBLISHED`
* `MS-001.21` closure status is `CLOSED`
* `MS-001.21` milestone status is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.21` focused AI model tests are `PASS - 10 / 10`
* `MS-001.21` focused Project Brain tests are `PASS - 91 / 91`
* `MS-001.21` full tests are `PASS - 117 / 117`
* `MS-001.21` TypeScript is `PASS - npx tsc --noEmit`
* `MS-001.21` lint is `PASS - 0 errors, 1 existing warning outside milestone scope`
* `MS-001.21` production build is `PASS`
* `MS-001.22` contract status is `APPROVED`
* `MS-001.22` runtime status is `CLOSED`
* `MS-001.22` activation status is `AUTHORIZED`
* `MS-001.22` implementation status is `IMPLEMENTED / VERIFIED / PUBLISHED`
* `MS-001.22` DoR status is `PASS`
* `MS-001.22` implementation review is `PASS`
* `MS-001.22` contract deviations are `NONE`
* `MS-001.22` publication status is `PUBLISHED`
* `MS-001.22` closure status is `CLOSED`
* `MS-001.22` milestone status is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.22` is limited to one transport-only Route Handler and no real provider
* `MS-001.14` contract status is `APPROVED`
* `MS-001.14` runtime status is `CLOSED`
* `MS-001.14` implementation status is `COMPLETED`
* `MS-001.14` Definition of Ready Review is `PASS`
* `MS-001.14` activation status is `ACTIVATED`
* `MS-001.14` activation decision is `AUTHORIZED`
* `MS-001.14` Product Owner Contract Approval is `PASS`
* `MS-001.14` Product Owner Acceptance Review is `PASS`
* `MS-001.14` technical verification is `PASS`
* `MS-001.14` implementation review is `PASS`
* `MS-001.14` contract deviations are `NONE`
* `MS-001.14` publication status is `PUBLISHED`
* `MS-001.14` publication commit is `e8f8e6270316ea2199800aa8e8ee3c788315f2df`
* `MS-001.14` milestone closure review is `PASS`
* `MS-001.14` closure status is `CLOSED`
* `MS-001.14` milestone status is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.14` blockers are `NONE`
* `MS-001.13` contract status is `APPROVED`
* `MS-001.13` runtime status is `CLOSED`
* `MS-001.13` milestone status is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.13` implementation status is `COMPLETED`
* `MS-001.13` implementation review is `PASS`
* `MS-001.13` technical verification is `PASS`
* `MS-001.13` Product Owner Acceptance Review is `PASS`
* `MS-001.13` publication status is `PUBLISHED`
* `MS-001.13` publication commit is `78f28eb95b88d8ddecd66a09dc77c1962216e716`
* `MS-001.13` milestone closure review is `PASS`
* `MS-001.13` contract deviations are `NONE`
* `MS-001.13` closure status is `CLOSED`
* SPS OS 1.0 is Released / Accepted
* `MS-001.12` contract status is `APPROVED`
* `MS-001.12` runtime status is `CLOSED`
* `MS-001.12` milestone status is `COMPLETED / PUBLISHED / CLOSED`
* `MS-001.12` implementation status is `IMPLEMENTED`
* `MS-001.12` original implementation commit is `29802f3`
* `MS-001.12` single-read fix commit is `d6913e5`
* `MS-001.12` single-read contract is `PASS`
* `MS-001.12` read-count contract is `1 / 1 / 1 / 1`
* `MS-001.12` milestone closure review is `PASS`
* `MS-001.12` previous blockers are `ALL RESOLVED`
* `MS-001.12` activation status is `ACTIVATED`
* `MS-001.12` activation decision is `AUTHORIZED`
* `MS-001.12` Product Owner Closure Decision is `APPROVED`
* next controlled operation is `start Session 036 from a fresh generated package and inspect the remaining inline save-title change state derivation candidate`
* Active Capability is `NONE`
* Latest Completed Capability is `CAP-005 - React Component Test Infrastructure Foundation`
* Active Parallel Capability is `NONE`
* Active Work Item: `NONE`
* Session 033 status: `CLOSED`
* Session 034 status: `CLOSED`
* Session 035 status: `CLOSED`
* Next session after fresh `SPS OS - START`: `036`
* Verified branch: `main`
* Repository working tree: verify live with `git status -sb` or fresh `sps-git-context.txt`
* Ahead / behind: `0 / 0`
* install `PASS`
* lint `PASS` with one previously accepted warning in `src/app/projects/[id]/tasks/page.tsx`
* build `PASS`
* startup `PASS`
* focused milestone verification is `PASS` for AI page `5 / 5` and Project Brain `91 / 91`
* full tests `107 / 107 PASS`
* diff check `PASS`
* no new storage, writes, or UI changes were introduced
* no Workflow Engine changes were introduced
* no workflow type changes were introduced

---

# Next

Next session priorities:

* Keep `Current Product Milestone` aligned with `NONE / Product Owner decision required`.
* Keep `Next Product Milestone` aligned with `NONE / Product Owner decision required`.
* Semantic consistency repair is completed and published in `c6a1946`.
* Current-state finalization is completed and published in `40f457e`.
* Session 035 close synchronization is completed and published in `e9a64c0`.
* Start Session 036 from a fresh generated package.
* Inspect the remaining inline save-title change state derivation candidate during Session 036.

---

# Known Issues

No known architectural issues.

Blockers: NONE.

Commit and push status must always be confirmed explicitly by the Product Owner.

---

# Current Priorities

Priority 1

Keep SPS OS 1.0 release acceptance state synchronized across SSOT documentation.

Priority 2

Keep workflow governance and project state documentation aligned.

Priority 3

Next controlled lifecycle step: await Product Owner decision for the next milestone.

---

# MS-001.2A Summary

* Added SectionCard UI component.
* Centralized primary section container style.
* Updated selected simple screens to use SectionCard.
* No visual redesign.
* No new UI variants.
* No business logic changes.

---

# MS-001.3 Progress

* Minimal Patch 1 completed.
* Created `docs/11_WORKFLOW_ENGINE.md`.
* Minimal Patch 2 completed.
* Workflow domain contract created.
* Minimal Patch 3 completed.
* First warning decision rule added to `evaluateWorkflow()`.
* Minimal Patch 4 completed.
* First dynamic nextStep rule added for active work.
* Minimal Patch 5 completed.
* Second dynamic nextStep rule added for starting next work.
* Minimal Patch 6 completed.
* Evidence counters unified across all WorkflowResult branches.
* Minimal Patch 8 completed.
* First dynamic confidence policy added.
* Added `src/lib/workflow/types.ts`.
* Added `src/lib/workflow/engine.ts`.
* Commit recorded: `7f6c634`.
* Workflow Engine remains isolated from UI.
* Workflow Engine now returns `health: "warning"` when blockers are absent and warnings exist.
* Decision priority is `blocked > warning > ready`.
* Workflow Engine now returns `nextStep.id: "continue-active-work"` when active work exists without blockers or warnings.
* Workflow Engine now returns `nextStep.id: "start-next-work"` when no blockers, warnings, or active work exist.
* Workflow Engine now returns consistent evidence with `phase`, `completed`, `active`, `warnings`, and `blockers` in every branch.
* Workflow Engine now returns confidence `1.0` for `blocked`, `0.75` for `warning`, and `0.5` for ready branches.
* Minimal Patch 7 remained diagnosis-only because no existing test setup was found.
* Test runner setup requires separate future scope before Workflow Engine tests can be added.
* Milestone Closure Review passed.
* Milestone is formally completed.

---

# Definition of Current State

The purpose of this document is to describe the present condition of the project.

Historical information belongs to the Change Log.

Future milestone order belongs to `04_ROADMAP.md`.

Strategic product direction belongs to `05_ROADMAP.md`.

Candidate work belongs to `06_BACKLOG.md`.

`docs/BACKLOG.md` is a legacy backlog file. Candidate future work belongs to `06_BACKLOG.md` unless a separate migration task reactivates or removes the legacy file.

---

# Related Documents

| Document                   | Source of Truth           |
| -------------------------- | ------------------------- |
| 04_ROADMAP.md              | Milestone roadmap and milestone order SSOT |
| 05_ROADMAP.md              | Strategic product direction |
| 06_BACKLOG.md              | Candidate future work     |
| 07_DECISIONS.md            | Architecture decisions    |
| 09_CHANGELOG.md            | Project history           |
| AI_CONTEXT.md              | AI operating model        |
| 10_PROJECT_LIFECYCLE.md    | Session lifecycle         |
| 10_SESSION_STATE.md        | Latest session state      |
