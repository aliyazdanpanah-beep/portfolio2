// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, token } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin
  if (token) {
    router.push("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      router.push("/admin");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a192f",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#112240",
          padding: "48px 40px",
          borderRadius: 8,
          border: "1px solid #1e2a45",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 28,
              color: "#ccd6f6",
              marginBottom: 8,
            }}
          >
            Admin Login
          </h1>
          <p
            style={{
              color: "#8892b0",
              fontSize: 14,
            }}
          >
            Enter your credentials to access the admin panel
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "rgba(255, 107, 107, 0.1)",
              border: "1px solid #ff6b6b",
              color: "#ff6b6b",
              padding: "10px 14px",
              borderRadius: 4,
              marginBottom: 20,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="username"
              style={{
                display: "block",
                color: "#ccd6f6",
                marginBottom: 6,
                fontSize: 14,
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "#0a192f",
                border: "1px solid #1e2a45",
                borderRadius: 4,
                color: "#ccd6f6",
                fontSize: 16,
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#64ffda";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#1e2a45";
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                color: "#ccd6f6",
                marginBottom: 6,
                fontSize: 14,
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "#0a192f",
                border: "1px solid #1e2a45",
                borderRadius: 4,
                color: "#ccd6f6",
                fontSize: 16,
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#64ffda";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#1e2a45";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#64ffda",
              color: "#0a192f",
              border: "none",
              borderRadius: 4,
              fontSize: 16,
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}