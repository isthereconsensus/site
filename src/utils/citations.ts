import type { CrossRefResponse, CrossRefAuthor, Citation } from '../types/database';

const DOI_REGEX = /^10\.\d{4,}\/[^\s]+$/;

export function isValidDoi(doi: string): boolean {
  const cleaned = doi.trim().replace(/^https?:\/\/doi\.org\//, '');
  return DOI_REGEX.test(cleaned);
}

export function cleanDoi(doi: string): string {
  return doi.trim().replace(/^https?:\/\/doi\.org\//, '');
}

function formatAuthors(authors: CrossRefAuthor[]): string {
  return authors
    .map((author) => {
      if (author.name) return author.name;
      const parts = [author.family, author.given].filter(Boolean);
      return parts.join(', ');
    })
    .join(' and ');
}

function getInitials(given: string | undefined): string {
  if (!given) return '';
  return given
    .split(/[\s-]+/)
    .map(part => part.charAt(0).toUpperCase() + '.')
    .join('');
}

function formatHarvardAuthor(author: CrossRefAuthor): string {
  if (author.name) {
    const parts = author.name.split(' ');
    if (parts.length > 1) {
      const lastName = parts.pop();
      const initials = parts.map(p => p.charAt(0).toUpperCase() + '.').join('');
      return `${lastName}, ${initials}`;
    }
    return author.name;
  }
  const initials = getInitials(author.given);
  return `${author.family || ''}${initials ? ', ' + initials : ''}`;
}

function formatAuthorsDisplay(authors: CrossRefAuthor[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return formatHarvardAuthor(authors[0]);
  if (authors.length === 2) {
    return `${formatHarvardAuthor(authors[0])} and ${formatHarvardAuthor(authors[1])}`;
  }
  const allButLast = authors.slice(0, -1).map(formatHarvardAuthor).join(', ');
  return `${allButLast} and ${formatHarvardAuthor(authors[authors.length - 1])}`;
}

function getYear(message: CrossRefResponse['message']): number | null {
  const dateSource =
    message.published ||
    message['published-print'] ||
    message['published-online'];
  if (dateSource?.['date-parts']?.[0]?.[0]) {
    return dateSource['date-parts'][0][0];
  }
  return null;
}

function generateBibtexKey(authors: CrossRefAuthor[], year: number | null): string {
  const firstAuthor = authors[0];
  const surname = firstAuthor?.family || firstAuthor?.name?.split(' ').pop() || 'unknown';
  const cleanSurname = surname.toLowerCase().replace(/[^a-z]/g, '');
  return `${cleanSurname}${year || 'nd'}`;
}

function getBibtexType(type: string | undefined): string {
  const typeMap: Record<string, string> = {
    'journal-article': 'article',
    'book': 'book',
    'book-chapter': 'incollection',
    'proceedings-article': 'inproceedings',
    'dissertation': 'phdthesis',
    'report': 'techreport',
    'dataset': 'misc',
  };
  return typeMap[type || ''] || 'article';
}

export function generateBibtex(data: CrossRefResponse): string {
  const { message } = data;
  const authors = message.author || [];
  const year = getYear(message);
  const key = generateBibtexKey(authors, year);
  const type = getBibtexType(message.type);
  const title = message.title?.[0] || 'Untitled';
  const journal = message['container-title']?.[0] || '';
  const doi = message.DOI || '';

  const lines = [
    `@${type}{${key},`,
    `  author = {${formatAuthors(authors)}},`,
    `  title = {${title}},`,
  ];

  if (journal) {
    lines.push(`  journal = {${journal}},`);
  }
  if (year) {
    lines.push(`  year = {${year}},`);
  }
  if (doi) {
    lines.push(`  doi = {${doi}},`);
  }
  if (message.URL) {
    lines.push(`  url = {${message.URL}},`);
  }

  lines.push('}');
  return lines.join('\n');
}

export interface ParsedCitation {
  title: string;
  authors: string;
  journal: string | null;
  year: number | null;
  url: string | null;
  doi: string;
  bibtex: string;
}

export async function fetchCitationFromDoi(doi: string): Promise<ParsedCitation> {
  const cleanedDoi = cleanDoi(doi);

  const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(cleanedDoi)}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('DOI not found. Please check the DOI and try again.');
    }
    throw new Error('Failed to fetch citation data. Please try again.');
  }

  const data: CrossRefResponse = await response.json();
  const { message } = data;

  const title = message.title?.[0] || 'Untitled';
  const authors = formatAuthorsDisplay(message.author || []);
  const journal = message['container-title']?.[0] || null;
  const year = getYear(message);
  const url = message.URL || null;
  const bibtex = generateBibtex(data);

  return {
    title,
    authors,
    journal,
    year,
    url,
    doi: cleanedDoi,
    bibtex,
  };
}

export function formatCitationDisplay(citation: {
  authors: string;
  title: string;
  journal: string | null;
  year: number | null;
}): string {
  const yearPart = citation.year ? ` (${citation.year})` : '';
  const journalPart = citation.journal ? ` ${citation.journal}.` : '';
  return `${citation.authors}${yearPart}. ${citation.title}.${journalPart}`;
}

export function getFirstAuthorLastName(authors: string): string {
  const firstAuthor = authors.split(',')[0].trim();
  const nameParts = firstAuthor.split(' ');
  return nameParts[nameParts.length - 1] || firstAuthor;
}

export function generateCitationAnchorId(authors: string, year: number | null): string {
  const lastName = getFirstAuthorLastName(authors);
  const cleanName = lastName.toLowerCase().replace(/[^a-z]/g, '');
  return `citation-${cleanName}-${year || 'nd'}`;
}

export function parseHarvardInTextCitation(citationText: string): { authors: string; year: string } | null {
  const match = citationText.match(/^\(([^,]+(?:\s+(?:and\s+[^,]+|et\s+al\.))?),\s*(\d{4}|n\.d\.)\)$/);
  if (!match) return null;
  return {
    authors: match[1].trim(),
    year: match[2],
  };
}

export function formatInTextCitation(authors: string, year: number | null): string {
  const authorList = authors.split(/,\s*(?=[A-Z])|\s+and\s+/i).filter(Boolean);
  const firstLastName = getFirstAuthorLastName(authors);

  if (authorList.length === 1) {
    return `(${firstLastName}, ${year || 'n.d.'})`;
  } else if (authorList.length === 2) {
    const secondAuthor = authorList[1].trim();
    const secondLastName = secondAuthor.split(' ').pop() || secondAuthor.split(',')[0].trim();
    return `(${firstLastName} and ${secondLastName}, ${year || 'n.d.'})`;
  } else {
    return `(${firstLastName} et al., ${year || 'n.d.'})`;
  }
}

interface ParsedInTextCitation {
  content: string;
  authorName: string;
  year: string;
}

function parseInTextCitationsFromText(text: string): ParsedInTextCitation[] {
  const citationPattern = /\(([^,)]+(?:\s+(?:and\s+[^,)]+|et\s+al\.))?),\s*(\d{4}|n\.d\.)\)/g;
  const citations: ParsedInTextCitation[] = [];
  let match;

  while ((match = citationPattern.exec(text)) !== null) {
    citations.push({
      content: match[0],
      authorName: match[1],
      year: match[2],
    });
  }

  return citations;
}

function findMatchingCitationInList(
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

export function countMatchedInTextCitations(answerText: string, citations: Citation[]): number {
  const inTextCitations = parseInTextCitationsFromText(answerText);
  let matchedCount = 0;

  for (const inTextCitation of inTextCitations) {
    const match = findMatchingCitationInList(
      inTextCitation.authorName,
      inTextCitation.year,
      citations
    );
    if (match) {
      matchedCount++;
    }
  }

  return matchedCount;
}
