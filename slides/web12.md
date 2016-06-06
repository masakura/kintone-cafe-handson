### 他の API 呼び出すの実装
#### 商品を一つ取得
カートに商品情報を表示したり、受注情報を作るために使われる

```javascript
// libs/itemsServce.js
  getItem(id) {
    return fetch(`${kintoneApp.base}record.json?app=${kintoneApp.id}&id=${id}`, {
      agent,
      headers: {
        'X-Cybozu-API-Token': kintoneApp.token
      }
    })
      .then(res => res.json())
      .then(data => ({
        id: row.レコード番号.value,
        code: row.code.value,
        name: row.name.value,
        price: row.price.value,
        imageUri: row.imageUri.value || '://placehold.it/640x340?text=no image',
        summary: row.summary.value
    }));
  },
```


#### 受注を登録
受注を登録するために使われる

本当は個々も実装してもらおうと思ったけど... 結構大変だったので却下!


#### 受注を登録
この部分で、カートに登録された商品を商品管理アプリから取得する

ToDo もっと見やすく書き換える...

```javascript
    const promises = order.items
      .map(item => {
        return itemsService.getItem(item.id)
          .then(info => ({ /* ... */ }))
      });
```
