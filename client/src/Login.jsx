import React, { useEffect, useState } from "react";
import "./Login.css";

function Login() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [editId, setEditId] = useState(null);

  // Fetch all users
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  // Add or edit user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const res = await fetch(`http://localhost:5000/api/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setUsers(users.map((u) => (u._id === editId ? updated : u)));
      setEditId(null);
    } else {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }
    setForm({ username: "", email: "", password: "" });
  };

  // Delete user
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u._id !== id));
  };

  // Edit user
  const handleEdit = (user) => {
    setForm({ username: user.username, email: user.email, password: user.password });
    setEditId(user._id);
  };

  return (
    <div className="login-container">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} User</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ username: "", email: "", password: "" }); }}>Cancel</button>}
      </form>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>
            <span>{user.username} ({user.email})</span>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
