"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Target, Award } from "lucide-react"
import { getBasketballStats, getFootballStats, getSoccerStats, getStrengthStats } from "@/lib/data"

interface AIFeedbackProps {
  userName: string
  sport: "basketball" | "football" | "soccer"
}

export function AIFeedback({ userName, sport }: AIFeedbackProps) {
  const [feedback, setFeedback] = useState<string>("")
  const [goals, setGoals] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const generateFeedback = async () => {
    setIsLoading(true)

    // Get user's stats
    let sportStats: any[] = []
    switch (sport) {
      case "basketball":
        sportStats = getBasketballStats(userName)
        break
      case "football":
        sportStats = getFootballStats(userName)
        break
      case "soccer":
        sportStats = getSoccerStats(userName)
        break
    }

    const strengthStats = getStrengthStats(userName)

    // Simulate AI analysis (in a real app, this would call an AI API)
    setTimeout(() => {
      const recentStats = sportStats.slice(-5) // Last 5 entries
      const analysis = generateMockAnalysis(sport, recentStats, strengthStats)
      setFeedback(analysis.feedback)
      setGoals(analysis.goals)
      setIsLoading(false)
    }, 2000)
  }

  const generateMockAnalysis = (sport: string, sportStats: any[], strengthStats: any[]) => {
    const sportSpecificAnalysis = {
      basketball: {
        feedback: `Based on your recent basketball performance, here's what I've observed:

🏀 **Shooting Analysis**: Your field goal percentage has shown improvement over the last 5 games, averaging ${sportStats.length > 0 ? "45%" : "N/A"}. This is solid for your level, comparable to college players.

📈 **Trend Analysis**: Your rebounding has been consistent, showing good positioning and effort. Your assist numbers suggest you're developing good court vision.

💪 **Strength Connection**: Your vertical jump improvements correlate with your strength training progress. Keep focusing on leg strength for better performance.

🎯 **Areas for Growth**: Work on 3-point consistency and free throw shooting. These are high-impact areas that can significantly boost your scoring.`,
        goals: `**Next 30 Days Goals:**
• Increase 3-point shooting percentage by 5%
• Improve free throw percentage to 80%+
• Add 2 inches to vertical jump
• Maintain current rebounding average
• Focus on reducing turnovers`,
      },
      football: {
        feedback: `Your football performance analysis shows promising development:

🏈 **Passing Game**: Your completion percentage has been trending upward, showing improved accuracy and decision-making under pressure.

🏃 **Athletic Performance**: Your 40-yard dash times indicate good speed for your position. Combined with your strength gains, you're building a solid athletic foundation.

💪 **Physical Development**: Your strength training is paying off - the correlation between your squat improvements and rushing power is evident.

🎯 **Game Impact**: Your tackle numbers show consistent defensive contribution, and your interception rate suggests good field awareness.`,
        goals: `**Next 30 Days Goals:**
• Improve passing accuracy by 3%
• Reduce 40-yard dash time by 0.1 seconds
• Increase bench press by 10 lbs
• Focus on reading defensive formations
• Work on footwork and agility drills`,
      },
      soccer: {
        feedback: `Your soccer performance shows well-rounded development:

⚽ **Offensive Impact**: Your goals-to-shots ratio indicates good finishing ability. Your assist numbers show you're a team player who creates opportunities.

🎯 **Technical Skills**: Pass completion percentage is strong, showing good ball control and decision-making under pressure.

🏃 **Physical Attributes**: Your sprint speed improvements align with your strength training, creating a more explosive player profile.

🛡️ **Defensive Contribution**: Your tackle success rate shows good defensive awareness and positioning.`,
        goals: `**Next 30 Days Goals:**
• Increase shot accuracy by 10%
• Improve sprint speed by 0.5 mph
• Maintain 85%+ pass completion rate
• Add 2 goals per game average
• Focus on first touch and ball control`,
      },
    }

    return sportSpecificAnalysis[sport as keyof typeof sportSpecificAnalysis] || sportSpecificAnalysis.basketball
  }

  useEffect(() => {
    // Auto-generate feedback on component mount if user has stats
    const hasStats = (() => {
      switch (sport) {
        case "basketball":
          return getBasketballStats(userName).length > 0
        case "football":
          return getFootballStats(userName).length > 0
        case "soccer":
          return getSoccerStats(userName).length > 0
        default:
          return false
      }
    })()

    if (hasStats && !feedback) {
      generateFeedback()
    }
  }, [userName, sport, feedback])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Performance Analysis
          </CardTitle>
          <CardDescription>Get personalized insights based on your {sport} performance data</CardDescription>
        </CardHeader>
        <CardContent>
          {!feedback && !isLoading && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">
                Ready to analyze your performance? Click below to get AI-powered insights.
              </p>
              <Button onClick={generateFeedback}>Generate AI Analysis</Button>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500">Analyzing your performance data...</p>
            </div>
          )}

          {feedback && (
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-sm leading-relaxed">{feedback}</div>
              </div>
              <Button onClick={generateFeedback} variant="outline" size="sm">
                Refresh Analysis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {goals && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Personalized Training Goals
            </CardTitle>
            <CardDescription>AI-recommended goals based on your current performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-sm leading-relaxed">{goals}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Pro Comparison
          </CardTitle>
          <CardDescription>See how you stack up against professional athletes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sport === "basketball" && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">NBA Average FG%</div>
                  <div className="text-2xl font-bold text-blue-600">46.5%</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Your Recent FG%</div>
                  <div className="text-2xl font-bold text-green-600">45.0%</div>
                </div>
              </div>
            )}

            {sport === "football" && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">NFL QB Completion%</div>
                  <div className="text-2xl font-bold text-blue-600">64.3%</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Your Completion%</div>
                  <div className="text-2xl font-bold text-green-600">62.0%</div>
                </div>
              </div>
            )}

            {sport === "soccer" && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Pro Pass Accuracy</div>
                  <div className="text-2xl font-bold text-blue-600">83.2%</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Your Pass Accuracy</div>
                  <div className="text-2xl font-bold text-green-600">81.5%</div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500">
              * Comparisons are estimates based on publicly available professional sports statistics
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
