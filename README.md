# pulumi-example

AWS CDKとPulumiを使用した複数のインフラストラクチャ・アズ・コード（IaC）プロジェクトを含むモノレポです。

## プロジェクト概要

このリポジトリでは、AWSにおけるインフラストラクチャ・アズ・コード（IaC）の2つの実装手法を示しています：

| プロジェクト | フレームワーク | 目的 | 言語 |
| --------- | ----------- | --------- | ---------- |
| **s3-bucket** | AWS CDK | CloudFormationを使用したS3バケットの作成・管理 | TypeScript |
| **pulumi-start-aws** | Pulumi | プログラムによるAWSリソースのプロビジョニング | TypeScript |

## リポジトリ構成

```text
pulumi-example/
├── s3-bucket/                    # AWS CDK TypeScriptプロジェクト
│   ├── bin/                      # CDKアプリのエントリーポイント
│   ├── lib/                      # スタック・コンストラクト定義
│   ├── test/                     # ユニットテスト（vitest）
│   ├── package.json
│   ├── tsconfig.json
│   ├── eslint.config.ts
│   └── cdk.json
│
├── pulumi-start-aws/             # Pulumi TypeScriptプロジェクト
│   ├── index.ts                  # Pulumiメインプログラム
│   ├── Pulumi.yaml               # プロジェクトメタデータ
│   ├── package.json
│   ├── tsconfig.json
│   ├── .oxlintrc.json            # Oxlint設定
│   └── .oxfmtrc.json             # Oxfmt設定
│
├── package.json                  # ルートワークスペース設定
├── pnpm-workspace.yaml           # モノレポワークスペース定義
├── .editorconfig                 # エディタ設定
├── AGENTS.md                     # AIエージェント用コーディングガイドライン
└── README.md                     # このファイル
```

## クイックスタート

### 前提条件

- **Node.js**: LTS バージョン以降
- **pnpm**: バージョン10以上（`pnpm install -g pnpm`）
- **AWS認証情報**: `aws configure` または環境変数で設定済み
- **Pulumi CLI**（オプション、pulumi-start-awsのみで使用）: <https://www.pulumi.com/docs/get-started/install/>

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd pulumi-example

# すべての依存関係をインストール
pnpm install
```

## ワークスペースコマンド

### インストール・ビルド

```bash
# すべてのワークスペースの依存関係をインストール
pnpm install

# すべてのプロジェクトをビルド
pnpm -r --if-present build

# 特定のプロジェクトをビルド
pnpm -C s3-bucket build
pnpm -C pulumi-start-aws build
```

### リント・フォーマッティング

```bash
# すべてのプロジェクトをリント
pnpm -r --if-present lint

# 特定のプロジェクトをリント
pnpm -C s3-bucket lint                 # ESLint
pnpm -C pulumi-start-aws lint          # Oxlint + Oxfmt

# フォーマット・リントの問題を修正
pnpm -C pulumi-start-aws lint-fix
```

### テスト実行

```bash
# すべてのテストを実行
pnpm -r --if-present test

# s3-bucketでvitestを使用したテスト実行
pnpm -C s3-bucket test

# 特定のテストファイルを実行
pnpm -C s3-bucket test -- test/s3-bucket.test.ts

# パターンに一致するテストを実行
pnpm -C s3-bucket test -- --grep "pattern"
```

## プロジェクト詳細

### s3-bucket（AWS CDK）

CloudFormationを使用したインフラストラクチャ・アズ・コードのAWS CDKプロジェクト。

**主要なコマンド:**

```bash
# TypeScriptをJavaScriptにコンパイル
pnpm -C s3-bucket build

# 開発時のウォッチモード
pnpm -C s3-bucket watch

# 合成されたCloudFormationテンプレートを表示
pnpm -C s3-bucket cdk synth

# AWSにデプロイ（AWS認証情報が必要）
pnpm -C s3-bucket cdk deploy

# デプロイ済みの状態と現在の状態を比較
pnpm -C s3-bucket cdk diff

# テストを実行
pnpm -C s3-bucket test
```

**スタック:** `S3BucketStack` は以下の設定で `pulumi-states-store` というプライベートS3バケットを作成します：

- バージョニング：無効
- サーバー側暗号化：S3マネージド
- スタック削除時にオブジェクトを自動削除
- アクセス：プライベートのみ

**詳細:** [s3-bucket/README.md](./s3-bucket/README.md) を参照

### pulumi-start-aws（Pulumi）

TypeScriptを使用したインフラストラクチャ・アズ・コードのPulumiプロジェクト。

**主要なコマンド:**

```bash
# フォーマットをチェック
pnpm -C pulumi-start-aws fmt:check

# フォーマットを修正
pnpm -C pulumi-start-aws fmt

# リントをチェック
pnpm -C pulumi-start-aws oxlint

# リント問題を修正
pnpm -C pulumi-start-aws oxlint:fix

# フォーマット・リント完全実行
pnpm -C pulumi-start-aws lint

# 変更をプレビュー
pulumi preview --stack dev

# インフラストラクチャをデプロイ
pulumi up --stack dev

# リソースを削除
pulumi destroy --stack dev
```

**プログラム:** S3バケットを作成し、その名前を他のスタックから参照できるようエクスポートします。

**設定:**

- `Pulumi.yaml` — プロジェクトメタデータ
- `Pulumi.dev.yaml` — `dev` 環境のスタック設定
- `pulumi config set キー 値` で編集可能

**詳細:** [pulumi-start-aws/README.md](./pulumi-start-aws/README.md) を参照

## コード規約・ガイドライン

このリポジトリはTypeScriptと品質管理に関する厳格な標準に従っています：

- **TypeScript**: ストリクトモード有効、完全型チェック
- **フォーマッティング**: 2スペースインデント、LFで改行（editorconfig）
- **リント**: ESLint（s3-bucket）と Oxlint（pulumi-start-aws）
- **インポート**: ES6モジュール構文、名前付きエクスポート推奨
- **命名規則**: クラスはPascalCase、関数・変数はcamelCase
- **エラーハンドリング**: Try-catchパターン、型付きエラーレスポンス
- **ドキュメント**: エクスポートされたアイテムにはJSDocコメント

**詳細コーディングガイドラインは [AGENTS.md](./AGENTS.md) を参照してください。**

## CI/CD パイプライン

`main` ブランチへのプッシュおよびプルリクエストで自動実行されます：

1. pnpmで依存関係をインストール
2. すべてのリントチェックを実行
3. すべてのプロジェクトをビルド

`.github/workflows/ci.yml` で設定

## 開発ワークフロー

### s3-bucket での開発

```bash
cd s3-bucket
pnpm install
pnpm build
pnpm test
pnpm lint
```

### pulumi-start-aws での開発

```bash
cd pulumi-start-aws
pnpm install
pnpm fmt:check && pnpm oxlint
pulumi preview
pulumi up  # デプロイする場合
```

## 参考資料

- [AWS CDK ドキュメント](https://docs.aws.amazon.com/cdk/latest/guide/)
- [Pulumi ドキュメント](https://www.pulumi.com/docs/)
- [AWS SDK for TypeScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)

## ライセンス

詳細は [LICENSE](./LICENSE) ファイルを参照してください。
