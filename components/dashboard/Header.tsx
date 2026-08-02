'use client'

import { Search, Bell } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 pt-5 pb-4">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight select-none">
        <span className="text-[#FF4D2E]">Bright</span>
        <span className="text-[#111111]">Path</span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#F4F5F7] rounded-full px-4 py-2 w-64" role="search">
        <input
          type="search"
          placeholder="Search"
          aria-label="Search courses"
          className="bg-transparent text-sm text-[#111111] placeholder:text-[#6B7280] outline-none flex-1 min-w-0"
        />
        <button
          aria-label="Submit search"
          className="w-8 h-8 bg-[#FF4D2E] rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <Search size={14} className="text-white" />
        </button>
      </div>

      {/* User area */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F4F5F7] transition-colors relative"
        >
          <Bell size={20} className="text-[#6B7280]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF4D2E] rounded-full" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#D97706] overflow-hidden flex items-center justify-center flex-shrink-0">
            {/* Avatar placeholder */}
            <span className="text-white text-sm font-semibold select-none">JM</span>
          </div>
        </div>
      </div>
    </header>
  )
}
