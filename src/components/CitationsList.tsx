import { useState } from 'react';
import { BookOpen, Plus, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import CitationCard from './CitationCard';
import AddCitationModal from './AddCitationModal';
import type { Citation } from '../types/database';

const REQUIRED_CITATIONS = 3;

interface CitationsListProps {
  questionId: string;
  citations: Citation[];
  inTextCitationCount: number;
  onCitationsChange: () => void;
}

export default function CitationsList({
  questionId,
  citations,
  inTextCitationCount,
  onCitationsChange
}: CitationsListProps) {
  const [showModal, setShowModal] = useState(false);

  const citationCount = citations.length;
  const needsMoreCitations = citationCount < REQUIRED_CITATIONS;
  const needsMoreInTextCitations = inTextCitationCount < REQUIRED_CITATIONS;
  const citationsNeeded = Math.max(0, REQUIRED_CITATIONS - citationCount);
  const inTextNeeded = Math.max(0, REQUIRED_CITATIONS - inTextCitationCount);
  const hasWarnings = needsMoreCitations || needsMoreInTextCitations;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-stone-500 uppercase tracking-wide">
          <BookOpen size={16} />
          Citations
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
        >
          <Plus size={14} />
          Add Citation
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
          needsMoreCitations
            ? 'bg-amber-50 border-amber-200'
            : 'bg-emerald-50 border-emerald-200'
        }`}>
          <BookOpen size={18} className={needsMoreCitations ? 'text-amber-600' : 'text-emerald-600'} />
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wide">References</div>
            <div className={`text-lg font-semibold ${needsMoreCitations ? 'text-amber-800' : 'text-emerald-800'}`}>
              {citationCount}/{REQUIRED_CITATIONS}
            </div>
          </div>
          {!needsMoreCitations && <CheckCircle size={16} className="text-emerald-600 ml-auto" />}
        </div>

        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
          needsMoreInTextCitations
            ? 'bg-amber-50 border-amber-200'
            : 'bg-emerald-50 border-emerald-200'
        }`}>
          <FileText size={18} className={needsMoreInTextCitations ? 'text-amber-600' : 'text-emerald-600'} />
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wide">In-Text</div>
            <div className={`text-lg font-semibold ${needsMoreInTextCitations ? 'text-amber-800' : 'text-emerald-800'}`}>
              {inTextCitationCount}/{REQUIRED_CITATIONS}
            </div>
          </div>
          {!needsMoreInTextCitations && <CheckCircle size={16} className="text-emerald-600 ml-auto" />}
        </div>
      </div>

      {hasWarnings && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              {needsMoreCitations && (
                <p>
                  Add {citationsNeeded} more reference{citationsNeeded !== 1 ? 's' : ''} to the citation list.
                </p>
              )}
              {needsMoreInTextCitations && (
                <p>
                  {inTextNeeded} more matched in-text citation{inTextNeeded !== 1 ? 's' : ''} needed in the answer text.
                  <span className="text-amber-600 block mt-1 text-xs">
                    In-text citations must match a reference to count (shown as teal links).
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {citations.length > 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg px-4">
          {citations.map((citation, index) => (
            <CitationCard key={citation.id} citation={citation} index={index} />
          ))}
        </div>
      ) : (
        <div className="bg-stone-50 border border-stone-200 rounded-lg px-6 py-8 text-center">
          <BookOpen size={32} className="mx-auto text-stone-300 mb-3" />
          <p className="text-stone-500 text-sm">
            No citations yet. Be the first to add a citation!
          </p>
        </div>
      )}

      {showModal && (
        <AddCitationModal
          questionId={questionId}
          onClose={() => setShowModal(false)}
          onCitationAdded={onCitationsChange}
        />
      )}
    </div>
  );
}
