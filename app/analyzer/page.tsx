"use client"

import { useState, useMemo } from "react"
import jsPDF from "jspdf"
import Link from "next/link"
import Card from "../components/card"
import SeverityBadge from "../components/severitybadge"

const SYMPTOMS = [
  {
    key: "fever",
    label: "Fever",
    keywords: ["fever", "high temperature", "hot body", "temperature"]
  },
  {
    key: "sore_throat",
    label: "Sore Throat",
    keywords: ["sore throat", "throat pain", "pain while swallowing"]
  },
  {
    key: "headache",
    label: "Headache",
    keywords: ["headache", "head pain", "migraine"]
  },
  {
    key: "cold",
    label: "Cold",
    keywords: ["cold", "blocked nose", "nasal congestion"]
  },
  {
    key: "running_nose",
    label: "Running Nose",
    keywords: ["running nose", "runny nose", "nose leaking"]
  },
  {
    key: "sneezing",
    label: "Sneezing",
    keywords: ["sneezing", "sneeze"]
  },
  {
    key: "dry_cough",
    label: "Dry Cough",
    keywords: ["dry cough", "non productive cough"]
  },
  {
    key: "wet_cough",
    label: "Wet Cough",
    keywords: ["wet cough", "phlegm cough", "productive cough"]
  },
  {
    key: "cough",
    label: "Cough",
    keywords: ["cough", "coughing"]
  },
  {
    key: "chest_congestion",
    label: "Chest Congestion",
    keywords: ["chest congestion", "heavy chest", "mucus in chest"]
  },
  {
    key: "breathlessness",
    label: "Shortness of Breath",
    keywords: ["shortness of breath", "breathlessness", "difficulty breathing"]
  },
  {
    key: "chest_pain",
    label: "Chest Pain",
    keywords: ["chest pain", "pain in chest"]
  },
  {
    key: "body_pain",
    label: "Body Pain",
    keywords: ["body pain", "body ache", "muscle pain"]
  },
  {
    key: "back_pain",
    label: "Back Pain",
    keywords: ["back pain", "lower back pain", "upper back pain"]
  },
  {
    key: "fatigue",
    label: "Fatigue",
    keywords: ["fatigue", "tiredness", "low energy"]
  },
  {
    key: "weakness",
    label: "Weakness",
    keywords: ["weakness", "feeling weak"]
  },
  {
    key: "dizziness",
    label: "Dizziness",
    keywords: ["dizziness", "giddiness", "light headed"]
  },
  {
    key: "nausea",
    label: "Nausea",
    keywords: ["nausea", "feeling sick"]
  },
  {
    key: "vomiting",
    label: "Vomiting",
    keywords: ["vomiting", "throwing up", "puking"]
  },
  {
    key: "diarrhea",
    label: "Diarrhea",
    keywords: ["diarrhea", "loose motion", "loose stools"]
  },
  {
    key: "stomach_pain",
    label: "Stomach Pain",
    keywords: ["stomach pain", "abdominal pain", "belly pain"]
  },
  {
    key: "acid_reflux",
    label: "Acid Reflux",
    keywords: ["acid reflux", "heartburn", "acidity"]
  },
  {
    key: "indigestion",
    label: "Indigestion",
    keywords: ["indigestion", "upset stomach"]
  },
  {
    key: "gas",
    label: "Gas",
    keywords: ["gas", "flatulence"]
  },
  {
    key: "bloating",
    label: "Bloating",
    keywords: ["bloating", "bloated stomach"]
  },
  {
    key: "constipation",
    label: "Constipation",
    keywords: ["constipation", "hard stool"]
  },
  {
    key: "tooth_pain",
    label: "Tooth Pain",
    keywords: ["tooth pain", "toothache", "dental pain"]
  },
  {
    key: "skin_irritation",
    label: "Skin Irritation",
    keywords: ["skin irritation", "itching", "rash"]
  },
  {
    key: "acne",
    label: "Acne",
    keywords: ["acne", "pimples"]
  },
  {
    key: "dandruff",
    label: "Dandruff",
    keywords: ["dandruff", "flaky scalp"]
  },
  {
    key: "hairfall",
    label: "Hair Fall",
    keywords: ["hair fall", "hair loss"]
  },
  {
    key: "menstrual_cramps",
    label: "Menstrual Cramps",
    keywords: ["menstrual cramps", "period pain", "period cramps"]
  }
]

function HowToModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>How to use Symptom Analyzer</h2>

        <img
          src="/analyzer-help.png"
          alt="How to use symptom analyzer"
          className="modal-image"
        />

        <ol>
          <li>
            Enter your <strong>age</strong> and <strong>sex</strong>.
            <br />
            <span className="text-muted">
              Adding weight improves dosage accuracy (optional).
            </span>
          </li>
          <li>Type symptoms and press <strong>Enter</strong></li>
          <li>Add multiple symptoms if needed</li>
          <li>Click <strong>Analyze Symptoms</strong></li>
        </ol>

        <p className="text-muted">
          This gives safe home-care guidance, not a diagnosis.
        </p>

        <button className="button-primary" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [age, setAge] = useState(25)
  const [sex, setSex] = useState<"male" | "female">("male")
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const [showHelp, setShowHelp] = useState(true)
  const [weight, setWeight] = useState<string>("")


  const availableSymptoms = useMemo(() => {
    setHighlighted(0)
    const q = search.toLowerCase()

    return SYMPTOMS.filter(s =>
      !selected.includes(s.key) &&
      (
        s.label.toLowerCase().includes(q) ||
        s.keywords?.some(k => k.includes(q))
      )
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

    const match = SYMPTOMS.find(s =>
      s.label.toLowerCase() === cleaned ||
      s.keywords?.some(k => k === cleaned)
    )

    if (match && !selected.includes(match.key)) {
      setSelected(prev => [...prev, match.key])
      setSearch("")
      return true
    }

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

    const payload: any = {
      symptoms: selected,
      age,
      sex
    }

    if (weight.trim() !== "") {
      payload.weight = Number(weight)
    }

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
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
      <div className="ana-bg" />
      <HowToModal open={showHelp} onClose={() => setShowHelp(false)} />

      <Link href="/">← Back to Home</Link>
      <Card>
        <header>
          <h1><strong>Symptom Analyzer</strong></h1>
          <button onClick={() => setShowHelp(true)} style={{ float: "right" }}>How to use?</button>
        </header>

        <label>Age</label>
        <input type="number" value={age} onChange={e => setAge(+e.target.value)} />
        <label>Weight (kg) <span className="text-muted">(optional)</span></label>
        <input
          type="number"
          placeholder="e.g. 60"
          value={weight}
          onChange={e => setWeight(e.target.value)}

        />

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
          <button className="button-a" onClick={reset} >Reset</button>
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
          <div className="text-bac">
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
                  {result.weightUsed && (
                    <p style={{ color: "white" }}>
                      Dosage adjusted using age + weight.
                    </p>
                  )}

                </ul>
              </>
            )} </div>

          <hr />

          <p className="text-muted">
            <strong>Medical Disclaimer:</strong> This application provides general
            guidance based on self-reported symptoms. It is not a medical diagnosis
            and does not replace professional medical advice.</p>

          <div className="actions">
            <button className="button-a" onClick={generatePDF}>Download PDF Report</button>
            <button
              className="button-a"
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
