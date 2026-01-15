"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import Link from "next/link"
import Card from "../components/card"
import SeverityBadge from "../components/severitybadge"


const SYMPTOMS = [
    { key: "fever", label: "Fever" },
    { key: "cold", label: "Cold" },
    { key: "cough", label: "Cough" },
    { key: "sore_throat", label: "Sore Throat" },
    { key: "breathlessness", label: "Shortness of Breath" },
    { key: "chest_pain", label: "Chest Pain" }
]

export default function Home() {
    // 🔹 NEW: Age & Sex
    const [age, setAge] = useState<number>(25)
    const [sex, setSex] = useState<"male" | "female">("male")

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
        setAge(25)
        setSex("male")
    }

    async function analyze() {
        setLoading(true)

        const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                symptoms: selected,
                age,
                sex
            })
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
        doc.text("CuraHome: Phenotype-Guided Medical Guidance", 10, y)
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

            y += 5
            doc.text("Recommended Foods:", 10, y)
            y += 6
            result.foods?.forEach((f: string) => {
                doc.text(`- ${f}`, 12, y)
                y += 5
            })
        }

        if (result.medicines?.length > 0) {
            y += 5
            doc.text("First-line Medicines:", 10, y)
            y += 6

            result.medicines.forEach((med: any) => {
                doc.text(
                    `- ${med.name}: ${med.dose}, ${med.frequency}`,
                    12,
                    y
                )
                y += 5
            })
        }

        y += 10
        doc.setFontSize(10)
        doc.text(
            "Disclaimer: This document is not a medical diagnosis. Seek professional care if symptoms worsen.",
            10,
            y,
            { maxWidth: 180 }
        )

        doc.save("medical_guidance.pdf")
    }


    return (
        <main className="container">
            <Link href="/" style={{ fontSize: 14, display: "inline-block", marginBottom: 16 }}>
                ← Back to Home
            </Link>

            <Card>
                <h1>Symptom Analyzer</h1>
                <p className="text-muted" style={{ marginBottom: 24 }}>
                    Select your age, sex, and all symptoms you are currently experiencing to receive personalized guidance.
                </p>

                {/* 🔹 AGE INPUT */}
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8 }}>Age</label>
                    <input
                        type="number"
                        min={1}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        placeholder="Enter your age"
                        style={{ maxWidth: 200 }}
                    />
                </div>

                {/* 🔹 SEX INPUT */}
                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", marginBottom: 8 }}>Sex</label>
                    <select
                        value={sex}
                        onChange={(e) => setSex(e.target.value as "male" | "female")}
                        style={{ maxWidth: 200 }}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <hr />

                {/* 🔹 SYMPTOMS */}
                <div style={{ marginTop: 24 }}>
                    <label style={{ display: "block", marginBottom: 12 }}>Select Symptoms</label>
                    {SYMPTOMS.map(s => (
                        <div key={s.key} style={{ marginBottom: 12, display: "flex", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                id={s.key}
                                checked={selected.includes(s.key)}
                                onChange={() => toggle(s.key)}
                            />
                            <label htmlFor={s.key} style={{ marginLeft: 8, marginBottom: 0, fontWeight: 400 }}>{s.label}</label>
                        </div>
                    ))}
                </div>

                {/* 🔹 BUTTONS */}
                <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                    <button
                        className="button-primary"
                        onClick={analyze}
                        disabled={loading || selected.length === 0 || age <= 0}
                    >
                        {loading ? "Analyzing..." : "Analyze Symptoms"}
                    </button>

                    <button className="button-secondary" onClick={reset} disabled={loading}>
                        Reset
                    </button>
                </div>
            </Card>

            {/* 🔹 RESULTS */}
            {result && (
                <Card>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <h3 style={{ marginBottom: 0 }}>Severity:</h3>
                        <SeverityBadge severity={result.severity} />
                    </div>

                    <p style={{ marginBottom: 24 }}>{result.recommendation}</p>

                    {!result.allowHomeCare && (
                        <div className="alert alert-danger">
                            <strong>Emergency Warning:</strong> Seek immediate medical attention.
                        </div>
                    )}

                    {result.allowHomeCare && (
                        <>
                            <h4>Home Remedies</h4>
                            <ul>
                                {result.remedies?.map((r: string, i: number) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>

                            <h4>Recommended Foods</h4>
                            <ul>
                                {result.foods?.map((f: string, i: number) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {result.medicines?.length > 0 && (
                        <>
                            <h4>First-line Medicines</h4>
                            <ul style={{ listStyle: "none", marginLeft: 0 }}>
                                {result.medicines.map((med: any, i: number) => (
                                    <li key={i} style={{ marginBottom: 16, paddingLeft: 0 }}>
                                        <strong>{med.name}</strong> — {med.dose}
                                        <br />
                                        <small style={{ display: "block", marginTop: 4 }}>{med.frequency}</small>
                                        {med.notes && (
                                            <small style={{ display: "block", marginTop: 4, color: "var(--color-warning)" }}>
                                                Note: {med.notes}
                                            </small>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <hr />

                    <p className="text-muted" style={{ fontSize: 13, marginBottom: 24 }}>
                        <strong>Medical Disclaimer:</strong> This application provides general guidance based on self-reported symptoms.
                        It is not a medical diagnosis and does not replace professional medical advice.
                    </p>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <button
                            className="button-primary"
                            onClick={generatePDF}
                        >
                            Download PDF Report
                        </button>
                        <button
                            className="button-secondary"
                            onClick={() => {
                                const query = selected.join(",")
                                window.location.href = `/recipes?symptoms=${query}`
                            }}
                        >
                            View Recommended Recipes
                        </button>
                    </div>
                </Card>
            )}
        </main>
    )
}
