import { HelpCircle } from 'lucide-react';
import { getDisciplineById } from '../utils/disciplines';
import type { QuestionSubmission } from '../types/database';

interface SubmissionEntryProps {
  submission: QuestionSubmission;
}

export default function SubmissionEntry({ submission }: SubmissionEntryProps) {
  const discipline = getDisciplineById(submission.discipline);

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-5">
      <div className="flex items-start gap-3">
        <HelpCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-serif text-stone-800 leading-snug mb-2">
            {submission.question_text}
          </p>
          {discipline && (
            <span className="inline-block text-xs font-medium px-2 py-1 bg-stone-100 text-stone-600 rounded">
              {discipline.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
