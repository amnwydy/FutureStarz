import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getCurrentUser } from "@/lib/auth"
import { getBasketballStats, getStrengthTraining, saveTrainingGoal } from "@/lib/data"

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

    // Check if we have enough data to generate goals
    if (!basketballStats.length && !strengthData.length) {
      return NextResponse.json({
        message: "Not enough data to generate training goals",
        goals: [],
      })
    }

    // Generate training goals using AI SDK
    const { text: goalsText } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Based on the following basketball and strength training data, generate 3 specific, measurable training goals:
        
        Basketball Stats: ${JSON.stringify(basketballStats)}
        Strength Training: ${JSON.stringify(strengthData)}
        
        For each goal, provide:
        1. A goal type (basketball or strength)
        2. A specific description of the goal
        3. A target value (numeric)
        4. A timeframe (in weeks)
        
        Format your response as a JSON array with objects containing these fields:
        [
          {
            "goal_type": "basketball",
            "goal_description": "Improve three-point shooting percentage",
            "target_value": 40,
            "timeframe": 4
          },
          ...
        ]
      `,
    })

    // Parse the goals from the AI response
    let goals = []
    try {
      goals = JSON.parse(goalsText)
    } catch (error) {
      console.error("Error parsing AI-generated goals:", error)
      return NextResponse.json({ error: "Failed to parse training goals" }, { status: 500 })
    }

    // Store the generated goals
    const savedGoals = []
    for (const goal of goals) {
      const targetDate = new Date()
      targetDate.setDate(targetDate.getDate() + goal.timeframe * 7) // Convert weeks to days

      const savedGoal = await saveTrainingGoal(
        userId,
        goal.goal_type,
        goal.goal_description,
        goal.target_value,
        0, // Start at 0 or get current value from stats
        targetDate.toISOString(),
      )

      savedGoals.push(savedGoal)
    }

    return NextResponse.json({ goals: savedGoals })
  } catch (error: any) {
    console.error("Error generating training goals:", error)
    return NextResponse.json({ error: error.message || "Failed to generate training goals" }, { status: 500 })
  }
}
