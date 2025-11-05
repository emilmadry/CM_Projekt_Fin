// @ts-nocheck
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';


test.beforeEach(async ({ page }) => {
  const mainPage = new MainPage(page);

  mainPage.navigateTo();
});

test('login as admin', async ({ page }) => {
  await page.getByTestId('login-username').fill(process.env.ADMIN_LOGIN);
  await page.getByTestId('login-password').fill(process.env.ADMIN_PASSWORD);
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('welcome-msg')).toContainText(`Witaj: ${process.env.ADMIN_LOGIN}`)
});


test('login as user', async ({ page }) => {
  await page.getByTestId('login-username').fill(process.env.USER_LOGIN);
  await page.getByTestId('login-password').fill(process.env.USER_PASSWORD);
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('welcome-msg')).toContainText(`Witaj: ${process.env.USER_LOGIN}`)
});
