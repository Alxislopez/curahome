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

  running_nose: {
    remedies: ["Steam inhalation", "Avoid cold exposure"],
    foods: ["Warm fluids", "Herbal tea"]
  },

  sneezing: {
    remedies: ["Avoid allergens", "Steam inhalation"],
    foods: ["Warm water", "Vitamin C rich fruits"]
  },

  dry_cough: {
    remedies: ["Honey before sleep", "Warm fluids", "Avoid smoke"],
    foods: ["Honey water", "Warm milk"]
  },

  wet_cough: {
    remedies: ["Steam inhalation", "Chest percussion"],
    foods: ["Warm ginger tea", "Light soups"]
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

  chest_congestion: {
    remedies: ["Steam inhalation", "Warm compress on chest"],
    foods: ["Warm fluids", "Pepper soup"]
  },

  body_pain: {
    remedies: ["Rest", "Warm bath"],
    foods: ["Turmeric milk", "Protein rich foods"]
  },

  back_pain: {
    remedies: [
      "Hot water bag",
      "Gentle stretching exercises"
    ],
    foods: [
      "Warm milk",
      "Turmeric milk",
      "Magnesium-rich foods (banana, nuts)"
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

  fatigue: {
    remedies: ["Adequate sleep", "Limit physical exertion"],
    foods: ["Fruits", "Warm milk"]
  },

  weakness: {
    remedies: [
      "ORS or coconut water",
      "Adequate rest"
    ],
    foods: [
      "Banana",
      "Curd",
      "Rice",
      "Coconut water"
    ]
  },

  dizziness: {
    remedies: ["Sit or lie down", "Hydration"],
    foods: ["Salted lemon water", "Fruits"]
  },

  nausea: {
    remedies: ["Small sips of water", "Avoid oily food"],
    foods: ["Ginger water", "Dry toast"]
  },

  vomiting: {
    remedies: ["ORS in small sips", "Rest"],
    foods: ["ORS", "Rice water"]
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

  acid_reflux: {
    remedies: [
      "Cold milk",
      "Avoid spicy and oily foods"
    ],
    foods: [
      "Oats",
      "Banana",
      "Rice porridge",
      "Curd (if tolerated)"
    ]
  },

  indigestion: {
    remedies: ["Jeera water", "Avoid spicy food"],
    foods: ["Light meals", "Warm water"]
  },

  gas: {
    remedies: ["Ajwain water", "Gentle walking"],
    foods: ["Warm water", "Avoid beans & cabbage"]
  },

  bloating: {
    remedies: ["Fennel seeds (saunf)", "Gentle walking"],
    foods: ["Warm water", "Papaya", "Cooked vegetables"]
  },

  constipation: {
    remedies: ["Increase fluid intake", "Morning warm water"],
    foods: ["Fruits", "High fiber foods"]
  },

  tooth_pain: {
    remedies: [
      "Salt water rinse",
      "Clove oil (temporary relief)"
    ],
    foods: [
      "Soft foods",
      "Warm soups",
      "Avoid sweets and cold foods"
    ]
  },

  skin_irritation: {
    remedies: [
      "Aloe vera gel",
      "Coconut oil application"
    ],
    foods: [
      "Coconut water",
      "Hydrating fruits"
    ]
  },

  acne: {
    remedies: [
      "Aloe vera application",
      "Multani mitti face pack"
    ],
    foods: [
      "Fruits and vegetables",
      "Plenty of water",
      "Avoid oily foods"
    ]
  },

  dandruff: {
    remedies: [
      "Curd with lemon scalp pack",
      "Regular hair wash"
    ],
    foods: [
      "Protein-rich foods",
      "Nuts and seeds"
    ]
  },

  hairfall: {
    remedies: [
      "Onion juice scalp massage",
      "Coconut oil massage"
    ],
    foods: [
      "Eggs",
      "Green leafy vegetables",
      "Nuts"
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
    forSymptoms: [
      "fever",
      "body_pain",
      "back_pain",
      "tooth_pain",
      "menstrual_cramps"
    ],
    standardDoseMg: 500,
    maxDailyDoseMg: 3000,
    frequency: "Every 6–8 hours",
    notes: "Avoid alcohol. Do not exceed 3g/day."
  },

  {
    name: "Ibuprofen",
    forSymptoms: ["body_pain", "back_pain", "menstrual_cramps"],
    standardDoseMg: 400,
    maxDailyDoseMg: 1200,
    frequency: "Every 8 hours",
    notes: "Take after food. Avoid if gastric issues."
  },

  {
    name: "Cetirizine",
    forSymptoms: [
      "cold",
      "sneezing",
      "running_nose",
      "skin_irritation"
    ],
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
    name: "Antacid",
    forSymptoms: ["acid_reflux", "indigestion"],
    standardDoseMg: 0,
    maxDailyDoseMg: 0,
    frequency: "After meals",
    notes: "Avoid lying down immediately after eating"
  },

  {
    name: "Simethicone",
    forSymptoms: ["gas", "bloating"],
    standardDoseMg: 80,
    maxDailyDoseMg: 500,
    frequency: "After meals",
    notes: "Relieves gas and bloating"
  },

  {
    name: "ORS",
    forSymptoms: ["diarrhea", "vomiting", "weakness"],
    standardDoseMg: 0,
    maxDailyDoseMg: 0,
    frequency: "Frequent sips",
    notes: "Essential to prevent dehydration"
  }
]
