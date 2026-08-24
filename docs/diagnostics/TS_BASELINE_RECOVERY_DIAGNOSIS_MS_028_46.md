# TS Baseline Recovery Diagnosis - MS-028.46

## Purpose

Record the exact `npx.cmd tsc --noEmit` blockers observed in the current repository state without fixing them.

## Command Run

* `git status --short`
* `npx.cmd tsc --noEmit`

`git status --short` was clean before the diagnosis run.

## Error Inventory

`npx.cmd tsc --noEmit` reported 17 error lines across 5 files:

* `src/app/api/projects/[id]/ai/generate/route.ts`
  * `TS2322` on the `getProjectContext` callback return type.
  * The `project-not-found` branch returns `ServerAiProjectContextResult` without the required `projectId` field expected by `AiProjectContextResult`.
* `src/app/api/projects/[id]/working-branch/setup/route.ts`
  * `TS2322` on the working-branch source type.
  * The code returns `"main" | "working-branch"` where the caller expects `"working-branch"`.
* `src/app/projects/[id]/settings/page.tsx`
  * `TS2304` for missing `ProjectSourceWorkingTreeState`.
  * `TS2345` for passing `Project | null` into helpers that require `Project`.
  * `TS18047` for using `project` when it may be `null`.
* `src/lib/ai-workspace-engine/engine.ts`
  * `TS2322` for literal label mismatches.
  * English labels `Generating...`, `Saving...`, and `Saved` do not match the Polish union types.
* `src/lib/project/server.ts`
  * `TS2304` for missing `ProjectDeleteValidationSummary`.
  * The missing symbol appears in multiple delete-validation helper signatures.

## Error Categories

* AI Workspace and API contract shape mismatch
* Repo/context branch setup type mismatch
* Project Settings nullability and missing type import
* AI Workspace presentation label literal mismatch
* Project Brain / delete validation type symbol missing

## Impact on Next Work

* `src/app/api/projects/[id]/ai/generate/route.ts` blocks AI Workspace generation from compiling cleanly.
* `src/app/api/projects/[id]/working-branch/setup/route.ts` blocks repo/context branch setup flows.
* `src/app/projects/[id]/settings/page.tsx` blocks Project Settings, delete/re-import, and live-trial UI compilation.
* `src/lib/ai-workspace-engine/engine.ts` blocks AI Workspace presentation logic from compiling cleanly.
* `src/lib/project/server.ts` blocks delete-validation and Project Brain boundary logic.

## Minimal First Fix Candidate

Restore the `ProjectDeleteValidationSummary` type symbol in `src/lib/project/server.ts`.

That is the smallest first candidate because one missing type symbol accounts for four compile errors and it sits in the project-delete / repo-context boundary that the settings page depends on.

## Out of Scope

* No code fixes in this milestone.
* No TypeScript config changes.
* No UI behavior changes.
* No API behavior changes.
* No Project Brain storage changes.
* No broad refactor.

## Recommendation

Approve a follow-up implementation milestone that starts with the `src/lib/project/server.ts` type-symbol repair, then re-run `npx.cmd tsc --noEmit` once after that change to see the remaining baseline.
