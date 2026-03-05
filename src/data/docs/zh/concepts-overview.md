---
title: "架构与概念"
description: "理解JARFIS核心架构：9位专业代理、8个以上结构化阶段、11个制品，以及PreCompact状态系统。"
category: "concepts"
order: 1
locale: "zh"
translationOf: "en/concepts-overview"
lastUpdated: 2026-03-05
draft: false
---

# 架构与概念

JARFIS如何协调9位专业AI代理来交付生产级软件。

## 编排模型

JARFIS以**Claude Code作为编排器**构建。与单代理系统不同，JARFIS通过结构化的阶段流水线协调9位专业代理——每位都有独特的角色：

```
/jarfis 命令
      │
      ▼
┌─────────────────────────────────────────────────────┐
│              JARFIS 编排器                           │
│  （阶段协调、制品路由、状态管理）                      │
└─────────────────────────────────────────────────────┘
      │
      ├──► PO代理          （需求、用户故事）
      ├──► Architect       （系统设计、ADR）
      ├──► Tech Lead       （标准、审查、协调）
      ├──► UX Designer     （线框图、UX规范）
      ├──► BE Engineer     （后端实现）
      ├──► FE Engineer     （前端实现）
      ├──► DevOps/SRE      （基础设施、CI/CD）
      ├──► QA Engineer     （测试、质量关卡）
      └──► Security Engineer（安全审查、CVE分析）
```

## 9个代理角色

| 代理 | 主要职责 | 核心制品 |
|------|---------|---------|
| **Product Owner (PO)** | 需求定义、用户故事编写、待办优先级 | `press-release.md`, `prd.md` |
| **Architect** | 系统设计、技术决策、ADR文档 | `architecture.md`, `impact-analysis.md` |
| **Tech Lead** | 代码标准、PR审查标准、代理间协调 | `tasks.md`, `review.md` |
| **UX Designer** | 用户流程、线框图、组件规范 | `ux-spec.md` |
| **BE Engineer** | API实现、数据模型、后端服务 | `api-spec.md`、后端代码 |
| **FE Engineer** | UI组件、状态管理、前端集成 | 前端代码 |
| **DevOps/SRE** | 基础设施代码、CI/CD流水线、部署 | `deployment-plan.md` |
| **QA Engineer** | 测试策略、测试用例编写、质量关卡 | `test-strategy.md` |
| **Security Engineer** | 威胁建模、漏洞审查、合规性 | `review.md`中的安全审查 |

## 阶段流水线（8个以上阶段）

JARFIS通过定义的阶段来结构化每次功能交付：

| 阶段 | 名称 | 目的 | 主要代理 |
|------|------|------|---------|
| T | 启动 | 确立功能范围并收集需求 | PO, Architect |
| 0 | 基础建设 | 技术和架构决策 | Architect, Tech Lead |
| 1 | 设计 | UX规范和API合约定义 | UX Designer, Architect, BE |
| 2 | 架构 | 完整系统设计、数据模型 | Architect, BE, FE |
| 3 | 实现 | 并行后端和前端开发 | BE, FE |
| 4 | 集成 | API对接、端到端集成 | BE, FE, Tech Lead |
| 4.5 | QA与安全 | 测试执行、安全审计 | QA, Security |
| 5 | 部署 | 生产部署、监控设置 | DevOps, Tech Lead |
| 6 | 复盘 | 记录学习、改进规划 | 所有代理 |

## 11个制品

每个JARFIS工作流在`.jarfis/works/{日期}/{功能名}/`中生成最多11个结构化制品：

| 制品 | 目的 |
|------|------|
| `press-release.md` | 以客户语言撰写的功能公告 |
| `prd.md` | 产品需求文档 |
| `impact-analysis.md` | 技术风险和范围分析 |
| `architecture.md` | 系统设计、组件图、ADR |
| `api-spec.md` | API合约（端点、类型、认证） |
| `tasks.md` | 按阶段划分的开发任务 |
| `test-strategy.md` | 测试计划、覆盖率目标 |
| `ux-spec.md` | 线框图、组件规范、交互设计 |
| `deployment-plan.md` | 发布计划、回滚策略 |
| `review.md` | 实现后的代码和安全审查 |
| `retrospective.md` | 阶段学习和改进行动 |

## 状态管理：`.jarfis-state.json`

JARFIS在项目根目录的`.jarfis-state.json`中维护工作流状态。此文件由**PreCompact钩子**在每次Claude Code会话开始时读取，恢复精确的阶段和上下文。

## PreCompact钩子

PreCompact钩子是在上下文压缩前运行的Claude Code生命周期集成：

1. 从`.jarfis-state.json`**读取**当前阶段和代理状态
2. 将相关制品摘要**注入**压缩后的上下文
3. **保留**`jarfis-learnings.md`中的关键决策和学习
4. **恢复**当前阶段的活跃代理视角

## 学习系统

JARFIS通过两种学习机制持续改进：

**`jarfis-learnings.md`**：每次第6阶段复盘后更新的项目级知识库。

**`context.md`**：注入每个代理提示的项目特定上下文。

## 会议系统（`/jarfis:meeting`）

当代理需要同步时——解决阻碍、做出共同决定、对齐范围——可以召开结构化会议：

```
/jarfis:meeting
```

## 设计原则

1. **专业化** — 每个代理在一个领域拥有深厚专业知识
2. **制品驱动** — 每个阶段产生可审查的、人类可读的输出
3. **阶段关卡** — 没有前一阶段的制品，下一阶段不会开始
4. **有状态** — 工作通过`.jarfis-state.json`跨越会话边界保持
5. **学习** — 每个项目通过学习系统使下一个项目更快
6. **Claude Code原生** — 无需外部服务，完全在开发环境内运行

## 下一步

- [快速开始](/zh/docs/getting-started) — 运行第一个`/jarfis`工作流
- [GitHub](https://github.com/sana-lazystar/jarfis) — 源码与问题
