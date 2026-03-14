---
title: "Architecture & Concepts"
description: "JARFISのコアアーキテクチャを理解しましょう: オーケストレーションモデル、9つのAgent、9段階のPhaseパイプライン、3つのHuman Gate、状態管理、学習システム。"
category: "concepts"
order: 1
locale: "ja"
lastUpdated: 2026-03-05
draft: false
---

# Architecture & Concepts

JARFISが9つの専門AIAgentを構造化されたPhaseパイプラインで調整し、プロダクションソフトウェアを出荷する方法。

## オーケストレーションモデル

JARFISは**Claude Code**の中でスラッシュコマンドワークフローとして動作します。別途CLIツールや外部サービスではなく、Claude Code環境を活用して9つの専門Agentをフェーズパイプラインで調整します:

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

## 9つのAgentの役割

各Agentは明確に定義された責任範囲を持ちます。Agentは役割が必要な場合にのみ活性化され、`.jarfis-state.json`の`required_roles`フィールドで制御されます:

| Agent | 主要な責務 |
|-------|-----------|
| **Product Owner (PO)** | 要件明確化のための逆質問、Working Backwards報道文作成、PRD作成 |
| **Architect** | 実現可能性評価、影響分析、システムアーキテクチャ設計、ADR作成 |
| **Tech Lead** | API spec検討、タスク分解、コードレビュー、Retrospectiveのリード |
| **UX Designer** | 画面およびインタラクション設計（`required_roles.ux`がtrueの場合のみ活性化） |
| **Backend Engineer** | バックエンドサービス、API、データモデルの実装 |
| **Frontend Engineer** | UIコンポーネント、フロントエンドロジック、統合の実装 |
| **DevOps/SRE** | インフラ、CI/CDパイプライン、デプロイ設定の構成 |
| **QA Engineer** | テスト戦略の定義、QA検証の実行 |
| **Security Engineer** | 事前セキュリティ分析およびセキュリティレビューの実施 |

## 9段階のPhaseパイプライン

JARFISはすべてのワークフローを9つの定義されたPhaseで構造化します。各Phaseは特定の入力値、出力物、担当Agentを持ちます。Phaseはプロジェクト要件に応じて条件付きでスキップできます。

### Phase T — Triage
受信したリクエストをA/B/Cタイプに分類し、適切なワークフローの深さと必要なAgentを決定します。

### Phase 0 — Pre-flight
Git状態を同期し、作業ブランチを作成し、学習ファイル(`jarfis-learnings.md`、`context.md`、`project-profile.md`)を読み込みます。

### Phase 1 — Discovery
POが逆質問で要件を完全に把握した後、Working Backwards文書とPRDを作成します。Architectが実現可能性を評価します。その後**Gate 1** — ユーザーが承認、修正、または中断を選択します。

### Phase 2 — Architecture & Planning
Architectが影響分析とシステム設計を行います。`api_spec_required`がtrueの場合はAPI specを作成します。Tech Leadがタスクを分解し、QA Engineerがテスト戦略を定義します。

### Phase 3 — UX Design（条件付き）
プロジェクトにUI作業が必要な場合(`required_roles.ux`がtrue)にのみ活性化されます。UX Designerが画面設計とインタラクション仕様を作成します。Phase 2と3の後に**Gate 2**が続きます。

### Phase 4 — Implementation
Backend、Frontend、DevOpsエンジニアが並行して作業し、各自の役割に該当する部分のみを実装します。進行状況は`tasks.md`で追跡します。

### Phase 4.5 — Operational Readiness
ReviewPhaseの前にデプロイ戦略、ロールバック計画、運用準備状態を整えます。

### Phase 5 — Review & QA
API契約検証が最初に実行された後、Tech Lead、QA Engineer、Security Engineerの並行レビューが行われます。**Gate 3** — ユーザーが承認、修正後再レビュー要求、中断、または根本的な設計問題発見時に設計再検討を選択します。

### Phase 6 — Retrospective
学習内容がグローバルな`jarfis-learnings.md`とプロジェクト固有の`context.md`に蓄積され、将来のワークフローを改善します。

## 3つのHuman Gate

GateはユーザーがワークフローのDirectionをコントロールする必須の承認チェックポイントです:

| Gate | 位置 | 選択肢 |
|------|------|--------|
| **Gate 1** | Phase 1後 | 承認 / 修正 / 中断 |
| **Gate 2** | Phase 2 & 3後 | 承認 / 修正 / 中断 |
| **Gate 3** | Phase 5後 | 承認 / 修正後再レビュー / 中断 / 設計再検討（根本的な設計問題の場合） |

Gateを通過するまで、いかなるPhaseも進行しません。

## 11のアーティファクト

JARFISワークフローは作業ディレクトリに最大11の構造化された文書を生成します:

| アーティファクト | Phase | 作成者 |
|----------------|-------|--------|
| Working Backwards（報道文） | 1 | PO |
| PRD | 1 | PO |
| 実現可能性評価 | 1 | Architect |
| 影響分析 | 2 | Architect |
| Architecture / ADR | 2 | Architect |
| API specification | 2 | Architect / Tech Lead |
| タスク分解（`tasks.md`） | 2 | Tech Lead |
| テスト戦略 | 2 | QA Engineer |
| UX specification | 3 | UX Designer |
| デプロイ / ロールバック計画 | 4.5 | DevOps/SRE |
| レビューレポート | 5 | Tech Lead / QA / Security |

## 状態管理

JARFISはプロジェクトルートの`.jarfis-state.json`でワークフロー状態を追跡します。実際のスキーマは以下のとおりです:

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

主要フィールド:
- **`current_phase`** — 現在アクティブなPhaseを示す数値または`"done"`
- **`required_roles`** — どのAgentを活性化するかを制御するbooleanフラグ
- **`api_spec_required`** — API specificationドキュメントの作成が必要かどうか
- **`workspace`** — プロジェクト構造のメタデータ（monorepo、multi-projectなど）
- **`phases`** — Phase別の状態追跡（pending / in_progress / completed / skipped）
- **`last_checkpoint`** — 最後に保存された進行地点のタイムスタンプと要約

## 学習システム

JARFISは2段階の学習システムを通じて、ワークフローを重ねるごとに進化します:

### グローバル学習: `~/.claude/jarfis-learnings.md`
ユーザーのホームディレクトリに保存され、すべてのプロジェクトで共有されます。以下を含みます:
- **Agent Hints** — Retrospectiveから蓄積された行動ルール
- **Workflow Patterns** — 効果が検証された繰り返しパターン

### プロジェクトコンテキスト: `.jarfis/context.md`
Agentプロンプトに注入されるプロジェクト固有の知識:
- 技術スタックの詳細とコンベンション
- ビジネスドメインの知識
- 統合上の制約と既存パターン

### プロジェクトプロファイル: `.jarfis/project-profile.md`
`/jarfis:project-init`で生成され、`/jarfis:project-update`で更新されます。プロジェクトの構造、依存関係、設定を説明します。

## ミーティングシステム

`/jarfis:meeting` コマンドは計画のための構造化されたキックオフミーティングを開始します:

```
/jarfis:meeting Define the authentication strategy for the mobile app
```

ミーティング結果は以降のワークフローで `--meeting` フラグを使って参照できます:

```
/jarfis:work Implement auth system --meeting auth-strategy-meeting
```

これにより、ミーティングで決定された事項がワークフローの入力コンテキストとして連携され、計画と実行の整合性が保証されます。

## 設計原則

1. **専門化** — 各Agentは1つのドメインで深い専門知識を持ちます。すべてをこなそうとするAgentはいません
2. **段階的デリバリー** — 構造化されたPhaseは完全性を保証します。どのステップも誤ってスキップされることはありません
3. **Human Gate** — 重要な決定は3つの定められたチェックポイントで明示的なユーザー承認を必要とします
4. **条件付き活性化** — AgentとPhaseは関連がある場合にのみ活性化されます（例: CLIツールにはUX Phaseなし）
5. **Stateful** — 作業は`.jarfis-state.json`を通じてセッション境界を越えて維持されます
6. **継続的学習** — すべてのRetrospectiveはグローバルおよびプロジェクト学習を通じて将来のワークフローを改善します
7. **Claude Codeネイティブ** — 外部サービスなしで開発環境内で完全に実行されます

## 次のステップ

- [Quick Start](/ja/docs/getting-started) — JARFISのインストールと最初のワークフロー実行
- [API Reference](/ja/docs/api-reference) — すべてのコマンドと設定の詳細情報
- [Guides & Customization](/ja/docs/guides-customization) — 高度なワークフローパターン
