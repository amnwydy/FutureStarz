"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, TrendingUp, Lightbulb, RefreshCw, Zap } from "lucide-react"
import { getStats } from "@/lib/data"
import { getCurrentUser } from "@/lib/auth"
import { toast } from "sonner"

interface AIFeedbackData {
  performance: string
  strengths: string[]
  improvements: string[]
  goals: string[]
  motivation: string
}

export default function AIFeedback() {
  const [feedback, setFeedback] = useState<AIFeedbackData | null>(null)
  const [goals, setGoals] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const user = getCurrentUser()
  const basketballStats = getStats("basketball")
  const footballStats = getStats("football")
  const soccerStats = getStats("soccer")
  const strengthStats = getStats("strength")

  const generateFeedback = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const allStats = {
        basketball: basketballStats,
        football: footballStats,
        soccer: soccerStats,
        strength: strengthStats,
      }

      const response = await fetch("/api/generate-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          stats: allStats,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate feedback")
      }

      const data = await response.json()
      setFeedback(data.feedback)
      toast.success("AI feedback generated successfully!")
    } catch (err) {
      setError("Failed to generate AI feedback. Please try again.")
      console.error("Error generating feedback:", err)
    } finally {
      setLoading(false)
    }
  }

  const generateGoals = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const allStats = {
        basketball: basketballStats,
        football: footballStats,
        soccer: soccerStats,
        strength: strengthStats,
      }

      const response = await fetch("/api/generate-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          stats: allStats,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate goals")
      }

      const data = await response.json()
      setGoals(data.goals)
      toast.success("Personalized goals generated!")
    } catch (err) {
      setError("Failed to generate goals. Please try again.")
      console.error("Error generating goals:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      user &&
      (basketballStats.length > 0 || footballStats.length > 0 || soccerStats.length > 0 || strengthStats.length > 0)
    ) {
      generateFeedback()
    }
  }, [user])

  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">Please log in to view AI feedback.</p>
        </CardContent>
      </Card>
    )
  }

  const hasStats =
    basketballStats.length > 0 || footballStats.length > 0 || soccerStats.length > 0 || strengthStats.length > 0

  if (!hasStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Performance Analysis</span>
          </CardTitle>
          <CardDescription>
            Get personalized insights and recommendations based on your performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              Start tracking your performance to receive AI-powered feedback and personalized training recommendations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Brain className="h-6 w-6" />
            <span>AI Performance Analysis</span>
          </h2>
          <p className="text-muted-foreground">Personalized insights powered by artificial intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={generateFeedback} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh Analysis
          </Button>
          <Button onClick={generateGoals} disabled={loading}>
            <Target className="h-4 w-4 mr-2" />
            Generate Goals
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="feedback" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feedback">Performance Feedback</TabsTrigger>
          <TabsTrigger value="goals">Personalized Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-4">
          {loading && !feedback ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>
          ) : feedback ? (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <span>Overall Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{feedback.performance}</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-green-500" />
                      <span>Strengths</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {feedback.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="mr-2 mb-2">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-orange-500" />
                      <span>Areas for Improvement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {feedback.improvements.map((improvement, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {improvement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>Motivation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed italic">{feedback.motivation}</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-48">
                <div className="text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No AI feedback available yet.</p>
                  <Button onClick={generateFeedback} disabled={loading}>
                    <Brain className="h-4 w-4 mr-2" />
                    Generate AI Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          {goals.length > 0 ? (
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span>Personalized Training Goals</span>
                  </CardTitle>
                  <CardDescription>
                    AI-generated goals based on your current performance and areas for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {goals.map((goal, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{goal}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-48">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No personalized goals generated yet.</p>
                  <Button onClick={generateGoals} disabled={loading}>
                    <Target className="h-4 w-4 mr-2" />
                    Generate Goals
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
