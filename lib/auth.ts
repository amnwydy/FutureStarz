// Simple name + PIN based authentication
export type User = {
  id: string
  name: string
}

// Simple storage for demo - in production you'd use a database
const users = new Map<string, { name: string; pin: string }>()

// Register/Login with name and PIN
export async function loginWithNameAndPin(name: string, pin: string): Promise<User> {
  const userId = name.toLowerCase().replace(/\s+/g, "-")

  // Check if user exists
  const existingUser = users.get(userId)

  if (existingUser) {
    // User exists, verify PIN
    if (existingUser.pin !== pin) {
      throw new Error("Incorrect PIN")
    }
  } else {
    // New user, create account
    users.set(userId, { name, pin })
  }

  // Store in localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify({ id: userId, name }))
  }

  return { id: userId, name }
}

// Get current user from localStorage
export async function getCurrentUser(): Promise<User | null> {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem("currentUser")
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

// Logout user
export async function logoutUser(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

// Update user profile (just name)
export async function updateUserProfile(userId: string, name: string): Promise<User> {
  const user = users.get(userId)
  if (user) {
    user.name = name
    users.set(userId, user)
  }

  const updatedUser = { id: userId, name }

  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }

  return updatedUser
}

// Verify PIN for editing
export async function verifyPin(userId: string, pin: string): Promise<boolean> {
  const user = users.get(userId)
  return user ? user.pin === pin : false
}
