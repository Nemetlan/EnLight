'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { CourseCard } from '@/components/shared/CourseCard'
import { courses, courseCategories } from '@/lib/courses'

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? courses
    : courses.filter((c) => c.category === activeCategory)

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        {/* Page title + filters */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl sm:text-1xl md:text-2xl lg:text-3xl font-black text-[#111111]">My Library</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Access your saved courses and track ongoing progress</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Course categories">
            {courseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${activeCategory === cat
                  ? 'bg-[#1E56FB] text-white border-[#1E56FB]'
                  : 'bg-white text-[#111111] border-[#E5E7EB] hover:border-[#1E56FB] hover:text-[#1E56FB]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((course) => (
            <CourseCard
              key={course.title}
              {...course}
              actionLabel="Continue Lesson"
            />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
