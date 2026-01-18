// lib/engine.ts

import { calculateSeverity, classifySeverity } from "./rules"
import { HOME_CARE_GUIDANCE, FIRST_LINE_MEDICINES } from "./medicines"
import { CONDITIONS } from "./conditions"

// 🔹 Helper: balanced dose calculation
function calculateBalancedDose(baseDose: number, medicineCount: number): number {
  if (medicineCount <= 1) return baseDose
  const reductionFactor = 1 - (medicineCount - 1) * 0.2
  return Math.max(Math.floor(baseDose * reductionFactor), Math.floor(baseDose * 0.5))
}

function matchConditions(symptoms: string[]) {
  return CONDITIONS
    .map(condition => {
      const matchCount = condition.symptoms.filter(s =>
        symptoms.includes(s)
      ).length

      const matchRatio = matchCount / condition.symptoms.length

      return {
        ...condition,
        matchCount,
        matchRatio
      }
    })
    .filter(c => {
      // 🧠 Core logic
      if (c.symptoms.length === 1) return c.matchCount === 1
      return c.matchRatio >= 0.6 // ≥60% match
    })
    .sort((a, b) => b.matchRatio - a.matchRatio)
}

function calculateBMI(weightKg: number, age: number) {
  // Rough adult average height assumption (safe heuristic)
  const avgHeightM = age < 18 ? 1.4 : 1.7
  return weightKg / (avgHeightM * avgHeightM)
}

function weightDoseFactor(bmi: number) {
  if (bmi < 18.5) return 0.85       // underweight
  if (bmi >= 25 && bmi < 30) return 1.1 // overweight
  if (bmi >= 30) return 1.2         // obese
  return 1                          // normal
}

export function analyzeSymptoms(
  symptomKeys: string[], age: number, sex: "male" | "female", weight?: number) {
  let { totalScore, emergency } = calculateSeverity(symptomKeys)

  // 🔺 Age-based severity adjustment
  if (age >= 60) totalScore += 2
  if (age < 12) totalScore += 1

  let severity = classifySeverity(totalScore)
  const matchedConditions = matchConditions(symptomKeys)

  // 🔺 Upgrade severity based on condition severity
  matchedConditions.forEach(c => {
    if (c.severity === "Severe") severity = "Severe"
    else if (c.severity === "Moderate" && severity === "Mild") severity = "Moderate"
  })

  // 🚨 Emergency override
  if (
    emergency ||
    severity === "Severe" ||
    matchedConditions.some(c => c.emergency)
  ) {
    return {
      severity: "Severe",
      conditions: matchedConditions.map(c => c.name),
      recommendation: "Seek immediate medical attention.",
      allowHomeCare: false
    }
  }

  // 🌿 Home care
  const remedies = new Set<string>()
  const foods = new Set<string>()

  symptomKeys.forEach(key => {
    const guidance = HOME_CARE_GUIDANCE[key]
    if (guidance) {
      guidance.remedies.forEach(r => remedies.add(r))
      guidance.foods.forEach(f => foods.add(f))
    }
  })

  // 💊 Medicine selection
  const selectedMedicines = FIRST_LINE_MEDICINES.filter(med =>
    med.forSymptoms.some(s => symptomKeys.includes(s))
  )

  const medicineCount = selectedMedicines.length

  const balancedMedicines = selectedMedicines.map(med => {
    let dose = calculateBalancedDose(med.standardDoseMg, medicineCount)

    // 👶👴 Age adjustments
    if (age < 12) dose *= 0.5
    if (age >= 60) dose *= 0.75

    // ⚖️ Weight-based adjustment (optional)
    let weightNote = ""
    if (weight) {
      const bmi = calculateBMI(weight, age)
      const factor = weightDoseFactor(bmi)
      dose *= factor

      if (factor !== 1) {
        weightNote = "Dose adjusted based on body weight."
      }
    }

    dose = Math.floor(dose)

    // 🚨 Safety cap
    if (med.maxDailyDoseMg > 0) {
      dose = Math.min(dose, med.maxDailyDoseMg)
    }

    return {
      name: med.name,
      dose: dose > 0 ? `${dose} mg` : "As directed",
      frequency: med.frequency,
      notes: [med.notes, weightNote].filter(Boolean).join(" ")
    }
  })


  // 🧠 Recommendation logic
  const recommendation =
    matchedConditions[0]?.recommendation ??
    (severity === "Mild"
      ? "Home care and monitoring advised."
      : "Proceed with caution. Consult a doctor if symptoms worsen.")

  return {
    severity,
    conditions: matchedConditions.map(c => c.name),
    recommendation,
    allowHomeCare: true,
    remedies: Array.from(remedies),
    foods: Array.from(foods),
    medicines: balancedMedicines,
    weightUsed: Boolean(weight),

    disclaimer: "Not a medical diagnosis."
  }
}
