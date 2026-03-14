---
title: "Architecture & Concepts"
description: "Understand JARFIS core architecture: orchestration model, 9 agents, 9-phase pipeline, 3 human gates, state management, and the learning system."
category: "concepts"
order: 1
locale: "en"
lastUpdated: 2026-03-05
draft: false
---

# Architecture & Concepts

How JARFIS orchestrates 9 expert AI agents through a structured phase pipeline to ship production software.

## The Orchestration Model

JARFIS runs natively inside **Claude Code** as a slash command workflow. It is not a separate CLI tool or external service — it leverages Claude Code's environment to coordinate 9 specialized agents through a phased pipeline:

```
/jarfis:work [description]
      |
      v
+---------------------------------------------------+
|              JARFIS Orchestrator                   |
|  (Phase pipeline, gate control, state management) |
+---------------------------------------------------+
      |
      |--- Phase T: Triage (classify request)
      |--- Phase 0: Pre-flight (git sync, load learnings)
      |--- Phase 1: Discovery (PO + Architect)
      |       +-- Gate 1: User approval
      |--- Phase 2: Architecture & Planning
      |--- Phase 3: UX Design (conditional)
      |       +-- Gate 2: User approval
      |--- Phase 4: Implementation (parallel BE/FE/DevOps)
      |--- Phase 4.5: Operational Readiness
      |--- Phase 5: Review & QA (parallel reviews)
      |       +-- Gate 3: User approval
      +--- Phase 6: Retrospective
```

## The 9 Agent Roles

Each agent has a clearly defined responsibility boundary. Agents are activated only when their role is needed — controlled by the `required_roles` field in `.jarfis-state.json`:

| Agent | Primary Responsibilities |
|-------|--------------------------|
| **Product Owner (PO)** | Conducts reverse-questions to clarify requirements, writes Working Backwards press release, authors PRD |
| **Architect** | Evaluates feasibility, performs impact analysis, designs system architecture, writes ADRs |
| **Tech Lead** | Reviews API specifications, breaks down tasks, conducts code reviews, leads retrospective |
| **UX Designer** | Designs screens and interactions (activated only when `required_roles.ux` is true) |
| **Backend Engineer** | Implements backend services, APIs, data models |
| **Frontend Engineer** | Implements UI components, frontend logic, integration |
| **DevOps/SRE** | Sets up infrastructure, CI/CD pipelines, deployment configuration |
| **QA Engineer** | Defines test strategy, executes QA verification |
| **Security Engineer** | Performs pre-review security analysis and security review |

## The 9-Phase Pipeline

JARFIS structures every workflow through 9 defined phases. Each phase has specific inputs, outputs, and responsible agents. Phases can be conditionally skipped based on project needs.

### Phase T — Triage
Classifies the incoming request into A/B/C types to determine the appropriate workflow depth and which agents are needed.

### Phase 0 — Pre-flight
Synchronizes Git state, creates a working branch, and loads learning files (`jarfis-learnings.md`, `context.md`, `project-profile.md`).

### Phase 1 — Discovery
The PO conducts reverse-questions to fully understand requirements, then writes a Working Backwards document and PRD. The Architect evaluates feasibility. **Gate 1** follows — user must approve, revise, or abort.

### Phase 2 — Architecture & Planning
The Architect performs impact analysis and system design. If `api_spec_required` is true, API specifications are written. The Tech Lead breaks down tasks. The QA Engineer defines the test strategy.

### Phase 3 — UX Design (Conditional)
Activated only when the project requires UI work (`required_roles.ux` is true). The UX Designer creates screen designs and interaction specifications. **Gate 2** follows after Phases 2 and 3.

### Phase 4 — Implementation
Backend, Frontend, and DevOps engineers work in parallel, implementing only the parts relevant to their role. Progress is tracked through `tasks.md`.

### Phase 4.5 — Operational Readiness
Deployment strategy, rollback plan, and operational readiness are prepared before the review phase.

### Phase 5 — Review & QA
API contract verification runs first, followed by parallel reviews from the Tech Lead, QA Engineer, and Security Engineer. **Gate 3** follows — user can approve, request revisions with re-review, abort, or trigger a design revisit for pathological patterns.

### Phase 6 — Retrospective
Learnings are accumulated into the global `jarfis-learnings.md` and project-specific `context.md`, improving future workflows.

## The 3 Human Gates

Gates are mandatory approval checkpoints where the user controls the workflow direction:

| Gate | Position | Options |
|------|----------|---------|
| **Gate 1** | After Phase 1 | Approve / Revise / Abort |
| **Gate 2** | After Phases 2 & 3 | Approve / Revise / Abort |
| **Gate 3** | After Phase 5 | Approve / Revise & re-review / Abort / Revisit design (pathological pattern) |

No phase after a gate proceeds without explicit user approval.

## 11 Artifacts

JARFIS workflows produce up to 11 structured documents stored in the work directory:

| Artifact | Phase | Author |
|----------|-------|--------|
| Working Backwards (press release) | 1 | PO |
| PRD | 1 | PO |
| Feasibility assessment | 1 | Architect |
| Impact analysis | 2 | Architect |
| Architecture / ADR | 2 | Architect |
| API specification | 2 | Architect / Tech Lead |
| Task breakdown (`tasks.md`) | 2 | Tech Lead |
| Test strategy | 2 | QA Engineer |
| UX specification | 3 | UX Designer |
| Deployment / rollback plan | 4.5 | DevOps/SRE |
| Review report | 5 | Tech Lead / QA / Security |

## State Management

JARFIS tracks workflow state in `.jarfis-state.json` at the project root. The actual schema includes:

```json
{
  "work_name": "auth-system",
  "docs_dir": ".jarfis/works/2026-03-05/auth-system",
  "branch": "jarfis/auth-system",
  "base_branch": "main",
  "current_phase": 4,
  "required_roles": {
    "backend": true,
    "frontend": true,
    "ux": true,
    "devops": false,
    "security": true
  },
  "api_spec_required": true,
  "workspace": {
    "type": "monorepo",
    "projects": ["packages/api", "packages/web"]
  },
  "phases": {
    "T": { "status": "completed" },
    "0": { "status": "completed" },
    "1": { "status": "completed" },
    "2": { "status": "completed" },
    "3": { "status": "completed" },
    "4": { "status": "in_progress" },
    "4.5": { "status": "pending" },
    "5": { "status": "pending" },
    "6": { "status": "pending" }
  },
  "last_checkpoint": {
    "timestamp": "2026-03-05T14:30:00Z",
    "phase": 4,
    "summary": "Backend API implementation in progress"
  }
}
```

Key fields:
- **`current_phase`** — A number or `"done"` indicating the active phase
- **`required_roles`** — Boolean flags controlling which agents are activated
- **`api_spec_required`** — Whether API specification is needed
- **`workspace`** — Project structure metadata (monorepo, multi-project, etc.)
- **`phases`** — Per-phase status tracking (pending / in_progress / completed / skipped)
- **`last_checkpoint`** — Timestamp and summary of the last saved progress point

## Learning System

JARFIS improves across workflows through a two-level learning system:

### Global Learnings: `~/.claude/jarfis-learnings.md`
Stored in the user's home directory and shared across all projects. Contains:
- **Agent Hints** — behavioral rules accumulated from retrospectives
- **Workflow Patterns** — recurring patterns that proved effective

### Project Context: `.jarfis/context.md`
Project-specific knowledge injected into agent prompts:
- Tech stack details and conventions
- Business domain knowledge
- Integration constraints and existing patterns

### Project Profile: `.jarfis/project-profile.md`
Generated by `/jarfis:project-init` and updated by `/jarfis:project-update`. Describes the project structure, dependencies, and configuration.

## Meeting System

The `/jarfis:meeting` command initiates a structured kickoff meeting for planning purposes:

```
/jarfis:meeting Define the authentication strategy for the mobile app
```

Meeting results can be referenced in subsequent workflows using the `--meeting` flag:

```
/jarfis:work Implement auth system --meeting auth-strategy-meeting
```

This links the meeting decisions as input context for the workflow, ensuring alignment between planning and execution.

## Design Principles

1. **Specialization** — Each agent has deep expertise in one domain; no agent tries to do everything
2. **Phased delivery** — Structured phases ensure completeness; no step is accidentally skipped
3. **Human gates** — Critical decisions require explicit user approval at 3 defined checkpoints
4. **Conditional activation** — Agents and phases are only activated when relevant (e.g., no UX phase for a CLI tool)
5. **Stateful** — Work survives session boundaries via `.jarfis-state.json`
6. **Continuous learning** — Every retrospective improves future workflows through global and project learnings
7. **Claude Code native** — No external services; runs entirely within your development environment

## Next Steps

- [Quick Start](/en/docs/getting-started) — Install JARFIS and run your first workflow
- [API Reference](/en/docs/api-reference) — All commands and configuration details
- [Guides & Customization](/en/docs/guides-customization) — Advanced workflow patterns
