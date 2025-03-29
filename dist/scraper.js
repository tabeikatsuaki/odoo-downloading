"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_core_1 = require("playwright-core");
/**
 * Odoo のダウンロードページから指定されたバージョンの Odoo をダウンロードする関数
 * @param page Playwright の Page オブジェクト
 * @param platformVersion ダウンロードする Odoo のプラットフォームバージョン
 * @param subscriptionCode サブスクリプションコード (必要に応じて)
 */
function downloadOdoo(page, platformVersion, subscriptionCode) {
    return __awaiter(this, void 0, void 0, function* () {
        // ダウンロードボタンをクリックしてウィザードを表示
        yield page.click(`a[data-platform-version="${platformVersion}"]`);
        // サブスクリプションコード入力テキストボックスに値を入力 (必要に応じて)
        if (subscriptionCode) {
            yield page.fill('input[name="subscription_code"]', subscriptionCode);
        }
        // ダウンロードボタンをクリック
        yield page.click('.oe_download_button');
        // ダウンロードが完了するまで待機
        const [download] = yield Promise.all([
            page.waitForEvent('download'),
            page.click('.oe_download_button'), // もう一度クリックする必要がある場合
        ]);
        // ダウンロードしたファイルを保存
        yield download.saveAs("./downloads/" + download.suggestedFilename());
        return download;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield playwright_core_1.chromium.launch({
        channel: 'chrome',
        headless: false,
    });
    const context = yield browser.newContext();
    const page = yield context.newPage();
    // Odoo のダウンロードページに移動
    yield page.goto('https://www.odoo.com/page/download');
    console.log("ダウンロードを開始します。");
    // Odoo 17e をダウンロード
    yield downloadOdoo(page, 'src_17e', 'M240307128994802');
    // Odoo 18e をダウンロード
    yield downloadOdoo(page, 'src_18e', 'M240307128994802');
    // // スクリーンショットを撮影 (確認用)
    // await page.screenshot({ path: "screenshot.png" });
    yield browser.close();
    console.log("ダウンロードが完了しました。");
}))();
//# sourceMappingURL=scraper.js.map