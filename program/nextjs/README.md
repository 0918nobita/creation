# Next.js アプリケーション

## セットアップ

```bash
yarn
```

`.env.local` ファイルを作成し、firebase に関する情報を以下のように記入してください。

```ini
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
```

## 起動方法

```bash
yarn dev
```

## ビルド方法

```bash
yarn build
```

### Bundle Analyzer によるレポートも併せて出力する

```bash
ANALYZE=true yarn build
```

`.next/analyze` ディレクトリ内に HTML ファイルが生成されます

## ライセンス一覧を生成する

```bash
yarn generate-licenses
```
