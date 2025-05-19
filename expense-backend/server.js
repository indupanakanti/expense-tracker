const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./models/expense"); // Ensure this path is correct

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI
const mongoURI =
  "mongodb+srv://cssindu04:I8RcG3lxZl0ruaBN@cluster0.yw5xs5h.mongodb.net/expenseTracker?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/api/expenses", async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail) return res.status(400).json({ message: "Missing userEmail" });

  try {
    const expenses = await Expense.find({ userEmail }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

app.post("/api/expenses", async (req, res) => {
  const { title, amount, date, category, userEmail } = req.body;

  if (!title || isNaN(amount) || !date || !userEmail) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const newExpense = new Expense({
      title: title.trim(),
      amount: parseFloat(amount),
      date,
      category: category || "General",
      userEmail,
    });

    const saved = await newExpense.save();
    res.status(201).json({ message: "Expense added", data: saved });
  } catch (err) {
    console.error("❌ Error saving expense:", err);
    res.status(500).json({ message: "Server error: Could not save expense" });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense updated", data: updated });
  } catch (err) {
    console.error("❌ Error updating expense:", err);
    res.status(500).json({ message: "Failed to update expense" });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error("❌ Error deleting expense:", err);
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

// Start server — must use 0.0.0.0 for EC2 access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running and accessible at http://your-ec2-ip:${PORT}`);
});