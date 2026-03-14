---
title: "クイックスタート"
description: "JARFISをインストールし、9つの専門Agentと構造化されたPhaseで最初のAI駆動ソフトウェア開発ワークフローを実行しましょう。"
category: "getting-started"
order: 1
locale: "ja"
lastUpdated: 2026-03-05
draft: false
---

# クイックスタート

AIとともにソフトウェアを出荷しましょう — スラッシュコマンド1つ、9つの専門Agent、Human Gateで構成された構造化されたPhase。

## 前提条件

始める前に、以下の準備ができているか確認してください:

- **Claude Code** (Anthropic) — JARFISはClaude Codeの中でスラッシュコマンドワークフローとしてネイティブに動作します
- APIアクセス権限を持つClaudeアカウント
- **Git** >= 2.x (Phase 0のブランチ管理に必要)
- [JARFIS GitHubリポジトリ](https://github.com/sana-lazystar/jarfis)をクローンしたか、アクセス可能な状態

## インストール

JARFISはGitHubリポジトリの `install.sh` スクリプトでインストールします。ターミナルで以下のコマンドを実行してください:

```bash
bash install.sh
```

このコマンドはClaude Code環境にJARFISスラッシュコマンドを登録します。インストール後、以下のプロジェクト構造が利用可能になります:

```
your-project/
├── .jarfis/
│   ├── context.md             # プロジェクト固有コンテキスト
│   └── project-profile.md     # プロジェクトプロファイル
├── .jarfis-state.json         # ワークフロー状態追跡
└── ~/.claude/
    └── jarfis-learnings.md    # グローバル学習ファイル（プロジェクト横断）
```

> **注意**: `/jarfis:install` コマンドは存在しません。インストールは必ず `bash install.sh` で行います。

## 最初のワークフローを実行する

Claude Codeでプロジェクトディレクトリを開き、ワークフローを開始します:

```
/jarfis:work Build a user authentication system with JWT tokens
```

JARFISはリクエストを分類(Phase T — Triage)した後、専門AIAgentが担当する構造化されたPhaseを順に案内します。

## 9つのPhase

すべてのワークフローは最大9つのPhaseを経ます。該当しない場合はPhaseをスキップします(例: UIが不要な場合はPhase 3を省略):

| Phase | 名前 | 実行内容 |
|-------|------|---------|
| T | Triage | リクエストをA/B/Cタイプに分類 |
| 0 | Pre-flight | Git同期、ブランチ作成、学習ファイル読み込み |
| 1 | Discovery | POの逆質問、Working Backwards、PRD、実現可能性評価 |
| 2 | Architecture & Planning | 影響分析、設計、API spec、タスク分解、テスト戦略 |
| 3 | UX Design | 画面設計（条件付き — UIが必要な場合のみ） |
| 4 | Implementation | BE/FE/DevOps並行実装 |
| 4.5 | Operational Readiness | デプロイ戦略、ロールバック計画、運用準備 |
| 5 | Review & QA | API契約検証、Tech Lead + QA + Securityレビュー |
| 6 | Retrospective | 学習蓄積（グローバルlearnings + プロジェクトcontext） |

## 9つのAgent

JARFISは9つの専門Agentを調整しており、各Agentは現在のPhaseとプロジェクト要件に関係する場合にのみ活性化されます:

| Agent | 役割 |
|-------|------|
| **Product Owner (PO)** | 逆質問、Working Backwards、PRD作成 |
| **Architect** | 実現可能性評価、影響分析、アーキテクチャ設計、ADR |
| **Tech Lead** | API spec検討、タスク分解、コードレビュー、Retrospective |
| **UX Designer** | 画面設計、インタラクション設計 |
| **Backend Engineer** | バックエンド実装 |
| **Frontend Engineer** | フロントエンド実装 |
| **DevOps/SRE** | インフラおよびCI/CD実装 |
| **QA Engineer** | テスト戦略、QA検証 |
| **Security Engineer** | 事前セキュリティ分析、セキュリティレビュー |

## Human Gate

JARFISは次のPhaseに進む前に明示的な承認が必要な3つのGateを含んでいます:

| Gate | タイミング | 選択肢 |
|------|-----------|--------|
| Gate 1 | Phase 1 (Discovery) 後 | 承認 / 修正 / 中断 |
| Gate 2 | Phase 2 & 3 (Architecture + UX) 後 | 承認 / 修正 / 中断 |
| Gate 3 | Phase 5 (Review & QA) 後 | 承認 / 修正後再レビュー / 中断 / 設計再検討 |

これらのGateにより、主要なマイルストーンごとに方向を自分でコントロールできます。

## 次のステップ

- [Architecture & Concepts](/ja/docs/concepts-overview) でJARFIS全体のオーケストレーションモデルを理解する
- [API Reference](/ja/docs/api-reference) ですべてのコマンドと設定を確認する
- [Guides & Customization](/ja/docs/guides-customization) で高度なワークフローパターンを参照する
