# Contributing to PromptOptimizer

Thank you for your interest in contributing to PromptOptimizer!

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Installation
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/prompt-optimizer.git
   cd prompt-optimizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```
Visit http://localhost:3000 to see the app.

## Testing

We use [Playwright](https://playwright.dev/) for E2E testing.
Before submitting a PR, please ensure all tests pass:

```bash
npx playwright test
```

## Linting

Ensure code quality with ESLint:

```bash
npm run lint
```

## Pull Request Process

1. Create a new branch for your feature or fix.
2. Commit your changes with clear messages.
3. Push to your fork and submit a Pull Request.
4. Fill out the PR template checklist.

## Privacy Notice
This project is designed to run entirely on the client-side. **Do not add code that sends user inputs to external servers.**

## License
This project is licensed under the MIT License.
