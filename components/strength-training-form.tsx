"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addStrengthStat } from "@/lib/data"
import { toast } from "@/hooks/use-toast"

interface StrengthTrainingFormProps {
  userName: string
}

export function StrengthTrainingForm({ userName }: StrengthTrainingFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    bodyWeight: "",
    benchPress: "",
    squat: "",
    deadlift: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const stat = {
      date: formData.date,
      bodyWeight: Number(formData.bodyWeight) || 0,
      benchPress: Number(formData.benchPress) || 0,
      squat: Number(formData.squat) || 0,
      deadlift: Number(formData.deadlift) || 0,
      notes: formData.notes,
    }

    addStrengthStat(userName, stat)

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      bodyWeight: "",
      benchPress: "",
      squat: "",
      deadlift: "",
      notes: "",
    })

    toast({
      title: "Workout Logged!",
      description: "Your strength training session has been recorded.",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strength Training</CardTitle>
        <CardDescription>Log your gym workout and strength gains</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodyWeight">Body Weight (lbs)</Label>
            <Input
              id="bodyWeight"
              type="number"
              min="0"
              step="0.1"
              value={formData.bodyWeight}
              onChange={(e) => handleChange("bodyWeight", e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="benchPress">Bench Press (lbs)</Label>
              <Input
                id="benchPress"
                type="number"
                min="0"
                step="5"
                value={formData.benchPress}
                onChange={(e) => handleChange("benchPress", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="squat">Squat (lbs)</Label>
              <Input
                id="squat"
                type="number"
                min="0"
                step="5"
                value={formData.squat}
                onChange={(e) => handleChange("squat", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadlift">Deadlift (lbs)</Label>
              <Input
                id="deadlift"
                type="number"
                min="0"
                step="5"
                value={formData.deadlift}
                onChange={(e) => handleChange("deadlift", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Workout Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="How did the workout feel? Any PRs or notes..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Log Workout
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
