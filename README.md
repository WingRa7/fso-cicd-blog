## Blog App (CI/CD Pipeline)

A full-stack blog sharing application, refactored into a single repo with:

- **Backend** in the project root (`Node.js` + `Express` + `MongoDB`)
- **Frontend** in the `client/` folder (`React` + `Vite`)
- **Production build** served statically from the backend (`dist/`)

The repository also demonstrates a simple **CI/CD pipeline** using **GitHub Actions** and **Fly.io**.

## About the Project

This project is part of the **Full Stack Open** curriculum. The application allows users to:

- **Create** new blog posts
- **Like** existing blogs
- **View** all blogs in a list
- **Authenticate** with a username and password

On top of the basic bloglist functionality, this repo focuses on:

- **Automated testing** (backend & frontend)
- **Linting & style checks**
- **Continuous deployment** to Fly.io

## Project Structure

At a high level:

- **Backend API & server**

  - Location: project root
  - Entry point: `index.js` → uses `app.js`
  - Static files served from: `dist/` (built frontend)

- **Frontend (React + Vite)**

  - Location: `client/`
  - Entry point: `client/src/main.jsx`
  - API calls:
    - Blogs: `client/src/services/blogs.js` → `/api/blogs`
    - Login: `client/src/services/login.js` → `/api/login`

- **Tests**
  - Backend tests: `tests/` (Node test runner + Supertest)
  - Frontend tests: under `client/src` (Vitest + Testing Library)

## Tech Stack

- **Frontend**

  - React, Vite, Axios, Testing Library, Vitest

- **Backend**

  - Node.js, Express, Mongoose (MongoDB), JSON Web Tokens, bcrypt

- **DevOps**
  - GitHub Actions
  - Fly.io for deployment
  - Dockerfile for container-based deployment

## CI/CD Pipeline

The CI/CD setup is defined in GitHub Actions workflows under `.github/workflows/`:

- **Fly Deploy workflow**: `pipeline.yml`

**Triggers**

- On **push** to the `main` branch.

**Current steps**

1. **Checkout** the repository
2. **Set up Flyctl** with `superfly/flyctl-actions/setup-flyctl@master`
3. **Deploy** to Fly.io with:

   flyctl deploy --remote-only
   **Secrets**

- The workflow expects a GitHub secret:
  - **`FLY_API_TOKEN`** – your Fly.io API token

## Installation

### 1. Clone the repository

`git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git`

### 2. Install backend dependencies

`npm install`

### 3. Install frontend dependencies

`npm run install:client`

### 4. Setup using fly.io CLI

`fly launch`

> Change the port on the default fly.toml from 3000 > 3003 or the port in the .env file!

## 🔐 Environment Variables

Adapt the `.env.example` to your own `.env` file in the **project root**:
`

- `MONGODB_URI` – production/development MongoDB connection string
- `TEST_MONGODB_URI` – database used when `NODE_ENV=test`
- `PORT` – port for the Express server (exposed to Fly; defaults to `3003`)
- `SECRET` – secret key used to sign JWTs in `controllers/login.js`

## Running the App in Development

### Backend (API server)

#### From the project root:

`npm run dev` - This starts the Express server (by default on port `3003`, controlled by `PORT` in `.env`).

#### The backend:

- Connects to MongoDB using `MONGODB_URI` / `TEST_MONGODB_URI` (`utils/config.js`)
- Exposes REST endpoints under `/api/*`
- Serves the **production** frontend build from `dist/` when present

### Frontend (React app)

From the `client` directory:

`npm run dev` Vite will start a dev server (usually on port `5173`).

In development:

- The frontend uses relative URLs (`/api/blogs`, `/api/login`) so you typically run both:
  - Backend on `http://localhost:3003`
  - Frontend on `http://localhost:5173`

## Scripts

#### Backend (`package.json` in project root)

- **`npm start`**: Run the server in production mode
- **`npm run dev`**: Run the server in development mode with file watching
- **`npm test`**: Run all backend tests with Node’s test runner
- **`npm run start:test`**: Start the server in test mode
- **`npm run lint`**: Run ESLint on the backend codebase.
- **`npm run install:client`**: Install frontend dependencies from the root
- **`npm run build:client`**: Build the frontend from the root
- **`npm run test:client`**: Run frontend tests from the root
- **`npm run clean:client`**: Remove `client/node_modules`.
- **`npm run build`**: Install deps, build the frontend into `dist/`, and clean up `client/node_modules` for a lean production image.

#### Frontend (`client/package.json`)

- **`npm run dev`**: Start the Vite development server.
- **`npm run build`**: Create a production build of the frontend into `dist/` (copied to the project root by your Docker/CI setup).
- **`npm run preview`**: Preview the production build locally.
- **`npm test`**: Run frontend tests with Vitest.
- **`npm run lint`**: Run ESLint on the frontend codebase.

## 🧪 Testing

#### From the project root:

`npm test`
This runs the backend test suite (including tests in `tests/`), using the `TEST_MONGODB_URI` database.

`npm run test:client` This runs the React component tests using Vitest and Testing Library.

## 📝 License

This project is open source and available under the **MIT License**.

Created as part of the **Full Stack Open** curriculum (University of Helsinki).
