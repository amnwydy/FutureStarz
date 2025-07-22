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

interface FootballStats {
  date: Date
  position: string
  // Offensive Stats
  passingYards: number
  passingTouchdowns: number
  interceptions: number
  completions: number
  attempts: number
  rushingYards: number
  rushingTouchdowns: number
  rushingAttempts: number
  receivingYards: number
  receivingTouchdowns: number
  receptions: number
  targets: number
  // Defensive Stats
  tackles: number
  assistedTackles: number
  sacks: number
  interceptionsDefense: number
  passDeflections: number
  forcedFumbles: number
  fumbleRecoveries: number
  // Special Teams
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  extraPointsMade: number
  extraPointsAttempted: number
  puntingYards: number
  punts: number
  kickoffReturnYards: number
  puntReturnYards: number
  notes: string
}

export default function FootballStatsForm() {
  const [date, setDate] = useState<Date>(new Date())
  const [stats, setStats] = useState<FootballStats>({
    date: new Date(),
    position: "",
    passingYards: 0,
    passingTouchdowns: 0,
    interceptions: 0,
    completions: 0,
    attempts: 0,
    rushingYards: 0,
    rushingTouchdowns: 0,
    rushingAttempts: 0,
    receivingYards: 0,
    receivingTouchdowns: 0,
    receptions: 0,
    targets: 0,
    tackles: 0,
    assistedTackles: 0,
    sacks: 0,
    interceptionsDefense: 0,
    passDeflections: 0,
    forcedFumbles: 0,
    fumbleRecoveries: 0,
    fieldGoalsMade: 0,
    fieldGoalsAttempted: 0,
    extraPointsMade: 0,
    extraPointsAttempted: 0,
    puntingYards: 0,
    punts: 0,
    kickoffReturnYards: 0,
    puntReturnYards: 0,
    notes: "",
  })

  const updateStat = (key: keyof FootballStats, value: number | string | Date) => {
    setStats((prev) => ({ ...prev, [key]: value }))
  }

  const incrementStat = (key: keyof FootballStats) => {
    if (typeof stats[key] === "number") {
      setStats((prev) => ({ ...prev, [key]: (prev[key] as number) + 1 }))
    }
  }

  const decrementStat = (key: keyof FootballStats) => {
    if (typeof stats[key] === "number" && (stats[key] as number) > 0) {
      setStats((prev) => ({ ...prev, [key]: (prev[key] as number) - 1 }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const statsWithDate = { ...stats, date }
    saveStats("football", statsWithDate)
    toast.success("Football stats saved successfully!")

    // Reset form
    setStats({
      date: new Date(),
      position: "",
      passingYards: 0,
      passingTouchdowns: 0,
      interceptions: 0,
      completions: 0,
      attempts: 0,
      rushingYards: 0,
      rushingTouchdowns: 0,
      rushingAttempts: 0,
      receivingYards: 0,
      receivingTouchdowns: 0,
      receptions: 0,
      targets: 0,
      tackles: 0,
      assistedTackles: 0,
      sacks: 0,
      interceptionsDefense: 0,
      passDeflections: 0,
      forcedFumbles: 0,
      fumbleRecoveries: 0,
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      extraPointsMade: 0,
      extraPointsAttempted: 0,
      puntingYards: 0,
      punts: 0,
      kickoffReturnYards: 0,
      puntReturnYards: 0,
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
    statKey: keyof FootballStats
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
    "Quarterback",
    "Running Back",
    "Wide Receiver",
    "Tight End",
    "Offensive Line",
    "Defensive Line",
    "Linebacker",
    "Cornerback",
    "Safety",
    "Kicker",
    "Punter",
  ]

  const completionPercentage = stats.attempts > 0 ? ((stats.completions / stats.attempts) * 100).toFixed(1) : "0.0"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>🏈</span>
          <span>Football Stats</span>
        </CardTitle>
        <CardDescription>Track your football performance and game statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Offensive Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Offensive Statistics</h3>

            {/* Passing */}
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Passing</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatInput
                  label="Passing Yards"
                  value={stats.passingYards}
                  onChange={(value) => updateStat("passingYards", value)}
                  statKey="passingYards"
                />
                <StatInput
                  label="Passing TDs"
                  value={stats.passingTouchdowns}
                  onChange={(value) => updateStat("passingTouchdowns", value)}
                  statKey="passingTouchdowns"
                />
                <StatInput
                  label="Completions"
                  value={stats.completions}
                  onChange={(value) => updateStat("completions", value)}
                  statKey="completions"
                />
                <StatInput
                  label="Attempts"
                  value={stats.attempts}
                  onChange={(value) => updateStat("attempts", value)}
                  statKey="attempts"
                />
                <StatInput
                  label="Interceptions"
                  value={stats.interceptions}
                  onChange={(value) => updateStat("interceptions", value)}
                  statKey="interceptions"
                />
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Completion %</Label>
                  <div className="px-3 py-2 bg-muted rounded-md text-center text-sm">{completionPercentage}%</div>
                </div>
              </div>
            </div>

            {/* Rushing */}
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Rushing</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatInput
                  label="Rushing Yards"
                  value={stats.rushingYards}
                  onChange={(value) => updateStat("rushingYards", value)}
                  statKey="rushingYards"
                />
                <StatInput
                  label="Rushing TDs"
                  value={stats.rushingTouchdowns}
                  onChange={(value) => updateStat("rushingTouchdowns", value)}
                  statKey="rushingTouchdowns"
                />
                <StatInput
                  label="Rushing Attempts"
                  value={stats.rushingAttempts}
                  onChange={(value) => updateStat("rushingAttempts", value)}
                  statKey="rushingAttempts"
                />
              </div>
            </div>

            {/* Receiving */}
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Receiving</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatInput
                  label="Receiving Yards"
                  value={stats.receivingYards}
                  onChange={(value) => updateStat("receivingYards", value)}
                  statKey="receivingYards"
                />
                <StatInput
                  label="Receiving TDs"
                  value={stats.receivingTouchdowns}
                  onChange={(value) => updateStat("receivingTouchdowns", value)}
                  statKey="receivingTouchdowns"
                />
                <StatInput
                  label="Receptions"
                  value={stats.receptions}
                  onChange={(value) => updateStat("receptions", value)}
                  statKey="receptions"
                />
                <StatInput
                  label="Targets"
                  value={stats.targets}
                  onChange={(value) => updateStat("targets", value)}
                  statKey="targets"
                />
              </div>
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
                label="Assisted Tackles"
                value={stats.assistedTackles}
                onChange={(value) => updateStat("assistedTackles", value)}
                statKey="assistedTackles"
              />
              <StatInput
                label="Sacks"
                value={stats.sacks}
                onChange={(value) => updateStat("sacks", value)}
                statKey="sacks"
              />
              <StatInput
                label="Interceptions"
                value={stats.interceptionsDefense}
                onChange={(value) => updateStat("interceptionsDefense", value)}
                statKey="interceptionsDefense"
              />
              <StatInput
                label="Pass Deflections"
                value={stats.passDeflections}
                onChange={(value) => updateStat("passDeflections", value)}
                statKey="passDeflections"
              />
              <StatInput
                label="Forced Fumbles"
                value={stats.forcedFumbles}
                onChange={(value) => updateStat("forcedFumbles", value)}
                statKey="forcedFumbles"
              />
              <StatInput
                label="Fumble Recoveries"
                value={stats.fumbleRecoveries}
                onChange={(value) => updateStat("fumbleRecoveries", value)}
                statKey="fumbleRecoveries"
              />
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
            Save Football Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
