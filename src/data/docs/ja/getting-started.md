---
title: "クイックスタート"
description: "5分でJARFISを始めましょう。Claude Codeで/jarfisを実行すれば、9人の専門AIエージェントが最初の機能を一緒に作ります。"
category: "getting-started"
order: 1
locale: "ja"
translationOf: "en/getting-started"
lastUpdated: 2026-03-05
draft: false
---

# クイックスタート

1つのスラッシュコマンドで、9人の専門AIエージェントと共にソフトウェアを5分で開始しましょう。

## 前提条件

始める前に、以下の準備ができているか確認してください：

- **Claude Code**（Anthropic）— JARFISはClaude Codeの中でネイティブに動作します
- Claude APIアクセス権限を持つClaudeアカウント
- **Git** >= 2.x（プロジェクト初期化用）

> JARFISはClaude Codeスラッシュコマンドワークフローです。別途CLIのインストールは不要です。

## Step 1 — JARFISのインストール

JARFISはClaude Codeスラッシュコマンドパッケージとして配布されています。Claude Code内で実行してください：

```
/jarfis:install
```

現在のプロジェクトにJARFISワークフローが設定され、以下のファイルが作成されます：

```
your-project/
├── .jarfis/
│   ├── CLAUDE.md              # JARFISコンテキスト＆学習メモリ
│   ├── context.md             # プロジェクト固有AIコンテキスト
│   ├── jarfis-learnings.md    # 継続的学習ログ
│   └── works/                 # セッション別生成アーティファクト
├── .jarfis-state.json         # フェーズ状態追跡
└── CLAUDE.md                  # ルートClaude Codeコンテキスト
```

## Step 2 — 最初のワークフローを実行

プロジェクトディレクトリでClaude Codeを開き、入力してください：

```
/jarfis
```

JARFISが機能またはタスクの説明を求めます。例：

```
/jarfis JWTトークンを使ったユーザー認証システムの構築
```

## Step 3 — 9人のエージェントが協力する様子を確認

JARFISは9人の専門AIエージェントを8以上の構造化されたフェーズを通じて調整します：

| フェーズ | 名前 | 実行内容 |
|---------|------|---------|
| T | キックオフ | 要件収集、初期計画 |
| 0 | 基盤整備 | アーキテクチャ決定、技術スタック選定 |
| 1 | デザイン | UX仕様、API契約定義 |
| 2 | アーキテクチャ | システム設計、データモデル |
| 3 | 実装 | バックエンド＋フロントエンド並行開発 |
| 4 | 統合 | API連携、コンポーネント統合 |
| 4.5 | QA＆セキュリティ | テスト実行、脆弱性レビュー |
| 5 | デプロイ | インフラ、CI/CD、リリースノート |
| 6 | レトロスペクティブ | 学習記録、改善計画策定 |

あなたの代わりに働く9人のエージェント：

| エージェント | 役割 |
|------------|------|
| **PO（プロダクトオーナー）** | 要件定義、ユーザーストーリー作成 |
| **Architect** | システム設計、技術的意思決定 |
| **Tech Lead** | コード標準、レビュー、エージェント間調整 |
| **UX Designer** | ユーザー体験、ワイヤーフレーム、UX仕様 |
| **BE Engineer** | バックエンドAPI実装 |
| **FE Engineer** | フロントエンドUI実装 |
| **DevOps/SRE** | インフラ、CI/CD、デプロイ |
| **QA Engineer** | テスト戦略、テスト実行 |
| **Security Engineer** | セキュリティレビュー、脆弱性分析 |

## Step 4 — アーティファクトの確認

完了した各フェーズは`.jarfis/works/{日付}/{機能名}/`に構造化されたアーティファクトを生成します：

```
.jarfis/works/2026-03-05/feature/auth-system/
├── press-release.md       # 機能発表文草案
├── prd.md                 # プロダクト要件ドキュメント
├── impact-analysis.md     # 技術影響分析
├── architecture.md        # システムアーキテクチャ
├── api-spec.md            # API契約書
├── tasks.md               # 開発タスク分解
├── test-strategy.md       # QAプラン
├── ux-spec.md             # UX仕様書
├── deployment-plan.md     # リリース計画
├── review.md              # 実装後レビュー
└── retrospective.md       # 学習＆改善点
```

## Step 5 — 作業の継続またはミーティングの開催

以降のセッションで作業を継続する際、Claude CodeのPreCompactフックが`.jarfis-state.json`からJARFISの状態を自動的に復元します。

エージェント間の調整ミーティングを開催するには：

```
/jarfis:meeting
```

このコマンドで関連エージェントを集め、ブロッカーの解決、意思決定の調整、または次のフェーズの計画を行います。

## 次のステップ

- [アーキテクチャ＆概念](/ja/docs/concepts-overview) — JARFISの全体アーキテクチャを理解する
- [GitHub Discussions](https://github.com/sana-lazystar/jarfis/discussions) — コミュニティサポート

## トラブルシューティング

**`/jarfis`コマンドが見つかりませんか？**

プロジェクトにJARFISがインストールされているか確認してください。Claude Codeから`/jarfis:install`を再実行してください。

**エージェントに時間がかかりすぎますか？**

複雑な機能は複数のフェーズが必要な場合があります。`/jarfis:meeting`で状態を確認するか、エージェント間の意思決定を加速できます。

**セッション間で状態が失われましたか？**

プロジェクトルートの`.jarfis-state.json`を確認してください。PreCompactフックがこのファイルを読んでコンテキストを復元します。
