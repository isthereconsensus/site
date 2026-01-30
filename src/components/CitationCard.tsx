import { ExternalLink } from 'lucide-react';
import type { Citation } from '../types/database';
import { generateCitationAnchorId } from '../utils/citations';

interface CitationCardProps {
  citation: Citation;
  index: number;
}

export default function CitationCard({ citation, index }: CitationCardProps) {
  const anchorId = generateCitationAnchorId(citation.authors, citation.year);

  return (
    <div id={anchorId} className="py-3 border-b border-stone-100 last:border-b-0 scroll-mt-24">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 text-stone-500 text-xs font-medium flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-stone-800 leading-relaxed">
            <span className="font-medium">{citation.authors}</span>
            {citation.year && (
              <span className="text-stone-700"> ({citation.year})</span>
            )}
            {' '}
            {citation.url ? (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="italic text-teal-700 hover:text-teal-800 hover:underline"
              >
                {citation.title}
              </a>
            ) : (
              <span className="italic">{citation.title}</span>
            )}
            {'.'}
            {citation.journal && (
              <span className="text-stone-600"> {citation.journal}.</span>
            )}
          </p>
          <p className="text-xs text-stone-400 mt-1 font-mono">
            DOI: {citation.doi}
            {citation.url && (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1 text-teal-600 hover:text-teal-700"
              >
                <ExternalLink size={10} />
                Open
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
