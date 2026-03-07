---
title: "Introducing JARFIS: 9 AI Agents, One Slash Command"
description: "JARFIS orchestrates 9 specialized AI agents to deliver production-ready software — from requirements to deployment — with a single command."
pubDate: 2026-03-05
author: "JARFIS Team"
tags: ["announcement", "architecture", "agents"]
locale: "en"
draft: false
---

# Introducing JARFIS: 9 AI Agents, One Slash Command

Software development teams spend enormous time coordinating work across disciplines — product, design, engineering, QA, DevOps. Every handoff introduces friction. Every context switch costs time. JARFIS is built on one idea: what if you could eliminate those handoffs entirely?

JARFIS (Just Another Really Fantastic Intelligent System) is a 100% open-source AI agent framework. It orchestrates a team of 9 specialized agents that collaborate across every phase of the software development lifecycle — autonomously, on your own infrastructure, with no vendor lock-in.

## The Problem with Single-Agent AI

Most AI coding tools today are single agents. You ask a question, you get an answer. You describe a feature, you get code. That model works — up to a point.

The real bottleneck in software delivery is never "can someone write this code." It's the full workflow: understanding requirements, making design decisions, writing code that matches the spec, catching regressions, handling deployment. No single agent can hold all of that context reliably.

JARFIS solves this with specialization. Each agent owns a specific domain and hands off to the next with structured, validated output.

## The 9 Agents

JARFIS ships with 9 purpose-built agents, each responsible for a distinct role:

| Agent | Role |
|-------|------|
| **PO Agent** | Translates business requirements into structured tickets and acceptance criteria |
| **UX Agent** | Produces wireframes, user flows, and interaction specifications |
| **Design Agent** | Converts UX specs into a design system with tokens, components, and visual guidelines |
| **Frontend Agent** | Implements UI components matching the design spec exactly |
| **Backend Agent** | Builds API endpoints, data models, and business logic |
| **DB Agent** | Designs schema, writes migrations, and optimizes queries |
| **DevOps Agent** | Provisions infrastructure, configures CI/CD pipelines, and manages deployments |
| **QA Agent** | Writes and executes tests, validates against acceptance criteria |
| **Doc Agent** | Generates and maintains technical documentation |

These agents don't just run sequentially — they collaborate. The Frontend Agent reads the Design Agent's token system. The QA Agent tests against the PO Agent's acceptance criteria. The Doc Agent pulls context from every prior agent's output.

## Phase-Based Workflow

JARFIS organizes work into Phases, each with a Gate that must pass before the next Phase begins. This structure gives you visibility and control without micromanaging individual agents.

```
Phase 0: Requirements     → Gate: Acceptance criteria approved
Phase 1: Design           → Gate: Design system finalized
Phase 2: Architecture     → Gate: Technical spec reviewed
Phase 3: Implementation   → Gate: Code review passed
Phase 4: QA               → Gate: All tests green
Phase 5: Deployment       → Gate: Staging validated
```

Every Gate produces an artifact — a document, a test report, a signed-off spec — that feeds the next Phase. Nothing proceeds until the Gate clears. This means fewer surprises late in the cycle, and a clear audit trail of every decision.

## What This Looks Like in Practice

Starting a new feature with JARFIS looks like this:

```bash
jarfis run --feature "User authentication with OAuth 2.0"
```

JARFIS picks up from there:

1. **PO Agent** breaks down the feature into tickets with acceptance criteria
2. **UX Agent** generates user flows for the sign-in, callback, and error states
3. **Design Agent** produces component specs for the auth UI
4. **Frontend Agent** implements the components
5. **Backend Agent** builds the OAuth callback handler and session management
6. **DB Agent** creates the users and sessions schema
7. **QA Agent** writes and runs integration tests
8. **Doc Agent** documents the auth flow for your team

Each step produces structured output. Each Gate requires that output to meet defined quality criteria before the next agent runs. The result is production-ready code with tests, documentation, and a clean git history — not a prototype.

## Self-Hosted, Open Source, Your LLM

JARFIS connects to whatever LLM you choose — OpenAI, Anthropic, a locally running model via Ollama, or any OpenAI-compatible endpoint. Your code never leaves your infrastructure unless you choose to push it. There are no usage fees, no seat licenses, and no proprietary data pipelines.

The framework itself is MIT licensed. Every agent prompt, every Gate criterion, every workflow configuration is inspectable and modifiable. If JARFIS does something you don't like, you can change it.

## Getting Started

JARFIS requires Node.js 20+ and a configured LLM endpoint.

```bash
npm install -g @jarfis/cli
jarfis init my-project
cd my-project
jarfis run
```

The `jarfis init` command walks you through connecting your LLM, configuring your preferred agent set, and setting up your first project. The full setup takes under five minutes.

For a complete walkthrough, see the [Getting Started guide](/en/docs/getting-started/quick-start).

## What's Next

JARFIS v1.0 covers the full development lifecycle for most web application projects. Upcoming work includes:

- **Agent Dashboard**: Real-time visibility into what each agent is doing and why
- **Custom Agents**: A plugin API for adding domain-specific agents to the pipeline
- **Multi-Repo Orchestration**: Coordinate agents across microservice architectures
- **Gate Policies**: Configure custom pass/fail criteria per Gate per project

If you're building with JARFIS, we want to hear about it. Open an issue, start a discussion, or submit a PR. The framework gets better when more teams use it on real problems.

Star the repo and join the community. Development starts now.
