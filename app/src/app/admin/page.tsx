// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/lib/api/admin";
import { getAdminBlogs } from "@/lib/api/admin";
import { getForms } from "@/lib/api/admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    blogs: 0,
    forms: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, blogs, forms] = await Promise.all([
          getUsers(),
          getAdminBlogs(),
          getForms(),
        ]);
        setStats({
          users: users.length,
          blogs: blogs.length,
          forms: forms.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, color: "#ccd6f6", marginBottom: 32 }}>
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 24,
        }}
      >
        <div
          style={{
            backgroundColor: "#112240",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #233554",
          }}
        >
          <div style={{ color: "#8892b0", fontSize: 14, marginBottom: 8 }}>
            Total Users
          </div>
          <div style={{ color: "#64ffda", fontSize: 32, fontWeight: "bold" }}>
            {stats.users}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#112240",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #233554",
          }}
        >
          <div style={{ color: "#8892b0", fontSize: 14, marginBottom: 8 }}>
            Total Blogs
          </div>
          <div style={{ color: "#64ffda", fontSize: 32, fontWeight: "bold" }}>
            {stats.blogs}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#112240",
            padding: 24,
            borderRadius: 8,
            border: "1px solid #233554",
          }}
        >
          <div style={{ color: "#8892b0", fontSize: 14, marginBottom: 8 }}>
            Total Forms
          </div>
          <div style={{ color: "#64ffda", fontSize: 32, fontWeight: "bold" }}>
            {stats.forms}
          </div>
        </div>
      </div>
    </div>
  );
}