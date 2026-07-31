// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser, createUser} from "@/api/admin";
import type { UserInfo } from "@/api/auth";

export default function AdminUsers() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createUser(newUser);
      setUsers([...users, user]);
      setShowModal(false);
      setNewUser({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "user",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <h1 style={{ fontSize: 28, color: "#ccd6f6" }}>Users</h1>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#64ffda",
            color: "#0a192f",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add User
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#112240",
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid #233554",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0a192f" }}>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                ID
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Username
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Email
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Name
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Role
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Status
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                style={{ borderTop: "1px solid #233554" }}
              >
                <td style={{ padding: 12, color: "#ccd6f6" }}>{user.id}</td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>{user.username}</td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>{user.email}</td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>
                  {user.first_name} {user.last_name}
                </td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>
                  <span
                    style={{
                      backgroundColor:
                        user.role === "admin" ? "#64ffda" : "#233554",
                      color: user.role === "admin" ? "#0a192f" : "#ccd6f6",
                      padding: "4px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>
                  <span
                    style={{
                      backgroundColor: user.is_active ? "#64ffda" : "#ff6b6b",
                      color: "#0a192f",
                      padding: "4px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: 12 }}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      padding: "4px 12px",
                      backgroundColor: "#ff6b6b",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for creating user */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#112240",
              padding: 32,
              borderRadius: 8,
              maxWidth: 500,
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#ccd6f6", marginBottom: 24 }}>
              Create New User
            </h2>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Username *"
                required
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  backgroundColor: "#0a192f",
                  border: "1px solid #233554",
                  borderRadius: 4,
                  color: "#ccd6f6",
                }}
              />
              <input
                type="email"
                placeholder="Email *"
                required
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  backgroundColor: "#0a192f",
                  border: "1px solid #233554",
                  borderRadius: 4,
                  color: "#ccd6f6",
                }}
              />
              <input
                type="password"
                placeholder="Password *"
                required
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  backgroundColor: "#0a192f",
                  border: "1px solid #233554",
                  borderRadius: 4,
                  color: "#ccd6f6",
                }}
              />
              <input
                type="text"
                placeholder="First Name"
                value={newUser.first_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, first_name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  backgroundColor: "#0a192f",
                  border: "1px solid #233554",
                  borderRadius: 4,
                  color: "#ccd6f6",
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  backgroundColor: "#0a192f",
                  border: "1px solid #233554",
                  borderRadius: 4,
                  color: "#ccd6f6",
                }}
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 20,
                  backgroundColor: "#0a192f",
                  border: "1px solid #233554",
                  borderRadius: 4,
                  color: "#ccd6f6",
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#64ffda",
                    color: "#0a192f",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#233554",
                    color: "#ccd6f6",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}