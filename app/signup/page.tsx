"use client"

import { useState } from "react"
import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3 } from "lucide-react"
import { registerUser } from "@/lib/auth"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Redirect to login since we don't need separate signup
    router.push("/login")
  }, [router])

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await registerUser(name, email, password)
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BarChart3 className="h-6 w-6" />
            <span>HoopStat Pro</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="min-h-screen flex items-center justify-center">
          <p>Redirecting to login...</p>
        </div>
      </main>
    </div>
  )
}
