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
    const { getByText } = render(<LogList logList={LOG_LIST} />);

    LOG_LIST.forEach((log) => {
      expect(getByText(log.message)).toBeInTheDocument();
    });
  });
});
