"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { saveStrengthTraining } from "@/lib/data"

interface StrengthTrainingFormProps {
  userId: string
}

export default function StrengthTrainingForm({ userId }: StrengthTrainingFormProps) {
  const [loading, setLoading] = useState(false)
  const [weight, setWeight] = useState("")
  const [benchPress, setBenchPress] = useState("")
  const [squat, setSquat] = useState("")
  const [deadlift, setDeadlift] = useState("")
  const [workoutNotes, setWorkoutNotes] = useState("")

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveStrengthTraining({
        userId,
        date: new Date().toISOString(),
        weight: Number.parseFloat(weight),
        benchPress: Number.parseInt(benchPress),
        squat: Number.parseInt(squat),
        deadlift: Number.parseInt(deadlift),
        workoutNotes,
      })

      toast({
        title: "Workout saved",
        description: "Your strength training data has been recorded successfully.",
      })

      // Reset form
      setWorkoutNotes("")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save workout data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="weight">Weight (lbs)</Label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          placeholder="0.0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bench-press">Bench Press (lbs)</Label>
          <Input
            id="bench-press"
            type="number"
            placeholder="0"
            value={benchPress}
            onChange={(e) => setBenchPress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="squat">Squat (lbs)</Label>
          <Input id="squat" type="number" placeholder="0" value={squat} onChange={(e) => setSquat(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadlift">Deadlift (lbs)</Label>
          <Input
            id="deadlift"
            type="number"
            placeholder="0"
            value={deadlift}
            onChange={(e) => setDeadlift(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workout-notes">Workout Notes</Label>
        <Textarea
          id="workout-notes"
          placeholder="Enter details about your workout..."
          value={workoutNotes}
          onChange={(e) => setWorkoutNotes(e.target.value)}
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Strength Training"
        )}
      </Button>
    </form>
  )
}
