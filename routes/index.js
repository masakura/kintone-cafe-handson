const express = require('express');
const itemsService = require('../libs/itemsService');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const items = itemsService.getItems()
    .then(items => res.render('index', { title: 'たにやまショッピング', items}));
});

module.exports = router;
