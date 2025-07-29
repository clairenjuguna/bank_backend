# bank_backend# 🏦 Banking Dashboard Backend

This is the backend service for the Banking Dashboard application, built with **Node.js**, **Express**, and **TypeScript**. It provides RESTful APIs for user authentication, account balance tracking, transaction history, and money transfers.

---

## 🚀 Features

- 🔐 User registration and login (JWT-based authentication)
- 🧾 View and manage transaction history
- 💰 Track account balance
- 🔁 Perform money transfers
- 🛡️ Protected routes for authenticated users
- 🧪 Input validation and error handling
- 🧪 Unit testing support

---

## 🧰 Technologies Used

- Node.js
- Express.js
- TypeScript
- JWT (jsonwebtoken)
- MySQL / PostgreSQL (selectable database)
- bcrypt (for password hashing)
- express-validator (input validation)
- dotenv
- Jest (for testing)

---

## 📁 Project Structure

banking-backend/
├── src/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── app.ts
│ └── server.ts
├── tests/
├── .env
├── tsconfig.json
├── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/clairenjuguna/bank_backend.git
cd bank_backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file in the root:

ini
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bank_dashboard
JWT_SECRET=your_jwt_secret
🔒 Replace with your actual database credentials.

4. Run the Server (Dev Mode)
bash
Copy
Edit
npm run dev
5. Build for Production
bash
Copy
Edit
npm run build
npm start
🔌 API Endpoints
Auth
POST /api/users/register – Register a new user

POST /api/users/login – Authenticate and return JWT

Users
GET /api/users/:id/balance – Get account balance

GET /api/users/:id/transactions – Get transaction history

Transactions
POST /api/transactions/transfer – Transfer money to another user

✅ Running Tests
bash
Copy
Edit
npm test
📜 License
MIT License © 2025 Charity Njuguna



---

