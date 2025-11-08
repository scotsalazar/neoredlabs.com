const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test('renders hero and meta tags correctly', async ({ page }) => {
    // Navigate to the root of the dev server
    await page.goto('/');
    // Check hero heading visible
    const heading = page.locator('h1');
    await expect(heading).toContainText(/neo\s*redlabs/i);
    // Ensure call-to-action link exists
    const joinLink = page.locator('a', { hasText: 'Join Our Team' });
    await expect(joinLink).toHaveAttribute('href', '/careers');
    // Verify Open Graph title meta tag
    const ogTitleContent = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitleContent).toContain('Neo Redlabs');
    // Verify Twitter card meta tag
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');
  });
});