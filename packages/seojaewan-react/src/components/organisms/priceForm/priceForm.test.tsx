import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceForm from ".";
import { vi } from "vitest";

const MINUS_VALUE = "-100";

describe("PriceForm 컴포넌트 테스트", () => {
  it("form 요소 아래에 input의 number 타입 요소와 submit 타입의 투입, button 타입의 반환 버튼이 렌더링된다.", () => {
    const { getByRole } = render(<PriceForm />);

    const form = getByRole("form");
    expect(form).toBeInTheDocument();

    const input = getByRole("spinbutton");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "number");

    const insertButton = getByRole("button", { name: "투입" });
    const returnButton = getByRole("button", { name: "반환" });

    expect(insertButton).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();

    expect(insertButton).toHaveAttribute("type", "submit");
    expect(returnButton).toHaveAttribute("type", "button");

    expect(form).toContainElement(input);
    expect(form).toContainElement(insertButton);
    expect(form).toContainElement(returnButton);
  });

  it("음수값인 -100을 입력하고, '투입'버튼을 누르면 양수를 입력할 수 없어서 form이 제출되지 않는다.", async () => {
    const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {});
    const { getByRole } = render(<PriceForm onSubmit={handleSubmit} />);

    const input = getByRole("spinbutton");
    const insertButton = getByRole("button", { name: "투입" });

    await userEvent.type(input, MINUS_VALUE);

    fireEvent.click(insertButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
