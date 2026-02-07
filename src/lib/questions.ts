import { supabase } from "./supabase";

export type ApprovedQuestion = {
  id: string;
  question_text: string;
  created_at: string;
};

export async function fetchApprovedQuestions(): Promise<ApprovedQuestion[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id, question_text, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function submitQuestion(questionText: string): Promise<void> {
  const trimmed = questionText.trim();
  if (!trimmed) return;

  const { error } = await supabase
    .from("questions")
    .insert([{ question_text: trimmed }]);

  if (error) throw error;
}

