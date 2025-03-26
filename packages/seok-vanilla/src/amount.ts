function amount() {
  let amount = 0;
  const $insertedAmount = document.getElementById(
    "inserted-amount"
  ) as HTMLInputElement;

  function decrease(value: number) {
    if (amount - value < 0) {
      throw new Error("잔액이 부족합니다.");
    }
    amount -= value;
    $insertedAmount.value = amount.toLocaleString();
  }

  function increase(value: number) {
    if (value <= 0) {
      throw new Error("금액이 0보다 작습니다.");
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
