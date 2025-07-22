export interface User {
  name: string
  pin: string
  sport: "basketball" | "football" | "soccer"
  position?: string
  createdAt: string
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

export function loginUser(name: string, pin: string): User | null {
  if (typeof window === "undefined") return null
  const users = getAllUsers()
  const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase() && u.pin === pin)
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
    return user
  }
  return null
}

export function registerUser(
  name: string,
  pin: string,
  sport: "basketball" | "football" | "soccer",
  position?: string,
): User {
  if (typeof window === "undefined") throw new Error("Cannot register user on server")

  const users = getAllUsers()
  const existingUser = users.find((u) => u.name.toLowerCase() === name.toLowerCase())

  if (existingUser) {
    throw new Error("User already exists")
  }

  const newUser: User = {
    name,
    pin,
    sport,
    position,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))
  localStorage.setItem("currentUser", JSON.stringify(newUser))

  return newUser
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("currentUser")
}

export function updateUser(updates: Partial<User>): User | null {
  if (typeof window === "undefined") return null

  const currentUser = getCurrentUser()
  if (!currentUser) return null

  const updatedUser = { ...currentUser, ...updates }
  const users = getAllUsers()
  const userIndex = users.findIndex((u) => u.name === currentUser.name)

  if (userIndex !== -1) {
    users[userIndex] = updatedUser
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    return updatedUser
  }

  return null
}

export function getAllUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("users")
  return users ? JSON.parse(users) : []
}

export function findUserByName(name: string): User | null {
  const users = getAllUsers()
  return users.find((u) => u.name.toLowerCase() === name.toLowerCase()) || null
}
