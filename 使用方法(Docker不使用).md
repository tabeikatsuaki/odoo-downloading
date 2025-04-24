# 使用方法

## .env.exampleより.envファイルを作成

```bash
cp .env.example .env
```

## .envの環境変数を入力

```environment
SUBSCRIPTION_CODE=Odooのサブスクリプションコード
ODOO17E_PATH=Odoo17eの圧縮ファイルをコピーするディレクトリパス
ODOO18E_PATH=Odoo18eの圧縮ファイルをコピーするディレクトリパス
```

## package.jsonにて定義している依存関係をインストール

```bash
npm install
```

## Chromeがインストールされていなければ、Chomeをインストール

```bash
npx playwright install chrome
```

## TypeScriptファイルをビルド

```bash
npm run build
```

※ srcディレクトリ以下のTypeScriptファイルがトランスパイルされてdistディレクトリにJavaScriptファイルなどが生成されます。

## JavaScriptを実行

```bash
npm run start
```

※ これによりOdoo17とOdoo18の企業版の圧縮ファイルがdownloadsディレクトリにダウンロードされます。

## Odoo17企業版の圧縮ファイルを指定のディレクトリにコピー

```bash
make cp-odoo17e
```

## Odoo18企業版の圧縮ファイルを指定のディレクトリにコピー

```bash
make cp-odoo18e
```
