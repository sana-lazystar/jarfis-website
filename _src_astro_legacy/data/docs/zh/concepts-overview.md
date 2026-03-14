---
title: "Architecture & Concepts"
description: "了解JARFIS核心架构：编排模型、9个Agent、9阶段Phase流水线、3个Human Gate、状态管理以及学习系统。"
category: "concepts"
order: 1
locale: "zh"
lastUpdated: 2026-03-05
draft: false
---

# Architecture & Concepts

JARFIS如何通过结构化的Phase流水线协调9个专业AI Agent，交付生产级软件。

## 编排模型

JARFIS在**Claude Code**内以斜杠命令工作流的形式运行。它不是独立的CLI工具或外部服务，而是利用Claude Code环境，通过分阶段流水线协调9个专业Agent:

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

## 9个Agent角色

每个Agent都有明确界定的职责范围。Agent仅在需要其角色时才会激活，由`.jarfis-state.json`中的`required_roles`字段控制:

| Agent | 主要职责 |
|-------|---------|
| **Product Owner (PO)** | 通过反向提问明确需求、编写Working Backwards新闻稿、撰写PRD |
| **Architect** | 评估可行性、执行影响分析、设计系统架构、编写ADR |
| **Tech Lead** | 审查API spec、分解任务、进行代码评审、主导Retrospective |
| **UX Designer** | 设计界面和交互（仅在`required_roles.ux`为true时激活） |
| **Backend Engineer** | 实现后端服务、API、数据模型 |
| **Frontend Engineer** | 实现UI组件、前端逻辑、集成 |
| **DevOps/SRE** | 搭建基础设施、CI/CD流水线、部署配置 |
| **QA Engineer** | 定义测试策略、执行QA验证 |
| **Security Engineer** | 执行预先安全分析和安全评审 |

## 9阶段Phase流水线

JARFIS将每个工作流结构化为9个定义明确的Phase。每个Phase都有特定的输入、输出和负责的Agent。Phase可根据项目需求有条件地跳过。

### Phase T — Triage
将传入请求分类为A/B/C类型，以确定适当的工作流深度和所需的Agent。

### Phase 0 — Pre-flight
同步Git状态，创建工作分支，并加载学习文件（`jarfis-learnings.md`、`context.md`、`project-profile.md`）。

### Phase 1 — Discovery
PO通过反向提问充分理解需求，然后编写Working Backwards文档和PRD。Architect评估可行性。之后进入**Gate 1** — 用户选择批准、修订或终止。

### Phase 2 — Architecture & Planning
Architect执行影响分析和系统设计。若`api_spec_required`为true，则编写API spec。Tech Lead分解任务，QA Engineer定义测试策略。

### Phase 3 — UX Design（条件触发）
仅在项目需要UI工作时（`required_roles.ux`为true）激活。UX Designer创建界面设计和交互规范。Phase 2和3完成后进入**Gate 2**。

### Phase 4 — Implementation
Backend、Frontend和DevOps工程师并行工作，各自仅实现与其角色相关的部分。进度通过`tasks.md`跟踪。

### Phase 4.5 — Operational Readiness
在评审阶段之前准备好部署策略、回滚计划和运营就绪状态。

### Phase 5 — Review & QA
首先执行API合约验证，随后由Tech Lead、QA Engineer和Security Engineer并行进行评审。**Gate 3** — 用户可选择批准、请求修订并重新评审、终止，或在发现根本性设计问题时触发设计重审。

### Phase 6 — Retrospective
学习成果积累至全局`jarfis-learnings.md`和项目专属`context.md`，持续改进未来的工作流。

## 3个Human Gate

Gate是用户控制工作流方向的强制审批检查点:

| Gate | 位置 | 可选操作 |
|------|------|---------|
| **Gate 1** | Phase 1之后 | 批准 / 修订 / 终止 |
| **Gate 2** | Phase 2 & 3之后 | 批准 / 修订 / 终止 |
| **Gate 3** | Phase 5之后 | 批准 / 修订并重新评审 / 终止 / 重新审视设计（存在根本性设计问题时） |

在通过Gate之前，任何后续Phase均不会推进。

## 11个制品

JARFIS工作流在工作目录中最多生成11份结构化文档:

| 制品 | Phase | 作者 |
|------|-------|------|
| Working Backwards（新闻稿） | 1 | PO |
| PRD | 1 | PO |
| 可行性评估 | 1 | Architect |
| 影响分析 | 2 | Architect |
| Architecture / ADR | 2 | Architect |
| API specification | 2 | Architect / Tech Lead |
| 任务分解（`tasks.md`） | 2 | Tech Lead |
| 测试策略 | 2 | QA Engineer |
| UX specification | 3 | UX Designer |
| 部署 / 回滚计划 | 4.5 | DevOps/SRE |
| 评审报告 | 5 | Tech Lead / QA / Security |

## 状态管理

JARFIS在项目根目录的`.jarfis-state.json`中跟踪工作流状态。实际模式如下:

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

关键字段:
- **`current_phase`** — 表示当前活跃Phase的数字或`"done"`
- **`required_roles`** — 控制哪些Agent被激活的布尔标志
- **`api_spec_required`** — 是否需要编写API specification文档
- **`workspace`** — 项目结构元数据（monorepo、multi-project等）
- **`phases`** — 各Phase状态跟踪（pending / in_progress / completed / skipped）
- **`last_checkpoint`** — 最后保存的进度节点的时间戳和摘要

## 学习系统

JARFIS通过两级学习系统在工作流中不断进化:

### 全局学习: `~/.claude/jarfis-learnings.md`
存储在用户主目录，跨所有项目共享。包含:
- **Agent Hints** — 从Retrospective中积累的行为规则
- **Workflow Patterns** — 经过验证的有效重复模式

### 项目上下文: `.jarfis/context.md`
注入Agent提示的项目专属知识:
- 技术栈详情与规范
- 业务领域知识
- 集成约束与现有模式

### 项目配置文件: `.jarfis/project-profile.md`
由`/jarfis:project-init`生成，由`/jarfis:project-update`更新。描述项目结构、依赖关系和配置。

## 会议系统

`/jarfis:meeting` 命令启动用于规划的结构化启动会议:

```
/jarfis:meeting Define the authentication strategy for the mobile app
```

会议结果可在后续工作流中通过 `--meeting` 标志引用:

```
/jarfis:work Implement auth system --meeting auth-strategy-meeting
```

这将会议决策作为工作流的输入上下文进行关联，确保规划与执行之间的对齐。

## 设计原则

1. **专业化** — 每个Agent在一个领域拥有深厚专业知识；没有试图包揽一切的Agent
2. **分阶段交付** — 结构化Phase确保完整性；没有步骤会被意外跳过
3. **Human Gate** — 重要决策在3个明确的检查点需要用户明确批准
4. **条件激活** — Agent和Phase仅在相关时才激活（例如：CLI工具不触发UX Phase）
5. **有状态** — 工作通过`.jarfis-state.json`跨越会话边界持续保存
6. **持续学习** — 每次Retrospective通过全局和项目学习改进未来工作流
7. **Claude Code原生** — 无需外部服务，完全在开发环境内运行

## 下一步

- [Quick Start](/zh/docs/getting-started) — 安装JARFIS并运行第一个工作流
- [API Reference](/zh/docs/api-reference) — 所有命令与配置详情
- [Guides & Customization](/zh/docs/guides-customization) — 高级工作流模式
