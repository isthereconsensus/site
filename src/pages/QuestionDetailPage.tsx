import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Loader2, ThumbsUp, ThumbsDown, CheckCircle, AlertTriangle, BookOpen, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getDisciplineById } from '../utils/disciplines';
import { countMatchedInTextCitations } from '../utils/citations';
import ConsensusIndicator from '../components/ConsensusIndicator';
import CitationsList from '../components/CitationsList';
import EditableSection from '../components/EditableSection';
import EditableAnswer from '../components/EditableAnswer';
import type { Question, Citation } from '../types/database';

const REQUIRED_CITATIONS = 3;

interface VoteCounts {
  sufficient: number;
  insufficient: number;
}

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({ sufficient: 0, insufficient: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [voting, setVoting] = useState(false);

  const inTextCitationCount = useMemo(() => {
    if (!question) return 0;
    return countMatchedInTextCitations(question.answer_paragraph, citations);
  }, [question?.answer_paragraph, citations]);

  useEffect(() => {
    if (id) {
      fetchQuestion();
      fetchCitations();
      fetchVoteCounts();
      checkIfVoted();
    }
  }, [id]);

  async function fetchCitations() {
    const { data } = await supabase
      .from('citations')
      .select('*')
      .eq('question_id', id)
      .order('created_at', { ascending: true });

    if (data) {
      setCitations(data);
    }
  }

  async function fetchQuestion() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .eq('is_approved', true)
      .maybeSingle();

    if (error || !data) {
      setNotFound(true);
    } else {
      setQuestion(data);
    }
    setLoading(false);
  }

  async function fetchVoteCounts() {
    const { data } = await supabase
      .from('sufficiency_votes')
      .select('is_sufficient')
      .eq('question_id', id);

    if (data) {
      const counts = data.reduce(
        (acc, vote) => {
          if (vote.is_sufficient) {
            acc.sufficient++;
          } else {
            acc.insufficient++;
          }
          return acc;
        },
        { sufficient: 0, insufficient: 0 }
      );
      setVoteCounts(counts);
    }
  }

  function checkIfVoted() {
    const voted = localStorage.getItem(`voted-${id}`);
    setHasVoted(!!voted);
  }

  async function handleVote(isSufficient: boolean) {
    if (hasVoted || voting) return;

    setVoting(true);
    const { error } = await supabase.from('sufficiency_votes').insert({
      question_id: id,
      is_sufficient: isSufficient,
    });

    if (!error) {
      localStorage.setItem(`voted-${id}`, 'true');
      setHasVoted(true);
      fetchVoteCounts();
    }
    setVoting(false);
  }

  async function handleCitationsChange() {
    await fetchCitations();

    const { data: updatedCitations } = await supabase
      .from('citations')
      .select('*')
      .eq('question_id', id)
      .order('created_at', { ascending: true });

    if (updatedCitations && question) {
      const newInTextCount = countMatchedInTextCitations(question.answer_paragraph, updatedCitations);
      const newCitationCount = updatedCitations.length;
      const newIsComplete = newCitationCount >= REQUIRED_CITATIONS && newInTextCount >= REQUIRED_CITATIONS;

      await supabase
        .from('questions')
        .update({
          citation_count: newCitationCount,
          in_text_citation_count: newInTextCount,
          is_complete: newIsComplete,
        })
        .eq('id', id);
    }

    await fetchQuestion();
  }

  async function handleClaimSave(newClaim: string) {
    await supabase
      .from('questions')
      .update({ claim: newClaim })
      .eq('id', id);
    await fetchQuestion();
  }

  async function handleAnswerSave(newAnswer: string) {
    const newInTextCount = countMatchedInTextCitations(newAnswer, citations);
    const newIsComplete = citations.length >= REQUIRED_CITATIONS && newInTextCount >= REQUIRED_CITATIONS;

    await supabase
      .from('questions')
      .update({
        answer_paragraph: newAnswer,
        in_text_citation_count: newInTextCount,
        is_complete: newIsComplete,
      })
      .eq('id', id);
    await fetchQuestion();
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={32} className="animate-spin text-stone-400" />
      </div>
    );
  }

  if (notFound || !question) {
    return <Navigate to="/" replace />;
  }

  const discipline = getDisciplineById(question.discipline);
  const totalVotes = voteCounts.sufficient + voteCounts.insufficient;
  const citationCount = citations.length;
  const needsMoreCitations = citationCount < REQUIRED_CITATIONS;
  const needsMoreInTextCitations = inTextCitationCount < REQUIRED_CITATIONS;
  const isComplete = !needsMoreCitations && !needsMoreInTextCitations;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {discipline && (
        <Link
          to={discipline.path}
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to {discipline.name}
        </Link>
      )}

      <article>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 mb-4 leading-tight">
          {question.question_text}
        </h1>

        {isComplete ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-8">
            <CheckCircle size={16} />
            Answer Complete
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
              <AlertTriangle size={16} />
              Answer Incomplete
            </div>
            {needsMoreCitations && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">
                <BookOpen size={12} />
                {citationCount}/{REQUIRED_CITATIONS} references
              </div>
            )}
            {needsMoreInTextCitations && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">
                <FileText size={12} />
                {inTextCitationCount}/{REQUIRED_CITATIONS} in-text citations
              </div>
            )}
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
            Scientific Consensus
          </h2>
          <ConsensusIndicator score={question.consensus_score} size="lg" />
        </div>

        <div className="mb-6">
          <EditableSection
            value={question.claim || ''}
            placeholder="No claim provided yet. Click Edit to add a concise 1-sentence claim."
            onSave={handleClaimSave}
            multiline={false}
            label="Claim"
          />
        </div>

        <div className="mb-10">
          <EditableAnswer
            value={question.answer_paragraph}
            citations={citations}
            onSave={handleAnswerSave}
          />
        </div>

        <CitationsList
          questionId={question.id}
          citations={citations}
          inTextCitationCount={inTextCitationCount}
          onCitationsChange={handleCitationsChange}
        />

        <div className="border-t border-stone-200 pt-8">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">
            Is this explanation sufficient?
          </h2>

          {hasVoted ? (
            <div className="bg-stone-50 rounded-lg p-4">
              <p className="text-sm text-stone-600 mb-3">
                Thank you for your feedback! Here's what others think:
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp size={18} className="text-emerald-600" />
                  <span className="font-medium text-stone-700">{voteCounts.sufficient}</span>
                  <span className="text-sm text-stone-500">sufficient</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown size={18} className="text-red-500" />
                  <span className="font-medium text-stone-700">{voteCounts.insufficient}</span>
                  <span className="text-sm text-stone-500">needs improvement</span>
                </div>
              </div>
              {totalVotes > 0 && (
                <div className="mt-3 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${(voteCounts.sufficient / totalVotes) * 100}%` }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleVote(true)}
                disabled={voting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-lg border border-emerald-200 hover:bg-emerald-100 disabled:opacity-50 transition-colors"
              >
                {voting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ThumbsUp size={16} />
                )}
                Yes, sufficient
              </button>
              <button
                onClick={() => handleVote(false)}
                disabled={voting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 font-medium rounded-lg border border-red-200 hover:bg-red-100 disabled:opacity-50 transition-colors"
              >
                {voting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ThumbsDown size={16} />
                )}
                Needs improvement
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
