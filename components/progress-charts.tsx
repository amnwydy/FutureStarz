"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { getBasketballStats, getStrengthTraining } from "@/lib/data"
import { Chart, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface ProgressChartsProps {
  userId: string
}

export default function ProgressCharts({ userId }: ProgressChartsProps) {
  const [loading, setLoading] = useState(true)
  const [basketballStats, setBasketballStats] = useState<any[]>([])
  const [strengthData, setStrengthData] = useState<any[]>([])

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
      } catch (error) {
        console.error("Error fetching progress data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Prepare data for charts
  const prepareShootingData = () => {
    return basketballStats
      .slice()
      .reverse()
      .map((stat) => ({
        date: formatDate(stat.date),
        "Field Goal %": stat.fieldGoalPercentage,
        "Three Point %": stat.threePointPercentage,
        "Free Throw %": stat.freeThrowPercentage,
      }))
  }

  const prepareStatsData = () => {
    return basketballStats
      .slice()
      .reverse()
      .map((stat) => ({
        date: formatDate(stat.date),
        Points: stat.points,
        Rebounds: stat.rebounds,
        Assists: stat.assists,
      }))
  }

  const prepareStrengthData = () => {
    return strengthData
      .slice()
      .reverse()
      .map((workout) => ({
        date: formatDate(workout.date),
        "Bench Press": workout.benchPress,
        Squat: workout.squat,
        Deadlift: workout.deadlift,
      }))
  }

  const shootingData = prepareShootingData()
  const statsData = prepareStatsData()
  const strengthChartData = prepareStrengthData()

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basketball">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basketball">Basketball Stats</TabsTrigger>
          <TabsTrigger value="strength">Strength Training</TabsTrigger>
        </TabsList>

        <TabsContent value="basketball" className="space-y-4 pt-4">
          {basketballStats.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No basketball stats recorded yet. Start tracking to see your progress!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                        <th className="px-4 py-2 text-left font-medium">FG%</th>
                        <th className="px-4 py-2 text-left font-medium">3P%</th>
                        <th className="px-4 py-2 text-left font-medium">FT%</th>
                        <th className="px-4 py-2 text-left font-medium">PTS</th>
                        <th className="px-4 py-2 text-left font-medium">REB</th>
                        <th className="px-4 py-2 text-left font-medium">AST</th>
                        <th className="px-4 py-2 text-left font-medium">Vertical</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basketballStats.map((stat, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{formatDate(stat.date)}</td>
                          <td className="px-4 py-2">{stat.fieldGoalPercentage}%</td>
                          <td className="px-4 py-2">{stat.threePointPercentage}%</td>
                          <td className="px-4 py-2">{stat.freeThrowPercentage}%</td>
                          <td className="px-4 py-2">{stat.points}</td>
                          <td className="px-4 py-2">{stat.rebounds}</td>
                          <td className="px-4 py-2">{stat.assists}</td>
                          <td className="px-4 py-2">{stat.verticalJump}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-sm font-medium mb-2">Shooting Percentages</h3>
                    <div className="h-[250px]">
                      <ChartContainer>
                        <Chart>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={shootingData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip content={<ChartTooltip />} />
                              <Legend />
                              <Line type="monotone" dataKey="Field Goal %" stroke="#8884d8" activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="Three Point %" stroke="#82ca9d" />
                              <Line type="monotone" dataKey="Free Throw %" stroke="#ffc658" />
                            </LineChart>
                          </ResponsiveContainer>
                        </Chart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-sm font-medium mb-2">Points & Stats</h3>
                    <div className="h-[250px]">
                      <ChartContainer>
                        <Chart>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={statsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip content={<ChartTooltip />} />
                              <Legend />
                              <Line type="monotone" dataKey="Points" stroke="#8884d8" activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="Rebounds" stroke="#82ca9d" />
                              <Line type="monotone" dataKey="Assists" stroke="#ffc658" />
                            </LineChart>
                          </ResponsiveContainer>
                        </Chart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="strength" className="space-y-4 pt-4">
          {strengthData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No strength training data recorded yet. Start tracking to see your progress!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                        <th className="px-4 py-2 text-left font-medium">Weight</th>
                        <th className="px-4 py-2 text-left font-medium">Bench Press</th>
                        <th className="px-4 py-2 text-left font-medium">Squat</th>
                        <th className="px-4 py-2 text-left font-medium">Deadlift</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strengthData.map((workout, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{formatDate(workout.date)}</td>
                          <td className="px-4 py-2">{workout.weight} lbs</td>
                          <td className="px-4 py-2">{workout.benchPress} lbs</td>
                          <td className="px-4 py-2">{workout.squat} lbs</td>
                          <td className="px-4 py-2">{workout.deadlift} lbs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-sm font-medium mb-2">Strength Progress</h3>
                  <div className="h-[250px]">
                    <ChartContainer>
                      <Chart>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={strengthChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip content={<ChartTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="Bench Press" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Squat" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Deadlift" stroke="#ffc658" />
                          </LineChart>
                        </ResponsiveContainer>
                      </Chart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
