// app/admin/blogs/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminBlogs, deleteBlog } from "@/api/admin"
import type { Blog } from "@/api/blog";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const data = await getAdminBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return <div>Loading blogs...</div>;
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
        <h1 style={{ fontSize: 28, color: "#ccd6f6" }}>Blogs</h1>
        <Link href="/admin/blogs/new">
          <button
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
            + New Blog
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              backgroundColor: "#112240",
              padding: 20,
              borderRadius: 8,
              border: "1px solid #233554",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ color: "#ccd6f6", marginBottom: 4 }}>
                {blog.title}
              </h3>
              <p
                style={{
                  color: "#8892b0",
                  fontSize: 14,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {blog.body}
              </p>
              <div style={{ color: "#8892b0", fontSize: 12, marginTop: 8 }}>
                {new Date(blog.created_at).toLocaleDateString()}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href={`/admin/blogs/${blog.id}`}>
                <button
                  style={{
                    padding: "6px 16px",
                    backgroundColor: "#233554",
                    color: "#ccd6f6",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(blog.id)}
                style={{
                  padding: "6px 16px",
                  backgroundColor: "#ff6b6b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}