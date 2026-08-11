'use client'



import { Sidebar } from '@/components/layout/Sidebar'

import { Header } from '@/components/layout/Header'



interface AppShellProps {

  children: React.ReactNode

}



export function AppShell({ children }: AppShellProps) {

  return (

    <div className="flex h-[100dvh] min-h-0 max-w-full overflow-hidden bg-[#F4F5F7]">

      <div className="hidden md:flex items-center justify-center">

        <Sidebar />

      </div>

      <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">

        <Header />

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-6 pt-24 sm:px-6 md:pt-24 items-center justify-center">
          {children}

        </main>

      </div>

    </div>

  )

}

