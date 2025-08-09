import React, { useEffect, useState, useRef } from 'react'
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ImageIcon,
  CodeIcon,
} from 'lucide-react'
interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const insertMarkdown = (before: string, after: string = '') => {
    if (!textareaRef.current) return
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newValue =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end)
    onChange(newValue)
    // Set cursor position after formatting is applied
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length,
      )
    }, 0)
  }
  const handleBold = () => insertMarkdown('**', '**')
  const handleItalic = () => insertMarkdown('*', '*')
  const handleLink = () => {
    const url = prompt('Enter URL:', 'https://')
    if (url) {
      if (textareaRef.current) {
        const start = textareaRef.current.selectionStart
        const end = textareaRef.current.selectionEnd
        const selectedText = value.substring(start, end)
        const linkText = selectedText || 'link text'
        insertMarkdown(`[${linkText}](`, ')')
      }
    }
  }
  const handleList = () => insertMarkdown('- ')
  const handleImage = () => {
    const url = prompt('Enter image URL:', 'https://')
    if (url) {
      const alt = prompt('Enter image description:', '') || ''
      insertMarkdown(`![${alt}](${url})`)
    }
  }
  const handleCode = () => insertMarkdown('```\n', '\n```')
  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])
  return (
    <div className="w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <div className="flex items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        <button
          type="button"
          onClick={handleBold}
          className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          title="Bold"
        >
          <BoldIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleItalic}
          className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          title="Italic"
        >
          <ItalicIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleLink}
          className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleList}
          className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          title="Bulleted List"
        >
          <ListIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleImage}
          className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleCode}
          className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          title="Code Block"
        >
          <CodeIcon className="h-4 w-4" />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 min-h-[200px] text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-none focus:ring-0 resize-none"
        style={{
          height: 'auto',
          overflow: 'hidden',
        }}
      />
    </div>
  )
}
export default MarkdownEditor
