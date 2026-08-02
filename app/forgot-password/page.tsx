'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-xs sm:max-w-sm sm:aspect-square p-5 sm:p-7 flex flex-col justify-between border border-[#E5E7EB]/60">
        {/* Header / Logo */}
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-black tracking-tight select-none">
            <span className="text-[#FF4D2E]">En</span>
            <span className="text-[#111111]">Light</span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#6B7280] mt-0.5 font-medium">
            {submitted ? 'Check your email' : 'Reset your password'}
          </p>
        </div>

        {/* Form Body */}
        {!submitted ? (
          <form className="flex flex-col gap-2.5 my-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider" htmlFor="reset-email">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full px-3 py-1.5 sm:py-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:bg-white focus:border-[#FF4D2E] transition-all"
              />
            </div>

            <p className="text-[11px] text-[#6B7280] leading-relaxed">
              We&apos;ll send you a link to reset your password. Check your email shortly.
            </p>

            <button
              type="submit"
              className="w-full py-2 sm:py-2.5 bg-[#FF4D2E] text-white text-xs font-bold rounded-xl hover:bg-[#E03E21] active:scale-[0.99] transition-all shadow-md shadow-[#FF4D2E]/20 mt-1"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-3 my-auto text-center">
            <div className="text-4xl">✓</div>
            <p className="text-[13px] text-[#111111] font-semibold">
              Password reset link sent!
            </p>
            <p className="text-[12px] text-[#6B7280] leading-relaxed">
              We&apos;ve sent a reset link to your email. Check your inbox and follow the instructions to reset your password.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-1">
          <Link
            href="/login"
            className="flex items-center justify-center gap-1 text-center text-[11px] sm:text-xs text-[#FF4D2E] font-semibold hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
