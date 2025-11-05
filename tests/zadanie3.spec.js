// @ts-nocheck
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';


test('simple get request', async ({ request }) => {

  const response = await request.get('/api/index.php?endpoint=products');

  expect(await response.status()).toBe(200);
  console.log(await response.text());
  expect(await response.text()).toContain('Mysz Gamingowa');

});

test('simple post request', async ({ request }) => {

  const response = await request.post('/api/index.php?endpoint=products', {
    data: {
      "name": "testowy produkt",
      "price": "123.44",
      "currency": "PLN"
    }
  });

  expect(await response.status()).toBe(201);
  console.log(await response.text());
  expect(await response.text()).toContain('testowy produkt');

})


