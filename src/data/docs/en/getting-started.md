---
title: "Quick Start"
description: "Get JARFIS running in under 5 minutes. Install the CLI, initialize your project, and run your first AI-powered workflow."
category: "getting-started"
order: 1
locale: "en"
lastUpdated: 2026-03-04
draft: false
---

# Quick Start

Get JARFIS running in under 5 minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18 ([nodejs.org](https://nodejs.org))
- **Git** >= 2.x
- An LLM API key (OpenAI, Anthropic, or compatible)

## Step 1 — Install the CLI

```bash
npm install -g @jarfis/cli
```

Estimated time: ~30 seconds.

Verify the installation:

```bash
jarfis --version
# JARFIS CLI v1.0.0
```

## Step 2 — Initialize Your Project

```bash
jarfis init my-project
cd my-project
```

This creates a project structure with:

```
my-project/
├── .jarfis/
│   └── config.yaml      # JARFIS configuration
├── jarfis.config.ts     # Workflow configuration
└── README.md
```

## Step 3 — Configure Your LLM

Open `.jarfis/config.yaml` and set your LLM provider:

```yaml
llm:
  provider: openai          # openai | anthropic | ollama
  model: gpt-4o
  api_key: ${OPENAI_API_KEY}  # Use environment variables

agents:
  - po
  - ux
  - frontend
  - qa
```

Set your API key as an environment variable:

```bash
export OPENAI_API_KEY=your-api-key-here
```

## Step 4 — Write Your First Task

Create a file named `task.md` in your project:

```markdown
# Task: Build a Landing Page

Create a simple landing page for a SaaS product called "Cloudify".

## Requirements
- Hero section with tagline and CTA
- Features section with 3 key benefits
- Pricing section with 3 tiers
- Footer with links

## Tech Stack
- HTML, CSS (Tailwind), vanilla JavaScript
- Responsive design, mobile-first
```

## Step 5 — Run JARFIS

```bash
jarfis run task.md
```

JARFIS will:
1. **PO Agent** reads and refines requirements
2. **UX Agent** creates wireframes and user flows
3. **Frontend Agent** builds the actual components
4. **QA Agent** reviews and verifies output

Watch the agents collaborate in real-time in your terminal.

## Step 6 — Review the Output

When complete, your output will be in the `output/` directory:

```
output/
├── index.html
├── styles.css
└── app.js
```

Open `output/index.html` in your browser to see the result.

## Next Steps

- Read [Concepts Overview](/en/docs/concepts-overview) to understand JARFIS architecture
- Explore [Guides](/en/docs) for more complex workflows
- Join [GitHub Discussions](https://github.com/sana-lazystar/jarfis/discussions) for community support

## Troubleshooting

**CLI not found after install?**
```bash
# Ensure npm global bin is in your PATH
export PATH="$PATH:$(npm bin -g)"
```

**LLM API errors?**
Check that your API key is correctly set and has sufficient quota.

**Agents taking too long?**
Complex tasks may take several minutes. Use `jarfis run --verbose` to see detailed progress.
