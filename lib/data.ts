// Types for different sports stats
export interface BasketballStats {
  id: string
  userId?: string
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
  fieldGoalPercentage: number
  threePointPercentage: number
  freeThrowPercentage: number
  minutesPlayed: number
}

export interface FootballStats {
  id: string
  userId?: string
  date: string
  completions: number
  attempts: number
  yards: number
  touchdowns: number
  interceptions: number
  rushingYards: number
  rushingTouchdowns: number
  receptions: number
  receivingYards: number
  receivingTouchdowns: number
  tackles: number
  sacks: number
  completionPercentage: number
}

export interface SoccerStats {
  id: string
  userId?: string
  date: string
  goals: number
  assists: number
  shots: number
  shotsOnTarget: number
  passes: number
  passesCompleted: number
  tackles: number
  interceptions: number
  fouls: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
  passAccuracy: number
  shotAccuracy: number
}

export interface StrengthTrainingStats {
  id: string
  userId?: string
  date: string
  exercise: string
  weight: number
  reps: number
  sets: number
  restTime: number
  notes: string
  bodyWeight: number
  duration: number
}

// Generic function to get stats for any sport
export function getStats(sport: string): any[] {
  if (typeof window === "undefined") return []

  const key = `${sport}_stats`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Generic function to save stats for any sport
export function saveStats(sport: string, stats: any): void {
  if (typeof window === "undefined") return

  const key = `${sport}_stats`
  const existingStats = getStats(sport)
  const newStats = [...existingStats, { ...stats, id: Date.now().toString() }]
  localStorage.setItem(key, JSON.stringify(newStats))
}

// Basketball specific functions
export function getBasketballStats(userId?: string): BasketballStats[] {
  const stats = getStats("basketball")
  return userId ? stats.filter((stat: BasketballStats) => stat.userId === userId) : stats
}

export function saveBasketballStats(stats: Omit<BasketballStats, "id">): void {
  saveStats("basketball", stats)
}

// Football specific functions
export function getFootballStats(userId?: string): FootballStats[] {
  const stats = getStats("football")
  return userId ? stats.filter((stat: FootballStats) => stat.userId === userId) : stats
}

export function saveFootballStats(stats: Omit<FootballStats, "id">): void {
  saveStats("football", stats)
}

// Soccer specific functions
export function getSoccerStats(userId?: string): SoccerStats[] {
  const stats = getStats("soccer")
  return userId ? stats.filter((stat: SoccerStats) => stat.userId === userId) : stats
}

export function saveSoccerStats(stats: Omit<SoccerStats, "id">): void {
  saveStats("soccer", stats)
}

// Strength training specific functions
export function getStrengthTraining(userId?: string): StrengthTrainingStats[] {
  const stats = getStats("strength")
  return userId ? stats.filter((stat: StrengthTrainingStats) => stat.userId === userId) : stats
}

export function saveStrengthTraining(stats: Omit<StrengthTrainingStats, "id">): void {
  saveStats("strength", stats)
}

// Get all stats for a user across all sports
export function getAllUserStats(userId: string) {
  return {
    basketball: getBasketballStats(userId),
    football: getFootballStats(userId),
    soccer: getSoccerStats(userId),
    strength: getStrengthTraining(userId),
  }
}

// Export data for backup
export function exportAllData() {
  if (typeof window === "undefined") return null

  return {
    basketball: getBasketballStats(),
    football: getFootballStats(),
    soccer: getSoccerStats(),
    strength: getStrengthTraining(),
    exportDate: new Date().toISOString(),
  }
}

// Import data from backup
export function importData(data: any) {
  if (typeof window === "undefined") return

  if (data.basketball) localStorage.setItem("basketball_stats", JSON.stringify(data.basketball))
  if (data.football) localStorage.setItem("football_stats", JSON.stringify(data.football))
  if (data.soccer) localStorage.setItem("soccer_stats", JSON.stringify(data.soccer))
  if (data.strength) localStorage.setItem("strength_stats", JSON.stringify(data.strength))
}

// Clear all data
export function clearAllData() {
  if (typeof window === "undefined") return

  localStorage.removeItem("basketball_stats")
  localStorage.removeItem("football_stats")
  localStorage.removeItem("soccer_stats")
  localStorage.removeItem("strength_stats")
}
