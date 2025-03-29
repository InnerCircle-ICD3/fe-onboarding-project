import { fireEvent, render } from "@testing-library/react";
import PriceInput from ".";

const DEFAULT_VALUE = "0";
const INVALID_VALUE = "test";

describe("PriceInput 컴포넌트 테스트", () => {
  it("초기값이 0으로 설정된다.", () => {
    const { getByTestId } = render(<PriceInput />);
    const input = getByTestId("price-input") as HTMLInputElement;

    expect(input.value).toBe(DEFAULT_VALUE);
  });

  it("숫자가 아닌 문자 'test'가 입력되면 value가 변경되지 않는다.", () => {
    const { getByTestId } = render(<PriceInput />);
    const input = getByTestId("price-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: INVALID_VALUE } });
    expect(input.value).toBe(DEFAULT_VALUE);
  });
});
