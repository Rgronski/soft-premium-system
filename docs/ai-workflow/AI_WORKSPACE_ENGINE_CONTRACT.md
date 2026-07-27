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
