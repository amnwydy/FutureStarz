"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Minus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { saveStats } from "@/lib/data"
import { toast } from "sonner"

interface BasketballStats {
  date: Date
  points: number
  assists: number
  rebounds: number
  steals: number
  blocks: number
  turnovers: number
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  threePointersMade: number
  threePointersAttempted: number
  freeThrowsMade: number
  freeThrowsAttempted: number
  minutesPlayed: number
  notes: string
}

export default function BasketballStatsForm() {
  const [date, setDate] = useState<Date>(new Date())
  const [stats, setStats] = useState<BasketballStats>({
    date: new Date(),
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fieldGoalsMade: 0,
    fieldGoalsAttempted: 0,
    threePointersMade: 0,
    threePointersAttempted: 0,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    minutesPlayed: 0,
    notes: "",
  })

  const updateStat = (key: keyof BasketballStats, value: number | string | Date) => {
    setStats((prev) => ({ ...prev, [key]: value }))
  }

  const incrementStat = (key: keyof BasketballStats) => {
    if (typeof stats[key] === "number") {
      setStats((prev) => ({ ...prev, [key]: (prev[key] as number) + 1 }))
    }
  }

  const decrementStat = (key: keyof BasketballStats) => {
    if (typeof stats[key] === "number" && (stats[key] as number) > 0) {
      setStats((prev) => ({ ...prev, [key]: (prev[key] as number) - 1 }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const statsWithDate = { ...stats, date }
    saveStats("basketball", statsWithDate)
    toast.success("Basketball stats saved successfully!")

    // Reset form
    setStats({
      date: new Date(),
      points: 0,
      assists: 0,
      rebounds: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      threePointersMade: 0,
      threePointersAttempted: 0,
      freeThrowsMade: 0,
      freeThrowsAttempted: 0,
      minutesPlayed: 0,
      notes: "",
    })
    setDate(new Date())
  }

  const StatInput = ({
    label,
    value,
    onChange,
    statKey,
  }: {
    label: string
    value: number
    onChange: (value: number) => void
    statKey: keyof BasketballStats
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-2">
        <Button type="button" variant="outline" size="sm" onClick={() => decrementStat(statKey)} disabled={value <= 0}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number.parseInt(e.target.value) || 0)}
          className="w-20 text-center"
          min="0"
        />
        <Button type="button" variant="outline" size="sm" onClick={() => incrementStat(statKey)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const fieldGoalPercentage =
    stats.fieldGoalsAttempted > 0 ? ((stats.fieldGoalsMade / stats.fieldGoalsAttempted) * 100).toFixed(1) : "0.0"

  const threePointPercentage =
    stats.threePointersAttempted > 0
      ? ((stats.threePointersMade / stats.threePointersAttempted) * 100).toFixed(1)
      : "0.0"

  const freeThrowPercentage =
    stats.freeThrowsAttempted > 0 ? ((stats.freeThrowsMade / stats.freeThrowsAttempted) * 100).toFixed(1) : "0.0"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>🏀</span>
          <span>Basketball Stats</span>
        </CardTitle>
        <CardDescription>Track your basketball performance and game statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Game Date</Label>
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

          {/* Basic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatInput
              label="Points"
              value={stats.points}
              onChange={(value) => updateStat("points", value)}
              statKey="points"
            />
            <StatInput
              label="Assists"
              value={stats.assists}
              onChange={(value) => updateStat("assists", value)}
              statKey="assists"
            />
            <StatInput
              label="Rebounds"
              value={stats.rebounds}
              onChange={(value) => updateStat("rebounds", value)}
              statKey="rebounds"
            />
            <StatInput
              label="Steals"
              value={stats.steals}
              onChange={(value) => updateStat("steals", value)}
              statKey="steals"
            />
            <StatInput
              label="Blocks"
              value={stats.blocks}
              onChange={(value) => updateStat("blocks", value)}
              statKey="blocks"
            />
            <StatInput
              label="Turnovers"
              value={stats.turnovers}
              onChange={(value) => updateStat("turnovers", value)}
              statKey="turnovers"
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Minutes Played</Label>
              <Input
                type="number"
                value={stats.minutesPlayed}
                onChange={(e) => updateStat("minutesPlayed", Number.parseInt(e.target.value) || 0)}
                min="0"
                max="48"
              />
            </div>
          </div>

          {/* Shooting Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shooting Statistics</h3>

            {/* Field Goals */}
            <div className="grid grid-cols-3 gap-4 items-end">
              <StatInput
                label="Field Goals Made"
                value={stats.fieldGoalsMade}
                onChange={(value) => updateStat("fieldGoalsMade", value)}
                statKey="fieldGoalsMade"
              />
              <StatInput
                label="Field Goals Attempted"
                value={stats.fieldGoalsAttempted}
                onChange={(value) => updateStat("fieldGoalsAttempted", value)}
                statKey="fieldGoalsAttempted"
              />
              <div className="space-y-2">
                <Label className="text-sm font-medium">FG%</Label>
                <Badge variant="secondary" className="w-full justify-center">
                  {fieldGoalPercentage}%
                </Badge>
              </div>
            </div>

            {/* Three Pointers */}
            <div className="grid grid-cols-3 gap-4 items-end">
              <StatInput
                label="3-Pointers Made"
                value={stats.threePointersMade}
                onChange={(value) => updateStat("threePointersMade", value)}
                statKey="threePointersMade"
              />
              <StatInput
                label="3-Pointers Attempted"
                value={stats.threePointersAttempted}
                onChange={(value) => updateStat("threePointersAttempted", value)}
                statKey="threePointersAttempted"
              />
              <div className="space-y-2">
                <Label className="text-sm font-medium">3P%</Label>
                <Badge variant="secondary" className="w-full justify-center">
                  {threePointPercentage}%
                </Badge>
              </div>
            </div>

            {/* Free Throws */}
            <div className="grid grid-cols-3 gap-4 items-end">
              <StatInput
                label="Free Throws Made"
                value={stats.freeThrowsMade}
                onChange={(value) => updateStat("freeThrowsMade", value)}
                statKey="freeThrowsMade"
              />
              <StatInput
                label="Free Throws Attempted"
                value={stats.freeThrowsAttempted}
                onChange={(value) => updateStat("freeThrowsAttempted", value)}
                statKey="freeThrowsAttempted"
              />
              <div className="space-y-2">
                <Label className="text-sm font-medium">FT%</Label>
                <Badge variant="secondary" className="w-full justify-center">
                  {freeThrowPercentage}%
                </Badge>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Game Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your performance, what went well, areas for improvement..."
              value={stats.notes}
              onChange={(e) => updateStat("notes", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Basketball Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
