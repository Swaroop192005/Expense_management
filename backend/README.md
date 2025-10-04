# Expense Management Backend

A Node.js/Express backend API for managing employee expenses with approval workflows.

## Features

- User authentication and authorization (JWT)
- Role-based access control (Employee, Manager, Admin)
- Expense management (CRUD operations)
- Approval workflow system
- Company management
- File upload for receipts
- MySQL database integration

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

3. Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=expense_management
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_here
```

4. Create the MySQL database:
```sql
CREATE DATABASE expense_management;
```

5. Run database migrations:
```bash
npm run migrate
```

6. Seed the database with sample data:
```bash
npm run seed
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Expenses
- `GET /api/expenses` - Get user's expenses
- `GET /api/expenses/:id` - Get specific expense
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/expenses` - Get all expenses (admin/manager)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `PUT /api/admin/users/:id/role` - Update user role

### Approvals
- `GET /api/approvals/pending` - Get pending approvals
- `POST /api/approvals/:id/decision` - Approve/reject expense
- `GET /api/approvals/:id/history` - Get approval history
- `GET /api/approvals/rules` - Get approval rules
- `POST /api/approvals/rules` - Create approval rule

## Database Schema

The application uses the following main entities:
- Users (employees, managers, admins)
- Companies
- Expenses
- Approval Rules
- Approver Sequences

## Default Users

After running the seed script, you can use these default accounts:
- Admin: `admin@example.com` / `admin123`
- Manager: `manager@example.com` / `manager123`
- Employee: `employee@example.com` / `employee123`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | localhost |
| `DB_PORT` | MySQL port | 3306 |
| `DB_NAME` | Database name | expense_management |
| `DB_USER` | Database username | root |
| `DB_PASSWORD` | Database password | (empty) |
| `PORT` | Server port | 3000 |
| `JWT_SECRET` | JWT secret key | (required) |
| `NODE_ENV` | Environment | development |

## Scripts

- `npm start` - Start the application
- `npm run dev` - Start in development mode with nodemon
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Health Check

The API provides a health check endpoint at `/health` that returns the current status of the application.

## Error Handling

The API uses consistent error response format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Helmet for security headers
- Rate limiting
- Input validation
- SQL injection protection (Sequelize ORM)
