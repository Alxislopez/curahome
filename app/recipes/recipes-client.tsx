"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { RECIPES } from "../data/recipes"

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
        <main style={{ maxWidth: 700, margin: "auto", padding: 24 }}>
            <h1>🍲 Recommended Foods & Recipes</h1>

            <input
                type="text"
                placeholder="Search recipes or categories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 16,
                    marginBottom: 20
                }}
            />

            {selectedSymptoms.length > 0 && (
                <p style={{ marginBottom: 12, color: "#555" }}>
                    Showing recipes for:{" "}
                    <strong>{selectedSymptoms.join(", ")}</strong>
                </p>
            )}

            {filtered.length === 0 && (
                <p>No recipes found for the selected symptoms.</p>
            )}

            {filtered.map(recipe => (
                <div
                    key={recipe.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 12,
                        padding: 12
                    }}
                >
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            setOpenId(openId === recipe.id ? null : recipe.id)
                        }
                    >
                        <h3 style={{ marginBottom: 4 }}>{recipe.name}</h3>
                        <small>
                            {recipe.category} | Helps with:{" "}
                            {recipe.recommendedFor.join(", ")}
                        </small>
                    </div>

                    {openId === recipe.id && (
                        <div style={{ marginTop: 12 }}>
                            <h4>🧂 Ingredients</h4>
                            <ul>
                                {recipe.ingredients.map((i, idx) => (
                                    <li key={idx}>{i}</li>
                                ))}
                            </ul>

                            <h4>👩‍🍳 Preparation</h4>
                            <ol>
                                {recipe.steps.map((s, idx) => (
                                    <li key={idx}>{s}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            ))}
        </main>
    )
}
