import React, { useEffect, useState, createContext, useContext } from 'react'
import type { Note, Badge, User } from '../types'
import { mockNotes, mockBadges, mockUsers } from '../utils/mockData'
import { toast } from 'sonner'
interface AppContextType {
  notes: Note[]
  user: User
  badges: Badge[]
  darkMode: boolean
  toggleDarkMode: () => void
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNote: (id: string, note: Partial<Note>) => void
  deleteNote: (id: string) => void
  earnXP: (amount: number) => void
  checkBadges: () => void
}
const AppContext = createContext<AppContextType | undefined>(undefined)
export const AppProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [badges, setBadges] = useState<Badge[]>(mockBadges)
  const [user, setUser] = useState<User>(mockUsers[0])
  const [darkMode, setDarkMode] = useState<boolean>(false)
  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
    earnXP(10)
    toast.success('Note created! +10 XP')
  }
  const updateNote = (id: string, noteUpdate: Partial<Note>) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...noteUpdate,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
    earnXP(5)
    toast.success('Note updated! +5 XP')
  }
  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    toast.error('Note deleted')
  }
  const earnXP = (amount: number) => {
    const newXP = user.xp + amount
    const newLevel = Math.floor(newXP / 100) + 1
    setUser({
      ...user,
      xp: newXP,
      level: newLevel,
    })
    checkBadges()
  }
  const checkBadges = () => {
    // Check for note count badges
    const noteCount = notes.length
    const unlockedBadges = [...badges]
    // First note badge
    if (noteCount >= 1 && !badges.some((b) => b.id === 'first-note')) {
      const firstNoteBadge = {
        id: 'first-note',
        name: 'First Note',
        description: 'Created your first note',
        icon: '📝',
        unlocked: true,
      }
      unlockedBadges.push(firstNoteBadge)
      toast.success('Badge unlocked: First Note! 🎉')
    }
    // 5 notes badge
    if (noteCount >= 5 && !badges.some((b) => b.id === 'five-notes')) {
      const fiveNotesBadge = {
        id: 'five-notes',
        name: 'Note Taker',
        description: 'Created 5 notes',
        icon: '✏️',
        unlocked: true,
      }
      unlockedBadges.push(fiveNotesBadge)
      toast.success('Badge unlocked: Note Taker! 🎉')
    }
    // XP badges
    if (user.xp >= 100 && !badges.some((b) => b.id === 'xp-100')) {
      const xpBadge = {
        id: 'xp-100',
        name: 'Century Club',
        description: 'Earned 100 XP',
        icon: '🏆',
        unlocked: true,
      }
      unlockedBadges.push(xpBadge)
      toast.success('Badge unlocked: Century Club! 🎉')
    }
    setBadges(unlockedBadges)
  }
  return (
    <AppContext.Provider
      value={{
        notes,
        user,
        badges,
        darkMode,
        toggleDarkMode,
        addNote,
        updateNote,
        deleteNote,
        earnXP,
        checkBadges,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
