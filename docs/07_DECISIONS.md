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
