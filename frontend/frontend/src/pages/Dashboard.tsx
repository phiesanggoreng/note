import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import NoteCard from '../Components/NoteCard/NoteCard'
import SearchBar from '../Components/SearchBar/SearchBar'
import TagFilter from '../Components/TagFilter/TagFilter'
import { PlusIcon, LayoutGridIcon, LayoutListIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
const Dashboard: React.FC = () => {
  const { notes } = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  // Extract all unique tags from notes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    notes.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet)
  }, [notes])
  // Filter notes based on search query and selected tags
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => note.tags.includes(tag))
      return matchesSearch && matchesTags
    })
  }, [notes, searchQuery, selectedTags])
  const handleSelectTag = (tag: string) => {
    setSelectedTags([...selectedTags, tag])
  }
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          My Notes
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
              aria-label="Grid view"
            >
              <LayoutGridIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
              aria-label="List view"
            >
              <LayoutListIcon className="h-4 w-4" />
            </button>
          </div>
          <Link
            to="/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            New Note
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="mb-6 lg:hidden">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onSelectTag={handleSelectTag}
              onRemoveTag={handleRemoveTag}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="hidden lg:block mb-6">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          {filteredNotes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                No notes found.{' '}
                {searchQuery || selectedTags.length > 0
                  ? 'Try adjusting your filters.'
                  : 'Create your first note!'}
              </p>
              <Link
                to="/new"
                className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                New Note
              </Link>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
