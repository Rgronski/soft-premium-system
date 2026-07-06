# PCL Bootloader

## Purpose

This document defines Project Context Loader v2 as the bootloader of the Soft Premium System workflow.

PCL is a first-class element of ENG-000.

It is responsible for loading the project context before diagnosis, review, implementation, or documentation work begins.

## Why Bootloader

PCL should be treated as the workflow bootloader because it initializes the operational state required by the Chief Architect and the wider AI Development Platform.

Without PCL, the workflow risks acting on incomplete, outdated, or inconsistent project context.

## Core Responsibilities

PCL v2 should:

* load Single Source of Truth documentation,
* verify Current State,
* verify Session State,
* verify Change Log,
* verify roadmap alignment,
* verify repository readiness,
* detect inconsistencies,
* stop workflow progression when inconsistencies exist,
* prepare a workflow dashboard for Chief Architect review.

## SSOT Loading

PCL must load the documentation context required to understand:

* project origins,
* platform philosophy,
* architecture,
* current state,
* session state,
* recorded history.

At minimum, PCL should validate the required core workflow documents before any milestone work begins.

## State Verification

PCL must check:

* whether `08_CURRENT_STATE.md` matches the latest accepted milestone state,
* whether `10_SESSION_STATE.md` matches the latest session closure state,
* whether `09_CHANGELOG.md` reflects completed and committed work,
* whether roadmap and active milestone references are coherent.

## Repository Readiness

PCL must include repository readiness checks before implementation starts.

This includes checking whether:

* the repository state is readable,
* the working tree status is known,
* the documented milestone context matches the repository reality closely enough to proceed safely.

## Inconsistency Handling

If PCL detects inconsistency, it should stop the workflow.

Examples:

* Current State says one milestone is active while Session State says another.
* Change Log is missing a completed milestone already accepted and pushed.
* Repository state suggests work has moved ahead of documentation.

Workflow must not continue past PCL until the inconsistency is explained or corrected.

## Chief Architect Preparation

After successful loading and verification, PCL should prepare a structured dashboard for Chief Architect review.

That preparation should summarize:

* active and completed milestone state,
* workflow readiness,
* detected blockers,
* recommended next action,
* whether Project Integrity Check can proceed.

## Operational Rule

Every workflow starts with PCL.

PCL is not optional guidance.

It is the required boot sequence for ENG-000 and the workflow control layer built on top of SPS.
