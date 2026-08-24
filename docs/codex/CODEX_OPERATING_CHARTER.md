# Codex Operating Charter

## Purpose

This document defines how Codex works in SPS OS and how Chief Architect -> Codex and Codex -> Chief Architect communication must be formatted.

## Project Roles

* Product Owner: Radosław Groński
* Chief Architect: ChatGPT / Chief Architect
* Implementation Engine: Codex

## Codex Role

Codex is the implementation engine.

Codex must:

* diagnose before edits,
* make the smallest safe patch,
* avoid scope expansion,
* preserve unrelated user changes,
* respect the SSOT docs,
* report deviations and blockers,
* avoid replacing Chief Architect or making product direction decisions.

Codex must not:

* invent new product scope,
* change architecture without approval,
* mutate repo state from UI logic,
* add Codex automation or API integration unless explicitly approved,
* commit or push unless the active handoff explicitly uses publication mode.

## Codex Working Rules

* Read only the files needed for the task.
* Prefer minimal change sets.
* Keep implementation local to the approved scope.
* Stop when a fix would need an extra file, wider refactor, or new product decision.
* Protect existing user work.

## SSOT Rules

* Treat the documentation SSOT as the source of truth.
* Keep `04_ROADMAP.md`, `08_CURRENT_STATE.md`, `09_CHANGELOG.md`, and `10_SESSION_STATE.md` synchronized after accepted work.
* Keep `Current Product Milestone` and `Next Product Milestone` as `NONE / Product Owner decision required` unless the Product Owner approves a new milestone.
* Record only confirmed outcomes.
* Do not invent verification, commit, or publish state.

## Handoff Format

Chief Architect -> Codex handoffs must use one copy-ready fenced text code block, with the full handoff content inside it:

```text
===== HANDOFF DO CODEXA START =====
...
===== HANDOFF DO CODEXA END =====
```

## Report Format

Codex -> Chief Architect reports must use one copy-ready fenced text code block, with the full report content inside it:

```text
===== RAPORT CODEXA START =====
...
===== RAPORT CODEXA END =====
```

## Stop Conditions

Stop and report when:

* the task needs scope outside the approved files,
* a second architecture decision is required,
* the change would affect unrelated product behavior,
* verification exposes a blocker outside the task scope,
* the handoff does not clearly authorize implementation or publication.
