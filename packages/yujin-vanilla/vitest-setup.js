import { beforeEach } from "vitest";

// 테스트 실행 전에 document를 초기화
beforeEach(() => {
  document.body.innerHTML = `<div id='app'></div>`;
});
