const debug = require('debug')('express-prottype:server');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const kintoneApp = {
  // ex: https://7nkse.cybozu.com/k/v1/
  base: process.env['KINTONE_BASE'],
  // ex: 21
  id: process.env['KINTONE_APP_ITEMS_ID'],
  token: process.env['KINTONE_APP_ITEMS_TOKEN']
};
const agent = process.env['https_proxy'] ? new HttpsProxyAgent(process.env['https_proxy']) : null;

class ItemsService {
  getItems(ids) {
    // レコード ID でフィルターをかける
    let params = '';
    if (ids) {
      const query = encodeURIComponent(`$id in (${ids.join(',')})`);
      params += `&query=${query}`;
    }

    const uri = `${kintoneApp.base}records.json?app=${kintoneApp.id}${params}`;
    debug(uri);

    return fetch(uri, {
      agent,
      headers: {
        'X-Cybozu-API-Token': kintoneApp.token
      }
    })
      // 戻り値を JSON からオブジェクトに変換。
      .then(res => res.json())
      .then(data => {
        const records = data.records || [];

        // 商品情報の形式を、kintone の形式から表示に適した形に変換する。
        const items = records
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
      })
      .then(null, debug);
  }
}

module.exports = ItemsService;
