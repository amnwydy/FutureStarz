"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Target } from "lucide-react"
import { generateAIFeedback, getBasketballStats, getStrengthTraining } from "@/lib/data"

interface AIFeedbackProps {
  userId: string
}

export default function AIFeedback({ userId }: AIFeedbackProps) {
  const [feedback, setFeedback] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const [aiResponse, basketballStats, strengthStats] = await Promise.all([
          generateAIFeedback(userId),
          getBasketballStats(userId),
          getStrengthTraining(userId),
        ])

        setFeedback(aiResponse)
        setStats({
          basketball: basketballStats,
          strength: strengthStats,
        })
      } catch (error) {
        console.error("Error loading AI feedback:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeedback()
  }, [userId])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded animate-pulse" />
        <div className="h-32 bg-gray-100 rounded animate-pulse" />
      </div>
    )
  }

  const getLatestStats = () => {
    if (!stats?.basketball?.length) return null
    return stats.basketball[0]
  }

  const getStrengthStats = () => {
    if (!stats?.strength?.length) return null
    return stats.strength[0]
  }

  const latestBasketball = getLatestStats()
  const latestStrength = getStrengthStats()

  return (
    <div className="space-y-6">
      {/* AI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Performance Analysis
          </CardTitle>
          <CardDescription>Personalized insights based on your recent performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedback && (
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-medium text-blue-900 mb-2">Performance Feedback</h4>
                <p className="text-blue-800">{feedback.feedback}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 className="font-medium text-green-900 mb-2">Player Comparison</h4>
                <p className="text-green-800">{feedback.comparison}</p>
              </div>
            </div>
          )}

          {!latestBasketball && !latestStrength && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Start recording your stats to get AI-powered insights!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Highlights */}
      {latestBasketball && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Basketball Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{latestBasketball.fieldGoalPercentage}%</div>
                <div className="text-sm text-gray-500">Field Goal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{latestBasketball.threePointPercentage}%</div>
                <div className="text-sm text-gray-500">3-Point</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{latestBasketball.points}</div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{latestBasketball.verticalJump}"</div>
                <div className="text-sm text-gray-500">Vertical Jump</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strength Highlights */}
      {latestStrength && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recent Strength Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{latestStrength.benchPress}</div>
                <div className="text-sm text-gray-500">Bench Press (lbs)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{latestStrength.squat}</div>
                <div className="text-sm text-gray-500">Squat (lbs)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{latestStrength.deadlift}</div>
                <div className="text-sm text-gray-500">Deadlift (lbs)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{latestStrength.weight}</div>
                <div className="text-sm text-gray-500">Body Weight (lbs)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Areas to focus on for improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Basketball</Badge>
              <span className="text-sm">Focus on consistency in free throw shooting</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Strength</Badge>
              <span className="text-sm">Increase squat frequency for better leg power</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Recovery</Badge>
              <span className="text-sm">Track rest days between intense sessions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
