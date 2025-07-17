"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { getCurrentUser, logout } from "@/lib/auth"
import { exportUserData } from "@/lib/data"
import { Download, Trash2, Shield, Sun } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setIsLoading(false)

    // Load theme preference
    const theme = localStorage.getItem("theme")
    setDarkMode(theme === "dark")
  }, [router])

  const handleExportData = () => {
    if (!user) return

    try {
      const data = exportUserData(user.name)
      const blob = new Blob([data], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${user.name}_sports_data_${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Data Exported!",
        description: "Your data has been downloaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleClearData = () => {
    if (!user) return

    const confirmed = window.confirm("Are you sure you want to clear all your data? This action cannot be undone.")

    if (confirmed) {
      // Clear all user data
      localStorage.removeItem(`basketballStats_${user.name.toLowerCase()}`)
      localStorage.removeItem(`footballStats_${user.name.toLowerCase()}`)
      localStorage.removeItem(`soccerStats_${user.name.toLowerCase()}`)
      localStorage.removeItem(`strengthStats_${user.name.toLowerCase()}`)

      toast({
        title: "Data Cleared",
        description: "All your sports data has been cleared.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    }
  }

  const handleDeleteAccount = () => {
    if (!user) return

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This will remove all your data and cannot be undone.",
    )

    if (confirmed) {
      // Clear all data
      localStorage.removeItem(`basketballStats_${user.name.toLowerCase()}`)
      localStorage.removeItem(`footballStats_${user.name.toLowerCase()}`)
      localStorage.removeItem(`soccerStats_${user.name.toLowerCase()}`)
      localStorage.removeItem(`strengthStats_${user.name.toLowerCase()}`)

      // Remove user from users list
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.filter((u: any) => u.name.toLowerCase() !== user.name.toLowerCase())
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      // Logout and redirect
      logout()
      router.push("/")

      toast({
        title: "Account Deleted",
        description: "Your account and all data have been permanently deleted.",
      })
    }
  }

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled)
    localStorage.setItem("theme", enabled ? "dark" : "light")

    if (enabled) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    toast({
      title: enabled ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: `Switched to ${enabled ? "dark" : "light"} theme.`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading settings...</p>
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
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your app preferences and data</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how the app looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                  </div>
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Export, backup, or clear your sports data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Export Data</Label>
                    <p className="text-sm text-gray-500">Download all your sports data as a JSON file</p>
                  </div>
                  <Button onClick={handleExportData} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Clear All Data</Label>
                    <p className="text-sm text-gray-500">Remove all your sports statistics (keeps account)</p>
                  </div>
                  <Button onClick={handleClearData} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Your data privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Data Storage</Label>
                  <p className="text-sm text-gray-500">
                    All your data is stored locally in your browser. No data is sent to external servers.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>PIN Protection</Label>
                  <p className="text-sm text-gray-500">
                    Your 4-digit PIN protects your data from unauthorized edits. Only you can modify your stats.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Public Visibility</Label>
                  <p className="text-sm text-gray-500">
                    Other users can search for your name and view your stats (read-only), but cannot edit them without
                    your PIN.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions that will permanently delete your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-red-600">Delete Account</Label>
                    <p className="text-sm text-gray-500">Permanently delete your account and all associated data</p>
                  </div>
                  <Button onClick={handleDeleteAccount} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
