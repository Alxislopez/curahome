"use client"

import Link from "next/link"
import Card from "./components/card"

export default function Home() {
  return (
    <main className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card className="text-center" style={{ maxWidth: 600 }}>
        <h1 style={{ marginBottom: 8 }}>CuraHome</h1>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text-muted)", marginBottom: 24 }}>
          Phenotype-Guided Medical Assistant
        </h2>

        <p className="text-muted" style={{ marginBottom: 24 }}>
          A decision-support platform that provides first-line medical guidance
          based on self-reported symptoms, age, and phenotype factors.
        </p>

        <div style={{ textAlign: "left", marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, marginBottom: 12 }}>Key Features</h3>
          <ul style={{ listStyle: "none", marginLeft: 0 }}>
            <li style={{ marginBottom: 8 }}>✓ Symptom-based severity assessment</li>
            <li style={{ marginBottom: 8 }}>✓ Age and sex-aware dosage guidance</li>
            <li style={{ marginBottom: 8 }}>✓ Emergency detection</li>
            <li style={{ marginBottom: 8 }}>✓ Home remedies and nutrition advice</li>
            <li style={{ marginBottom: 8 }}>✓ PDF export for offline reference</li>
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/analyzer">
            <button className="button-primary" style={{ width: "100%" }}>
              Start Symptom Analysis
            </button>
          </Link>

          <Link href="/recipes">
            <button className="button-secondary" style={{ width: "100%" }}>
              View Food & Recipe Guidance
            </button>
          </Link>
        </div>

        <p className="text-muted" style={{ marginTop: 24, marginBottom: 0, fontSize: 13 }}>
          <strong>Medical Disclaimer:</strong> This application provides general guidance.
          It is not a substitute for professional medical diagnosis.
        </p>
      </Card>
    </main>
  )
}
