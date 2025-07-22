"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCurrentUser, updateUser } from "@/lib/auth"
import { getStats } from "@/lib/data"
import { DashboardHeader } from "@/components/dashboard-header"
import { User, Trophy, Calendar, Target, Activity } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const [user, setUser] = useState(getCurrentUser())
  const [name, setName] = useState("")
  const [sport, setSport] = useState<"basketball" | "football" | "soccer" | "">("basketball") // Updated default value
  const [position, setPosition] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setName(currentUser.name)
    setSport(currentUser.sport || "basketball") // Updated default value
    setPosition(currentUser.position || "")
  }, [router])

  const positions = {
    basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
    football: [
      "Quarterback",
      "Running Back",
      "Wide Receiver",
      "Tight End",
      "Offensive Line",
      "Defensive Line",
      "Linebacker",
      "Cornerback",
      "Safety",
      "Kicker",
      "Punter",
    ],
    soccer: [
      "Goalkeeper",
      "Center Back",
      "Left Back",
      "Right Back",
      "Defensive Midfielder",
      "Central Midfielder",
      "Attacking Midfielder",
      "Left Winger",
      "Right Winger",
      "Striker",
      "Center Forward",
    ],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!name.trim() || !sport) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const updatedUser = updateUser({
        name: name.trim(),
        sport,
        position: position || undefined,
      })

      if (updatedUser) {
        setUser(updatedUser)
        toast.success("Profile updated successfully!")
      } else {
        setError("Failed to update profile")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const basketballStats = getStats("basketball")
  const footballStats = getStats("football")
  const soccerStats = getStats("soccer")
  const strengthStats = getStats("strength")

  const getProfileStats = () => {
    const totalGames = basketballStats.length + footballStats.length + soccerStats.length
    const totalWorkouts = strengthStats.length
    const memberSince = new Date(user.createdAt).toLocaleDateString()

    return {
      totalGames,
      totalWorkouts,
      memberSince,
    }
  }

  const stats = getProfileStats()

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
            <User className="h-8 w-8" />
            <span>Profile Settings</span>
          </h1>
          <p className="text-muted-foreground">Manage your account information and preferences.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Profile Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <Badge variant="secondary">
                      {user.sport === "basketball" && "🏀"}
                      {user.sport === "football" && "🏈"}
                      {user.sport === "soccer" && "⚽"}
                      {user.sport.charAt(0).toUpperCase() + user.sport.slice(1)}
                    </Badge>
                    {user.position && <Badge variant="outline">{user.position}</Badge>}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Games</span>
                    </div>
                    <span className="font-semibold">{stats.totalGames}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Workouts</span>
                    </div>
                    <span className="font-semibold">{stats.totalWorkouts}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Member Since</span>
                    </div>
                    <span className="font-semibold">{stats.memberSince}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information and sport preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sport">Primary Sport *</Label>
                    <Select value={sport} onValueChange={(value: any) => setSport(value)} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basketball">🏀 Basketball</SelectItem>
                        <SelectItem value="football">🏈 Football</SelectItem>
                        <SelectItem value="soccer">⚽ Soccer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {sport && (
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Select value={position} onValueChange={setPosition} disabled={loading}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No position selected</SelectItem> {/* Updated value prop */}
                          {positions[sport].map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {pos}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
