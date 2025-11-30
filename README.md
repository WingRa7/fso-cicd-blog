Bloglist App (CI/CD Pipeline)

A full-stack blog sharing application refactored to utilize a robust Continuous Integration/Continuous Deployment (CI/CD) pipeline.

<!-- ## Link to Live Demo

_(`https://your-app.fly.dev`.)_ -->

## 🚀 About the Project

This project originates from the **Full Stack Open** curriculum. The application allows users to:

- **Create** new blog posts
- **Like** existing blogs
- **View** all blogs in a list
- **Authenticate** with a username and password

The primary goal of this repository is to take the classic blog list app and apply modern DevOps practices, including:

- **Automated testing** (unit & integration)
- **Linting & style checks**
- **Continuous deployment** to production
- **Health checks & rollback** capabilities
- **Notifications** for pipeline status (e.g. via Discord webhook)

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios, Testing Library, Vitest
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Testing**:
  - Backend: Node test runner, Supertest
  - Frontend: Vitest, React Testing Library
- **DevOps**: GitHub Actions (CI/CD), Fly.io (or similar PaaS) for deployment

> The codebase is split into two apps: `apps/api` and `apps/web`.

## ⚙️ The CI/CD Pipeline

The CI/CD pipeline is defined in GitHub Actions workflow files (e.g. `.github/workflows/pipeline.yml`) and typically triggers on:

- **Pushes** to the `main` branch
- **Pull requests** targeting `main`

The pipeline usually performs the following steps:

1. **Install dependencies**
   - Installs backend dependencies in `apps/api`
   - Installs frontend dependencies in `apps/web`
2. **Lint**
   - Runs ESLint on both the backend and frontend codebases
3. **Test**
   - Runs backend unit/integration tests (Node test runner + Supertest)
   - Runs frontend tests (Vitest + Testing Library)
4. **Build**
   - Builds the production-ready frontend with Vite
5. **Deploy**
   - Deploys the backend (and optionally the built frontend) to your hosting provider (e.g. Fly.io)
6. **Health check**
   - Pings the deployed application URL to verify it is healthy
7. **Notification**
   - Sends a status message (e.g. to Discord) with the result of the deployment

_Adjust the details above to match your own workflow file if you change the pipeline later._

## 📦 Local Installation

To run this project locally, you will need:

- Node.js (LTS recommended)
- A running MongoDB instance (local or hosted) and a connection string

### 1. Clone the repository

```bash
git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
cd [YOUR_REPO_NAME]
```

### 2. Install backend dependencies

```bash
cd apps/api
npm install
```

### 3. Install frontend dependencies

Open a new terminal or go back to the project root and then:

```bash
cd apps/web
npm install
```

## 🔐 Environment Variables

Create a `.env` file in `apps/api`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3003
SECRET=your_jwt_secret
TEST_MONGODB_URI=your_test_database_uri
```

Adjust variable names to match your own configuration if needed.

## 🚴 Running the App in Development

### Backend (API server)

From `apps/api`:

```bash
npm run dev
```

This starts the Express server (by default on port `3003`).

### Frontend (React app)

From `apps/web`:

```bash
npm run dev
```

Vite will start a dev server (usually on port `5173`). The frontend is configured to talk to the backend API (update the base URL in `src/services/*` if needed).

## 📜 Scripts

### Backend (`apps/api/package.json`)

- **`npm start`**: Run the server in production mode.
- **`npm run dev`**: Run the server in development mode with file watching.
- **`npm test`**: Run all backend tests with Node’s test runner.
- **`npm run start:test`**: Start the server in test mode.
- **`npm run testblog`**: Run only the blog API tests.
- **`npm run lint`**: Run ESLint on the backend codebase.

### Frontend (`apps/web/package.json`)

- **`npm run dev`**: Start the Vite development server.
- **`npm run build`**: Create a production build of the frontend.
- **`npm run preview`**: Preview the production build locally.
- **`npm test`**: Run frontend tests with Vitest.
- **`npm run lint`**: Run ESLint on the frontend codebase.

## 🧪 Testing

### Backend Tests

From `apps/api`:

```bash
npm test
```

This runs the backend test suite (including tests in `tests/`).

### Frontend Tests

From `apps/web`:

```bash
npm test
```

This runs the React component tests using Vitest and Testing Library.

## 📝 License

This project is open source and available under the **MIT License**.

Created as part of the **Full Stack Open** curriculum (University of Helsinki).
