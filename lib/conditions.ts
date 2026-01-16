// lib/conditions.ts

export interface Condition {
  id: string
  name: string
  symptoms: string[]
  minMatch: number
  severity: "Mild" | "Moderate" | "Severe"
  emergency?: boolean
  recommendation: string
}

export const CONDITIONS: Condition[] = [
  /* 🦠 RESPIRATORY */

  {
    id: "common-cold",
    name: "Common Cold",
    symptoms: ["running_nose", "sneezing", "cold", "sore_throat", "dry_cough"],
    minMatch: 2,
    severity: "Mild",
    recommendation: "Rest, warm fluids, and steam inhalation advised."
  },
  {
    id: "chest-congestion",
    name: "Chest Congestion",
    symptoms: ["chest_congestion", "wet_cough"],
    minMatch: 2,
    severity: "Moderate",
    recommendation: "Steam inhalation and cough remedies recommended."
  },

  {
    id: "upper-respiratory-infection",
    name: "Upper Respiratory Infection",
    symptoms: ["fever", "dry_cough", "throat_pain", "fatigue"],
    minMatch: 2,
    severity: "Moderate",
    recommendation: "Monitor fever and consult a doctor if symptoms persist."
  },

  {
    id: "chest-infection",
    name: "Chest Infection",
    symptoms: ["chest_congestion", "wet_cough", "breathlessness"],
    minMatch: 2,
    severity: "Severe",
    emergency: true,
    recommendation: "Seek immediate medical attention."
  },

  /* 🤒 FEVER & BODY */

  {
    id: "viral-fever",
    name: "Viral Fever",
    symptoms: ["fever", "body_pain", "fatigue", "weakness"],
    minMatch: 2,
    severity: "Moderate",
    recommendation: "Adequate rest, hydration, and medical consultation if fever continues."
  },

  {
    id: "fatigue-syndrome",
    name: "General Fatigue",
    symptoms: ["fatigue", "weakness", "dizziness"],
    minMatch: 2,
    severity: "Mild",
    recommendation: "Ensure proper rest, nutrition, and hydration."
  },

  /* 🍽️ DIGESTIVE */

  {
    id: "gastroenteritis",
    name: "Stomach Infection",
    symptoms: ["vomiting", "diarrhea", "stomach_pain", "nausea"],
    minMatch: 2,
    severity: "Moderate",
    recommendation: "Oral rehydration and light foods recommended."
  },

  {
    id: "dehydration",
    name: "Mild Dehydration",
    symptoms: ["weakness", "dizziness", "fatigue"],
    minMatch: 2,
    severity: "Moderate",
    recommendation: "Increase fluids and electrolytes immediately."
  },
  {
    id: "acid-reflux",
    name: "Acid Reflux",
    symptoms: ["acid_reflux", "indigestion", "gas", "bloating"],
    minMatch: 2,
    severity: "Mild",
    recommendation: "Avoid spicy foods and eat smaller meals."
  },

  {
    id: "constipation",
    name: "Constipation",
    symptoms: ["constipation", "bloating", "stomach_pain"],
    minMatch: 2,
    severity: "Mild",
    recommendation: "Increase fiber intake and fluid consumption."
  },

  /* 🧠 NEURO / PAIN */

  {
    id: "dizziness-condition",
    name: "Dizziness",
    symptoms: ["dizziness", "weakness", "fatigue"],
    minMatch: 1,
    severity: "Mild",
    recommendation: "Sit or lie down and stay hydrated."
  },

  {
    id: "back-pain",
    name: "Back Pain",
    symptoms: ["back_pain", "body_pain"],
    minMatch: 1,
    severity: "Mild",
    recommendation: "Warm compress and gentle stretching recommended."
  },

  {
    id: "tooth-pain",
    name: "Dental Pain",
    symptoms: ["tooth_pain"],
    minMatch: 1,
    severity: "Moderate",
    recommendation: "Consult a dentist if pain persists."
  },

  /* 🧴 SKIN & HAIR */

  {
    id: "skin-irritation",
    name: "Skin Irritation",
    symptoms: ["skin_irritation", "itching"],
    minMatch: 1,
    severity: "Mild",
    recommendation: "Avoid irritants and keep skin moisturized."
  },

  {
    id: "acne-condition",
    name: "Acne / Pimples",
    symptoms: ["acne", "pimples"],
    minMatch: 1,
    severity: "Mild",
    recommendation: "Maintain proper skincare routine."
  },

  {
    id: "hairfall",
    name: "Hair Fall",
    symptoms: ["hairfall"],
    minMatch: 1,
    severity: "Mild",
    recommendation: "Ensure proper nutrition and consult dermatologist if excessive."
  },

  {
    id: "dandruff",
    name: "Dandruff",
    symptoms: ["dandruff"],
    minMatch: 1,
    severity: "Mild",
    recommendation: "Use anti-dandruff shampoo regularly."
  },

  /* 🌸 WOMEN */

  {
    id: "menstrual-cramps",
    name: "Menstrual Cramps",
    symptoms: ["menstrual_cramps", "body_pain", "fatigue"],
    minMatch: 1,
    severity: "Mild",
    recommendation: "Warm compress, hydration, and rest advised."
  }
]
