// app/admin/forms/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getForm } from "@/api/admin";
import type { FormResponse } from "@/api/form";

export default function ViewForm() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [form, setForm] = useState<FormResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getForm(id);
        setForm(data);
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  if (loading) {
    return <div>Loading form details...</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
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
        <h1 style={{ fontSize: 28, color: "#ccd6f6" }}>
          Form Submission #{form.id}
        </h1>
        <button
          onClick={() => router.push("/admin/forms")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#233554",
            color: "#ccd6f6",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#112240",
          padding: 32,
          borderRadius: 8,
          border: "1px solid #233554",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              color: "#8892b0",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Name
          </label>
          <div style={{ color: "#ccd6f6", fontSize: 18 }}>{form.name}</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              color: "#8892b0",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Email
          </label>
          <div style={{ color: "#ccd6f6", fontSize: 18 }}>{form.email}</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              color: "#8892b0",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Project Details
          </label>
          <div
            style={{
              color: "#ccd6f6",
              fontSize: 16,
              backgroundColor: "#0a192f",
              padding: 16,
              borderRadius: 4,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {form.body}
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              color: "#8892b0",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Submitted At
          </label>
          <div style={{ color: "#ccd6f6", fontSize: 14 }}>
            {new Date(form.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}