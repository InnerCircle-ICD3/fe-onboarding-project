import { beforeEach, describe, expect, it } from 'vitest';
import productsData from '../db/productsData';
import { store } from '../js/store';

describe('store', () => {
  beforeEach(() => {
    store.products = [...productsData];
    store.resetBalance();
  });

  describe('getProducts()', () => {
    it('모든 상품 리스트를 반환해야 한다.', () => {
      const products = store.getProducts();
      expect(products).toEqual(store.products);
    });
  });

  describe('getProductById()', () => {
    it('상품 ID를 매개변수로 받아서 해당하는 상품을 반환해야 한다.', () => {
      const product = productsData[0];
      const findProduct = store.getProductById(product.id);
      expect(findProduct).toEqual(product);
    });

    it('존재하지 않는 상품 ID를 받으면 undefined를 반환해야 한다.', () => {
      const findProduct = store.getProductById('123456789010');
      expect(findProduct).toBeUndefined();
    });
  });

  describe('getBalance()', () => {
    it('현재 잔액을 반환해야 한다.', () => {
      const balance = store.getBalance();
      expect(balance).toBe(0);
    });
  });

  describe('incrementBalance()', () => {
    it('매개변수로 받은 금액만큼 잔액을 증가시키고 새 잔액을 반환해야 한다.', () => {
      const initialBalance = store.getBalance();
      const amount = 1000;

      const newBalance = store.incrementBalance(amount);

      expect(newBalance).toBe(initialBalance + amount);
      expect(store.getBalance()).toBe(initialBalance + amount);
    });
  });

  describe('decrementBalance()', () => {
    it('매개변수로 받은 금액만큼 잔액을 감소시키고 새 잔액을 반환해야 한다.', () => {
      const initialBalance = store.getBalance();
      const amount = 1000;

      const newBalance = store.decrementBalance(amount);

      expect(newBalance).toBe(initialBalance - amount);
      expect(store.getBalance()).toBe(initialBalance - amount);
    });
  });

  describe('resetBalance()', () => {
    it('잔액을 초기화하고 새 잔액을 반환해야 한다.', () => {
      store.incrementBalance(5000);
      store.resetBalance();
      expect(store.getBalance()).toBe(0);
    });

    it('기본값이 있을시 해당 값으로 설정해야 한다.', () => {
      const defaultAmount = 1000;
      store.incrementBalance(5000);
      store.resetBalance(defaultAmount);
      expect(store.getBalance()).toBe(defaultAmount);
    });
  });
});
