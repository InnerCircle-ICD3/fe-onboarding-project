import { beforeEach } from "vitest";

beforeEach(() => {
  document.body.innerHTML = `<main class="vending-machine-container">
        <!-- 자판기 본체 -->
        <section class="vending-machine">
            <div class="screen">
                <input type="text" name="" class="number-input" value="0" readonly>
            </div>
            <div class="products">
            </div>
        </section>

        <!-- 조작 패널 -->
        <section class="control-panel">
            <div class="money-input">
                <div class="screen">
                    <input type="text" name="" class="number-input" value="0">
                </div>
                <div class="buttons">
                    <button id="button-insert" class="button-blue">투입</button>
                    <button id="button-refund" class="button-grey">반환</button>
                </div>
            </div>
            <div class="log">
                <ul class="log-list">
                    <li>금액을 입력후 투입버튼을 누르세요.</li>
                </ul>
            </div>
        </section>
    </main>`;
});
