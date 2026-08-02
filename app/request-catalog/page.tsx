'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { CourseCard } from '@/components/shared/CourseCard'
import { courses, courseCategories } from '@/lib/courses'

// Catalog includes additional courses not yet enrolled
const catalogExtras = [
  {
    category: 'Civil',
    title: 'Advanced Concrete Technology',
    completedLessons: 0,
    totalLessons: 20,
    studentCount: 58,
    bgColor: 'bg-[#475569]',
    textColor: 'text-white',
    tagBg: 'bg-[#1E293B]',
    tagText: 'text-white',
  },
  {
    category: 'Mechanical',
    title: 'Engineering Materials & Metallurgy',
    completedLessons: 0,
    totalLessons: 22,
    studentCount: 93,
    bgColor: 'bg-[#0E7490]',
    textColor: 'text-white',
    tagBg: 'bg-[#164E63]',
    tagText: 'text-white',
  },
  {
    category: 'Electrical',
    title: 'Power Electronics & Drives',
    completedLessons: 0,
    totalLessons: 26,
    studentCount: 141,
    bgColor: 'bg-[#BE185D]',
    textColor: 'text-white',
    tagBg: 'bg-[#831843]',
    tagText: 'text-white',
  },
  {
    category: 'Other',
    title: 'Technical Writing & Communication',
    completedLessons: 0,
    totalLessons: 12,
    studentCount: 210,
    bgColor: 'bg-[#92400E]',
    textColor: 'text-white',
    tagBg: 'bg-[#451A03]',
    tagText: 'text-white',
  },
]

const allCatalogCourses = [...courses, ...catalogExtras]
const allCategories = ['All', 'Civil', 'Mechanical', 'Electrical', 'Other']

export default function RequestCatalogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? allCatalogCourses
    : allCatalogCourses.filter((c) => c.category === activeCategory)

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        {/* Page title + filters */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#111111]">Request Catalog</p>
            <p className="text-sm text-[#6B7280] mt-0.5">Browse available courses and request enrolment</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Course categories">
            {allCategories.map((cat) => (
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
              actionLabel="Request Course"
            />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
