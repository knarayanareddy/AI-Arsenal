import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  ExternalLink, 
  Play, 
  Zap, 
  Cpu, 
  Copy, 
  Check, 
  Star, 
  Layers, 
  Maximize2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { EntryItem } from '../types';

interface SplitPreviewPaneProps {
  item: EntryItem | null;
  onOpenFullModal: (item: EntryItem) => void;
}

export const SplitPreviewPane: React.FC<SplitPreviewPaneProps> = ({
  item,
  onOpenFullModal,
}) => {
  if (!item) {
    return (
      <div className="sticky top-20 h-[calc(100vh-6rem)] rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center p-6 text-center text-neutral-400">
        <Layers className="size-8 text-neutral-300 dark:text-neutral-700 mb-2 animate-bounce" />
        <p className="text-[14px] font-medium text-neutral-600 dark:text-neutral-400">Scroll to preview tools</p>
        <p className="text-[12px] text-neutral-400 mt-1 max-w-[220px]">
          As you scroll through the list, live previews appear automatically here.
        </p>
      </div>
    );
  }

  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const name = item.name || item.title || item.id || 'AI Tool';
  const desc = item.description || item.summary || item.decision_summary || item.problem || '';
  const stars = item.github_stars;
  const category = item.category || item.artifact_type || 'AI Tool';
  const initial = name.slice(0, 2).toUpperCase();

  const getDomain = () => {
    try {
      if (item.docs_url && (item.docs_url.startsWith('http://') || item.docs_url.startsWith('https://'))) {
        return new URL(item.docs_url).hostname.replace('www.', '');
      }
      if (item.github_url && (item.github_url.startsWith('http://') || item.github_url.startsWith('https://'))) {
        return new URL(item.github_url).hostname.replace('www.', '');
      }
    } catch {}
    return 'ai-arsenal.xyz';
  };
  const domain = getDomain();

  // Reset & prepare terminal logs when active item changes
  useEffect(() => {
    setTerminalLogs([
      `[auto-inspect] Scrolled into focus: ${name}`,
      `$ pip install ${name.toLowerCase().replace(/\s+/g, '-')}`,
      `[status] Connected to ${domain} • Ready for simulation`
    ]);
    setIsRunning(false);
  }, [item.id]);

  useEffect(() => {
    if (terminalEndRef.current && terminalEndRef.current.parentElement) {
      terminalEndRef.current.parentElement.scrollTop = terminalEndRef.current.parentElement.scrollHeight;
    }
  }, [terminalLogs]);

  const runSimulation = (mode: 'quickstart' | 'inference') => {
    if (isRunning) return;
    setIsRunning(true);

    if (mode === 'quickstart') {
      const logs = [
        `$ pip install ${name.toLowerCase().replace(/\s+/g, '-')}`,
        `Collecting dependencies: torch, pydantic, huggingface_hub...`,
        `Successfully loaded ${name} v1.2.0 (CUDA 12.4)`,
        `[READY] Service active on localhost:8000`
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setTerminalLogs((prev) => [...prev, logs[i]]);
          i++;
        } else {
          clearInterval(interval);
          setIsRunning(false);
        }
      }, 260);
    } else {
      const logs = [
        `$ python -c "import ${name.toLowerCase().replace(/\s+/g, '_')}; print('Inference test passed')"` ,
        `[STREAM] "Executing neural pipeline with continuous batching..."`,
        `[COMPLETE] Generated 64 tokens in 0.28s (228.5 tok/sec)`
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setTerminalLogs((prev) => [...prev, logs[i]]);
          i++;
        } else {
          clearInterval(interval);
          setIsRunning(false);
        }
      }, 260);
    }
  };

  const copySnippet = () => {
    const snippet = `pip install ${name.toLowerCase().replace(/\s+/g, '-')}\nimport ${name.toLowerCase().replace(/\s+/g, '_')}`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-5.5rem)] glass-card rounded-2xl flex flex-col overflow-hidden relative">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -top-16 -right-16 size-48 bg-sky-500/10 dark:bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header of Preview Pane */}
      <div className="h-12 px-4 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.03] backdrop-blur-md flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300 font-semibold">
            Live Preview on Scroll
          </span>
        </div>

        <button
          onClick={() => onOpenFullModal(item)}
          title="Expand to Full Playground (⌘ E)"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 glass-pill transition-all"
        >
          <Maximize2 className="size-3" />
          <span>Full ⌘ E</span>
        </button>
      </div>

      {/* Pane Content with Smooth Cross-Fade on Item Change */}
      <div key={item.id} className="flex-1 overflow-y-auto p-4 space-y-4 animate-in fade-in slide-in-from-bottom-1 duration-150 relative z-10">
        {/* Title Bar */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-mono font-bold text-[12px] shrink-0 shadow-2xs">
              {initial}
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-neutral-900 dark:text-neutral-100 leading-tight">
                {name}
              </h3>
              <p className="text-[12px] font-mono text-neutral-400 dark:text-neutral-500 mt-0.5">
                {domain}
              </p>
            </div>
          </div>

          {stars && stars > 0 ? (
            <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
              <Star className="size-3 text-amber-500 fill-amber-500" />
              {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
            </span>
          ) : null}
        </div>

        {/* Description */}
        <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {desc}
        </p>

        {/* Interactive Terminal Sandbox */}
        <div className="rounded-xl bg-neutral-950 text-neutral-100 p-3.5 font-mono text-[11px] border border-neutral-800 shadow-inner flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-900 text-[10px] text-neutral-500">
            <span>● {name.toLowerCase()}-runtime</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => runSimulation('quickstart')}
                disabled={isRunning}
                className="hover:text-emerald-400 text-neutral-400 flex items-center gap-0.5 transition-colors disabled:opacity-50"
              >
                <Play className="size-2.5 fill-current" />
                <span>Run</span>
              </button>
              <span>•</span>
              <button
                onClick={() => runSimulation('inference')}
                disabled={isRunning}
                className="hover:text-sky-400 text-neutral-400 flex items-center gap-0.5 transition-colors disabled:opacity-50"
              >
                <Zap className="size-2.5" />
                <span>Infer</span>
              </button>
            </div>
          </div>

          <div className="space-y-1 py-2 overflow-y-auto max-h-[120px]">
            {terminalLogs.map((log, i) => (
              <div 
                key={i} 
                className={`truncate ${
                  log.startsWith('$') ? 'text-sky-300 font-semibold' :
                  log.startsWith('[READY]') || log.startsWith('[COMPLETE]') ? 'text-emerald-400' :
                  'text-neutral-400'
                }`}
              >
                {log}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-500">
            <span>CUDA 12.4 • H100 SXM5</span>
            <span>22ms latency</span>
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800">
            <span className="text-neutral-400 uppercase font-mono text-[10px]">Category</span>
            <p className="font-semibold text-neutral-800 dark:text-neutral-200 truncate mt-0.5">{category}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800">
            <span className="text-neutral-400 uppercase font-mono text-[10px]">License</span>
            <p className="font-semibold text-neutral-800 dark:text-neutral-200 truncate mt-0.5">{item.license || 'Open Source'}</p>
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 4).map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="h-12 px-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-center justify-between shrink-0">
        <button
          onClick={copySnippet}
          className="text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1 transition-colors"
        >
          {copiedCode ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
          <span>{copiedCode ? 'Copied' : 'Copy Pip'}</span>
        </button>

        <a
          href={item.docs_url || item.github_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="h-7 px-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[12px] font-medium flex items-center gap-1 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-2xs"
        >
          <span>Visit site</span>
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </div>
  );
};
