import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquarePlus, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { disciplines } from '../utils/disciplines';
import SubmissionEntry from '../components/SubmissionEntry';
import QuestionEntry from '../components/QuestionEntry';
import SearchBar from '../components/SearchBar';
import type { Discipline, QuestionSubmission, Question } from '../types/database';

export default function HomePage() {
  const [pendingSubmissions, setPendingSubmissions] = useState<QuestionSubmission[]>([]);
  const [incompleteQuestions, setIncompleteQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [questionText, setQuestionText] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('climate_science');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [submissionsResult, questionsResult] = await Promise.all([
      supabase
        .from('question_submissions')
        .select('*')
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false })
        .limit(10),
      supabase
        .from('questions')
        .select('*')
        .eq('is_approved', true)
        .eq('is_complete', false)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    if (submissionsResult.data) {
      setPendingSubmissions(submissionsResult.data);
    }
    if (questionsResult.data) {
      setIncompleteQuestions(questionsResult.data);
    }
    setLoading(false);
  }

  async function handleSubmitQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!questionText.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('question_submissions').insert({
      discipline: selectedDiscipline,
      question_text: questionText.trim(),
      submitter_email: email.trim() || null,
    });

    if (!error) {
      setQuestionText('');
      setEmail('');
      setSubmitSuccess(true);
      fetchData();
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
    setSubmitting(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-800 mb-6">
          isthereconsensus?
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8">
          Website focused on allowing users to explore the degree to which there is scientific consensus for important questions.
        </p>
        <Link
          to="/feedback"
          className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800 text-white font-medium rounded-lg hover:bg-stone-700 transition-colors"
        >
          <MessageSquarePlus size={18} />
          Suggest an improvement to this website
        </Link>
        <div className="mt-8">
          <SearchBar />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-serif text-2xl font-semibold text-stone-800 mb-6">
          Submit a New Question
        </h2>
        <form onSubmit={handleSubmitQuestion} className="bg-white border border-stone-200 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-stone-700 mb-1">
                Your Question
              </label>
              <textarea
                id="question"
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="What scientific question would you like to see addressed?"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div>
              <label htmlFor="discipline" className="block text-sm font-medium text-stone-700 mb-1">
                Discipline
              </label>
              <select
                id="discipline"
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value as Discipline)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              >
                {disciplines.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
              <p className="text-xs text-stone-500 mt-1">
                We'll notify you when your question receives an answer.
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting || !questionText.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 text-white font-medium rounded-md hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Submit Question
            </button>
            {submitSuccess && (
              <p className="text-sm text-emerald-600 font-medium">
                Question submitted successfully! It will appear below once reviewed.
              </p>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold text-stone-800 mb-6">
          Questions That Need an Answer
        </h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={24} className="animate-spin text-stone-400" />
          </div>
        ) : incompleteQuestions.length === 0 && pendingSubmissions.length === 0 ? (
          <p className="text-stone-500 text-center py-8">
            No pending questions at the moment. Be the first to submit one!
          </p>
        ) : (
          <div className="space-y-6">
            {incompleteQuestions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide">
                  Needs More Citations
                </h3>
                {incompleteQuestions.map((question) => (
                  <QuestionEntry key={question.id} question={question} />
                ))}
              </div>
            )}
            {pendingSubmissions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide">
                  Pending Review
                </h3>
                {pendingSubmissions.map((submission) => (
                  <SubmissionEntry key={submission.id} submission={submission} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
