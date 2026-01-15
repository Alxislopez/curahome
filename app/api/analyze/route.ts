// app/api/analyze/route.ts

import { NextResponse } from "next/server"
import { analyzeSymptoms } from "@/lib/engine"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { symptoms, age, sex } = body

        // 🔒 Validation
        if (!Array.isArray(symptoms) || symptoms.length === 0) {
            return NextResponse.json(
                { error: "Symptoms array is required" },
                { status: 400 }
            )
        }

        if (typeof age !== "number" || age <= 0) {
            return NextResponse.json(
                { error: "Valid age is required" },
                { status: 400 }
            )
        }

        if (sex !== "male" && sex !== "female") {
            return NextResponse.json(
                { error: "Sex must be 'male' or 'female'" },
                { status: 400 }
            )
        }

        // 🧠 Analyze with age & sex
        const result = analyzeSymptoms(symptoms, age, sex)

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid request format" },
            { status: 500 }
        )
    }
}
