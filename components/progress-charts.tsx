"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBasketballStats, getStrengthTraining } from "@/lib/data"

interface ProgressChartsProps {
  userId: string
}

export default function ProgressCharts({ userId }: ProgressChartsProps) {
  const [basketballData, setBasketballData] = useState<any[]>([])
  const [strengthData, setStrengthData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [basketball, strength] = await Promise.all([getBasketballStats(userId), getStrengthTraining(userId)])

        // Format data for charts
        const formattedBasketball = basketball
          .map((stat, index) => ({
            session: `Session ${basketball.length - index}`,
            date: new Date(stat.date).toLocaleDateString(),
            fieldGoal: stat.fieldGoalPercentage,
            threePoint: stat.threePointPercentage,
            freeThrow: stat.freeThrowPercentage,
            points: stat.points,
            rebounds: stat.rebounds,
            assists: stat.assists,
            verticalJump: stat.verticalJump,
          }))
          .reverse()

        const formattedStrength = strength
          .map((training, index) => ({
            session: `Session ${strength.length - index}`,
            date: new Date(training.date).toLocaleDateString(),
            weight: training.weight,
            benchPress: training.benchPress,
            squat: training.squat,
            deadlift: training.deadlift,
          }))
          .reverse()

        setBasketballData(formattedBasketball)
        setStrengthData(formattedStrength)
      } catch (error) {
        console.error("Error loading chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [userId])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <Tabs defaultValue="basketball" className="space-y-4">
      <TabsList>
        <TabsTrigger value="basketball">Basketball Stats</TabsTrigger>
        <TabsTrigger value="strength">Strength Training</TabsTrigger>
      </TabsList>

      <TabsContent value="basketball" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shooting Percentages</CardTitle>
              <CardDescription>Track your shooting accuracy over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={basketballData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="session" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="fieldGoal" stroke="#8884d8" name="Field Goal %" />
                  <Line type="monotone" dataKey="threePoint" stroke="#82ca9d" name="3-Point %" />
                  <Line type="monotone" dataKey="freeThrow" stroke="#ffc658" name="Free Throw %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Game Stats</CardTitle>
              <CardDescription>Points, rebounds, and assists progression</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={basketballData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="session" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="points" fill="#8884d8" name="Points" />
                  <Bar dataKey="rebounds" fill="#82ca9d" name="Rebounds" />
                  <Bar dataKey="assists" fill="#ffc658" name="Assists" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {basketballData.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No basketball stats recorded yet. Start tracking your performance!</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="strength" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Strength Progress</CardTitle>
            <CardDescription>Track your lifting progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={strengthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="benchPress" stroke="#8884d8" name="Bench Press (lbs)" />
                <Line type="monotone" dataKey="squat" stroke="#82ca9d" name="Squat (lbs)" />
                <Line type="monotone" dataKey="deadlift" stroke="#ffc658" name="Deadlift (lbs)" />
                <Line type="monotone" dataKey="weight" stroke="#ff7300" name="Body Weight (lbs)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {strengthData.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No strength training data recorded yet. Start logging your workouts!</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}
