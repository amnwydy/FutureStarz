import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Lock, Dumbbell, Brain } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BarChart3 className="h-6 w-6" />
            <span>HoopStat Pro</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
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
                    Elevate Your Game with AI-Powered Insights
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Track your basketball and strength training progress, get AI-powered analysis, and receive
                    personalized feedback to reach your full potential.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center">
                <img
                  alt="Basketball player dashboard"
                  className="rounded-lg object-cover shadow-xl"
                  height="400"
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to track, analyze, and improve your basketball and strength training performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Comprehensive Tracking</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Record shooting percentages, vertical jump, weight, and all your gym workouts in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Brain className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Get weekly AI-powered analysis of your progress compared to NBA greats.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Dumbbell className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Personalized Training</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Receive custom training goals and feedback based on your unique performance data.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Lock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Your data is encrypted and only accessible to you, with enterprise-grade security.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary"
                >
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="m16 6-4 4-4-4"></path>
                  <path d="M16 18a4 4 0 0 0-8 0"></path>
                </svg>
                <h3 className="text-xl font-bold">Mobile Friendly</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Access your stats and training plans from any device, anywhere.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <h3 className="text-xl font-bold">100% Free</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  All features are completely free forever - no trials, no limits, no credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  A simple process to help you achieve your basketball and fitness goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="text-xl font-bold">Create an Account</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Sign up securely and set up your profile with your basketball position and training goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="text-xl font-bold">Track Your Progress</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Log your basketball stats and strength training workouts after each session.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="text-xl font-bold">Get AI Insights</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Receive weekly analysis, comparisons to NBA greats, and personalized training recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Players Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from athletes who have transformed their game with our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    "This app has completely changed how I approach my training. The AI feedback is like having a
                    personal coach."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Marcus J.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">College Point Guard</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    "Being able to compare my progress to NBA players gives me clear targets to aim for. I've improved
                    my shooting % by 12 points!"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Alisha T.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">High School Forward</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    "The security features give me peace of mind. I can track everything privately and still get
                    professional-level insights."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Jamal K.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Amateur League Center</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Elevate Your Game?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of players who are reaching their full potential with AI-powered insights.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/signup">
                  <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100">
                    Sign Up Now - 100% Free
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
            © 2025 HoopStat Pro. All rights reserved.
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
