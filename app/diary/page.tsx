'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { CheckSquare, Square } from 'lucide-react'

interface LessonRow {
  day: string
  date: string
  subject: string
  topic: string
  teacher: string
  duration: string
  status?: 'completed' | 'upcoming'
}

const pastWeek: LessonRow[] = [
  { day: 'Mon', date: '21 Jul', subject: 'Structural Analysis', topic: 'Load distribution & shear force diagrams', teacher: 'Dr. A. Patel', duration: '90 min', status: 'completed' },
  { day: 'Tue', date: '22 Jul', subject: 'Thermodynamics', topic: 'Carnot cycles & entropy calculations', teacher: 'Ms. R. Singh', duration: '75 min', status: 'completed' },
  { day: 'Wed', date: '23 Jul', subject: 'Circuit Theory', topic: 'Thevenin & Norton equivalents', teacher: 'Mr. B. Okafor', duration: '80 min', status: 'completed' },
  { day: 'Thu', date: '24 Jul', subject: 'Fluid Mechanics', topic: 'Bernoulli equation & continuity', teacher: 'Dr. A. Patel', duration: '75 min', status: 'completed' },
  { day: 'Fri', date: '25 Jul', subject: 'CAD Modeling', topic: 'Assembly constraints in SolidWorks', teacher: 'Ms. P. Nkosi', duration: '90 min', status: 'completed' },
]

const currentWeek: LessonRow[] = [
  { day: 'Mon', date: '28 Jul', subject: 'Structural Analysis', topic: 'Bending moment diagrams — practice problems', teacher: 'Dr. A. Patel', duration: '90 min', status: 'completed' },
  { day: 'Tue', date: '29 Jul', subject: 'Thermodynamics', topic: 'Heat exchangers & effectiveness-NTU method', teacher: 'Ms. R. Singh', duration: '75 min', status: 'completed' },
  { day: 'Wed', date: '30 Jul', subject: 'Circuit Theory', topic: 'AC circuits & phasor analysis', teacher: 'Mr. B. Okafor', duration: '80 min', status: 'completed' },
  { day: 'Thu', date: '31 Jul', subject: 'Fluid Mechanics', topic: 'Pipe flow & friction losses', teacher: 'Dr. A. Patel', duration: '75 min', status: 'upcoming' },
  { day: 'Fri', date: '1 Aug', subject: 'CAD Modeling', topic: 'Sheet metal design & unfolding', teacher: 'Ms. P. Nkosi', duration: '90 min', status: 'upcoming' },
]

const nextWeek: LessonRow[] = [
  { day: 'Mon', date: '4 Aug', subject: 'Structural Analysis', topic: 'Column buckling & Euler\'s formula', teacher: 'Dr. A. Patel', duration: '90 min', status: 'upcoming' },
  { day: 'Tue', date: '5 Aug', subject: 'Thermodynamics', topic: 'Refrigeration cycles & COP', teacher: 'Ms. R. Singh', duration: '75 min', status: 'upcoming' },
  { day: 'Wed', date: '6 Aug', subject: 'Embedded Systems', topic: 'Interrupt service routines & timers', teacher: 'Mr. B. Okafor', duration: '80 min', status: 'upcoming' },
  { day: 'Thu', date: '7 Aug', subject: 'Fluid Mechanics', topic: 'Open channel flow & hydraulic jump', teacher: 'Dr. A. Patel', duration: '75 min', status: 'upcoming' },
  { day: 'Fri', date: '8 Aug', subject: 'Robotics', topic: 'Kinematics & inverse kinematics basics', teacher: 'Ms. P. Nkosi', duration: '90 min', status: 'upcoming' },
]

const homeworkItems = [
  { id: 1, label: 'Complete Structural Analysis problem set (Ch. 7–9)', due: '31 Jul' },
  { id: 2, label: 'Submit Thermodynamics lab report', due: '1 Aug' },
  { id: 3, label: 'Watch Circuit Theory revision video (45 min)', due: '1 Aug' },
  { id: 4, label: 'Fluid Mechanics: attempt 5 past-paper questions', due: '3 Aug' },
  { id: 5, label: 'CAD: complete gear assembly tutorial model', due: '4 Aug' },
  { id: 6, label: 'Read Embedded Systems datasheet for STM32', due: '5 Aug' },
]

function WeekTable({ rows, title, badge, badgeColor }: { rows: LessonRow[], title: string, badge: string, badgeColor: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold text-[#111111]">{title}</h2>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>{badge}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label={title}>
          <thead>
            <tr className="text-left text-xs text-[#6B7280] border-b border-[#E5E7EB]">
              <th className="pb-2.5 font-medium pr-3 whitespace-nowrap">Day</th>
              <th className="pb-2.5 font-medium pr-3 whitespace-nowrap">Date</th>
              <th className="pb-2.5 font-medium pr-3">Subject</th>
              <th className="pb-2.5 font-medium pr-3 hidden md:table-cell">Topic covered</th>
              <th className="pb-2.5 font-medium pr-3 hidden lg:table-cell whitespace-nowrap">Teacher</th>
              <th className="pb-2.5 font-medium text-right whitespace-nowrap">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {rows.map((r) => (
              <tr key={r.date + r.subject} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="py-3 pr-3 font-semibold text-[#111111]">{r.day}</td>
                <td className="py-3 pr-3 text-[#6B7280] text-xs whitespace-nowrap">{r.date}</td>
                <td className="py-3 pr-3 font-medium text-[#111111] whitespace-nowrap">{r.subject}</td>
                <td className="py-3 pr-3 text-[#6B7280] text-xs hidden md:table-cell">{r.topic}</td>
                <td className="py-3 pr-3 text-[#6B7280] text-xs hidden lg:table-cell whitespace-nowrap">{r.teacher}</td>
                <td className="py-3 text-right text-xs text-[#6B7280] whitespace-nowrap">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function DiaryPage() {
  const [checked, setChecked] = useState<number[]>([])

  const toggle = (id: number) =>
    setChecked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-black text-[#111111]">Class Diary</h1>

        <WeekTable
          rows={pastWeek}
          title="Past Week"
          badge="21–25 Jul"
          badgeColor="bg-[#F4F5F7] text-[#6B7280]"
        />
        <WeekTable
          rows={currentWeek}
          title="Current Week"
          badge="28 Jul – 1 Aug"
          badgeColor="bg-[#1E56FB] text-white"
        />
        <WeekTable
          rows={nextWeek}
          title="Next Week"
          badge="4–8 Aug"
          badgeColor="bg-[#C6F232] text-[#111111]"
        />

        {/* Weekly checklist */}
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#111111]">Weekly Homework Checklist</h2>
            <span className="text-xs text-[#6B7280]">
              {checked.length}/{homeworkItems.length} done
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {homeworkItems.map((item) => {
              const done = checked.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${done ? 'bg-[#F4F5F7]' : 'hover:bg-[#F9FAFB]'}`}
                  aria-pressed={done}
                >
                  {done
                    ? <CheckSquare size={18} className="text-[#FF4D2E] flex-shrink-0" />
                    : <Square size={18} className="text-[#9CA3AF] flex-shrink-0" />}
                  <span className={`text-sm flex-1 leading-relaxed ${done ? 'line-through text-[#9CA3AF]' : 'text-[#111111]'}`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-[#6B7280] whitespace-nowrap">Due {item.due}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
