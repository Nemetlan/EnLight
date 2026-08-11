import { Suspense } from 'react'
import { LessonPlayer } from '@/components/lesson/LessonPlayer'

export default async function LessonPage({ searchParams }: { searchParams: Promise<{ course?: string; lesson?: string }> }) {
  const params = await searchParams

  return (
    <main className="min-h-screen bg-[#F4F5F7]">
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8 text-sm text-[#6B7280]">Loading lesson…</div>}>
        <LessonPlayer courseSlug={params.course} lessonId={params.lesson} />
      </Suspense>
    </main>
  )
}
