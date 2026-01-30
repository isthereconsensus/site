import type { Citation } from '../types/database';
import { generateCitationAnchorId, getFirstAuthorLastName } from '../utils/citations';

interface AnswerWithCitationsProps {
  text: string;
  citations: Citation[];
}

interface TextSegment {
  type: 'text' | 'citation';
  content: string;
  authorName?: string;
  year?: string;
}

function parseAnswerText(text: string): TextSegment[] {
  const citationPattern = /\(([^,)]+(?:\s+(?:and\s+[^,)]+|et\s+al\.))?),\s*(\d{4}|n\.d\.)\)/g;
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match;

  while ((match = citationPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }

    segments.push({
      type: 'citation',
      content: match[0],
      authorName: match[1],
      year: match[2],
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return segments;
}

function findMatchingCitation(
  authorName: string,
  year: string,
  citations: Citation[]
): Citation | null {
  const normalizedYear = year === 'n.d.' ? null : parseInt(year, 10);
  const isEtAl = authorName.toLowerCase().includes('et al.');
  const cleanedAuthorName = authorName
    .replace(/\s+et\s+al\.?/i, '')
    .replace(/\s+and\s+.*/i, '')
    .trim()
    .toLowerCase();

  return citations.find((citation) => {
    const citationLastName = getFirstAuthorLastName(citation.authors).toLowerCase();
    const yearMatches = normalizedYear === null
      ? citation.year === null
      : citation.year === normalizedYear;

    if (isEtAl) {
      return citationLastName === cleanedAuthorName && yearMatches;
    }

    const authorParts = authorName.toLowerCase().split(/\s+and\s+/);
    if (authorParts.length === 2) {
      const citationAuthors = citation.authors.toLowerCase();
      const firstMatch = citationLastName === authorParts[0].trim();
      const secondMatch = citationAuthors.includes(authorParts[1].trim());
      return firstMatch && secondMatch && yearMatches;
    }

    return citationLastName === cleanedAuthorName && yearMatches;
  }) || null;
}

export default function AnswerWithCitations({ text, citations }: AnswerWithCitationsProps) {
  const segments = parseAnswerText(text);

  function handleCitationClick(e: React.MouseEvent, citation: Citation) {
    e.preventDefault();
    const anchorId = generateCitationAnchorId(citation.authors, citation.year);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('bg-teal-50');
      setTimeout(() => {
        element.classList.remove('bg-teal-50');
      }, 2000);
    }
  }

  return (
    <p className="text-stone-700 leading-relaxed text-lg">
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.content}</span>;
        }

        const matchingCitation = findMatchingCitation(
          segment.authorName || '',
          segment.year || '',
          citations
        );

        if (matchingCitation) {
          return (
            <a
              key={index}
              href={`#${generateCitationAnchorId(matchingCitation.authors, matchingCitation.year)}`}
              onClick={(e) => handleCitationClick(e, matchingCitation)}
              className="text-teal-700 hover:text-teal-800 hover:underline font-medium"
            >
              {segment.content}
            </a>
          );
        }

        return (
          <span key={index} className="text-stone-500">
            {segment.content}
          </span>
        );
      })}
    </p>
  );
}
