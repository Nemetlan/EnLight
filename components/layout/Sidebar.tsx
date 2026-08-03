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
      className="flex flex-col md:flex-col items-center md:w-16 md:py-3 md:my-4 md:ml-4 gap-3 md:h-fit flex-shrink-0 bg-white border md:border border-[#E5E7EB] md:rounded-3xl shadow-xl shadow-black/5 transition-all
        md:w-16 w-full h-16 flex-row md:flex-col px-2 md:px-3 py-2 md:py-3 rounded-none md:rounded-3xl"
      aria-label="Main navigation"
    >
      <div className="flex md:flex-col items-center gap-1 md:gap-1 w-full flex-1 justify-around md:justify-start px-0 md:px-3">
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
                'w-10 h-10 flex items-center justify-center rounded-xl transition-colors flex-shrink-0',
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

      <div className="hidden md:block w-8 h-[1px] bg-[#E5E7EB]" />

      <div className="flex md:flex-col items-center gap-1 md:gap-1 w-auto md:w-full px-0 md:px-3">
        <Link
          href="/settings"
          aria-label="Settings"
          title="Settings"
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-xl transition-colors flex-shrink-0',
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
          className="w-10 h-10 flex items-center justify-center rounded-xl text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#111111] transition-colors flex-shrink-0"
        >
          <LogOut size={20} />
        </Link>
      </div>
    </nav>
  )
}
