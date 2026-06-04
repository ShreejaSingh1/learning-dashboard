-- Run this in your Supabase SQL Editor to set up the database

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL DEFAULT 'book-open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (for the anon key used in this app)
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);

-- Seed with 4 sample courses
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'code-2'),
  ('TypeScript Deep Dive', 42, 'file-code'),
  ('System Design Fundamentals', 90, 'network'),
  ('Databases & SQL Mastery', 28, 'database');
