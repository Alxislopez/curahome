// lib/symptoms.ts

export interface Symptom {
    label: string
    severityWeight: number
    category: string
    emergency?: boolean
}

export const SYMPTOMS: Record<string, Symptom> = {
    fever: {
        label: "Fever",
        severityWeight: 2,
        category: "general"
    },

    cold: {
        label: "Cold / Runny Nose",
        severityWeight: 1,
        category: "respiratory"
    },

    cough: {
        label: "Cough",
        severityWeight: 1,
        category: "respiratory"
    },

    sore_throat: {
        label: "Sore Throat",
        severityWeight: 1,
        category: "respiratory"
    },

    breathlessness: {
        label: "Shortness of Breath",
        severityWeight: 5,
        emergency: true,
        category: "respiratory"
    },

    chest_pain: {
        label: "Chest Pain",
        severityWeight: 6,
        emergency: true,
        category: "cardiac"
    },

    dizziness: {
        label: "Dizziness",
        severityWeight: 3,
        category: "neurological"
    },

    vomiting: {
        label: "Vomiting",
        severityWeight: 3,
        category: "gastro"
    }
}
