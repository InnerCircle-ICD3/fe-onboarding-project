import { warn } from "./utills/warn";
import { increase, reset } from "./amount";
import { formatNumberWithCommas } from "./utills/format";

const $inputAmount = document.querySelector<HTMLInputElement>("#input-amount");
const $btnInsert = document.querySelector<HTMLButtonElement>("#btn-insert");
const $btnRefund = document.querySelector<HTMLButtonElement>("#btn-refund");

$btnInsert?.addEventListener("click", () => {
  if (!$inputAmount) return;
  const amount = inputToNumber($inputAmount.value);
  increase(amount);
  $inputAmount.value = "0";
});

$btnRefund?.addEventListener("click", () => {
  if (!$inputAmount) return;
  reset();
  $inputAmount.value = "0";
});

$inputAmount?.addEventListener("beforeinput", (e) => {
  const regex = /^[0-9]+$/;
  const value = e.data;

  if (value && !regex.test(value)) {
    warn("숫자만 입력해주세요");
    e.preventDefault();
  }
});

// 입력 값을 숫자로 변환하고 쉼표를 추가
$inputAmount?.addEventListener("input", (e) => {
  const value = inputToNumber($inputAmount.value);
  $inputAmount.value = formatNumberWithCommas(value);
});

function inputToNumber(value: string) {
  return Number(value.replace(/,/g, ""));
}
