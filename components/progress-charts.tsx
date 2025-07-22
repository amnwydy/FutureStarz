"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import { getStats } from "@/lib/data"
import { getCurrentUser } from "@/lib/auth"
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react"

export default function ProgressCharts() {
  const user = getCurrentUser()
  const basketballStats = getStats("basketball")
  const footballStats = getStats("football")
  const soccerStats = getStats("soccer")
  const strengthStats = getStats("strength")

  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">Please log in to view your progress charts.</p>
        </CardContent>
      </Card>
    )
  }

  // Process basketball data for charts
  const basketballChartData = basketballStats.slice(-10).map((stat: any, index) => ({
    game: `Game ${index + 1}`,
    points: stat.points || 0,
    assists: stat.assists || 0,
    rebounds: stat.rebounds || 0,
    fieldGoalPercentage: stat.fieldGoalsAttempted > 0 ? (stat.fieldGoalsMade / stat.fieldGoalsAttempted) * 100 : 0,
    date: new Date(stat.date).toLocaleDateString(),
  }))

  // Process football data for charts
  const footballChartData = footballStats.slice(-10).map((stat: any, index) => ({
    game: `Game ${index + 1}`,
    passingYards: stat.passingYards || 0,
    rushingYards: stat.rushingYards || 0,
    receivingYards: stat.receivingYards || 0,
    tackles: stat.tackles || 0,
    date: new Date(stat.date).toLocaleDateString(),
  }))

  // Process soccer data for charts
  const soccerChartData = soccerStats.slice(-10).map((stat: any, index) => ({
    match: `Match ${index + 1}`,
    goals: stat.goals || 0,
    assists: stat.assists || 0,
    passes: stat.passes || 0,
    passAccuracy: stat.passes > 0 ? (stat.passesCompleted / stat.passes) * 100 : 0,
    date: new Date(stat.date).toLocaleDateString(),
  }))

  // Process strength training data for charts
  const strengthChartData = strengthStats.slice(-10).map((stat: any, index) => ({
    workout: `Workout ${index + 1}`,
    totalVolume: stat.totalVolume || 0,
    duration: stat.duration || 0,
    caloriesBurned: stat.caloriesBurned || 0,
    date: new Date(stat.date).toLocaleDateString(),
  }))

  const getLatestStat = (stats: any[], field: string) => {
    if (stats.length === 0) return 0
    return stats[stats.length - 1][field] || 0
  }

  const getAverageStat = (stats: any[], field: string) => {
    if (stats.length === 0) return 0
    const sum = stats.reduce((acc, stat) => acc + (stat[field] || 0), 0)
    return (sum / stats.length).toFixed(1)
  }

  const getTrend = (stats: any[], field: string) => {
    if (stats.length < 2) return "neutral"
    const recent = stats.slice(-3).reduce((acc, stat) => acc + (stat[field] || 0), 0) / 3
    const previous = stats.slice(-6, -3).reduce((acc, stat) => acc + (stat[field] || 0), 0) / 3
    return recent > previous ? "up" : recent < previous ? "down" : "neutral"
  }

  const StatCard = ({ title, value, trend, icon: Icon }: any) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
            {trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
            {trend === "neutral" && <Activity className="h-4 w-4 text-gray-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Progress Charts</h2>
          <p className="text-muted-foreground">Track your performance over time</p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Target className="h-3 w-3" />
          <span>{user.sport.charAt(0).toUpperCase() + user.sport.slice(1)}</span>
        </Badge>
      </div>

      <Tabs defaultValue={user.sport} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basketball">🏀 Basketball</TabsTrigger>
          <TabsTrigger value="football">🏈 Football</TabsTrigger>
          <TabsTrigger value="soccer">⚽ Soccer</TabsTrigger>
          <TabsTrigger value="strength">💪 Strength</TabsTrigger>
        </TabsList>

        <TabsContent value="basketball" className="space-y-4">
          {basketballStats.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">No basketball stats recorded yet.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Latest Points"
                  value={getLatestStat(basketballStats, "points")}
                  trend={getTrend(basketballStats, "points")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Points"
                  value={getAverageStat(basketballStats, "points")}
                  trend={getTrend(basketballStats, "points")}
                  icon={Activity}
                />
                <StatCard
                  title="Latest Assists"
                  value={getLatestStat(basketballStats, "assists")}
                  trend={getTrend(basketballStats, "assists")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Rebounds"
                  value={getAverageStat(basketballStats, "rebounds")}
                  trend={getTrend(basketballStats, "rebounds")}
                  icon={Activity}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Scoring Trend</CardTitle>
                    <CardDescription>Points, Assists, and Rebounds over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        points: { label: "Points", color: "hsl(var(--chart-1))" },
                        assists: { label: "Assists", color: "hsl(var(--chart-2))" },
                        rebounds: { label: "Rebounds", color: "hsl(var(--chart-3))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={basketballChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="game" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="points" stroke="var(--color-points)" strokeWidth={2} />
                          <Line type="monotone" dataKey="assists" stroke="var(--color-assists)" strokeWidth={2} />
                          <Line type="monotone" dataKey="rebounds" stroke="var(--color-rebounds)" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shooting Accuracy</CardTitle>
                    <CardDescription>Field Goal Percentage over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        fieldGoalPercentage: { label: "FG%", color: "hsl(var(--chart-4))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={basketballChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="game" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="fieldGoalPercentage"
                            stroke="var(--color-fieldGoalPercentage)"
                            fill="var(--color-fieldGoalPercentage)"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="football" className="space-y-4">
          {footballStats.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">No football stats recorded yet.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Latest Passing Yds"
                  value={getLatestStat(footballStats, "passingYards")}
                  trend={getTrend(footballStats, "passingYards")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Rushing Yds"
                  value={getAverageStat(footballStats, "rushingYards")}
                  trend={getTrend(footballStats, "rushingYards")}
                  icon={Activity}
                />
                <StatCard
                  title="Latest Tackles"
                  value={getLatestStat(footballStats, "tackles")}
                  trend={getTrend(footballStats, "tackles")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Receiving Yds"
                  value={getAverageStat(footballStats, "receivingYards")}
                  trend={getTrend(footballStats, "receivingYards")}
                  icon={Activity}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Offensive Performance</CardTitle>
                  <CardDescription>Passing, Rushing, and Receiving Yards</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      passingYards: { label: "Passing Yards", color: "hsl(var(--chart-1))" },
                      rushingYards: { label: "Rushing Yards", color: "hsl(var(--chart-2))" },
                      receivingYards: { label: "Receiving Yards", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={footballChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="game" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="passingYards" fill="var(--color-passingYards)" />
                        <Bar dataKey="rushingYards" fill="var(--color-rushingYards)" />
                        <Bar dataKey="receivingYards" fill="var(--color-receivingYards)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="soccer" className="space-y-4">
          {soccerStats.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">No soccer stats recorded yet.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Latest Goals"
                  value={getLatestStat(soccerStats, "goals")}
                  trend={getTrend(soccerStats, "goals")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Assists"
                  value={getAverageStat(soccerStats, "assists")}
                  trend={getTrend(soccerStats, "assists")}
                  icon={Activity}
                />
                <StatCard
                  title="Latest Passes"
                  value={getLatestStat(soccerStats, "passes")}
                  trend={getTrend(soccerStats, "passes")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Pass Accuracy"
                  value={`${getAverageStat(soccerStats, "passAccuracy")}%`}
                  trend={getTrend(soccerStats, "passAccuracy")}
                  icon={Activity}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Attacking Performance</CardTitle>
                    <CardDescription>Goals and Assists over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        goals: { label: "Goals", color: "hsl(var(--chart-1))" },
                        assists: { label: "Assists", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={soccerChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="match" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="goals" stroke="var(--color-goals)" strokeWidth={2} />
                          <Line type="monotone" dataKey="assists" stroke="var(--color-assists)" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pass Accuracy</CardTitle>
                    <CardDescription>Passing accuracy percentage over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        passAccuracy: { label: "Pass Accuracy %", color: "hsl(var(--chart-3))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={soccerChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="match" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="passAccuracy"
                            stroke="var(--color-passAccuracy)"
                            fill="var(--color-passAccuracy)"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="strength" className="space-y-4">
          {strengthStats.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">No strength training stats recorded yet.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Latest Volume"
                  value={`${getLatestStat(strengthStats, "totalVolume")} lbs`}
                  trend={getTrend(strengthStats, "totalVolume")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Duration"
                  value={`${getAverageStat(strengthStats, "duration")} min`}
                  trend={getTrend(strengthStats, "duration")}
                  icon={Activity}
                />
                <StatCard
                  title="Latest Calories"
                  value={getLatestStat(strengthStats, "caloriesBurned")}
                  trend={getTrend(strengthStats, "caloriesBurned")}
                  icon={Target}
                />
                <StatCard
                  title="Avg Volume"
                  value={`${getAverageStat(strengthStats, "totalVolume")} lbs`}
                  trend={getTrend(strengthStats, "totalVolume")}
                  icon={Activity}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                  <CardDescription>Total Volume and Calories Burned over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      totalVolume: { label: "Total Volume (lbs)", color: "hsl(var(--chart-1))" },
                      caloriesBurned: { label: "Calories Burned", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={strengthChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="workout" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="totalVolume" stroke="var(--color-totalVolume)" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="caloriesBurned"
                          stroke="var(--color-caloriesBurned)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
