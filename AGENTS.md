# Repository Guidelines

## Project Structure & Module Organization

This is a small Next.js App Router project. Application code lives in `app/`:

- `app/page.js` contains the main interactive "Junk or No" page and the food classification lists.
- `app/layout.js` defines shared HTML metadata and imports global styles.
- `app/globals.css` holds Tailwind directives and global body styling.

Configuration files are at the repository root: `next.config.mjs`, `tailwind.config.js`, `postcss.config.mjs`, and `.eslintrc.json`. Static or reference image files currently live at the root; move reusable app assets into `public/` if they need stable in-app URLs. Build output in `.next/` and dependencies in `node_modules/` should not be edited or committed.

## Build, Test, and Development Commands

Run these from the repository root:

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the local Next.js development server at `http://localhost:3000`.
- `npm run build` creates a production build and catches route/build errors.
- `npm run start` serves the production build after `npm run build`.
- `npm run lint` runs Next.js ESLint rules, including `next/core-web-vitals`.

## Coding Style & Naming Conventions

Use JavaScript with React function components. Keep component names in PascalCase, helper functions in camelCase, and constants in UPPER_SNAKE_CASE, matching `HomePage`, `normalizeFoodName`, and `JUNK_FOOD_LIST`. Prefer single quotes, semicolons, and two-space indentation. Use Tailwind utility classes for layout and visual styling before adding custom CSS. Keep client-only components marked with `'use client';` when they use hooks or browser interaction.

## Testing Guidelines

No automated test framework is currently configured. For changes, run `npm run lint` and manually verify the main flow in `npm run dev`: known junk food, known healthier food, unknown food, empty input, and case/spacing normalization. If tests are added later, prefer colocated component tests or an `app/**/*.test.js` pattern and document the new command here.

## Commit & Pull Request Guidelines

Recent commits use concise, imperative summaries such as `Create Junk or No Next.js Tailwind starter app` and `Updated background image to a warmer table setting`. Follow that style: describe the user-visible change in one line.

Pull requests should include a short description, testing notes, and screenshots for UI changes. Link related issues when available. Keep PRs focused; separate refactors from behavior changes unless the refactor is required for the feature.
