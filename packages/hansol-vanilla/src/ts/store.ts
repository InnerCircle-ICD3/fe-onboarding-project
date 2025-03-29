export const BalanceManager = (() => {
  let balance = 0;

  return {
    get: () => balance,
    add: (value: number) => {
      balance += value;
      return balance;
    },
    purchase: (value: number) => {
      balance -= value;
      return balance;
    },
    reset: () => {
      balance = 0;
    }
  };
})();
