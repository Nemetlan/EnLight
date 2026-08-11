insert into public.courses (slug, title, category, description, is_published)
values
  ('structural-analysis', 'Structural Analysis', 'Civil', 'Learn beams, trusses, frames, and practical structural systems.', true),
  ('thermodynamics', 'Thermodynamics', 'Mechanical', 'Build a working understanding of energy, entropy, and cycles.', true),
  ('circuit-theory', 'Circuit Theory', 'Electrical', 'Practice circuit analysis, phasors, and network theorems.', true),
  ('fluid-mechanics', 'Fluid Mechanics', 'Mechanical', 'Explore pressure, flow, Bernoulli, and real engineering systems.', true)
on conflict (slug) do update set title = excluded.title, category = excluded.category, description = excluded.description, is_published = excluded.is_published;

insert into public.lessons (course_id, order_index, title, duration_seconds, video_provider, video_ref, is_preview)
select c.id, v.order_index, v.title, v.duration_seconds, 'youtube', v.video_ref, v.order_index = 1
from public.courses c
cross join lateral (values
  (1, 'Introduction and Core Concepts', 612, 'M7lc1UVf-VE'),
  (2, 'Worked Example', 744, 'ysz5S6PUM-U'),
  (3, 'Practice and Review', 823, 'aqz-KE-bpKQ')
) v(order_index, title, duration_seconds, video_ref)
where c.slug in ('structural-analysis', 'thermodynamics', 'circuit-theory', 'fluid-mechanics')
on conflict (course_id, order_index) do update set title = excluded.title, duration_seconds = excluded.duration_seconds, video_ref = excluded.video_ref, is_preview = excluded.is_preview;
