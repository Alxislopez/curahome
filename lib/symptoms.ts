// lib/symptoms.ts

export interface Symptom {
  label: string
  severityWeight: number
  category: string
  emergency?: boolean
}

export const SYMPTOMS: Record<string, Symptom> = {
  /* ---------- GENERAL ---------- */
  fever: {
    label: "Fever",
    severityWeight: 2,
    category: "general"
  },

  weakness: {
    label: "Weakness",
    severityWeight: 2,
    category: "general"
  },

  fatigue: {
    label: "Fatigue",
    severityWeight: 2,
    category: "general"
  },

  body_pain: {
    label: "Body Pain",
    severityWeight: 2,
    category: "general"
  },

  dizziness: {
    label: "Dizziness",
    severityWeight: 3,
    category: "neurological"
  },

  /* ---------- RESPIRATORY ---------- */
  sore_throat: {
    label: "Throat Pain / Sore Throat",
    severityWeight: 1,
    category: "respiratory"
  },

  dry_cough: {
    label: "Dry Cough",
    severityWeight: 1,
    category: "respiratory"
  },

  wet_cough: {
    label: "Wet Cough",
    severityWeight: 2,
    category: "respiratory"
  },

  running_nose: {
    label: "Running Nose",
    severityWeight: 1,
    category: "respiratory"
  },

  sneezing: {
    label: "Sneezing",
    severityWeight: 1,
    category: "respiratory"
  },

  nasal_congestion: {
    label: "Nasal Congestion",
    severityWeight: 1,
    category: "respiratory"
  },

  chest_congestion: {
    label: "Chest Congestion",
    severityWeight: 3,
    category: "respiratory"
  },

  breathlessness: {
    label: "Shortness of Breath",
    severityWeight: 5,
    emergency: true,
    category: "respiratory"
  },

  /* ---------- GASTROINTESTINAL ---------- */
  nausea: {
    label: "Nausea",
    severityWeight: 2,
    category: "gastro"
  },

  vomiting: {
    label: "Vomiting",
    severityWeight: 3,
    category: "gastro"
  },

  diarrhea: {
    label: "Diarrhea",
    severityWeight: 3,
    category: "gastro"
  },

  stomach_pain: {
    label: "Stomach Pain",
    severityWeight: 3,
    category: "gastro"
  },

  acid_reflux: {
    label: "Acid Reflux",
    severityWeight: 2,
    category: "gastro"
  },

  indigestion: {
    label: "Indigestion",
    severityWeight: 1,
    category: "gastro"
  },

  gas: {
    label: "Gas",
    severityWeight: 1,
    category: "gastro"
  },

  bloating: {
    label: "Bloating",
    severityWeight: 1,
    category: "gastro"
  },

  constipation: {
    label: "Constipation",
    severityWeight: 2,
    category: "gastro"
  },

  /* ---------- CARDIAC ---------- */
  chest_pain: {
    label: "Chest Pain",
    severityWeight: 6,
    emergency: true,
    category: "cardiac"
  },

  /* ---------- MUSCULOSKELETAL ---------- */
  back_pain: {
    label: "Back Pain",
    severityWeight: 2,
    category: "musculoskeletal"
  },

  tooth_pain: {
    label: "Tooth Pain",
    severityWeight: 2,
    category: "dental"
  },

  /* ---------- SKIN & HAIR ---------- */
  skin_irritation: {
    label: "Skin Irritation",
    severityWeight: 1,
    category: "dermatology"
  },

  acne: {
    label: "Acne",
    severityWeight: 1,
    category: "dermatology"
  },

  pimples: {
    label: "Pimples",
    severityWeight: 1,
    category: "dermatology"
  },

  dandruff: {
    label: "Dandruff",
    severityWeight: 1,
    category: "dermatology"
  },

  hairfall: {
    label: "Hair Fall",
    severityWeight: 1,
    category: "dermatology"
  },

  /* ---------- WOMEN'S HEALTH ---------- */
  menstrual_cramps: {
    label: "Menstrual Cramps",
    severityWeight: 2,
    category: "gynecological"
  }
}
