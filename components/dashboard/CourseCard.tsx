'use client'

import { Bookmark } from 'lucide-react'

interface CourseCardProps {
  category: string
  title: string
  progress: number
  totalLessons: number
  completedLessons: number
  studentCount: number
  bgColor: string
  textColor: string
  tagBg: string
  tagText: string
}

function AvatarStack({ count }: { count: number }) {
  const colors = ['bg-[#F97316]', 'bg-[#3B82F6]', 'bg-[#EC4899]', 'bg-[#10B981]']
  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-2">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-full ${color} border-2 border-white/30 flex items-center justify-center`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-xs font-medium opacity-90 ml-1">+{count}</span>
    </div>
  )
}

export function CourseCard({
  category,
  title,
  progress,
  totalLessons,
  completedLessons,
  studentCount,
  bgColor,
  textColor,
  tagBg,
  tagText,
}: CourseCardProps) {
  const progressPercent = Math.round((completedLessons / totalLessons) * 100)

  return (
    <article
      className={`rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden ${bgColor}`}
      aria-label={`${title} course`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagBg} ${tagText}`}
        >
          {category}
        </span>
        <button
          aria-label={`Bookmark ${title}`}
          className="opacity-80 hover:opacity-100 transition-opacity"
        >
          <Bookmark size={18} className={textColor} />
        </button>
      </div>

      {/* Title */}
      <h3 className={`text-lg font-bold leading-snug text-balance ${textColor}`}>
        {title}
      </h3>

      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className={`text-xs opacity-80 ${textColor}`}>Progress</span>
          <span className={`text-xs font-medium ${textColor}`}>
            {completedLessons}/{totalLessons} lessons
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/30" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <AvatarStack count={studentCount} />
        <button className="bg-[#C6F232] text-[#111111] text-sm font-semibold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
          Continue
        </button>
      </div>
    </article>
  )
}
