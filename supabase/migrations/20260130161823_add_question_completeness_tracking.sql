/*
  # Add Question Completeness Tracking

  1. Schema Changes
    - Add `is_complete` boolean column to `questions` table (default false)
    - Add `citation_count` integer column to cache citation count
  
  2. Functions
    - `update_question_completeness()`: Calculates if a question is complete
      - A question is complete when it has at least 3 citations
    
  3. Triggers
    - Trigger on `citations` table (INSERT, DELETE) to recalculate completeness
    - Trigger on `questions` table (UPDATE) to recalculate when answer changes

  4. Initial Data
    - Updates all existing questions with their completeness status
*/

-- Add completeness tracking columns to questions table
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS is_complete boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS citation_count integer DEFAULT 0;

-- Function to update question completeness based on citation count
CREATE OR REPLACE FUNCTION update_question_completeness()
RETURNS TRIGGER AS $$
DECLARE
  q_id uuid;
  c_count integer;
BEGIN
  -- Determine which question_id to update
  IF TG_TABLE_NAME = 'citations' THEN
    IF TG_OP = 'DELETE' THEN
      q_id := OLD.question_id;
    ELSE
      q_id := NEW.question_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'questions' THEN
    q_id := NEW.id;
  END IF;

  -- Count citations for this question
  SELECT COUNT(*) INTO c_count
  FROM citations
  WHERE question_id = q_id;

  -- Update the question's completeness status
  UPDATE questions
  SET 
    citation_count = c_count,
    is_complete = (c_count >= 3)
  WHERE id = q_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for citations table changes
DROP TRIGGER IF EXISTS trigger_update_completeness_on_citation ON citations;
CREATE TRIGGER trigger_update_completeness_on_citation
AFTER INSERT OR DELETE ON citations
FOR EACH ROW
EXECUTE FUNCTION update_question_completeness();

-- Trigger for questions table changes (when answer is updated)
DROP TRIGGER IF EXISTS trigger_update_completeness_on_question ON questions;
CREATE TRIGGER trigger_update_completeness_on_question
AFTER INSERT OR UPDATE OF answer_paragraph ON questions
FOR EACH ROW
EXECUTE FUNCTION update_question_completeness();

-- Update all existing questions with their current completeness status
UPDATE questions q
SET 
  citation_count = (SELECT COUNT(*) FROM citations c WHERE c.question_id = q.id),
  is_complete = (SELECT COUNT(*) >= 3 FROM citations c WHERE c.question_id = q.id);
