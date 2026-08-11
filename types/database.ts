export type UserRole = 'student' | 'tutor' | 'admin'
export type CourseCategory = 'Civil' | 'Mechanical' | 'Electrical' | 'Other'
export type EnrollmentStatus = 'active' | 'completed' | 'dropped'
export type RequestStatus = 'pending' | 'approved' | 'rejected'
export type SessionStatus = 'completed' | 'upcoming' | 'cancelled'
export type ResourceCategory = 'Notes' | 'Audio' | 'Tests'

export type Profile = {
  id: string
  full_name: string
  initials_name: string | null
  email: string
  phone: string | null
  whatsapp: string | null
  avatar_url: string | null
  role: UserRole
  two_factor_enabled: boolean
}

export type Course = {
  id: string
  slug: string
  title: string
  category: CourseCategory
  description: string | null
  instructor_id: string | null
  is_published: boolean
}

export type Lesson = {
  id: string
  course_id: string
  order_index: number
  title: string
  duration_seconds: number
  video_provider: string
  video_ref: string
  is_preview: boolean
}

export type Resource = {
  id: string
  title: string
  course_id: string | null
  category: ResourceCategory
  storage_path: string
  file_size_bytes: number
  uploaded_by: string | null
  created_at: string
}

export type HomeworkItem = {
  id: string
  student_id: string
  session_id: string | null
  label: string
  due_date: string | null
  completed: boolean
  completed_at: string | null
}

export type ClassSession = {
  id: string
  student_id: string
  tutor_id: string | null
  course_id: string | null
  topic: string
  session_date: string
  duration_minutes: number
  status: SessionStatus
}

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & Pick<Profile, 'id' | 'email'>; Update: Partial<Profile> }
      courses: { Row: Course; Insert: Partial<Course> & Pick<Course, 'slug' | 'title' | 'category'>; Update: Partial<Course> }
      lessons: { Row: Lesson; Insert: Partial<Lesson> & Pick<Lesson, 'course_id' | 'order_index' | 'title' | 'duration_seconds' | 'video_ref'>; Update: Partial<Lesson> }
      resources: { Row: Resource; Insert: Partial<Resource> & Pick<Resource, 'title' | 'category' | 'storage_path' | 'file_size_bytes'>; Update: Partial<Resource> }
      homework_items: { Row: HomeworkItem; Insert: Partial<HomeworkItem> & Pick<HomeworkItem, 'student_id' | 'label'>; Update: Partial<HomeworkItem> }
      class_sessions: { Row: ClassSession; Insert: Partial<ClassSession> & Pick<ClassSession, 'student_id' | 'topic' | 'session_date' | 'duration_minutes'>; Update: Partial<ClassSession> }
      enrollments: { Row: { id: string; student_id: string; course_id: string; status: EnrollmentStatus; enrolled_at: string }; Insert: Partial<{ id: string; student_id: string; course_id: string; status: EnrollmentStatus; enrolled_at: string }>; Update: Partial<{ id: string; student_id: string; course_id: string; status: EnrollmentStatus; enrolled_at: string }> }
      lesson_progress: { Row: { id: string; student_id: string; lesson_id: string; completed: boolean; watch_seconds: number; completed_at: string | null; updated_at: string }; Insert: Partial<{ id: string; student_id: string; lesson_id: string; completed: boolean; watch_seconds: number; completed_at: string | null; updated_at: string }>; Update: Partial<{ id: string; student_id: string; lesson_id: string; completed: boolean; watch_seconds: number; completed_at: string | null; updated_at: string }> }
      course_requests: { Row: { id: string; student_id: string; course_id: string; status: RequestStatus; requested_at: string }; Insert: Partial<{ id: string; student_id: string; course_id: string; status: RequestStatus; requested_at: string }>; Update: Partial<{ id: string; student_id: string; course_id: string; status: RequestStatus; requested_at: string }> }
      resource_downloads: { Row: { id: string; resource_id: string; student_id: string; downloaded_at: string }; Insert: Partial<{ id: string; resource_id: string; student_id: string; downloaded_at: string }>; Update: Partial<{ id: string; resource_id: string; student_id: string; downloaded_at: string }> }
    }
    Views: { course_progress: { Row: { student_id: string; course_id: string; completed_lessons: number; total_lessons: number } } }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
