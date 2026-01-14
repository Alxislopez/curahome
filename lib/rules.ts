// lib/rules.ts

import { SYMPTOMS } from "./symptoms"

export type SeverityLevel = "Mild" | "Moderate" | "Severe"

export function calculateSeverity(symptomKeys: string[]) {
    let totalScore = 0
    let emergency = false

    symptomKeys.forEach((key) => {
        const symptom = SYMPTOMS[key]
        if (!symptom) return

        totalScore += symptom.severityWeight

        if (symptom.emergency) {
            emergency = true
        }
    })

    return { totalScore, emergency }
}

export function classifySeverity(score: number): SeverityLevel {
    if (score >= 7) return "Severe"
    if (score >= 4) return "Moderate"
    return "Mild"
}
