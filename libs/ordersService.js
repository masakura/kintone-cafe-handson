const debug = require('debug')('onlineshop:application');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
const CartService = require('./cartService');

/**
 * kintone API を呼び出すための情報。
 */
const kintoneApp = {
  // ex: https://7nkse.cybozu.com/k/v1/
  base: process.env['KINTONE_BASE'],
  // ex: 25
  id: process.env['KINTONE_APP_ORDERS_ID'],
  token: process.env['KINTONE_APP_ORDERS_TOKEN']
};
const agent = process.env['https_proxy'] ? new HttpsProxyAgent(process.env['https_proxy']) : null;

class OrdersService {
  constructor (req) {
    this._cartService = new CartService(req);
  }

  /**
   * 注文を追加します。
   * @param order {prefecture: string, address: string, fullName, string} 注文情報。
   * @returns {Promise.<*>}
     */
  addOrder(order) {
    return this._cartService.getCart()
      // カートの商品を kintone のレコード形式に変換する
      .then(cart => cart.items.map(item => ({
        value: {
          code: {
            value: item.code
          },
          name: {
            value: item.name
          },
          unitPrice: {
            value: item.price
          },
          number: {
            value: item.number
          }
        }
      })))
      // 住所・氏名をつけて kintone のレコード形式にする
      .then(details => ({
        app: kintoneApp.id,
        record: {
          prefecture: {
            value: order.prefecture
          },
          address: {
            value: order.address
          },
          fullName: {
            value: order.fullName
          },
          details: {
            value: details
          }
        }
      }))
      // kintone API で登録する
      .then(record => {
        // kintone API の URL を作る。
        // https://cybozudev.zendesk.com/hc/ja/articles/201941784-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9B%B4%E6%96%B0-PUT-#step2
        const uri = `${kintoneApp.base}record.json`;
        const json = JSON.stringify(record);

        debug(`POST ${uri}`);
        debug(json);

        return fetch(uri, {
          method: 'POST',
          body: json,
          agent,
          headers: {
            'Content-Type': 'application/json',
            'X-Cybozu-API-Token': kintoneApp.token
          }
        })
      })
      .then(res => {debug(res); return res;})
      // 戻り値を JSON に変換
      .then(res => res.json())
      .then(null, debug);
  }
}

module.exports = OrdersService;
