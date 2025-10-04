# Expense Management Backend - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Or production mode
   npm start
   ```

4. **Verify server is running:**
   - Health check: http://localhost:3000/health
   - API documentation: See README.md

## 🔧 Environment Configuration

The server uses SQLite by default for development. No additional database setup required!

### Environment Variables (Optional)
Create a `.env` file in the backend directory:
```env
USE_SQLITE=true
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
PORT=3000
MOCK_OCR=true
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Admin signup
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/create-user` - Create employees/managers

### Expenses
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Approvals
- `GET /api/approvals/pending` - Get pending approvals
- `GET /api/approvals/history` - Get approval history
- `POST /api/approvals/:id/approve` - Approve expense
- `POST /api/approvals/:id/reject` - Reject expense
- `GET /api/approvals/stats` - Get approval statistics

### OCR Service
- `POST /api/ocr/process-receipt` - Process receipt image
- `POST /api/ocr/process-receipt-base64` - Process base64 image
- `GET /api/ocr/status` - Get OCR service status

### Countries & Currency
- `GET /api/countries/countries` - Get all countries
- `GET /api/countries/currency/:countryName` - Get currency by country
- `POST /api/countries/convert` - Convert currencies
- `GET /api/countries/currencies` - Get supported currencies

## 🧪 Testing the API

### 1. Register Admin
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "adminName": "John Admin",
    "adminEmail": "admin@test.com",
    "password": "password123",
    "country": "United States",
    "companyName": "Test Company"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'
```

### 3. Test OCR Service
```bash
curl -X GET http://localhost:3000/api/ocr/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎯 Frontend Integration

The backend is designed to work seamlessly with your React frontend. All endpoints match the expected API structure:

- **Authentication**: JWT-based with role management
- **Multi-currency**: Automatic conversion to company currency
- **OCR**: Receipt processing with data extraction
- **Approvals**: Complex workflow with sequences and percentages
- **Real-time**: Currency conversion and country data

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Find process using port 3000
   netstat -ano | findstr :3000
   
   # Kill the process
   taskkill /PID <PID> /F
   ```

2. **Database issues:**
   - The server automatically creates and syncs the SQLite database
   - No manual database setup required

3. **JWT errors:**
   - Make sure JWT_SECRET is set in environment
   - Default fallback is provided in code

### Server Status
- **Health Check**: http://localhost:3000/health
- **Database**: SQLite (automatic)
- **Logs**: Check terminal output for detailed logs

## 📁 Project Structure

```
backend/
├── app.js                 # Main server file
├── package.json          # Dependencies
├── .env                  # Environment variables
├── db/
│   └── connection.js     # Database connection
├── models/              # Database models
├── routes/              # API routes
├── services/            # Business logic
├── middleware/          # Authentication & validation
└── uploads/             # File uploads (auto-created)
```

## 🚀 Production Deployment

For production deployment:

1. **Set up MySQL database**
2. **Configure environment variables**
3. **Set up file storage**
4. **Configure OCR service**
5. **Set up monitoring and logging**

## 📞 Support

The backend is fully functional and ready for frontend integration. All core features are implemented:

- ✅ Authentication & User Management
- ✅ Multi-currency Support
- ✅ OCR Receipt Processing
- ✅ Complex Approval Workflows
- ✅ Real-time Currency Conversion
- ✅ Database Management

**Server Status**: ✅ Running on http://localhost:3000
