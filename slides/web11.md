### 商品一覧を実装する
商品管理アプリから商品一覧を取り出す実装を書く

```javascript
// libs/itemsServce.js
  getItems() {
    // ここを実装します
    return Promise.resolve([]);
  },
```

#### まずは通信する
こんな感じに書き換えて、WebStorm 左下の再起動ボタンをクリックし、ブラウザーをリロードする

```javascript
// libs/itemsServce.js
  getItems() {
    return fetch(`${kintoneApp.base}records.json?app=${kintoneApp.id}`, {
      agent,
      headers: {
        'X-Cybozu-API-Token': kintoneApp.token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return [];
      });
  }
  ```

うまくいくと、コンソールに商品データが表示される


#### ビューに合わせてデータ変換
先ほどの商品一覧テンプレートと kintone API の JSON データには食い違いがあるので、データ変換をする

```javascript
      .then(res => res.json())
      .then(data => {
        console.log(data);

        const items = data.records
          .map(row => ({
            id: row.レコード番号.value,
            code: row.code.value,
            name: row.name.value,
            price: row.price.value,
            imageUri: row.imageUri.value || '://placehold.it/640x340?text=no image',
            summary: row.summary.value
          }));
        items.sort((a, b) => a.id - b.id);

        return items;
      });
```

終わったら、再起動 & リロード! うまくいけば商品一覧が表示される!
