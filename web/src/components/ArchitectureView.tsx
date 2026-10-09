import React from 'react';
import { GitFork, Check, X, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { EntryItem } from '../types';

interface ArchitectureViewProps {
  items: EntryItem[];
  onSelectItem: (item: EntryItem) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({
  items,
  onSelectItem,
}) => {
  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="p-4 rounded-card bg-accent-tint/40 border border-accent-solid/20 flex items-start gap-3">
        <Sparkles className="size-4 text-accent-solid shrink-0 mt-0.5" />
        <div className="text-caption text-ink-2">
          <p className="font-medium text-ink">Engineering Decision Matrix</p>
          <p className="mt-0.5 text-ink-3">
            Each architecture entry below details a concrete system fork, evaluating distinct implementation approaches with tradeoff analysis across complexity, flexibility, and production reliability.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {items.map((item) => {
          return (
            <article
              key={item.id}
              className="rounded-card bg-surface border border-line p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line-soft pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-accent-tint text-accent-solid">
                      <GitFork className="size-3.5" />
                    </span>
                    <h3 className="font-display font-semibold text-headline text-ink">
                      {item.title}
                    </h3>
                  </div>
                  {item.category && (
                    <span className="text-micro font-mono text-ink-3 mt-1 inline-block">
                      Category: {item.category} · Type: {item.decision_type || 'decision-fork'}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className="px-3 py-1.5 rounded-control bg-field hover:bg-hover border border-line text-caption font-mono font-medium text-accent-solid tap shrink-0"
                >
                  Full Decision Dossier ↗
                </button>
              </div>

              {/* Decision Summary */}
              {item.decision_summary && (
                <div className="p-3 rounded-control bg-field/60 border border-line-soft text-body text-ink-2 font-sans leading-relaxed">
                  <span className="font-mono text-micro text-accent-solid uppercase font-semibold block mb-0.5">
                    Core Engineering Rule:
                  </span>
                  {item.decision_summary}
                </div>
              )}

              {/* Approaches Comparison Grid */}
              {item.approaches && item.approaches.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                  {item.approaches.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-control bg-field/40 border border-line flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-display font-semibold text-caption text-ink mb-1">
                          {app.name}
                        </h4>
                        <p className="text-micro text-ink-3 leading-relaxed mb-3">
                          {app.description}
                        </p>

                        {/* When to use */}
                        {app.when_to_use && app.when_to_use.length > 0 && (
                          <div className="mb-2">
                            <span className="text-[10px] font-mono text-emerald-400 font-medium uppercase block mb-1">
                              When to use:
                            </span>
                            <ul className="space-y-1">
                              {app.when_to_use.slice(0, 2).map((w, i) => (
                                <li key={i} className="text-micro text-ink-2 flex items-start gap-1.5 leading-snug">
                                  <Check className="size-3 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{w}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* When NOT to use */}
                        {app.when_not_to_use && app.when_not_to_use.length > 0 && (
                          <div className="mb-2">
                            <span className="text-[10px] font-mono text-rose-400 font-medium uppercase block mb-1">
                              Avoid when:
                            </span>
                            <ul className="space-y-1">
                              {app.when_not_to_use.slice(0, 2).map((w, i) => (
                                <li key={i} className="text-micro text-ink-3 flex items-start gap-1.5 leading-snug">
                                  <X className="size-3 text-rose-400 shrink-0 mt-0.5" />
                                  <span>{w}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Tradeoffs */}
                      {app.tradeoffs && (
                        <div className="pt-2 border-t border-line-soft mt-3 text-[10px] font-mono text-ink-3 space-y-1">
                          {app.tradeoffs.complexity && (
                            <div><strong className="text-ink-2">Complexity:</strong> {app.tradeoffs.complexity}</div>
                          )}
                          {app.tradeoffs.reliability && (
                            <div><strong className="text-ink-2">Reliability:</strong> {app.tradeoffs.reliability}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
