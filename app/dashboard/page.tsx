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
      <div className="flex flex-col gap-6">
        {/* Greeting Section */}
        <div>
          <p className="text-microcopy text-[#6B7280] mb-1">{greeting}</p>
          <h1 className="text-xl md:text-2xl font-semibold text-[#111111]">Welcome back, Jordan</h1>
          <p className="text-xs md:text-sm text-[#6B7280] mt-2">Ready to continue your learning journey?</p>
        </div>

        {/* Navigation Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {navigationCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.id}
                href={card.href}
                className="relative overflow-hidden rounded-xl md:rounded-2xl h-32 md:h-40 flex flex-col justify-between p-3 md:p-5 transition-shadow hover:shadow-md"
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

                {/* Icon and label top */}
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className="w-7 md:w-9 h-7 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: card.accent + '33' }}
                  >
                    <Icon size={14} className="md:w-[18px] md:h-[18px]" style={{ color: card.accent }} />
                  </div>
                </div>

                {/* Title and subtitle bottom */}
                <div className="relative z-10">
                  <p className="text-xs md:text-sm font-semibold" style={{ color: card.accent }}>
                    {card.label}
                  </p>
                  <p className="text-[10px] md:text-xs mt-0.5" style={{ color: card.accent + 'B3' }}>
                    {card.subtitle}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
