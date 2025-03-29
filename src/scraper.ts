import { chromium, Page, Download } from 'playwright-core';
import dotenv from 'dotenv';

// .env ファイルを読み込む
dotenv.config();

/**
 * Odoo のダウンロードページから指定されたバージョンの Odoo をダウンロードする関数
 * @param page Playwright の Page オブジェクト
 * @param platformVersion ダウンロードする Odoo のプラットフォームバージョン
 * @param subscriptionCode サブスクリプションコード (必要に応じて)
 * @return ダウンロードオブジェクト
 */
async function downloadOdoo(
  page: Page,
  platformVersion: string,
  subscriptionCode: string,
): Promise<Download | null> {
  // Odoo のダウンロードページに移動
  await page.goto('https://www.odoo.com/page/download');
  // ダウンロードボタンをクリックしてウィザードを表示
  await page.click(`a[data-platform-version="${platformVersion}"]`);
  // サブスクリプションコード入力テキストボックスに値を入力
  await page.fill('input[name="subscription_code"]', subscriptionCode);
  // ダウンロードボタンをクリック
  await page.click('.oe_download_button');
  // ダウンロードが完了するまで待機
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('.oe_download_button'), // もう一度クリックする必要がある場合
  ]);
  // ダウンロードしたファイルを保存
  await download.saveAs("./downloads/" + download.suggestedFilename());

  return download;
}

/**
 * メイン関数
 */
async function main() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // .env からサブスクリプションコードを取得
  const subscriptionCode = process.env.SUBSCRIPTION_CODE;

  // サブスクリプションコードを取得できなかった場合はエラーを表示して終了
  if (!subscriptionCode) {
    console.error("サブスクリプションコードが設定されていないため終了します。");
    await browser.close();
    return;
  }

  console.log("ダウンロードを開始します。");

  // Odoo 17e をダウンロード
  await downloadOdoo(page, 'src_17e', subscriptionCode);
  // Odoo 18e をダウンロード
  await downloadOdoo(page, 'src_18e', subscriptionCode);

  // // スクリーンショットを撮影 (確認用)
  // await page.screenshot({ path: "screenshot.png" });

  await browser.close();

  console.log("ダウンロードが完了しました。");
};

/**
 * エントリーポイント
 */
(async () => await main())();