// lib/medicines.ts

// ---------------- HOME CARE ----------------

export type Guidance = {
  remedies: string[]
  foods: string[]
}

export const HOME_CARE_GUIDANCE: Record<string, Guidance> = {
  fever: {
    remedies: [
      "Adequate rest and sleep",
      "Maintain hydration throughout the day",
      "Use lukewarm sponging if fever causes discomfort",
      "Wear light clothing to avoid overheating"
    ],
    foods: [
      "Warm fluids (water, herbal teas)",
      "Clear vegetable soups",
      "Electrolyte-rich fluids",
      "Soft, easily digestible foods"
    ]
  },

  cold: {
    remedies: [
      "Steam inhalation to relieve nasal congestion",
      "Warm salt water gargling",
      "Rest to support immune recovery",
      "Avoid cold air and sudden temperature changes"
    ],
    foods: [
      "Ginger tea",
      "Honey with warm water",
      "Citrus fruits",
      "Light soups"
    ]
  },

  cough: {
    remedies: [
      "Steam inhalation",
      "Avoid smoke and dust",
      "Drink warm fluids frequently",
      "Rest the voice"
    ],
    foods: [
      "Honey (not for children under 1 year)",
      "Herbal teas",
      "Warm ginger water",
      "Soft foods"
    ]
  },

  sore_throat: {
    remedies: [
      "Salt water gargle",
      "Avoid spicy foods",
      "Sip warm fluids",
      "Voice rest"
    ],
    foods: [
      "Warm soups",
      "Porridge",
      "Honey water",
      "Mashed vegetables"
    ]
  },

  diarrhea: {
    remedies: [
      "Oral rehydration solution (ORS)",
      "Adequate rest",
      "Avoid oily foods"
    ],
    foods: [
      "Rice water",
      "Banana",
      "Curd (if tolerated)",
      "Boiled potatoes"
    ]
  },

  stomach_pain: {
    remedies: [
      "Warm compress on abdomen",
      "Avoid heavy meals",
      "Small frequent meals"
    ],
    foods: [
      "Warm water",
      "Soft cooked rice",
      "Boiled vegetables"
    ]
  },

  menstrual_cramps: {
    remedies: [
      "Warm heating pad",
      "Light stretching",
      "Adequate rest"
    ],
    foods: [
      "Warm fluids",
      "Iron-rich foods",
      "Fruits"
    ]
  }
}

// ---------------- MEDICINES ----------------

export type Medicine = {
  name: string
  forSymptoms: string[]
  standardDoseMg: number
  maxDailyDoseMg: number
  frequency: string
  notes?: string
}

export const FIRST_LINE_MEDICINES: Medicine[] = [
  {
    name: "Paracetamol",
    forSymptoms: ["fever", "body_pain", "menstrual_cramps"],
    standardDoseMg: 500,
    maxDailyDoseMg: 3000,
    frequency: "Every 6–8 hours",
    notes: "Avoid alcohol. Do not exceed 3g/day."
  },

  {
    name: "Ibuprofen",
    forSymptoms: ["body_pain", "menstrual_cramps"],
    standardDoseMg: 400,
    maxDailyDoseMg: 1200,
    frequency: "Every 8 hours",
    notes: "Take after food. Avoid if gastric issues."
  },

  {
    name: "Cetirizine",
    forSymptoms: ["cold", "sneezing", "running_nose"],
    standardDoseMg: 10,
    maxDailyDoseMg: 10,
    frequency: "Once daily (night)",
    notes: "May cause drowsiness"
  },

  {
    name: "Dextromethorphan",
    forSymptoms: ["dry_cough"],
    standardDoseMg: 10,
    maxDailyDoseMg: 60,
    frequency: "Every 6–8 hours",
    notes: "Only for dry cough"
  },

  {
    name: "ORS",
    forSymptoms: ["diarrhea", "vomiting"],
    standardDoseMg: 0,
    maxDailyDoseMg: 0,
    frequency: "Frequent sips",
    notes: "Essential to prevent dehydration"
  }
]
