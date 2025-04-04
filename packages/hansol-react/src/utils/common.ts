export function getInputNumberValue(input: HTMLInputElement | null): number {
  if (!input) return NaN;
  const raw = input.value.replace(/,/g, '');
  return Number(raw);
}

export function formatCurrencyKRW(amount: number): string {
  return amount.toLocaleString('ko-KR');
}

export function appendParticle(str: string) {
  const firstHangulCode = '가'.charCodeAt(0);
  const hanguleLastConsonantCount = 28;
  const lastCharCode = str.charCodeAt(str.length - 1);
  const particle = (lastCharCode - firstHangulCode) % hanguleLastConsonantCount ? '을' : '를';
  return str + particle;
}