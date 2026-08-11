export interface Lesson {
  id: string
  title: string
  duration: string
  videoId: string
  completed?: boolean
}

export interface LessonCourse {
  slug: string
  title: string
  category: string
  instructor: string
  lessons: Lesson[]
}

export const lessonCourses: LessonCourse[] = [
  {
    slug: 'structural-analysis',
    title: 'Structural Analysis & Design Fundamentals',
    category: 'Civil Engineering',
    instructor: 'Dr. Maya Chen',
    lessons: [
      { id: 'intro', title: 'Introduction to Structural Analysis', duration: '12:48', videoId: 'ysz5S6PUM-U', completed: true },
      { id: 'loads', title: 'Understanding Loads and Forces', duration: '18:22', videoId: 'aqz-KE-bpKQ', completed: true },
      { id: 'equilibrium', title: 'Equilibrium and Support Reactions', duration: '21:10', videoId: 'ScMzIvxBSi4' },
      { id: 'beams', title: 'Shear Force and Bending Moments', duration: '24:06', videoId: 'M7lc1UVf-VE' },
      { id: 'design', title: 'Design Principles and Safety Factors', duration: '16:34', videoId: 'dQw4w9WgXcQ' },
    ],
  },
  {
    slug: 'thermodynamics',
    title: 'Thermodynamics & Heat Transfer Basics',
    category: 'Mechanical Engineering',
    instructor: 'Prof. Marcus Lee',
    lessons: [
      { id: 'systems', title: 'Thermodynamic Systems', duration: '15:12', videoId: 'ysz5S6PUM-U', completed: true },
      { id: 'energy', title: 'Energy, Work, and Heat', duration: '20:45', videoId: 'aqz-KE-bpKQ' },
      { id: 'entropy', title: 'Entropy and the Second Law', duration: '19:30', videoId: 'ScMzIvxBSi4' },
    ],
  },
]

export const defaultLessonCourse = lessonCourses[0]

export function courseSlugForTitle(title: string) {
  return title.toLowerCase().includes('thermodynamics') ? 'thermodynamics' : 'structural-analysis'
}

export function getLessonCourse(slug?: string) {
  return lessonCourses.find((course) => course.slug === slug) ?? defaultLessonCourse
}

export function getLesson(course: LessonCourse, lessonId?: string) {
  return course.lessons.find((lesson) => lesson.id === lessonId) ?? course.lessons[0]
}
