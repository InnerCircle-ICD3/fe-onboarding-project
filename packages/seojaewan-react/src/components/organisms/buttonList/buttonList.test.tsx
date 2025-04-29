import { render } from "@testing-library/react";
import ButtonList from ".";

const BUTTON_LIST = [
  {
    id: 1,
    name: "치킨",
    price: 10000,
  },
  {
    id: 2,
    name: "피자",
    price: 15000,
  },
  {
    id: 3,
    name: "햄버거",
    price: 5000,
  },
  {
    id: 4,
    name: "콜라",
    price: 2000,
  },
  {
    id: 5,
    name: "사이다",
    price: 2000,
  },
  {
    id: 6,
    name: "환타",
    price: 2000,
  },
];

const DISABLED_BUTTON_LIST_1 = [
  {
    id: 1,
    name: "치킨",
    price: 10000,
  },
  {
    id: 2,
    name: "피자",
    price: 15000,
  },
  {
    id: 3,
    name: "햄버거",
    price: 5000,
  },
  {
    id: 4,
    name: "콜라",
    price: 2000,
  },
];

const DISABLED_BUTTON_LIST_2 = [
  {
    id: 1,
    name: "치킨",
    price: 10000,
  },
  {
    id: 2,
    name: "피자",
    price: 15000,
  },
  {
    id: 3,
    name: "햄버거",
    price: 5000,
  },
  {
    id: 4,
    name: "콜라",
    price: 2000,
  },
  {
    id: 5,
    name: "사이다",
    price: 2000,
  },
];

describe("ButtonList 컴포넌트 테스트", () => {
  it("BUTTON_LIST가 props가 전달되면 buttonList 요소와 함께 렌더링이 된다.", () => {
    const { getByText } = render(<ButtonList buttonList={BUTTON_LIST} />);

    BUTTON_LIST.forEach((button) => {
      expect(getByText(button.name)).toBeInTheDocument();
      expect(getByText(button.price.toString())).toBeInTheDocument();
    });
  });

  it("BUTTON_LIST가 렌더링이 발생할 땐 한 줄에 3개씩 렌더링되고, 3개가 안될 경우 disabled props를 가진 버튼으로 채워서 0개의 disabled 버튼이 렌더링된다.", () => {
    const { getAllByRole } = render(<ButtonList buttonList={BUTTON_LIST} />);

    const buttons = getAllByRole("button");

    const visibleButtons = buttons.slice(0, BUTTON_LIST.length);
    const fillerButtons = buttons.slice(BUTTON_LIST.length);

    expect(visibleButtons).toHaveLength(6);
    expect(fillerButtons).toHaveLength(0);
  });

  it("DISABLED_BUTTON_LIST_1가 렌더링이 발생할 땐 한 줄에 3개씩 렌더링되고, 3개가 안될 경우 disabled props를 가진 버튼으로 채워서 2개의 disabled 버튼이 렌더링된다.", () => {
    const { getAllByRole } = render(
      <ButtonList buttonList={DISABLED_BUTTON_LIST_1} />
    );

    const buttons = getAllByRole("button");

    const visibleButtons = buttons.slice(0, DISABLED_BUTTON_LIST_1.length);
    const fillerButtons = buttons.slice(DISABLED_BUTTON_LIST_1.length);

    expect(visibleButtons).toHaveLength(4);
    expect(fillerButtons).toHaveLength(2);
    fillerButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("DISABLED_BUTTON_LIST_2가 렌더링이 발생할 땐 한 줄에 3개씩 렌더링되고, 3개가 안될 경우 disabled props를 가진 버튼으로 채워서 1개의 disabled 버튼이 렌더링된다.", () => {
    const { getAllByRole } = render(
      <ButtonList buttonList={DISABLED_BUTTON_LIST_2} />
    );

    const buttons = getAllByRole("button");

    const visibleButtons = buttons.slice(0, DISABLED_BUTTON_LIST_2.length);
    const fillerButtons = buttons.slice(DISABLED_BUTTON_LIST_2.length);

    expect(visibleButtons).toHaveLength(5);
    expect(fillerButtons).toHaveLength(1);
    fillerButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
