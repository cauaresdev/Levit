# Levit

Plataforma de gestão empresarial.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **React Router v7** (client-side routing)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Estrutura do projeto Atual

```
src/
├── main.jsx              # App entry point + BrowserRouter
├── App.jsx               # Route definitions
├── index.css             # Tailwind import + design tokens
└── pages/
    └── auth/
        ├── AuthLayout.jsx    # Shared auth card layout
        ├── Login.jsx         # /login
        ├── Register.jsx      # /register
        ├── ForgotPassword.jsx # /forgot-password
        └── ResetPassword.jsx  # /reset-password
```

## Design Tokens

Definido em `src/index.css` via Tailwind `@theme`:

| Token             | Value     | Tailwind Usage          |
|-------------------|-----------|-------------------------|
| `--color-primary` | `#534BAF` | `bg-primary`, `text-primary` |
| `--color-background` | `#FFFFFF` | `bg-background`        |
| `--color-muted`   | `#E4E9F1` | `bg-muted`             |
| `--color-text-light` | `#6B686B` | `text-text-light`    |
| `--color-text-dark` | `#000000` | `text-text-dark`      |
| `--color-divider` | `#E5E5E5` | `border-divider`       |
