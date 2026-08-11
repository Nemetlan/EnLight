'use client'

import { Bookmark } from 'lucide-react'

interface CourseCardProps {
  category: string
  title: string
  completedLessons: number
  totalLessons: number
  studentCount: number
  bgColor: string
  textColor: string
  tagBg: string
  tagText: string
  actionLabel?: string
  onAction?: () => void
}

function AvatarStack({ count }: { count: number }) {
  const colors = ['bg-[#F97316]', 'bg-[#3B82F6]', 'bg-[#EC4899]', 'bg-[#10B981]']
  return (
    <div className="flex items-center gap-1 min-w-0">
      <div className="flex -space-x-1.5 sm:-space-x-2 shrink-0">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ${color} border border-white/30`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[9px] sm:text-xs md:text-sm font-medium opacity-90 ml-0.5 truncate">
        +{count}
      </span>
    </div>
  )
}

function LineArtOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="85%" cy="20%" r="48" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="85%" cy="20%" r="30" fill="none" stroke="white" strokeWidth="1" />
      <circle cx="85%" cy="20%" r="14" fill="none" stroke="white" strokeWidth="1" />
      <line x1="0" y1="75%" x2="100%" y2="75%" stroke="white" strokeWidth="0.75" />
      <line x1="0" y1="85%" x2="100%" y2="85%" stroke="white" strokeWidth="0.5" />
      <line x1="10%" y1="0" x2="10%" y2="100%" stroke="white" strokeWidth="0.5" />
      <line x1="20%" y1="0" x2="20%" y2="100%" stroke="white" strokeWidth="0.5" />
    </svg>
  )
}

export function CourseCard({
  category,
  title,
  completedLessons,
  totalLessons,
  studentCount,
  bgColor,
  textColor,
  tagBg,
  tagText,
  actionLabel = 'Continue Lesson',
  onAction,
}: CourseCardProps) {
  const progressPercent = Math.round((completedLessons / totalLessons) * 100)

  return (
    <article
      className={`w-full min-w-0 rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 md:p-6 flex flex-col justify-between relative overflow-hidden h-[180px] sm:h-auto sm:aspect-[3/2] ${bgColor}`}
      aria-label={`${title} course`}
    >
      <LineArtOverlay />

      {/* Top row */}
      <div className="relative flex items-center justify-between gap-2 z-10">
        <span
          className={`text-[9px] sm:text-xs md:text-sm font-semibold px-2 sm:px-3 py-0.5 rounded-full truncate max-w-[70%] ${tagBg} ${tagText}`}
          title={category}
        >
          {category}
        </span>
        <button
          type="button"
          aria-label={`Bookmark ${title}`}
          className="flex size-6 sm:size-10 items-center justify-center rounded-full opacity-80 hover:opacity-100 focus-visible:outline-none shrink-0 transition-opacity"
        >
          <Bookmark className={`w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 ${textColor}`} />
        </button>
      </div>

      {/* Title - Single/double-line compact text with ellipsis */}
      <h3
        className={`relative my-0.5 text-[11px] sm:text-base md:text-lg lg:text-xl font-bold leading-tight z-10 ${textColor}`}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={title}
      >
        {title}
      </h3>

      {/* Progress section */}
      <div className="relative flex flex-col gap-0.5 sm:gap-1.5 z-10">
        <div className="flex justify-between items-center text-[9px] sm:text-xs md:text-sm gap-2">
          <span className={`opacity-80 shrink-0 ${textColor}`}>Progress</span>
          <span className={`font-medium truncate ${textColor}`}>
            {completedLessons}/{totalLessons} lessons
          </span>
        </div>
        <div
          className="w-full h-1 sm:h-1.5 md:h-2 rounded-full bg-white/30 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-white transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Footer / Action section - Wrapped button on new row for mobile */}
      <div className="relative flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 pt-1 z-10">
        <AvatarStack count={studentCount} />
        
        {/* Compact full-width button on mobile */}
        <button
          type="button"
          onClick={onAction}
          className="w-full sm:w-auto flex items-center justify-center shrink-0 h-[26px] sm:min-h-[40px] px-2 sm:px-4 rounded-md sm:rounded-lg bg-[#C6F232] text-[9px] sm:text-xs md:text-sm font-bold text-[#111111] transition-all hover:opacity-90 active:scale-95"
        >
          <span className="truncate max-w-full sm:max-w-none">
            {actionLabel}
          </span>
        </button>
      </div>
    </article>
  )
}