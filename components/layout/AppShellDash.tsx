'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/HeaderDash'

interface AppShellDashProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellDashProps) {
  return (
    <div className="flex h-[100dvh] min-h-0 max-w-full overflow-hidden bg-[#F4F5F7]">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex items-center justify-center z-20">
        {/* <Sidebar /> */}
      </div>

      {/* Main content wrapper */}
      <div className="relative flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
        {/* Floating, transparent header bar */}
        <div className="sticky top-0 z-10 w-full bg-transparent backdrop-blur-md">
          <Header />
        </div>

        {/* Scrollable content section running underneath header */}
        <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-4 pb-6 pt-20 sm:px-6 md:pt-5">
          {children}
        </main>
      </div>
    </div>
  )
}

// Export alias to prevent import errors across your project
export { AppShell as AppShellDash }