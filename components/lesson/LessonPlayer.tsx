'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Check,
  ChevronLeft,
  Clock3,
  ListVideo,
  Play,
  Pause,
  UserRound,
  Volume2,
  VolumeX,
  Maximize
} from 'lucide-react'
import { getLessonCourse, getLesson, type LessonCourse } from '@/lib/lessons'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

function decodeVideoId(encodedId: string) {
  try {
    return atob(encodedId)
  } catch {
    return encodedId
  }
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
}

function LessonList({ course, activeId }: { course: LessonCourse; activeId: string }) {
  return (
    <aside
      className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm"
      aria-label="Course playlist"
    >
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]">
            <ListVideo size={15} /> Playlist
          </p>
          <p className="mt-1 text-sm font-bold text-[#111111]">{course.lessons.length} lessons</p>
        </div>
        <span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-xs font-bold text-[#1E56FB]">
          {course.lessons.filter((lesson) => lesson.completed).length} done
        </span>
      </div>
      <div className="min-h-0 max-h-[calc(100vh-220px)] overflow-y-auto p-2">
        {course.lessons.map((lesson, index) => {
          const active = lesson.id === activeId
          return (
            <Link
              key={lesson.id}
              href={`/lesson?course=${course.slug}&lesson=${lesson.id}`}
              scroll={false}
              className={`flex min-h-16 w-full items-center gap-3 rounded-3xl px-3 py-3 text-left transition-colors ${
                active ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F4F5F7]'
              }`}
              aria-current={active ? 'true' : undefined}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  active ? 'bg-[#C6F232] text-[#111111]' : 'bg-[#F4F5F7] text-[#6B7280]'
                }`}
              >
                {lesson.completed ? <Check size={15} /> : index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{lesson.title}</span>
                <span
                  className={`mt-1 flex items-center gap-1 text-xs ${
                    active ? 'text-white/70' : 'text-[#6B7280]'
                  }`}
                >
                  <Clock3 size={12} /> {lesson.duration}
                </span>
              </span>
              {active && <Play size={15} fill="currentColor" />}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

const tabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'resources', label: 'Resources & Downloads' },
  { id: 'discussion', label: 'Discussion / Q&A' },
]

export function LessonPlayer({ courseSlug, lessonId }: { courseSlug?: string; lessonId?: string }) {
  const course = getLessonCourse(courseSlug)
  const lesson = getLesson(course, lessonId)
  const currentIndex = course.lessons.findIndex((item) => item.id === lesson.id)
  const [activeTab, setActiveTab] = useState('overview')

  const playerRef = useRef<any>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const videoElementRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const decodedId = useMemo(() => decodeVideoId(lesson.videoIdEncoded), [lesson.videoIdEncoded])

  // Initialize YT Player API cleanly on a target DIV
  useEffect(() => {
    if (!decodedId) return

    const createPlayer = () => {
      if (!videoElementRef.current || !window.YT || !window.YT.Player) return

      // Destroy previous instance on video change
      if (playerRef.current?.destroy) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player(videoElementRef.current, {
        videoId: decodedId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration() || 0)
            if (typeof event.target.setPlaybackRate === 'function') {
              event.target.setPlaybackRate(playbackRate)
            }
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true)
            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false)
            if (event.data === window.YT.PlayerState.ENDED) setIsPlaying(false)
          },
        },
      })
    }

    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      window.onYouTubeIframeAPIReady = createPlayer
      document.body.appendChild(tag)
    } else {
      createPlayer()
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [decodedId])

  // Time progress synchronization ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const time = playerRef.current.getCurrentTime()
        setCurrentTime(time || 0)
        if (!duration && typeof playerRef.current.getDuration === 'function') {
          setDuration(playerRef.current.getDuration())
        }
      }
    }, 500)

    return () => clearInterval(interval)
  }, [duration])

  // Actions
  const togglePlay = () => {
    if (!playerRef.current) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const toggleMute = () => {
    if (!playerRef.current) return
    if (isMuted) {
      playerRef.current.unMute()
      setIsMuted(false)
    } else {
      playerRef.current.mute()
      setIsMuted(true)
    }
  }

  const handlePlaybackRate = (rate: number) => {
    if (!playerRef.current || typeof playerRef.current.setPlaybackRate !== 'function') return
    playerRef.current.setPlaybackRate(rate)
    setPlaybackRate(rate)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekToTime = parseFloat(e.target.value)
    setCurrentTime(seekToTime)
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(seekToTime, true)
    }
  }

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B7280]">{course.category}</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-[#111111] sm:text-3xl">{course.title}</h1>
        </div>
        <a
          href="/library"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111111] shadow-sm transition hover:bg-[#F4F5F7]"
        >
          <ChevronLeft size={18} /> Back to library
        </a>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
        <section className="lg:col-span-8">
          
          {/* Main Video Wrapper */}
          <div
            ref={playerContainerRef}
            className="group relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#111111] shadow-xl"
          >
            <div className="aspect-[16/9] relative bg-[#111111]">
              {/* API Target Element */}
              <div ref={videoElementRef} className="h-full w-full" />

              {/* Top Shielding Layer (prevents clicking title links) */}
              <div className="absolute inset-x-0 top-0 h-16 z-10 bg-transparent" />

              {/* Click-to-Play/Pause Center Trigger */}
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 z-20 h-[calc(100%-60px)] w-full bg-transparent focus:outline-none"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              />
            </div>

            {/* Custom Aesthetic Control Bar */}
            <div className="absolute bottom-0 inset-x-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 opacity-100 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
              
              {/* Seek Slider */}
              <div className="relative mb-3 flex items-center w-full">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/30 accent-[#C6F232] transition hover:h-2"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C6F232] text-[#111111] transition hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <span className="text-xs font-bold text-white/90 tracking-wide">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/90">
                  <span>Speed</span>
                  <select
                    aria-label="Playback speed"
                    value={playbackRate}
                    onChange={(event) => handlePlaybackRate(Number(event.target.value))}
                    className="rounded-full bg-transparent py-1 pl-2 pr-6 text-xs font-semibold text-white outline-none ring-0 focus:ring-0"
                  >
                    {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <option key={rate} value={rate} className="bg-white text-[#111111]">
                        {rate}x
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Metadata */}
          <div className="mt-6 rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF4D2E]">Lesson {currentIndex + 1}</p>
                <h2 className="mt-3 text-2xl font-black text-[#111111] sm:text-3xl">{lesson.title}</h2>
              </div>
              <div className="rounded-full bg-[#F4F5F7] px-4 py-2 text-sm font-semibold text-[#475569]">{lesson.duration}</div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-2 text-[#334155]">
                <UserRound size={16} /> {course.instructor}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF9F3] px-3 py-2 text-[#0F766E]">
                {course.lessons.filter((lesson) => lesson.completed).length}/{course.lessons.length} completed
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-2 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] p-1">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.id ? 'bg-[#111111] text-white shadow-sm' : 'text-[#475569] hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-5 text-sm leading-7 text-[#475569]">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-[#111111]">Lesson overview</p>
                  <p>
                    This lesson walks you through the core concepts with a cinematic video experience, clean learning
                    cards, and a structured playlist so you can move through each topic with confidence.
                  </p>
                  <ul className="space-y-3 text-[#475569]">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#111111]" /> Clear, focused explanations for each step
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#111111]" /> Privacy-first video loading and minimal external branding
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#111111]" /> Clean progress tracking across your playlist
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-[#111111]">Resources & downloads</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                      <p className="text-sm font-semibold text-[#111111]">Course notes</p>
                      <p className="mt-2 text-sm text-[#475569]">
                        Download the PDF summary and revisit the framework whenever you need it.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                      <p className="text-sm font-semibold text-[#111111]">Project files</p>
                      <p className="mt-2 text-sm text-[#475569]">
                        Access templates, diagrams, and worksheets for hands-on practice.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-[#111111]">Discussion / Q&A</p>
                  <p>
                    Ask questions, share reflections, and keep the conversation focused on the lesson.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <LessonList course={course} activeId={lesson.id} />
        </div>
      </div>
    </div>
  )
}