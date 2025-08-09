import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { ArrowLeftIcon, EditIcon, StarIcon, TrashIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
const NoteDetail: React.FC = () => {
  const { id } = useParams<{
    id: string
  }>()
  const navigate = useNavigate()
  const { notes, updateNote, deleteNote } = useAppContext()
  const note = notes.find((note) => note.id === id)
  if (!note) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Note not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The note you're looking for doesn't exist or has been deleted.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }
  const toggleFavorite = () => {
    updateNote(note.id, {
      favorite: !note.favorite,
    })
  }
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id)
      navigate('/')
    }
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFavorite}
              className="p-2 text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400 transition-colors duration-200"
              aria-label={
                note.favorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <StarIcon
                className={`h-5 w-5 ${note.favorite ? 'text-yellow-500 dark:text-yellow-400 fill-current' : ''}`}
              />
            </button>
            <Link
              to={`/edit/${note.id}`}
              className="p-2 text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <EditIcon className="h-5 w-5" />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {note.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
            <span>Updated {formatDate(note.updatedAt)}</span>
            <span>•</span>
            <div className="flex flex-wrap gap-1">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="prose prose-indigo dark:prose-invert max-w-none">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
export default NoteDetail
