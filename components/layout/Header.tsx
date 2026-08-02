'use client'

import { useState } from 'react'
import { Search, Bell, X, Info, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'


const notifications = [
  {
    id: 1,
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    title: 'Assignment graded',
    body: 'Your Structural Analysis submission received an A.',
    time: '2 min ago',
  },
  {
    id: 2,
    icon: Info,
    iconColor: 'text-[#1E56FB]',
    title: 'New resource uploaded',
    body: 'Thermodynamics lecture notes are now available.',
    time: '1 hour ago',
  },
  {
    id: 3,
    icon: AlertCircle,
    iconColor: 'text-[#FF4D2E]',
    title: 'Class rescheduled',
    body: 'Wednesday CAD session moved to Thursday 3 PM.',
    time: '3 hours ago',
  },
  {
    id: 4,
    icon: Info,
    iconColor: 'text-[#1E56FB]',
    title: 'Weekly test reminder',
    body: 'Fluid Mechanics practice test due this Friday.',
    time: 'Yesterday',
  },
  {
    id: 5,
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    title: 'Course enrollment confirmed',
    body: 'You are now enrolled in Renewable Energy & Power Grids.',
    time: '2 days ago',
  },
]

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Floating Glassmorphism Header */}
      <header className="sticky top-4 z-30 mx-4 my-4 flex items-center justify-between gap-4 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E5E7EB] shadow-lg shadow-black/5 transition-all">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-black tracking-tight select-none flex-shrink-0">
          <span className="text-[#FF4D2E]">En</span>
          <span className="text-[#111111]">Light</span>
        </div>

        {/* Enhanced Search Input */}
        <div 
          className="flex items-center gap-2 bg-[#F4F5F7] focus-within:bg-white border border-transparent focus-within:border-[#FF4D2E]/30 rounded-full px-4 py-2 w-48 sm:w-80 md:w-96 transition-all shadow-inner" 
          role="search"
        >
          <Search size={16} className="text-[#6B7280] flex-shrink-0" />
          <input
            type="search"
            placeholder="Search courses, resources..."
            aria-label="Search courses"
            className="bg-transparent text-sm font-sans text-[#111111] placeholder:text-[#6B7280] outline-none flex-1 min-w-0"
          />
          <button
            aria-label="Submit search"
            className="w-7 h-7 bg-[#FF4D2E] text-white rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-[#FF4D2E]/40"
          >
            <Search size={13} />
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Notifications Button */}
          <button
            aria-label="Open notifications"
            onClick={() => setDrawerOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F4F5F7] hover:bg-[#E5E7EB]/60 active:scale-95 transition-all relative text-[#111111]"
          >
            <Bell size={19} className="text-[#6B7280]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF4D2E] rounded-full ring-2 ring-white" aria-hidden="true" />
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 p-1 sm:pr-3 rounded-full hover:bg-[#F4F5F7] transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] overflow-hidden flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-sm">
              <span className="text-white text-xs font-bold select-none">JM</span>
            </div>
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[#111111] group-hover:text-[#FF4D2E] transition-colors">Jordan Mitchell</span>
              <span className="text-xs text-[#6B7280]">@j_mitchell</span>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Notification Slide-Over Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out',
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Notifications"
        aria-hidden={!drawerOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#111111]">Notifications</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-[#FF4D2E]/10 text-[#FF4D2E] rounded-full">
              3 New
            </span>
          </div>
          <button
            aria-label="Close notifications"
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F4F5F7] text-[#6B7280] hover:text-[#111111] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#E5E7EB]/60">
          {notifications.map((n) => {
            const Icon = n.icon
            return (
              <div key={n.id} className="flex gap-3.5 px-6 py-4 hover:bg-[#F4F5F7]/50 transition-colors cursor-pointer">
                <div className="p-2 rounded-xl bg-[#F4F5F7] h-fit">
                  <Icon size={18} className={cn('flex-shrink-0', n.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111111]">{n.title}</p>
                  <p className="text-xs text-[#6B7280] leading-relaxed mt-0.5">{n.body}</p>
                  <p className="text-[10px] font-medium text-[#9CA3AF] mt-1.5">{n.time}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-6 py-4 border-t border-[#E5E7EB]">
          <button className="w-full py-2.5 text-sm font-semibold text-[#FF4D2E] hover:bg-[#FF4D2E]/10 rounded-xl transition-colors text-center">
            Mark all as read
          </button>
        </div>
      </aside>
    </>
  )
}