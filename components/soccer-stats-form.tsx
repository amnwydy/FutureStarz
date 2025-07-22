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
import { CalendarIcon, Plus, Minus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { saveStats } from "@/lib/data"
import { toast } from "sonner"

interface SoccerStats {
  date: Date
  position: string
  goals: number
  assists: number
  shots: number
  shotsOnTarget: number
  passes: number
  passesCompleted: number
  crosses: number
  crossesCompleted: number
  tackles: number
  interceptions: number
  clearances: number
  blocks: number
  fouls: number
  foulsSuffered: number
  yellowCards: number
  redCards: number
  saves: number // For goalkeepers
  goalsAgainst: number // For goalkeepers
  minutesPlayed: number
  distanceCovered: number // in km
  notes: string
}

export default function SoccerStatsForm() {
  const [date, setDate] = useState<Date>(new Date())
  const [stats, setStats] = useState<SoccerStats>({
    date: new Date(),
    position: "",
    goals: 0,
    assists: 0,
    shots: 0,
    shotsOnTarget: 0,
    passes: 0,
    passesCompleted: 0,
    crosses: 0,
    crossesCompleted: 0,
    tackles: 0,
    interceptions: 0,
    clearances: 0,
    blocks: 0,
    fouls: 0,
    foulsSuffered: 0,
    yellowCards: 0,
    redCards: 0,
    saves: 0,
    goalsAgainst: 0,
    minutesPlayed: 0,
    distanceCovered: 0,
    notes: "",
  })

  const updateStat = (key: keyof SoccerStats, value: number | string | Date) => {
    setStats((prev) => ({ ...prev, [key]: value }))
  }

  const incrementStat = (key: keyof SoccerStats) => {
    if (typeof stats[key] === "number") {
      setStats((prev) => ({ ...prev, [key]: (prev[key] as number) + 1 }))
    }
  }

  const decrementStat = (key: keyof SoccerStats) => {
    if (typeof stats[key] === "number" && (stats[key] as number) > 0) {
      setStats((prev) => ({ ...prev, [key]: (prev[key] as number) - 1 }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const statsWithDate = { ...stats, date }
    saveStats("soccer", statsWithDate)
    toast.success("Soccer stats saved successfully!")

    // Reset form
    setStats({
      date: new Date(),
      position: "",
      goals: 0,
      assists: 0,
      shots: 0,
      shotsOnTarget: 0,
      passes: 0,
      passesCompleted: 0,
      crosses: 0,
      crossesCompleted: 0,
      tackles: 0,
      interceptions: 0,
      clearances: 0,
      blocks: 0,
      fouls: 0,
      foulsSuffered: 0,
      yellowCards: 0,
      redCards: 0,
      saves: 0,
      goalsAgainst: 0,
      minutesPlayed: 0,
      distanceCovered: 0,
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
    statKey: keyof SoccerStats
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

  const positions = [
    "Goalkeeper",
    "Center Back",
    "Left Back",
    "Right Back",
    "Defensive Midfielder",
    "Central Midfielder",
    "Attacking Midfielder",
    "Left Winger",
    "Right Winger",
    "Striker",
    "Center Forward",
  ]

  const shotAccuracy = stats.shots > 0 ? ((stats.shotsOnTarget / stats.shots) * 100).toFixed(1) : "0.0"

  const passAccuracy = stats.passes > 0 ? ((stats.passesCompleted / stats.passes) * 100).toFixed(1) : "0.0"

  const crossAccuracy = stats.crosses > 0 ? ((stats.crossesCompleted / stats.crosses) * 100).toFixed(1) : "0.0"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>⚽</span>
          <span>Soccer Stats</span>
        </CardTitle>
        <CardDescription>Track your soccer performance and match statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Match Date</Label>
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
              <Label>Position</Label>
              <Select value={stats.position} onValueChange={(value) => updateStat("position", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Attacking Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Attacking Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatInput
                label="Goals"
                value={stats.goals}
                onChange={(value) => updateStat("goals", value)}
                statKey="goals"
              />
              <StatInput
                label="Assists"
                value={stats.assists}
                onChange={(value) => updateStat("assists", value)}
                statKey="assists"
              />
              <StatInput
                label="Shots"
                value={stats.shots}
                onChange={(value) => updateStat("shots", value)}
                statKey="shots"
              />
              <StatInput
                label="Shots on Target"
                value={stats.shotsOnTarget}
                onChange={(value) => updateStat("shotsOnTarget", value)}
                statKey="shotsOnTarget"
              />
            </div>
            <div className="text-sm text-muted-foreground">Shot Accuracy: {shotAccuracy}%</div>
          </div>

          {/* Passing Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Passing Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatInput
                label="Passes"
                value={stats.passes}
                onChange={(value) => updateStat("passes", value)}
                statKey="passes"
              />
              <StatInput
                label="Passes Completed"
                value={stats.passesCompleted}
                onChange={(value) => updateStat("passesCompleted", value)}
                statKey="passesCompleted"
              />
              <StatInput
                label="Crosses"
                value={stats.crosses}
                onChange={(value) => updateStat("crosses", value)}
                statKey="crosses"
              />
              <StatInput
                label="Crosses Completed"
                value={stats.crossesCompleted}
                onChange={(value) => updateStat("crossesCompleted", value)}
                statKey="crossesCompleted"
              />
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Pass Accuracy: {passAccuracy}%</div>
              <div>Cross Accuracy: {crossAccuracy}%</div>
            </div>
          </div>

          {/* Defensive Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Defensive Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatInput
                label="Tackles"
                value={stats.tackles}
                onChange={(value) => updateStat("tackles", value)}
                statKey="tackles"
              />
              <StatInput
                label="Interceptions"
                value={stats.interceptions}
                onChange={(value) => updateStat("interceptions", value)}
                statKey="interceptions"
              />
              <StatInput
                label="Clearances"
                value={stats.clearances}
                onChange={(value) => updateStat("clearances", value)}
                statKey="clearances"
              />
              <StatInput
                label="Blocks"
                value={stats.blocks}
                onChange={(value) => updateStat("blocks", value)}
                statKey="blocks"
              />
            </div>
          </div>

          {/* Disciplinary Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disciplinary Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatInput
                label="Fouls Committed"
                value={stats.fouls}
                onChange={(value) => updateStat("fouls", value)}
                statKey="fouls"
              />
              <StatInput
                label="Fouls Suffered"
                value={stats.foulsSuffered}
                onChange={(value) => updateStat("foulsSuffered", value)}
                statKey="foulsSuffered"
              />
              <StatInput
                label="Yellow Cards"
                value={stats.yellowCards}
                onChange={(value) => updateStat("yellowCards", value)}
                statKey="yellowCards"
              />
              <StatInput
                label="Red Cards"
                value={stats.redCards}
                onChange={(value) => updateStat("redCards", value)}
                statKey="redCards"
              />
            </div>
          </div>

          {/* Goalkeeper Stats */}
          {stats.position === "Goalkeeper" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Goalkeeper Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatInput
                  label="Saves"
                  value={stats.saves}
                  onChange={(value) => updateStat("saves", value)}
                  statKey="saves"
                />
                <StatInput
                  label="Goals Against"
                  value={stats.goalsAgainst}
                  onChange={(value) => updateStat("goalsAgainst", value)}
                  statKey="goalsAgainst"
                />
              </div>
            </div>
          )}

          {/* Physical Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Physical Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Minutes Played</Label>
                <Input
                  type="number"
                  value={stats.minutesPlayed}
                  onChange={(e) => updateStat("minutesPlayed", Number.parseInt(e.target.value) || 0)}
                  min="0"
                  max="120"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Distance Covered (km)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={stats.distanceCovered}
                  onChange={(e) => updateStat("distanceCovered", Number.parseFloat(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Match Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your performance, what went well, areas for improvement..."
              value={stats.notes}
              onChange={(e) => updateStat("notes", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Soccer Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
