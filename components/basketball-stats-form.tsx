"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { saveBasketballStats } from "@/lib/data"
import { verifyPin } from "@/lib/auth"

interface BasketballStatsFormProps {
  userId: string
}

export default function BasketballStatsForm({ userId }: BasketballStatsFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPinPrompt, setShowPinPrompt] = useState(false)
  const [pin, setPin] = useState("")

  const [formData, setFormData] = useState({
    fieldGoalPercentage: "",
    threePointPercentage: "",
    freeThrowPercentage: "",
    points: "",
    rebounds: "",
    assists: "",
    steals: "",
    blocks: "",
    verticalJump: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowPinPrompt(true)
  }

  const handlePinSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const isValidPin = await verifyPin(userId, pin)
      if (!isValidPin) {
        throw new Error("Incorrect PIN")
      }

      await saveBasketballStats({
        userId,
        date: new Date().toISOString(),
        fieldGoalPercentage: Number.parseInt(formData.fieldGoalPercentage) || 0,
        threePointPercentage: Number.parseInt(formData.threePointPercentage) || 0,
        freeThrowPercentage: Number.parseInt(formData.freeThrowPercentage) || 0,
        points: Number.parseInt(formData.points) || 0,
        rebounds: Number.parseInt(formData.rebounds) || 0,
        assists: Number.parseInt(formData.assists) || 0,
        steals: Number.parseInt(formData.steals) || 0,
        blocks: Number.parseInt(formData.blocks) || 0,
        verticalJump: Number.parseFloat(formData.verticalJump) || 0,
      })

      setSuccess("Basketball stats saved successfully!")
      setFormData({
        fieldGoalPercentage: "",
        threePointPercentage: "",
        freeThrowPercentage: "",
        points: "",
        rebounds: "",
        assists: "",
        steals: "",
        blocks: "",
        verticalJump: "",
      })
      setShowPinPrompt(false)
      setPin("")
    } catch (error: any) {
      setError(error.message || "Failed to save stats")
    } finally {
      setLoading(false)
    }
  }

  if (showPinPrompt) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">Enter PIN to Save</h3>
          <p className="text-sm text-gray-500">Enter your 4-digit PIN to save your stats</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="pin">PIN</Label>
          <Input
            id="pin"
            type="password"
            placeholder="Enter your PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
            pattern="[0-9]{4}"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handlePinSubmit} disabled={loading || pin.length !== 4}>
            {loading ? "Saving..." : "Save Stats"}
          </Button>
          <Button variant="outline" onClick={() => setShowPinPrompt(false)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fg-percentage">Field Goal %</Label>
            <Input
              id="fg-percentage"
              type="number"
              placeholder="45"
              value={formData.fieldGoalPercentage}
              onChange={(e) => handleInputChange("fieldGoalPercentage", e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="three-point-percentage">3-Point %</Label>
            <Input
              id="three-point-percentage"
              type="number"
              placeholder="35"
              value={formData.threePointPercentage}
              onChange={(e) => handleInputChange("threePointPercentage", e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ft-percentage">Free Throw %</Label>
            <Input
              id="ft-percentage"
              type="number"
              placeholder="80"
              value={formData.freeThrowPercentage}
              onChange={(e) => handleInputChange("freeThrowPercentage", e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              placeholder="25"
              value={formData.points}
              onChange={(e) => handleInputChange("points", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rebounds">Rebounds</Label>
            <Input
              id="rebounds"
              type="number"
              placeholder="8"
              value={formData.rebounds}
              onChange={(e) => handleInputChange("rebounds", e.target.value)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assists">Assists</Label>
            <Input
              id="assists"
              type="number"
              placeholder="5"
              value={formData.assists}
              onChange={(e) => handleInputChange("assists", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="steals">Steals</Label>
            <Input
              id="steals"
              type="number"
              placeholder="2"
              value={formData.steals}
              onChange={(e) => handleInputChange("steals", e.target.value)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blocks">Blocks</Label>
            <Input
              id="blocks"
              type="number"
              placeholder="1"
              value={formData.blocks}
              onChange={(e) => handleInputChange("blocks", e.target.value)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vertical-jump">Vertical (in)</Label>
            <Input
              id="vertical-jump"
              type="number"
              step="0.1"
              placeholder="28.5"
              value={formData.verticalJump}
              onChange={(e) => handleInputChange("verticalJump", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save Basketball Stats
        </Button>
      </form>
    </div>
  )
}
