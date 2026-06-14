# Expense Tracker
TypeScript/React/Next.js/Express.js/PostgreSQL full-stack application for managing personal expenses with authentication and authorization.

## Installation (In Progress)
- Clone or download the repository
- Open the project in Visual Studio Code
- Go to the backend root folder
``` bash
cd backend
```
- Download dependencies
``` bash
npm install
```
- Go to the frontend root folder
``` bash
cd frontend
```
- Download dependencies
``` bash
npm install
```
- Open `backend/src/db/connection.ts` and remove the following lines:
```bash
 ssl: {
    rejectUnauthorized: false,
  },
````
- Update the `baseURL` in `frontend/src/services/BaseService.ts`:
```text
http://localhost:3000
```
- Build backend from the root folder:
``` bash
npm run build
```
- Start backend from the root folder:
``` bash
npm run dev
```
- Start frontend from the root folder:
``` bash
npm run dev
```
- Download and open pgAdmin
- Create a PostgreSQL database named `expense_tracker_db`
- Create tables named `users` and `expenses`

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL
);
```

### Expenses Table
```sql
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    category VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    description TEXT NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    recorded_at DATE NOT NULL,
    CONSTRAINT expenses_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

### Environment Variables
Create a `.env` file in the backend root folder:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:3001
```

### Open Application
Frontend:

```
http://localhost:3001
```

Backend API:
```
http://localhost:3000
```

Swagger Documentation:
```
http://localhost:3000/api-docs
```

## Features
- CRUD operations for user-specific expense management
- Authentication and authorization using JWT
- PostgreSQL database integration
- Layered backend architecture (routes, controllers, DAOs, middleware)
- Protected routes and user-specific data access
- REST API built with Express.js
- OpenAPI/Swagger API documentation

## Tech Stack
- TypeScript
- React
- Next.js
- Express.js
- Node.js
- PostgreSQL

## Live Demo
[View Demo](https://expense-tracker-chi-plum-24.vercel.app/)

## Screenshots

### Login Page

<img width="2552" height="1274" alt="Login Page" src="https://github.com/user-attachments/assets/11df7c97-1a55-4ed2-915a-8eb40fcff85a" />

### Expenses List Page

<img width="2552" height="1274" alt="Expenses List Page" src="https://github.com/user-attachments/assets/e7218ba5-5f80-4bd9-89ce-06d4ee452f4b" />

### Expense Create Form Page

<img width="2552" height="1274" alt="Expense Create Form Page" src="https://github.com/user-attachments/assets/a4343345-6ddb-45d2-b03e-b4c076888d6f" />
