import { test, expect } from '@playwright/test';

const siteUrl = 'http://localhost:5173';

// 测试用例 使用脚本命令 test:e2e
test('Verify that the page renders properly', async ({ page }) => {
  await page.goto(siteUrl);

  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText;
    return pageContent.includes('这是'); // 查看页面中是否包含这个字符
  });
  expect(res).toBe(true);
});
