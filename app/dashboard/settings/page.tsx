"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { getCurrentUser } from "@/lib/auth"
import { exportData, importData } from "@/lib/data"
import { DashboardHeader } from "@/components/dashboard-header"
import { Settings, Download, Upload, Trash2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [user, setUser] = useState(getCurrentUser())
  const [importText, setImportText] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
  }, [router])

  const handleExportData = () => {
    try {
      const data = exportData()
      if (data) {
        const blob = new Blob([data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `sports-tracker-data-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success("Data exported successfully!")
      }
    } catch (error) {
      toast.error("Failed to export data")
    }
  }

  const handleImportData = () => {
    if (!importText.trim()) {
      toast.error("Please paste your data first")
      return
    }

    setLoading(true)
    try {
      const success = importData(importText)
      if (success) {
        toast.success("Data imported successfully!")
        setImportText("")
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        toast.error("Failed to import data. Please check the format.")
      }
    } catch (error) {
      toast.error("Invalid data format")
    } finally {
      setLoading(false)
    }
  }

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      if (window.confirm("This will permanently delete all your stats and progress. Are you absolutely sure?")) {
        localStorage.removeItem("basketballStats")
        localStorage.removeItem("footballStats")
        localStorage.removeItem("soccerStats")
        localStorage.removeItem("strengthStats")
        toast.success("All data cleared successfully")
      }
    }
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This will remove all your data permanently.")) {
      if (
        window.confirm("This action cannot be undone. Type 'DELETE' to confirm:") &&
        window.prompt("Type 'DELETE' to confirm:") === "DELETE"
      ) {
        // Clear all data
        localStorage.clear()
        toast.success("Account deleted successfully")
        router.push("/")
      }
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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
            <Settings className="h-8 w-8" />
            <span>Settings</span>
          </h1>
          <p className="text-muted-foreground">Manage your account settings and data preferences.</p>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
              <CardDescription>Export, import, or manage your sports tracking data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Export Data */}
              <div>
                <h3 className="font-semibold mb-2">Export Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download all your stats and progress as a JSON file for backup or transfer.
                </p>
                <Button onClick={handleExportData} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
              </div>

              <Separator />

              {/* Import Data */}
              <div>
                <h3 className="font-semibold mb-2">Import Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Import previously exported data to restore your stats and progress.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="importData">Paste your exported data here:</Label>
                    <Textarea
                      id="importData"
                      placeholder="Paste your JSON data here..."
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                  <Button onClick={handleImportData} disabled={loading || !importText.trim()}>
                    <Upload className="h-4 w-4 mr-2" />
                    {loading ? "Importing..." : "Import Data"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Account Actions</span>
              </CardTitle>
              <CardDescription>Manage your account and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Clear Data */}
              <div>
                <h3 className="font-semibold mb-2 text-orange-600">Clear All Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Remove all your stats and progress data. Your account will remain active.
                </p>
                <Button
                  onClick={handleClearAllData}
                  variant="outline"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>

              <Separator />

              {/* Delete Account */}
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Warning: This will permanently delete your account and all your data. This action cannot be undone.
                  </AlertDescription>
                </Alert>
                <Button onClick={handleDeleteAccount} variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* App Information */}
          <Card>
            <CardHeader>
              <CardTitle>About Sports Tracker</CardTitle>
              <CardDescription>Application information and version details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Version:</strong> 1.0.0
                </p>
                <p>
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>
                <p>
                  <strong>Data Storage:</strong> Local Browser Storage
                </p>
                <p>
                  <strong>Features:</strong> Multi-sport tracking, AI feedback, Progress charts, Data export/import
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
