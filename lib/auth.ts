export interface User {
  name: string
  pin: string
  sport: "basketball" | "football" | "soccer"
  position?: string
  createdAt: string
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("currentUser")
  return userData ? JSON.parse(userData) : null
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return

  localStorage.setItem("currentUser", JSON.stringify(user))
}

export function logout(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("currentUser")
}

export function authenticateUser(name: string, pin: string): User | null {
  if (typeof window === "undefined") return null

  const users = getAllUsers()
  const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase() && u.pin === pin)

  if (user) {
    setCurrentUser(user)
    return user
  }

  return null
}

export function createUser(
  name: string,
  pin: string,
  sport: "basketball" | "football" | "soccer",
  position?: string,
): User {
  if (typeof window === "undefined") throw new Error("Cannot create user on server")

  const user: User = {
    name,
    pin,
    sport,
    position,
    createdAt: new Date().toISOString(),
  }

  const users = getAllUsers()
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))

  setCurrentUser(user)
  return user
}

export function getAllUsers(): User[] {
  if (typeof window === "undefined") return []

  const usersData = localStorage.getItem("users")
  return usersData ? JSON.parse(usersData) : []
}

export function userExists(name: string): boolean {
  if (typeof window === "undefined") return false

  const users = getAllUsers()
  return users.some((u) => u.name.toLowerCase() === name.toLowerCase())
}

export function updateUser(updatedUser: User): void {
  if (typeof window === "undefined") return

  const users = getAllUsers()
  const index = users.findIndex((u) => u.name.toLowerCase() === updatedUser.name.toLowerCase())

  if (index !== -1) {
    users[index] = updatedUser
    localStorage.setItem("users", JSON.stringify(users))
    setCurrentUser(updatedUser)
  }
}
