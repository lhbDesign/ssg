import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // 指定环境
    passWithNoTests: true,
    exclude: ['**/node_modules/**', '**/dist/**'], // 需要排除的路径
    threads: true // 开启多线程模式
  }
});
