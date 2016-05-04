const express = require('express');
const _ = require('underscore');
const itemsService = require('../libs/itemsService');
const router = express.Router();

function total(items) {
  return items
    .map(item => item.total)
    .reduce((prev, current) => prev + current, 0);
}

router.get('/', (req, res) => {
  const cart = req.session.cart = req.session.cart || {items: {}};
  var promises = _.values(cart.items)
    .map(item => itemsService.getItem(item.id)
        .then(info => ({
          id: info.id,
          code: info.code,
          name: info.name,
          price: info.price,
          count: item.count,
          total: info.price * item.count
        })));


  Promise.all(promises)
    .then(values => ({
      items: values,
      total: total(values)
    }))
    .then(cart => res.render('cart', {title: 'カート', cart}));
});
router.post('/add', (req, res) => {
  const id = req.body.id;

  // Add item to cart
  const cart = req.session.cart = req.session.cart || {items: {}};
  const item = cart.items[id] = cart.items[id] || {id: id, count: 0};
  item.count++;

  res.redirect('/cart');
});

module.exports = router;
