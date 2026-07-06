# Workflow API Contract

## Purpose

This document defines the logical workflow contract between:

SPS UI
    ->
ENG-000 AI Development Platform
    ->
ChatGPT / Chief Architect
    ->
Codex
    ->
GitHub

This is not a technical implementation spec.

It is a process and responsibility contract describing what each action means, who owns it, what input it needs, and what output it is expected to produce.

## Contract Principles

* SPS initiates workflow actions through the product interface.
* ENG-000 interprets those actions as workflow operations.
* ChatGPT owns diagnosis, scope shaping, review, and architectural control.
* Codex owns approved execution work.
* GitHub stores the auditable code state produced by the workflow.

## Action Contract

### AI Workflow

**Input**

* current project context,
* current documentation state,
* current repository status.

**Output**

* workflow dashboard state,
* recommended next action,
* visible engine and milestone status.

**Owner**

* SPS UI initiates,
* ENG-000 prepares the workflow state,
* ChatGPT interprets and guides.

**Expected Result**

The user can enter workflow mode from SPS and see the current operational state of the project.

### Start Milestone

**Input**

* selected engine,
* selected milestone,
* confirmed scope,
* verified documentation state.

**Output**

* milestone activated for workflow execution,
* defined implementation or documentation objective,
* handoff-ready context for Chief Architect.

**Owner**

* Product Owner approves,
* ChatGPT defines scope and start conditions.

**Expected Result**

The milestone is formally ready to begin under controlled workflow rules.

### Continue

**Input**

* current milestone state,
* current session state,
* repository working state.

**Output**

* resumed workflow context,
* next execution target,
* updated recommended action.

**Owner**

* ChatGPT.

**Expected Result**

Work resumes from a consistent project state rather than from memory or chat history alone.

### Review

**Input**

* implementation result,
* documentation result,
* verification output,
* open findings if present.

**Output**

* review status,
* accepted result or required fixes,
* readiness for user acceptance.

**Owner**

* ChatGPT / Chief Architect.

**Expected Result**

The work is evaluated before milestone closure or repository actions.

### Documentation Update

**Input**

* accepted milestone result,
* confirmed verification status,
* confirmed repository action status if applicable.

**Output**

* updated documentation package,
* synchronized Current State,
* synchronized Session State,
* synchronized Change Log when in scope.

**Owner**

* Codex executes approved documentation changes,
* ChatGPT defines required documentation state.

**Expected Result**

Documentation reflects the accepted and auditable state of the project.

### Close Milestone

**Input**

* completed scope,
* accepted review,
* synchronized documentation,
* confirmed repository state.

**Output**

* milestone marked complete,
* next milestone identified,
* closure state recorded.

**Owner**

* Product Owner approves,
* ChatGPT confirms milestone closure conditions.

**Expected Result**

The milestone is closed formally and the project can move to the next planned step.

### Close Session

**Input**

* latest session actions,
* latest verification results,
* repository action status,
* documentation state.

**Output**

* session marked closed,
* next logical step recorded,
* next session entry conditions recorded.

**Owner**

* ChatGPT defines closure content,
* Codex applies approved documentation updates,
* Product Owner confirms if repository actions are allowed.

**Expected Result**

A future session can resume safely with full continuity.

### Show Roadmap

**Input**

* roadmap source documents,
* current engine and milestone context.

**Output**

* visible planned milestone path,
* workflow-aware milestone ordering.

**Owner**

* SPS UI and ENG-000 presentation layer.

**Expected Result**

The user can inspect planned work without mixing it with active or completed state.

### Show Backlog

**Input**

* backlog source documents,
* current engine context.

**Output**

* visible candidate work list,
* non-committed future opportunities.

**Owner**

* SPS UI and ENG-000 presentation layer.

**Expected Result**

The user can inspect future candidate work separately from accepted milestone execution.

## Boundary Reminder

This contract exists to automate process coordination, state visibility, and workflow continuity.

It does not authorize SPS, ENG-000, Codex, or any automation layer to make architectural decisions outside approved workflow governance.
