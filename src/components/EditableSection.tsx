import { useState } from 'react';
import { Pencil, Check, X, Loader2 } from 'lucide-react';

interface EditableSectionProps {
  value: string;
  placeholder: string;
  onSave: (newValue: string) => Promise<void>;
  multiline?: boolean;
  label: string;
}

export default function EditableSection({
  value,
  placeholder,
  onSave,
  multiline = false,
  label,
}: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const displayValue = value || placeholder;
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
            {label}
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
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full min-h-[200px] p-4 text-stone-700 leading-relaxed bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-y"
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-4 text-stone-700 leading-relaxed bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            placeholder={placeholder}
            autoFocus
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 group relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
          {label}
        </h2>
        <button
          onClick={handleStartEdit}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
        >
          <Pencil size={14} />
          Edit
        </button>
      </div>
      <p className={`text-lg leading-relaxed ${isEmpty ? 'text-stone-400 italic' : 'text-stone-700'}`}>
        {displayValue}
      </p>
    </div>
  );
}
