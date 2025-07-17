import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Lock, Brain, Trophy, Target, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Trophy className="h-6 w-6 text-orange-500" />
            <span>Future Starz</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#sports" className="text-sm font-medium hover:underline underline-offset-4">
              Sports
            </Link>
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track Your Athletic Journey
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Track your basketball, football, and soccer performance with AI-powered insights. Simple, free, and
                    designed for athletes of all levels.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1">
                      Start Tracking <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#sports">
                    <Button size="lg" variant="outline">
                      Choose Your Sport
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center">
                <img
                  alt="Athletes training dashboard"
                  className="rounded-lg object-cover shadow-xl"
                  height="400"
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="sports" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Sport</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Specialized tracking for basketball, football, and soccer with sport-specific metrics and insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-8 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/placeholder.svg?height=120&width=120"
                  alt="Basketball"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h3 className="text-2xl font-bold">Basketball</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Track shooting percentages, points, rebounds, assists, and vertical jump progress.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Field Goal & 3-Point %</li>
                  <li>• Points, Rebounds, Assists</li>
                  <li>• Steals, Blocks, Vertical Jump</li>
                  <li>• Compare to NBA players</li>
                </ul>
                <Link href="/login?sport=basketball">
                  <Button className="w-full">Start Basketball Tracking</Button>
                </Link>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border p-8 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/placeholder.svg?height=120&width=120"
                  alt="Football"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h3 className="text-2xl font-bold">Football</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Monitor passing, rushing, defensive stats, and combine-style measurements.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Passing yards & completion %</li>
                  <li>• Rushing yards & touchdowns</li>
                  <li>• Tackles, sacks, interceptions</li>
                  <li>• 40-yard dash times</li>
                </ul>
                <Link href="/login?sport=football">
                  <Button className="w-full">Start Football Tracking</Button>
                </Link>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border p-8 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/placeholder.svg?height=120&width=120"
                  alt="Soccer"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h3 className="text-2xl font-bold">Soccer</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Record goals, assists, passing accuracy, and defensive contributions.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Goals, assists, shots</li>
                  <li>• Pass accuracy & completion</li>
                  <li>• Tackles, saves (goalkeepers)</li>
                  <li>• Sprint speed tracking</li>
                </ul>
                <Link href="/login?sport=soccer">
                  <Button className="w-full">Start Soccer Tracking</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to track, analyze, and improve your athletic performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Sport-Specific Tracking</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Customized metrics for basketball, football, and soccer with relevant performance indicators.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <Brain className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Get personalized insights and comparisons to professional athletes in your sport.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <Target className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Visual charts and graphs to see your improvement over time across all metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <Lock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Simple & Secure</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Just your name and PIN - no complex passwords or personal information required.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <Zap className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Instant Access</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Works on any device, anywhere. No downloads or installations needed.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <Trophy className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">100% Free</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  All features completely free forever - no trials, no limits, no credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Get started in minutes and begin tracking your athletic progress today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="text-xl font-bold">Choose Your Sport</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Select basketball, football, or soccer and create your account with just a name and PIN.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="text-xl font-bold">Track Your Stats</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Log your performance after each game or practice with sport-specific metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="text-xl font-bold">See Your Progress</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  View charts, get AI insights, and track your improvement over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Become a Future Star?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join athletes tracking their progress and reaching their potential with AI-powered insights.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/login">
                  <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100">
                    Start Tracking - 100% Free
                  </Button>
                </Link>
                <p className="text-xs">No credit card required. All features free forever.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left dark:text-gray-400">
            © 2025 Future Starz. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
