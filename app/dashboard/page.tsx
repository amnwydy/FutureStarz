"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import { getStats } from "@/lib/data"
import { DashboardHeader } from "@/components/dashboard-header"
import BasketballStatsForm from "@/components/basketball-stats-form"
import FootballStatsForm from "@/components/football-stats-form"
import SoccerStatsForm from "@/components/soccer-stats-form"
import StrengthTrainingForm from "@/components/strength-training-form"
import ProgressCharts from "@/components/progress-charts"
import AIFeedback from "@/components/ai-feedback"
import { BarChart3, Plus, TrendingUp, Target, Activity, Trophy } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState(getCurrentUser())
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setActiveTab(currentUser.sport)
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const basketballStats = getStats("basketball")
  const footballStats = getStats("football")
  const soccerStats = getStats("soccer")
  const strengthStats = getStats("strength")

  const getRecentStats = (stats: any[]) => {
    return stats.slice(-5).reverse()
  }

  const getStatsSummary = () => {
    const totalGames = basketballStats.length + footballStats.length + soccerStats.length
    const totalWorkouts = strengthStats.length
    const thisWeek = new Date()
    thisWeek.setDate(thisWeek.getDate() - 7)

    const recentStats = [
      ...basketballStats.filter((s) => new Date(s.date) >= thisWeek),
      ...footballStats.filter((s) => new Date(s.date) >= thisWeek),
      ...soccerStats.filter((s) => new Date(s.date) >= thisWeek),
    ]

    const recentWorkouts = strengthStats.filter((s) => new Date(s.date) >= thisWeek)

    return {
      totalGames,
      totalWorkouts,
      thisWeekGames: recentStats.length,
      thisWeekWorkouts: recentWorkouts.length,
    }
  }

  const summary = getStatsSummary()

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-muted-foreground">
            Track your progress and improve your {user.sport} performance with AI-powered insights.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Games</p>
                  <p className="text-2xl font-bold">{summary.totalGames}</p>
                </div>
                <Trophy className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Workouts</p>
                  <p className="text-2xl font-bold">{summary.totalWorkouts}</p>
                </div>
                <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week Games</p>
                  <p className="text-2xl font-bold">{summary.thisWeekGames}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week Workouts</p>
                  <p className="text-2xl font-bold">{summary.thisWeekWorkouts}</p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="basketball">🏀 Basketball</TabsTrigger>
            <TabsTrigger value="football">🏈 Football</TabsTrigger>
            <TabsTrigger value="soccer">⚽ Soccer</TabsTrigger>
            <TabsTrigger value="strength">💪 Strength</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>Your latest games and workouts</CardDescription>
                </CardHeader>
                <CardContent>
                  {summary.totalGames === 0 && summary.totalWorkouts === 0 ? (
                    <div className="text-center py-8">
                      <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">No activity recorded yet</p>
                      <p className="text-sm text-muted-foreground">
                        Start by adding your first game or workout using the tabs above.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {getRecentStats([...basketballStats, ...footballStats, ...soccerStats, ...strengthStats])
                        .slice(0, 5)
                        .map((stat, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">
                                {stat.sport || "Strength Training"} - {new Date(stat.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {stat.points
                                  ? `${stat.points} points`
                                  : stat.totalVolume
                                    ? `${stat.totalVolume} lbs`
                                    : "Activity"}
                              </p>
                            </div>
                            <Badge variant="secondary">{stat.sport || "Workout"}</Badge>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <AIFeedback />
            </div>
          </TabsContent>

          <TabsContent value="basketball">
            <BasketballStatsForm />
          </TabsContent>

          <TabsContent value="football">
            <FootballStatsForm />
          </TabsContent>

          <TabsContent value="soccer">
            <SoccerStatsForm />
          </TabsContent>

          <TabsContent value="strength">
            <StrengthTrainingForm />
          </TabsContent>

          <TabsContent value="analytics">
            <ProgressCharts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
