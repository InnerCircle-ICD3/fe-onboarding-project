let balance = 0;

export const getBalance = () => balance;

export const incrementBalance = (price) => {
  balance += price;
};

export const decrementBalance = (price) => {
  balance -= price;
};

export const resetBalance = (defaultPrice = 0) => {
  balance = defaultPrice;
};
