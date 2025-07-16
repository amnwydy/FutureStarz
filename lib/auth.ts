import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { v4 as uuidv4 } from "uuid"
import { db } from "./db"

// Secret key for JWT signing - in production, use a strong secret from environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "basketball-tracker-default-secret-key-change-in-production",
)

// User type
export type User = {
  id: string
  name: string
  email: string
}

// Register a new user
export async function registerUser(name: string, email: string, password: string): Promise<User> {
  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Hash the password (in a real app, use bcrypt or similar)
  const hashedPassword = await hashPassword(password)

  // Create the user
  const user = await db.user.create({
    data: {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    },
  })

  // Create and set the auth token
  const token = await createToken({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  // Set the cookie
  cookies().set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

// Login a user
export async function loginUser(email: string, password: string): Promise<User> {
  // Find the user
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error("Invalid email or password")
  }

  // Verify the password
  const isPasswordValid = await verifyPassword(password, user.password)

  if (!isPasswordValid) {
    throw new Error("Invalid email or password")
  }

  // Create and set the auth token
  const token = await createToken({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  // Set the cookie
  cookies().set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

// Logout a user
export async function logoutUser(): Promise<void> {
  cookies().set({
    name: "auth-token",
    value: "",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  })
}

// Get the current user
export async function getCurrentUser(): Promise<User | null> {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await verifyAuth(token)
    if (!verified) {
      return null
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as User
  } catch (error) {
    return null
  }
}

// Update user profile
export async function updateUserProfile(userId: string, name: string, email: string): Promise<User> {
  // Check if email is already taken by another user
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser && existingUser.id !== userId) {
    throw new Error("Email is already taken by another user")
  }

  // Update the user
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      name,
      email,
    },
  })

  // Update the auth token with new information
  const token = await createToken({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
  })

  // Set the updated cookie
  cookies().set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
  }
}

// Verify an auth token
export async function verifyAuth(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return !!payload
  } catch (error) {
    return false
  }
}

// Create a JWT token
async function createToken(user: User): Promise<string> {
  return new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(JWT_SECRET)
}

// Hash a password (simplified for demo)
async function hashPassword(password: string): Promise<string> {
  // In a real app, use bcrypt or similar
  // This is a simplified version for demo purposes
  return password
}

// Verify a password (simplified for demo)
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // In a real app, use bcrypt or similar
  // This is a simplified version for demo purposes
  return password === hashedPassword
}
