import { test, expect } from '@playwright/test';

// Define expected output fragments based on default ruleset templates
const COMMON_TEXT = "Please summarize"; // Generic fragment

test.describe('PromptOptimizer MVP E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('A. Basic Generation (Gemini, Summary)', async ({ page }) => {
        // 1) Select Model: Gemini
        await page.click('text=Gemini'); // Assuming ModelSelector renders text
        // 2) Select Output Type: Summary (Default) - verify it's selected or click
        // It's default, but let's be sure. OptionsPanel might need selectors.
        // Ideally we add data-testid to components.

        // 3) Enter Prompt
        await page.fill('textarea', 'This is a test context for summarization.');

        // 4) Click Optimize
        await page.click('button:has-text("Optimize Prompt")');

        // 5) Verify Result Area Visible
        await expect(page.locator('text=Optimized Result')).toBeVisible();

        // 6) Verify Content Structure (Gemini Safety Prefix)
        const resultText = await page.textContent('pre.whitespace-pre-wrap');
        expect(resultText).toContain('Ensure the output is safe');
    });

    test('B. Interactions (Copy/Diff)', async ({ page }) => {
        await page.fill('textarea', 'Short test.');
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // Test Diff Toggle using testid
        await page.getByTestId('diff-toggle').click();
        await page.waitForTimeout(500);

        // Expect highlighting class
        await expect(page.locator('.bg-green-100').first()).toBeVisible();

        // Test Copy
        page.on('dialog', dialog => dialog.accept());
        await page.getByText('Copy').click();
    });

    test('C. History Persistence', async ({ page }) => {
        const uniquePrompt = `History Test ${Date.now()}`;
        await page.fill('textarea', uniquePrompt);
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // Open History using testid
        await page.getByTestId('history-open-btn').click();
        await page.waitForTimeout(1000); // Wait for drawer animation

        // Check if item exists (wait for drawer)
        await expect(page.getByText(uniquePrompt.substring(0, 15)).first()).toBeVisible();

        // Reload and check
        await page.reload();
        await page.getByTestId('history-open-btn').click();
        await page.waitForTimeout(1000);
        await expect(page.getByText(uniquePrompt.substring(0, 15)).first()).toBeVisible();
    });

    test('D. Sensitive Data Warning', async ({ page }) => {
        await page.fill('textarea', 'My email is test@example.com');
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // Expect Warning
        await expect(page.getByText(/Detected \d+ sensitive items/)).toBeVisible();
    });
});
