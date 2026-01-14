// lib/engine.ts

import { calculateSeverity, classifySeverity } from "./rules"
import { HOME_CARE_GUIDANCE, FIRST_LINE_MEDICINES } from "./medicines"

// 🔹 Helper: balanced dose calculation
function calculateBalancedDose(baseDose: number, medicineCount: number): number {
    if (medicineCount <= 1) return baseDose

    const reductionFactor = 1 - (medicineCount - 1) * 0.2

    return Math.max(
        Math.floor(baseDose * reductionFactor),
        Math.floor(baseDose * 0.5)
    )
}

export function analyzeSymptoms(symptomKeys: string[]) {
    const { totalScore, emergency } = calculateSeverity(symptomKeys)
    const severity = classifySeverity(totalScore)

    // 🚨 SAFETY OVERRIDE
    if (emergency || severity === "Severe") {
        return {
            severity,
            recommendation: "Seek immediate medical attention.",
            allowHomeCare: false
        }
    }

    // 🌿 Home care
    const remedies = new Set<string>()
    const foods = new Set<string>()

    symptomKeys.forEach((key) => {
        const guidance = HOME_CARE_GUIDANCE[key]
        if (!guidance) return

        guidance.remedies.forEach(r => remedies.add(r))
        guidance.foods.forEach(f => foods.add(f))
    })

    // 💊 Medicine selection (DEDUPLICATED)
    const medicineMap = new Map<string, any>()

    FIRST_LINE_MEDICINES.forEach((med) => {
        if (med.forSymptoms.some(symptom => symptomKeys.includes(symptom))) {
            if (!medicineMap.has(med.name)) {
                medicineMap.set(med.name, med)
            }
        }
    })

    const medicines = Array.from(medicineMap.values()).map(med => ({
        name: med.name,
        dose: `${calculateBalancedDose(
            med.standardDoseMg,
            medicineMap.size
        )} mg`,
        frequency: med.frequency,
        notes: med.notes
    }))

    return {
        severity,
        recommendation:
            severity === "Mild"
                ? "Home care and monitoring advised."
                : "Proceed with caution. Consult a doctor if symptoms worsen.",
        allowHomeCare: true,
        remedies: Array.from(remedies),
        foods: Array.from(foods),
        medicines,
        disclaimer: "This is not a medical diagnosis."
    }
}
