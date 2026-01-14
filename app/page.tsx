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
    setSelected((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    )
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
    <main style={{ padding: 20, maxWidth: 600 }}>
      <h1>🩺 Symptom Analyzer</h1>

      {SYMPTOMS.map((s) => (
        <div key={s.key}>
          <input
            type="checkbox"
            checked={selected.includes(s.key)}
            onChange={() => toggle(s.key)}
          />
          <label style={{ marginLeft: 8 }}>{s.label}</label>
        </div>
      ))}

      <button onClick={analyze} disabled={loading || selected.length === 0}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Severity: {result.severity}</h3>
          <p>{result.recommendation}</p>

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
          {result.medicines && result.medicines.length > 0 && (
            <>
              <h4>💊 First-line Medicines</h4>
              <ul>
                {result.medicines.map((med: any, i: number) => (
                  <li key={i}>
                    <strong>{med.name}</strong> — {med.dose} <br />
                    <small>{med.frequency}</small>
                    {med.notes && <div>⚠️ {med.notes}</div>}
                  </li>
                ))}
              </ul>
            </>
          )}


          {!result.allowHomeCare && (
            <p style={{ color: "red" }}>
              🚨 Please seek immediate medical attention.
            </p>
          )}
          <hr style={{ marginTop: 20 }} />

          <p style={{ fontSize: "0.85rem", color: "gray" }}>
            ⚠️ <strong>Medical Disclaimer:</strong> This application provides general
            guidance based on self-reported symptoms. It is not a medical diagnosis
            and does not replace professional medical advice. If symptoms worsen or
            emergency symptoms appear, seek immediate medical care.
          </p>

        </div>

      )}
    </main>
  )

}
