import { test, expect } from '@playwright/test';

test.describe('SporeKart Landing Page & E-Commerce Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Navbar should display brand title, logo, navigation links, and cart action', async ({ page }) => {
    // Verify document title and brand logo
    await expect(page).toHaveTitle(/SporeKart/i);
    
    // Check navigation bar presence
    const navbar = page.locator('header');
    await expect(navbar).toBeVisible();
    await expect(navbar.getByText('E-Store', { exact: false })).toBeVisible();
    await expect(navbar.getByText('Training', { exact: false })).toBeVisible();
  });

  test('Hero section should render headline, tagline, and trust badges', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toContainText(/Grow Better/i);

    // Verify trust badges
    await expect(page.getByText('Lab Certified Spores')).toBeVisible();
    await expect(page.getByText('Shiprocket Express Logistics')).toBeVisible();
    await expect(page.getByText('Razorpay Verified Payments')).toBeVisible();
  });

  test('Product catalog search and Add to Cart drawer interaction', async ({ page }) => {
    // Scroll to catalog grid
    const productsSection = page.locator('#catalog-grid');
    await productsSection.scrollIntoViewIfNeeded();

    // Verify product section title
    await expect(page.getByText('Cultivation Supplies & Kits')).toBeVisible();

    // Find and click "Add" button on the first product
    const addToCartBtn = page.getByRole('button', { name: 'Add' }).first();
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Cart badge button should be visible
    const cartButton = page.locator('header').getByRole('button', { name: 'View Shopping Cart' });
    await expect(cartButton).toBeVisible();
  });

  test('Training section should show commercial workshops and details', async ({ page }) => {
    const trainingSection = page.locator('#training-section');
    await trainingSection.scrollIntoViewIfNeeded();

    await expect(page.getByText('Cultivation & Biotech Training Batches')).toBeVisible();
  });

  test('Accordion FAQs should display initial answer and toggle on click', async ({ page }) => {
    const faqSection = page.locator('#faq');
    await faqSection.scrollIntoViewIfNeeded();

    // First FAQ answer is open by default
    await expect(page.getByText(/processed in ISO-certified H14 Laminar Flow Hood/i)).toBeVisible();

    // Click second FAQ item
    const secondFaqQuestion = page.getByText(/How does SporeKart ship sterile biotech products across India?/i);
    await expect(secondFaqQuestion).toBeVisible();
    await secondFaqQuestion.click();

    // Second answer should be visible
    await expect(page.getByText(/We partner with Shiprocket/i)).toBeVisible();
  });

  test('Verified grower reviews section should render feedback', async ({ page }) => {
    const reviewsSection = page.locator('#reviews');
    await reviewsSection.scrollIntoViewIfNeeded();

    await expect(page.getByText(/Trusted by Commercial Mycologists/i)).toBeVisible();
    await expect(page.getByText('Ramesh Kumar')).toBeVisible();
  });

  test('JSON-LD Schema.org structured data script should exist for SEO', async ({ page }) => {
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toHaveCount(1);
    const content = await jsonLdScript.textContent();
    expect(content).toContain('SporeKart');
  });

});
