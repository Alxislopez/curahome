"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { RECIPES } from "../data/recipes"
import Card from "../components/card"
import Link from "next/link"

export default function RecipesClient() {
    const [search, setSearch] = useState("")
    const [openId, setOpenId] = useState<string | null>(null)

    // 🔹 Read symptoms from URL
    const searchParams = useSearchParams()
    const symptomParam = searchParams.get("symptoms")

    const selectedSymptoms = symptomParam
        ? symptomParam.split(",")
        : []

    // 🔹 Auto-filter recipes based on symptoms
    const symptomFiltered =
        selectedSymptoms.length === 0
            ? RECIPES
            : RECIPES.filter(recipe =>
                recipe.recommendedFor.some(symptom =>
                    selectedSymptoms.includes(symptom)
                )
            )

    // 🔹 Apply search filter
    const filtered = symptomFiltered.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <main className="container">
            <Link href="/analyzer" style={{ fontSize: 14, display: "inline-block", marginBottom: 16 }}>
                ← Back to Analyzer
            </Link>

            <Card>
                <h1><strong>Recommended Foods & Recipes</strong></h1>
                <p className="text-muted" style={{ marginBottom: 24 }}>
                    Discover nutritious recipes tailored to support your recovery and well-being.
                </p>

                <input
                    type="text"
                    placeholder="Search recipes or categories..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                {selectedSymptoms.length > 0 && (
                    <div className="alert alert-info" style={{ marginTop: 16 }}>
                        Showing recipes for: <strong>{selectedSymptoms.join(", ")}</strong>
                    </div>
                )}
            </Card>

            {filtered.length === 0 && (
                <Card>
                    <p className="text-muted" style={{ marginBottom: 0 }}>No recipes found for the selected symptoms.</p>
                </Card>
            )}

            {filtered.map(recipe => (
                <Card key={recipe.id} compact>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            setOpenId(openId === recipe.id ? null : recipe.id)
                        }
                    >
                        <h3 style={{ marginBottom: 4 }}><strong>{recipe.name}</strong></h3>
                        <small>
                            {recipe.category} • Helps with: <strong>{recipe.recommendedFor.join(", ")}</strong>
                        </small>
                    </div>

                    {openId === recipe.id && (
                        <div style={{ marginTop: 16 }}>
                            <h4><strong>Ingredients</strong></h4>
                            <ul>
                                {recipe.ingredients.map((i, idx) => (
                                    <li key={idx}>{i}</li>
                                ))}
                            </ul>

                            <h4><strong>Preparation</strong></h4>
                            <ol>
                                {recipe.steps.map((s, idx) => (
                                    <li key={idx}>{s}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </Card>
            ))}
        </main>
    )
}
