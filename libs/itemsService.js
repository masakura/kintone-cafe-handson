const debug = require('debug')('onlineshop:application');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

/**
 * kintone API を呼び出すための情報。
 */
const kintoneApp = {
  // ex: https://7nkse.cybozu.com/k/v1/
  base: process.env['KINTONE_BASE'],
  // ex: 21
  id: process.env['KINTONE_APP_ITEMS_ID'],
  token: process.env['KINTONE_APP_ITEMS_TOKEN']
};
const agent = process.env['https_proxy'] ? new HttpsProxyAgent(process.env['https_proxy']) : null;

/**
 * kintone API を利用して商品情報を取得します。
 */
class ItemsService {
  /**
   * 商品情報を取得します。
   * @param ids 取得する商品のレコード ID のコレックション。(全て取得するときは省略)
   * @returns {Promise.<Array.<{id: *, code: *, name: *, price: *, imageUri: *, summary: *}>>} 商品情報。
     */
  getItems(ids) {
    // レコード ID が指定されていた場合は、そのレコード ID のみ取得する。
    let params = '';
    if (ids) {
      const query = encodeURIComponent(`$id in (${ids.join(',')})`);
      params += `&query=${query}`;
    }

    // kintone API の URL を作る。
    // https://cybozudev.zendesk.com/hc/ja/articles/202331474-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E5%8F%96%E5%BE%97-GET-#step2
    const uri = `${kintoneApp.base}records.json?app=${kintoneApp.id}${params}`;
    debug(`GET ${uri}`);

    // kintone API を呼び出す。
    return fetch(uri, {
      agent,
      headers: {
        'X-Cybozu-API-Token': kintoneApp.token
      }
    })
      .then(res => {debug(res); return res;})
      // 戻り値を JSON からオブジェクトに変換。
      .then(res => res.json())
      .then(data => {
        const records = data.records || [];

        // 商品情報の形式を、kintone の形式から表示に適した形式に変換する。
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
