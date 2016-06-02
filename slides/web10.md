### ファイル構成

* **views/*.ejs** - HTML テンプレート
  - **index.ejs** が商品一覧用
* **routes/*.js** - ルーター JS
  - **index.ejs** が商品一覧用
* **libs/*.js** - kintone API ととの通信 JS
  - **itemsService.js** - 商品一覧


#### views/index.ejs
Underscore.js のテンプレートを使って、商品名や説明、価格などを表示している

```html
          <div class="card-block">
            <h4 class="card-title"><%= item.name %></h4>
            <p class="card-text">
              <%= item.summary %>
            </p>
          </div>
```

* **item.id** - 商品のレコード ID
* **item.name** - 商品名
* **item.summary** - 説明
* **item.price** - 単価


#### routes/index.js
商品一覧を取得して、テンプレートに渡しているだけ!

```javascript
router.get('/', (req, res) => {
  const items = itemsService.getItems()
    .then(items => res.render('index', { title: 'たにやまショッピング', items}));
});
```

#### libs/itemsService.js
商品管理アプリから商品の情報を取得する **今回はここを実装してもらいます!**


```javascript
// 設定の取り込み

const kintoneApp = {
  // ex: https://7nkse.cybozu.com/k/v1/
  base: process.env['KINTONE_BASE'],
  // ex: 21
  id: process.env['KINTONE_APP_ITEMS_ID'],
  token: process.env['KINTONE_APP_ITEMS_TOKEN']
};
```
```javascript
const itemsService = {
  getItems() {
    // ここを実装します
    return Promise.resolve([]);
  },
  getItem(id) {
    // ここを実装します
    return Promise.resolve({});
  },
}
```
