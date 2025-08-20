# Node.js RESTful API Starter

A robust and scalable RESTful API starter template built with Node.js, Express, and TypeScript. This project is designed to provide a solid foundation for your next backend application, following modern best practices and a clean architecture.

## ✨ Features

  * **RESTful API:** Clean, well-structured API endpoints for users and todos.
  * **Database:** Powered by **Prisma ORM** for type-safe database access with PostgreSQL.
  * **Authentication & Authorization:** Secure JWT-based authentication with role-based access control.
  * **Error Handling:** Centralized error handling using custom `ApiError` classes for consistent responses.
  * **Validation:** End-to-end data validation with **Zod** schema.
  * **Security:**
      * HTTP security headers with **Helmet**.
      * Request compression with **Compression**.
      * Cross-Origin Resource Sharing (CORS) with `cors`.
      * Rate limiting to prevent abuse.
  * **Logging:** Production-ready logging with **Pino**, configured for both development and production.
  * **Code Structure:** Clean **Controller-Service** pattern for separation of concerns.
  * **Database Seeding:** Scripts to easily populate the database with initial data.
  * **Environment Management:** Configuration with a `.env` file for secure credentials.

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (v18 or higher)
  * PostgreSQL

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  Install dependencies:

    ```sh
    npm install
    ```

3.  Create a `.env` file in the root directory and add your database connection string:

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/yourdb"
    JWT_SECRET="your_jwt_secret_key"
    ```

### Database Setup

Run the following commands to create your database schema and seed it with initial data (admin and user accounts):

```sh
# Run Prisma migrations
npm run prisma:dev

# Seed the database
npm run prisma:seed
```

You can also run both in a single command for a clean setup:

```sh
npm run prisma:dev:reset:seed
```

### Running the Application

To start the development server:

```sh
npm run dev
```

The server will be available at `http://localhost:5000` (or the port you specify in your `.env`).

-----

## 💡 API Endpoints

All API endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint             | Description              |
| :----- | :------------------- | :----------------------- |
| `POST` | `/api/auth/register` | Register a new user      |
| `POST` | `/api/auth/login`    | Authenticate a user      |

### Users

| Method | Endpoint            | Description                                | Access         |
| :----- | :------------------ | :----------------------------------------- | :------------- |
| `GET`  | `/api/users`        | Get a paginated list of all users          | Admin          |
| `GET`  | `/api/users/:id`    | Get a single user by ID                    | Admin, User    |
| `PATCH`| `/api/users/:id`    | Update a user's details                    | Admin          |
| `DELETE`|`/api/users/:id`    | Delete a user                              | Admin          |

### Todos

| Method | Endpoint            | Description                                | Access         |
| :----- | :------------------ | :----------------------------------------- | :------------- |
| `GET`  | `/api/todos`        | Get a paginated list of all todos          | Admin          |
| `GET`  | `/api/todos/:id`    | Get a single todo by ID                    | Admin, User    |
| `POST` | `/api/todos`        | Create a new todo                          | Authenticated  |
| `PATCH`| `/api/todos/:id`    | Update a todo                              | Authenticated  |
| `DELETE`|`/api/todos/:id`    | Delete a todo                              | Authenticated  |

-----

## 📂 Project Structure

```
.
├── src/
│   ├── config/              # Application-wide settings (env, cors, etc.)
│   ├── controllers/         # Handles HTTP requests and responses
│   ├── middlewares/         # Middleware for auth, error handling, etc.
│   ├── routes/              # Express route definitions
│   ├── services/            # Business logic and database operations
│   ├── schemas/             # Zod schemas for data validation
│   ├── utils/               # Helper functions and custom errors
│   ├── lib/                 # Third-party libraries (e.g., Prisma client)
│   ├── types/               # Custom TypeScript types
│   └── app.ts               # Main Express application setup
├── prisma/                  # Prisma schema and database migrations
│   └── seed.ts              # Seeding script for initial data
├── .env.example
├── tsconfig.json
└── package.json
```
