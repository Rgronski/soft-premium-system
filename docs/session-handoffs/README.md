# Session Handoffs

---

# Purpose

Session Handoff is the operational transfer document used by `SPS OS — KONIEC` to prepare the next `SPS OS — START`.

It answers only:

* What does the next chat need to know to continue safely?

Session Handoff is not:

* changelog,
* roadmap,
* session state,
* audit transcript,
* implementation report,
* brainstorming document.

---

# Naming Convention

Recommended file naming:

```text
docs/session-handoffs/YYYY-MM-DD_CAP-XXX_SESSION_HANDOFF.md
```

Example:

```text
docs/session-handoffs/2026-07-11_CAP-002_SESSION_HANDOFF.md
```

---

# Evidence Rules

Session Handoff must use only factual evidence from:

* current conversation,
* confirmed user-provided terminal output,
* committed documentation,
* explicitly provided Codex output,
* `sps-git-context.txt` if available.

If evidence is missing, use `UNKNOWN`.

---

# Required Fields

Session Handoff must include every field from the deterministic template.

Next Safe Step must be exactly one actionable step.

Next Chat Prompt must be ready to paste into a new chat.

---

# Deterministic Template

```text
SPS OS — SESSION HANDOFF

Date: [VALUE OR UNKNOWN]
Chief Architect: [VALUE OR UNKNOWN]
Product Owner: [VALUE OR UNKNOWN]
Session Status: [VALUE OR UNKNOWN]

Capability: [VALUE OR UNKNOWN]
Capability Status: [VALUE OR UNKNOWN]
Active Work Item: [VALUE OR UNKNOWN]
Completed Work Items: [VALUE OR NONE OR UNKNOWN]
Next Work Item: [VALUE OR UNKNOWN]

Repository State:
Branch: [VALUE OR UNKNOWN]
Working Tree: [CLEAN OR DIRTY OR UNKNOWN]
Ahead / Behind: [VALUE OR UNKNOWN]
Latest Commit: [VALUE OR UNKNOWN]
Push Status: [VALUE OR UNKNOWN]

Documentation State:
Updated Docs: [VALUE OR NONE OR UNKNOWN]
Known SSOT Issues: [VALUE OR NONE OR UNKNOWN]
Pending Documentation Work: [VALUE OR NONE OR UNKNOWN]

Verification:
Verified: [VALUE OR NONE OR UNKNOWN]
Partially Verified: [VALUE OR NONE OR UNKNOWN]
Not Verified: [VALUE OR NONE OR UNKNOWN]
Unknown: [VALUE OR NONE OR UNKNOWN]

Decisions: [VALUE OR NONE OR UNKNOWN]
Open Risks: [VALUE OR NONE OR UNKNOWN]
Blockers: [VALUE OR NONE OR UNKNOWN]
Parked Ideas: [VALUE OR NONE OR UNKNOWN]

Recommendation: [EXACTLY ONE RECOMMENDATION]
Next Safe Step: [EXACTLY ONE ACTIONABLE STEP]
Next Chat Prompt: [READY-TO-PASTE PROMPT OR UNKNOWN]
```
