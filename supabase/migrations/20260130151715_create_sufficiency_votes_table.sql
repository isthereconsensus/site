/*
  # Create sufficiency_votes table for tracking votes on explanation quality

  1. New Tables
    - `sufficiency_votes`
      - `id` (uuid, primary key)
      - `question_id` (uuid, foreign key to questions)
      - `is_sufficient` (boolean) - whether voter thinks explanation is sufficient
      - `voted_at` (timestamptz)
  
  2. Security
    - Enable RLS on `sufficiency_votes` table
    - Add policy for public insert access
    - Add policy for public read access (to show vote counts)
*/

CREATE TABLE IF NOT EXISTS sufficiency_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  is_sufficient boolean NOT NULL,
  voted_at timestamptz DEFAULT now()
);

ALTER TABLE sufficiency_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can vote on sufficiency"
  ON sufficiency_votes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read vote counts"
  ON sufficiency_votes
  FOR SELECT
  TO anon, authenticated
  USING (true);