import { beforeEach } from "vitest";

// 테스트 실행 전에 document를 초기화
beforeEach(() => {
  document.body.innerHTML = `<div id='app'>
  <main class="vending-machine-container">
        <!-- 자판기 본체 -->
        <section class="vending-machine">
            <div class="screen">
                <input type="text" name="" id="numberInput" placeholder="0원">
            </div>
            <div class="products">
                <div class="product">
                    <p class="product-title">콜라</p>
                    <p class="product-price">500원</p>
                </div>
                <div class="product">
                    <p class="product-title">속이사이다</p>
                    <p class="product-price">1700원</p>
                </div>
                <div class="product">
                    <p class="product-title">판타지판타</p>
                    <p class="product-price">1500원</p>
                </div>
                <div class="product">
                    <p class="product-title">오뎅국물</p>
                    <p class="product-price">1800원</p>
                </div>
                <div class="product">
                    <p class="product-title">부장라떼</p>
                    <p class="product-price">800원</p>
                </div>
                <div class="product">
                    <p class="product-title">판타지판타</p>
                    <p class="product-price">1500원</p>
                </div>
                <div class="product">
                    <p class="product-title">레드불</p>
                    <p class="product-price">2500원</p>
                </div>
                <div class="product">
                    <p class="product-title">핫세븐</p>
                    <p class="product-price">1900원</p>
                </div>
                <div class="product">
                    <p class="product-title">커피우유</p>
                    <p class="product-price">1400원</p>
                </div>

            </div>
        </section>

        <!-- 조작 패널 -->
        <section class="control-panel">
            <div class="money-input">
                <div class="screen">
                    <input type="text" name="" id="numberInput" placeholder="0원">
                </div>
                <div class="buttons">
                    <button id="button-insert" class="button-blue">투입</button>
                    <button id="button-refund" class="button-grey">반환</button>
                </div>
            </div>
            <div class="log">
                <ul class="log-list">
                    <li>2000원을 투입했습니다.</li>
                    <li>오뎅국물을 구매했습니다.</li>
                    <li>200원을 반환합니다.</li>
                    <li>2000원을 투입했습니다.</li>
                    <li>오뎅국물을 구매했습니다.</li>
                    <li>200원을 반환합니다.</li>
                    <li>2000원을 투입했습니다.</li>
                    <li>오뎅국물을 구매했습니다.</li>
                    <li>200원을 반환합니다.</li>
                    <li>2000원을 투입했습니다.</li>
                    <li>오뎅국물을 구매했습니다.</li>
                    <li>200원을 반환합니다.</li>
                </ul>
            </div>
        </section>
    </main>
  </div>`;
});
