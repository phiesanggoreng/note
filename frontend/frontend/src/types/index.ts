export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  favorite?: boolean
}
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  xp: number
  level: number
  rank?: number
  joinedAt: string
}
