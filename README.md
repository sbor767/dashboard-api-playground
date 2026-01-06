# Dashboard API

REST API application built with Node.js for user management and dashboard data handling.

## Overview

Dashboard API is a playground project created to explore and understand dependency injection and dependency management patterns in larger applications through interface-based architecture.

**Note:** This is an educational project and is not intended for production use. Many aspects of a production-ready application are intentionally incomplete or simplified for learning purposes. This project demonstrates architectural patterns rather than providing a complete, hardened application.

### Purpose

The primary goal is to demonstrate:
- How to structure larger applications with clear separation of concerns
- Dependency injection patterns and inversion of control containers
- Interface-based architecture for loose coupling and testability
- Multi-layer architecture (controllers, services, repositories)

### Features

- Authentication and authorization with JWT tokens
- User management (registration, login)
- Prisma ORM for database interaction (SQLite/PostgreSQL)
- Three-layer architecture (controllers, services, repositories)
- Data validation using class-validator
- Logging with TSLog
- Unit and e2e test coverage
- Dependency injection with Inversify

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- SQLite (default) or PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sbor767/dashboard-api-playground.git
cd dashboard-api-playground
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
NODE_ENV=development
LOG_LEVEL=debug

BCRYPT_ROUNDS=10
SECRET=your-secret-key-here

DATABASE_URL=file:./dev.db
```

4. Generate Prisma client:
```bash
npm run generate
```

5. Start in development mode:
```bash
npm run dev
```

Server runs at `http://localhost:8000`

## Project Structure

```
src/
├── app.ts                 # Express application
├── main.ts                # Application entry point
├── types.ts               # Inversify container types
├── common/                # Shared components
│   ├── auth.guard.ts      # Authorization guard
│   ├── auth.middleware.ts # Authentication middleware
│   ├── validate.middleware.ts # Validation middleware
│   ├── controller.ts      # Base controller
│   └── middleware.ts      # Middleware interface
├── config/                # Application configuration
│   ├── config.service.ts  # Config service interface
│   └── default-config.service.ts # Config implementation
├── database/              # Database layer
│   ├── prisma.service.ts  # Prisma service interface
│   └── default-prisma.service.ts # Prisma implementation
├── error/                 # Error handling
│   ├── exception.filter.ts # Exception filter interface
│   ├── default-exception.filter.ts # Exception filter implementation
│   └── http-error.class.ts # HTTP error class
├── logger/                # Logging
│   ├── logger.service.ts  # Logger service interface
│   └── default-logger.service.ts # Logger implementation
├── user/                  # User module
│   ├── user.controller.ts # Controller interface
│   ├── default-user.controller.ts # Controller implementation
│   ├── user.service.ts    # Service interface
│   ├── default-user.service.ts # Service implementation
│   ├── user.repository.ts # Repository interface
│   ├── default-user.reposotory.ts # Repository implementation
│   ├── user.entity.ts     # User entity
│   └── dto/               # Data Transfer Objects
│       ├── user-register.dto.ts
│       └── user-login.dto.ts
└── types/
    └── custom.d.ts        # Custom TypeScript types
```

## Available Commands

### Development

```bash
# Start development server with auto-reload
npm run dev

# Start development server with debugging
npm run dev:inspect

# Build TypeScript
npm run build

# Start built application
npm start
```

### Testing and Code Quality

```bash
# Run all tests (unit + e2e)
npm test

# Run e2e tests with coverage report
npm run test:e2e

# Check code with ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint:fix
```

### Database

```bash
# Generate Prisma client
npm run generate

# Open Prisma Studio
npx prisma studio
```

## API Endpoints

### User Registration

```http
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### User Login

```http
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Architecture

The project uses a three-layer architecture:

1. **Controller Layer** - HTTP request handling
2. **Service Layer** - Business logic
3. **Repository Layer** - Database interaction

### Dependency Injection

The project uses Inversify container for dependency management:

```typescript
container.bind<UserService>(TYPES.UserService).to(DefaultUserService);
container.bind<UserRepository>(TYPES.UserRepository).to(DefaultUserRepository);
container.bind<UserController>(TYPES.UserController).to(DefaultUserController);
```

### Middleware and Guards

- **AuthMiddleware** - JWT token verification from Authorization header
- **ValidateMiddleware** - Request body validation
- **AuthGuard** - Protection for secure routes

## Database

The project uses Prisma as ORM. Current schema includes the `UserModel`:

```prisma
model UserModel {
  id       Int     @id @default(autoincrement())
  email    String
  password String
  name     String
}
```

### Migrations

Migrations are stored in `prisma/migrations/`. To create new migrations:

```bash
npx prisma migrate dev --name migration_name
```

## Testing

The project includes two types of tests:

### Unit Tests
```bash
npm test
```
Located in `*.spec.ts` files alongside source code.

### E2E Tests
```bash
npm run test:e2e
```
Located in `tests/` directory. Tests complete API request cycles.

Code coverage report is available in `coverage/lcov-report/`

## Code Quality

### ESLint & Prettier

The project uses ESLint and Prettier for code style:

```bash
# Check code
npm run lint

# Auto-fix issues
npm run lint:fix
```

Configuration files:
- `.eslintrc.json` - ESLint rules
- `.prettierrc.json` - Formatting rules

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication and authorization
- Input validation at DTO level
- Error handling that prevents information disclosure
- CORS and other protections in production

## Dependencies

### Core:
- express - web framework
- @prisma/client - ORM for database
- jsonwebtoken - JWT handling
- bcryptjs - password hashing
- class-validator - class validation
- class-transformer - data transformation
- inversify - IoC container
- tslog - logging

### Development:
- TypeScript - type safety
- Jest - testing framework
- ESLint - code analysis
- Prettier - code formatting
- nodemon - development auto-reload

## Logging

Logging is implemented using TSLog. Log levels:

```
debug - detailed debug information
info  - informational messages
warn  - warnings
error - errors
```

Configure log level with `LOG_LEVEL` variable in `.env`

## License

MIT License

## Author

Aleksandr Borkov

## Resources

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Inversify](https://inversify.io/)
- [JWT](https://jwt.io/)
