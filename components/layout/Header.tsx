'use client'

import { useState } from 'react'
import { Search, Bell, X, Info, AlertCircle, CheckCircle2, Menu, LayoutGrid, BookOpen, BookCopy, CalendarDays, FolderDown, BookMarked, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const mobileNavItems = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'My Library', href: '/library' },
  { icon: BookCopy, label: 'Request Catalog', href: '/request-catalog' },
  { icon: CalendarDays, label: 'Class Diary', href: '/diary' },
  { icon: FolderDown, label: 'Resources', href: '/resources' },
  { icon: BookMarked, label: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Floating Header Container */}
      <div className="sticky top-3 z-50 mx-3 my-2 sm:mx-4 sm:my-3 md:top-4 md:mx-4 md:my-4">
        <header className="relative flex items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white/90 px-4 py-2.5 backdrop-blur-md shadow-md sm:px-6 md:gap-4 md:py-3">
          
          {/* Logo */}
          <div className="text-2xl sm:text-3xl font-black tracking-tight select-none flex-shrink-0">
            <span className="text-[#FF4D2E]">En</span>
            <span className="text-[#111111]">Light</span>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-[#F4F5F7] border border-transparent rounded-full px-4 py-2 w-80 md:w-96">
            <Search size={16} className="text-[#6B7280] flex-shrink-0" />
            <input
              type="search"
              placeholder="Search courses, resources..."
              className="bg-transparent text-sm text-[#111111] placeholder:text-[#6B7280] outline-none w-full"
            />
          </div>

          {/* NATIVE HTML DROPDOWN (NO JS STATE REQUIRED) */}
          <details className="relative md:hidden group">
            <summary className="list-none flex size-10 items-center justify-center rounded-xl bg-[#F4F5F7] text-[#111111] active:bg-[#E5E7EB] cursor-pointer select-none">
              <Menu size={22} className="group-open:hidden" />
              <X size={22} className="hidden group-open:block" />
            </summary>

            {/* Dropdown Menu Overlay */}
            <div className="fixed inset-x-3 top-[68px] z-50 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5E7EB]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Navigation</span>
              </div>
              <nav className="grid grid-cols-2 gap-2">
                {mobileNavItems.map(({ icon: Icon, label, href }) => {
                  const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 text-xs sm:text-sm font-semibold transition-colors',
                        active ? 'bg-[#FF4D2E] text-white' : 'text-[#111111] bg-[#F4F5F7] active:bg-[#E5E7EB]'
                      )}
                    >
                      <Icon size={18} />
                      <span className="truncate">{label}</span>
                    </Link>
                  )
                })}
                <Link href="/settings" className="flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 text-xs sm:text-sm font-semibold text-[#111111] bg-[#F4F5F7]">
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                <Link href="/login" className="flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 text-xs sm:text-sm font-semibold text-[#111111] bg-[#F4F5F7]">
                  <LogOut size={18} />
                  <span>Log out</span>
                </Link>
              </nav>
            </div>
          </details>

          {/* Desktop User Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F4F5F7] relative text-[#111111]"
            >
              <Bell size={19} className="text-[#6B7280]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF4D2E] rounded-full ring-2 ring-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] flex items-center justify-center text-white text-xs font-bold">
              JM
            </div>
          </div>
        </header>
      </div>
    </>
  )
}