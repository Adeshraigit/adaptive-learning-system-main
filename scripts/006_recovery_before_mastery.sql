-- Add baseline mastery snapshot for recovery path feedback
ALTER TABLE public.learning_paths
ADD COLUMN IF NOT EXISTS before_mastery float;
