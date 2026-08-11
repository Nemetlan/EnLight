'use client'

export function Header() {
  return (
    <div className="fixed top-4 right-4 z-40">
      <header className="rounded-full border border-white/20 bg-white/60 p-1.5 backdrop-blur-md shadow-md">
        {/* Clean Profile Picture */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] flex items-center justify-center text-white text-xs font-bold">
          JM
        </div>
      </header>
    </div>
  )
}