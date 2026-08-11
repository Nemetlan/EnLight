'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronLeft, Clock3, ListVideo, Play, UserRound } from 'lucide-react'
import { getLessonCourse, getLesson, type LessonCourse } from '@/lib/lessons'

function decodeVideoId(encodedId: string) {
  try {
    return atob(encodedId)
  } catch {
    return encodedId
  }
}

function LessonList({ course, activeId }: { course: LessonCourse; activeId: string }) {
  return (
    <aside className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm" aria-label="Course playlist">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]"><ListVideo size={15} /> Playlist</p>
          <p className="mt-1 text-sm font-bold text-[#111111]">{course.lessons.length} lessons</p>
        </div>
        <span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-xs font-bold text-[#1E56FB]">{course.lessons.filter((lesson) => lesson.completed).length} done</span>
      </div>
      <div className="min-h-0 max-h-[calc(100vh-220px)] overflow-y-auto p-2">
        {course.lessons.map((lesson, index) => {
          const active = lesson.id === activeId
          return (
            <Link
              key={lesson.id}
              href={`/lesson?course=${course.slug}&lesson=${lesson.id}`}
              scroll={false}
              className={`flex min-h-16 w-full items-center gap-3 rounded-3xl px-3 py-3 text-left transition-colors ${active ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F4F5F7]'}`}
              aria-current={active ? 'true' : undefined}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active ? 'bg-[#C6F232] text-[#111111]' : 'bg-[#F4F5F7] text-[#6B7280]'}`}>{lesson.completed ? <Check size={15} /> : index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{lesson.title}</span>
                <span className={`mt-1 flex items-center gap-1 text-xs ${active ? 'text-white/70' : 'text-[#6B7280]'}`}><Clock3 size={12} /> {lesson.duration}</span>
              </span>
              {active && <Play size={15} fill="currentColor" />}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

const tabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'resources', label: 'Resources & Downloads' },
  { id: 'discussion', label: 'Discussion / Q&A' },
]

export function LessonPlayer({ courseSlug, lessonId }: { courseSlug?: string; lessonId?: string }) {
  const course = getLessonCourse(courseSlug)
  const lesson = getLesson(course, lessonId)
  const currentIndex = course.lessons.findIndex((item) => item.id === lesson.id)
  const [activeTab, setActiveTab] = useState('overview')

  const decodedId = useMemo(() => decodeVideoId(lesson.videoIdEncoded), [lesson.videoIdEncoded])
  const videoSrc = useMemo(
    () => decodedId
      ? `https://www.youtube-nocookie.com/embed/${decodedId}?controls=1&modestbranding=1&rel=0`
      : '',
    [decodedId]
  )

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]">{course.category}</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-[#111111] sm:text-3xl">{course.title}</h1>
        </div>
        <a href="/library" className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111111] shadow-sm transition hover:bg-[#F4F5F7]"> <ChevronLeft size={18} /> Back to library</a>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
        <section className="lg:col-span-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#111111] shadow-xl">
            <div className="aspect-[16/9] bg-[#111111]">
              <iframe
                key={decodedId}
                className="h-full w-full"
                src={videoSrc}
                title={lesson.title}
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF4D2E]">Lesson {currentIndex + 1}</p>
                <h2 className="mt-3 text-2xl font-black text-[#111111] sm:text-3xl">{lesson.title}</h2>
              </div>
              <div className="rounded-full bg-[#F4F5F7] px-4 py-2 text-sm font-semibold text-[#475569]">{lesson.duration}</div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-2 text-[#334155]"><UserRound size={16} /> {course.instructor}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF9F3] px-3 py-2 text-[#0F766E]">{course.lessons.filter((lesson) => lesson.completed).length}/{course.lessons.length} completed</span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-2 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] p-1">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab.id ? 'bg-[#111111] text-white shadow-sm' : 'text-[#475569] hover:bg-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-5 text-sm leading-7 text-[#475569]">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-[#111111]">Lesson overview</p>
                  <p>This lesson walks you through the core concepts with a cinematic video experience, clean learning cards, and a structured playlist so you can move through each topic with confidence.</p>
                  <ul className="space-y-3 text-[#475569]">
                    <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#111111]" /> Clear, focused explanations for each step</li>
                    <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#111111]" /> Privacy-first video loading and minimal external branding</li>
                    <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#111111]" /> Clean progress tracking across your playlist</li>
                  </ul>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-[#111111]">Resources & downloads</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                      <p className="text-sm font-semibold text-[#111111]">Course notes</p>
                      <p className="mt-2 text-sm text-[#475569]">Download the PDF summary and revisit the framework whenever you need it.</p>
                    </div>
                    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                      <p className="text-sm font-semibold text-[#111111]">Project files</p>
                      <p className="mt-2 text-sm text-[#475569]">Access templates, diagrams, and worksheets for hands-on practice.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-[#111111]">Discussion / Q&A</p>
                  <p>Ask questions, share reflections, and keep the conversation focused on the lesson. This space is designed to keep learners connected without distracting from the video experience.</p>
                  <div className="rounded-2xl border border-[#E5E7EB] bg-[#F4F5F7] p-4">
                    <p className="text-sm font-semibold text-[#111111]">Next prompt</p>
                    <p className="mt-2 text-sm text-[#475569]">How would you apply these structural principles to an everyday design problem?</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="lg:col-span-4">
          <LessonList course={course} activeId={lesson.id} />
        </div>
      </div>
    </div>
  )
}