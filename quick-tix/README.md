This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🧹 ESLint & Code Style

This project uses a **modern ESLint setup optimised for Next.js (React 18+ and TypeScript)**, incorporating accessibility, hook safety, formatting, and common best practices — all while avoiding unnecessary or deprecated configurations.

### ESLint Configuration Summary

The ESLint config is defined in `eslint.config.js` using the [Flat Config format](https://eslint.org/docs/latest/use/configure/configuration-files-new), and extends Next.js’ recommended defaults:

- `next/core-web-vitals` — Lints for performance, accessibility, and Next.js conventions.
- `next/typescript` — Adds proper linting for TS syntax.

Custom rules and plugins have been layered on top for enhanced quality, safety, and maintainability:

---

### 🔌 Plugins Used

| Plugin                      | Reason                                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `eslint-plugin-react`       | Enables React-specific linting (e.g. `self-closing-comp`, `no-danger`, etc.).                            |
| `eslint-plugin-react-hooks` | Enforces [React Hooks rules](https://reactjs.org/docs/hooks-rules.html), ensuring proper hook usage.     |
| `eslint-plugin-jsx-a11y`    | Adds accessibility linting to improve screen reader and keyboard nav compliance.                         |
| `eslint-plugin-prettier`    | Integrates [Prettier](https://prettier.io/) with ESLint to enforce consistent formatting during linting. |
| `prettier`                  | The actual formatter — required to work with the Prettier plugin above.                                  |

---

### Key ESLint Rules (Beyond Defaults)

| Rule                          | Why It Matters                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| `react-hooks/rules-of-hooks`  | Prevents invalid usage of Hooks (e.g. inside conditionals or loops).               |
| `react-hooks/exhaustive-deps` | Ensures effect dependencies are properly declared.                                 |
| `react/no-array-index-key`    | Avoids unstable list keys which cause rendering bugs.                              |
| `react/no-danger`             | Warns against `dangerouslySetInnerHTML` (XSS risk).                                |
| `react/no-unknown-property`   | Catches invalid DOM props in JSX.                                                  |
| `react/self-closing-comp`     | Encourages cleaner self-closing tags for empty elements.                           |
| `no-unused-vars`              | Warns on dead variables, helping maintain clean code.                              |
| `prettier/prettier`           | Ensures all formatting is Prettier-compliant (e.g. trailing commas, line endings). |
| `jsx-a11y/...`                | Enforces accessibility best practices (e.g. valid `alt` text, ARIA roles, etc.).   |

---

### Ignore Configuration

ESLint is configured to ignore:

```txt
dist
.next
```

This prevents linting auto-generated and build-related folders.

---

### Dev Dependencies Installation

To enable this setup, the following packages must be installed:

```bash
npm install --save-dev \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-prettier \
  prettier
```

---

### Why This Matters

This setup ensures:

- Strong **React/Next.js** code discipline
- **Hook correctness**
- **Accessibility compliance**
- **Consistent code formatting**
- Clean and **maintainable codebase**

It avoids unnecessary plugins like `react-refresh` (not needed in Next.js), and removes redundant rules handled by React 17+ and Next.js internally.
