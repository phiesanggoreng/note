import React from 'react';
import type { Badge } from '../../types/index';



interface BadgeListProps {
  badges: Badge[];
  showLocked?: boolean;
}

const BadgeList: React.FC<BadgeListProps> = ({
  badges,
  showLocked = true
}) => {
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = showLocked ? badges.filter(badge => !badge.unlocked) : [];
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Badges ({unlockedBadges.length}/{badges.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {unlockedBadges.map(badge => (
          <div key={badge.id} className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="text-3xl mb-2">{badge.icon}</div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {badge.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              {badge.description}
            </p>
          </div>
        ))}
        {lockedBadges.map(badge => (
          <div key={badge.id} className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg opacity-60">
            <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              {badge.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
              {badge.description}
            </p>
            <span className="mt-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              Locked
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;