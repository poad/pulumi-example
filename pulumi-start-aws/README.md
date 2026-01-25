# pulumi-start-aws

Pulumiを使用してTypeScriptでAWSインフラストラクチャをプログラムで管理するプロジェクトです。このテンプレートではシンプルなS3バケットを作成してプロビジョニングします。

## プロジェクト概要

このPulumiプロジェクトは以下の機能を提供します：

| 機能 | 説明 |
| ------ | ------ |
| **S3バケット作成** | 簡単なS3バケットのプロビジョニング |
| **スタック出力** | バケット名をエクスポートして他スタックから参照可能 |
| **複数環境対応** | `dev` スタックを使用した環境管理 |
| **インフラコード化** | TypeScriptでインフラストラクチャを定義 |

## 前提条件

- **Node.js**: バージョン14以上（推奨: LTS）
- **pnpm**: バージョン10以上
- **Pulumi CLI**: バージョン3以上
  - インストール: <https://www.pulumi.com/docs/get-started/install/>
- **AWS認証情報**: 以下のいずれかで設定済み
  - `aws configure` コマンド
  - 環境変数（`AWS_ACCESS_KEY_ID` など）
  - IAM ロール（EC2など）

## セットアップ

### インストール

```bash
# ルートディレクトリから
pnpm install

# またはpulumi-start-awsディレクトリから
cd pulumi-start-aws
pnpm install
```

### Pulumiアカウント・スタック確認

```bash
# ログイン状態確認
pulumi whoami

# 現在のスタック確認
pulumi stack ls

# dev スタックが存在しない場合は作成
pulumi stack init dev

# または開発スタックを選択
pulumi stack select dev
```

## 主要なコマンド

### フォーマット・リント

```bash
# フォーマットをチェック（修正しない）
pnpm fmt:check

# コードをフォーマット（修正）
pnpm fmt

# リントをチェック
pnpm oxlint

# リント問題を自動修正
pnpm oxlint:fix

# フォーマット・リント完全実行
pnpm lint

# フォーマット・リント・修正
pnpm lint-fix
```

### プレビュー・デプロイ

```bash
# 変更内容をプレビュー（デプロイ前に確認）
pulumi preview

# 特定のスタックを指定
pulumi preview --stack dev

# インフラストラクチャをデプロイ
pulumi up

# スタックを指定してデプロイ
pulumi up --stack dev

# 確認なしでデプロイ（CI/CD環境向け）
pulumi up --yes

# 変更履歴を表示
pulumi stack history
```

### リソース管理

```bash
# スタック情報を表示
pulumi stack info

# スタック出力を表示
pulumi stack output

# 特定の出力値を取得
pulumi stack output bucketName

# リソースを削除
pulumi destroy

# 特定のスタックを削除
pulumi destroy --stack dev

# スタック自体を削除（リソース削除後）
pulumi stack rm dev
```

## プロジェクト構成

```text
pulumi-start-aws/
├── index.ts                      # Pulumiメインプログラム
├── Pulumi.yaml                   # プロジェクトメタデータ
├── Pulumi.dev.yaml              # dev スタック設定
├── package.json                 # 依存パッケージ定義
├── tsconfig.json                # TypeScript設定
├── .oxlintrc.json               # Oxlint（リンター）設定
├── .oxfmtrc.json                # Oxfmt（フォーマッタ）設定
└── README.md                    # このファイル
```

### ファイルの説明

- **index.ts**: Pulumiプログラムのメインファイル
  - S3バケットの作成
  - バケット名をエクスポート

- **Pulumi.yaml**: プロジェクト全体のメタデータ
  - プロジェクト名
  - Pulumi言語ランタイム
  - 説明

- **Pulumi.dev.yaml**: `dev` スタック専用の設定
  - AWS リージョン設定（デフォルト: `us-east-1`）

## 設定管理

### 環境変数でリージョン指定

```bash
# プレビュー時にリージョンを指定
PULUMI_AWS_REGION=ap-northeast-1 pulumi preview

# デプロイ時にリージョンを指定
PULUMI_AWS_REGION=ap-northeast-1 pulumi up
```

### Pulumi設定で管理

```bash
# 現在のスタック設定を確認
pulumi config

# リージョンを設定
pulumi config set aws:region ap-northeast-1

# 設定値を削除
pulumi config rm aws:region
```

### Pulumi.yaml で設定

`Pulumi.dev.yaml` に直接記述：

```yaml
config:
  aws:region: ap-northeast-1
```

## デプロイワークフロー

### 初回デプロイ

```bash
# 1. 依存関係をインストール
pnpm install

# 2. コードをフォーマット・リント
pnpm lint

# 3. プレビューで変更内容を確認
pulumi preview --stack dev

# 4. デプロイを実行
pulumi up --stack dev

# 5. バケット名を取得
pulumi stack output bucketName
```

### 更新・デプロイ

```bash
# 1. index.ts を編集

# 2. フォーマット・リント
pnpm lint-fix

# 3. 変更内容をプレビュー
pulumi preview

# 4. デプロイ
pulumi up --yes
```

### リソース削除

```bash
# 1. リソースを削除
pulumi destroy --stack dev

# 2. スタックを削除（オプション）
pulumi stack rm dev
```

## コード規約

このプロジェクトは以下の規約に従います：

- **TypeScript**: ストリクトモード有効（`strict: true`）
- **フォーマッティング**: Oxfmt を使用（2スペースインデント）
- **リント**: Oxlint を使用（TypeScript、Unicorn、OXC プラグイン）
- **インポート**: ES6モジュール構文、 unused vars は `oxlint-disable-next-line` で除外可能

詳細は [../AGENTS.md](../AGENTS.md) を参照してください。

## トラブルシューティング

### Pulumi CLI インストール問題

```bash
# macOS (Homebrew)
brew install pulumi

# Linux / Windows
curl -fsSL https://get.pulumi.com | sh
```

### AWS認証情報エラー

```text
Error: no valid credentials found
```

**解決方法:**

```bash
# AWS認証情報を設定
aws configure

# または環境変数を設定
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key
export AWS_DEFAULT_REGION=us-east-1
```

### スタックが見つからない

```text
error: stack 'dev' not found
```

**解決方法:**

```bash
# スタックを作成
pulumi stack init dev

# または既存スタックから選択
pulumi stack ls
pulumi stack select <stack-name>
```

### デプロイ失敗時の対応

```bash
# スタック状態をリフレッシュ
pulumi refresh

# 最新の状態を確認
pulumi stack info

# ロック状態をクリア（最終手段）
pulumi cancel
```

## ベストプラクティス

1. **本番環境へのデプロイ前**
   - 必ず `pulumi preview` で変更内容を確認
   - 開発環境で事前テスト
   - リソースのタグ付けで管理

2. **スタック管理**
   - 環境ごと（dev, staging, prod）にスタックを分ける
   - スタック設定は環境ファイル（Pulumi.*.yaml）で管理
   - パスワード/シークレットはPulumiシークレット機能で管理

3. **セキュリティ**
   - AWS認証情報をコミットしない
   - IAM権限は最小権限の原則に従う
   - S3バケットは用途に応じたアクセス制御を設定

4. **バージョン管理**
   - `Pulumi.lock` ファイルを git で管理
   - 依存パッケージは pnpm-lock.yaml で管理

## リソース参照

プロビジョニング後、出力されたバケット名を他のPulumiスタックから参照：

```typescript
import * as pulumi from '@pulumi/pulumi';

const pulumiStartAwsStack = new pulumi.automation.Stack({
  stackName: 'pulumi-start-aws/dev',
  projectName: 'pulumi-start-aws',
});

const bucketNameOutput = pulumiStartAwsStack.getOutput('bucketName');
```

## 参考資料

- [Pulumi ドキュメント](https://www.pulumi.com/docs/)
- [Pulumi AWS プロバイダー](https://www.pulumi.com/docs/reference/pkg/aws/)
- [AWS TypeScript SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Oxlint ドキュメント](https://oxc-project.github.io/docs/)

## 詳細情報

詳細なコーディングガイドラインとワークスペース全体のコマンドについては、ルートディレクトリの [README.md](../README.md) および [AGENTS.md](../AGENTS.md) を参照してください。
