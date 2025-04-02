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

const LOG_LIST_WITH_SCROLL = [
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
  {
    id: 7,
    message: "로그 메시지 7",
  },
  {
    id: 8,
    message: "로그 메시지 8",
  },
  {
    id: 9,
    message: "로그 메시지 9",
  },
  {
    id: 10,
    message: "로그 메시지 10",
  },
  {
    id: 11,
    message: "로그 메시지 11",
  },
  {
    id: 12,
    message: "로그 메시지 12",
  },
  {
    id: 13,
    message: "로그 메시지 13",
  },
  {
    id: 14,
    message: "로그 메시지 14",
  },
  {
    id: 15,
    message: "로그 메시지 15",
  },
  {
    id: 16,
    message: "로그 메시지 16",
  },
  {
    id: 17,
    message: "로그 메시지 17",
  },
  {
    id: 18,
    message: "로그 메시지 18",
  },
  {
    id: 19,
    message: "로그 메시지 19",
  },
  {
    id: 20,
    message: "로그 메시지 20",
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

  it("logList로 스크롤이 생기면 제일 아래로 스크롤된다.", () => {
    const { getByTestId } = render(<LogList logList={LOG_LIST_WITH_SCROLL} />);
    const logListContainer = getByTestId("log-list-container");

    expect(logListContainer.scrollTop).toBeGreaterThan(0);
  });
});
