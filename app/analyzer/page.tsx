"use client"

import { useState, useMemo } from "react"
import jsPDF from "jspdf"
import Link from "next/link"
import Card from "../components/card"
import SeverityBadge from "../components/severitybadge"

const SYMPTOMS = [
  { key: "fever", label: "Fever" },
  { key: "sore_throat", label: "Sore Throat" },
   { key: "headache", label: "headache" },
  { key: "cold", label: "Cold" },
  { key: "running_nose", label: "Running Nose" },
  { key: "sneezing", label: "Sneezing" },
  { key: "dry_cough", label: "Dry Cough" },
  { key: "wet_cough", label: "Wet Cough" },
  { key: "cough", label: "Cough" },
  { key: "chest_congestion", label: "Chest Congestion" },
  { key: "breathlessness", label: "Shortness of Breath" },
  { key: "chest_pain", label: "Chest Pain" },
  { key: "body_pain", label: "Body Pain" },
  { key: "back_pain", label: "Back Pain" },
  { key: "fatigue", label: "Fatigue" },
  { key: "weakness", label: "Weakness" },
  { key: "dizziness", label: "Dizziness" },
  { key: "nausea", label: "Nausea" },
  { key: "vomiting", label: "Vomiting" },
  { key: "diarrhea", label: "Diarrhea" },
  { key: "stomach_pain", label: "Stomach Pain" },
  { key: "acid_reflux", label: "Acid Reflux" },
  { key: "indigestion", label: "Indigestion" },
  { key: "gas", label: "Gas" },
  { key: "bloating", label: "Bloating" },
  { key: "constipation", label: "Constipation" },
  { key: "tooth_pain", label: "Tooth Pain" },
  { key: "skin_irritation", label: "Skin Irritation" },
  { key: "acne", label: "Acne" },
  { key: "pimples", label: "Pimples" },
  { key: "dandruff", label: "Dandruff" },
  { key: "hairfall", label: "Hair Fall" },
  { key: "menstrual_cramps", label: "Menstrual Cramps" }
]

export default function Home() {
  const [age, setAge] = useState(25)
  const [sex, setSex] = useState<"male" | "female">("male")
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
const [highlighted, setHighlighted] = useState(0)

  const availableSymptoms = useMemo(() => {
  setHighlighted(0)
  return SYMPTOMS.filter(
    s =>
      !selected.includes(s.key) &&
      s.label.toLowerCase().includes(search.toLowerCase())
  )
}, [search, selected])


  const addSymptom = (key: string) => {
    setSelected(prev => [...prev, key])
    setSearch("")
  }

  const removeSymptom = (key: string) => {
    setSelected(prev => prev.filter(s => s !== key))
  }

  const reset = () => {
    setAge(25)
    setSex("male")
    setSelected([])
    setSearch("")
    setResult(null)
  }
function tryAutoTokenize(value: string) {
  const cleaned = value.trim().toLowerCase()
  if (!cleaned) return false

  // 1️⃣ Exact match
  const exact = SYMPTOMS.find(
    s => s.label.toLowerCase() === cleaned
  )

  if (exact && !selected.includes(exact.key)) {
    setSelected(prev => [...prev, exact.key])
    setSearch("")
    return true
  }

  // 2️⃣ Partial match → pick first suggestion
  const partial = availableSymptoms[0]

  if (partial && !selected.includes(partial.key)) {
    setSelected(prev => [...prev, partial.key])
    setSearch("")
    return true
  }

  return false
}


  async function analyze() {
    setLoading(true)
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: selected, age, sex })
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  function generatePDF() {
    if (!result) return
    const doc = new jsPDF()
    let y = 10

    doc.setFontSize(16)
    doc.text("CuraHome: Medical Guidance Report", 10, y)
    y += 10

    doc.setFontSize(12)
    doc.text(`Age: ${age}`, 10, y)
    y += 6
    doc.text(`Sex: ${sex}`, 10, y)
    y += 10

    doc.text(`Symptoms: ${selected.join(", ")}`, 10, y)
    y += 10

    doc.text(`Severity: ${result.severity}`, 10, y)
    y += 6
    doc.text(`Recommendation: ${result.recommendation}`, 10, y)
    y += 10

    if (result.allowHomeCare) {
      doc.text("Home Remedies:", 10, y)
      y += 6
      result.remedies?.forEach((r: string) => {
        doc.text(`- ${r}`, 12, y)
        y += 5
      })

      y += 4
      doc.text("Recommended Foods:", 10, y)
      y += 6
      result.foods?.forEach((f: string) => {
        doc.text(`- ${f}`, 12, y)
        y += 5
      })
    }

    if (result.medicines?.length) {
      y += 6
      doc.text("First-line Medicines:", 10, y)
      y += 6
      result.medicines.forEach((m: any) => {
        doc.text(`- ${m.name}: ${m.dose}, ${m.frequency}`, 12, y)
        y += 5
      })
    }

    y += 10
    doc.setFontSize(10)
    doc.text(
      "Disclaimer: This is not a medical diagnosis.",
      10,
      y,
      { maxWidth: 180 }
    )

    doc.save("medical_guidance.pdf")
  }

  return (
    <main className="container">
      <Link href="/">← Back to Home</Link>

      <Card>
        <h1>Symptom Analyzer</h1>

        <label>Age</label>
        <input type="number" value={age} onChange={e => setAge(+e.target.value)} />

        <label>Sex</label>
        <select value={sex} onChange={e => setSex(e.target.value as any)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <hr />

        <label>Symptoms</label>

        {/* TOKEN INPUT */}
        <div className="token-input">
          {selected.map(key => (
            <span key={key} className="token selected">
              {SYMPTOMS.find(s => s.key === key)?.label}
              <button onClick={() => removeSymptom(key)}>×</button>
            </span>
          ))}

        <input
  value={search}
  placeholder="Search or type symptom..."
  onChange={e => setSearch(e.target.value)}
  onKeyDown={e => {
    // ⬅ Backspace removes last token
    if (e.key === "Backspace" && search === "" && selected.length) {
      e.preventDefault()
      removeSymptom(selected[selected.length - 1])
      return
    }

    // ⏎ Enter / comma / space → auto tokenize
    if (["Enter", ",", " "].includes(e.key)) {
      e.preventDefault()
      tryAutoTokenize(search)
      return
    }

    // ⬇ Arrow down highlight
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted(h => Math.min(h + 1, availableSymptoms.length - 1))
    }

    // ⬆ Arrow up highlight
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted(h => Math.max(h - 1, 0))
    }
  }}
  onBlur={() => tryAutoTokenize(search)}
/>


        </div>

        {/* AVAILABLE TOKENS */}
        <div className="token-list">
  {availableSymptoms.map((s, i) => (
    <span
      key={s.key}
      className={`token selectable ${i === highlighted ? "highlighted" : ""}`}
      onClick={() => addSymptom(s.key)}
    >
      {s.label}
    </span>
  ))}
</div>


        <div className="actions">
          <button className="button-a" onClick={analyze} disabled={!selected.length || loading}>
            {loading ? "Analyzing..." : "Analyze Symptoms"}
          </button>
          <button className="button-a" onClick={reset} className="secondary">Reset</button>
        </div>
      </Card>

      {result && (
        <Card>
            {result.conditions?.length === 0 && (
  <p className="wtext-muted">
    No exact condition match found for the selected symptoms.
  </p>
)}
            {result.conditions?.length > 0 && (
  <>
    <h4><strong>Possible Conditions </strong></h4>
    <ul>
      {result.conditions.map((c: string, i: number) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
    <hr />
  </>
)}

          <SeverityBadge severity={result.severity} />
          <p>{result.recommendation}</p>

          {result.allowHomeCare && (
            <>
              <h4><strong>Home Remedies</strong></h4>
              <ul>{result.remedies?.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul>

              <h4><strong>Recommended Foods</strong></h4>
              <ul>{result.foods?.map((f: string, i: number) => <li key={i}>{f}</li>)}</ul>
            </>
          )}

          {result.medicines?.length > 0 && (
            <>
              <h4><strong>First-line Medicines</strong></h4>
              <ul>
                {result.medicines.map((m: any, i: number) => (
                  <li key={i}>
                    <strong>{m.name}</strong> — {m.dose}
                    <div>{m.frequency}</div>
                    {m.notes && <small>{m.notes}</small>}
                  </li>
                ))}
              </ul>
            </>
          )}

          <hr />

          <p className="text-muted">
           <strong>Medical Disclaimer:</strong> This application provides general
  guidance based on self-reported symptoms. It is not a medical diagnosis
  and does not replace professional medical advice.</p>

          <div className="actions">
            <button onClick={generatePDF}>Download PDF Report</button>
            <button
              className="secondary"
              onClick={() => window.location.href = `/recipes?symptoms=${selected.join(",")}`}
            >
              View Recommended Recipes
            </button>
          </div>
        </Card>
      )}
    </main>
  )
}
