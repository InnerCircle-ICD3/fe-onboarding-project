import productsData from '../db/productsData';

export const store = {
  products: [...productsData],
  balance: 0,

  getProducts() {
    return [...this.products];
  },

  getProductById(productId) {
    return this.products.find((product) => product.id === Number(productId));
  },

  getBalance() {
    return this.balance;
  },

  incrementBalance(amount) {
    this.balance += amount;
    return this.balance;
  },

  decrementBalance(amount) {
    this.balance -= amount;
    return this.balance;
  },

  resetBalance(defaultAmount = 0) {
    this.balance = defaultAmount;
    return this.balance;
  },
};
