'use client'

const avatarColors = ['bg-[#EC4899]', 'bg-[#3B82F6]', 'bg-[#10B981]', 'bg-[#F97316]']

export function RecommendedCard() {
  return (
    <section
      className="bg-[#C6F232] rounded-2xl p-5 flex flex-col gap-4"
      aria-label="Recommended course"
    >
      <p className="text-sm text-[#374151]">New course matching your interests</p>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold bg-[#111111] text-white px-2.5 py-1 rounded-full w-fit">
          Design
        </span>
        <h2 className="text-2xl font-extrabold text-[#111111] leading-tight text-balance">
          Advanced Typography for Digital Products
        </h2>
      </div>

      {/* Social proof */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-[#374151]">They are already studying</p>
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {avatarColors.map((color, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${color} border-2 border-[#C6F232] flex items-center justify-center`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-[#111111] ml-2 bg-white/50 rounded-full px-2 py-0.5">
            +100
          </span>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full bg-[#FF4D2E] text-white font-semibold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity mt-auto">
        More details
      </button>
    </section>
  )
}
