"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addSoccerStat } from "@/lib/data"
import { toast } from "@/hooks/use-toast"

interface SoccerStatsFormProps {
  userName: string
}

export function SoccerStatsForm({ userName }: SoccerStatsFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    goals: "",
    assists: "",
    shots: "",
    shotsOnTarget: "",
    passes: "",
    passesCompleted: "",
    tackles: "",
    saves: "",
    sprintSpeed: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const stat = {
      date: formData.date,
      goals: Number(formData.goals) || 0,
      assists: Number(formData.assists) || 0,
      shots: Number(formData.shots) || 0,
      shotsOnTarget: Number(formData.shotsOnTarget) || 0,
      passes: Number(formData.passes) || 0,
      passesCompleted: Number(formData.passesCompleted) || 0,
      tackles: Number(formData.tackles) || 0,
      saves: Number(formData.saves) || 0,
      sprintSpeed: Number(formData.sprintSpeed) || 0,
    }

    addSoccerStat(userName, stat)

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      goals: "",
      assists: "",
      shots: "",
      shotsOnTarget: "",
      passes: "",
      passesCompleted: "",
      tackles: "",
      saves: "",
      sprintSpeed: "",
    })

    toast({
      title: "Stats Added!",
      description: "Your soccer stats have been recorded.",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soccer Stats</CardTitle>
        <CardDescription>Record your game or practice performance</CardDescription>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goals">Goals</Label>
              <Input
                id="goals"
                type="number"
                min="0"
                value={formData.goals}
                onChange={(e) => handleChange("goals", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assists">Assists</Label>
              <Input
                id="assists"
                type="number"
                min="0"
                value={formData.assists}
                onChange={(e) => handleChange("assists", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shots">Shots</Label>
              <Input
                id="shots"
                type="number"
                min="0"
                value={formData.shots}
                onChange={(e) => handleChange("shots", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shotsOnTarget">Shots on Target</Label>
              <Input
                id="shotsOnTarget"
                type="number"
                min="0"
                value={formData.shotsOnTarget}
                onChange={(e) => handleChange("shotsOnTarget", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passes">Passes</Label>
              <Input
                id="passes"
                type="number"
                min="0"
                value={formData.passes}
                onChange={(e) => handleChange("passes", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passesCompleted">Passes Completed</Label>
              <Input
                id="passesCompleted"
                type="number"
                min="0"
                value={formData.passesCompleted}
                onChange={(e) => handleChange("passesCompleted", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tackles">Tackles</Label>
              <Input
                id="tackles"
                type="number"
                min="0"
                value={formData.tackles}
                onChange={(e) => handleChange("tackles", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saves">Saves (Goalkeepers)</Label>
              <Input
                id="saves"
                type="number"
                min="0"
                value={formData.saves}
                onChange={(e) => handleChange("saves", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sprintSpeed">Sprint Speed (mph)</Label>
            <Input
              id="sprintSpeed"
              type="number"
              min="0"
              step="0.1"
              value={formData.sprintSpeed}
              onChange={(e) => handleChange("sprintSpeed", e.target.value)}
              placeholder="0.0"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Soccer Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
