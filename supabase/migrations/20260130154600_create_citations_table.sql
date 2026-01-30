/*
  # Create Citations Table

  1. New Tables
    - `citations`
      - `id` (uuid, primary key) - Unique identifier for each citation
      - `question_id` (uuid, foreign key) - Links to the questions table
      - `doi` (text) - Digital Object Identifier for the citation
      - `bibtex` (text) - Raw BibTeX entry
      - `title` (text) - Publication title
      - `authors` (text) - Comma-separated list of authors
      - `journal` (text, nullable) - Journal or publication name
      - `year` (integer, nullable) - Publication year
      - `url` (text, nullable) - URL to the publication
      - `created_at` (timestamptz) - When the citation was added

  2. Security
    - Enable RLS on `citations` table
    - Add policy for anyone to read citations
    - Add policy for anyone to insert citations (community contribution)

  3. Constraints
    - Unique constraint on (question_id, doi) to prevent duplicate citations
    - Foreign key to questions table with cascade delete
*/

CREATE TABLE IF NOT EXISTS citations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  doi text NOT NULL,
  bibtex text NOT NULL,
  title text NOT NULL,
  authors text NOT NULL,
  journal text,
  year integer,
  url text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(question_id, doi)
);

ALTER TABLE citations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read citations"
  ON citations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can add citations"
  ON citations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_citations_question_id ON citations(question_id);