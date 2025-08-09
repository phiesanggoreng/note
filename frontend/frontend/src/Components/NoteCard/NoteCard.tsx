import React from 'react'
import { Link } from 'react-router-dom'
import { StarIcon, EditIcon, TrashIcon } from 'lucide-react'
import type { Note } from '../../types'
import { useAppContext } from '../../context/AppContext'
interface NoteCardProps {
  note: Note
}
const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { updateNote, deleteNote } = useAppContext()
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }
  // Extract preview from markdown content (first 100 chars)
  const getPreview = (content: string) => {
    // Remove markdown syntax for preview
    const plainText = content
      .replace(/#{1,6}\s/g, '') // Remove headings
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italic
      .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
      .replace(/`/g, '') // Remove inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just the text
    return plainText.length > 100
      ? plainText.substring(0, 100) + '...'
      : plainText
  }
  const toggleFavorite = () => {
    updateNote(note.id, {
      favorite: !note.favorite,
    })
  }
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    deleteNote(note.id)
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <Link to={`/note/${note.id}`} className="block h-full">
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-1">
              {note.title}
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite()
              }}
              className="p-1 text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400 transition-colors duration-200"
              aria-label={
                note.favorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <StarIcon
                className={`h-5 w-5 ${note.favorite ? 'text-yellow-500 dark:text-yellow-400 fill-current' : ''}`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 flex-grow">
            {getPreview(note.content)}
          </p>
          <div className="mt-2">
            <div className="flex flex-wrap gap-1 mb-3">
              {note.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                >
                  {tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  +{note.tags.length - 3}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatDate(note.updatedAt)}</span>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  to={`/edit/${note.id}`}
                  className="p-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EditIcon className="h-4 w-4" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-1 hover:text-red-600 dark:hover:text-red-400"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default NoteCard
