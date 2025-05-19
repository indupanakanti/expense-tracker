import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "General",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE = "http://54.210.81.74:5000/api";

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
    } else {
      const fetchExpenses = async () => {
        try {
          const res = await axios.get(`${API_BASE}/expenses`, {
            params: { userEmail },
          });
          setExpenses(res.data);
        } catch (error) {
          toast.error("Failed to fetch expenses.");
        }
      };
      fetchExpenses();
    }
  }, [userEmail, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, amount, date, category } = formData;

    if (!title.trim() || isNaN(parseFloat(amount))) {
      toast.error("Valid title and amount are required");
      return;
    }

    const payload = {
      title: title.trim(),
      amount: parseFloat(amount),
      date: date || new Date().toISOString().split("T")[0],
      category,
      userEmail,
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/expenses/${editingId}`, payload);
        toast.success("Expense updated!");
      } else {
        await axios.post(`${API_BASE}/expenses`, payload);
        toast.success("Expense added!");
      }
      resetForm();
      const res = await axios.get(`${API_BASE}/expenses`, { params: { userEmail } });
      setExpenses(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/expenses/${id}`);
      toast.warn("Expense deleted!");
      const res = await axios.get(`${API_BASE}/expenses`, { params: { userEmail } });
      setExpenses(res.data);
    } catch (error) {
      toast.error("Failed to delete expense.");
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      title: expense.title,
      amount: expense.amount,
      date: expense.date,
      category: expense.category,
    });
    setEditingId(expense._id);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      date: "",
      category: "General",
    });
    setEditingId(null);
  };

  const filteredExpenses = expenses.filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpense = filteredExpenses
    .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
    .toFixed(2);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome, {userEmail}!</p>
      <button
        onClick={() => {
          localStorage.removeItem("userEmail");
          navigate("/login");
        }}
      >
        Logout
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          {["General", "Food", "Travel", "Shopping", "Bills"].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">{editingId ? "Update" : "Add Expense"}</button>
      </form>

      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2>Total: ₹{totalExpense}</h2>
      <ul>
        {filteredExpenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount} ({exp.category}) on {exp.date}
            <button onClick={() => handleEdit(exp)}>Edit</button>
            <button onClick={() => handleDelete(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Dashboard;

