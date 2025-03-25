function amount() {
  let amount = 0;
  const $insertedAmount = document.getElementById(
    "inserted-amount"
  ) as HTMLInputElement;

  function decrease(value: number) {
    if (amount - value < 0) {
      // TODO : 음수 처리
      return;
    }
    amount -= value;
    $insertedAmount.value = amount.toLocaleString();
  }

  function increase(value: number) {
    if (value <= 0) {
      throw new Error("amount is less than 0");
    }
    amount += value;
    $insertedAmount.value = amount.toLocaleString();
  }

  function reset() {
    amount = 0;
    $insertedAmount.value = amount.toLocaleString();
  }

  return {
    decrease,
    increase,
    reset,
  };
}

export const { decrease, increase, reset } = amount();
