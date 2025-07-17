export interface BasketballStats {
  id: string
  date: string
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  threePointersMade: number
  threePointersAttempted: number
  freeThrowsMade: number
  freeThrowsAttempted: number
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  verticalJump: number
}

export interface FootballStats {
  id: string
  date: string
  passingYards: number
  passingTouchdowns: number
  completions: number
  attempts: number
  rushingYards: number
  rushingTouchdowns: number
  tackles: number
  sacks: number
  interceptions: number
  fortyYardDash: number
}

export interface SoccerStats {
  id: string
  date: string
  goals: number
  assists: number
  shots: number
  shotsOnTarget: number
  passes: number
  passesCompleted: number
  tackles: number
  saves: number
  sprintSpeed: number
}

export interface StrengthStats {
  id: string
  date: string
  bodyWeight: number
  benchPress: number
  squat: number
  deadlift: number
  notes: string
}

export interface TrainingGoal {
  id: string
  userName: string
  sport: string
  goal: string
  targetDate: string
  completed: boolean
  createdAt: string
}

export type SportStats = BasketballStats | FootballStats | SoccerStats

export function getBasketballStats(userName: string): BasketballStats[] {
  if (typeof window === "undefined") return []

  const key = `basketballStats_${userName.toLowerCase()}`
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

export function getFootballStats(userName: string): FootballStats[] {
  if (typeof window === "undefined") return []

  const key = `footballStats_${userName.toLowerCase()}`
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

export function getSoccerStats(userName: string): SoccerStats[] {
  if (typeof window === "undefined") return []

  const key = `soccerStats_${userName.toLowerCase()}`
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

export function getStrengthStats(userName: string): StrengthStats[] {
  if (typeof window === "undefined") return []

  const key = `strengthStats_${userName.toLowerCase()}`
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

export function getStrengthTraining(userName: string): StrengthStats[] {
  return getStrengthStats(userName)
}

export function getTrainingGoals(userName: string): TrainingGoal[] {
  if (typeof window === "undefined") return []

  const key = `trainingGoals_${userName.toLowerCase()}`
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

export function saveBasketballStats(userName: string, stats: BasketballStats[]): void {
  if (typeof window === "undefined") return

  const key = `basketballStats_${userName.toLowerCase()}`
  localStorage.setItem(key, JSON.stringify(stats))
}

export function saveFootballStats(userName: string, stats: FootballStats[]): void {
  if (typeof window === "undefined") return

  const key = `footballStats_${userName.toLowerCase()}`
  localStorage.setItem(key, JSON.stringify(stats))
}

export function saveSoccerStats(userName: string, stats: SoccerStats[]): void {
  if (typeof window === "undefined") return

  const key = `soccerStats_${userName.toLowerCase()}`
  localStorage.setItem(key, JSON.stringify(stats))
}

export function saveStrengthStats(userName: string, stats: StrengthStats[]): void {
  if (typeof window === "undefined") return

  const key = `strengthStats_${userName.toLowerCase()}`
  localStorage.setItem(key, JSON.stringify(stats))
}

export function saveTrainingGoal(userName: string, goal: Omit<TrainingGoal, "id" | "userName" | "createdAt">): void {
  if (typeof window === "undefined") return

  const goals = getTrainingGoals(userName)
  const newGoal: TrainingGoal = {
    ...goal,
    id: Date.now().toString(),
    userName,
    createdAt: new Date().toISOString(),
  }
  goals.push(newGoal)

  const key = `trainingGoals_${userName.toLowerCase()}`
  localStorage.setItem(key, JSON.stringify(goals))
}

export function addBasketballStat(userName: string, stat: Omit<BasketballStats, "id">): void {
  const stats = getBasketballStats(userName)
  const newStat: BasketballStats = {
    ...stat,
    id: Date.now().toString(),
  }
  stats.push(newStat)
  saveBasketballStats(userName, stats)
}

export function addFootballStat(userName: string, stat: Omit<FootballStats, "id">): void {
  const stats = getFootballStats(userName)
  const newStat: FootballStats = {
    ...stat,
    id: Date.now().toString(),
  }
  stats.push(newStat)
  saveFootballStats(userName, stats)
}

export function addSoccerStat(userName: string, stat: Omit<SoccerStats, "id">): void {
  const stats = getSoccerStats(userName)
  const newStat: SoccerStats = {
    ...stat,
    id: Date.now().toString(),
  }
  stats.push(newStat)
  saveSoccerStats(userName, stats)
}

export function addStrengthStat(userName: string, stat: Omit<StrengthStats, "id">): void {
  const stats = getStrengthStats(userName)
  const newStat: StrengthStats = {
    ...stat,
    id: Date.now().toString(),
  }
  stats.push(newStat)
  saveStrengthStats(userName, stats)
}

export function exportUserData(userName: string): string {
  const basketballStats = getBasketballStats(userName)
  const footballStats = getFootballStats(userName)
  const soccerStats = getSoccerStats(userName)
  const strengthStats = getStrengthStats(userName)
  const trainingGoals = getTrainingGoals(userName)

  const data = {
    userName,
    exportDate: new Date().toISOString(),
    basketballStats,
    footballStats,
    soccerStats,
    strengthStats,
    trainingGoals,
  }

  return JSON.stringify(data, null, 2)
}
