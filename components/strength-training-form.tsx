"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { saveStats } from "@/lib/data"
import { toast } from "sonner"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight: number
  restTime: number // in seconds
  notes: string
}

interface StrengthTrainingStats {
  date: Date
  workoutType: string
  duration: number // in minutes
  exercises: Exercise[]
  totalVolume: number
  averageHeartRate: number
  maxHeartRate: number
  caloriesBurned: number
  notes: string
}

export default function StrengthTrainingForm() {
  const [date, setDate] = useState<Date>(new Date())
  const [stats, setStats] = useState<StrengthTrainingStats>({
    date: new Date(),
    workoutType: "",
    duration: 0,
    exercises: [],
    totalVolume: 0,
    averageHeartRate: 0,
    maxHeartRate: 0,
    caloriesBurned: 0,
    notes: "",
  })

  const updateStat = (key: keyof StrengthTrainingStats, value: any) => {
    setStats((prev) => ({ ...prev, [key]: value }))
  }

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      sets: 0,
      reps: 0,
      weight: 0,
      restTime: 60,
      notes: "",
    }
    setStats((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }))
  }

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setStats((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise) => (exercise.id === id ? { ...exercise, [field]: value } : exercise)),
    }))
  }

  const removeExercise = (id: string) => {
    setStats((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((exercise) => exercise.id !== id),
    }))
  }

  const calculateTotalVolume = () => {
    return stats.exercises.reduce((total, exercise) => {
      return total + exercise.sets * exercise.reps * exercise.weight
    }, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const totalVolume = calculateTotalVolume()
    const statsWithDate = { ...stats, date, totalVolume }
    saveStats("strength", statsWithDate)
    toast.success("Strength training stats saved successfully!")

    // Reset form
    setStats({
      date: new Date(),
      workoutType: "",
      duration: 0,
      exercises: [],
      totalVolume: 0,
      averageHeartRate: 0,
      maxHeartRate: 0,
      caloriesBurned: 0,
      notes: "",
    })
    setDate(new Date())
  }

  const workoutTypes = [
    "Upper Body",
    "Lower Body",
    "Full Body",
    "Push",
    "Pull",
    "Legs",
    "Chest & Triceps",
    "Back & Biceps",
    "Shoulders",
    "Core",
    "Cardio",
    "HIIT",
  ]

  const commonExercises = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Overhead Press",
    "Pull-ups",
    "Rows",
    "Dips",
    "Lunges",
    "Bicep Curls",
    "Tricep Extensions",
    "Lat Pulldowns",
    "Leg Press",
    "Shoulder Press",
    "Planks",
    "Push-ups",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>💪</span>
          <span>Strength Training</span>
        </CardTitle>
        <CardDescription>Track your strength training workouts and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Workout Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Workout Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Workout Type</Label>
              <Select value={stats.workoutType} onValueChange={(value) => updateStat("workoutType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  {workoutTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Workout Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Duration (minutes)</Label>
              <Input
                type="number"
                value={stats.duration}
                onChange={(e) => updateStat("duration", Number.parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Avg Heart Rate</Label>
              <Input
                type="number"
                value={stats.averageHeartRate}
                onChange={(e) => updateStat("averageHeartRate", Number.parseInt(e.target.value) || 0)}
                min="0"
                max="220"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Max Heart Rate</Label>
              <Input
                type="number"
                value={stats.maxHeartRate}
                onChange={(e) => updateStat("maxHeartRate", Number.parseInt(e.target.value) || 0)}
                min="0"
                max="220"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Calories Burned</Label>
              <Input
                type="number"
                value={stats.caloriesBurned}
                onChange={(e) => updateStat("caloriesBurned", Number.parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>

          {/* Exercises */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Exercises</h3>
              <Button type="button" onClick={addExercise} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>

            {stats.exercises.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No exercises added yet. Click "Add Exercise" to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {stats.exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Exercise {index + 1}</h4>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeExercise(exercise.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Exercise Name</Label>
                        <Select
                          value={exercise.name}
                          onValueChange={(value) => updateExercise(exercise.id, "name", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select exercise" />
                          </SelectTrigger>
                          <SelectContent>
                            {commonExercises.map((exerciseName) => (
                              <SelectItem key={exerciseName} value={exerciseName}>
                                {exerciseName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Sets</Label>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, "sets", Number.parseInt(e.target.value) || 0)}
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Reps</Label>
                        <Input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, "reps", Number.parseInt(e.target.value) || 0)}
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Weight (lbs)</Label>
                        <Input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => updateExercise(exercise.id, "weight", Number.parseInt(e.target.value) || 0)}
                          min="0"
                          step="5"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Rest Time (seconds)</Label>
                        <Input
                          type="number"
                          value={exercise.restTime}
                          onChange={(e) =>
                            updateExercise(exercise.id, "restTime", Number.parseInt(e.target.value) || 0)
                          }
                          min="0"
                          step="15"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2 lg:col-span-1">
                        <Label className="text-sm font-medium">Volume (lbs)</Label>
                        <div className="px-3 py-2 bg-muted rounded-md text-center text-sm">
                          {exercise.sets * exercise.reps * exercise.weight}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label className="text-sm font-medium">Exercise Notes</Label>
                      <Textarea
                        placeholder="Notes about form, difficulty, etc..."
                        value={exercise.notes}
                        onChange={(e) => updateExercise(exercise.id, "notes", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {stats.exercises.length > 0 && (
              <div className="text-sm text-muted-foreground">Total Volume: {calculateTotalVolume()} lbs</div>
            )}
          </div>

          {/* Workout Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Workout Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your workout, how you felt, areas for improvement..."
              value={stats.notes}
              onChange={(e) => updateStat("notes", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Strength Training Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
