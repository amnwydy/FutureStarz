"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User, Settings, LogOut, Trophy, Target } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case "basketball":
        return "🏀"
      case "football":
        return "🏈"
      case "soccer":
        return "⚽"
      default:
        return "🏃"
    }
  }

  const getSportColor = (sport: string) => {
    switch (sport) {
      case "basketball":
        return "bg-orange-100 text-orange-800"
      case "football":
        return "bg-brown-100 text-brown-800"
      case "soccer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return null
  }

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Sports Tracker</h1>
          </div>
          <Badge variant="secondary" className={getSportColor(user.sport)}>
            {getSportIcon(user.sport)} {user.sport.charAt(0).toUpperCase() + user.sport.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">{user.name}</span>
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.sport.charAt(0).toUpperCase() + user.sport.slice(1)} Player
                  </p>
                  {user.position && (
                    <p className="text-xs leading-none text-muted-foreground">Position: {user.position}</p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
