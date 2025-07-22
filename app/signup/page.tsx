"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart3, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { registerUser } from "@/lib/auth"

const basketballPositions = ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"]
const footballPositions = [
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
const soccerPositions = ["Goalkeeper", "Defender", "Midfielder", "Forward"]

export default function SignupPage() {
  const [name, setName] = useState("")
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [sport, setSport] = useState<"basketball" | "football" | "soccer" | "">("")
  const [position, setPosition] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const getPositions = () => {
    switch (sport) {
      case "basketball":
        return basketballPositions
      case "football":
        return footballPositions
      case "soccer":
        return soccerPositions
      default:
        return []
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!name.trim()) {
        setError("Name is required")
        return
      }

      if (pin.length !== 4) {
        setError("PIN must be exactly 4 digits")
        return
      }

      if (pin !== confirmPin) {
        setError("PINs do not match")
        return
      }

      if (!sport) {
        setError("Please select a sport")
        return
      }

      const user = registerUser(name.trim(), pin, sport, position || undefined)
      if (user) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SportsPro Tracker</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Start tracking your athletic performance today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sport">Primary Sport</Label>
                <Select
                  value={sport}
                  onValueChange={(value: "basketball" | "football" | "soccer") => {
                    setSport(value)
                    setPosition("")
                  }}
                >
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
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your position" />
                    </SelectTrigger>
                    <SelectContent>
                      {getPositions().map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="pin">Create 4-Digit PIN</Label>
                <div className="relative">
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="Create your PIN"
                    value={pin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                      setPin(value)
                    }}
                    maxLength={4}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPin">Confirm PIN</Label>
                <div className="relative">
                  <Input
                    id="confirmPin"
                    type={showConfirmPin ? "text" : "password"}
                    placeholder="Confirm your PIN"
                    value={confirmPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                      setConfirmPin(value)
                    }}
                    maxLength={4}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                  >
                    {showConfirmPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !name || !sport || pin.length !== 4 || confirmPin.length !== 4}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
