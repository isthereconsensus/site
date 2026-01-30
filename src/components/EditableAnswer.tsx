import { useState } from 'react';
import { Pencil, Check, X, Loader2 } from 'lucide-react';
import AnswerWithCitations from './AnswerWithCitations';
import type { Citation } from '../types/database';

interface EditableAnswerProps {
  value: string;
  citations: Citation[];
  onSave: (newValue: string) => Promise<void>;
}

export default function EditableAnswer({
  value,
  citations,
  onSave,
}: EditableAnswerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const placeholder = 'No answer provided yet. Click Edit to add an answer with citations.';
  const isEmpty = !value;

  async function handleSave() {
    if (saving) return;
    setSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setEditValue(value);
    setIsEditing(false);
  }

  function handleStartEdit() {
    setEditValue(value);
    setIsEditing(true);
  }

  if (isEditing) {
    return (
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
            Answer
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-md transition-colors disabled:opacity-50"
            >
              <X size={14} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-stone-800 hover:bg-stone-900 rounded-md transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Check size={14} />
              )}
              Save
            </button>
          </div>
        </div>
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full min-h-[200px] p-4 text-stone-700 leading-relaxed bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-y font-sans"
          placeholder="Enter the answer here. Use citations in the format (Author, Year) to reference sources."
          autoFocus
        />
        <p className="mt-3 text-sm text-stone-500">
          Use in-text citations like (Smith, 2023) or (Johnson et al., 2022) to reference sources.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 group relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
          Answer
        </h2>
        <button
          onClick={handleStartEdit}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
        >
          <Pencil size={14} />
          Edit
        </button>
      </div>
      {isEmpty ? (
        <p className="text-lg leading-relaxed text-stone-400 italic">
          {placeholder}
        </p>
      ) : (
        <AnswerWithCitations text={value} citations={citations} />
      )}
    </div>
  );
}
