// app/admin/forms/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getForms, deleteForm } from "@/api/admin";
import type { FormResponse } from "@/api/form";

export default function AdminForms() {
  const [forms, setForms] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    try {
      const data = await getForms();
      setForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this form submission?")) return;
    try {
      await deleteForm(id);
      setForms(forms.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  if (loading) {
    return <div>Loading forms...</div>;
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
        <h1 style={{ fontSize: 28, color: "#ccd6f6" }}>Form Submissions</h1>
        <span style={{ color: "#8892b0", fontSize: 14 }}>
          Total: {forms.length}
        </span>
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
                Name
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Email
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Project
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Date
              </th>
              <th style={{ padding: 12, textAlign: "left", color: "#8892b0" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr
                key={form.id}
                style={{ borderTop: "1px solid #233554" }}
              >
                <td style={{ padding: 12, color: "#ccd6f6" }}>{form.id}</td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>{form.name}</td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>{form.email}</td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>
                  <div
                    style={{
                      maxWidth: 200,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {form.body}
                  </div>
                </td>
                <td style={{ padding: 12, color: "#ccd6f6" }}>
                  {new Date(form.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: 12 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link href={`/admin/forms/${form.id}`}>
                      <button
                        style={{
                          padding: "4px 12px",
                          backgroundColor: "#233554",
                          color: "#ccd6f6",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                      >
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(form.id)}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}