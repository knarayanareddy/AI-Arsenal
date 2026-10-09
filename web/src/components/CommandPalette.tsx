import React, { useEffect, useState, useRef } from 'react';
import { Search, X, Command, ExternalLink, ArrowRight, Boxes, Wrench, FileText, GitFork } from 'lucide-react';
import { EntryItem, VerticalId } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  allDocs: EntryItem[];
  onSelectItem: (item: EntryItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  allDocs,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          // parent handles open
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          onSelectItem(filteredResults[selectedIndex]);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const filteredResults = normalizedQuery === ''
    ? allDocs.slice(0, 15)
    : allDocs.filter((doc) => {
        const title = (doc.name || doc.title || doc.id).toLowerCase();
        const desc = (doc.description || doc.summary || doc.decision_summary || '').toLowerCase();
        const tags = (doc.tags || []).join(' ').toLowerCase();
        return title.includes(normalizedQuery) || desc.includes(normalizedQuery) || tags.includes(normalizedQuery);
      }).slice(0, 30);

  const getVerticalIcon = (item: EntryItem) => {
    if (item.approaches) return GitFork;
    if (item.job || item.pricing_detail) return Wrench;
    if (item.authors || item.venue) return FileText;
    return Boxes;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-surface border border-line rounded-card shadow-2xl overflow-hidden animate-modal flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-line flex items-center gap-3">
          <Search className="size-4 text-accent-solid shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search across all 1,254 catalog entries by keyword, tags, or phase..."
            className="flex-1 bg-transparent text-body text-ink placeholder:text-ink-3 outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded text-ink-3 hover:text-ink">
              <X className="size-3.5" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-field border border-line text-ink-3">
            Esc
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-line-soft">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-caption text-ink-3">
              No matching entries found for "{query}".
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = getVerticalIcon(item);
              const title = item.name || item.title || item.id;
              const desc = item.description || item.summary || item.decision_summary || item.problem;
              const stars = item.github_stars;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-2.5 rounded-control flex items-center justify-between gap-3 cursor-pointer tap transition-colors ${
                    isSelected ? 'bg-field text-ink' : 'text-ink-2 hover:bg-field/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded ${isSelected ? 'bg-accent-tint text-accent-solid' : 'bg-inset text-ink-3'}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[13px] text-ink truncate">{title}</span>
                        {item.phase && (
                          <span className="text-[10px] font-mono text-ink-3 px-1 rounded bg-field border border-line-soft">
                            {item.phase}
                          </span>
                        )}
                      </div>
                      <p className="text-micro text-ink-3 truncate max-w-lg mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-micro text-ink-3">
                    {stars !== undefined && stars > 0 && (
                      <span className="hidden sm:inline">★ {stars.toLocaleString()}</span>
                    )}
                    <ArrowRight className={`size-3 transition-transform ${isSelected ? 'translate-x-0.5 text-accent-solid' : 'text-ink-3'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-2.5 bg-field/60 border-t border-line px-4 flex items-center justify-between text-micro font-mono text-ink-3">
          <span>{filteredResults.length} matching results</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
