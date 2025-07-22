"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCurrentUser, findUserByName, type User } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, UserIcon, Settings, LogOut, Eye } from "lucide-react"
import Link from "next/link"
import BasketballStatsForm from "@/components/basketball-stats-form"
import FootballStatsForm from "@/components/football-stats-form"
import SoccerStatsForm from "@/components/soccer-stats-form"
import StrengthTrainingForm from "@/components/strength-training-form"
import ProgressCharts from "@/components/progress-charts"
import AIFeedback from "@/components/ai-feedback"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [viewUser, setViewUser] = useState<User | null>(null)
  const [isViewMode, setIsViewMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const viewParam = searchParams.get("view")

    if (viewParam) {
      // View mode - showing someone else's stats
      const foundUser = findUserByName(viewParam)
      if (foundUser) {
        setViewUser(foundUser)
        setIsViewMode(true)
      } else {
        router.push("/login")
        return
      }
    } else {
      // Normal mode - user's own dashboard
      const currentUser = getCurrentUser()
      if (!currentUser) {
        router.push("/login")
        return
      }
      setUser(currentUser)
    }

    setLoading(false)
  }, [router, searchParams])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const displayUser = isViewMode ? viewUser : user
  if (!displayUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">User not found</p>
          <Link href="/login">
            <Button className="mt-4">Back to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case "basketball":
        return "🏀"
      case "football":
        return "🏈"
      case "soccer":
        return "⚽"
      default:
        return "🏃"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SportsPro Tracker</span>
            </Link>

            <div className="flex items-center space-x-4">
              {isViewMode && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>View Mode</span>
                </Badge>
              )}

              {!isViewMode && (
                <>
                  <Link href="/dashboard/profile">
                    <Button variant="ghost" size="sm">
                      <UserIcon className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings">
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}

              {isViewMode && (
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login to Edit
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isViewMode ? `${displayUser.name}'s Stats` : `Welcome back, ${displayUser.name}!`}
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <span>{getSportIcon(displayUser.sport)}</span>
                  <span className="capitalize">{displayUser.sport}</span>
                </Badge>
                {displayUser.position && <Badge variant="secondary">{displayUser.position}</Badge>}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Add Stats</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Training sessions logged</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Sessions this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Day streak</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Goals</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Active goals</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest training sessions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                  <p className="text-sm">Start by adding your first training session!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {isViewMode ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-gray-500">
                    <p>You can only view stats in this mode.</p>
                    <Link href="/login">
                      <Button className="mt-4">Login to Add Stats</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue={displayUser.sport} className="space-y-6">
                <TabsList>
                  <TabsTrigger value="basketball">🏀 Basketball</TabsTrigger>
                  <TabsTrigger value="football">🏈 Football</TabsTrigger>
                  <TabsTrigger value="soccer">⚽ Soccer</TabsTrigger>
                  <TabsTrigger value="strength">💪 Strength</TabsTrigger>
                </TabsList>

                <TabsContent value="basketball">
                  <BasketballStatsForm userId={displayUser.name} />
                </TabsContent>

                <TabsContent value="football">
                  <FootballStatsForm userId={displayUser.name} />
                </TabsContent>

                <TabsContent value="soccer">
                  <SoccerStatsForm userId={displayUser.name} />
                </TabsContent>

                <TabsContent value="strength">
                  <StrengthTrainingForm userId={displayUser.name} />
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>

          <TabsContent value="progress">
            <ProgressCharts userId={displayUser.name} sport={displayUser.sport} />
          </TabsContent>

          <TabsContent value="insights">
            <AIFeedback userId={displayUser.name} sport={displayUser.sport} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
