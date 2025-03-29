import { render } from "@testing-library/react";
import TotalPrice from ".";

const TOTAL_PRICE = "1,000";

describe("TotalPrice 컴포넌트 테스트", () => {
  it("totalPrice props가 전달되면 totalPrice 요소와 함께 렌더링이 된다.", () => {
    const { getByText } = render(<TotalPrice totalPrice={TOTAL_PRICE} />);
    const totalPrice = getByText(TOTAL_PRICE);

    expect(totalPrice).toBeInTheDocument();
  });
});
