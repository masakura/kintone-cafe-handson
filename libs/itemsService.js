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

const itemsService = {
  getItems() {
    return fetch(`${kintoneApp.base}records.json?app=${kintoneApp.id}`, {
      agent,
      headers: {
        'X-Cybozu-API-Token': kintoneApp.token
      }
    })
      .then(res => res.json())
      .then(data => {
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
  },

  getItem(id) {
    return fetch(`${kintoneApp.base}record.json?app=${kintoneApp.id}&id=${id}`, {
      agent,
      headers: {
        'X-Cybozu-API-Token': kintoneApp.token
      }
    })
      .then(res => res.json())
      .then(data => this.convert(data.record));
  },

  convert(row) {
    return {
      id: row.レコード番号.value,
      code: row.code.value,
      name: row.name.value,
      price: row.price.value,
      imageUri: row.imageUri.value || '://placehold.it/640x340?text=no image',
      summary: row.summary.value
    }
  }
};

module.exports = itemsService;
