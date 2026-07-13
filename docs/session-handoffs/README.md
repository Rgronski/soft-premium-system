# Session Handoffs

---

# Purpose

Session Handoff is the operational transfer document used by `SPS OS â€” KONIEC` to prepare the next `SPS OS â€” START`.

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

Required file naming:

```text
docs/session-handoffs/YYYY-MM-DD_<CurrentSessionID>_SESSION_HANDOFF.md
```

Example:

```text
docs/session-handoffs/2026-07-13_005_SESSION_HANDOFF.md
```

There must be exactly one current handoff for each closed session.

Historical handoffs remain in the repository, but they must never be treated as the current handoff for a different session.

The `Current Session ID` in the filename must match the `Current Session ID` inside the file.

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

# Session Package Boundary

Session Handoff may be included in the next session package.

The package generator must not rewrite handoff content.

Handoff remains factual and evidence-based.

---

# Required Fields

Session Handoff must include every field from the deterministic template.

The four session identity fields are mandatory:

* `Current Session ID`
* `Current Chat Title`
* `Next Session ID`
* `Suggested Next Chat Title`

Next Safe Step must be exactly one actionable step.

Next Chat Prompt must be ready to paste into a new chat.

Current handoff selection must not rely only on `LastWriteTime`.

The current handoff must be selected by `Current Session ID` from Session State.

Any mismatch between Session State identity and current handoff identity is a critical error.

---

# Deterministic Template

```text
SPS OS â€” SESSION HANDOFF

SPS OS Version: [VALUE OR UNKNOWN]
Date: [VALUE OR UNKNOWN]
Chief Architect: [VALUE OR UNKNOWN]
Product Owner: [VALUE OR UNKNOWN]
Session Status: [VALUE OR UNKNOWN]
Current Session ID: [VALUE OR UNKNOWN]
Current Chat Title: [VALUE OR UNKNOWN]
Next Session ID: [VALUE OR UNKNOWN]
Suggested Next Chat Title: [VALUE OR UNKNOWN]

Capability: [VALUE OR UNKNOWN]
Capability Status: [VALUE OR UNKNOWN]
Active Work Item: [VALUE OR UNKNOWN]
Completed Work Items: [VALUE OR NONE OR UNKNOWN]
Next Work Item: [VALUE OR UNKNOWN]

Repository State:
Repository Branch: [VALUE OR UNKNOWN]
Repository Working Tree State: [CLEAN OR DIRTY OR UNKNOWN]
Ahead / Behind Status: [VALUE OR UNKNOWN]
Latest Verified Commit: [VALUE OR UNKNOWN]
Push Status: [VALUE OR UNKNOWN]

Milestone State:
Current Product Milestone: [VALUE OR NONE OR UNKNOWN]
Latest Completed Milestone: [VALUE OR NONE OR UNKNOWN]

Verification:
Verification Status: [PASS OR FAIL OR PARTIAL OR BLOCKED OR UNKNOWN OR NOT APPLICABLE]
Blockers: [VALUE OR NONE OR UNKNOWN]
Open Risks: [VALUE OR NONE OR UNKNOWN]

Recommendation: [EXACTLY ONE RECOMMENDATION]
Next Safe Step: [EXACTLY ONE ACTIONABLE STEP]
Next Chat Prompt: [READY-TO-PASTE PROMPT OR UNKNOWN]
```

The handoff transfers the Suggested Next Chat Title as official SPS OS guidance only.

It does not guarantee that the ChatGPT UI title was changed.
