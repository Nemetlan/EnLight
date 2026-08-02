'use client'

import { LayoutGrid, FolderOpen, PenLine, Video, BookOpen, Bookmark, Headphones, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const topNavItems = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: FolderOpen, label: 'My Courses', active: true },
  { icon: Video, label: 'Schedule' },
  { icon: PenLine, label: 'Assignments' },
  { icon: BookOpen, label: 'Resources' },
  { icon: Bookmark, label: 'Saved' },
]

const bottomNavItems = [
  { icon: Headphones, label: 'Support' },
  { icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  return (
    <nav
      className="flex flex-col items-center w-16 py-5 gap-1 flex-shrink-0 overflow-hidden"
      aria-label="Main navigation"
    >
      <div className="flex flex-col items-center gap-1 flex-1">
        {topNavItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-xl transition-colors',
              active
                ? 'bg-[#FF4D2E] text-white'
                : 'text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#111111]'
            )}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 mt-auto">
        {bottomNavItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#111111] transition-colors"
          >
            <Icon size={20} />
          </button>
        ))}
        <button
          aria-label="Log out"
          className="w-10 h-10 flex items-center justify-center rounded-xl text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#111111] transition-colors mt-2"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  )
}
