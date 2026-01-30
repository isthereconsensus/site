import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getDisciplineByPath } from '../utils/disciplines';
import QuestionEntry from '../components/QuestionEntry';
import type { Question } from '../types/database';

export default function DisciplinePage() {
  const { discipline: disciplinePath } = useParams<{ discipline: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const discipline = getDisciplineByPath(`/${disciplinePath}`);

  useEffect(() => {
    if (discipline) {
      fetchQuestions();
    }
  }, [discipline]);

  async function fetchQuestions() {
    if (!discipline) return;

    const { data } = await supabase
      .from('questions')
      .select('*')
      .eq('discipline', discipline.id)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (data) {
      setQuestions(data);
    }
    setLoading(false);
  }

  if (!discipline) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 mb-3">
          {discipline.name}
        </h1>
        <p className="text-lg text-stone-600">
          {discipline.description}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={24} className="animate-spin text-stone-400" />
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12 bg-white border border-stone-200 rounded-lg">
          <p className="text-stone-500">
            No questions in this discipline yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionEntry key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
