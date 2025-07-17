"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addBasketballStat } from "@/lib/data"
import { toast } from "@/hooks/use-toast"

interface BasketballStatsFormProps {
  userName: string
}

export function BasketballStatsForm({ userName }: BasketballStatsFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    fieldGoalsMade: "",
    fieldGoalsAttempted: "",
    threePointersMade: "",
    threePointersAttempted: "",
    freeThrowsMade: "",
    freeThrowsAttempted: "",
    points: "",
    rebounds: "",
    assists: "",
    steals: "",
    blocks: "",
    verticalJump: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const stat = {
      date: formData.date,
      fieldGoalsMade: Number(formData.fieldGoalsMade) || 0,
      fieldGoalsAttempted: Number(formData.fieldGoalsAttempted) || 0,
      threePointersMade: Number(formData.threePointersMade) || 0,
      threePointersAttempted: Number(formData.threePointersAttempted) || 0,
      freeThrowsMade: Number(formData.freeThrowsMade) || 0,
      freeThrowsAttempted: Number(formData.freeThrowsAttempted) || 0,
      points: Number(formData.points) || 0,
      rebounds: Number(formData.rebounds) || 0,
      assists: Number(formData.assists) || 0,
      steals: Number(formData.steals) || 0,
      blocks: Number(formData.blocks) || 0,
      verticalJump: Number(formData.verticalJump) || 0,
    }

    addBasketballStat(userName, stat)

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      fieldGoalsMade: "",
      fieldGoalsAttempted: "",
      threePointersMade: "",
      threePointersAttempted: "",
      freeThrowsMade: "",
      freeThrowsAttempted: "",
      points: "",
      rebounds: "",
      assists: "",
      steals: "",
      blocks: "",
      verticalJump: "",
    })

    toast({
      title: "Stats Added!",
      description: "Your basketball stats have been recorded.",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basketball Stats</CardTitle>
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
              <Label htmlFor="fieldGoalsMade">Field Goals Made</Label>
              <Input
                id="fieldGoalsMade"
                type="number"
                min="0"
                value={formData.fieldGoalsMade}
                onChange={(e) => handleChange("fieldGoalsMade", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldGoalsAttempted">Field Goals Attempted</Label>
              <Input
                id="fieldGoalsAttempted"
                type="number"
                min="0"
                value={formData.fieldGoalsAttempted}
                onChange={(e) => handleChange("fieldGoalsAttempted", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="threePointersMade">3-Pointers Made</Label>
              <Input
                id="threePointersMade"
                type="number"
                min="0"
                value={formData.threePointersMade}
                onChange={(e) => handleChange("threePointersMade", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threePointersAttempted">3-Pointers Attempted</Label>
              <Input
                id="threePointersAttempted"
                type="number"
                min="0"
                value={formData.threePointersAttempted}
                onChange={(e) => handleChange("threePointersAttempted", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freeThrowsMade">Free Throws Made</Label>
              <Input
                id="freeThrowsMade"
                type="number"
                min="0"
                value={formData.freeThrowsMade}
                onChange={(e) => handleChange("freeThrowsMade", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="freeThrowsAttempted">Free Throws Attempted</Label>
              <Input
                id="freeThrowsAttempted"
                type="number"
                min="0"
                value={formData.freeThrowsAttempted}
                onChange={(e) => handleChange("freeThrowsAttempted", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="0"
                value={formData.points}
                onChange={(e) => handleChange("points", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rebounds">Rebounds</Label>
              <Input
                id="rebounds"
                type="number"
                min="0"
                value={formData.rebounds}
                onChange={(e) => handleChange("rebounds", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="steals">Steals</Label>
              <Input
                id="steals"
                type="number"
                min="0"
                value={formData.steals}
                onChange={(e) => handleChange("steals", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="blocks">Blocks</Label>
              <Input
                id="blocks"
                type="number"
                min="0"
                value={formData.blocks}
                onChange={(e) => handleChange("blocks", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="verticalJump">Vertical Jump (inches)</Label>
              <Input
                id="verticalJump"
                type="number"
                min="0"
                step="0.1"
                value={formData.verticalJump}
                onChange={(e) => handleChange("verticalJump", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Basketball Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
