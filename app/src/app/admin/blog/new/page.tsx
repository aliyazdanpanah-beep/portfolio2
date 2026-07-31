// app/admin/blogs/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/api/admin";

export default function NewBlog() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    body: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBlog(form);
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, color: "#ccd6f6", marginBottom: 32 }}>
        Create New Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#112240",
          padding: 32,
          borderRadius: 8,
          border: "1px solid #233554",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="title"
            style={{ display: "block", color: "#ccd6f6", marginBottom: 8 }}
          >
            Title *
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#0a192f",
              border: "1px solid #233554",
              borderRadius: 4,
              color: "#ccd6f6",
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="body"
            style={{ display: "block", color: "#ccd6f6", marginBottom: 8 }}
          >
            Content *
          </label>
          <textarea
            id="body"
            required
            rows={10}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#0a192f",
              border: "1px solid #233554",
              borderRadius: 4,
              color: "#ccd6f6",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="img"
            style={{ display: "block", color: "#ccd6f6", marginBottom: 8 }}
          >
            Image URL
          </label>
          <input
            id="img"
            type="url"
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#0a192f",
              border: "1px solid #233554",
              borderRadius: 4,
              color: "#ccd6f6",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 24px",
              backgroundColor: "#64ffda",
              color: "#0a192f",
              border: "none",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            style={{
              padding: "10px 24px",
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
  );
}