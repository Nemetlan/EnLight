'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

// Simple SVG Google Icon component
function GoogleIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Slimmer Square Login Card */}
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-xs sm:max-w-sm sm:aspect-square p-5 sm:p-7 flex flex-col justify-between border border-[#E5E7EB]/60">

        {/* Header / Logo */}
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-black tracking-tight select-none">
            <span className="text-[#FF4D2E]">En</span>
            <span className="text-[#111111]">Light</span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#6B7280] mt-0.5 font-medium">
            Sign in to continue learning
          </p>
        </div>

        {/* Form Body */}
        <form className="flex flex-col gap-2.5 my-auto" onSubmit={(e) => e.preventDefault()}>
          {/* Google Login Button */}
          <button
            type="button"
            className="w-full py-2 sm:py-2.5 px-3 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111111] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-0.5">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider"
              htmlFor="login-email"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:bg-white focus:border-[#FF4D2E] transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider"
                htmlFor="login-password"
              >
                Password
              </label>
              <button
                type="button"
                className="text-[10px] font-semibold text-[#FF4D2E] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full px-3 py-1.5 sm:py-2 pr-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111111] outline-none focus:bg-white focus:border-[#FF4D2E] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-2.5 bg-[#FF4D2E] text-white text-xs font-bold rounded-xl hover:bg-[#E03E21] active:scale-[0.99] transition-all shadow-md shadow-[#FF4D2E]/20 mt-0.5"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="pt-1">
          <p className="text-center text-[11px] sm:text-xs text-[#6B7280]">
            {"Don't have an account? "}
            <Link href="/dashboard" className="font-semibold text-[#FF4D2E] hover:underline">
              Contact your tutor
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}