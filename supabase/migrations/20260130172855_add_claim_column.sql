/*
  # Add Claim Column to Questions Table

  1. Changes
    - Add `claim` column to `questions` table for storing a concise 1-sentence claim
    - Column is nullable text to allow questions without claims initially

  2. Notes
    - The claim provides a brief, editable statement summarizing the scientific consensus answer
    - Existing questions will have NULL claims until edited by users
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'questions' AND column_name = 'claim'
  ) THEN
    ALTER TABLE questions ADD COLUMN claim text;
  END IF;
END $$;