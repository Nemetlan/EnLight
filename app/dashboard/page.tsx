'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { AppShell } from '@/components/layout/AppShellDash'
import { BookOpen, Plus, FileText, Calendar, Download, Settings } from 'lucide-react'

const navigationCards = [
  {
    id: 1,
    label: 'My Library',
    subtitle: 'Continue learning',
    href: '/library',
    icon: BookOpen,
    bgColor: '#1E56FB',
    accent: '#C6F232',
  },
  {
    id: 2,
    label: 'Request Catalog',
    subtitle: 'Ask for new courses',
    href: '/request-catalog',
    icon: Plus,
    bgColor: '#FF4D2E',
    accent: '#C6F232',
  },
  {
    id: 3,
    label: 'Class Diary',
    subtitle: 'Your schedule',
    href: '/diary',
    icon: Calendar,
    bgColor: '#111111',
    accent: '#C6F232',
  },
  {
    id: 4,
    label: 'Resources',
    subtitle: 'Study materials',
    href: '/resources',
    icon: Download,
    bgColor: '#C6F232',
    accent: '#111111',
  },
  {
    id: 5,
    label: 'About',
    subtitle: 'Tutor profile',
    href: '/about',
    icon: FileText,
    bgColor: '#F4F5F7',
    accent: '#111111',
  },
  {
    id: 6,
    label: 'Settings',
    subtitle: 'Preferences',
    href: '/settings',
    icon: Settings,
    bgColor: '#E5E7EB',
    accent: '#111111',
  },
]

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
    setGreeting(greet)
  }, [])

  return (
    <AppShell>
      <div className="flex w-full min-w-0 flex-col gap-6 py-4">
        
        {/* Centered Greeting Section */}
        <div className="w-full mx-auto max-w-2xl px-4 text-center flex flex-col items-center justify-center">
          <p className="text-xs uppercase tracking-wider text-[#6B7280] mb-1 font-medium">{greeting}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">Welcome back, Jordan</h1>
          <p className="text-sm text-[#6B7280] mt-1.5 max-w-md">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Navigation Grid Cards */}
        <div className="w-full mx-auto max-w-2xl px-4 flex justify-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 w-full justify-center">
            {navigationCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className="relative min-w-0 aspect-square overflow-hidden rounded-2xl flex flex-col justify-between p-3.5 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{ backgroundColor: card.bgColor }}
                >
                  {/* Line-art overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true">
                    <defs>
                      <pattern id={`grid-${card.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${card.id})`} />
                  </svg>

                  {/* Icon top */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: card.accent + '33' }}
                    >
                      <Icon size={20} style={{ color: card.accent }} />
                    </div>
                  </div>

                  {/* Title and subtitle bottom */}
                  <div className="relative z-10">
                    <p className="text-xs sm:text-sm font-semibold line-clamp-1" style={{ color: card.accent }}>
                      {card.label}
                    </p>
                    <p className="text-[11px] sm:text-xs mt-0.5 line-clamp-1" style={{ color: card.accent + 'B3' }}>
                      {card.subtitle}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </AppShell>
  )
}