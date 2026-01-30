/*
  # Add In-Text Citation Count Tracking

  1. Changes
    - Add `in_text_citation_count` column to `questions` table
      - Tracks number of in-text citations in the answer that match citations in the database
      - Default value of 0
    - Update `is_complete` logic to require both citation_count >= 3 AND in_text_citation_count >= 3

  2. Notes
    - A question is now only complete when it has:
      - At least 3 citations in the reference list (citation_count)
      - At least 3 matched in-text citations in the answer text (in_text_citation_count)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'questions' AND column_name = 'in_text_citation_count'
  ) THEN
    ALTER TABLE questions ADD COLUMN in_text_citation_count integer DEFAULT 0 NOT NULL;
  END IF;
END $$;

UPDATE questions
SET is_complete = (citation_count >= 3 AND in_text_citation_count >= 3)
WHERE is_complete != (citation_count >= 3 AND in_text_citation_count >= 3);