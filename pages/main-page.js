import { expect } from "@playwright/test";

export class MainPage {
    constructor(page) {
        this.page = page;
        this.url = '/';
        this.pageTitle = 'Testowy Sklep – Strona główna'
        this.listOfItems = this.page.getByTestId('products-grid');
    }

    async navigateTo() {
        await this.page.goto(this.url);
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async checkIfProductListIsDisplayed() {
        await expect(this.listOfItems).toBeVisible();
    }

    async clickProductByName(productName) {
         await this.listOfItems.getByText(productName).click();
  
    }
}

module.exports = { MainPage }