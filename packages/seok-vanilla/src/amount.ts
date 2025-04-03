import { formatNumberWithCommas } from "./utills/format";

let amount = 0;
const $insertedAmount = document.getElementById(
  "inserted-amount"
) as HTMLInputElement;

export function decrease(value: number) {
  if (amount - value < 0) {
    throw new Error("잔액이 부족합니다.");
  }
  amount -= value;
  $insertedAmount.value = formatNumberWithCommas(amount);
}

export function increase(value: number) {
  if (value <= 0) {
    throw new Error("금액이 0보다 작습니다.");
  }
  amount += value;
  $insertedAmount.value = formatNumberWithCommas(amount);
}

export function reset() {
  amount = 0;
  $insertedAmount.value = formatNumberWithCommas(amount);
}
