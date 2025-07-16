import { db } from "./db"

// Basketball Stats Types
interface BasketballStats {
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

// Strength Training Types
interface StrengthTraining {
  userId: string
  date: string
  weight: number
  benchPress: number
  squat: number
  deadlift: number
  workoutNotes: string
}

// Save basketball stats
export async function saveBasketballStats(stats: BasketballStats) {
  return db.basketballStats.create({
    data: {
      userId: stats.userId,
      date: new Date(stats.date),
      fieldGoalPercentage: stats.fieldGoalPercentage,
      threePointPercentage: stats.threePointPercentage,
      freeThrowPercentage: stats.freeThrowPercentage,
      points: stats.points,
      rebounds: stats.rebounds,
      assists: stats.assists,
      steals: stats.steals,
      blocks: stats.blocks,
      verticalJump: stats.verticalJump,
    },
  })
}

// Get basketball stats for a user
export async function getBasketballStats(userId: string) {
  const stats = await db.basketballStats.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
    take: 10,
  })

  return stats.map((stat) => ({
    id: stat.id,
    userId: stat.userId,
    date: stat.date.toISOString(),
    fieldGoalPercentage: stat.fieldGoalPercentage,
    threePointPercentage: stat.threePointPercentage,
    freeThrowPercentage: stat.freeThrowPercentage,
    points: stat.points,
    rebounds: stat.rebounds,
    assists: stat.assists,
    steals: stat.steals,
    blocks: stat.blocks,
    verticalJump: stat.verticalJump,
  }))
}

// Save strength training data
export async function saveStrengthTraining(training: StrengthTraining) {
  return db.strengthTraining.create({
    data: {
      userId: training.userId,
      date: new Date(training.date),
      weight: training.weight,
      benchPress: training.benchPress,
      squat: training.squat,
      deadlift: training.deadlift,
      workoutNotes: training.workoutNotes,
    },
  })
}

// Get strength training data for a user
export async function getStrengthTraining(userId: string) {
  const trainings = await db.strengthTraining.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
    take: 10,
  })

  return trainings.map((training) => ({
    id: training.id,
    userId: training.userId,
    date: training.date.toISOString(),
    weight: training.weight,
    benchPress: training.benchPress,
    squat: training.squat,
    deadlift: training.deadlift,
    workoutNotes: training.workoutNotes,
  }))
}

// Generate AI feedback
export async function generateAIFeedback(userId: string) {
  // This would call the AI API in a real app
  return {
    feedback:
      "Based on your recent performance, you're showing great improvement in your three-point shooting. Focus on maintaining your form and consistency.",
    comparison:
      "Your shooting style and efficiency reminds me of Klay Thompson, especially your catch-and-shoot ability.",
  }
}

// Save training goals
export async function saveTrainingGoal(
  userId: string,
  goalType: string,
  description: string,
  targetValue: number,
  currentValue: number,
  targetDate: string,
) {
  return db.trainingGoal.create({
    data: {
      userId,
      goalType,
      description,
      targetValue,
      currentValue,
      targetDate: new Date(targetDate),
      completed: false,
    },
  })
}

// Get training goals for a user
export async function getTrainingGoals(userId: string) {
  const goals = await db.trainingGoal.findMany({
    where: {
      userId,
    },
    orderBy: {
      targetDate: "asc",
    },
  })

  return goals.map((goal) => ({
    id: goal.id,
    userId: goal.userId,
    goalType: goal.goalType,
    description: goal.description,
    targetValue: goal.targetValue,
    currentValue: goal.currentValue,
    targetDate: goal.targetDate.toISOString(),
    completed: goal.completed,
  }))
}
