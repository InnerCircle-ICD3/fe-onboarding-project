import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // JSDOM 환경 설정
  },
});
