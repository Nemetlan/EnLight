import { createClient } from '@/lib/supabase/server'
import type { Course, HomeworkItem, Lesson, Profile, Resource, ClassSession } from '@/types/database'

export async function getCurrentUser() {
  const supabase = await createClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
  return data as Profile | null
}

export async function getPublishedCourses(): Promise<Course[]> {
  const supabase = await createClient() as any
  const { data, error } = await supabase.from('courses').select('*').eq('is_published', true).order('title')
  if (error) throw new Error('Unable to load courses')
  return (data ?? []) as Course[]
}

export async function getCourseWithLessons(slug: string) {
  const supabase = await createClient() as any
  const { data: course, error } = await supabase.from('courses').select('*').eq('slug', slug).maybeSingle()
  if (error) throw new Error('Unable to load course')
  if (!course) return null
  const { data: lessons } = await supabase.from('lessons').select('*').eq('course_id', course.id).order('order_index')
  return { course: course as Course, lessons: (lessons ?? []) as Lesson[] }
}

export async function getStudentResources(): Promise<Resource[]> {
  const supabase = await createClient() as any
  const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: false })
  if (error) throw new Error('Unable to load resources')
  return (data ?? []) as Resource[]
}

export async function getStudentSchedule() {
  const supabase = await createClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { sessions: [] as ClassSession[], homework: [] as HomeworkItem[] }
  const [{ data: sessions }, { data: homework }] = await Promise.all([
    supabase.from('class_sessions').select('*').eq('student_id', user.id).order('session_date'),
    supabase.from('homework_items').select('*').eq('student_id', user.id).order('due_date'),
  ])
  return { sessions: (sessions ?? []) as ClassSession[], homework: (homework ?? []) as HomeworkItem[] }
}

export async function updateHomework(id: string, completed: boolean) {
  const supabase = await createClient() as any
  const { error } = await supabase.from('homework_items').update({ completed, completed_at: completed ? new Date().toISOString() : null }).eq('id', id)
  if (error) throw new Error('Unable to update homework')
}

export async function saveLessonProgress(lessonId: string, watchSeconds: number, completed = false) {
  const supabase = await createClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Authentication required')
  const { error } = await supabase.from('lesson_progress').upsert({ student_id: user.id, lesson_id: lessonId, watch_seconds: Math.max(0, Math.floor(watchSeconds)), completed, completed_at: completed ? new Date().toISOString() : null, updated_at: new Date().toISOString() }, { onConflict: 'student_id,lesson_id' })
  if (error) throw new Error('Unable to save lesson progress')
}
