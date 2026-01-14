// lib/medicines.ts

export type Guidance = {
    remedies: string[]
    foods: string[]
}

export const HOME_CARE_GUIDANCE: Record<string, Guidance> = {
    fever: {
        remedies: ["Rest adequately", "Use lukewarm sponging if fever is high"],
        foods: ["Warm fluids", "Light soups", "Plenty of water"]
    },

    cold: {
        remedies: ["Steam inhalation", "Warm salt water gargle"],
        foods: ["Warm fluids", "Honey with warm water", "Citrus fruits"]
    },

    cough: {
        remedies: ["Steam inhalation", "Avoid cold air exposure"],
        foods: ["Honey", "Warm herbal teas"]
    },

    sore_throat: {
        remedies: ["Salt water gargle", "Avoid spicy foods"],
        foods: ["Warm liquids", "Soft foods"]
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
        forSymptoms: ["fever", "headache"],
        standardDoseMg: 500,
        maxDailyDoseMg: 3000,
        frequency: "Every 6–8 hours",
        notes: "Avoid alcohol. Do not exceed 3g/day."
    },
    {
        name: "Cetirizine",
        forSymptoms: ["cold"],
        standardDoseMg: 10,
        maxDailyDoseMg: 10,
        frequency: "Once daily (night)",
        notes: "May cause drowsiness"
    },
    {
        name: "Dextromethorphan",
        forSymptoms: ["cough"],
        standardDoseMg: 10,
        maxDailyDoseMg: 60,
        frequency: "Every 6–8 hours",
        notes: "For dry cough only"
    }
]
