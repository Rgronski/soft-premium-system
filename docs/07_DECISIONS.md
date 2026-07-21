# 07_DECISIONS

---

# Document Information

**Document**
07_DECISIONS.md

**Purpose**
Maintain the Architecture Decision Records (ADR) for Soft Premium System.

**Owner**
Chief Architect

**Status**
Draft

**Version**
1.0

**Source of Truth**
Yes

**Depends On**
00_PROJECT_BIBLE.md
01_VISION.md
02_ARCHITECTURE.md

**Referenced By**
All project documentation

---

# Purpose

This document records significant architectural decisions made during the development of Soft Premium System.

Each decision captures its context, the chosen solution, and its long-term consequences.

---

# ADR Standard

Every Architecture Decision Record follows the same structure.

```text
ADR-XXXX

Status

Context

Decision

Consequences
```

Status values:

* Proposed
* Accepted
* Superseded
* Deprecated

---

# ADR-001

## Status

Accepted

## Context

Soft Premium System has evolved beyond a single domain origin and now needs an explicit architectural identity that can guide future milestones, AI interpretation, and product scope decisions.

The project must clearly distinguish between the platform core and domain-specific implementations.

## Decision

Soft Premium System is defined as a domain-independent platform for designing, building, and evolving modern business applications.

Beauty Client Pro is recognized as the historical origin context, but not as the architectural definition of the platform.

Platform core must remain domain-independent, while industry-specific behaviour should be implemented through configuration, extensions, or application modules.

Project Context Loader (PCL) becomes the official first stage of the workflow.

## Consequences

Future milestones must preserve platform identity and avoid binding platform architecture to a single industry.

Documentation, AI interpretation, and architecture decisions must treat domain implementations as consumers or extensions of the platform rather than as the platform itself.

Project Context Loader must be executed before Project Integrity Check, diagnosis, and implementation planning.

This decision affects future milestones by requiring platform-level thinking before domain-level specialization.

---

# ADR-0001

## Status

Accepted

## Context

Soft Premium System requires a consistent way to organize and preserve project knowledge independently of implementation technologies.

## Decision

Project knowledge is organized around a Canonical Project Model.

## Consequences

All architectural decisions must remain consistent with the Canonical Project Model.

---

# ADR-0002

## Status

Accepted

## Context

Project knowledge must remain consistent across documentation, AI, user interfaces, and future integrations.

## Decision

Project Brain is the Single Source of Truth for all project knowledge.

## Consequences

Knowledge is maintained in one authoritative location.

All representations reference Project Brain instead of maintaining independent copies.

---

# ADR-0003

## Status

Accepted

## Context

Documentation, user interfaces, exports, and AI interactions present the same project knowledge in different forms.

## Decision

Documents, interfaces, and generated artifacts are representations of project knowledge.

## Consequences

Representations do not own project knowledge.

Changes are made through Project Brain.

---

# ADR-0004

## Status

Accepted

## Context

Soft Premium System must remain independent of implementation technologies.

## Decision

Architecture is defined independently from frameworks, programming languages, storage technologies, and implementation details.

## Consequences

Technology may evolve without changing the architectural model.

---

# ADR-0005

## Status

Accepted

## Context

`MS-001.24 - Server-Readable Read-Only Project Context Foundation` requires one canonical Project identity source that can be read through Project Brain from both browser runtime and server runtime.

The current Project identity source exists only in browser `localStorage`.

The server-side AI route therefore terminates with `project-not-found` before the provider boundary.

Product Owner rejected persistent local filesystem storage as the architectural basis for this milestone.

JSON file repository and local SQLite were rejected as canonical sources.

The canonical repository must remain provider-neutral at the decision level and the concrete managed PostgreSQL provider must be selected separately before implementation.

## Decision

Use a managed serverless PostgreSQL-backed canonical Project Repository for Project identity.

Related Milestone: `MS-001.24 - Server-Readable Read-Only Project Context Foundation`

Decision Owner: `Chief Architect`

Approval Owner: `Product Owner`

Product Owner Decision: `GO`

Canonical source:

`projects`

* `id`
* `name`
* `created_at`

Repository contract:

* create project identity
* list projects
* get project by ID

Runtime paths:

* browser write
  * browser
  * controlled application/API boundary
  * server-side Project Repository
  * canonical PostgreSQL source
* browser read
  * browser
  * controlled application/API boundary
  * repository-backed Project functions
* server read
  * server
  * repository-backed Project functions
  * canonical PostgreSQL source
* AI context
  * AI consumer
  * `getAiProjectContext(projectId)`
  * Project Brain
  * repository-backed Project functions

Project Brain remains the only AI context consumption boundary.

`localStorage` is not a canonical source and must never be a silent server-side fallback.

It may remain only as:

* cache
* mirror
* explicit one-time import
* temporary compatibility during transition

The concrete managed PostgreSQL provider is intentionally not selected by this ADR and requires a separate provider-selection decision before implementation.

Failure behavior must distinguish:

* `project-not-found`
* unavailable canonical source

without silent fallback to hardcoded data or browser `localStorage`.

## Consequences

Positive:

* browser and server can converge on one canonical source
* `MS-001.23` can resume completion work after `MS-001.24` is completed
* Project Brain remains the mandatory AI context boundary
* the architecture remains compatible with serverless runtime

Negative:

* implementation will require a managed PostgreSQL provider decision
* server-only environment variables will be required
* project creation write flow must change minimally
* a new dependency and schema migration will be required

Risks:

* scope creep into full persistence redesign
* vendor lock-in
* too-early migration of other domains
* two sources of truth during transition

Mitigations:

* keep schema limited to Project identity
* keep provider-specific details behind the repository adapter
* keep SQL portable
* keep other domains out of scope
* keep `localStorage` out of canonical ownership

Rejected alternatives:

* browser `localStorage` as canonical source
* JSON file repository
* local SQLite
* KV/document store as the selected mechanism for this milestone
* hardcoded fixture
* passing project data in request body
* direct Project Brain bypass

Out of scope:

* concrete managed PostgreSQL provider selection
* external account configuration
* repository implementation
* migrations
* endpoints
* auth
* multi-user
* full persistence redesign
* other domains

Verification boundary:

* provider selection must be decided separately before implementation
* repository tests must run without real network
* browser/server Project read tests must preserve Project Brain boundary
* no-secret preflight for an existing project must return HTTP `503` with `provider-unavailable`

Rollback:

* provider-specific wiring may be reverted
* repository contract should remain provider-independent
* rollback must not restore `localStorage` as canonical source without a new architecture decision

---

# Decision Principles

Architecture decisions should:

* solve a real problem,
* support the project vision,
* preserve architectural consistency,
* remain understandable in the future,
* minimize unnecessary complexity.

---

# Decision Lifecycle

Architecture decisions follow this lifecycle.

```text
Idea
    ↓
Architecture Review
    ↓
ADR
    ↓
Implementation
    ↓
Documentation
```

---

# Out of Scope

This document does not contain:

* implementation details,
* project status,
* roadmap planning,
* sprint management,
* backlog prioritization.

---

# Related Documents

| Document                   | Source of Truth        |
| -------------------------- | ---------------------- |
| 00_PROJECT_BIBLE.md        | Project philosophy     |
| 01_VISION.md               | Product vision         |
| 02_ARCHITECTURE.md         | Architectural model    |
| 03_DEVELOPMENT_STANDARD.md | Development workflow   |
| 06_BACKLOG.md              | Candidate future work  |
| 08_CURRENT_STATE.md        | Current project status |
| AI_CONTEXT.md              | AI operating model     |
