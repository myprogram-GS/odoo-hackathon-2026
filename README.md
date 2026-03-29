# 🚀 ReimbursePlus – Expense Management System

A full-stack expense management system built using **React + Next.js + Node.js + Express + MongoDB**.

---

## 👥 Team Members

* Simon Pathre
* Asher Carneiro
* Gauri Salvi

---

## 🧠 Features

* 🔐 User Authentication (Signup / Login)
* 👤 Role-Based Access (Admin / Manager / Employee)
* 💸 Expense Submission
* 📊 Expense Tracking
* ✅ Approval System (Manager)
* 🌐 Full-stack integration

---

## 🏗️ Tech Stack

### Frontend

* React / Next.js
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB Atlas

---

## 📁 Project Structure

```
odoo-hackathon-2026/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── index.ts
│   ├── package.json
│   ├── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

---

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/odoo-hackathon-2026.git
cd odoo-hackathon-2026
```

---

### 🔹 2. Setup Backend

```bash
cd backend
npm install
```

---

### 🔹 3. Create `.env` file

Inside `backend/` create `.env`:

```env
MONGO_DB_URL=your_mongodb_connection_string
PORT=5000
```

---

### 🔹 4. Run Backend

```bash
npx ts-node-dev src/index.ts
```

👉 Server runs on:

```
http://localhost:5000
```

---

### 🔹 5. Setup Frontend

```bash
cd ../frontend
npm install
```

---

### 🔹 6. Run Frontend

```bash
npm run dev
```

👉 Frontend runs on:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

---

### 💸 Expenses

| Method | Endpoint        |
| ------ | --------------- |
| GET    | `/api/expenses` |
| POST   | `/api/expenses` |

---

### 👤 Users

| Method | Endpoint     |
| ------ | ------------ |
| GET    | `/api/users` |

---

## 🧪 Testing APIs

Use:

* Thunder Client (VS Code)
* Postman
* Browser (GET APIs)

Example:

```json
POST /api/expenses

{
  "amount": 5000,
  "category": "Travel",
  "description": "Flight ticket"
}
```

---

## 🎯 Workflow

```
Frontend (React)
   ↓
Backend (Express API)
   ↓
MongoDB Atlas
   ↓
Response → UI
```

---

## 🔒 Important Notes

* Do NOT push:

  * `.env`
  * `node_modules`

* Always use `.gitignore`

---

## 🚀 Future Improvements

* JWT Authentication
* Password Hashing (bcrypt)
* File Upload (Receipts)
* Dashboard Analytics
* Notifications

---

## 📌 Status

✅ Backend Completed
✅ Authentication Working
✅ Expense APIs Working
🚧 Approval System (In Progress)

---

## ⭐ Contribution

Feel free to fork and improve!

---

## 💡 Developed for Odoo Hackathon 2026
