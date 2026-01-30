/*
  # Create questions table for scientific consensus entries

  1. New Tables
    - `questions`
      - `id` (uuid, primary key)
      - `discipline` (text) - one of: climate_science, medicine, cosmology, biology, physics, mathematics, geology
      - `question_text` (text) - the question being asked
      - `answer_paragraph` (text) - the explanation/answer
      - `consensus_score` (integer, 0-10) - degree of scientific consensus
      - `citations` (text, nullable) - for future citation data
      - `is_approved` (boolean) - whether the question is approved for display
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `questions` table
    - Add policy for public read access to approved questions
*/

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discipline text NOT NULL CHECK (discipline IN ('climate_science', 'medicine', 'cosmology', 'biology', 'physics', 'mathematics', 'geology')),
  question_text text NOT NULL,
  answer_paragraph text NOT NULL,
  consensus_score integer NOT NULL CHECK (consensus_score >= 0 AND consensus_score <= 10),
  citations text,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved questions"
  ON questions
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);