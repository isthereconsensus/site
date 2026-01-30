import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500">
            An open source project dedicated to understanding scientific consensus.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            <Github size={18} />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
