<p align="center">
<a href=https://github.com/Goldennboyy/issue-tracker target="_blank">
<img src='./public/Image/Issue tracker_list.png' width="100%" alt="Banner" />
</a>
</p>

<p align="center">
<img src="https://img.shields.io/github/languages/code-size/Goldennboyy/issue-tracker" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/last-commit/Goldennboyy/issue-tracker" alt="GitHub last commit" />
<img src="https://img.shields.io/github/commit-activity/m/Goldennboyy/issue-tracker" alt="GitHub commit activity month" />
<img src="https://img.shields.io/github/license/Goldennboyy/issue-tracker" alt="GitHub license" />
</p>

## 📌 Overview

The issue-tracker project relies on essential dependencies such as Prisma, React, Next.js, Tailwind CSS, and TypeScript, along with various other libraries and tools for form handling, authentication, state management, and more.

## 🔍 Table of Contents

- [📁 Project Structure](#project-structure)

- [📝 Project Summary](#project-summary)

- [💻 Stack](#stack)

- [⚙️ Setting Up](#setting-up)

- [🚀 Run Locally](#run-locally)

- [🙌 Contributors](#contributors)

## 📁 Project Structure

```bash
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── components.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── prettier.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20231025223524_npx_prisma_db_push
│   │   │   └── migration.sql
│   │   ├── 20231026135147_issue
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   └── favicon.ico
├── src
│   ├── app
│   │   ├── Providers
│   │   │   └── ThemeProviders.tsx
│   │   ├── _components
│   │   │   └── ui
│   │   │       ├── BadgeStatus.tsx
│   │   │       ├── Form
│   │   │       │   └── ModifyIssueForm.tsx
│   │   │       ├── IssueList.tsx
│   │   │       ├── Loading.tsx
│   │   │       ├── ModifyIssueSheet.tsx
│   │   │       ├── Navbar.tsx
│   │   │       ├── ProgressCard.tsx
│   │   │       ├── SignInButton.tsx
│   │   │       └── ThemeToggle.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   └── trpc
│   │   │       └── [trpc]
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── issues
│   │   │   ├── new
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── schema
│   │   │   └── IssueSchema.ts
│   │   ├── store
│   │   │   └── store.ts
│   │   └── utils
│   │       └── helpers.ts
│   ├── components
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── sheet.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── use-toast.ts
│   ├── env.mjs
│   ├── lib
│   │   └── utils.ts
│   ├── server
│   │   ├── api
│   │   │   ├── root.ts
│   │   │   ├── routers
│   │   │   │   └── issue.ts
│   │   │   └── trpc.ts
│   │   ├── auth.ts
│   │   └── db.ts
│   └── trpc
│       ├── react.tsx
│       ├── server.ts
│       └── shared.ts
├── tailwind.config.js
└── tsconfig.json
```

## 📝 Project Summary

- [src](src): Main source code directory containing app logic and components.
- [prisma](prisma): Directory for Prisma ORM configuration and database migrations.
- [public](public): Directory for static assets like images, stylesheets, and client-side scripts.
- [src/app](src/app): Contains application-specific logic and components.
- [src/app/Providers](src/app/Providers): Directory for provider implementations used in the app.
- [src/app/\_components](src/app/_components): Common components used throughout the app.
- [src/app/api](src/app/api): API-related functionality for authentication and data retrieval.
- [src/app/issues](src/app/issues): Components and logic related to managing issues.
- [src/app/schema](src/app/schema): Directory for GraphQL schema definitions and related files.
- [src/app/store](src/app/store): Redux store configuration and related functionality.

## 💻 Stack

- [next-auth](https://next-auth.js.org/): Authentication library for Next.js applications.
- [prisma](https://www.prisma.io/): Database toolkit and ORM for TypeScript and Node.js.
- [react-hook-form](https://react-hook-form.com/): Library for flexible and efficient form validation in React.
- [tanstack/react-query](https://react-query.tanstack.com/): Data fetching and caching library for React.
- [trpc/server](https://trpc.io/): TypeScript RPC framework for building efficient and type-safe APIs.
- [zustand](https://github.com/pmndrs/zustand): State management library with a tiny footprint and simple API.
- [tailwindcss](https://tailwindcss.com/): Utility-first CSS framework for rapidly building custom designs.
- [typescript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.

## ⚙️ Setting Up

#### DATABASE_URL

- Use the file path of the SQLite database you want to use.

#### NEXTAUTH_SECRET

- Generate a random secret using the command: `openssl rand -base64 32`.

#### GITHUB_CLIENT_ID

- Create a new Github application on the Github Developer Portal.
- Go to the "OAuth2" section and add a redirect URI.
- Copy the generated Client ID.

#### GITHUB_CLIENT_SECRET

- Create a new Github application on the Github Developer Portal.
- Go to the "OAuth2" section and add a redirect URI.
- Copy the generated Client Secret.

## 🚀 Run Locally

1.Clone the issue-tracker repository:

```sh
git clone https://github.com/Goldennboyy/issue-tracker
```

2.Install the dependencies with one of the package managers listed below:

```bash
pnpm install
bun install
npm install
yarn install
```

3.Start the development mode:

```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

## 🙌 Contributors

<a href="https://github.com/Goldennboyy/issue-tracker/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Goldennboyy/issue-tracker" />
</a>
