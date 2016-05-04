const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const kintoneApp = {
  base: process.env['KINTONE_BASE'],
  id: process.env['KINTONE_APP_ITEMS_ID'],
  token: process.env['KINTONE_APP_ITEMS_TOKEN']
};

/* GET home page. */
router.get('/', (req, res) => {

  fetch(`${kintoneApp.base}records.json?app=${kintoneApp.id}`, {
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

      res.render('index', { title: 'たにやまショッピング', items: items});
    });
});

module.exports = router;
