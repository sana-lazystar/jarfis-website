---
title: "Architecture & Concepts"
description: "Understand the core JARFIS architecture: how agents orchestrate, communicate, and enable autonomous software development."
category: "concepts"
order: 2
locale: "en"
lastUpdated: 2026-03-04
draft: false
---

# Architecture & Concepts

Understanding how JARFIS works under the hood.

## The Agent Team Model

JARFIS is built around the concept of **specialized agents working as a team**. Unlike single-agent systems that handle everything, JARFIS orchestrates distinct agents, each with a focused role:

```
Task Input
    │
    ▼
┌──────────────────────────────────────┐
│         JARFIS Orchestrator          │
│  (Task decomposition & coordination) │
└──────────────────────────────────────┘
    │           │           │           │
    ▼           ▼           ▼           ▼
┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐
│  PO  │   │  UX  │   │  FE  │   │  QA  │
│Agent │   │Agent │   │Agent │   │Agent │
└──────┘   └──────┘   └──────┘   └──────┘
    │           │           │           │
    └───────────┴───────────┴───────────┘
                        │
                        ▼
                  Final Output
```

## Core Components

### Orchestrator

The Orchestrator is the central coordinator. It:
- Parses your task description
- Breaks it into subtasks
- Assigns subtasks to appropriate agents
- Manages agent dependencies and sequencing
- Collects and merges outputs

### Agent Types

| Agent | Role | Primary Output |
|-------|------|---------------|
| PO Agent | Product Owner — requirements definition | `requirements.md`, user stories |
| UX Agent | UX Designer — wireframes and flows | `wireframes/`, `ux-spec.md` |
| Frontend Agent | Developer — implementation | Source code files |
| QA Agent | Quality Assurance — review | `qa-report.md`, code review |

### Context Sharing

Agents share context through a structured **handoff protocol**:

```yaml
# Example handoff: PO → UX
handoff:
  from: po-agent
  to: ux-agent
  artifacts:
    - requirements.md
    - user-stories.md
  context:
    target_audience: "developers"
    design_style: "minimal, technical"
```

This ensures each agent has exactly the context it needs — no more, no less.

## Workflow Model

A JARFIS workflow follows this lifecycle:

```
1. PLAN    → Orchestrator analyzes task
2. ASSIGN  → Subtasks distributed to agents
3. EXECUTE → Agents work in parallel where possible
4. REVIEW  → QA Agent reviews all outputs
5. MERGE   → Orchestrator combines final output
6. DELIVER → Output written to disk
```

### Parallel Execution

Where agent outputs don't depend on each other, JARFIS runs them in parallel:

```
PO Agent ──────────────────────────────► (done)
                                              │
UX Agent ─────────────────────────────────► (done)
                                              │
FE Agent ──────────────────────────────────► (done)
                                              │
                              QA Agent ──────► (done)
                                              │
                                    MERGE ────►
```

### Sequential with Dependencies

When outputs are dependent, JARFIS sequences them:

```
PO Agent → UX Agent → FE Agent → QA Agent
```

## LLM Integration

JARFIS is **LLM-agnostic**. It supports:

- **OpenAI** (GPT-4o, GPT-4 Turbo)
- **Anthropic** (Claude Opus 4, Claude Sonnet 4)
- **Ollama** (local models — Llama, Mistral, etc.)
- **Any OpenAI-compatible API**

Agents can even use different LLMs based on their role — e.g., a cheaper model for PO/QA, a powerful model for the Frontend Agent.

## Key Design Principles

1. **Specialization over generalization** — Each agent does one thing well
2. **Transparency** — All agent reasoning is logged and inspectable
3. **Fail-safe** — Human review checkpoints can be inserted at any stage
4. **Self-hostable** — Your data never leaves your infrastructure
5. **Extensible** — Add custom agents via the plugin system

## Next Steps

- [Quick Start](/en/docs/getting-started) — Run your first workflow
- [Building Your First Workflow](/en/docs) — Step-by-step guide
- [API Reference](/en/docs) — Orchestrator and Agent APIs
