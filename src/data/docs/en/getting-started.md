---
title: "Quick Start"
description: "Get JARFIS running in under 5 minutes. Install Claude Code, run /jarfis, and let 9 expert AI agents ship your first feature."
category: "getting-started"
order: 1
locale: "en"
lastUpdated: 2026-03-05
draft: false
---

# Quick Start

Ship software with AI in under 5 minutes. One slash command — nine expert agents.

## Prerequisites

Before you begin, ensure you have:

- **Claude Code** (Anthropic) — JARFIS runs natively inside Claude Code
- A Claude account with API access
- **Git** >= 2.x (for project initialization)

> JARFIS is a Claude Code slash command workflow. No separate CLI installation required.

## Step 1 — Install JARFIS

JARFIS is distributed as a Claude Code slash command package. Inside Claude Code, run:

```
/jarfis:install
```

This sets up the JARFIS workflow in your current project and creates:

```
your-project/
├── .jarfis/
│   ├── CLAUDE.md              # JARFIS context & learning memory
│   ├── context.md             # Project-specific AI context
│   ├── jarfis-learnings.md    # Continuous learning log
│   └── works/                 # Generated artifacts per session
├── .jarfis-state.json         # Phase state tracking
└── CLAUDE.md                  # Root Claude Code context
```

## Step 2 — Run Your First Workflow

In your project directory, open Claude Code and type:

```
/jarfis
```

JARFIS will prompt you for a feature or task description. For example:

```
/jarfis Build a user authentication system with JWT tokens
```

## Step 3 — Watch 9 Agents Collaborate

JARFIS orchestrates 9 specialized AI agents through 8+ structured phases:

| Phase | Name | What Happens |
|-------|------|--------------|
| T | Kickoff | Requirements gathering, initial planning |
| 0 | Foundation | Architecture decisions, tech stack |
| 1 | Design | UX specs, API contracts |
| 2 | Architecture | System design, data models |
| 3 | Implementation | Backend + Frontend parallel development |
| 4 | Integration | API wiring, component integration |
| 4.5 | QA & Security | Testing, vulnerability review |
| 5 | Deployment | Infrastructure, CI/CD, release notes |
| 6 | Retrospective | Learnings capture, improvement planning |

The 9 agents working on your behalf:

| Agent | Role |
|-------|------|
| **PO** | Product Owner — requirements & user stories |
| **Architect** | System design & technical decisions |
| **Tech Lead** | Code standards, review, coordination |
| **UX Designer** | User experience, wireframes, UX spec |
| **BE Engineer** | Backend API implementation |
| **FE Engineer** | Frontend UI implementation |
| **DevOps/SRE** | Infrastructure, CI/CD, deployment |
| **QA Engineer** | Testing strategy, test execution |
| **Security Engineer** | Security review, vulnerability analysis |

## Step 4 — Review Artifacts

Each completed phase produces structured artifacts in `.jarfis/works/{date}/{feature}/`:

```
.jarfis/works/2026-03-05/feature/auth-system/
├── press-release.md       # Feature announcement draft
├── prd.md                 # Product requirements
├── impact-analysis.md     # Technical impact assessment
├── architecture.md        # System architecture
├── api-spec.md            # API contracts
├── tasks.md               # Development task breakdown
├── test-strategy.md       # QA plan
├── ux-spec.md             # UX specifications
├── deployment-plan.md     # Release plan
├── review.md              # Post-implementation review
└── retrospective.md       # Learnings & improvements
```

## Step 5 — Continue or Hold a Meeting

To continue work in a later session, Claude Code's PreCompact hook automatically restores your JARFIS state from `.jarfis-state.json`.

To hold a cross-agent coordination meeting:

```
/jarfis:meeting
```

This convenes relevant agents to resolve blockers, align on decisions, or plan the next phase.

## Next Steps

- Read [Concepts Overview](/en/docs/concepts-overview) to understand the full JARFIS architecture
- Read [Guides & Customization](/en/docs/guides-customization) for advanced workflow patterns
- Read [API Reference](/en/docs/api-reference) for all slash commands and configuration options
- Join [GitHub Discussions](https://github.com/sana-lazystar/jarfis/discussions) for community support

## Troubleshooting

**`/jarfis` command not found?**

Ensure JARFIS is installed in your project. Re-run `/jarfis:install` from Claude Code.

**Agent taking too long?**

Complex features may require multiple phases. Use `/jarfis:meeting` to check status or accelerate decision-making between agents.

**State lost between sessions?**

Check `.jarfis-state.json` in your project root. The PreCompact hook reads this file on each Claude Code session start to restore context.

**Artifacts not appearing?**

Ensure `.jarfis/works/` directory exists and that Claude Code has write permissions in your project directory.
