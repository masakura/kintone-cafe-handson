#### 修正してコミット
1. WebStorm で作業する
2. `routes/index.js` ファイルを書き換えてコミットする
3. GitHub に Push する

```javascript
  itemsService.getItems()
    .then(items => res.render('index', { title: '書き換えました!', items}));
    //                                           ~~~~~~~~~~~~~~~ ここを修正する
```
