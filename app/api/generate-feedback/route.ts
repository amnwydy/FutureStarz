import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { sport, stats } = await request.json()

    // Generate mock AI feedback based on stats
    const feedback = generateMockFeedback(sport, stats)
    const comparison = generateMockComparison(sport, stats)

    return NextResponse.json({
      feedback,
      comparison,
    })
  } catch (error) {
    console.error("Error generating feedback:", error)
    return NextResponse.json({ error: "Failed to generate feedback" }, { status: 500 })
  }
}

function generateMockFeedback(sport: string, stats: any[]): string {
  if (!stats || stats.length === 0) {
    return "Start tracking your stats to receive personalized feedback and analysis!"
  }

  const latestStats = stats[stats.length - 1]

  switch (sport) {
    case "basketball":
      return generateBasketballFeedback(latestStats)
    case "football":
      return generateFootballFeedback(latestStats)
    case "soccer":
      return generateSoccerFeedback(latestStats)
    case "strength":
      return generateStrengthFeedback(latestStats)
    default:
      return "Keep up the great work! Your dedication to training is showing progress."
  }
}

function generateBasketballFeedback(stats: any): string {
  const { points, assists, rebounds, fieldGoalPercentage } = stats

  let feedback = "Basketball Performance Analysis:\n\n"

  if (fieldGoalPercentage > 50) {
    feedback += "🎯 Excellent shooting efficiency! Your field goal percentage is outstanding.\n"
  } else if (fieldGoalPercentage > 40) {
    feedback += "👍 Good shooting form. Try to get closer to the basket for higher percentage shots.\n"
  } else {
    feedback += "🏀 Focus on shot selection and practice your shooting form. Quality over quantity!\n"
  }

  if (assists > rebounds) {
    feedback += "🤝 Great court vision! You're creating opportunities for your teammates.\n"
  }

  if (points > 20) {
    feedback += "⭐ Strong scoring performance! Keep attacking the basket.\n"
  }

  feedback += "\nRecommendations: Work on ball handling drills and practice free throws daily."

  return feedback
}

function generateFootballFeedback(stats: any): string {
  const { touchdowns, yards, completions, attempts } = stats

  let feedback = "Football Performance Analysis:\n\n"

  const completionRate = attempts > 0 ? (completions / attempts) * 100 : 0

  if (completionRate > 70) {
    feedback += "🎯 Excellent accuracy! Your completion rate is elite level.\n"
  } else if (completionRate > 60) {
    feedback += "👍 Good accuracy. Work on timing with receivers.\n"
  } else {
    feedback += "🏈 Focus on accuracy drills and reading defenses better.\n"
  }

  if (touchdowns > 2) {
    feedback += "🔥 Great red zone efficiency! You're finding the end zone.\n"
  }

  feedback += "\nRecommendations: Practice pocket presence and quick decision making."

  return feedback
}

function generateSoccerFeedback(stats: any): string {
  const { goals, assists, shots, passes } = stats

  let feedback = "Soccer Performance Analysis:\n\n"

  if (goals > 2) {
    feedback += "⚽ Excellent finishing! Your goal scoring is impressive.\n"
  }

  if (assists > 1) {
    feedback += "🤝 Great playmaking ability! You're creating chances for teammates.\n"
  }

  const shotAccuracy = shots > 0 ? (goals / shots) * 100 : 0
  if (shotAccuracy > 30) {
    feedback += "🎯 Good shot selection and accuracy.\n"
  } else {
    feedback += "⚽ Work on shot placement and timing.\n"
  }

  feedback += "\nRecommendations: Focus on first touch and passing accuracy drills."

  return feedback
}

function generateStrengthFeedback(stats: any): string {
  const { exercise, weight, reps, sets } = stats

  let feedback = "Strength Training Analysis:\n\n"

  feedback += `💪 Great work on ${exercise}! `

  const volume = weight * reps * sets

  if (volume > 5000) {
    feedback += "High training volume - excellent intensity!\n"
  } else if (volume > 2000) {
    feedback += "Good training volume. Consider progressive overload.\n"
  } else {
    feedback += "Focus on gradually increasing weight or reps.\n"
  }

  feedback += "\nRecommendations: Ensure proper form and adequate rest between sessions."

  return feedback
}

function generateMockComparison(sport: string, stats: any[]): string {
  if (!stats || stats.length === 0) {
    return "No data available for comparisons yet. Keep tracking your progress!"
  }

  switch (sport) {
    case "basketball":
      return "Your playing style shows similarities to versatile guards who can score and facilitate. Focus on developing a consistent three-point shot like Stephen Curry, and work on court vision like Chris Paul."
    case "football":
      return "Your stats suggest a balanced approach similar to elite quarterbacks. Work on pocket presence like Tom Brady and develop mobility like Russell Wilson."
    case "soccer":
      return "Your performance shows characteristics of a complete midfielder. Develop passing range like Kevin De Bruyne and work on finishing like Bruno Fernandes."
    case "strength":
      return "Your training approach is well-rounded. Focus on progressive overload principles and maintain consistency like elite athletes."
    default:
      return "Keep up the consistent training approach. Elite athletes focus on fundamentals and gradual improvement."
  }
}
