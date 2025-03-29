import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // JSDOM 환경 설정
    setupFiles: ["./vitest-setup.js"], // 테스트 실행 전 필요한 설정 파일 추가
  },
});
