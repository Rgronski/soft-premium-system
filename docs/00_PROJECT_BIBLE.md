# 00_PROJECT_BIBLE

---

# Document Information

**Document**
00_PROJECT_BIBLE.md

**Purpose**
Define the immutable foundations of the Soft Premium System project.

**Owner**
Chief Architect

**Status**
Draft

**Version**
1.1

**Source of Truth**
Yes

**Depends On**
None

**Referenced By**
All project documentation.

---

# Purpose

This document defines the fundamental principles of Soft Premium System.

It establishes the philosophy, values, and decision framework that guide every product, architectural, documentation, and development decision.

The Project Bible is the highest-level document in the documentation hierarchy.

All other documents must remain consistent with this document.

---

# Project Context Loader (PCL)

Every new project session begins with the Project Context Loader.

Load order:

0. `00_ORIGINS.md`
1. `00_PROJECT_BIBLE.md`
2. `01_VISION.md`
3. `02_ARCHITECTURE.md`
4. Development Standards
5. Current State
6. Session State
7. Change Log

Project Context Loader establishes the minimum context that humans and AI must load before Project Integrity Check and any active work.

---

# Mission

Soft Premium System exists to simplify and standardize the design, development, and maintenance of small, high-quality applications.

It provides a structured way to organize project knowledge, make decisions, manage development, and preserve consistency over time.

The goal is not to create impressive software.

The goal is to create useful, maintainable, and understandable software through a repeatable working system.

---

# Core Concept

Soft Premium System is built around the Project Brain.

Project Brain is the Single Source of Truth for the project.

Everything else is a view, export, interface, or operational layer around that knowledge.

---

# Vision Summary

Soft Premium System is designed as a long-term working system for building and maintaining applications with clarity, simplicity, and standards.

The detailed product vision is defined in:

> See **01_VISION.md**

---

# Core Values

## Simplicity

Prefer the simplest solution that correctly solves the problem.

Avoid unnecessary complexity.

---

## Consistency

The system should guide projects toward consistent structure, decisions, documentation, and development practices.

Predictability is more valuable than novelty.

---

## Maintainability

Every project created or reviewed through SPS should remain understandable and maintainable in the future.

A good solution must be possible to explain one year later.

---

## Quality

Quality is not decoration.

Quality comes from clear decisions, simple architecture, consistent standards, useful documentation, and disciplined execution.

---

## Practicality

SPS exists to support real work.

It should help create small, fast, useful applications without unnecessary overhead.

---

# Product Principles

## Build a Working System

Soft Premium System is a system for creating and maintaining applications.

It is not a demo.

It is not a collection of unrelated tools.

It is not a showcase of technology.

---

## Standards Over Improvisation

Projects should be guided by clear standards instead of repeated ad hoc decisions.

Standards reduce friction, improve consistency, and make future work easier.

---

## Process Supports Product

Workflow, documentation, architecture, and AI collaboration exist to improve the final product.

Process must never become bureaucracy.

---

## Small Applications, High Standards

SPS is optimized for small and fast applications.

Small scope does not justify poor architecture, unclear documentation, or inconsistent decisions.

---

# Engineering Principles

## Diagnose Before Implementation

Understand the problem before proposing a solution.

Implementation begins only after diagnosis and scope approval.

---

## Minimal Patch

Implement the smallest change that completely solves the problem.

Avoid unrelated modifications.

---

## Small Changes

Prefer small commits and focused changes.

Small changes reduce risk and simplify review.

---

## No Premature Complexity

Do not build for hypothetical future requirements.

Implement only what the project currently needs.

---

# Documentation Principles

## Documentation is Part of the Product

Documentation is maintained with the same care as source code.

---

## Source of Truth

Every piece of information has exactly one owner.

Information must never be duplicated across documents.

Documents reference the owner instead of copying content.

The SPS Operating Workflow is part of the project Source of Truth.

Current workflow version: 1.0.

Status: Stable.

Workflow changes require architectural justification and Product Owner approval.

---

## Project Brain as Source of Truth

Project Brain is the Single Source of Truth for project knowledge.

User interfaces expose and operate on that knowledge.

---

## Clear Responsibility

Each document answers one primary question.

Responsibilities between documents must not overlap.

---

## Documentation First

Architectural decisions should be documented before they become distributed across implementation.

Documentation guides development.

Development validates documentation.

---

# Decision Framework

Every significant decision should answer the following questions:

1. Does it solve a real problem?
2. Does it align with the purpose of SPS?
3. Is it simpler than the alternatives?
4. Does it preserve consistency and maintainability?
5. Can it be postponed?

If the answer to the last question is "Yes", the idea should be evaluated for inclusion in the backlog instead of immediate implementation.

---

# Definition of Quality

A solution is considered high quality when it is:

* useful,
* simple,
* understandable,
* maintainable,
* consistent,
* testable,
* properly documented.

Quality is measured by long-term clarity and maintainability, not by technical sophistication.

---

# Related Documents

| Document                   | Source of Truth                                   |
| -------------------------- | ------------------------------------------------- |
| 00_ORIGINS.md              | Project origins and philosophical context         |
| 01_VISION.md               | Product vision                                    |
| 02_ARCHITECTURE.md         | Knowledge, information, and software architecture |
| 03_DEVELOPMENT_STANDARD.md | Development workflow                              |
| 04_UI_STANDARD.md          | UI and UX standards                               |
| 04_ROADMAP.md              | Milestone roadmap and milestone order SSOT        |
| 05_ROADMAP.md              | Strategic product direction, not milestone order  |
| 06_BACKLOG.md              | Candidate future work                             |
| 07_DECISIONS.md            | Architecture Decision Records                     |
| 08_CURRENT_STATE.md        | Current project status                            |
| 09_CHANGELOG.md            | Project history                                   |
| AI_CONTEXT.md              | AI operating manual and SPS Commands              |
