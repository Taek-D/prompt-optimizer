import { test, expect } from '@playwright/test';

test.describe('PromptOptimizer MVP E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('A. Basic Generation & Safety Exit Logic', async ({ page }) => {
        // 1. Enter Prompt
        await page.getByTestId('raw-prompt-input').fill('This is a test context.');

        // 2. Enable Pro Mode to see Safety Toggle
        await page.getByTestId('mode-toggle-btn').click();

        // 3. Ensure Safety Exit is checked (default)
        const safetyCheckbox = page.getByTestId('option-safety-exit');
        await expect(safetyCheckbox).toBeChecked();

        // 4. Optimize
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // 5. Verify Result contains Safety Exit text
        await expect(page.locator('text=Optimized Result')).toBeVisible();
        const resultText = await page.getByTestId('optimized-result-content').textContent();
        expect(resultText).toContain("If you do not have enough information");

        // 6. Disable Safety Exit and Re-run
        await safetyCheckbox.uncheck();
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // 7. Verify Result does NOT contain Safety Exit text
        // We wait for text content update - simple way is to check it immediately if we assume react re-renders fast
        // or check strict equality if we know exact output. 
        // For loose check:
        const newResultText = await page.getByTestId('optimized-result-content').textContent();
        expect(newResultText).not.toContain("If you do not have enough information");
    });

    test('B. Empty State Handling', async ({ page }) => {
        const optimizeBtn = page.getByRole('button', { name: /Optimize Prompt/i });

        // 1. Initially Disabled
        await expect(optimizeBtn).toBeDisabled();

        // 2. Type text -> Enabled
        await page.getByTestId('raw-prompt-input').fill('Hello');
        await expect(optimizeBtn).toBeEnabled();

        // 3. Type whitespace -> Disabled
        await page.getByTestId('raw-prompt-input').fill('   ');
        await expect(optimizeBtn).toBeDisabled();
    });

    test('C. Download Functionality', async ({ page }) => {
        await page.getByTestId('raw-prompt-input').fill('Download Test');
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // Wait for download event
        const downloadPromise = page.waitForEvent('download');
        await page.getByTestId('download-btn').click();
        const download = await downloadPromise;

        // Verify Filename Sanitization (default checks)
        expect(download.suggestedFilename()).toBe('prompt.txt');

        // Verify Content
        const stream = await download.createReadStream();
        const content = await streamToString(stream);
        expect(content).toContain('Download Test'); // Basic check that input is in output (if generic template)
    });

    test('D. History & Persistence', async ({ page }) => {
        const uniquePrompt = `History_${Date.now()}`;
        await page.getByTestId('raw-prompt-input').fill(uniquePrompt);
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // Open History
        await page.getByTestId('history-open-btn').click();

        // Auto-wait for drawer item
        const historyItem = page.getByText(uniquePrompt).first();
        await expect(historyItem).toBeVisible();

        // Reload Page
        await page.reload();
        await page.getByTestId('history-open-btn').click();

        // Persistence Check
        await expect(page.getByText(uniquePrompt).first()).toBeVisible();
    });

    test('E. Mobile Viewport Layout', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Verify layout elements exist and are visible/clickable
        await expect(page.getByTestId('raw-prompt-input')).toBeVisible();
        await expect(page.getByRole('button', { name: /Optimize Prompt/i })).toBeVisible();

        // Run optimization
        await page.getByTestId('raw-prompt-input').fill('Mobile check');
        await page.getByRole('button', { name: /Optimize Prompt/i }).click();

        // Check if Result is visible (not pushed off screen or hidden)
        await expect(page.locator('text=Optimized Result')).toBeVisible();
        await expect(page.getByTestId('download-btn')).toBeVisible();
    });
});

// Helper for stream reading
async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
