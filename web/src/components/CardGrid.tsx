import React, { useState } from 'react';
import { 
  Star, 
  ExternalLink, 
  ChevronRight, 
  Copy, 
  Check, 
  ShieldCheck, 
  Flame, 
  Cpu, 
  GitFork,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { EntryItem, VerticalId } from '../types';

interface CardGridProps {
  items: EntryItem[];
  vertical: VerticalId;
  onSelectItem: (item: EntryItem) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({
  items,
  vertical,
  onSelectItem,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (items.length === 0) {
    return (
      <div className="py-20 text-center px-4">
        <div className="size-12 rounded-full bg-field mx-auto flex items-center justify-center text-ink-3 mb-3">
          <Cpu className="size-6" />
        </div>
        <h3 className="text-body font-medium text-ink">No entries found</h3>
        <p className="text-caption text-ink-3 mt-1">Try relaxing or clearing your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
      {items.map((item) => {
        const title = item.name || item.title || item.id;
        const desc = item.description || item.summary || item.decision_summary || item.problem || '';
        const stars = item.github_stars;
        const license = item.license;
        const lang = item.primary_language || (item.stack && item.stack[0]);
        const phase = item.phase || item.category || item.artifact_type;
        const externalUrl = item.github_url || item.docs_url || item.source_url || item.paper_url || item.demo_url;

        return (
          <article
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group relative rounded-card bg-surface hover:bg-surface/90 border border-line hover:border-line-strong p-4 flex flex-col justify-between tap cursor-pointer shadow-sm hover:shadow-elevation transition-all"
          >
            <div>
              {/* Header Bar */}
              <div className="flex items-start justify-between gap-2.5 mb-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-[14px] text-ink group-hover:text-accent-solid transition-colors truncate">
                      {title}
                    </h3>
                    {item.maturity === 'production' && (
                      <span className="shrink-0 size-2 rounded-full bg-emerald-500" title="Production ready"></span>
                    )}
                  </div>
                  {phase && (
                    <span className="text-micro font-mono text-ink-3 block truncate mt-0.5">
                      {phase}
                    </span>
                  )}
                </div>

                {/* Stars / License Meta */}
                <div className="flex items-center gap-1.5 shrink-0 text-micro font-mono text-ink-2">
                  {stars !== undefined && stars > 0 && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-field border border-line-soft">
                      <Star className="size-2.5 text-amber-400 fill-amber-400" />
                      <span>{stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}</span>
                    </span>
                  )}
                  {license && (
                    <span className="px-1.5 py-0.5 rounded bg-field border border-line-soft text-ink-3 max-w-[80px] truncate" title={license}>
                      {license}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-body text-ink-2 line-clamp-2 text-[12.5px] leading-relaxed mb-3">
                {desc}
              </p>

              {/* Tags / Health Signals */}
              <div className="flex flex-wrap gap-1 mb-3">
                {lang && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-field text-ink-2 border border-line-soft">
                    {lang}
                  </span>
                )}
                {item.health_signals?.map((h) => (
                  <span
                    key={h}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                      h === 'production-proven'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : h === 'actively-maintained'
                        ? 'bg-accent-tint text-accent-solid border-accent-solid/30'
                        : 'bg-field text-ink-3 border-line-soft'
                    }`}
                  >
                    {h}
                  </span>
                ))}
                {item.practical_applicability && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                    item.practical_applicability === 'high'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-field text-ink-3 border-line-soft'
                  }`}>
                    applicability: {item.practical_applicability}
                  </span>
                )}
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="pt-2.5 border-t border-line-soft flex items-center justify-between text-micro font-mono">
              <span className="text-accent-solid group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                Inspect Dossier
                <ChevronRight className="size-3" />
              </span>

              <div className="flex items-center gap-1">
                {externalUrl && (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded text-ink-3 hover:text-ink hover:bg-field tap"
                    title="Open external link"
                  >
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, title, item.id)}
                  className="p-1 rounded text-ink-3 hover:text-ink hover:bg-field tap"
                  title="Copy ID / Name"
                >
                  {copiedId === item.id ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
