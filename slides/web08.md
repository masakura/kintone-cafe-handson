### プロジェクト設定
* 必要なライブラリをダウンロード
* kintone API の URL やトークンなどの設定

1. `package.json` を右クリックして `Run npm install` を選択
  - ちょっと時間かかります
2. `package.json` を右クリックして `Show npm scripts` を選択
3. `npm` ウインドウで `start` を右クリックして `Edit 'start' settings...` を選択
4. `Environment` の右の `...` をクリックして環境変数を設定
  * **KINTONE_BASE** - URL
    - `https://7nkse.cybozu.com/k/v1/`
  * **KINTONE_APP_ITEMS_ID** 商品管理アプリ ID
    - 34
  * **KINTONE_APP_ITEMS_TOKEN** 商品管理アプリの API トークン
5. `OK` ボタンをクリック
