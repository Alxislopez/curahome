"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f9fc",
        padding: 24
      }}
    >
      <div
        style={{
          maxWidth: 600,
          textAlign: "center",
          background: "white",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <h1>🧬  CuraHome</h1><br></br>
        <h2> Phenotype-Guided Medical Assistant</h2>

        <p style={{ marginTop: 16, color: "#555" }}>
          A decision-support platform that provides first-line medical guidance
          based on self-reported symptoms, age, and phenotype factors.
        </p>

        <ul style={{ textAlign: "left", marginTop: 20 }}>
          <li>✔ Symptom-based severity assessment</li>
          <li>✔ Age & sex-aware dosage guidance</li>
          <li>✔ Emergency detection</li>
          <li>✔ Home remedies & nutrition advice</li>
          <li>✔ PDF export for offline reference</li>
        </ul>

        <Link href="/analyzer">
          <button
            style={{
              marginTop: 24,
              padding: "10px 20px",
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            Start Symptom Analysis →
          </button>

        </Link>
        <Link href="/recipes">
          <button style={{ marginTop: 12 }}>
            View Food & Recipe Guidance 🍎
          </button>
        </Link>


        <p style={{ marginTop: 16, fontSize: "0.85rem", color: "#777" }}>
          ⚠️ Not a substitute for professional medical diagnosis.
        </p>
      </div>
    </main>
  )
}
