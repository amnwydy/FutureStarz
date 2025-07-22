"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart3, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { loginUser, findUserByName } from "@/lib/auth"

export default function LoginPage() {
  const [name, setName] = useState("")
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (viewMode) {
        // View-only mode - just check if user exists
        const user = findUserByName(name)
        if (user) {
          router.push(`/dashboard?view=${encodeURIComponent(name)}`)
        } else {
          setError("User not found")
        }
      } else {
        // Full login mode
        if (!pin || pin.length !== 4) {
          setError("PIN must be exactly 4 digits")
          return
        }

        const user = loginUser(name, pin)
        if (user) {
          router.push("/dashboard")
        } else {
          setError("Invalid name or PIN")
        }
      }
    } catch (err) {
      setError("Login failed. Please try again.")
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
            <CardTitle className="text-2xl text-center">{viewMode ? "View Stats" : "Welcome Back"}</CardTitle>
            <CardDescription className="text-center">
              {viewMode ? "Enter a name to view their public stats" : "Enter your credentials to access your dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {!viewMode && (
                <div className="space-y-2">
                  <Label htmlFor="pin">4-Digit PIN</Label>
                  <div className="relative">
                    <Input
                      id="pin"
                      type={showPin ? "text" : "password"}
                      placeholder="Enter your PIN"
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
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || !name || (!viewMode && pin.length !== 4)}>
                {isLoading ? "Loading..." : viewMode ? "View Stats" : "Login"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setViewMode(!viewMode)
                  setError("")
                  setPin("")
                }}
              >
                {viewMode ? "Login to Edit" : "Just View Stats"}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link href="/signup" className="text-sm text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
