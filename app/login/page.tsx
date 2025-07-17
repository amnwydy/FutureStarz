"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, ArrowLeft } from "lucide-react"
import { authenticateUser, createUser, userExists, getAllUsers } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  const [pin, setPin] = useState("")
  const [sport, setSport] = useState<"basketball" | "football" | "soccer">("basketball")
  const [position, setPosition] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    const sportParam = searchParams.get("sport")
    if (sportParam && ["basketball", "football", "soccer"].includes(sportParam)) {
      setSport(sportParam as "basketball" | "football" | "soccer")
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!name.trim() || pin.length !== 4) {
      setError("Please enter your name and 4-digit PIN")
      setIsLoading(false)
      return
    }

    const user = authenticateUser(name.trim(), pin)
    if (user) {
      router.push("/dashboard")
    } else {
      setError("Invalid name or PIN")
    }
    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!name.trim() || pin.length !== 4) {
      setError("Please enter your name and 4-digit PIN")
      setIsLoading(false)
      return
    }

    if (userExists(name.trim())) {
      setError("Name already exists. Please choose a different name or login.")
      setIsLoading(false)
      return
    }

    try {
      createUser(name.trim(), pin, sport, position)
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to create account")
    }
    setIsLoading(false)
  }

  const handleSearch = () => {
    if (!searchName.trim()) {
      setSearchResults([])
      return
    }

    const users = getAllUsers()
    const results = users.filter((user) => user.name.toLowerCase().includes(searchName.toLowerCase()))
    setSearchResults(results)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl">Future Starz</span>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Enter your name and PIN to access your stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-name">Name</Label>
                      <Input
                        id="login-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-pin">PIN</Label>
                      <Input
                        id="login-pin"
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.slice(0, 4))}
                        placeholder="4-digit PIN"
                        maxLength={4}
                        required
                      />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Choose your sport and create your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-sport">Sport</Label>
                      <Select
                        value={sport}
                        onValueChange={(value: "basketball" | "football" | "soccer") => setSport(value)}
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
                      <Label htmlFor="signup-position">Position (Optional)</Label>
                      <Select value={position} onValueChange={setPosition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your position" />
                        </SelectTrigger>
                        <SelectContent>
                          {getPositions(sport).map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {pos}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-pin">Create PIN</Label>
                      <Input
                        id="signup-pin"
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.slice(0, 4))}
                        placeholder="4-digit PIN"
                        maxLength={4}
                        required
                      />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search">
              <Card>
                <CardHeader>
                  <CardTitle>Search Athletes</CardTitle>
                  <CardDescription>Search for athletes to view their public stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Search by name..."
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <Button onClick={handleSearch}>Search</Button>
                    </div>

                    {searchResults.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">Results:</h3>
                        {searchResults.map((user, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              {user.sport} {user.position && `• ${user.position}`}
                            </div>
                            <div className="text-xs text-gray-400">
                              Member since {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchName && searchResults.length === 0 && (
                      <div className="text-gray-500 text-center py-4">No athletes found with that name</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
