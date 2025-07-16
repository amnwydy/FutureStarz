import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getCurrentUser } from "@/lib/auth"
import { getBasketballStats, getStrengthTraining } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId } = await request.json()

    // Verify the user is requesting their own data
    if (userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch the user's basketball stats
    const basketballStats = await getBasketballStats(userId)

    // Fetch the user's strength training data
    const strengthData = await getStrengthTraining(userId)

    // Check if we have enough data to generate feedback
    if (!basketballStats.length && !strengthData.length) {
      return NextResponse.json({
        message: "Not enough data to generate feedback",
        feedback: "Start tracking your stats to receive AI-powered feedback and analysis.",
        comparison: "No data available for NBA player comparisons yet.",
      })
    }

    // Generate feedback using AI SDK
    const { text: feedbackText } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze the following basketball and strength training data and provide personalized feedback:
        
        Basketball Stats: ${JSON.stringify(basketballStats)}
        Strength Training: ${JSON.stringify(strengthData)}
        
        Provide specific, actionable feedback on areas of improvement and strengths based on this data.
        Keep your response under 300 words and focus on practical advice.
      `,
    })

    // Generate NBA player comparison if we have basketball stats
    let comparisonText = "No basketball data available for NBA player comparisons yet."

    if (basketballStats.length > 0) {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          Based on these basketball stats: ${JSON.stringify(basketballStats)}
          
          Compare the player's style and performance to NBA players (current or all-time greats).
          Identify 2-3 NBA players with similar playing styles or statistical profiles.
          Explain the similarities and what the player can learn from these NBA stars.
          Keep your response under 250 words.
        `,
      })

      comparisonText = text
    }

    return NextResponse.json({
      feedback: feedbackText,
      comparison: comparisonText,
    })
  } catch (error: any) {
    console.error("Error generating AI feedback:", error)
    return NextResponse.json({ error: error.message || "Failed to generate feedback" }, { status: 500 })
  }
}
