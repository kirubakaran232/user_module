import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/updateUser/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/addUser", form);
    }

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/deleteUser/${id}`);
    fetchUsers();
  };
return (
  <div className="container mt-5">
    <div className="form-card">
      <h3 className="mb-4">User Form</h3>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            className="form-control"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12">
          <button className="btn btn-primary w-100">
            {editId ? "Update User" : "Save User"}
          </button>
        </div>
      </form>
    </div>

    <hr className="my-5" />

    <h3>Saved Users</h3>

    <table className="table table-bordered text-center mt-3">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEdit(user)}
              >
                ✏️
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user._id)}
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default App;
