const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userEmail: String,
  title: String,
  amount: Number,
  date: String,
  category: String,
});

module.exports = mongoose.model("Expense", ExpenseSchema);
