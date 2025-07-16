"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { saveBasketballStats } from "@/lib/data"

interface BasketballStatsFormProps {
  userId: string
}

export default function BasketballStatsForm({ userId }: BasketballStatsFormProps) {
  const [loading, setLoading] = useState(false)
  const [fieldGoalPercentage, setFieldGoalPercentage] = useState(50)
  const [threePointPercentage, setThreePointPercentage] = useState(35)
  const [freeThrowPercentage, setFreeThrowPercentage] = useState(70)
  const [points, setPoints] = useState("")
  const [rebounds, setRebounds] = useState("")
  const [assists, setAssists] = useState("")
  const [steals, setSteals] = useState("")
  const [blocks, setBlocks] = useState("")
  const [verticalJump, setVerticalJump] = useState("")

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveBasketballStats({
        userId,
        date: new Date().toISOString(),
        fieldGoalPercentage,
        threePointPercentage,
        freeThrowPercentage,
        points: Number.parseInt(points),
        rebounds: Number.parseInt(rebounds),
        assists: Number.parseInt(assists),
        steals: Number.parseInt(steals),
        blocks: Number.parseInt(blocks),
        verticalJump: Number.parseFloat(verticalJump),
      })

      toast({
        title: "Stats saved",
        description: "Your basketball stats have been recorded successfully.",
      })

      // Reset form
      setPoints("")
      setRebounds("")
      setAssists("")
      setSteals("")
      setBlocks("")
      setVerticalJump("")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save stats",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="field-goal">Field Goal %</Label>
          <span className="text-sm">{fieldGoalPercentage}%</span>
        </div>
        <Slider
          id="field-goal"
          min={0}
          max={100}
          step={1}
          value={[fieldGoalPercentage]}
          onValueChange={(value) => setFieldGoalPercentage(value[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="three-point">Three Point %</Label>
          <span className="text-sm">{threePointPercentage}%</span>
        </div>
        <Slider
          id="three-point"
          min={0}
          max={100}
          step={1}
          value={[threePointPercentage]}
          onValueChange={(value) => setThreePointPercentage(value[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="free-throw">Free Throw %</Label>
          <span className="text-sm">{freeThrowPercentage}%</span>
        </div>
        <Slider
          id="free-throw"
          min={0}
          max={100}
          step={1}
          value={[freeThrowPercentage]}
          onValueChange={(value) => setFreeThrowPercentage(value[0])}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="points">Points</Label>
          <Input id="points" type="number" placeholder="0" value={points} onChange={(e) => setPoints(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rebounds">Rebounds</Label>
          <Input
            id="rebounds"
            type="number"
            placeholder="0"
            value={rebounds}
            onChange={(e) => setRebounds(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assists">Assists</Label>
          <Input
            id="assists"
            type="number"
            placeholder="0"
            value={assists}
            onChange={(e) => setAssists(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="steals">Steals</Label>
          <Input id="steals" type="number" placeholder="0" value={steals} onChange={(e) => setSteals(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blocks">Blocks</Label>
          <Input id="blocks" type="number" placeholder="0" value={blocks} onChange={(e) => setBlocks(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vertical">Vertical Jump (inches)</Label>
          <Input
            id="vertical"
            type="number"
            step="0.1"
            placeholder="0.0"
            value={verticalJump}
            onChange={(e) => setVerticalJump(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Basketball Stats"
        )}
      </Button>
    </form>
  )
}
