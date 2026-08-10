import { AppShell } from '@/components/layout/AppShell'
import { MapPin, Video, Camera, Globe, ExternalLink, GraduationCap, Star } from 'lucide-react'

const credentials = [
  'B.Eng. Civil & Structural Engineering — University of Pretoria',
  'M.Sc. Engineering Education — Wits University',
  '12+ years of industry experience (ARUP, Aurecon)',
  'Professional Engineer (Pr.Eng) — ECSA registered',
  'Published author: Engineering Fundamentals for SA Students',
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Camera, color: 'bg-[#E1306C]' },
  { label: 'YouTube', href: 'https://youtube.com', icon: Globe, color: 'bg-[#FF0000]' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: ExternalLink, color: 'bg-[#0A66C2]' },
]

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <h1 className="text-2xl font-black text-[#111111]">About the Tutor</h1>

        {/* Profile card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-[#FF4D2E] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-3xl font-black select-none">AP</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-[#111111]">Dr. Aarav Patel</h2>
            <p className="text-sm text-[#FF4D2E] font-semibold mt-0.5">Lead Engineering Tutor</p>
            <p className="text-sm text-[#6B7280] leading-relaxed mt-3">
              Dr. Aarav Patel is a seasoned engineering educator with over 12 years of industry and academic experience.
              He specialises in structural analysis, fluid mechanics, and applied thermodynamics, and has helped hundreds
              of students pass their professional engineering boards with distinction.
            </p>
            {/* Ratings */}
            <div className="flex items-center gap-1.5 mt-4">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={16} className={i <= 5 ? 'text-[#D97706] fill-[#D97706]' : 'text-[#D1D5DB]'} />
              ))}
              <span className="text-sm font-semibold text-[#111111] ml-1">5.0</span>
              <span className="text-sm text-[#6B7280]">(312 reviews)</span>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#111111]">Credentials & Qualifications</h3>
          <ul className="flex flex-col gap-2.5">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <GraduationCap size={16} className="text-[#FF4D2E] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#374151] leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Class locations */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
              <MapPin size={20} className="text-[#1E56FB]" />
            </div>
            <h3 className="text-base font-bold text-[#111111]">In-Person Classes</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Sandton Learning Centre<br />
              24 Rivonia Road, Sandton<br />
              Johannesburg, 2196<br />
              <span className="text-[#111111] font-medium">Tues & Thurs, 4–6 PM</span>
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
              <Video size={20} className="text-[#7C3AED]" />
            </div>
            <h3 className="text-base font-bold text-[#111111]">Online Classes</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Live sessions via Zoom & EnLight platform<br />
              Recordings available within 24 hours<br />
              <span className="text-[#111111] font-medium">Mon, Wed & Fri, 6–8 PM</span>
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#111111]">Connect</h3>
          <div className="flex gap-3 flex-wrap">
            {socialLinks.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold ${color} hover:opacity-85 transition-opacity`}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
