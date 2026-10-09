import React, { useEffect, useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  Copy, 
  Check, 
  Terminal, 
  GitBranch, 
  Cpu, 
  ShieldCheck, 
  BookOpen, 
  Share2,
  GitFork
} from 'lucide-react';
import { EntryItem } from '../types';

interface DetailDossierProps {
  item: EntryItem | null;
  onClose: () => void;
}

export const DetailDossier: React.FC<DetailDossierProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const title = item.name || item.title || item.id;
  const externalUrl = item.github_url || item.docs_url || item.source_url || item.paper_url || item.demo_url;
  const installCmd = item.primary_language === 'Python' || item.stack?.includes('python')
    ? `pip install ${item.name?.toLowerCase() || item.id}`
    : item.github_url
    ? `git clone ${item.github_url}.git`
    : `npm install ${item.id}`;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-surface border-l border-line h-full flex flex-col justify-between shadow-2xl animate-drawer overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 px-6 border-b border-line flex items-center justify-between sticky top-0 bg-surface/90 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent-solid animate-pulse"></span>
              <span className="text-micro font-mono uppercase tracking-wider text-ink-3">
                Technical Dossier
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyText(window.location.href)}
                className="p-2 rounded-control text-ink-3 hover:text-ink hover:bg-field tap"
                title="Copy Entry Link"
              >
                <Share2 className="size-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-control text-ink-3 hover:text-ink hover:bg-field tap"
                title="Close (Esc)"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="p-6 space-y-6">
            {/* Title & Primary Badges */}
            <div>
              <h2 className="text-[22px] font-display font-semibold text-ink leading-tight">
                {title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 font-mono text-micro text-ink-3">
                {item.phase && (
                  <span className="px-2 py-0.5 rounded bg-field border border-line text-ink-2">
                    phase: {item.phase}
                  </span>
                )}
                {item.category && (
                  <span className="px-2 py-0.5 rounded bg-field border border-line text-ink-2">
                    cat: {item.category}
                  </span>
                )}
                {item.maturity && (
                  <span className={`px-2 py-0.5 rounded border ${
                    item.maturity === 'production' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-field text-ink-2 border-line'
                  }`}>
                    maturity: {item.maturity}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Telemetry Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-control bg-field/60 border border-line-soft font-mono text-micro">
              <div>
                <span className="text-ink-3 block text-[10px] uppercase">Stars</span>
                <span className="text-ink font-semibold flex items-center gap-1 mt-0.5">
                  <Star className="size-3 text-amber-400 fill-amber-400" />
                  {item.github_stars?.toLocaleString() || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-ink-3 block text-[10px] uppercase">License</span>
                <span className="text-ink font-semibold mt-0.5 block truncate">
                  {item.license || 'Open Source'}
                </span>
              </div>
              <div>
                <span className="text-ink-3 block text-[10px] uppercase">Stack</span>
                <span className="text-ink font-semibold mt-0.5 block truncate">
                  {item.primary_language || item.stack?.[0] || 'Any'}
                </span>
              </div>
              <div>
                <span className="text-ink-3 block text-[10px] uppercase">Cost Model</span>
                <span className="text-ink font-semibold mt-0.5 block truncate">
                  {item.cost_model || 'Free'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-micro font-mono uppercase tracking-wider text-ink-3 font-semibold">
                Overview & Architecture
              </h4>
              <p className="text-body text-ink-2 leading-relaxed font-sans">
                {item.description || item.summary || item.decision_summary || item.problem}
              </p>
            </div>

            {/* Ecosystem Role */}
            {item.ecosystem_role && item.ecosystem_role.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-micro font-mono uppercase tracking-wider text-ink-3 font-semibold">
                  Ecosystem Position & Tradeoffs
                </h4>
                <div className="p-3.5 rounded-control bg-field/40 border border-line space-y-2">
                  {item.ecosystem_role.map((role, idx) => (
                    <p key={idx} className="text-body text-ink-2 leading-relaxed text-[13px]">
                      {role}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Health Signals */}
            {item.health_signals && item.health_signals.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-micro font-mono uppercase tracking-wider text-ink-3 font-semibold">
                  Health & Maintenance Signals
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.health_signals.map((sig) => (
                    <span 
                      key={sig} 
                      className="px-2.5 py-1 rounded text-caption font-mono bg-field border border-line text-ink flex items-center gap-1.5"
                    >
                      <ShieldCheck className="size-3.5 text-accent-solid" />
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Alternatives */}
            {item.alternatives && item.alternatives.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-micro font-mono uppercase tracking-wider text-ink-3 font-semibold">
                  Direct Evaluated Alternatives
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.alternatives.map((alt) => (
                    <span key={alt} className="px-2 py-0.5 rounded text-caption font-mono bg-field text-ink-2 border border-line">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quickstart Command */}
            <div className="space-y-1.5">
              <h4 className="text-micro font-mono uppercase tracking-wider text-ink-3 font-semibold">
                Quickstart Execution
              </h4>
              <div className="p-3 rounded-control bg-inset border border-line font-mono text-caption text-ink flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 truncate">
                  <Terminal className="size-3.5 text-accent-solid shrink-0" />
                  <span className="truncate">{installCmd}</span>
                </div>
                <button
                  onClick={() => copyText(installCmd)}
                  className="p-1 rounded text-ink-3 hover:text-ink tap shrink-0"
                  title="Copy command"
                >
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-line bg-surface/90 sticky bottom-0 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-control border border-line text-caption font-mono text-ink-2 hover:bg-field tap"
          >
            Close
          </button>

          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-control bg-accent-solid hover:bg-accent-solid/90 text-black text-caption font-mono font-semibold flex items-center gap-1.5 tap shadow-glow/20"
            >
              <span>Visit Official Source</span>
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
