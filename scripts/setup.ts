import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

// This script sets up the initial database with a demo user
async function main() {
  console.log("Setting up the database...")

  const prisma = new PrismaClient()

  try {
    // Create demo user
    const demoUser = await prisma.user.upsert({
      where: { email: "demo@example.com" },
      update: {},
      create: {
        id: uuidv4(),
        name: "Demo User",
        email: "demo@example.com",
        password: "password123", // In a real app, this would be hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    console.log(`Created demo user: ${demoUser.name} (${demoUser.email})`)

    // Create some sample basketball stats
    const today = new Date()

    for (let i = 0; i < 5; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i * 3)

      await prisma.basketballStats.create({
        data: {
          id: uuidv4(),
          userId: demoUser.id,
          date: date,
          fieldGoalPercentage: 45 + Math.floor(Math.random() * 10),
          threePointPercentage: 35 + Math.floor(Math.random() * 10),
          freeThrowPercentage: 75 + Math.floor(Math.random() * 10),
          points: 15 + Math.floor(Math.random() * 10),
          rebounds: 5 + Math.floor(Math.random() * 5),
          assists: 3 + Math.floor(Math.random() * 5),
          steals: 1 + Math.floor(Math.random() * 2),
          blocks: Math.floor(Math.random() * 2),
          verticalJump: 24 + Math.floor(Math.random() * 4),
          createdAt: date,
        },
      })
    }

    console.log("Created sample basketball stats")

    // Create some sample strength training data
    for (let i = 0; i < 5; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i * 4)

      await prisma.strengthTraining.create({
        data: {
          id: uuidv4(),
          userId: demoUser.id,
          date: date,
          weight: 180 - i * 0.5,
          benchPress: 185 + i * 5,
          squat: 225 + i * 5,
          deadlift: 275 + i * 5,
          workoutNotes: `Workout session ${i + 1}. Feeling ${i % 2 === 0 ? "great" : "tired"} today.`,
          createdAt: date,
        },
      })
    }

    console.log("Created sample strength training data")

    // Create some sample training goals
    const goalTypes = ["basketball", "strength"]
    const descriptions = [
      "Improve three-point shooting percentage",
      "Increase vertical jump",
      "Enhance bench press strength",
      "Boost free throw accuracy",
    ]

    for (let i = 0; i < 3; i++) {
      const targetDate = new Date(today)
      targetDate.setDate(targetDate.getDate() + 30 + i * 15)

      await prisma.trainingGoal.create({
        data: {
          id: uuidv4(),
          userId: demoUser.id,
          goalType: goalTypes[i % 2],
          description: descriptions[i % 4],
          targetValue: 100 + i * 25,
          currentValue: 75 + i * 10,
          targetDate: targetDate,
          completed: false,
          createdAt: today,
        },
      })
    }

    console.log("Created sample training goals")

    console.log("Database setup complete!")
    console.log("\nDemo login credentials:")
    console.log("Email: demo@example.com")
    console.log("Password: password123")
  } catch (error) {
    console.error("Error setting up the database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
