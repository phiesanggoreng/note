import React from 'react'
interface ProgressBarProps {
  value: number
  max: number
  className?: string
  barClassName?: string
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className = 'h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
  barClassName = 'h-full bg-indigo-500 transition-all duration-300 ease-out',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={className}>
      <div
        className={barClassName}
        style={{
          width: `${percentage}%`,
        }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  )
}
export default ProgressBar
