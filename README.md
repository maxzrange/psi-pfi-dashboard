# ⚙️ CRA Boilerplate Overview

This project is bootstrapped using Create React App (CRA) with TypeScript.

#### 🧱 Features

- React with TypeScript
- CRACO (Create React App Configuration Override)
- Modular architecture
- MVC-style controller layer
- Scalable & maintainable

# 📁 Folder Structure

```bash
psi-pfi-dashboard/
├───public/             # Static files, served directly (index.html, favicon, etc.)
├───src/
│   ├───components/     # Reusable, stateless UI components (e.g., Button, Sidebar)
│   ├───controllers/    # Orchestrates logic between views and models (calls services, handles data)
│   ├───data/           # Temporary or mock (dummy) data used for prototyping or UI testing
│   ├───hooks/          # Custom React hooks for encapsulating reusable stateful logic
│   ├───interfaces/     # TypeScript interfaces for API responses or structured data
│   ├───models/         # Data models (classes or structures) representing core entities
│   ├───pages/          # Page-level components mapped to routes (e.g., Dashboard, Project)
│   ├───services/       # Responsible for handling API calls and external data access
│   ├───stores/         # State management (Zustand stores)
│   ├───types/          # Global/custom TypeScript types (e.g., enums, unions, utility types)
│   ├───utils/          # Utility/helper code shared across the app
│   │   ├───configs/    # Application configs (e.g., env vars, Axios instance, Query client)
│   │   ├───constants/  # Constant values (e.g., page table data, sidebar data)
│   │   └───helpers/    # General helper functions (e.g., date formatting, encryption & decryption)
│   ├───App.tsx         # Routing and theme entry point
│   ├───index.tsx       # React entry point
│   └───index.css       # Global CSS
├───.env.example        # Example environment variables file. Used to show other devs what .env values are expected.
├───.gitignore          # Lists files/folders Git should ignore (e.g., node_modules, build, .env).
├───.vercelignore       # Lists files/folders Vercel should exclude from deployment (e.g., node_modules, .git).
├───craco.config.ts     # CRACO config file (in TypeScript). Used to override CRA's internal Webpack, Babel, etc. without ejecting.
├───package.json        # Project metadata and dependencies. Also defines NPM scripts (start, build, etc.).
├───tsconfig.json       # TypeScript compiler configuration (paths, strict mode, JSX, etc.).
└───vercel.json         # Configuration for Vercel deployment (routes, rewrites, build settings, etc.).
```

# 🚀 Getting Started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Create `.env` file and copy the key from `.env.example`

```env
REACT_APP_API_URL=
REACT_APP_SECRET_KEY=
REACT_APP_MAPTILER_KEY=
REACT_APP_ONE_MAP_EMAIL=
REACT_APP_ONE_MAP_PASS=
```

#### 3. Start the development server

```bash
npm run dev
```

# 🔗 Useful Script

This script is inside `package.json` file.

```json
{
  "dev": "craco start", // Start dev server
  "build": "craco build", // Create production build
  "test": "craco test" // Run tests
}
```

# 📦 Core Dependencies

1. **Zustand & React Query** - State Management
2. **Axios** - HTTP Request
3. **AWS Amplify** - UI Components
4. **Motion** - Animation
5. **Maplibre** - Map
6. **Moment JS** - Date & Time Parser
7. **Faker JS** - Dummy Data
8. **Crypto JS** - Cryptography
9. **React Hook Form** - Form Handler
10. **Craco** - CRA Tools
