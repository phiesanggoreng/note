import React from 'react'
import { XIcon } from 'lucide-react'
interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onSelectTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
}
const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onSelectTag,
  onRemoveTag,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Filter by tags
      </h3>
      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 focus:outline-none"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={() => selectedTags.forEach((tag) => onRemoveTag(tag))}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Clear all
            </button>
          )}
        </div>
      )}
      {/* Available tags */}
      <div className="flex flex-wrap gap-2">
        {tags
          .filter((tag) => !selectedTags.includes(tag))
          .map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {tag}
            </button>
          ))}
      </div>
    </div>
  )
}
export default TagFilter
