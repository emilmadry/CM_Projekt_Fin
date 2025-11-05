import { expect } from "@playwright/test";

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.partialUrl = 'products/';
        this.pageTitle = 'Testowy Sklep – Strona główna'
        this.listOfItems = this.page.getByTestId('products-grid');
        this.addToCartButton = this.page.getByRole('button', { name: "Dodaj do koszyka" });
        this.expandCartButton = this.page.getByTestId('cart-button');
        this.cartPanel = this.page.locator('#cart-panel');
        this.cartList = this.page.getByTestId('cart-list');
        this.buyButton = this.page.getByRole('button', { name: "Kup" });

        this.toastSuccess = this.page.locator('.toast-success');
        this.toastInfo = this.page.locator('.toast-container');

    }

    async navigateToById(productId) {
        await this.page.goto(`${this.partialUrl}${productId}.html`);
        await expect(this.page).toHaveTitle(this.pageTitle);

        await this.checkProductIdInUrl();
    }

    async checkProductIdInUrl(productId) {
        await expect(this.page).toHaveURL(`products/${productId}.html`);
    }

    async checkProductTitle(productName) {
        await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    }

    async addToCart(productName) {
        await this.addToCartButton.click();
        await expect(this.toastSuccess).toBeVisible();
        await expect(this.toastSuccess).toContainText(`Dodano do koszyka: ${productName}`)
    }

    async expandCart() {
        await this.expandCartButton.click();
        await expect(this.cartPanel).toBeVisible();
    }

    async checkForItemInCart(itemName) {
        await expect(this.cartList).toBeVisible();
        await expect(this.cartList).toContainText(itemName)
    }

    async buyItemsInCart() {
        await this.buyButton.click();
        await expect(this.toastInfo).toBeVisible();
        await expect(this.toastInfo).toContainText('sukces');
        await expect(this.cartPanel).not.toBeVisible();
    }

}

module.exports = { ProductPage }