import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, Github, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FeedbackPage() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('feedback_submissions').insert({
      message: message.trim(),
      email: email.trim() || null,
    });

    if (!error) {
      setMessage('');
      setEmail('');
      setSubmitSuccess(true);
    }
    setSubmitting(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 mb-4">
        Suggest an Improvement
      </h1>
      <p className="text-stone-600 mb-10">
        We welcome your feedback to help improve this website. Choose the appropriate channel below depending on the type of suggestion.
      </p>

      <div className="grid gap-8">
        <section className="bg-white border border-stone-200 rounded-lg p-6">
          <h2 className="font-serif text-xl font-semibold text-stone-800 mb-2">
            Design & Content Feedback
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            For suggestions about the website's design, content accuracy, or general improvements.
          </p>

          {submitSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-emerald-700 font-medium">
                Thank you for your feedback! We've received your suggestion and will review it soon.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-3 text-sm text-emerald-600 hover:text-emerald-800 underline"
              >
                Submit another suggestion
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                  Your Suggestion
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your suggestion or feedback..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Include your email if you'd like us to follow up with you.
                </p>
              </div>
              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 text-white font-medium rounded-md hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                Submit Feedback
              </button>
            </form>
          )}
        </section>

        <section className="bg-white border border-stone-200 rounded-lg p-6">
          <h2 className="font-serif text-xl font-semibold text-stone-800 mb-2">
            Code Contributions
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            For bug reports, feature requests, or code contributions, please use our GitHub repository.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-800 font-medium rounded-md hover:bg-stone-200 transition-colors"
          >
            <Github size={18} />
            Open GitHub Issues
            <ExternalLink size={14} />
          </a>
        </section>
      </div>
    </div>
  );
}
