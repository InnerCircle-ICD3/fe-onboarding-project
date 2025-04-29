import { render } from "@testing-library/react";
import LogList from ".";

const LOG_LIST = [
  {
    id: 1,
    message: "로그 메시지 1",
  },
  {
    id: 2,
    message: "로그 메시지 2",
  },
  {
    id: 3,
    message: "로그 메시지 3",
  },
  {
    id: 4,
    message: "로그 메시지 4",
  },
  {
    id: 5,
    message: "로그 메시지 5",
  },
  {
    id: 6,
    message: "로그 메시지 6",
  },
];

describe("LogList 컴포넌트 테스트", () => {
  it("전달 받은 logList에 따라 로그 리스트가 렌더링된다.", () => {
    const { container, getByText } = render(<LogList logList={LOG_LIST} />);
    const logListContainer = container.querySelector("ul");
    const logItems = container.querySelectorAll("ul > li");

    expect(logListContainer).toBeInTheDocument();
    expect(logItems).toHaveLength(LOG_LIST.length);

    LOG_LIST.forEach((log) => {
      expect(getByText(log.message)).toBeInTheDocument();
    });
  });

  it("전달 받은 logList가 비어 있다면 아무런 로그도 렌더링되지 않는다.", () => {
    const { container } = render(<LogList logList={[]} />);
    const logListContainer = container.querySelector("ul");

    expect(logListContainer).toBeInTheDocument();
    expect(logListContainer?.childElementCount).toBe(0);
  });

  it("logList를 전달하지 않으면 기본값인 빈 배열이 전달된다.", () => {
    const { container } = render(<LogList />);
    const logListContainer = container.querySelector("ul");

    expect(logListContainer).toBeInTheDocument();
    expect(logListContainer?.childElementCount).toBe(0);
  });
});
