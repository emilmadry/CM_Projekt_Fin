// @ts-check
import { test, expect } from '@playwright/test';
import products from '../data/products.json';
import { MainPage } from '../pages/main-page';
import { ProductPage } from '../pages/product-page';

products.forEach((product) => {
  test(`full e2e path for purchasing: ${product.name}`, async ({ page }) => {

    const mainPage = new MainPage(page);
    const productPage = new ProductPage(page);

    await mainPage.navigateTo();
    await mainPage.checkIfProductListIsDisplayed();
    await mainPage.clickProductByName(product.name);

    await productPage.checkProductIdInUrl(product.id);
    await productPage.checkProductTitle(product.name);
    await productPage.addToCart(product.name);
    await productPage.expandCart();
    await productPage.checkForItemInCart(product.name);
    await productPage.buyItemsInCart();
  });
});
