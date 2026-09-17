# AI Workspace Engine Contract

## Purpose

This document defines the minimal readiness contract for AI Workspace Engine inside Soft Premium System.

It exists to clarify what AI Workspace may do, what it must not do, and which architectural boundaries must stay stable before deeper engine work begins.

This is a documentation and architecture contract.

It is not a provider specification, backend specification, or UI implementation plan.

## Position In Architecture

AI Workspace is a presentation and workflow surface.

AI Workspace Engine is the operational layer that prepares AI Workspace actions from canonical project context and local workspace state.

Project Brain remains the Single Source of Truth for project knowledge.

AI Workspace Engine is a consumer and coordinator.

It must never become the owner of project knowledge.

## Contract Goals

AI Workspace Engine must make the following possible:

* visible project-aware AI interaction inside AI Workspace,
* generation based on canonical project context,
* local conversation continuity inside the active workspace session,
* explicit user-controlled persistence into Project Brain through approved save actions,
* workflow readiness for future Command Center integration.

## Non-Goals

This contract does not authorize:

* autonomous architecture decisions,
* hidden writes to Project Brain,
* hidden writes to Knowledge,
* provider-specific assumptions,
* model-specific assumptions,
* local conversation history becoming a second source of truth.

## Source Of Truth Rule

Project Brain remains the authoritative owner of project tasks, knowledge entries, and canonical project context.

AI Workspace Engine may read canonical project context.

AI Workspace Engine may hold temporary local conversation state for the active workspace session.

Temporary local conversation state is operational only.

It is not canonical project knowledge.

## Minimal Engine Responsibilities

AI Workspace Engine is responsible for:

* loading canonical AI Workspace context from Project Brain representations,
* preparing generation requests from current user instruction and allowed local conversation context,
* exposing generated result state back to AI Workspace,
* allowing explicit local-only actions on generated results,
* allowing explicit user-approved save flow into Knowledge through the existing application contract,
* preserving clear separation between local session state and canonical project state.

## Minimal Engine Boundaries

AI Workspace Engine is not responsible for:

* redefining project knowledge structure,
* silently persisting generated text,
* mutating roadmap, session, or task state,
* bypassing Product Owner workflow governance,
* replacing Command Center governance decisions,
* becoming an alternative storage layer.

## Minimal Operation Contract

### 1. Load Workspace Context

**Input**

* project identifier,
* canonical project context from Project Brain representation layer.

**Output**

* AI Workspace-ready project context,
* explicit unavailable or project-not-found state when context cannot be loaded.

**Rule**

The loaded context is a representation of canonical state.

It does not transfer ownership away from Project Brain.

### 2. Generate Result

**Input**

* current user instruction,
* canonical project context,
* bounded local conversation context from the active AI Workspace session.

**Output**

* generated result for the current exchange,
* local exchange appended to the active session state,
* explicit error state if generation fails.

**Rule**

Generation may use local conversation context only as operational input for the current workspace session.

Generation must not itself persist new project knowledge.

### 3. Reset Local Conversation

**Input**

* explicit user reset action.

**Output**

* cleared local conversation state for the active workspace session.

**Rule**

Reset affects local operational state only.

Reset must not remove canonical knowledge or previously saved Project Brain content.

### 4. Copy Result

**Input**

* explicit user copy action on a generated result.

**Output**

* local clipboard transfer of the selected generated text.

**Rule**

Copy is a local workspace action only.

Copy must not mutate conversation state, save state, Project Brain state, Knowledge state, or persistence state.

### 5. Save Result To Knowledge

**Input**

* explicit user save action,
* selected generated result,
* valid title or required save metadata defined by the existing application contract.

**Output**

* success or failure state for persistence into canonical Knowledge representation.

**Rule**

Knowledge persistence is explicit and user-driven.

Generated text becomes canonical project knowledge only after successful save through the approved application path.

## State Separation Contract

AI Workspace Engine must preserve these state classes:

* canonical project state,
* local workspace conversation state,
* transient generation status,
* transient save status.

These states may interact.

They must not be conflated.

In particular:

* local conversation state must not be treated as canonical knowledge,
* save status must not imply canonical persistence before success,
* generated text must not be treated as Project Brain content before explicit save success.

## Command Center Readiness

For future Command Center integration, AI Workspace Engine should expose a contract that is compatible with:

* visible workspace readiness state,
* visible generation state,
* visible save state,
* visible error state,
* one explicit next user action at a time when workflow guidance is added.

This contract does not require Command Center implementation now.

It only defines compatibility expectations.

## Project Work Inputs To Konduktor Guidance

MS-035.3 defines the docs-first contract for connecting project work inputs to Konduktor guidance.

This section is a contract only.

It does not add runtime behavior, UI, provider calls, model calls, endpoint behavior, automation, or Codex execution.

### Input Sources

Konduktor guidance may be derived only from governed project inputs:

* tasks / `Zadania` as the active work and work-candidate signal,
* knowledge / `Wiedza` as supporting context and evidence,
* Project Brain as the interpreter of project state and context,
* Project Map as structure, evidence, product-area, risk, and ownership context,
* workflow state as health, warning, blocker, progress, active-work, and next-step signal.

### Precedence Rules

Guidance derivation must apply these rules in order:

1. Blockers, rejected/unsafe state, missing required source identity, or Project Map / Project Brain integrity risk win over all other signals.
2. Product Owner decision gaps win over implementation guidance.
3. Active tasks or active workflow state win over starting new work.
4. Project Map structure and evidence constrain task and knowledge suggestions.
5. Knowledge can explain or support a recommendation, but cannot authorize a task, milestone, or execution by itself.
6. Weak, absent, or diagnostic-only signals must produce informational guidance instead of invented executable work.

### Guidance Output States

Konduktor guidance must resolve to one of these product-facing states:

* `decision required` - Product Owner must choose or approve scope before work continues.
* `informational` - current signals are context only and do not authorize work.
* `ready for handoff` - one bounded next step is specific enough for manual Codex handoff.
* `blocked` - evidence, safety, source, ownership, or governance conditions prevent progress.

### Presentation Rules

AI Workspace is the primary surface for this guidance.

It may explain the selected step, show readiness/source/reason, and prepare copy-ready manual Codex handoff when a future approved implementation milestone adds or refines behavior.

Project Overview may show only a status or entry summary and may point to AI Workspace.

Project Overview must not become the primary Project Brain / Konduktor work guidance or copy-ready handoff surface.

### Manual Execution Boundary

Konduktor guidance is advisory until Product Owner approval and manual Codex launch.

The contract does not authorize automatic execution, background work, model/provider calls, endpoint changes, canonical Project Map writes, delete/detach/reconnect behavior, checkout-removal changes, or filesystem changes.

## Integrated Project Workbench Codex Window Contract

MS-035.9 records the target project workbench model for AI Workspace before any automated execution or provider integration is authorized.

The target one-page workbench has two coordinated sides:

* left side: Chief Architect conversation, Konduktor guidance, and Project Brain context,
* right side: Codex Window for implementation handoff, result return, and future governed execution visibility.

The current implementation is a manual stage. Product Owner copies the handoff from the right panel, pastes it into external Codex, pastes the Codex report back into the right panel, and copies the report for Chief Architect review.

The future implementation may become controlled integration only after separate architecture, safety, and Product Owner approval.

### Workbench Roles

* Product Owner approves scope, repository actions, publication, and future execution bridge activation.
* Chief Architect owns diagnosis, contracts, review, and architectural consistency.
* Konduktor recommends the next safe action from governed project signals.
* Project Brain remains the project knowledge and context authority.
* Codex implements approved work and returns a report; it does not decide scope.

### Integration Stages

1. Manual Codex Window.
2. Local report handling.
3. Read-only execution status/history.
4. Controlled Codex runner contract.
5. Real execution bridge only after separate approval.

### Cross-Project Memory Boundary

Global cross-project operational memory is a separate future contract candidate.

MS-035.9 does not implement or authorize cross-project memory, Project Brain storage changes, new APIs, automation, provider/model configuration, Codex runner behavior, or execution bridge behavior.

## Role Alignment

This contract remains aligned with current workflow roles:

* Product Owner approves scope and repository actions,
* Chief Architect defines contract boundaries and reviews consistency,
* Codex implements approved minimal changes,
* Project Brain remains the knowledge authority.

## Readiness Outcome

AI Workspace Engine is considered contract-ready when:

* AI Workspace behavior is documented as a consumer of Project Brain,
* local conversation handling is explicitly non-canonical,
* explicit save is the only path from generated text to canonical Knowledge,
* local actions such as copy remain non-persistent,
* future workflow integration can rely on clear state boundaries.
