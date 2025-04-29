import { fireEvent, render } from "@testing-library/react";
import MenuButton from ".";
import { vi } from "vitest";

const PROPS = {
  name: "Test Menu",
  value: 1000,
};

describe("MenuButton 컴포넌트 테스트", () => {
  it("name과 value가 전달되면 name과 value가 컨텐츠로 포함되고 name 속성과 value 속성이 들어간 버튼이 렌더링된다.", () => {
    const { getByRole, getByText } = render(
      <MenuButton name={PROPS.name} value={PROPS.value} />
    );

    const button = getByRole("button");

    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute("name", PROPS.name);
    expect(button).toHaveAttribute("value", PROPS.value.toString());

    expect(getByText(PROPS.name)).toBeInTheDocument();
    expect(getByText(PROPS.value.toString())).toBeInTheDocument();
  });

  it("버튼을 클릭하면 onClick 함수가 호출되고 event에서 name과 value를 받아올 수 있다.", () => {
    const handleClick = vi.fn();

    const { getByRole } = render(
      <MenuButton name={PROPS.name} value={PROPS.value} onClick={handleClick} />
    );

    const button = getByRole("button");

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

  it("버튼을 누르고 있는 동안 onMouseDown 함수가 호출된다.", () => {
    const handleMouseDown = vi.fn();

    const { getByRole } = render(
      <MenuButton
        name={PROPS.name}
        value={PROPS.value}
        onMouseDown={handleMouseDown}
      />
    );

    const button = getByRole("button");

    fireEvent.mouseDown(button);
    expect(handleMouseDown).toHaveBeenCalled();
  });

  it("버튼을 놓았을 때 onMouseUp 함수가 호출된다.", () => {
    const handleMouseUp = vi.fn();

    render(
      <MenuButton
        name={PROPS.name}
        value={PROPS.value}
        onMouseUp={handleMouseUp}
      />
    );

    fireEvent.mouseUp(window);
    expect(handleMouseUp).toHaveBeenCalled();
  });

  it("disabled props가 true일 때 버튼의 컨텐츠는 아무것도 없다.", () => {
    const { getByRole } = render(<MenuButton disabled={true} />);
    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button.childElementCount).toBe(0);
  });
});
