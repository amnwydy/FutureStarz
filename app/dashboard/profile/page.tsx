"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { getCurrentUser, updateUser } from "@/lib/auth"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    sport: "basketball" as "basketball" | "football" | "soccer",
    position: "",
    pin: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setFormData({
      name: currentUser.name,
      sport: currentUser.sport,
      position: currentUser.position || "",
      pin: currentUser.pin,
    })
    setIsLoading(false)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        sport: formData.sport,
        position: formData.position,
        pin: formData.pin,
      }

      updateUser(updatedUser)
      setUser(updatedUser)

      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }

    setIsSaving(false)
  }

  const getPositions = (sport: string) => {
    switch (sport) {
      case "basketball":
        return ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"]
      case "football":
        return [
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
        ]
      case "soccer":
        return ["Goalkeeper", "Defender", "Midfielder", "Forward", "Winger", "Striker"]
      default:
        return []
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Update your profile information and preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your name, sport, and position</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sport">Sport</Label>
                  <Select
                    value={formData.sport}
                    onValueChange={(value: "basketball" | "football" | "soccer") =>
                      setFormData((prev) => ({ ...prev, sport: value, position: "" }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="soccer">Soccer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position (Optional)</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, position: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your position" />
                    </SelectTrigger>
                    <SelectContent>
                      {getPositions(formData.sport).map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pin">PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    value={formData.pin}
                    onChange={(e) => setFormData((prev) => ({ ...prev, pin: e.target.value.slice(0, 4) }))}
                    placeholder="4-digit PIN"
                    maxLength={4}
                    required
                  />
                  <p className="text-sm text-gray-500">Your PIN is used to protect your data from unauthorized edits</p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details and membership info</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Member Since</span>
                  <span className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Account Type</span>
                  <span className="text-green-600 font-medium">Free Forever</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Data Storage</span>
                  <span className="text-gray-600">Local Browser Storage</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
