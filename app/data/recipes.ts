// lib/recipes.ts

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
    category: "Light soups",
    recommendedFor: ["fever", "cold", "sore_throat"],
    ingredients: [
      "Carrot",
      "Potato",
      "Beans",
      "Salt",
      "Water"
    ],
    steps: [
      "Wash and chop vegetables.",
      "Boil vegetables in water.",
      "Simmer for 20 minutes.",
      "Strain and serve warm."
    ]
  },

  {
    id: "ginger-tea",
    name: "Ginger Herbal Tea",
    category: "Warm fluids",
    recommendedFor: ["cold", "cough"],
    ingredients: [
      "Fresh ginger",
      "Water",
      "Honey (optional)"
    ],
    steps: [
      "Boil crushed ginger in water.",
      "Strain into cup.",
      "Add honey if desired."
    ]
  },

  {
    id: "banana-rice",
    name: "Banana & Rice Meal",
    category: "Easily digestible foods",
    recommendedFor: ["diarrhea", "stomach_pain"],
    ingredients: [
      "Cooked rice",
      "Ripe banana"
    ],
    steps: [
      "Cook rice until soft.",
      "Serve with sliced banana."
    ]
  },

  {
    id: "curd-rice",
    name: "Curd Rice",
    category: "Gut friendly foods",
    recommendedFor: ["diarrhea", "indigestion"],
    ingredients: [
      "Cooked rice",
      "Fresh curd",
      "Salt"
    ],
    steps: [
      "Mix cooked rice with curd.",
      "Add salt lightly.",
      "Serve at room temperature."
    ]
  },

  {
    id: "warm-milk",
    name: "Warm Milk",
    category: "Soothing foods",
    recommendedFor: ["fatigue", "weakness"],
    ingredients: [
      "Milk"
    ],
    steps: [
      "Warm milk gently.",
      "Drink before bedtime."
    ]
  },

   {
    id: "ginger-tulsi-tea",
    name: "Ginger Tulsi Tea",
    category: "Immunity Booster",
    recommendedFor: ["cough", "cold", "fever", "throat_pain"],
    ingredients: [
      "Fresh ginger – 1 inch",
      "Tulsi leaves – few",
      "Water – 1 cup",
      "Honey – 1 teaspoon (optional)"
    ],
    steps: [
      "Boil water.",
      "Add crushed ginger and tulsi leaves.",
      "Simmer for 5–7 minutes.",
      "Strain and add honey if desired."
    ]
  },

  {
    id: "turmeric-milk",
    name: "Turmeric Milk",
    category: "Recovery Drink",
    recommendedFor: ["fever", "body_pain", "fatigue", "joint_pain"],
    ingredients: [
      "Milk – 1 cup",
      "Turmeric powder – ½ teaspoon"
    ],
    steps: [
      "Heat milk until warm.",
      "Add turmeric powder.",
      "Mix well and drink before bedtime."
    ]
  },

  {
    id: "ajwain-water",
    name: "Ajwain Water",
    category: "Digestive Remedy",
    recommendedFor: ["gas", "stomach_pain", "bloating"],
    ingredients: [
      "Ajwain – 1 teaspoon",
      "Water – 1 cup"
    ],
    steps: [
      "Boil water.",
      "Add ajwain seeds.",
      "Boil for 5 minutes.",
      "Strain and drink warm."
    ]
  },

  {
    id: "jeera-water",
    name: "Jeera Water",
    category: "Digestive Remedy",
    recommendedFor: ["indigestion", "bloating", "gas"],
    ingredients: [
      "Jeera (cumin seeds) – 1 teaspoon",
      "Water – 1 cup"
    ],
    steps: [
      "Boil water.",
      "Add jeera seeds.",
      "Simmer for 5–10 minutes.",
      "Strain and drink warm."
    ]
  },

  {
    id: "ors-home",
    name: "ORS (Oral Rehydration Solution)",
    category: "Hydration",
    recommendedFor: ["diarrhea", "vomiting", "weakness", "dehydration"],
    ingredients: [
      "Clean drinking water – 1 litre",
      "Sugar – 6 level teaspoons",
      "Salt – ½ level teaspoon"
    ],
    steps: [
      "Take boiled and cooled water.",
      "Add sugar and salt.",
      "Stir well until dissolved.",
      "Sip small amounts every 5–10 minutes."
    ]
  },

  {
    id: "ginger-water",
    name: "Ginger Water",
    category: "Digestive Drink",
    recommendedFor: ["nausea", "vomiting", "indigestion"],
    ingredients: [
      "Fresh ginger – ½ inch",
      "Water – 1–2 cups"
    ],
    steps: [
      "Boil water.",
      "Add sliced ginger.",
      "Simmer for 10 minutes.",
      "Strain and sip slowly."
    ]
  },

  {
    id: "lemon-water",
    name: "Warm Lemon Water",
    category: "Digestive Drink",
    recommendedFor: ["nausea", "vomiting", "indigestion"],
    ingredients: [
      "Fresh lemon – ½",
      "Warm water – 1 cup"
    ],
    steps: [
      "Warm the water slightly.",
      "Add lemon juice.",
      "Sip slowly."
    ]
  },

  {
    id: "salted-lemon-water",
    name: "Salted Lemon Water",
    category: "Electrolyte Drink",
    recommendedFor: ["fatigue", "dizziness", "weakness"],
    ingredients: [
      "Lemon juice – 1 tablespoon",
      "Salt – a pinch",
      "Water – 1 glass"
    ],
    steps: [
      "Add lemon juice and salt to water.",
      "Mix well.",
      "Drink slowly."
    ]
  },

  {
    id: "pepper-honey",
    name: "Pepper Honey Mix",
    category: "Cough Remedy",
    recommendedFor: ["cough", "chest_congestion"],
    ingredients: [
      "Black pepper powder – ¼ teaspoon",
      "Honey – 1 teaspoon"
    ],
    steps: [
      "Mix black pepper powder with honey.",
      "Consume slowly.",
      "Avoid drinking water immediately."
    ]
  },

  {
    id: "ginger-pepper-tea",
    name: "Ginger Pepper Tea",
    category: "Respiratory Relief",
    recommendedFor: ["wet_cough", "chest_congestion", "cold"],
    ingredients: [
      "Fresh ginger – 1 inch",
      "Black pepper – ¼ teaspoon",
      "Water – 1 cup",
      "Honey – optional"
    ],
    steps: [
      "Boil water.",
      "Add ginger and black pepper.",
      "Simmer for 7–10 minutes.",
      "Strain and add honey if desired."
    ]
  },

  {
    id: "chamomile-tea",
    name: "Chamomile Tea",
    category: "Relaxation Tea",
    recommendedFor: ["anxiety", "bloating", "sleep_issues"],
    ingredients: [
      "Chamomile tea bag or flowers – 1 teaspoon",
      "Water – 1 cup",
      "Honey – optional"
    ],
    steps: [
      "Boil water and turn off heat.",
      "Add chamomile.",
      "Steep for 5–7 minutes.",
      "Strain and drink warm."
    ]
  },

   {
    id: "ors",
    name: "ORS (Oral Rehydration Solution)",
    category: "Hydration",
    recommendedFor: ["diarrhea", "vomiting", "weakness", "dehydration"],
    ingredients: [
      "Clean drinking water – 1 litre",
      "Sugar – 6 level teaspoons",
      "Salt – ½ level teaspoon"
    ],
    steps: [
      "Take boiled and cooled water.",
      "Add sugar and salt.",
      "Mix until fully dissolved.",
      "Sip every 5–10 minutes."
    ]
  },

  {
    id: "warm-honey-water",
    name: "Warm Honey Water",
    category: "Soothing Drink",
    recommendedFor: ["throat_pain", "dry_cough"],
    ingredients: [
      "Honey – 1 teaspoon",
      "Warm water – 1 cup"
    ],
    steps: [
      "Warm the water (do not boil).",
      "Add honey.",
      "Sip slowly."
    ]
  }
]
