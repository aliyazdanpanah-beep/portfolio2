// app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isLoading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check authentication only after mount and when token/loading changes
    if (mounted && !isLoading) {
      if (!token || !user || user.role !== "admin") {
        router.push("/");
      }
    }
  }, [token, user, isLoading, router, mounted]);

  // Show loading state
  if (!mounted || isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0a192f",
          color: "#ccd6f6",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 12 }}>Loading...</div>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid #233554",
              borderTop: "3px solid #64ffda",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // If not admin, don't render anything (will redirect)
  if (!token || !user || user.role !== "admin") {
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a192f" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          backgroundColor: "#0a192f",
          color: "#ccd6f6",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid #1e2a45",
        }}
      >
        <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #1e2a45" }}>
          <h2
            style={{
              fontSize: 22,
              color: "#64ffda",
              fontWeight: "bold",
              letterSpacing: "-0.5px",
            }}
          >
            Admin Panel
          </h2>
          <div
            style={{
              fontSize: 13,
              color: "#8892b0",
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                backgroundColor: "#64ffda",
                borderRadius: "50%",
              }}
            />
            {user.first_name || user.username}
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Link
            href="/admin"
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              color: pathname === "/admin" ? "#64ffda" : "#8892b0",
              textDecoration: "none",
              transition: "all 0.2s",
              backgroundColor: pathname === "/admin" ? "rgba(100, 255, 218, 0.05)" : "transparent",
              borderLeft: pathname === "/admin" ? "2px solid #64ffda" : "2px solid transparent",
            }}
            onMouseOver={(e) => {
              if (pathname !== "/admin") {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                e.currentTarget.style.color = "#ccd6f6";
              }
            }}
            onMouseOut={(e) => {
              if (pathname !== "/admin") {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#8892b0";
              }
            }}
          >
            <span style={{ marginRight: 10 }}>📊</span> Dashboard
          </Link>

          <Link
            href="/admin/users"
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              color: pathname.startsWith("/admin/users") ? "#64ffda" : "#8892b0",
              textDecoration: "none",
              transition: "all 0.2s",
              backgroundColor: pathname.startsWith("/admin/users") ? "rgba(100, 255, 218, 0.05)" : "transparent",
              borderLeft: pathname.startsWith("/admin/users") ? "2px solid #64ffda" : "2px solid transparent",
            }}
            onMouseOver={(e) => {
              if (!pathname.startsWith("/admin/users")) {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                e.currentTarget.style.color = "#ccd6f6";
              }
            }}
            onMouseOut={(e) => {
              if (!pathname.startsWith("/admin/users")) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#8892b0";
              }
            }}
          >
            <span style={{ marginRight: 10 }}>👥</span> Users
          </Link>

          <Link
            href="/admin/blogs"
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              color: pathname.startsWith("/admin/blogs") ? "#64ffda" : "#8892b0",
              textDecoration: "none",
              transition: "all 0.2s",
              backgroundColor: pathname.startsWith("/admin/blogs") ? "rgba(100, 255, 218, 0.05)" : "transparent",
              borderLeft: pathname.startsWith("/admin/blogs") ? "2px solid #64ffda" : "2px solid transparent",
            }}
            onMouseOver={(e) => {
              if (!pathname.startsWith("/admin/blogs")) {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                e.currentTarget.style.color = "#ccd6f6";
              }
            }}
            onMouseOut={(e) => {
              if (!pathname.startsWith("/admin/blogs")) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#8892b0";
              }
            }}
          >
            <span style={{ marginRight: 10 }}>📝</span> Blogs
          </Link>

          <Link
            href="/admin/forms"
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              color: pathname.startsWith("/admin/forms") ? "#64ffda" : "#8892b0",
              textDecoration: "none",
              transition: "all 0.2s",
              backgroundColor: pathname.startsWith("/admin/forms") ? "rgba(100, 255, 218, 0.05)" : "transparent",
              borderLeft: pathname.startsWith("/admin/forms") ? "2px solid #64ffda" : "2px solid transparent",
            }}
            onMouseOver={(e) => {
              if (!pathname.startsWith("/admin/forms")) {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                e.currentTarget.style.color = "#ccd6f6";
              }
            }}
            onMouseOut={(e) => {
              if (!pathname.startsWith("/admin/forms")) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#8892b0";
              }
            }}
          >
            <span style={{ marginRight: 10 }}>📋</span> Forms
          </Link>
        </nav>

        {/* Logout button at bottom */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 16,
            borderTop: "1px solid #1e2a45",
          }}
        >
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            style={{
              width: "100%",
              padding: "10px 14px",
              backgroundColor: "transparent",
              border: "1px solid #ff6b6b",
              borderRadius: 6,
              color: "#ff6b6b",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: 14,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ff6b6b";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#ff6b6b";
            }}
          >
            <span style={{ marginRight: 8 }}>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: 260,
          flex: 1,
          padding: "32px 40px",
          backgroundColor: "#0a192f",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}