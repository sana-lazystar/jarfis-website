---
title: "快速开始"
description: "5分钟内启动JARFIS。在Claude Code中运行/jarfis，让9位专业AI代理共同构建您的第一个功能。"
category: "getting-started"
order: 1
locale: "zh"
translationOf: "en/getting-started"
lastUpdated: 2026-03-05
draft: false
---

# 快速开始

一个斜杠命令，与9位专业AI代理一起，在5分钟内开始交付软件。

## 前提条件

开始之前，请确认以下准备就绪：

- **Claude Code**（Anthropic）— JARFIS在Claude Code内原生运行
- 具有Claude API访问权限的Claude账户
- **Git** >= 2.x（用于项目初始化）

> JARFIS是一个Claude Code斜杠命令工作流。无需单独安装CLI。

## 第1步 — 安装JARFIS

JARFIS以Claude Code斜杠命令包的形式分发。在Claude Code内运行：

```
/jarfis:install
```

这将在当前项目中设置JARFIS工作流，并创建：

```
your-project/
├── .jarfis/
│   ├── CLAUDE.md              # JARFIS上下文和学习记忆
│   ├── context.md             # 项目特定AI上下文
│   ├── jarfis-learnings.md    # 持续学习日志
│   └── works/                 # 每次会话生成的制品
├── .jarfis-state.json         # 阶段状态跟踪
└── CLAUDE.md                  # 根Claude Code上下文
```

## 第2步 — 运行第一个工作流

在项目目录中打开Claude Code并输入：

```
/jarfis
```

JARFIS将提示您输入功能或任务描述。例如：

```
/jarfis 构建使用JWT令牌的用户认证系统
```

## 第3步 — 观察9个代理协作

JARFIS通过8个以上的结构化阶段协调9位专业AI代理：

| 阶段 | 名称 | 执行内容 |
|------|------|---------|
| T | 启动 | 需求收集、初始规划 |
| 0 | 基础建设 | 架构决策、技术栈选择 |
| 1 | 设计 | UX规范、API合约定义 |
| 2 | 架构 | 系统设计、数据模型 |
| 3 | 实现 | 后端+前端并行开发 |
| 4 | 集成 | API对接、组件集成 |
| 4.5 | QA与安全 | 测试执行、漏洞审查 |
| 5 | 部署 | 基础设施、CI/CD、发布说明 |
| 6 | 复盘 | 学习记录、改进计划 |

为您工作的9个代理：

| 代理 | 角色 |
|------|------|
| **PO（产品负责人）** | 需求定义、用户故事编写 |
| **Architect（架构师）** | 系统设计、技术决策 |
| **Tech Lead（技术负责人）** | 代码标准、评审、代理间协调 |
| **UX Designer（UX设计师）** | 用户体验、线框图、UX规范 |
| **BE Engineer（后端工程师）** | 后端API实现 |
| **FE Engineer（前端工程师）** | 前端UI实现 |
| **DevOps/SRE** | 基础设施、CI/CD、部署 |
| **QA Engineer（QA工程师）** | 测试策略、测试执行 |
| **Security Engineer（安全工程师）** | 安全审查、漏洞分析 |

## 第4步 — 查看制品

每个完成的阶段都会在`.jarfis/works/{日期}/{功能名}/`中生成结构化制品：

```
.jarfis/works/2026-03-05/feature/auth-system/
├── press-release.md       # 功能公告草稿
├── prd.md                 # 产品需求文档
├── impact-analysis.md     # 技术影响分析
├── architecture.md        # 系统架构
├── api-spec.md            # API合约
├── tasks.md               # 开发任务分解
├── test-strategy.md       # QA计划
├── ux-spec.md             # UX规范
├── deployment-plan.md     # 发布计划
├── review.md              # 实现后审查
└── retrospective.md       # 学习与改进
```

## 第5步 — 继续工作或召开会议

在后续会话中继续工作时，Claude Code的PreCompact钩子会自动从`.jarfis-state.json`恢复JARFIS状态。

要召开代理间协调会议：

```
/jarfis:meeting
```

此命令召集相关代理，解决阻碍、对齐决策或规划下一阶段。

## 下一步

- [架构与概念](/zh/docs/concepts-overview) — 了解完整的JARFIS架构
- [GitHub Discussions](https://github.com/sana-lazystar/jarfis/discussions) — 社区支持

## 故障排查

**找不到`/jarfis`命令？**

确认项目中已安装JARFIS。从Claude Code重新运行`/jarfis:install`。

**代理运行太慢？**

复杂功能可能需要多个阶段。使用`/jarfis:meeting`检查状态或加速代理间决策。

**会话间状态丢失？**

检查项目根目录中的`.jarfis-state.json`。PreCompact钩子读取此文件以恢复上下文。
