import React from 'react'
import { useAppContext } from '../context/AppContext'
import BadgeList from '../Components/BadgeList/BadgeList'
import ProgressBar from '../Components/ProgressBar/ProgressBar'
import {
  TrophyIcon,
  FileTextIcon,
  ClockIcon,
  TagIcon,
  BarChart2Icon,
} from 'lucide-react'
const Stats: React.FC = () => {
  const { user, notes, badges } = useAppContext()
  // Calculate statistics
  const notesCount = notes.length
  const tagsCount = new Set(notes.flatMap((note) => note.tags)).size
  const wordsCount = notes.reduce((total, note) => {
    const wordCount = note.content.split(/\s+/).filter(Boolean).length
    return total + wordCount
  }, 0)
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }
  const unlockedBadgesCount = badges.filter((badge) => badge.unlocked).length
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Stats & Achievements
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* User profile card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full border-2 border-indigo-500"
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Member since {formatDate(user.joinedAt)}
              </p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                Rank #{user.rank || '-'}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <TrophyIcon className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  Level {user.level}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.xp} XP total ({user.xp % 100}/{100} to next level)
              </span>
            </div>
            <ProgressBar
              value={user.xp % 100}
              max={100}
              className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full"
              barClassName="bg-indigo-500 rounded-full"
            />
          </div>
        </div>
        {/* Stats overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Activity Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <FileTextIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Total Notes
                </p>
                <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {notesCount}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <TagIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Unique Tags
                </p>
                <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {tagsCount}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <BarChart2Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Words Written
                </p>
                <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {wordsCount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <TrophyIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Badges Earned
                </p>
                <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {unlockedBadgesCount}/{badges.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Badges section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <BadgeList badges={badges} showLocked={true} />
      </div>
      {/* Leaderboard section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Leaderboard
        </h3>
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  XP
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: 'user-1',
                  name: 'Alex Johnson',
                  avatar:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  level: 2,
                  xp: 125,
                  rank: 1,
                },
                {
                  id: 'user-2',
                  name: 'Sam Taylor',
                  avatar:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  level: 1,
                  xp: 95,
                  rank: 2,
                },
                {
                  id: 'user-3',
                  name: 'Jamie Rivera',
                  avatar:
                    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  level: 1,
                  xp: 80,
                  rank: 3,
                },
              ].map((leader) => (
                <tr
                  key={leader.id}
                  className={
                    leader.id === user.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20'
                      : ''
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {leader.rank === 1 ? (
                      <span className="text-yellow-500">🥇 1st</span>
                    ) : leader.rank === 2 ? (
                      <span className="text-gray-400">🥈 2nd</span>
                    ) : leader.rank === 3 ? (
                      <span className="text-amber-600">🥉 3rd</span>
                    ) : (
                      `${leader.rank}th`
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={leader.avatar}
                          alt={leader.name}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {leader.name}
                          {leader.id === user.id && (
                            <span className="ml-2 text-xs text-indigo-600 dark:text-indigo-400">
                              (You)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {leader.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {leader.xp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Stats
