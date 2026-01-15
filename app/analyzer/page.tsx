"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import Link from "next/link"


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
        doc.text("CuraHome :Phenotype-Guided Medical Guidance", 10, y)
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
        <main style={{ padding: 24, maxWidth: 640, margin: "auto" }}>
            <Link href="/" style={{ fontSize: "0.9rem" }}>
                ← Back to Home
            </Link>

            <h1 style={{ marginBottom: 12 }}>🩺 Symptom Analyzer</h1>
            <p style={{ color: "#555" }}>
                Select age, sex,<br></br> and all the symptoms you are facing right now to receive guidance.
            </p>

            {/* 🔹 AGE INPUT */}
            <div style={{ marginTop: 16 }}>
                <label>Age:</label>
                <input
                    type="number"
                    min={1}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    style={{ marginLeft: 8, width: 80 }}
                />
            </div>

            {/* 🔹 SEX INPUT */}
            <div style={{ marginTop: 12 }}>
                <label>Sex:</label>
                <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value as "male" | "female")}
                    style={{ marginLeft: 8 }}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <hr style={{ marginTop: 16 }} />

            {/* 🔹 SYMPTOMS */}
            <div style={{ marginTop: 16 }}>
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

            {/* 🔹 BUTTONS */}
            <div style={{ marginTop: 16 }}>
                <button
                    onClick={analyze}
                    disabled={loading || selected.length === 0 || age <= 0}
                    style={{ marginRight: 8 }}
                >
                    {loading ? "Analyzing..." : "Analyze"}
                </button>

                <button onClick={reset} disabled={loading}>
                    Reset
                </button>
            </div>

            {/* 🔹 RESULTS */}
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

                    <p style={{ fontSize: "0.85rem", color: "#666" }}>
                        ⚠️ <strong>Medical Disclaimer:</strong> This application provides
                        general guidance based on self-reported symptoms. It is not a medical
                        diagnosis and does not replace professional medical advice.
                    </p>
                    <button
                        onClick={generatePDF}
                        style={{ marginTop: 12 }}
                    >
                        📄 Download PDF
                    </button>
                    <button
                        onClick={() => {
                            const query = selected.join(",")
                            window.location.href = `/recipes?symptoms=${query}`
                        }}
                        style={{ marginTop: 12 }}
                    >
                        🍲 View Recommended Recipes
                    </button>


                </div>
            )}
        </main>
    )
}
