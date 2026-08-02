'use client'

const lessons = [
  {
    title: 'Introduction to UX Principles',
    subtitle: 'Foundations of user-centered design',
    teacher: 'Alex Chen',
    duration: '20 min',
    teacherColor: 'bg-[#DC2626]',
  },
  {
    title: 'Color Theory in Digital Design',
    subtitle: 'Understanding palettes and contrasts',
    teacher: 'Mia Roberts',
    duration: '25 min',
    teacherColor: 'bg-[#7C3AED]',
  },
  {
    title: 'Basics of Financial Forecasting',
    subtitle: 'Planning budgets with real data',
    teacher: 'Priya Kapoor',
    duration: '22 min',
    teacherColor: 'bg-[#D97706]',
  },
  {
    title: 'Building a Pitch Deck',
    subtitle: 'Crafting presentations that win investors',
    teacher: 'Samuel Wright',
    duration: '28 min',
    teacherColor: 'bg-[#4B5563]',
  },
  {
    title: 'Spanish Greetings for Travelers',
    subtitle: 'Essential phrases for your first trip',
    teacher: 'Diego Martínez',
    duration: '18 min',
    teacherColor: 'bg-[#0891B2]',
  },
]

function TeacherInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('')
}

export function LessonsTable() {
  return (
    <section className="bg-[#F4F5F7] rounded-2xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#111111]">My next lessons</h2>
        <button className="text-sm font-medium text-[#FF4D2E] hover:underline">
          View all lessons
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Upcoming lessons">
          <thead>
            <tr className="text-left text-xs text-[#6B7280] border-b border-[#E5E7EB]">
              <th className="pb-2 font-medium w-1/2">Lesson</th>
              <th className="pb-2 font-medium">Teacher</th>
              <th className="pb-2 font-medium text-right">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {lessons.map((lesson) => (
              <tr key={lesson.title} className="hover:bg-white/60 transition-colors">
                <td className="py-3 pr-4">
                  <p className="font-semibold text-[#111111]">{lesson.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{lesson.subtitle}</p>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full ${lesson.teacherColor} flex items-center justify-center flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <span className="text-white text-xs font-semibold">
                        {TeacherInitials(lesson.teacher)}
                      </span>
                    </div>
                    <span className="text-[#111111] font-medium whitespace-nowrap">{lesson.teacher}</span>
                  </div>
                </td>
                <td className="py-3 text-right text-[#6B7280] font-medium whitespace-nowrap">
                  {lesson.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
