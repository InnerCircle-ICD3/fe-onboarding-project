import { warn } from "../utills/warn";
import { getAmount, increase, reset } from "./amount";
import { formatNumberWithCommas } from "../utills/format";
import { addLog } from "./print-logs";
const $inputAmount = document.querySelector<HTMLInputElement>("#input-amount");
const $btnInsert = document.querySelector<HTMLButtonElement>("#btn-insert");
const $btnRefund = document.querySelector<HTMLButtonElement>("#btn-refund");

if ($inputAmount) {
  $inputAmount.value = formatNumberWithCommas(getAmount());
}

$btnInsert?.addEventListener("click", () => {
  if (!$inputAmount) return;

  const amount = inputToNumber($inputAmount.value);
  try {
    increase(amount);
    addLog("info", `${formatNumberWithCommas(amount)}원을 투입했습니다.`);
    $inputAmount.value = "0";
  } catch (error) {
    if (error instanceof Error) {
      addLog("error", error.message);
    }
  }
});

$btnRefund?.addEventListener("click", () => {
  if (!$inputAmount) return;
  try {
    const refundAmount = reset();
    addLog("info", `${formatNumberWithCommas(refundAmount)}원을 반환했습니다.`);
    $inputAmount.value = "0";
  } catch (error) {
    if (error instanceof Error) {
      addLog("error", error.message);
    }
  }
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
