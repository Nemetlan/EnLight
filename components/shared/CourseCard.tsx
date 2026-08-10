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
    <div className="flex items-center gap-1">
      <div className="flex -space-x-1.5 sm:-space-x-2">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full ${color} border-2 border-white/30`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[10px] sm:text-xs md:text-sm font-medium opacity-90 ml-1">
        +{count}
      </span>
    </div>
  )
}

// Subtle line-art SVG overlay for texture
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
}: CourseCardProps) {
  const progressPercent = Math.round((completedLessons / totalLessons) * 100)

  return (
    <article
      className={`min-w-0 rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 flex flex-col justify-between relative overflow-hidden aspect-[3/2] ${bgColor}`}
      aria-label={`${title} course`}
    >
      <LineArtOverlay />

      {/* Top row */}
      <div className="relative flex items-start justify-between">
        <span
          className={`text-[10px] sm:text-xs md:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${tagBg} ${tagText}`}
        >
          {category}
        </span>
        <button
          aria-label={`Bookmark ${title}`}
          className="flex size-11 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
        >
          <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${textColor}`} />
        </button>
      </div>

      {/* Title */}
      <h3
        className={`relative text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-snug text-balance ${textColor}`}
      >
        {title}
      </h3>

      {/* Progress */}
      <div className="relative flex flex-col gap-1 sm:gap-1.5">
        <div className="flex justify-between items-center text-[10px] sm:text-xs md:text-sm">
          <span className={`opacity-80 ${textColor}`}>Progress</span>
          <span className={`font-medium ${textColor}`}>
            {completedLessons}/{totalLessons} lessons
          </span>
        </div>
        <div
          className="w-full h-1 sm:h-1.5 md:h-2 rounded-full bg-white/30"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${progressPercent}% complete`}
        >
          <div className="h-full rounded-full bg-white" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between">
        <AvatarStack count={studentCount} />
        <button className="min-h-11 max-w-[55%] rounded-lg bg-[#C6F232] px-2.5 text-[10px] font-semibold text-[#111111] transition-opacity hover:opacity-90 sm:px-3.5 sm:text-xs md:px-4 md:py-2 md:text-sm">
          {actionLabel}
        </button>
      </div>
    </article>
  )
}
