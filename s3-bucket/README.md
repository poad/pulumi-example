# s3-bucket

AWS CDKを使用したS3バケットのプロビジョニングプロジェクト。このプロジェクトはCloudFormationを通じてAWSインフラストラクチャを管理しています。

## プロジェクト概要

`S3BucketStack` は、以下の設定を持つプライベートなS3バケット（`pulumi-states-store`）を作成します：

| 項目 | 設定 |
| ------ | ------ |
| **バケット名** | `pulumi-states-store` |
| **バージョニング** | 無効 |
| **暗号化** | S3マネージド |
| **アクセス制御** | プライベート（公開アクセスなし） |
| **スタック削除時** | オブジェクト自動削除 |
| **削除ポリシー** | DESTROY |

## 前提条件

- Node.js: LTS バージョン以降
- pnpm: バージョン10以上
- AWS認証情報: `aws configure` または環境変数で設定済み
- AWS CDK CLI: インストール済み（通常は `npm install -g aws-cdk` で）

## セットアップ

### インストール

```bash
# ルートディレクトリから
pnpm install

# またはs3-bucketディレクトリから
cd s3-bucket
pnpm install
```

### 環境確認

```bash
# AWS認証情報の確認
aws sts get-caller-identity

# CDKが正しくインストールされているか確認
cdk --version
```

## 主要なコマンド

### ビルド・開発

```bash
# TypeScriptをJavaScriptにコンパイル
pnpm build

# 開発時のウォッチモード（ファイル変更を自動検出）
pnpm watch
```

### テスト

```bash
# すべてのテストを実行（vitest）
pnpm test

# 特定のテストファイルを実行
pnpm test test/s3-bucket.test.ts

# パターンに一致するテストを実行
pnpm test --grep "pattern"

# ウォッチモードでテスト実行
pnpm test --watch
```

### CloudFormation

```bash
# 合成されたCloudFormationテンプレートを表示
pnpm cdk synth

# テンプレートを出力ファイルに保存
pnpm cdk synth > template.yaml

# CloudFormationテンプレートをプレビュー
pnpm cdk diff
```

### デプロイ

```bash
# 変更内容をプレビュー（デプロイ前に必須）
pnpm cdk diff

# スタックをデプロイ（初回は確認あり）
pnpm cdk deploy

# 確認なしでデプロイ（CI/CD環境向け）
pnpm cdk deploy --require-approval never

# スタックを削除
pnpm cdk destroy
```

## プロジェクト構成

```text
s3-bucket/
├── bin/
│   └── s3-bucket.ts              # CDKアプリのエントリーポイント
├── lib/
│   └── s3-bucket-stack.ts        # スタック定義
├── test/
│   └── s3-bucket.test.ts         # テストファイル
├── package.json                  # 依存パッケージ定義
├── tsconfig.json                 # TypeScript設定
├── eslint.config.ts              # ESLint設定
├── cdk.json                      # CDK設定
└── README.md                     # このファイル
```

### ファイルの説明

- **bin/s3-bucket.ts**: CDKアプリケーションの実行エントリーポイント。スタックをインスタンス化
- **lib/s3-bucket-stack.ts**: スタック定義ファイル。S3バケットのリソース構成を定義
- **test/s3-bucket.test.ts**: Vitestを使用したユニットテスト
- **cdk.json**: CDKツールキットへの指示。コンテキスト値やアセット設定を含む

## コード規約

このプロジェクトは以下の規約に従います：

- **TypeScript**: ストリクトモード有効（`strict: true`）
- **フォーマッティング**: 2スペースインデント、シングルクォート、常に末尾のカンマ
- **リント**: ESLint（`@stylistic/eslint-plugin` 使用）
- **セミコロン**: 常に必須
- **アロー関数**: 括弧常に必須

詳細は [../AGENTS.md](../AGENTS.md) を参照してください。

## トラブルシューティング

### AWS認証情報エラー

```text
Error: Cannot find a default credential provider
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

### CDKバージョンの不整合

```bash
# CDK依存パッケージを最新にアップデート
pnpm update aws-cdk-lib constructs
```

### デプロイの失敗

```bash
# キャッシュをクリア
rm -rf cdk.out

# 再度デプロイを試行
pnpm cdk deploy
```

## ベストプラクティス

1. **本番環境へのデプロイ前**
   - 必ず `pnpm cdk diff` で変更内容を確認
   - テストを実行して動作確認
   - 別のAWSアカウント/環境で事前テスト

2. **スタック管理**
   - スタック名は分かりやすい名前に
   - リソースにはタグを付与して管理
   - 削除ポリシーを意図的に設定

3. **セキュリティ**
   - シークレット情報は環境変数またはAWS Secretsで管理
   - IAM権限は最小権限の原則に従う
   - S3バケットは常にプライベートアクセスに設定

## 参考資料

- [AWS CDK ドキュメント](https://docs.aws.amazon.com/cdk/latest/guide/)
- [AWS CDK API リファレンス](https://docs.aws.amazon.com/cdk/api/latest/)
- [CloudFormation ドキュメント](https://docs.aws.amazon.com/cloudformation/)
- [AWS S3 ドキュメント](https://docs.aws.amazon.com/s3/)
- [Vitest ドキュメント](https://vitest.dev/)

## 詳細情報

詳細なコーディングガイドラインとワークスペース全体のコマンドについては、ルートディレクトリの [README.md](../README.md) および [AGENTS.md](../AGENTS.md) を参照してください。
