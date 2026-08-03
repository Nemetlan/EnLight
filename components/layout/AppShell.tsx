'use client'



import { Sidebar } from '@/components/layout/Sidebar'

import { Header } from '@/components/layout/Header'



interface AppShellProps {

  children: React.ReactNode

}



export function AppShell({ children }: AppShellProps) {

  return (

    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] flex-col md:flex-row">

      <div className="hidden md:flex md:items-center md:justify-center">

        <Sidebar />

      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden min-h-0">

        <Header />

        <main className="flex-1 overflow-y-auto px-4 md:px-6 pb-20 md:pb-6 pt-2 md:pt-2 min-h-0">

          {children}

        </main>

      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">

        <Sidebar />

      </div>

    </div>

  )

}

