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
    ingredients: ["Carrot", "Potato", "Beans", "Salt", "Water"],
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
    recommendedFor: ["cold", "cough", "menstrual_cramps"],
    ingredients: ["Fresh ginger", "Water", "Honey (optional)"],
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
    ingredients: ["Cooked rice", "Ripe banana"],
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
    ingredients: ["Cooked rice", "Fresh curd", "Salt"],
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
    ingredients: ["Milk"],
    steps: [
      "Warm milk gently.",
      "Drink before bedtime."
    ]
  },

  {
    id: "turmeric-milk",
    name: "Turmeric Milk",
    category: "Recovery Drink",
    recommendedFor: ["body_pain", "back_pain", "menstrual_cramps"],
    ingredients: ["Milk – 1 cup", "Turmeric powder – ½ teaspoon"],
    steps: [
      "Heat milk until warm.",
      "Add turmeric powder.",
      "Mix well and drink."
    ]
  },

  {
    id: "ajwain-water",
    name: "Ajwain Water",
    category: "Digestive Remedy",
    recommendedFor: ["gas", "bloating"],
    ingredients: ["Ajwain – 1 teaspoon", "Water – 1 cup"],
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
    recommendedFor: ["indigestion", "bloating", "acid_reflux"],
    ingredients: ["Jeera – 1 teaspoon", "Water – 1 cup"],
    steps: [
      "Boil water.",
      "Add jeera.",
      "Simmer for 5 minutes.",
      "Strain and drink."
    ]
  },

  {
    id: "ors-home",
    name: "ORS (Homemade)",
    category: "Hydration",
    recommendedFor: ["diarrhea", "vomiting", "weakness"],
    ingredients: [
      "Water – 1 litre",
      "Sugar – 6 teaspoons",
      "Salt – ½ teaspoon"
    ],
    steps: [
      "Mix all ingredients well.",
      "Sip small amounts frequently."
    ]
  },

  {
    id: "ginger-water",
    name: "Ginger Water",
    category: "Digestive Drink",
    recommendedFor: ["nausea", "indigestion"],
    ingredients: ["Fresh ginger – ½ inch", "Water – 2 cups"],
    steps: [
      "Boil water with ginger.",
      "Simmer 10 minutes.",
      "Strain and sip."
    ]
  },

  {
    id: "warm-honey-water",
    name: "Warm Honey Water",
    category: "Soothing Drink",
    recommendedFor: ["throat_pain", "dry_cough"],
    ingredients: ["Honey – 1 tsp", "Warm water – 1 cup"],
    steps: [
      "Mix honey in warm water.",
      "Sip slowly."
    ]
  },

  /* ================= NEWLY ADDED ================= */

  {
    id: "fennel-water",
    name: "Fennel (Saunf) Water",
    category: "Digestive Relief",
    recommendedFor: ["bloating", "gas"],
    ingredients: ["Fennel seeds – 1 tsp", "Water – 1 cup"],
    steps: [
      "Soak fennel seeds overnight.",
      "Strain and drink in the morning."
    ]
  },

  {
    id: "cold-milk",
    name: "Cold Milk",
    category: "Acid Relief",
    recommendedFor: ["acid_reflux"],
    ingredients: ["Cold milk – 1 cup"],
    steps: [
      "Drink cold milk slowly.",
      "Avoid adding sugar."
    ]
  },

  {
    id: "salt-water-rinse",
    name: "Salt Water Rinse",
    category: "Oral Care",
    recommendedFor: ["tooth_pain"],
    ingredients: ["Warm water – 1 cup", "Salt – ½ tsp"],
    steps: [
      "Mix salt in warm water.",
      "Rinse mouth for 30 seconds."
    ]
  },

  {
    id: "aloe-vera-drink",
    name: "Aloe Vera Drink",
    category: "Skin Care",
    recommendedFor: ["skin_irritation", "acne"],
    ingredients: ["Fresh aloe vera gel – 1 tbsp", "Water – 1 cup"],
    steps: [
      "Mix aloe gel with water.",
      "Drink once daily."
    ]
  },

  {
    id: "neem-water",
    name: "Neem Water",
    category: "Skin & Hair Care",
    recommendedFor: ["acne", "dandruff"],
    ingredients: ["Neem leaves – few", "Water – 1 cup"],
    steps: [
      "Boil neem leaves in water.",
      "Cool and use for drinking or hair rinse."
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
  },                                            {
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
    id: "Curd+lemon",
    name: "Curd+lemon",
    category: "haircare",
    recommendedFor: ["dandruff"],
    ingredients: [
      "Lemon juice – 7 tablespoon",
      "curd – 1 cup"
    ],
    steps: [
      "Add lemon juice and curd together.",
      "Mix well.",
      "apply 30 min before head bath"
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
    recommendedFor: ["anxiety", "bloating", "sleep_issues", "menstrual_cramps"],
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
    id: "onion-oil",
    name: "Onion Oil Massage",
    category: "Hair Care",
    recommendedFor: ["hairfall"],
    ingredients: ["Onion juice – 2 tbsp", "Coconut oil – 2 tbsp"],
    steps: [
      "Mix onion juice with oil.",
      "Massage scalp gently.",
      "Wash after 30 minutes."
    ]
  }
]
