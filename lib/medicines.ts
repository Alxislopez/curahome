// lib/medicines.ts

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
            "Warm salt water gargling for throat comfort",
            "Rest to support immune recovery",
            "Avoid cold air and sudden temperature changes"
        ],
        foods: [
            "Warm fluids (ginger tea, herbal teas)",
            "Honey mixed with warm water",
            "Citrus fruits rich in vitamin C",
            "Light soups"
        ]
    },

    cough: {
        remedies: [
            "Steam inhalation to loosen mucus",
            "Avoid irritants like smoke or dust",
            "Keep throat moist with warm fluids",
            "Rest the voice if coughing is frequent"
        ],
        foods: [
            "Honey (not for children under 1 year)",
            "Warm herbal teas",
            "Warm water with ginger",
            "Soft foods that do not irritate the throat"
        ]
    },

    sore_throat: {
        remedies: [
            "Warm salt water gargling several times a day",
            "Avoid very spicy or acidic foods",
            "Keep throat moist by sipping fluids",
            "Rest the voice to reduce strain"
        ],
        foods: [
            "Warm liquids (soups, broths)",
            "Soft foods like porridge or mashed vegetables",
            "Honey with warm water",
            "Non-acidic fruits"
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
