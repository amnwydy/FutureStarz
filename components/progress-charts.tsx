"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { getBasketballStats, getFootballStats, getSoccerStats, getStrengthStats } from "@/lib/data"

interface ProgressChartsProps {
  userName: string
  sport: "basketball" | "football" | "soccer"
  showStrength?: boolean
  showAll?: boolean
}

export function ProgressCharts({ userName, sport, showStrength = false, showAll = false }: ProgressChartsProps) {
  const [sportData, setSportData] = useState<any[]>([])
  const [strengthData, setStrengthData] = useState<any[]>([])

  useEffect(() => {
    // Load sport-specific data
    let data: any[] = []
    switch (sport) {
      case "basketball":
        data = getBasketballStats(userName)
        break
      case "football":
        data = getFootballStats(userName)
        break
      case "soccer":
        data = getSoccerStats(userName)
        break
    }
    setSportData(data.slice(-10)) // Last 10 entries

    // Load strength data
    const strength = getStrengthStats(userName)
    setStrengthData(strength.slice(-10)) // Last 10 entries
  }, [userName, sport])

  const getSportCharts = () => {
    if (sportData.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>No Data Yet</CardTitle>
            <CardDescription>Start logging your {sport} stats to see progress charts</CardDescription>
          </CardHeader>
        </Card>
      )
    }

    switch (sport) {
      case "basketball":
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Shooting Performance</CardTitle>
                <CardDescription>Field goal and 3-point percentages over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    fieldGoalPct: {
                      label: "Field Goal %",
                      color: "hsl(var(--chart-1))",
                    },
                    threePointPct: {
                      label: "3-Point %",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sportData.map((stat) => ({
                        date: new Date(stat.date).toLocaleDateString(),
                        fieldGoalPct:
                          stat.fieldGoalsAttempted > 0 ? (stat.fieldGoalsMade / stat.fieldGoalsAttempted) * 100 : 0,
                        threePointPct:
                          stat.threePointersAttempted > 0
                            ? (stat.threePointersMade / stat.threePointersAttempted) * 100
                            : 0,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="fieldGoalPct"
                        stroke="var(--color-fieldGoalPct)"
                        name="Field Goal %"
                      />
                      <Line
                        type="monotone"
                        dataKey="threePointPct"
                        stroke="var(--color-threePointPct)"
                        name="3-Point %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Game Stats</CardTitle>
                <CardDescription>Points, rebounds, and assists per game</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    points: {
                      label: "Points",
                      color: "hsl(var(--chart-1))",
                    },
                    rebounds: {
                      label: "Rebounds",
                      color: "hsl(var(--chart-2))",
                    },
                    assists: {
                      label: "Assists",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sportData.map((stat) => ({
                        date: new Date(stat.date).toLocaleDateString(),
                        points: stat.points,
                        rebounds: stat.rebounds,
                        assists: stat.assists,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="points" fill="var(--color-points)" name="Points" />
                      <Bar dataKey="rebounds" fill="var(--color-rebounds)" name="Rebounds" />
                      <Bar dataKey="assists" fill="var(--color-assists)" name="Assists" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )

      case "football":
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Passing Performance</CardTitle>
                <CardDescription>Passing yards and completion percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    passingYards: {
                      label: "Passing Yards",
                      color: "hsl(var(--chart-1))",
                    },
                    completionPct: {
                      label: "Completion %",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sportData.map((stat) => ({
                        date: new Date(stat.date).toLocaleDateString(),
                        passingYards: stat.passingYards,
                        completionPct: stat.attempts > 0 ? (stat.completions / stat.attempts) * 100 : 0,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="passingYards"
                        stroke="var(--color-passingYards)"
                        name="Passing Yards"
                      />
                      <Line
                        type="monotone"
                        dataKey="completionPct"
                        stroke="var(--color-completionPct)"
                        name="Completion %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offensive Stats</CardTitle>
                <CardDescription>Rushing yards and touchdowns</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rushingYards: {
                      label: "Rushing Yards",
                      color: "hsl(var(--chart-1))",
                    },
                    totalTouchdowns: {
                      label: "Total TDs",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sportData.map((stat) => ({
                        date: new Date(stat.date).toLocaleDateString(),
                        rushingYards: stat.rushingYards,
                        totalTouchdowns: stat.passingTouchdowns + stat.rushingTouchdowns,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="rushingYards" fill="var(--color-rushingYards)" name="Rushing Yards" />
                      <Bar dataKey="totalTouchdowns" fill="var(--color-totalTouchdowns)" name="Total TDs" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )

      case "soccer":
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Offensive Performance</CardTitle>
                <CardDescription>Goals, assists, and shot accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    goals: {
                      label: "Goals",
                      color: "hsl(var(--chart-1))",
                    },
                    assists: {
                      label: "Assists",
                      color: "hsl(var(--chart-2))",
                    },
                    shotAccuracy: {
                      label: "Shot Accuracy %",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sportData.map((stat) => ({
                        date: new Date(stat.date).toLocaleDateString(),
                        goals: stat.goals,
                        assists: stat.assists,
                        shotAccuracy: stat.shots > 0 ? (stat.shotsOnTarget / stat.shots) * 100 : 0,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="goals" stroke="var(--color-goals)" name="Goals" />
                      <Line type="monotone" dataKey="assists" stroke="var(--color-assists)" name="Assists" />
                      <Line
                        type="monotone"
                        dataKey="shotAccuracy"
                        stroke="var(--color-shotAccuracy)"
                        name="Shot Accuracy %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Passing & Defense</CardTitle>
                <CardDescription>Pass accuracy and defensive contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    passAccuracy: {
                      label: "Pass Accuracy %",
                      color: "hsl(var(--chart-1))",
                    },
                    tackles: {
                      label: "Tackles",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sportData.map((stat) => ({
                        date: new Date(stat.date).toLocaleDateString(),
                        passAccuracy: stat.passes > 0 ? (stat.passesCompleted / stat.passes) * 100 : 0,
                        tackles: stat.tackles,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="passAccuracy" fill="var(--color-passAccuracy)" name="Pass Accuracy %" />
                      <Bar dataKey="tackles" fill="var(--color-tackles)" name="Tackles" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )

      default:
        return null
    }
  }

  const getStrengthCharts = () => {
    if (strengthData.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>No Strength Data Yet</CardTitle>
            <CardDescription>Start logging your workouts to see strength progress</CardDescription>
          </CardHeader>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Strength Progress</CardTitle>
          <CardDescription>Your lifting progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              benchPress: {
                label: "Bench Press",
                color: "hsl(var(--chart-1))",
              },
              squat: {
                label: "Squat",
                color: "hsl(var(--chart-2))",
              },
              deadlift: {
                label: "Deadlift",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={strengthData.map((stat) => ({
                  date: new Date(stat.date).toLocaleDateString(),
                  benchPress: stat.benchPress,
                  squat: stat.squat,
                  deadlift: stat.deadlift,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="benchPress" stroke="var(--color-benchPress)" name="Bench Press" />
                <Line type="monotone" dataKey="squat" stroke="var(--color-squat)" name="Squat" />
                <Line type="monotone" dataKey="deadlift" stroke="var(--color-deadlift)" name="Deadlift" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }

  if (showAll) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6">
          {getSportCharts()}
          {getStrengthCharts()}
        </div>
      </div>
    )
  }

  if (showStrength) {
    return getStrengthCharts()
  }

  return <div className="space-y-6">{getSportCharts()}</div>
}
