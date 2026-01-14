"use client"

import { useState } from "react"

const SYMPTOMS = [
  { key: "fever", label: "Fever" },
  { key: "cold", label: "Cold" },
  { key: "cough", label: "Cough" },
  { key: "sore_throat", label: "Sore Throat" },
  { key: "breathlessness", label: "Shortness of Breath" },
  { key: "chest_pain", label: "Chest Pain" }
]

export default function Home() {
  const [selected, setSelected] = useState<string[]>([])
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  function toggle(symptom: string) {
    setSelected(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  function reset() {
    setSelected([])
    setResult(null)
  }

  async function analyze() {
    setLoading(true)
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: selected })
    })

    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "auto" }}>
      <h1 style={{ marginBottom: 12 }}>🩺 Symptom Analyzer</h1>
      <p style={{ color: "#555" }}>
        Select symptoms below to receive guidance.
      </p>

      {/* Symptom Selection */}
      <div style={{ marginTop: 20 }}>
        {SYMPTOMS.map(s => (
          <div key={s.key} style={{ marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={selected.includes(s.key)}
              onChange={() => toggle(s.key)}
            />
            <label style={{ marginLeft: 8 }}>{s.label}</label>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={analyze}
          disabled={loading || selected.length === 0}
          style={{ marginRight: 8 }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button onClick={reset} disabled={loading}>
          Reset
        </button>
      </div>

      {/* Results */}
      {result && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fafafa"
          }}
        >
          <h3>
            Severity:{" "}
            <span
              style={{
                color:
                  result.severity === "Severe"
                    ? "red"
                    : result.severity === "Moderate"
                      ? "orange"
                      : "green"
              }}
            >
              {result.severity}
            </span>
          </h3>

          <p>{result.recommendation}</p>

          {/* Emergency Warning */}
          {!result.allowHomeCare && (
            <div
              style={{
                background: "#ffe5e5",
                padding: 12,
                borderRadius: 6,
                color: "red",
                marginTop: 12
              }}
            >
              🚨 <strong>Emergency Warning:</strong> Seek immediate medical
              attention.
            </div>
          )}

          {/* Home Care */}
          {result.allowHomeCare && (
            <>
              <h4>🏠 Home Remedies</h4>
              <ul>
                {result.remedies?.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <h4>🍎 Recommended Foods</h4>
              <ul>
                {result.foods?.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {/* Medicines */}
          {result.medicines?.length > 0 && (
            <>
              <h4>💊 First-line Medicines</h4>
              <ul>
                {result.medicines.map((med: any, i: number) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <strong>{med.name}</strong> — {med.dose}
                    <br />
                    <small>{med.frequency}</small>
                    {med.notes && <div>⚠️ {med.notes}</div>}
                  </li>
                ))}
              </ul>
            </>
          )}

          <hr style={{ marginTop: 20 }} />

          {/* Disclaimer */}
          <p style={{ fontSize: "0.85rem", color: "#666" }}>
            ⚠️ <strong>Medical Disclaimer:</strong> This application provides
            general guidance based on self-reported symptoms. It is not a medical
            diagnosis and does not replace professional medical advice. If
            symptoms worsen or emergency symptoms appear, seek immediate medical
            care.
          </p>
        </div>
      )}
    </main>
  )
}
