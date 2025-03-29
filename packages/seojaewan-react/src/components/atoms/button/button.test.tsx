import { fireEvent, render } from "@testing-library/react";
import Button from ".";
import { vi } from "vitest";

const CHILDREN = "Test Button";

describe("Button 컴포넌트 테스트", () => {
  it("children props가 전달되면 button 요소와 함께 렌더링된다.", () => {
    const { getByRole } = render(<Button>{CHILDREN}</Button>);
    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(CHILDREN);
  });

  it("onClick props가 전달되면 클릭 이벤트가 발생했을 때 해당 함수가 호출된다.", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>{CHILDREN}</Button>
    );
    const button = getByRole("button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled props가 true일 때 버튼이 비활성화된다.", () => {
    const { getByRole } = render(<Button disabled={true}>{CHILDREN}</Button>);
    const button = getByRole("button");

    expect(button).toBeDisabled();
  });
});
