# 02_ARCHITECTURE

---

# Document Information

**Document**
02_ARCHITECTURE.md

**Purpose**
Define the architectural organization of Soft Premium System.

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

**Referenced By**
03_DEVELOPMENT_STANDARD.md
04_UI_STANDARD.md
05_ROADMAP.md
07_DECISIONS.md
AI_CONTEXT.md

---

# Terminology

## Canonical Project Model

The canonical representation of all project knowledge.

It defines the structure of project information independently of any implementation or technology.

---

## Project Brain

The operational implementation of the Canonical Project Model.

Project Brain is the Single Source of Truth for all project knowledge.

All project information is created, modified, and maintained through Project Brain.

---

## Representation

A representation is any form in which project knowledge is presented.

Examples include documentation, user interfaces, reports, exports, and AI interactions.

Representations are consumers of project knowledge.

They do not own project knowledge.

---

## Consumer

A consumer is any system, interface, or service that reads or uses project knowledge.

Consumers never become the owner of that knowledge.

---

## Layer

A logical architectural boundary with a clearly defined responsibility.

Layers communicate through defined responsibilities rather than shared ownership.

---

## Source of Truth

Every piece of project knowledge has exactly one authoritative owner.

All other locations reference that owner instead of duplicating information.

---

# Purpose

This document defines how Soft Premium System is architecturally organized.

It describes the architectural model independently of implementation details, programming languages, frameworks, or storage technologies.

---

# Architectural Principles

The architecture of Soft Premium System follows these principles:

* Project Brain is the Single Source of Truth.
* Architecture is independent of implementation technology.
* Knowledge is defined before implementation.
* Documents are representations of knowledge.
* Every architectural element has a single responsibility.
* Clear boundaries are preferred over implicit dependencies.
* The architecture should evolve without changing its fundamental model.

---

## Domain Independence

Platform core must remain domain-independent.

Industry-specific behaviour should be achieved through configuration, extensions or application modules rather than modifications of the platform core.

---

# Knowledge Architecture

The Canonical Project Model organizes project knowledge into the following domains:

```text
Project
├── Identity
├── Vision
├── Architecture
├── Decisions
├── Roadmap
├── Backlog
├── Sprint
├── Tasks
├── Sessions
├── Developer Journal
├── AI Context
├── Releases
└── Templates
```

Each domain represents a distinct area of project knowledge.

Relationships between domains are maintained through Project Brain.

---

# Information Architecture

Information Architecture defines how users navigate and interact with project knowledge.

```text
Home
│
├── Continue
├── Recent Projects
└── Create Project

↓

Project Workspace

├── Overview
├── Project Brain
├── Sprint
├── Backlog
├── AI Workspace
├── Files
├── Releases
└── Settings
```

Information Architecture describes organization and navigation.

It does not define user interface implementation.

---

# Software Architecture

Soft Premium System is organized into logical architectural layers.

```text
Presentation Layer
        │
Application Layer
        │
Project Brain
        │
Storage Layer
        │
Integration Layer
```

Each layer has a clearly defined responsibility.

Implementation technologies may change without affecting the architectural model.

---

# Architectural Boundaries

## Project Brain

Responsible for:

* project knowledge,
* relationships,
* architectural context,
* decisions,
* consistency.

Not responsible for:

* user interface,
* routing,
* presentation,
* external integrations,
* document rendering.

---

## Presentation Layer

Responsible for:

* displaying information,
* user interaction,
* navigation.

Not responsible for:

* owning project knowledge,
* business rules,
* architectural decisions.

---

## Storage Layer

Responsible for:

* persistence,
* retrieval,
* versioned storage.

Not responsible for:

* business logic,
* user interaction,
* project structure.

---

## Integration Layer

Responsible for communication with external systems.

External integrations must never become the authoritative owner of project knowledge.

---

## Workspace

Workspace is the project-facing application boundary.

Responsible for:

* composing project workspace routes and screens,
* navigation inside the project workspace,
* presentation orchestration,
* local non-canonical UI state,
* coordinating consumers and application modules.

Not responsible for:

* canonical project truth,
* persistence authority,
* Project Brain ownership,
* redefining canonical project knowledge.

---

## Salon Modules

Salon Modules are application and reference-domain modules inside the workspace boundary.

Responsible for:

* feature-local workspace logic,
* bounded UI interaction flows,
* projecting authoritative data for display,
* isolated experiments that do not change canonical ownership.

Not responsible for:

* canonical project knowledge,
* persistence authority,
* Project Brain rules,
* cross-workspace routing policy,
* source-of-truth decisions.

---

# Boundary Rules

The following overlaps are forbidden:

* Salon Modules must not own canonical project truth.
* Workspace must not silently duplicate Project Brain ownership.
* Project Brain must not absorb presentation or local interaction state.
* No module may change a canonical contract without an explicit SSOT update.

Open questions:

* Should Salon Modules stay a workspace-only convention or gain a named SSOT contract?
* Should `/workspace` and `/projects/[id]` share one navigation shell contract or remain separate?
* Which Salon Modules are read-only projections and which are workspace writes?

Future implementation gates:

* document the route ownership split before any code moves,
* require an SSOT update before adding a Salon Module that writes project knowledge,
* keep `Current Product Milestone` at `NONE` until a Product Owner-approved milestone contract exists.

---

## Route Boundary

### `/workspace`

`/workspace` is the workspace entry and coordination route.

Responsible for:

* workspace-level navigation,
* shared workspace shell behavior,
* non-canonical orchestration across workspace modules,
* entry points to workspace-scoped application modules.

Not responsible for:

* canonical project truth,
* project-specific route ownership,
* Project Brain ownership,
* persistence authority.

### `/projects/[id]`

`/projects/[id]` is the project-scoped route.

Responsible for:

* project-specific presentation,
* project-specific interaction flows,
* rendering Project Brain-derived state for one project,
* route-local orchestration that stays inside the project boundary.

Not responsible for:

* canonical project truth,
* cross-project navigation policy,
* workspace shell ownership,
* persistence authority.

### Project Brain Across Both Routes

Project Brain remains the canonical owner across `/workspace` and `/projects/[id]`.

It is responsible for:

* canonical project truth,
* relationships,
* architectural context,
* decisions,
* consistency.

It is not responsible for:

* route ownership,
* presentation,
* navigation,
* local UI state,
* shell behavior.

### Forbidden Overlaps

The following overlaps are forbidden:

* `/workspace` must not become the owner of canonical project truth.
* `/projects/[id]` must not duplicate Project Brain ownership.
* Either route must not change canonical contracts without an SSOT update.
* Workspace shell behavior must not silently absorb project ownership.

### Open Questions

* Should `/workspace` and `/projects/[id]` share a common shell contract or remain separate route contracts?
* Which route owns the navigation handoff between workspace entry and project entry?
* Which route is allowed to host shared Salon Modules without duplicating ownership?

### Future Implementation Gates

* document route ownership before moving any route code,
* require an SSOT update before introducing shared route shell state,
* require explicit approval before any route starts writing project knowledge,
* keep `Current Product Milestone` at `NONE` until a Product Owner-approved milestone exists.

---

# Cross-Cutting Principles

The following principles apply across the entire architecture:

* Single Source of Truth
* Separation of Responsibilities
* Consistency
* Traceability
* Minimal Coupling
* Documentation First
* Knowledge Before Implementation

---

# Evolution Principles

The architecture of Soft Premium System is designed to evolve.

The following elements may change:

* implementation technologies,
* storage mechanisms,
* user interfaces,
* integrations,
* document formats.

The following elements should remain stable:

* Canonical Project Model,
* Project Brain,
* architectural responsibilities,
* Source of Truth,
* architectural principles.

---

# Related Documents

| Document                   | Source of Truth               |
| -------------------------- | ----------------------------- |
| 00_PROJECT_BIBLE.md        | Project philosophy            |
| 01_VISION.md               | Product vision                |
| 03_DEVELOPMENT_STANDARD.md | Development workflow          |
| 04_UI_STANDARD.md          | UI standards                  |
| 05_ROADMAP.md              | Product evolution             |
| 07_DECISIONS.md            | Architecture Decision Records |
| AI_CONTEXT.md              | AI operating model            |
