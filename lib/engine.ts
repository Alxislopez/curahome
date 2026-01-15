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

export function analyzeSymptoms(
    symptomKeys: string[],
    age: number,
    sex: "male" | "female"
) {
    let { totalScore, emergency } = calculateSeverity(symptomKeys)

    // 🔺 AGE-BASED SEVERITY ADJUSTMENT
    if (age >= 60) totalScore += 2
    if (age < 12) totalScore += 1

    const severity = classifySeverity(totalScore)

    // 🚨 HARD STOP
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
        if (guidance) {
            guidance.remedies.forEach(r => remedies.add(r))
            guidance.foods.forEach(f => foods.add(f))
        }
    })

    // 💊 Medicine selection
    const selectedMedicines = FIRST_LINE_MEDICINES.filter(med =>
        med.forSymptoms.some(symptom => symptomKeys.includes(symptom))
    )

    const medicineCount = selectedMedicines.length

    const balancedMedicines = selectedMedicines.map(med => {
        let dose = calculateBalancedDose(med.standardDoseMg, medicineCount)

        // 👶 CHILD
        if (age < 12) dose = Math.floor(dose * 0.5)

        // 👴 ELDERLY
        if (age >= 60) dose = Math.floor(dose * 0.75)

        return {
            name: med.name,
            dose: `${dose} mg`,
            frequency: med.frequency,
            notes: med.notes
        }
    })

    return {
        severity,
        recommendation:
            severity === "Mild"
                ? "Home care and monitoring advised."
                : "Proceed with caution. Consult a doctor if symptoms worsen.",
        allowHomeCare: true,
        remedies: Array.from(remedies),
        foods: Array.from(foods),
        medicines: balancedMedicines,
        disclaimer: "Not a medical diagnosis."
    }
}
