export type Discipline =
  | 'climate_science'
  | 'medicine'
  | 'cosmology'
  | 'biology'
  | 'physics'
  | 'mathematics'
  | 'geology';

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Question {
  id: string;
  discipline: Discipline;
  question_text: string;
  claim: string | null;
  answer_paragraph: string;
  consensus_score: number;
  citations: string | null;
  is_approved: boolean;
  is_complete: boolean;
  citation_count: number;
  in_text_citation_count: number;
  created_at: string;
}

export interface QuestionSubmission {
  id: string;
  discipline: Discipline;
  question_text: string;
  submitter_email: string | null;
  status: SubmissionStatus;
  submitted_at: string;
}

export interface FeedbackSubmission {
  id: string;
  message: string;
  email: string | null;
  submitted_at: string;
}

export interface SufficiencyVote {
  id: string;
  question_id: string;
  is_sufficient: boolean;
  voted_at: string;
}

export interface Citation {
  id: string;
  question_id: string;
  doi: string;
  bibtex: string;
  title: string;
  authors: string;
  journal: string | null;
  year: number | null;
  url: string | null;
  created_at: string;
}

export interface CrossRefAuthor {
  given?: string;
  family?: string;
  name?: string;
}

export interface CrossRefResponse {
  message: {
    title?: string[];
    author?: CrossRefAuthor[];
    'container-title'?: string[];
    published?: { 'date-parts'?: number[][] };
    'published-print'?: { 'date-parts'?: number[][] };
    'published-online'?: { 'date-parts'?: number[][] };
    URL?: string;
    DOI?: string;
    type?: string;
  };
}

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: Question;
        Insert: Omit<Question, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Question, 'id'>>;
      };
      question_submissions: {
        Row: QuestionSubmission;
        Insert: Omit<QuestionSubmission, 'id' | 'submitted_at' | 'status'> & { id?: string; submitted_at?: string; status?: SubmissionStatus };
        Update: Partial<Omit<QuestionSubmission, 'id'>>;
      };
      feedback_submissions: {
        Row: FeedbackSubmission;
        Insert: Omit<FeedbackSubmission, 'id' | 'submitted_at'> & { id?: string; submitted_at?: string };
        Update: Partial<Omit<FeedbackSubmission, 'id'>>;
      };
      sufficiency_votes: {
        Row: SufficiencyVote;
        Insert: Omit<SufficiencyVote, 'id' | 'voted_at'> & { id?: string; voted_at?: string };
        Update: Partial<Omit<SufficiencyVote, 'id'>>;
      };
      citations: {
        Row: Citation;
        Insert: Omit<Citation, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Citation, 'id'>>;
      };
    };
  };
}
