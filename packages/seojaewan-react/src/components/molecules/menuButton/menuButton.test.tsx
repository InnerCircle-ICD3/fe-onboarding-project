import { fireEvent, render, screen } from "@testing-library/react";
import MenuButton from ".";
import { MouseEvent } from "react";
import { vi } from "vitest";

const PROPS = {
  name: "Test Menu",
  value: 1000,
};

describe("MenuButton 컴포넌트 테스트", () => {
  it("name과 value가 전달되면 name과 value가 컨텐츠로 포함되고 name 속성과 value 속성이 들어간 버튼이 렌더링된다.", () => {
    render(<MenuButton name={PROPS.name} value={PROPS.value} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute("name", PROPS.name);
    expect(button).toHaveAttribute("value", PROPS.value.toString());

    expect(screen.getByText(PROPS.name)).toBeInTheDocument();
    expect(screen.getByText(PROPS.value.toString())).toBeInTheDocument();
  });

  it("버튼을 클릭하면 onClick 함수가 호출되고 event에서 name과 value를 받아올 수 있다.", () => {
    const handleClick = vi.fn();

    render(
      <MenuButton name={PROPS.name} value={PROPS.value} onClick={handleClick} />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({
        currentTarget: expect.objectContaining({
          name: PROPS.name,
          value: PROPS.value.toString(),
        }),
      })
    );
  });

  it("disabled props가 true일 때 버튼의 컨텐츠는 아무것도 없다.", () => {
    render(<MenuButton disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    expect(button.childElementCount).toBe(0);
  });
});
