/*
  # Create feedback_submissions table for design philosophy suggestions

  1. New Tables
    - `feedback_submissions`
      - `id` (uuid, primary key)
      - `message` (text) - the feedback message
      - `email` (text, nullable) - optional contact email
      - `submitted_at` (timestamptz)
  
  2. Security
    - Enable RLS on `feedback_submissions` table
    - Add policy for public insert access only (no read access for users)
*/

CREATE TABLE IF NOT EXISTS feedback_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  email text,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON feedback_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);