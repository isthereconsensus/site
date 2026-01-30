import { useState } from 'react';
import { X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { isValidDoi, fetchCitationFromDoi } from '../utils/citations';
import { supabase } from '../lib/supabase';

interface AddCitationModalProps {
  questionId: string;
  onClose: () => void;
  onCitationAdded: () => void;
}

type ModalState = 'input' | 'loading' | 'success' | 'error';

export default function AddCitationModal({
  questionId,
  onClose,
  onCitationAdded,
}: AddCitationModalProps) {
  const [doi, setDoi] = useState('');
  const [state, setState] = useState<ModalState>('input');
  const [error, setError] = useState('');

  async function handleAddCitation() {
    if (!doi.trim()) {
      setError('Please enter a DOI');
      return;
    }

    if (!isValidDoi(doi)) {
      setError('Please enter a valid DOI (e.g., 10.1234/example)');
      return;
    }

    setError('');
    setState('loading');

    try {
      const citation = await fetchCitationFromDoi(doi);

      const { error: saveError } = await supabase.from('citations').insert({
        question_id: questionId,
        doi: citation.doi,
        bibtex: citation.bibtex,
        title: citation.title,
        authors: citation.authors,
        journal: citation.journal,
        year: citation.year,
        url: citation.url,
      });

      if (saveError) {
        if (saveError.code === '23505') {
          setError('This citation has already been added to this question.');
        } else {
          setError('Failed to save citation. Please try again.');
        }
        setState('error');
        return;
      }

      setState('success');
      setTimeout(() => {
        onCitationAdded();
        onClose();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch citation');
      setState('error');
    }
  }

  function handleReset() {
    setDoi('');
    setError('');
    setState('input');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <h2 className="font-serif text-xl font-semibold text-stone-800">
            Add Citation
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {state === 'input' && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="doi"
                  className="block text-sm font-medium text-stone-700 mb-2"
                >
                  Digital Object Identifier (DOI)
                </label>
                <input
                  id="doi"
                  type="text"
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                  placeholder="10.1234/example.2024"
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow"
                  onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                />
                <p className="text-xs text-stone-500 mt-1.5">
                  Enter a valid DOI to automatically fetch citation details
                </p>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
              <button
                onClick={handleAddCitation}
                className="w-full px-4 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Add Citation
              </button>
            </div>
          )}

          {state === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-teal-600 mb-4" />
              <p className="text-stone-600">Adding citation...</p>
            </div>
          )}

          {state === 'success' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>
              <p className="text-stone-800 font-medium">Citation added successfully!</p>
            </div>
          )}

          {state === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 border border-stone-300 text-stone-700 font-medium rounded-lg hover:bg-stone-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
