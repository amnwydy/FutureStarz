"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { saveStrengthTraining } from "@/lib/data"
import { verifyPin } from "@/lib/auth"

interface StrengthTrainingFormProps {
  userId: string
}

export default function StrengthTrainingForm({ userId }: StrengthTrainingFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPinPrompt, setShowPinPrompt] = useState(false)
  const [pin, setPin] = useState("")

  const [formData, setFormData] = useState({
    weight: "",
    benchPress: "",
    squat: "",
    deadlift: "",
    workoutNotes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowPinPrompt(true)
  }

  const handlePinSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const isValidPin = await verifyPin(userId, pin)
      if (!isValidPin) {
        throw new Error("Incorrect PIN")
      }

      await saveStrengthTraining({
        userId,
        date: new Date().toISOString(),
        weight: Number.parseFloat(formData.weight) || 0,
        benchPress: Number.parseInt(formData.benchPress) || 0,
        squat: Number.parseInt(formData.squat) || 0,
        deadlift: Number.parseInt(formData.deadlift) || 0,
        workoutNotes: formData.workoutNotes,
      })

      setSuccess("Strength training data saved successfully!")
      setFormData({
        weight: "",
        benchPress: "",
        squat: "",
        deadlift: "",
        workoutNotes: "",
      })
      setShowPinPrompt(false)
      setPin("")
    } catch (error: any) {
      setError(error.message || "Failed to save training data")
    } finally {
      setLoading(false)
    }
  }

  if (showPinPrompt) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">Enter PIN to Save</h3>
          <p className="text-sm text-gray-500">Enter your 4-digit PIN to save your training data</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="pin">PIN</Label>
          <Input
            id="pin"
            type="password"
            placeholder="Enter your PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
            pattern="[0-9]{4}"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handlePinSubmit} disabled={loading || pin.length !== 4}>
            {loading ? "Saving..." : "Save Training Data"}
          </Button>
          <Button variant="outline" onClick={() => setShowPinPrompt(false)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Body Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="180"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bench-press">Bench Press (lbs)</Label>
            <Input
              id="bench-press"
              type="number"
              placeholder="225"
              value={formData.benchPress}
              onChange={(e) => handleInputChange("benchPress", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="squat">Squat (lbs)</Label>
            <Input
              id="squat"
              type="number"
              placeholder="315"
              value={formData.squat}
              onChange={(e) => handleInputChange("squat", e.target.value)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadlift">Deadlift (lbs)</Label>
            <Input
              id="deadlift"
              type="number"
              placeholder="405"
              value={formData.deadlift}
              onChange={(e) => handleInputChange("deadlift", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workout-notes">Workout Notes</Label>
          <Textarea
            id="workout-notes"
            placeholder="How did the workout feel? Any observations..."
            value={formData.workoutNotes}
            onChange={(e) => handleInputChange("workoutNotes", e.target.value)}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full">
          Save Training Data
        </Button>
      </form>
    </div>
  )
}
