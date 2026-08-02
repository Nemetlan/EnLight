'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  BookOpen,
  BookMarked,
  CalendarDays,
  FolderDown,
  BookCopy,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'My Library', href: '/library' },
  { icon: BookCopy, label: 'Request Catalog', href: '/request-catalog' },
  { icon: CalendarDays, label: 'Class Diary', href: '/diary' },
  { icon: FolderDown, label: 'Resources', href: '/resources' },
  { icon: BookMarked, label: 'About', href: '/about' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav
      className="flex flex-col items-center w-16 py-3 my-4 ml-4 gap-3 h-fit flex-shrink-0 bg-white border border-[#E5E7EB] rounded-3xl shadow-xl shadow-black/5 transition-all"
      aria-label="Main navigation"
    >
      <div className="flex flex-col items-center gap-1 w-full px-3">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              title={label}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-xl transition-colors',
                active
                  ? 'bg-[#FF4D2E] text-white shadow-md shadow-[#FF4D2E]/20'
                  : 'text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#111111]'
              )}
            >
              <Icon size={20} />
            </Link>
          )
        })}
      </div>

      <div className="w-8 h-[1px] bg-[#E5E7EB]" />

      <div className="flex flex-col items-center gap-1 w-full px-3">
        <Link
          href="/settings"
          aria-label="Settings"
          title="Settings"
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-xl transition-colors',
            pathname === '/settings'
              ? 'bg-[#FF4D2E] text-white shadow-md shadow-[#FF4D2E]/20'
              : 'text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#111111]'
          )}
        >
          <Settings size={20} />
        </Link>
        <Link
          href="/login"
          aria-label="Log out"
          title="Log out"
          className="w-10 h-10 flex items-center justify-center rounded-xl text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#111111] transition-colors"
        >
          <LogOut size={20} />
        </Link>
      </div>
    </nav>
  )
}