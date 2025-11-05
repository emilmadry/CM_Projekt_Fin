// @ts-check
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { ProductPage } from '../pages/product-page';

test('full e2e path for purchasing product', async ({ page }) => {

  const testedObject = {
    name: 'Eliksir Energii',
    id: 'p2',
    price: '39.99 zł'
  }

  const mainPage = new MainPage(page);
  const productPage = new ProductPage(page);

  await mainPage.navigateTo();
  await mainPage.checkIfProductListIsDisplayed();
  await mainPage.clickProductByName(testedObject.name);

  await productPage.checkProductIdInUrl(testedObject.id)
  await productPage.checkProductTitle(testedObject.name);
  await productPage.addToCart(testedObject.name);
  await productPage.expandCart();
  await productPage.checkForItemInCart(testedObject.name);
  await productPage.buyItemsInCart();
});
