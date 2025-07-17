"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addFootballStat } from "@/lib/data"
import { toast } from "@/hooks/use-toast"

interface FootballStatsFormProps {
  userName: string
}

export function FootballStatsForm({ userName }: FootballStatsFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    passingYards: "",
    passingTouchdowns: "",
    completions: "",
    attempts: "",
    rushingYards: "",
    rushingTouchdowns: "",
    tackles: "",
    sacks: "",
    interceptions: "",
    fortyYardDash: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const stat = {
      date: formData.date,
      passingYards: Number(formData.passingYards) || 0,
      passingTouchdowns: Number(formData.passingTouchdowns) || 0,
      completions: Number(formData.completions) || 0,
      attempts: Number(formData.attempts) || 0,
      rushingYards: Number(formData.rushingYards) || 0,
      rushingTouchdowns: Number(formData.rushingTouchdowns) || 0,
      tackles: Number(formData.tackles) || 0,
      sacks: Number(formData.sacks) || 0,
      interceptions: Number(formData.interceptions) || 0,
      fortyYardDash: Number(formData.fortyYardDash) || 0,
    }

    addFootballStat(userName, stat)

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      passingYards: "",
      passingTouchdowns: "",
      completions: "",
      attempts: "",
      rushingYards: "",
      rushingTouchdowns: "",
      tackles: "",
      sacks: "",
      interceptions: "",
      fortyYardDash: "",
    })

    toast({
      title: "Stats Added!",
      description: "Your football stats have been recorded.",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Football Stats</CardTitle>
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
              <Label htmlFor="passingYards">Passing Yards</Label>
              <Input
                id="passingYards"
                type="number"
                min="0"
                value={formData.passingYards}
                onChange={(e) => handleChange("passingYards", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passingTouchdowns">Passing TDs</Label>
              <Input
                id="passingTouchdowns"
                type="number"
                min="0"
                value={formData.passingTouchdowns}
                onChange={(e) => handleChange("passingTouchdowns", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="completions">Completions</Label>
              <Input
                id="completions"
                type="number"
                min="0"
                value={formData.completions}
                onChange={(e) => handleChange("completions", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attempts">Attempts</Label>
              <Input
                id="attempts"
                type="number"
                min="0"
                value={formData.attempts}
                onChange={(e) => handleChange("attempts", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rushingYards">Rushing Yards</Label>
              <Input
                id="rushingYards"
                type="number"
                min="0"
                value={formData.rushingYards}
                onChange={(e) => handleChange("rushingYards", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rushingTouchdowns">Rushing TDs</Label>
              <Input
                id="rushingTouchdowns"
                type="number"
                min="0"
                value={formData.rushingTouchdowns}
                onChange={(e) => handleChange("rushingTouchdowns", e.target.value)}
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
              <Label htmlFor="sacks">Sacks</Label>
              <Input
                id="sacks"
                type="number"
                min="0"
                step="0.5"
                value={formData.sacks}
                onChange={(e) => handleChange("sacks", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interceptions">Interceptions</Label>
              <Input
                id="interceptions"
                type="number"
                min="0"
                value={formData.interceptions}
                onChange={(e) => handleChange("interceptions", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fortyYardDash">40-Yard Dash (seconds)</Label>
              <Input
                id="fortyYardDash"
                type="number"
                min="0"
                step="0.01"
                value={formData.fortyYardDash}
                onChange={(e) => handleChange("fortyYardDash", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Football Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
