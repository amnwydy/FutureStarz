"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Loader2, RefreshCw } from "lucide-react"
import { getBasketballStats, getStrengthTraining } from "@/lib/data"

interface AIFeedbackProps {
  userId: string
}

export default function AIFeedback({ userId }: AIFeedbackProps) {
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [basketballStats, setBasketballStats] = useState<any[]>([])
  const [strengthData, setStrengthData] = useState<any[]>([])
  const [feedback, setFeedback] = useState<string>("")
  const [comparison, setComparison] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        // Fetch basketball stats
        const basketballData = await getBasketballStats(userId)
        setBasketballStats(basketballData || [])

        // Fetch strength training data
        const strengthTrainingData = await getStrengthTraining(userId)
        setStrengthData(strengthTrainingData || [])

        // Generate AI feedback if we have data
        if (
          (basketballData && basketballData.length > 0) ||
          (strengthTrainingData && strengthTrainingData.length > 0)
        ) {
          generateAIFeedback(basketballData || [], strengthTrainingData || [])
        } else {
          setFeedback("Start tracking your stats to receive AI-powered feedback and analysis.")
          setComparison("No data available for NBA player comparisons yet.")
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching data for AI analysis:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const generateAIFeedback = async (basketballData: any[], strengthData: any[]) => {
    setGenerating(true)

    try {
      // Prepare the data for the AI
      const recentBasketballStats = basketballData.slice(0, 5)
      const recentStrengthData = strengthData.slice(0, 5)

      // Generate feedback using AI SDK
      const { text: feedbackText } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          Analyze the following basketball and strength training data and provide personalized feedback:
          
          Basketball Stats: ${JSON.stringify(recentBasketballStats)}
          Strength Training: ${JSON.stringify(recentStrengthData)}
          
          Provide specific, actionable feedback on areas of improvement and strengths based on this data.
          Keep your response under 300 words and focus on practical advice.
        `,
      })

      setFeedback(feedbackText)

      // Generate NBA player comparison
      const { text: comparisonText } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          Based on these basketball stats: ${JSON.stringify(recentBasketballStats)}
          
          Compare the player's style and performance to NBA players (current or all-time greats).
          Identify 2-3 NBA players with similar playing styles or statistical profiles.
          Explain the similarities and what the player can learn from these NBA stars.
          Keep your response under 250 words.
        `,
      })

      setComparison(comparisonText)
    } catch (error) {
      console.error("Error generating AI feedback:", error)
      setFeedback("Unable to generate AI feedback at this time. Please try again later.")
      setComparison("Unable to generate NBA player comparisons at this time.")
    } finally {
      setGenerating(false)
      setLoading(false)
    }
  }

  const handleRefreshAnalysis = () => {
    generateAIFeedback(basketballStats, strengthData)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshAnalysis}
          disabled={generating || basketballStats.length === 0}
        >
          {generating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Analysis
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="feedback">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feedback">Performance Feedback</TabsTrigger>
          <TabsTrigger value="comparison">NBA Player Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              {basketballStats.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No data available for AI analysis yet. Start tracking your stats to receive personalized feedback!
                  </p>
                </div>
              ) : (
                <div className="prose max-w-none dark:prose-invert">
                  <p className="whitespace-pre-line">{feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              {basketballStats.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No data available for NBA player comparisons yet. Start tracking your stats!
                  </p>
                </div>
              ) : (
                <div className="prose max-w-none dark:prose-invert">
                  <p className="whitespace-pre-line">{comparison}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
