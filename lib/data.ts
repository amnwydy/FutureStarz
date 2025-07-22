export interface BasketballStats {
  id: string
  userId: string
  date: string
  points: number
  assists: number
  rebounds: number
  steals: number
  blocks: number
  turnovers: number
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  threePointersMade: number
  threePointersAttempted: number
  freeThrowsMade: number
  freeThrowsAttempted: number
  minutesPlayed: number
  verticalJump?: number
}

export interface FootballStats {
  id: string
  userId: string
  date: string
  passingYards: number
  passingTouchdowns: number
  interceptions: number
  completions: number
  attempts: number
  rushingYards: number
  rushingTouchdowns: number
  receivingYards: number
  receivingTouchdowns: number
  tackles: number
  sacks: number
  fortyYardDash?: number
}

export interface SoccerStats {
  id: string
  userId: string
  date: string
  goals: number
  assists: number
  shots: number
  shotsOnTarget: number
  passes: number
  passesCompleted: number
  tackles: number
  saves: number
  yellowCards: number
  redCards: number
  sprintSpeed?: number
}

export interface StrengthStats {
  id: string
  userId: string
  date: string
  bodyWeight: number
  benchPress: number
  squat: number
  deadlift: number
  notes?: string
}

export interface TrainingGoal {
  id: string
  userId: string
  sport: string
  metric: string
  currentValue: number
  targetValue: number
  deadline: string
  achieved: boolean
  createdAt: string
}

// Basketball Stats Functions
export function getBasketballStats(userId: string): BasketballStats[] {
  if (typeof window === "undefined") return []
  const stats = localStorage.getItem(`basketball_stats_${userId}`)
  return stats ? JSON.parse(stats) : []
}

export function addBasketballStat(userId: string, stat: Omit<BasketballStats, "id" | "userId">): BasketballStats {
  if (typeof window === "undefined") throw new Error("Cannot add stat on server")

  const newStat: BasketballStats = {
    ...stat,
    id: Date.now().toString(),
    userId,
  }

  const stats = getBasketballStats(userId)
  stats.push(newStat)
  localStorage.setItem(`basketball_stats_${userId}`, JSON.stringify(stats))

  return newStat
}

// Football Stats Functions
export function getFootballStats(userId: string): FootballStats[] {
  if (typeof window === "undefined") return []
  const stats = localStorage.getItem(`football_stats_${userId}`)
  return stats ? JSON.parse(stats) : []
}

export function addFootballStat(userId: string, stat: Omit<FootballStats, "id" | "userId">): FootballStats {
  if (typeof window === "undefined") throw new Error("Cannot add stat on server")

  const newStat: FootballStats = {
    ...stat,
    id: Date.now().toString(),
    userId,
  }

  const stats = getFootballStats(userId)
  stats.push(newStat)
  localStorage.setItem(`football_stats_${userId}`, JSON.stringify(stats))

  return newStat
}

// Soccer Stats Functions
export function getSoccerStats(userId: string): SoccerStats[] {
  if (typeof window === "undefined") return []
  const stats = localStorage.getItem(`soccer_stats_${userId}`)
  return stats ? JSON.parse(stats) : []
}

export function addSoccerStat(userId: string, stat: Omit<SoccerStats, "id" | "userId">): SoccerStats {
  if (typeof window === "undefined") throw new Error("Cannot add stat on server")

  const newStat: SoccerStats = {
    ...stat,
    id: Date.now().toString(),
    userId,
  }

  const stats = getSoccerStats(userId)
  stats.push(newStat)
  localStorage.setItem(`soccer_stats_${userId}`, JSON.stringify(stats))

  return newStat
}

// Strength Stats Functions
export function getStrengthStats(userId: string): StrengthStats[] {
  if (typeof window === "undefined") return []
  const stats = localStorage.getItem(`strength_stats_${userId}`)
  return stats ? JSON.parse(stats) : []
}

export function addStrengthStat(userId: string, stat: Omit<StrengthStats, "id" | "userId">): StrengthStats {
  if (typeof window === "undefined") throw new Error("Cannot add stat on server")

  const newStat: StrengthStats = {
    ...stat,
    id: Date.now().toString(),
    userId,
  }

  const stats = getStrengthStats(userId)
  stats.push(newStat)
  localStorage.setItem(`strength_stats_${userId}`, JSON.stringify(stats))

  return newStat
}

// Training Goals Functions
export function getTrainingGoals(userId: string): TrainingGoal[] {
  if (typeof window === "undefined") return []
  const goals = localStorage.getItem(`training_goals_${userId}`)
  return goals ? JSON.parse(goals) : []
}

export function saveTrainingGoal(userId: string, goal: Omit<TrainingGoal, "id" | "userId">): TrainingGoal {
  if (typeof window === "undefined") throw new Error("Cannot save goal on server")

  const newGoal: TrainingGoal = {
    ...goal,
    id: Date.now().toString(),
    userId,
  }

  const goals = getTrainingGoals(userId)
  goals.push(newGoal)
  localStorage.setItem(`training_goals_${userId}`, JSON.stringify(goals))

  return newGoal
}

// Utility Functions
export function exportUserData(userId: string) {
  const data = {
    basketball: getBasketballStats(userId),
    football: getFootballStats(userId),
    soccer: getSoccerStats(userId),
    strength: getStrengthStats(userId),
    goals: getTrainingGoals(userId),
    exportDate: new Date().toISOString(),
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `sports-data-${userId}-${new Date().toISOString().split("T")[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function getStrengthTraining(userId: string): StrengthStats[] {
  return getStrengthStats(userId)
}
