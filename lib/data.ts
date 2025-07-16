// Simple localStorage-based data storage
interface BasketballStats {
  id: string
  userId: string
  date: string
  fieldGoalPercentage: number
  threePointPercentage: number
  freeThrowPercentage: number
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  verticalJump: number
}

interface StrengthTraining {
  id: string
  userId: string
  date: string
  weight: number
  benchPress: number
  squat: number
  deadlift: number
  workoutNotes: string
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Basketball Stats Functions
export async function saveBasketballStats(stats: Omit<BasketballStats, "id">) {
  const newStats = { ...stats, id: generateId() }

  const existing = JSON.parse(localStorage.getItem("basketballStats") || "[]")
  existing.push(newStats)
  localStorage.setItem("basketballStats", JSON.stringify(existing))

  return newStats
}

export async function getBasketballStats(userId: string) {
  const allStats = JSON.parse(localStorage.getItem("basketballStats") || "[]")
  return allStats
    .filter((stat: BasketballStats) => stat.userId === userId)
    .sort((a: BasketballStats, b: BasketballStats) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
}

// Strength Training Functions
export async function saveStrengthTraining(training: Omit<StrengthTraining, "id">) {
  const newTraining = { ...training, id: generateId() }

  const existing = JSON.parse(localStorage.getItem("strengthTraining") || "[]")
  existing.push(newTraining)
  localStorage.setItem("strengthTraining", JSON.stringify(existing))

  return newTraining
}

export async function getStrengthTraining(userId: string) {
  const allTraining = JSON.parse(localStorage.getItem("strengthTraining") || "[]")
  return allTraining
    .filter((training: StrengthTraining) => training.userId === userId)
    .sort((a: StrengthTraining, b: StrengthTraining) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
}

// AI Feedback (simplified)
export async function generateAIFeedback(userId: string) {
  return {
    feedback:
      "Based on your recent performance, you're showing great improvement in your three-point shooting. Focus on maintaining your form and consistency.",
    comparison:
      "Your shooting style and efficiency reminds me of Klay Thompson, especially your catch-and-shoot ability.",
  }
}

// Training Goals
export async function saveTrainingGoal(
  userId: string,
  goalType: string,
  description: string,
  targetValue: number,
  currentValue: number,
  targetDate: string,
) {
  const newGoal = {
    id: generateId(),
    userId,
    goalType,
    description,
    targetValue,
    currentValue,
    targetDate,
    completed: false,
  }

  const existing = JSON.parse(localStorage.getItem("trainingGoals") || "[]")
  existing.push(newGoal)
  localStorage.setItem("trainingGoals", JSON.stringify(existing))

  return newGoal
}

export async function getTrainingGoals(userId: string) {
  const allGoals = JSON.parse(localStorage.getItem("trainingGoals") || "[]")
  return allGoals
    .filter((goal: any) => goal.userId === userId)
    .sort((a: any, b: any) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())
}
