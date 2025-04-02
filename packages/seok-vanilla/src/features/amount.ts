import { NotEnoughtMoneyError } from "../erros/NotEnoughtMoney.error";
import { formatNumberWithCommas } from "../utills/format";

let amount = 0;
const $insertedAmount = document.getElementById(
  "inserted-amount"
) as HTMLInputElement;

$insertedAmount.value = formatNumberWithCommas(amount);

export function decrease(value: number) {
  if (amount - value < 0) {
    throw new NotEnoughtMoneyError();
  }
  amount -= value;
  $insertedAmount.value = formatNumberWithCommas(amount);
}

export function increase(value: number) {
  if (value < 100) {
    throw new Error("금액이 100원 이상 입력해주세요.");
  }
  amount += value;
  $insertedAmount.value = formatNumberWithCommas(amount);
}

export function reset() {
  const currentAmount = amount;
  if (amount <= 0) {
    throw new Error("잔액이 없습니다.");
  }
  amount = 0;
  $insertedAmount.value = formatNumberWithCommas(amount);
  return currentAmount;
}

export function getAmount() {
  return amount;
}
