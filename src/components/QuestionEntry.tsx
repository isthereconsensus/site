import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import ConsensusIndicator from './ConsensusIndicator';
import type { Question } from '../types/database';

const REQUIRED_CITATIONS = 3;

interface QuestionEntryProps {
  question: Question;
}

export default function QuestionEntry({ question }: QuestionEntryProps) {
  const citationCount = question.citation_count;
  const needsMoreCitations = citationCount < REQUIRED_CITATIONS;

  return (
    <Link
      to={`/question/${question.id}`}
      className="block bg-white border border-stone-200 rounded-lg p-5 hover:border-stone-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-medium text-stone-800 group-hover:text-stone-900 mb-3 leading-snug">
            {question.question_text}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <ConsensusIndicator score={question.consensus_score} size="sm" />

            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                needsMoreCitations
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                <BookOpen size={10} />
                {citationCount}/{REQUIRED_CITATIONS}
              </div>

              {question.is_complete ? (
                <span className="text-xs text-emerald-600 font-medium">Complete</span>
              ) : (
                <span className="text-xs text-red-600 font-medium">Incomplete</span>
              )}
            </div>
          </div>
        </div>
        <ChevronRight
          size={20}
          className="text-stone-400 group-hover:text-stone-600 flex-shrink-0 mt-1 transition-colors"
        />
      </div>
    </Link>
  );
}
