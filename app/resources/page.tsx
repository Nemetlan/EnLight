'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { FileText, Headphones, ClipboardList, Download } from 'lucide-react'

type Category = 'All' | 'Notes' | 'Audio' | 'Tests'

interface Resource {
  id: number
  name: string
  subject: string
  category: 'Notes' | 'Audio' | 'Tests'
  size: string
  date: string
}

const resources: Resource[] = [
  { id: 1, name: 'Structural Analysis – Ch. 1–4 Summary Notes', subject: 'Structural Analysis', category: 'Notes', size: '2.1 MB', date: '30 Jul 2026' },
  { id: 2, name: 'Thermodynamics – Full Lecture Notes Semester 2', subject: 'Thermodynamics', category: 'Notes', size: '5.4 MB', date: '28 Jul 2026' },
  { id: 3, name: 'Circuit Theory – Key Formulae Reference Sheet', subject: 'Circuit Theory', category: 'Notes', size: '0.8 MB', date: '25 Jul 2026' },
  { id: 4, name: 'Fluid Mechanics – Bernoulli & Flow Diagrams', subject: 'Fluid Mechanics', category: 'Notes', size: '1.7 MB', date: '22 Jul 2026' },
  { id: 5, name: 'Geotechnical – Soil Classification Charts', subject: 'Geotechnical Engineering', category: 'Notes', size: '3.2 MB', date: '19 Jul 2026' },
  { id: 6, name: 'Structural Analysis – Revision Audio Tune', subject: 'Structural Analysis', category: 'Audio', size: '18 MB', date: '29 Jul 2026' },
  { id: 7, name: 'Thermodynamics – Key Concepts Audio Summary', subject: 'Thermodynamics', category: 'Audio', size: '22 MB', date: '27 Jul 2026' },
  { id: 8, name: 'Circuit Theory – Phasor Analysis Audio Guide', subject: 'Circuit Theory', category: 'Audio', size: '14 MB', date: '23 Jul 2026' },
  { id: 9, name: 'Fluid Mechanics – Weekly Practice Test #5', subject: 'Fluid Mechanics', category: 'Tests', size: '1.1 MB', date: '1 Aug 2026' },
  { id: 10, name: 'Structural Analysis – Mid-Semester Practice Paper', subject: 'Structural Analysis', category: 'Tests', size: '1.4 MB', date: '31 Jul 2026' },
  { id: 11, name: 'Thermodynamics – Chapter 6 Quiz', subject: 'Thermodynamics', category: 'Tests', size: '0.6 MB', date: '28 Jul 2026' },
  { id: 12, name: 'Embedded Systems – MCQ Test Sheet Week 3', subject: 'Embedded Systems', category: 'Tests', size: '0.9 MB', date: '25 Jul 2026' },
]

const categoryConfig: Record<Exclude<Category, 'All'>, { icon: typeof FileText, color: string, bg: string }> = {
  Notes: { icon: FileText, color: 'text-[#1E56FB]', bg: 'bg-[#EEF2FF]' },
  Audio: { icon: Headphones, color: 'text-[#7C3AED]', bg: 'bg-[#F5F3FF]' },
  Tests: { icon: ClipboardList, color: 'text-[#FF4D2E]', bg: 'bg-[#FFF1EE]' },
}

const filters: Category[] = ['All', 'Notes', 'Audio', 'Tests']

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')

  const filtered = activeFilter === 'All'
    ? resources
    : resources.filter((r) => r.category === activeFilter)

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-[#111111]">Resource Library</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Download class materials, audio guides, and practice tests</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto" role="group" aria-label="Resource categories">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className={`min-h-11 text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full border transition-colors ${
                  activeFilter === f
                    ? 'bg-[#FF4D2E] text-white border-[#FF4D2E]'
                    : 'bg-white text-[#111111] border-[#E5E7EB] hover:border-[#FF4D2E] hover:text-[#FF4D2E]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Resource grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filtered.map((r) => {
            const cfg = categoryConfig[r.category]
            const Icon = cfg.icon
            return (
              <div
                key={r.id}
                className="min-w-0 bg-white rounded-2xl p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`size-9 sm:size-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111111] leading-snug">{r.name}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{r.subject}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#9CA3AF]">{r.size} · {r.date}</span>
                    <span className={`text-xs font-semibold ${cfg.color}`}>{r.category}</span>
                  </div>
                  <button
                    aria-label={`Download ${r.name}`}
                    className="flex min-h-11 items-center gap-1.5 rounded-xl bg-[#111111] px-3 text-xs font-semibold text-white transition-opacity hover:opacity-80 sm:px-3.5"
                  >
                    <Download size={13} />
                    Download
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
