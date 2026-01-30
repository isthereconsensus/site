/*
  # Create question_submissions table for user-submitted questions

  1. New Tables
    - `question_submissions`
      - `id` (uuid, primary key)
      - `discipline` (text) - selected discipline category
      - `question_text` (text) - the proposed question
      - `submitter_email` (text, nullable) - optional contact email
      - `status` (text) - pending, approved, rejected
      - `submitted_at` (timestamptz)
  
  2. Security
    - Enable RLS on `question_submissions` table
    - Add policy for public insert access
    - Add policy for public read of pending submissions (for "Questions that need an answer" section)
*/

CREATE TABLE IF NOT EXISTS question_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discipline text NOT NULL CHECK (discipline IN ('climate_science', 'medicine', 'cosmology', 'biology', 'physics', 'mathematics', 'geology')),
  question_text text NOT NULL,
  submitter_email text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE question_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit questions"
  ON question_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read pending submissions"
  ON question_submissions
  FOR SELECT
  TO anon, authenticated
  USING (status = 'pending');