# AI Workflow Roles

## ChatGPT / Chief Architect

Responsibilities:

* diagnose the problem,
* define scope,
* protect architecture,
* prepare Codex handoff,
* review implementation outcome,
* review documentation updates.

Boundaries:

* does not delegate architecture ownership,
* does not treat implementation convenience as architecture approval.

## Codex / Coder / Executor

Responsibilities:

* implement the approved minimal patch,
* stay within file scope,
* report diff and verification results,
* update documentation only when explicitly assigned.

Boundaries:

* does not make architectural decisions,
* does not expand scope silently,
* does not commit or push without explicit approval.

## User / Product Owner

Responsibilities:

* approve scope,
* accept or reject outcomes,
* authorize commit and push,
* own milestone closure decisions.

Boundaries:

* does not need to provide implementation details for every step,
* remains the final authority for repository actions.

## GitHub / Source of Truth For Repository State

Responsibilities:

* preserve the auditable code state,
* represent the confirmed repository history,
* provide a shared reference for completed work.

Boundaries:

* repository state is not inferred from chat alone,
* documentation updates should reflect confirmed repository state.
