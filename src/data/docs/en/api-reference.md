---
title: "API Reference"
description: "Complete reference for JARFIS slash commands, configuration options, .jarfis-state.json schema, and artifact frontmatter specifications."
category: "api-reference"
order: 1
locale: "en"
lastUpdated: 2026-03-05
draft: false
---

# API Reference

Complete reference for all JARFIS commands, configuration files, and schemas.

## Slash Commands

### `/jarfis`

Start a new JARFIS workflow for a feature or task.

**Syntax**:
```
/jarfis [options] <description>
```

**Options**:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--feature <name>` | string | auto-generated | Feature identifier for artifact storage |
| `--skip-phases <list>` | string | none | Comma-separated phases to skip (e.g., `T,0`) |
| `--start-phase <id>` | string | `T` | Phase to begin from (T, 0, 1, 2, 3, 4, 4.5, 5, 6) |
| `--agents <list>` | string | all | Comma-separated agents to activate |
| `--dry-run` | boolean | false | Plan phases without executing |

**Examples**:

```
/jarfis Build a user authentication system with OAuth2

/jarfis --feature payment-v2 --start-phase 3 Implement Stripe checkout

/jarfis --skip-phases T,0,1 --agents be,fe,qa Fix broken cart calculation
```

---

### `/jarfis:install`

Initialize JARFIS in the current project.

**Syntax**:
```
/jarfis:install [--force]
```

**Creates**:
- `.jarfis/CLAUDE.md` — JARFIS context file
- `.jarfis/context.md` — Project context template
- `.jarfis/jarfis-learnings.md` — Empty learnings log
- `.jarfis/works/` — Artifact storage directory
- `.jarfis-state.json` — State file (empty initial state)

**Options**:

| Option | Description |
|--------|-------------|
| `--force` | Overwrite existing installation |

---

### `/jarfis:meeting`

Convene a structured multi-agent meeting.

**Syntax**:
```
/jarfis:meeting [topic]
```

**Parameters**:

| Parameter | Description |
|-----------|-------------|
| `topic` | Optional. Description of the decision or conflict to resolve. |

**Examples**:

```
/jarfis:meeting

/jarfis:meeting decide on database schema for user permissions

/jarfis:meeting resolve conflict: FE wants REST, BE prefers GraphQL
```

**Output**: Decision summary appended to `review.md`. State updated in `.jarfis-state.json`.

---

### `/jarfis:status`

Show current workflow state.

**Syntax**:
```
/jarfis:status [--feature <name>]
```

**Output**: Displays active feature, current phase, completed phases, and generated artifacts.

---

### `/jarfis:resume`

Resume an interrupted workflow from the last saved phase.

**Syntax**:
```
/jarfis:resume [--feature <name>]
```

Reads `.jarfis-state.json` and restores context for the active feature.

---

### `/jarfis:retrospective`

Run Phase 6 (Retrospective) for the current feature.

**Syntax**:
```
/jarfis:retrospective [--feature <name>]
```

Generates `retrospective.md` and updates `jarfis-learnings.md`.

---

## Configuration Files

### `.jarfis/CLAUDE.md`

Main JARFIS configuration file. Read by all agents at the start of every session.

**Supported sections**:

```markdown
## Agent Customizations
Per-agent instruction overrides (see Guides for syntax)

## Phase Gates
Human approval requirements before phase transitions

## Artifact Templates
Reference to custom template files

## Global Rules
Rules applied to all agents in all phases
```

---

### `.jarfis/context.md`

Project context injected into every agent prompt. Keep this accurate and up to date.

**Recommended sections**:

```markdown
## Tech Stack
## Conventions
## Business Domain
## Integration Constraints
## Team Preferences
```

---

### `.jarfis/jarfis-learnings.md`

Accumulated project knowledge from retrospectives and manual entries.

**Format**:

```markdown
## YYYY-MM-DD — [Topic]

### What worked
### What to avoid
### Patterns to reuse
```

---

## `.jarfis-state.json` Schema

```typescript
interface JarfisState {
  // Single-feature mode
  feature?: string;
  currentPhase?: Phase;
  completedPhases?: Phase[];
  agentContext?: Record<AgentId, string>;
  artifactsGenerated?: ArtifactName[];

  // Multi-feature mode
  features?: Record<string, FeatureState>;
  activeFeature?: string;
}

type Phase = 'T' | '0' | '1' | '2' | '3' | '4' | '4.5' | '5' | '6';

type AgentId = 'po' | 'architect' | 'tech-lead' | 'ux' | 'be' | 'fe' | 'devops' | 'qa' | 'security';

type ArtifactName =
  | 'press-release.md'
  | 'prd.md'
  | 'impact-analysis.md'
  | 'architecture.md'
  | 'api-spec.md'
  | 'tasks.md'
  | 'test-strategy.md'
  | 'ux-spec.md'
  | 'deployment-plan.md'
  | 'review.md'
  | 'retrospective.md';

interface FeatureState {
  currentPhase: Phase;
  completedPhases: Phase[];
  agentContext: Record<AgentId, string>;
  artifactsGenerated: ArtifactName[];
}
```

---

## Artifact Frontmatter

Each artifact file in `.jarfis/works/` should include a YAML frontmatter block for proper indexing.

### `tasks.md` Frontmatter

```yaml
---
document_type: tasks
feature: auth-system
phase: 3
created: 2026-03-05
last_updated: 2026-03-05
agents: [tech-lead, be, fe]
status: in-progress  # in-progress | complete | on-hold
---
```

### `prd.md` Frontmatter

```yaml
---
document_type: prd
feature: auth-system
version: "1.0"
status: approved  # draft | review | approved
approver: po-agent
created: 2026-03-05
---
```

### `architecture.md` Frontmatter

```yaml
---
document_type: architecture
feature: auth-system
version: "1.2"
status: final  # draft | review | final
adrs:
  - ADR-001: JWT over session cookies
  - ADR-002: PostgreSQL for user data
created: 2026-03-05
---
```

---

## Phase Reference

### Phase IDs and Descriptions

| ID | Name | Description |
|----|------|-------------|
| `T` | Kickoff | Requirements gathering, press-release, initial PRD |
| `0` | Foundation | Impact analysis, tech decisions, risk assessment |
| `1` | Design | UX spec, API contract skeleton |
| `2` | Architecture | Full system design, data models, service boundaries |
| `3` | Implementation | Parallel BE + FE development |
| `4` | Integration | API wiring, end-to-end integration |
| `4.5` | QA & Security | Test execution, security audit |
| `5` | Deployment | Infrastructure, CI/CD, release |
| `6` | Retrospective | Learnings capture, retrospective |

### Phase Agent Matrix

| Phase | PO | Arch | TL | UX | BE | FE | DevOps | QA | Sec |
|-------|:--:|:----:|:--:|:--:|:--:|:--:|:------:|:--:|:---:|
| T | ✓ | ✓ | | | | | | | |
| 0 | | ✓ | ✓ | | | | | | |
| 1 | | ✓ | | ✓ | ✓ | | | | |
| 2 | | ✓ | ✓ | | ✓ | ✓ | | | |
| 3 | | | ✓ | | ✓ | ✓ | | | |
| 4 | | | ✓ | | ✓ | ✓ | | | |
| 4.5 | | | | | | | | ✓ | ✓ |
| 5 | | | ✓ | | | | ✓ | | |
| 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JARFIS_LOG_LEVEL` | Log verbosity: `debug`, `info`, `warn`, `error` | `info` |
| `JARFIS_ARTIFACTS_DIR` | Override artifact storage path | `.jarfis/works` |
| `JARFIS_STATE_FILE` | Override state file path | `.jarfis-state.json` |
| `JARFIS_SKIP_GATES` | Skip all phase gate prompts | `false` |

---

## See Also

- [Quick Start](/en/docs/getting-started) — Get running in 5 minutes
- [Concepts Overview](/en/docs/concepts-overview) — Architecture deep dive
- [Guides & Customization](/en/docs/guides-customization) — Advanced patterns
- [GitHub](https://github.com/sana-lazystar/jarfis) — Source code and issues
