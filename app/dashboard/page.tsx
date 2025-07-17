"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard-header"
import { BasketballStatsForm } from "@/components/basketball-stats-form"
import { FootballStatsForm } from "@/components/football-stats-form"
import { SoccerStatsForm } from "@/components/soccer-stats-form"
import { StrengthTrainingForm } from "@/components/strength-training-form"
import { ProgressCharts } from "@/components/progress-charts"
import { AIFeedback } from "@/components/ai-feedback"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getSportStatsForm = () => {
    switch (user.sport) {
      case "basketball":
        return <BasketballStatsForm userName={user.name} />
      case "football":
        return <FootballStatsForm userName={user.name} />
      case "soccer":
        return <SoccerStatsForm userName={user.name} />
      default:
        return <BasketballStatsForm userName={user.name} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your {user.sport} performance and strength training progress
          </p>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats">Add Stats</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              <div>{getSportStatsForm()}</div>
              <div>
                <ProgressCharts userName={user.name} sport={user.sport} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strength" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              <div>
                <StrengthTrainingForm userName={user.name} />
              </div>
              <div>
                <ProgressCharts userName={user.name} sport={user.sport} showStrength={true} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressCharts userName={user.name} sport={user.sport} showAll={true} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <AIFeedback userName={user.name} sport={user.sport} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
