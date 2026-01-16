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


export function analyzeSymptoms(
  symptomKeys: string[],
  age: number,
  sex: "male" | "female"
) {
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

    if (age < 12) dose = Math.floor(dose * 0.5)
    if (age >= 60) dose = Math.floor(dose * 0.75)

    return {
      name: med.name,
      dose: `${dose} mg`,
      frequency: med.frequency,
      notes: med.notes
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
    disclaimer: "Not a medical diagnosis."
  }
}
