"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import BasketballStatsForm from "@/components/basketball-stats-form"
import StrengthTrainingForm from "@/components/strength-training-form"
import ProgressCharts from "@/components/progress-charts"
import AIFeedback from "@/components/ai-feedback"
import { Loader2 } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/login")
          return
        }
        setUser(currentUser)
      } catch (error) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 container py-6 px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Welcome back, {user?.name || "Athlete"}</CardTitle>
              <CardDescription>
                Track your progress, view insights, and get personalized recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="stats" className="col-span-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats">Enter Stats</TabsTrigger>
              <TabsTrigger value="progress">View Progress</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
              <TabsTrigger value="goals">Training Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Basketball Stats</CardTitle>
                    <CardDescription>Record your basketball performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BasketballStatsForm userId={user.id} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Strength Training</CardTitle>
                    <CardDescription>Log your gym workouts and physical measurements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StrengthTrainingForm userId={user.id} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track how your performance has changed over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressCharts userId={user.id} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis & Comparisons</CardTitle>
                  <CardDescription>
                    See how your stats compare to NBA greats and get personalized insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AIFeedback userId={user.id} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Goals</CardTitle>
                  <CardDescription>Your AI-generated training goals and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">This Week&apos;s Focus</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Based on your recent performance, focus on improving your three-point shooting accuracy and
                        explosive power.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Basketball Goal</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Increase three-point shooting percentage from 32% to 35% through 200 daily practice shots.
                        </p>
                        <div className="mt-4">
                          <Button size="sm">Mark as Complete</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Strength Goal</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Add 2 inches to vertical jump through plyometric training 3x per week.
                        </p>
                        <div className="mt-4">
                          <Button size="sm">Mark as Complete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
