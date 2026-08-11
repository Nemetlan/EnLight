'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Check, ChevronLeft, Clock3, ListVideo, Play, UserRound } from 'lucide-react'
import { getLessonCourse, getLesson, type LessonCourse } from '@/lib/lessons'

function LessonList({ course, activeId }: { course: LessonCourse; activeId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function selectLesson(id: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('course', course.slug)
    params.set('lesson', id)
    router.push(`/lesson?${params.toString()}`, { scroll: false })
  }

  return (
    <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white" aria-label="Course playlist">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]"><ListVideo size={15} /> Playlist</p>
          <p className="mt-1 text-sm font-bold text-[#111111]">{course.lessons.length} lessons</p>
        </div>
        <span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-xs font-bold text-[#1E56FB]">{course.lessons.filter((lesson) => lesson.completed).length} done</span>
      </div>
      <div className="min-h-0 overflow-y-auto p-2">
        {course.lessons.map((lesson, index) => {
          const active = lesson.id === activeId
          return (
            <button key={lesson.id} type="button" onClick={() => selectLesson(lesson.id)} aria-current={active ? 'true' : undefined} className={`flex min-h-16 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${active ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F4F5F7]'}`}>
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active ? 'bg-[#C6F232] text-[#111111]' : 'bg-[#F4F5F7] text-[#6B7280]'}`}>{lesson.completed ? <Check size={15} /> : index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{lesson.title}</span>
                <span className={`mt-1 flex items-center gap-1 text-xs ${active ? 'text-white/70' : 'text-[#6B7280]'}`}><Clock3 size={12} /> {lesson.duration}</span>
              </span>
              {active && <Play size={15} fill="currentColor" />}
            </button>
          )
        })}
      </div>
    </aside>
  )
}

export function LessonPlayer({ courseSlug, lessonId }: { courseSlug?: string; lessonId?: string }) {
  const course = getLessonCourse(courseSlug)
  const lesson = getLesson(course, lessonId)
  const currentIndex = course.lessons.findIndex((item) => item.id === lesson.id)

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex items-center gap-3">
        <a href="/library" className="flex size-11 items-center justify-center rounded-xl bg-white text-[#111111] shadow-sm ring-1 ring-[#E5E7EB] transition-colors hover:bg-[#F4F5F7]" aria-label="Back to library"><ChevronLeft size={20} /></a>
        <div className="min-w-0"><p className="truncate text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]">{course.category}</p><h1 className="truncate text-lg font-black text-[#111111] sm:text-2xl">{course.title}</h1></div>
      </div>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <section className="min-w-0">
          <div className="aspect-video overflow-hidden rounded-2xl bg-[#111111] shadow-xl">
            <iframe className="size-full" src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0&modestbranding=1`} title={lesson.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
          <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF4D2E]">Lesson {currentIndex + 1}</p><h2 className="mt-1 text-xl font-black text-[#111111] sm:text-2xl">{lesson.title}</h2></div><span className="flex items-center gap-1.5 text-sm text-[#6B7280]"><Clock3 size={15} /> {lesson.duration}</span></div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#6B7280]"><UserRound size={16} /> {course.instructor}</div>
          </div>
        </section>
        <LessonList course={course} activeId={lesson.id} />
      </div>
    </div>
  )
}
