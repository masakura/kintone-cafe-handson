'use strict';

const ItemsService = require('../libs/itemsService');

/**
 * カートに格納されている商品一つとその個数を保持します。
 */
class CartItem {
  /**
   * 商品の情報を個数を利用し初期化します。
   * @param item 商品情報。
   * @param number 個数。
     */
  constructor(item, number) {
    this._item = item;
    this._number = number;
  }

  get id() {
    return this._item.id;
  }

  get code() {
    return this._item.code;
  }

  get name() {
    return this._item.name;
  }

  get price() {
    return this._item.price;
  }

  get number() {
    return this._number;
  }

  get total() {
    return this.price * this.number;
  }

  static calcTotal(items) {
    return items
      .map(item => item.total)
      .reduce((prev, current) => prev + current, 0);
  }
}

class CartService {
  /**
   * カートサービスを初期化します。
   * @param session カート情報を格納するセッション。
     */
  constructor(req) {
    this._cart = req.session.cart = req.session.cart || {items: []};
    this._itemsService = new ItemsService(req);
  }

  /**
   * カート情報を取得します。
   * @returns {Promise.<{items: *, total: *}>} カートの全商品と合計金額。
     */
  getCart() {
    return this.getItems()
      .then(items => ({items, total: CartItem.calcTotal(items)}));
  }

  /**
   * カートの全商品を取得します。
   * @returns {Promise.<Array>} カートの全商品。
     */
  getItems() {
    const items = this._cart.items;
    console.log(items);

    return this._itemsService.getItems(items.map(item => item.id))
      .then(items => items.map(item => new CartItem(item, this.findRawItem(item.id).number)));
  }

  /**
   * カートに商品を１つ追加します。
   * @param id 追加する商品のレコード ID。
     */
  addItem(id) {
    const item = this.findRawItem(id);

    if (item) {
      item.number++;
    } else {
      this._cart.items.push({id: id, number: 1});
    }
  }

  /**
   * カートにある全ての商品をクリアします。
   */
  clearAllItems() {
    this._cart.items = [];
  }

  /**
   * セッションに記録されているカートの商品情報を取得します。
   * @param id 商品のレコード ID。
   * @returns {*} 商品のレコード ID と個数。
   */
  findRawItem(id) {
    return this._cart.items.find(item => item.id === id);
  }
}

module.exports = CartService;
