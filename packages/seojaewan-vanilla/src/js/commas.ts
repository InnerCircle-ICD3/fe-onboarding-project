export const numberWithComma = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseNumberWithComma = (num: string): number => {
  return Number(num.replace(/,/g, ""));
};
