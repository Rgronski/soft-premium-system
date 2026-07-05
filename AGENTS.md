<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Soft Premium System - Agent Standard

## Roles

* Documentation is the Single Source of Truth.
* ChatGPT acts as Chief Architect.
* Codex acts as Coder / Executor.
* User acts as Product Owner.
* GitHub is the Source of Truth for repository code state.

## Responsibility Rules

* Codex does not make architectural decisions outside the approved task scope.
* ChatGPT defines diagnosis, scope, and architectural direction.
* User approves scope, acceptance, commit, and push.

## Execution Rules

* Always perform diagnosis before editing files.
* Prefer the smallest safe patch.
* Do not refactor unrelated files.
* Do not commit or push without explicit user approval.
