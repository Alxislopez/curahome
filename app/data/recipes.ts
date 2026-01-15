export type Recipe = {
    id: string
    name: string
    category: string
    recommendedFor: string[]
    ingredients: string[]
    steps: string[]
}

export const RECIPES: Recipe[] = [
    {
        id: "vegetable-soup",
        name: "Clear Vegetable Soup",
        category: "Warm fluids / Light soups",
        recommendedFor: ["fever", "cold", "sore throat"],
        ingredients: [
            "1 carrot (chopped)",
            "1 potato (chopped)",
            "1/2 cup beans",
            "Salt to taste",
            "Water"
        ],
        steps: [
            "Wash and chop all vegetables.",
            "Add vegetables to boiling water.",
            "Cook on low heat for 15–20 minutes.",
            "Strain if needed and serve warm."
        ]
    },

    {
        id: "ginger-tea",
        name: "Ginger Herbal Tea",
        category: "Warm fluids / Herbal teas",
        recommendedFor: ["cold", "cough"],
        ingredients: [
            "1 inch fresh ginger",
            "1 cup water",
            "Honey (optional)"
        ],
        steps: [
            "Boil water with crushed ginger for 5–7 minutes.",
            "Strain into a cup.",
            "Add honey if desired and drink warm."
        ]
    },

    {
        id: "honey-water",
        name: "Honey Warm Water",
        category: "Soothing fluids",
        recommendedFor: ["cough", "sore throat"],
        ingredients: [
            "1 tablespoon honey",
            "1 cup warm water"
        ],
        steps: [
            "Warm the water (do not boil).",
            "Mix honey into warm water.",
            "Sip slowly."
        ]
    }
]
