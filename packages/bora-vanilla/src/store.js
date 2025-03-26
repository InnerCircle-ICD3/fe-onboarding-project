import productsData from './db/productsData';

export const store = {
  products: [...productsData],
  balance: 0,

  getProducts() {
    return [...this.products];
  },

  getProductById(productId) {
    return this.products.find(
      (product) => product.id === Number(productId)
    );
  },

  getBalance() {
    return this.balance;
  },

  incrementBalance(price) {
    this.balance += price;
    return this.balance;
  },

  decrementBalance(price) {
    this.balance -= price;
    return this.balance;
  },

  resetBalance(defaultPrice = 0) {
    this.balance = defaultPrice;
    return this.balance;
  },
};
