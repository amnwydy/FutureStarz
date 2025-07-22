"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trophy, UserPlus } from "lucide-react"
import { registerUser } from "@/lib/auth"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [sport, setSport] = useState<"basketball" | "football" | "soccer" | "">("")
  const [position, setPosition] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

    if (!name.trim() || !pin.trim() || !confirmPin.trim() || !sport) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError("PIN must be exactly 4 digits")
      setLoading(false)
      return
    }

    if (pin !== confirmPin) {
      setError("PINs do not match")
      setLoading(false)
      return
    }

    try {
      const user = registerUser(name.trim(), pin, sport, position || undefined)
      if (user) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Sports Tracker</h1>
          </div>
          <p className="text-muted-foreground">Create your account and start tracking your athletic journey.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Create Account</span>
            </CardTitle>
            <CardDescription>Set up your profile to get started with personalized tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  autoComplete="name"
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
                  <Label htmlFor="position">Position (Optional)</Label>
                  <Select value={position} onValueChange={setPosition} disabled={loading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions[sport].map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="pin">4-Digit PIN *</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Create a 4-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={4}
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPin">Confirm PIN *</Label>
                <Input
                  id="confirmPin"
                  type="password"
                  placeholder="Confirm your 4-digit PIN"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  maxLength={4}
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
