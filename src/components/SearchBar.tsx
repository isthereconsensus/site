import { useState, useEffect, useCallback } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getDisciplineById } from '../utils/disciplines';
import QuestionEntry from './QuestionEntry';
import type { Question } from '../types/database';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Question[]>([]);
  const [citationCounts, setCitationCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setCitationCounts({});
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    const { data } = await supabase
      .from('questions')
      .select('*')
      .eq('is_approved', true)
      .ilike('question_text', `%${searchQuery}%`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setResults(data);
      if (data.length > 0) {
        fetchCitationCounts(data.map((q) => q.id));
      } else {
        setCitationCounts({});
      }
    } else {
      setResults([]);
      setCitationCounts({});
    }
    setLoading(false);
  }, []);

  async function fetchCitationCounts(questionIds: string[]) {
    const { data } = await supabase
      .from('citations')
      .select('question_id')
      .in('question_id', questionIds);

    if (data) {
      const counts: Record<string, number> = {};
      questionIds.forEach((id) => {
        counts[id] = 0;
      });
      data.forEach((citation) => {
        counts[citation.question_id] = (counts[citation.question_id] || 0) + 1;
      });
      setCitationCounts(counts);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, search]);

  function clearSearch() {
    setQuery('');
    setResults([]);
    setCitationCounts({});
    setHasSearched(false);
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-11 pr-10 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-800 placeholder-stone-400"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {hasSearched && (
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 size={24} className="animate-spin text-stone-400" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-stone-500 mb-4">
                Found {results.length} question{results.length !== 1 ? 's' : ''} matching "{query}"
              </p>
              {results.map((question) => {
                const discipline = getDisciplineById(question.discipline);
                return (
                  <div key={question.id} className="relative">
                    {discipline && (
                      <span className="absolute -top-2 left-3 px-2 py-0.5 text-xs font-medium bg-stone-100 text-stone-600 rounded-full border border-stone-200 z-10">
                        {discipline.name}
                      </span>
                    )}
                    <QuestionEntry
                      question={question}
                      citationCount={citationCounts[question.id] || 0}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-stone-50 border border-stone-200 rounded-lg">
              <p className="text-stone-500">
                No questions found matching "{query}"
              </p>
              <p className="text-sm text-stone-400 mt-1">
                Try different keywords or submit a new question below
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
