# Expense Tracker (Full Stack Project)

**Live Frontend:**  
[Open React App](http://project-expense-frontend.s3-website-us-east-1.amazonaws.com)

**Backend API:**  
[Open API Server](http://54.210.81.74:5000/api/expenses?userEmail=test@example.com)

**Tech Stack:**  
React | Node.js | Express | MongoDB Atlas | AWS S3 | AWS EC2

---

## Features

- User login and registration
- Add, edit, and delete expenses
- Search/filter by category, title, and date
- Stores data securely using MongoDB Atlas
- Responsive UI for desktop and mobile
- Hosted frontend on AWS S3
- Hosted backend on AWS EC2 (Node.js API)

---

## Folder Structure

```
expense-tracker/
│
├── expense-backend/       # Express backend API
│   └── models/            # Mongoose schema
│   └── server.js          # Express server
│
├── public/                # Public files for frontend
├── src/                   # React components and pages
│   └── Pages/             # Dashboard, Login, Register
│
├── .env                   # MongoDB URI (not uploaded)
├── package.json           # Project metadata
```

---

## How to Run Locally

1. Clone this repository  
2. Navigate to `expense-backend` and run `npm install`  
3. In another terminal, navigate to root and run `npm install` for React  
4. Make sure MongoDB Atlas URI is set in `.env`  
5. Run backend with `node server.js`  
6. Run frontend with `npm start`

---

## Author

**Indu Panakanti**  
