# Project Delete / Re-import Operator Guide

## Purpose

Use this guide when a project must be detached, re-imported, or reopened after the MS-028.35 to MS-028.42a work.

The goal is to keep the safe boundary clear, avoid accidental data loss, and separate local browser cleanup from real disk deletion.

Real destructive delete of Beauty Client PRO remains postponed and requires a separate Product Owner decision.

## Safe Delete Boundary

Treat the project as four different layers:

* SPS OS project removal: local project visibility and attachment state inside SPS OS.
* Browser/localStorage cleanup: only clears the local browser entry.
* Project Brain metadata root: the SPS-owned metadata folder outside the client repo.
* Working directory / repo checkout: the local git checkout on disk.

Safe removal can stop at the first layer that solves the operator need.

Disk deletion is allowed only when the task explicitly calls for it and the Product Owner approval is already recorded.

If the request is only to hide, detach, or reset the browser state, stop before any disk deletion.

## What Can Be Removed

* Local SPS OS project attachment
* Browser/localStorage project entry
* Project Brain metadata root, only when approved
* Working directory / repo checkout, only when approved

## What Must Stay Protected

* Real Beauty Client PRO data unless a separate Product Owner decision approves deletion
* Unrelated projects
* Shared SPS OS docs and control files
* Any repo checkout that is still needed for reopen or verification

## Re-import / Re-open Flow

1. Confirm whether the project was only detached or whether disk deletion was approved.
2. If only the browser entry is missing, rerun the existing discovery or reopen flow.
3. If the project was deleted from disk, recreate or restore the repo checkout first.
4. Restore the minimum project setup needed for visibility.
5. Reopen the project in SPS OS and verify the project reappears in the project list.

## Post Re-import Checklist

* Project is visible in SPS OS
* Repo URL is correct
* Workspace path matches the expected checkout
* Project Brain metadata root is present when the project is expected to persist
* AI Workspace loads the project context
* Conductor state is present or shows the expected empty state

## Stop Conditions

Stop and do not continue if:

* the request does not clearly permit disk deletion
* the Product Owner approval is missing
* the target project name does not match
* the workspace path is ambiguous
* the repo checkout is not the expected one
* the operator is unsure whether browser cleanup or disk deletion is being requested

