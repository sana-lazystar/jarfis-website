---
title: "Architecture & Concepts"
description: "Understand JARFIS core architecture: 9 specialized agents, 8+ structured phases, 11 artifacts, and the PreCompact state system."
category: "concepts"
order: 1
locale: "en"
lastUpdated: 2026-03-05
draft: false
---

# Architecture & Concepts

How JARFIS orchestrates 9 expert AI agents to ship production software.

## The Orchestration Model

JARFIS is built around **Claude Code as the orchestrator**. Unlike single-agent systems, JARFIS coordinates 9 specialized agents — each with a distinct role — through a structured phase pipeline:

```
/jarfis command
      │
      ▼
┌─────────────────────────────────────────────────────┐
│              JARFIS Orchestrator                    │
│  (Phase coordination, artifact routing, state mgmt) │
└─────────────────────────────────────────────────────┘
      │
      ├──► PO Agent         (requirements, user stories)
      ├──► Architect        (system design, ADRs)
      ├──► Tech Lead        (standards, review, coordination)
      ├──► UX Designer      (wireframes, UX spec)
      ├──► BE Engineer      (backend implementation)
      ├──► FE Engineer      (frontend implementation)
      ├──► DevOps/SRE       (infrastructure, CI/CD)
      ├──► QA Engineer      (testing, quality gates)
      └──► Security Engineer (security review, CVE analysis)
```

## The 9 Agent Roles

| Agent | Primary Responsibilities | Key Artifacts |
|-------|--------------------------|---------------|
| **Product Owner (PO)** | Requirements definition, user story writing, backlog prioritization | `press-release.md`, `prd.md` |
| **Architect** | System design, tech decisions, ADR documentation | `architecture.md`, `impact-analysis.md` |
| **Tech Lead** | Code standards, PR review criteria, cross-agent coordination | `tasks.md`, `review.md` |
| **UX Designer** | User flows, wireframes, component specifications | `ux-spec.md` |
| **BE Engineer** | API implementation, data models, backend services | `api-spec.md`, backend code |
| **FE Engineer** | UI components, state management, frontend integration | Frontend code, component library |
| **DevOps/SRE** | Infrastructure as code, CI/CD pipelines, deployment | `deployment-plan.md` |
| **QA Engineer** | Test strategy, test case authoring, quality gates | `test-strategy.md` |
| **Security Engineer** | Threat modeling, vulnerability review, compliance | Security review in `review.md` |

## Phase Pipeline (8+ Phases)

JARFIS structures every feature delivery through defined phases. Each phase has specific agents, inputs, and required outputs:

### Phase T — Kickoff
**Purpose**: Establish the feature scope and gather requirements.
**Agents**: PO, Architect
**Outputs**: Initial `press-release.md`, rough `prd.md`

### Phase 0 — Foundation
**Purpose**: Technology and architecture decisions.
**Agents**: Architect, Tech Lead
**Outputs**: `impact-analysis.md`, initial `architecture.md`

### Phase 1 — Design
**Purpose**: UX specification and API contract definition.
**Agents**: UX Designer, Architect, BE Engineer
**Outputs**: `ux-spec.md`, `api-spec.md` skeleton

### Phase 2 — Architecture
**Purpose**: Full system design, data models, service boundaries.
**Agents**: Architect, BE Engineer, FE Engineer
**Outputs**: Final `architecture.md`, `api-spec.md`

### Phase 3 — Implementation
**Purpose**: Parallel backend and frontend development.
**Agents**: BE Engineer, FE Engineer (parallel execution)
**Outputs**: Source code, `tasks.md` progress updates

### Phase 4 — Integration
**Purpose**: API wiring, end-to-end integration.
**Agents**: BE Engineer, FE Engineer, Tech Lead
**Outputs**: Integrated code, integration `review.md`

### Phase 4.5 — QA & Security
**Purpose**: Testing execution, security audit.
**Agents**: QA Engineer, Security Engineer
**Outputs**: `test-strategy.md`, security findings in `review.md`

### Phase 5 — Deployment
**Purpose**: Production deployment, monitoring setup.
**Agents**: DevOps/SRE, Tech Lead
**Outputs**: `deployment-plan.md`, infrastructure code

### Phase 6 — Retrospective
**Purpose**: Capture learnings, improve future iterations.
**Agents**: All agents contribute
**Outputs**: `retrospective.md`, updates to `jarfis-learnings.md`

## The 11 Artifacts

Every JARFIS workflow produces up to 11 structured artifacts, stored in `.jarfis/works/{date}/{feature}/`:

| Artifact | Purpose | Typical Author |
|----------|---------|----------------|
| `press-release.md` | Feature announcement in customer language | PO |
| `prd.md` | Product requirements document | PO |
| `impact-analysis.md` | Technical risk and scope analysis | Architect |
| `architecture.md` | System design, component diagram, ADRs | Architect |
| `api-spec.md` | API contracts (endpoints, types, auth) | Architect / BE |
| `tasks.md` | Development task breakdown with phases | Tech Lead |
| `test-strategy.md` | Test plan, coverage targets, test cases | QA Engineer |
| `ux-spec.md` | Wireframes, component specs, interaction design | UX Designer |
| `deployment-plan.md` | Release plan, rollback strategy, monitoring | DevOps/SRE |
| `review.md` | Post-implementation code & security review | Tech Lead / Security |
| `retrospective.md` | Phase learnings and improvement actions | All agents |

## State Management: `.jarfis-state.json`

JARFIS maintains workflow state in `.jarfis-state.json` at your project root:

```json
{
  "feature": "auth-system",
  "currentPhase": "4",
  "completedPhases": ["T", "0", "1", "2", "3"],
  "agentContext": {
    "po": "prd-approved",
    "architect": "architecture-finalized",
    "be": "api-implemented",
    "fe": "components-built"
  },
  "artifactsGenerated": [
    "prd.md", "architecture.md", "api-spec.md", "tasks.md", "ux-spec.md"
  ]
}
```

This file is read by the **PreCompact hook** on every Claude Code session start, restoring the exact phase and context — so you can pause and resume work across multiple sessions without losing state.

## PreCompact Hook

The PreCompact hook is a Claude Code lifecycle integration that runs before context compaction:

1. **Reads** `.jarfis-state.json` for current phase and agent states
2. **Injects** relevant artifact summaries into the compacted context
3. **Preserves** critical decisions and learnings from `jarfis-learnings.md`
4. **Restores** the active agent perspectives for the current phase

This ensures that even in long-running features spanning many sessions, no critical context is lost.

## Learning System

JARFIS continuously improves through two learning mechanisms:

### `jarfis-learnings.md`
A project-level knowledge base updated after each Phase 6 retrospective. Contains:
- Recurring patterns that work well in this codebase
- Anti-patterns to avoid
- Team preferences and conventions

### `context.md`
Project-specific context injected into every agent prompt:
- Tech stack specifics
- Existing conventions
- Business domain knowledge
- Integration constraints

## Meeting System (`/jarfis:meeting`)

When agents need to synchronize — resolve a blocker, make a joint decision, or align on scope — you can convene a structured meeting:

```
/jarfis:meeting
```

The meeting system:
- Identifies which agents are relevant to the current blocker
- Structures a facilitated discussion between agent perspectives
- Documents decisions in `review.md` or the relevant artifact
- Updates `.jarfis-state.json` with resolved items

## Design Principles

1. **Specialization** — Each agent has deep expertise in one domain; no agent tries to do everything
2. **Artifact-driven** — Every phase produces reviewable, human-readable outputs
3. **Phase gates** — No phase begins without the previous phase's artifacts being available
4. **Stateful** — Work survives session boundaries via `.jarfis-state.json`
5. **Learning** — Every project makes the next one faster via the learning system
6. **Claude Code native** — No external services; runs entirely within your development environment

## Next Steps

- [Quick Start](/en/docs/getting-started) — Run your first `/jarfis` workflow
- [Guides & Customization](/en/docs/guides-customization) — Advanced configuration patterns
- [API Reference](/en/docs/api-reference) — All commands and options
