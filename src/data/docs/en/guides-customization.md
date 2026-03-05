---
title: "Guides & Customization"
description: "Advanced JARFIS patterns: custom agent prompts, context.md configuration, phase skipping, meeting facilitation, and learning system management."
category: "guides"
order: 1
locale: "en"
lastUpdated: 2026-03-05
draft: false
---

# Guides & Customization

Advanced patterns for getting the most out of JARFIS on real projects.

## Configuring Project Context

The most impactful customization is a well-written `context.md`. Every agent reads this file before taking any action.

### `context.md` Structure

```markdown
# Project Context

## Tech Stack
- Frontend: Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4
- Backend: FastAPI (Python 3.12), PostgreSQL 16, Redis
- Infrastructure: AWS ECS, Terraform, GitHub Actions

## Conventions
- API responses follow RFC 9457 Problem Details format
- All database models use UUID primary keys
- Frontend components follow atomic design (atoms/molecules/organisms)
- Commit format: conventional commits (feat/fix/chore/refactor)

## Business Domain
- SaaS B2B platform for legal document management
- Compliance requirements: SOC 2 Type II, GDPR
- Primary users: legal teams at enterprises (500+ employees)

## Integration Constraints
- Existing auth: Auth0 (cannot change)
- Payment: Stripe (webhooks already configured)
- File storage: S3 with presigned URLs
```

The more specific your `context.md`, the more accurate agent outputs will be. This is the highest-leverage 30 minutes you can invest before starting a JARFIS workflow.

## Customizing Agent Behavior

### Per-Phase Agent Overrides

In `.jarfis/CLAUDE.md`, you can add agent-specific instructions:

```markdown
## Agent Customizations

### PO Agent
- Always write user stories in the format: "As a [role], I want [action] so that [benefit]"
- Acceptance criteria must be testable (Given/When/Then format)
- Prioritize by business value, not technical difficulty

### Security Engineer
- Check all dependencies against our internal vulnerability database first
- GDPR article references are required in any auth-related security note
- All cryptographic operations must use approved algorithms from our security policy

### DevOps/SRE
- Use our Terraform module library at terraform-modules/
- Blue/green deployment is the only acceptable deployment strategy
- PagerDuty integration required in all monitoring configurations
```

### Skipping Phases

For hotfixes or minor changes, you can skip phases:

```
/jarfis --skip-phases T,0,1 --start-phase 3 Fix broken login redirect
```

Use this carefully — phase skipping means those phase artifacts will not be generated.

## Working with the Learning System

### Adding Learnings Manually

After any significant discovery, add to `jarfis-learnings.md`:

```markdown
## 2026-03-05 — Auth Integration

### What worked
- Using Auth0 Management API for user sync on first login
- JWT validation middleware extracted to shared lib eliminates duplication

### What to avoid
- Never use Auth0's legacy `/oauth/token` endpoint — use PKCE flow only
- The `useUser` hook has a 2s delay on cold start — always show skeleton

### Patterns to reuse
- Error boundary + Suspense pattern from `UserProfile` component works for all auth-gated pages
```

Agents reference `jarfis-learnings.md` at the start of every relevant phase, so learnings from project 1 directly improve project 2.

### Resetting Learnings

If a project is archived and learnings no longer apply:

```bash
# Archive learnings before clearing
cp .jarfis/jarfis-learnings.md .jarfis/archive/jarfis-learnings-2025.md
echo "" > .jarfis/jarfis-learnings.md
```

## Meeting Facilitation

### When to Call a Meeting

Use `/jarfis:meeting` when:
- Two agents have conflicting approaches (e.g., BE and FE disagree on API contract)
- A critical architectural decision needs multi-agent input
- A phase deliverable is blocked pending a scope clarification
- Post-phase retrospective would benefit from structured discussion

### Meeting Patterns

**Conflict resolution meeting**:
```
/jarfis:meeting resolve conflict between BE and FE on pagination API design
```

**Decision meeting**:
```
/jarfis:meeting decide on state management approach: Redux vs Zustand vs Jotai
```

**Scope clarification**:
```
/jarfis:meeting clarify scope: does "user profile" include organization settings?
```

Meeting outcomes are automatically recorded in `review.md` and trigger an update to `.jarfis-state.json`.

## Multi-Feature Parallel Workflows

For large projects with multiple concurrent features, JARFIS supports parallel work trees:

```
.jarfis/works/
├── 2026-03-05/
│   ├── feature/auth-system/          # Feature A: Phase 3
│   └── feature/billing-integration/  # Feature B: Phase 1
└── 2026-03-01/
    └── feature/dashboard-redesign/   # Feature C: Completed
```

Start a new feature without disrupting in-progress work:

```
/jarfis --feature billing-integration Add Stripe subscription billing
```

State for each feature is tracked independently in `.jarfis-state.json`:

```json
{
  "features": {
    "auth-system": { "currentPhase": "3" },
    "billing-integration": { "currentPhase": "1" }
  },
  "activeFeature": "billing-integration"
}
```

## Phase Gate Reviews

Insert a human review checkpoint before any phase transition:

In `.jarfis/CLAUDE.md`:
```markdown
## Phase Gates

- Phase 2 → 3: Require explicit human approval of architecture.md
- Phase 4.5 → 5: Require security engineer sign-off on all HIGH/CRITICAL findings
- Phase 5 → 6: Require deployment plan review by team lead
```

When a gate is reached, JARFIS pauses and prompts:

```
Phase 2 complete. Architecture document ready for review.
Type 'approve' to proceed to Phase 3, or describe any changes needed.
```

## Artifact Templates

Standardize artifact format across your organization by adding templates to `.jarfis/`:

```
.jarfis/
├── templates/
│   ├── prd-template.md
│   ├── architecture-template.md
│   └── test-strategy-template.md
```

Agents will use these templates as the structural baseline for their artifacts.

## Tips for Large Codebases

1. **Keep `context.md` up to date** — stale context leads to agents generating code that conflicts with existing patterns
2. **Use phase skipping sparingly** — skipped artifacts mean the PreCompact hook has less context to restore
3. **Archive old `.jarfis-state.json` regularly** — large state files slow down the PreCompact hook
4. **Commit `jarfis-learnings.md` to your repo** — this is valuable project knowledge, not just AI state
5. **Review agent artifacts before approval** — JARFIS generates, humans decide

## Next Steps

- [API Reference](/en/docs/api-reference) — All `/jarfis` commands and configuration options
- [Concepts Overview](/en/docs/concepts-overview) — Deep dive into the architecture
