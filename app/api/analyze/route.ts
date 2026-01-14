// app/api/analyze/route.ts

import { NextResponse } from "next/server"
import { analyzeSymptoms } from "@/lib/engine"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { symptoms } = body

        // Basic validation
        if (!Array.isArray(symptoms) || symptoms.length === 0) {
            return NextResponse.json(
                { error: "Symptoms array is required" },
                { status: 400 }
            )
        }

        const result = analyzeSymptoms(symptoms)

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid request format" },
            { status: 500 }
        )
    }
}
