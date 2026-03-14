---
title: "API Reference"
description: "Complete reference for JARFIS slash commands, .jarfis-state.json schema, learning file structure, and phase specifications."
category: "api-reference"
order: 1
locale: "en"
lastUpdated: 2026-03-05
draft: false
---

# API Reference

Complete reference for all JARFIS commands, state schema, and configuration files.

## Slash Commands

### `/jarfis:work`

The primary command to start a JARFIS workflow. Initiates the full phase pipeline from Triage through Retrospective.

**Syntax**:
```
/jarfis:work [description]
/jarfis:work [description] --meeting [meeting-name]
```

**Parameters**:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `description` | Yes | Natural language description of the feature or task to implement |
| `--meeting` | No | Name of a previous `/jarfis:meeting` session to use as input context |

**Examples**:

```
/jarfis:work Build a user authentication system with JWT tokens

/jarfis:work Add Stripe subscription billing --meeting billing-kickoff

/jarfis:work Fix the broken cart calculation on checkout page
```

---

### `/jarfis:meeting`

Initiates a structured kickoff meeting for planning and alignment. Meeting results are stored and can be referenced by subsequent `/jarfis:work` sessions.

**Syntax**:
```
/jarfis:meeting [topic]
```

**Parameters**:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `topic` | Yes | The subject or agenda for the meeting |

**Examples**:

```
/jarfis:meeting Define the authentication strategy for the mobile app

/jarfis:meeting Decide on database schema for multi-tenant architecture
```

When a meeting is referenced via `--meeting`, the state file includes `meeting_ref` and `meeting_dir` fields linking to the meeting artifacts.

---

### `/jarfis:project-init`

Generates a project profile by analyzing the current codebase. Creates `.jarfis/project-profile.md` with information about the project structure, dependencies, and conventions.

**Syntax**:
```
/jarfis:project-init
```

---

### `/jarfis:project-update`

Updates an existing project profile to reflect changes in the codebase since the last initialization.

**Syntax**:
```
/jarfis:project-update
```

---

### `/jarfis:health`

Diagnoses zombie processes and other operational issues in the JARFIS environment.

**Syntax**:
```
/jarfis:health
```

---

### `/jarfis:upgrade`

Manages learning items — review, edit, and curate entries in the learning system.

**Syntax**:
```
/jarfis:upgrade
```

---

### `/jarfis:version`

Displays and manages JARFIS version information.

**Syntax**:
```
/jarfis:version
```

---

### `/jarfis:distill`

Performs prompt distillation — optimizes and compresses prompt content for efficiency.

**Syntax**:
```
/jarfis:distill
```

---

## State File: `.jarfis-state.json`

The state file tracks the current workflow progress. Located at the project root.

### Schema

```json
{
  "work_name": "string",
  "docs_dir": "string (path to artifact directory)",
  "branch": "string (Git branch name)",
  "base_branch": "string (base branch for merge)",
  "current_phase": "number | \"done\"",
  "required_roles": {
    "backend": "boolean",
    "frontend": "boolean",
    "ux": "boolean",
    "devops": "boolean",
    "security": "boolean"
  },
  "api_spec_required": "boolean",
  "workspace": {
    "type": "\"monorepo\" | \"multi-project\"",
    "projects": ["string (project paths)"]
  },
  "phases": {
    "T": { "status": "pending | in_progress | completed | skipped" },
    "0": { "status": "..." },
    "1": { "status": "..." },
    "2": { "status": "..." },
    "3": { "status": "..." },
    "4": { "status": "..." },
    "4.5": { "status": "..." },
    "5": { "status": "..." },
    "6": { "status": "..." }
  },
  "last_checkpoint": {
    "timestamp": "ISO 8601 string",
    "phase": "number",
    "summary": "string"
  },
  "meeting_ref": "string (optional, meeting name)",
  "meeting_dir": "string (optional, path to meeting artifacts)"
}
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `work_name` | string | Identifier for the current workflow |
| `docs_dir` | string | Path where artifacts are stored |
| `branch` | string | Git branch created for this workflow |
| `base_branch` | string | Branch to merge back into |
| `current_phase` | number or `"done"` | Active phase number |
| `required_roles` | object | Boolean flags for which agent roles are active |
| `api_spec_required` | boolean | Whether API specification document is needed |
| `workspace` | object | Project structure metadata |
| `phases` | object | Per-phase status (pending / in_progress / completed / skipped) |
| `last_checkpoint` | object | Timestamp and summary of last saved progress |
| `meeting_ref` | string | Reference to a linked meeting (when `--meeting` was used) |
| `meeting_dir` | string | Path to the linked meeting's artifacts |

---

## Learning Files

### Global Learnings: `~/.claude/jarfis-learnings.md`

Located in the user's home directory. Shared across all projects. Contains two main sections:

- **Agent Hints** — Behavioral rules and guidelines accumulated from retrospectives
- **Workflow Patterns** — Proven patterns for common scenarios

This file is loaded during Phase 0 (Pre-flight) of every workflow.

### Project Context: `.jarfis/context.md`

Project-specific context injected into agent prompts. Contains tech stack details, conventions, domain knowledge, and integration constraints.

### Project Profile: `.jarfis/project-profile.md`

Auto-generated by `/jarfis:project-init`. Describes the project's structure, dependencies, build tools, and configuration. Updated via `/jarfis:project-update`.

---

## Phase Reference

| Phase | Name | Description |
|-------|------|-------------|
| T | Triage | Request classification (A/B/C type determination) |
| 0 | Pre-flight | Git synchronization, branch creation, learning file loading |
| 1 | Discovery | PO reverse-questions, Working Backwards, PRD, feasibility assessment |
| 2 | Architecture & Planning | Impact analysis, system design, API spec (conditional), task breakdown, test strategy |
| 3 | UX Design | Screen design, interaction design (conditional: only when UI is needed) |
| 4 | Implementation | BE/FE/DevOps parallel implementation (only parts with tasks) |
| 4.5 | Operational Readiness | Deployment strategy, rollback plan, operational readiness check |
| 5 | Review & QA | API contract verification, Tech Lead + QA + Security parallel reviews |
| 6 | Retrospective | Learning accumulation (global learnings + project context) |

## Gate Reference

| Gate | Position | User Options |
|------|----------|--------------|
| Gate 1 | After Phase 1 | Approve / Revise / Abort |
| Gate 2 | After Phases 2 & 3 | Approve / Revise / Abort |
| Gate 3 | After Phase 5 | Approve / Revise & re-review / Abort / Revisit design (pathological pattern) |

---

## See Also

- [Quick Start](/en/docs/getting-started) — Install and run your first workflow
- [Architecture & Concepts](/en/docs/concepts-overview) — Deep dive into the orchestration model
- [Guides & Customization](/en/docs/guides-customization) — Advanced workflow patterns
