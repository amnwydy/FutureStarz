"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, BarChart3, Target, TrendingUp, Award } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      router.push("/dashboard")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">SportsPro Tracker</h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => router.push("/login")}>
                Sign In
              </Button>
              <Button onClick={() => router.push("/login")}>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Track Your Athletic Journey</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional-grade sports analytics for basketball, football, and soccer. Track performance, analyze
            progress, and achieve your athletic goals with AI-powered insights.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Goal Setting
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Analytics
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress Tracking
            </Badge>
          </div>
          <Button size="lg" onClick={() => router.push("/login")} className="px-8 py-4 text-lg">
            Start Tracking Now
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h3>
            <p className="text-lg text-gray-600">Comprehensive tools for serious athletes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Multi-Sport Support</CardTitle>
                <CardDescription>
                  Track basketball, football, and soccer with sport-specific metrics and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Basketball: FG%, 3P%, rebounds, assists</li>
                  <li>• Football: Passing yards, touchdowns, tackles</li>
                  <li>• Soccer: Goals, assists, pass accuracy</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>AI-Powered Analysis</CardTitle>
                <CardDescription>
                  Get personalized insights and recommendations based on your performance data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Performance trend analysis</li>
                  <li>• Personalized training suggestions</li>
                  <li>• Goal-oriented recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Strength Training</CardTitle>
                <CardDescription>Track your gym progress with comprehensive strength training metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Bench press, squat, deadlift tracking</li>
                  <li>• Body weight monitoring</li>
                  <li>• Workout notes and progress</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Game?</h3>
          <p className="text-xl text-blue-100 mb-8">Join thousands of athletes already tracking their progress</p>
          <Button size="lg" variant="secondary" onClick={() => router.push("/login")} className="px-8 py-4 text-lg">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Activity className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">SportsPro Tracker</span>
          </div>
          <p className="text-center text-gray-400 mt-4">© 2024 SportsPro Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
