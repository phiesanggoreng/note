import type { Note, Badge, User } from '../types'
export const mockNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Getting Started with React',
    content:
      '# React Basics\n\nReact is a JavaScript library for building user interfaces. It allows you to create reusable UI components.\n\n## Key Concepts\n\n- Components\n- Props\n- State\n- Hooks\n\n```jsx\nfunction HelloWorld() {\n  return <h1>Hello, world!</h1>;\n}\n```',
    tags: ['react', 'javascript', 'frontend'],
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z',
    favorite: true,
  },
  {
    id: 'note-2',
    title: 'Tailwind CSS Tips and Tricks',
    content:
      '# Tailwind CSS\n\nTailwind is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.\n\n## Useful Utilities\n\n- Flex: `flex`, `items-center`, `justify-between`\n- Spacing: `p-4`, `m-2`, `space-y-4`\n- Colors: `bg-blue-500`, `text-gray-800`\n\n## Example\n\n```html\n<div class="flex items-center p-4 bg-white rounded-lg shadow">\n  <h2 class="text-xl font-bold">Card Title</h2>\n</div>\n```',
    tags: ['css', 'tailwind', 'design'],
    createdAt: '2023-05-20T14:15:00Z',
    updatedAt: '2023-05-21T09:45:00Z',
  },
  {
    id: 'note-3',
    title: 'TypeScript Interface vs Type',
    content:
      '# TypeScript: Interface vs Type\n\n## Interface\n\n```typescript\ninterface User {\n  name: string;\n  age: number;\n}\n```\n\n## Type\n\n```typescript\ntype User = {\n  name: string;\n  age: number;\n};\n```\n\n## Key Differences\n\n1. Interfaces can be extended with the same name\n2. Types can use unions and intersections\n3. Interfaces are often preferred for public APIs',
    tags: ['typescript', 'javascript'],
    createdAt: '2023-06-01T08:20:00Z',
    updatedAt: '2023-06-01T08:20:00Z',
  },
  {
    id: 'note-4',
    title: 'Project Ideas for Portfolio',
    content:
      '# Project Ideas\n\n1. **Note-taking App** - A Markdown-based note app with tagging and search\n2. **Personal Finance Dashboard** - Track expenses and visualize spending habits\n3. **Recipe Manager** - Store and organize recipes with ingredient search\n4. **Task Management System** - Kanban-style board with drag and drop\n5. **Social Media Dashboard** - Manage multiple accounts from one interface',
    tags: ['ideas', 'projects', 'portfolio'],
    createdAt: '2023-06-10T16:45:00Z',
    updatedAt: '2023-06-12T11:30:00Z',
  },
  {
    id: 'note-5',
    title: 'Meeting Notes: Q3 Planning',
    content:
      '# Q3 Planning Meeting\n\n**Date:** June 15, 2023\n**Attendees:** Sarah, Mike, Jennifer, David\n\n## Agenda\n\n1. Review Q2 results\n2. Set Q3 objectives\n3. Discuss resource allocation\n4. Plan marketing campaign\n\n## Action Items\n\n- [ ] Sarah: Prepare Q2 performance report by 6/20\n- [ ] Mike: Draft Q3 objectives document by 6/22\n- [ ] Jennifer: Review budget allocation by 6/25\n- [ ] David: Schedule follow-up meeting for next week',
    tags: ['meeting', 'planning', 'work'],
    createdAt: '2023-06-15T13:00:00Z',
    updatedAt: '2023-06-15T14:30:00Z',
  },
]
export const mockBadges: Badge[] = [
  {
    id: 'first-note',
    name: 'First Note',
    description: 'Created your first note',
    icon: '📝',
    unlocked: true,
  },
  {
    id: 'five-notes',
    name: 'Note Taker',
    description: 'Created 5 notes',
    icon: '✏️',
    unlocked: true,
  },
  {
    id: 'markdown-master',
    name: 'Markdown Master',
    description: 'Used 5 different markdown features',
    icon: '🔠',
    unlocked: false,
  },
  {
    id: 'tag-collector',
    name: 'Tag Collector',
    description: 'Used 10 unique tags',
    icon: '🏷️',
    unlocked: false,
  },
  {
    id: 'xp-100',
    name: 'Century Club',
    description: 'Earned 100 XP',
    icon: '🏆',
    unlocked: true,
  },
]
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    xp: 125,
    level: 2,
    rank: 1,
    joinedAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Sam Taylor',
    email: 'sam@example.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    xp: 95,
    level: 1,
    rank: 2,
    joinedAt: '2023-02-20T15:30:00Z',
  },
  {
    id: 'user-3',
    name: 'Jamie Rivera',
    email: 'jamie@example.com',
    avatar:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    xp: 80,
    level: 1,
    rank: 3,
    joinedAt: '2023-03-10T09:15:00Z',
  },
]
