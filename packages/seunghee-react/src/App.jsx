import { useState, useCallback } from "react";
import "./App.css";
import InsertedMoneyPresenter from "./components/InsertedMoneyPresenter";
import MdContainer from "./components/MdContainer";
import MoneyFunctionContainer from "./components/MoneyFunctionContainer";
import UserLogger from "./components/UserLogger";

const items = [
  { name: "콜라", price: 1500 },
  { name: "사이다", price: 1700 },
  { name: "환타", price: 2000 },
  { name: "포카리", price: 1300 },
  { name: "게토레이", price: 1800 },
  { name: "밀키스", price: 1600 },
  { name: "레쓰비", price: 1900 },
  { name: "코카콜라", price: 2500 },
  { name: "펩시", price: 2500 },
  { name: "마운틴듀", price: 2500 },
  { name: "스프라이트", price: 2500 },
  { name: "토레타", price: 2500 },
  { name: "페리에", price: 2500 },
  { name: "맥콜", price: 2500 },
];

function App() {
  const [money, setMoney] = useState(0);
  const [moneyInput, setMoneyInput] = useState(0);
  const [log, setLog] = useState([]);
  const [tempMoney, setTempMoney] = useState(null);

  const displayMoney = (tempMoney ?? money).toLocaleString();

  const onButtonMouseDown = useCallback(
    (item) => {
      if (money < item.price) {
        setTempMoney(item.price);
        return;
      }

      setMoney((prevMoney) => prevMoney - item.price);
    },
    [money]
  );

  const onButtonMouseUp = useCallback(
    (item) => {
      if (tempMoney) {
        setTempMoney(null);
        return;
      }

      setLog((prevLog) => [...prevLog, `${item.name}을 구입했습니다.`]);
    },
    [tempMoney]
  );

  const onInputChange = (e) => {
    setMoneyInput(Number(e.target.value));
  };

  const onInsert = useCallback(() => {
    if (moneyInput <= 0) {
      return;
    }

    setMoney((prevMoney) => prevMoney + moneyInput);
    setLog((prevLog) => [...prevLog, `${moneyInput}원이 투입되었습니다.`]);
    setMoneyInput(0);
  }, [moneyInput]);

  const onReturn = useCallback(() => {
    if (money <= 0) {
      return;
    }

    setLog((prevLog) => [...prevLog, `${money}원이 반환되었습니다.`]);
    setMoney(0);
  }, [money]);

  return (
    <div className="vending-machine">
      <section className="status-section">
        <InsertedMoneyPresenter money={displayMoney} />
        <MdContainer
          items={items}
          onButtonMouseDown={onButtonMouseDown}
          onButtonMouseUp={onButtonMouseUp}
        />
      </section>
      <section className="user-action-section">
        <MoneyFunctionContainer
          moneyInput={moneyInput}
          onMoneyInputChange={onInputChange}
          onInsert={onInsert}
          onReturn={onReturn}
        />
        <UserLogger logs={log} />
      </section>
    </div>
  );
}

export default App;
