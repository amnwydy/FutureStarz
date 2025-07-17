"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, User, Trophy } from "lucide-react"
import { authenticateUser, registerUser, userExists, getCurrentUser } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Login form state
  const [loginName, setLoginName] = useState("")
  const [loginPin, setLoginPin] = useState("")

  // Signup form state
  const [signupName, setSignupName] = useState("")
  const [signupPin, setSignupPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [sport, setSport] = useState<"basketball" | "football" | "soccer">("basketball")
  const [position, setPosition] = useState("")

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      router.push("/dashboard")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!loginName.trim() || !loginPin.trim()) {
      setError("Please enter both name and PIN")
      setIsLoading(false)
      return
    }

    if (loginPin.length !== 4 || !/^\d{4}$/.test(loginPin)) {
      setError("PIN must be exactly 4 digits")
      setIsLoading(false)
      return
    }

    try {
      const user = authenticateUser(loginName.trim(), loginPin)
      if (user) {
        router.push("/dashboard")
      } else {
        setError("Invalid name or PIN")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    }

    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (!signupName.trim() || !signupPin.trim() || !confirmPin.trim()) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (signupPin.length !== 4 || !/^\d{4}$/.test(signupPin)) {
      setError("PIN must be exactly 4 digits")
      setIsLoading(false)
      return
    }

    if (signupPin !== confirmPin) {
      setError("PINs do not match")
      setIsLoading(false)
      return
    }

    if (userExists(signupName.trim())) {
      setError("Name already taken. Please choose a different name.")
      setIsLoading(false)
      return
    }

    try {
      const user = registerUser(signupName.trim(), signupPin, sport, position.trim() || undefined)
      setSuccess("Account created successfully! Redirecting...")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err) {
      setError("Failed to create account. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-10 w-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">SportsPro</h1>
          </div>
          <p className="text-gray-600">Track your athletic journey</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Welcome Back
                </CardTitle>
                <CardDescription>Enter your name and PIN to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-name">Name</Label>
                    <Input
                      id="login-name"
                      type="text"
                      placeholder="Enter your name"
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-pin">PIN</Label>
                    <Input
                      id="login-pin"
                      type="password"
                      placeholder="Enter 4-digit PIN"
                      maxLength={4}
                      value={loginPin}
                      onChange={(e) => setLoginPin(e.target.value.replace(/\D/g, ""))}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Create Account
                </CardTitle>
                <CardDescription>Set up your athletic tracking profile</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name *</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sport">Primary Sport *</Label>
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
                    <Label htmlFor="position">Position (Optional)</Label>
                    <Input
                      id="position"
                      type="text"
                      placeholder="e.g., Point Guard, Quarterback, Midfielder"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-pin">Create PIN *</Label>
                    <Input
                      id="signup-pin"
                      type="password"
                      placeholder="Create 4-digit PIN"
                      maxLength={4}
                      value={signupPin}
                      onChange={(e) => setSignupPin(e.target.value.replace(/\D/g, ""))}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-pin">Confirm PIN *</Label>
                    <Input
                      id="confirm-pin"
                      type="password"
                      placeholder="Confirm 4-digit PIN"
                      maxLength={4}
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert>
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
