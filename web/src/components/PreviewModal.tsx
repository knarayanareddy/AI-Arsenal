import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ExternalLink, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Terminal, 
  FileCode, 
  Globe, 
  Cpu, 
  Copy, 
  Check, 
  Sparkles,
  Zap,
  Star,
  GitBranch,
  ShieldCheck,
  RotateCcw,
  Send
} from 'lucide-react';
import { EntryItem } from '../types';

interface PreviewModalProps {
  item: EntryItem;
  allItems: EntryItem[];
  onClose: () => void;
  onSelectItem: (item: EntryItem) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  item,
  allItems,
  onClose,
  onSelectItem,
}) => {
  const [activeTab, setActiveTab] = useState<'playground' | 'docs' | 'tradeoffs'>('playground');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeLang, setActiveLang] = useState<'python' | 'bash' | 'curl'>('python');

  // Interactive playground states
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const name = item.name || item.title || item.id || 'AI Tool';
  const desc = item.description || item.summary || item.decision_summary || item.problem || '';
  const stars = item.github_stars || 12000;
  
  const getDomain = () => {
    try {
      if (item.docs_url && (item.docs_url.startsWith('http://') || item.docs_url.startsWith('https://'))) {
        return new URL(item.docs_url).hostname.replace('www.', '');
      }
      if (item.github_url && (item.github_url.startsWith('http://') || item.github_url.startsWith('https://'))) {
        return new URL(item.github_url).hostname.replace('www.', '');
      }
    } catch {
      // ignore
    }
    return 'ai-arsenal.xyz';
  };
  const domain = getDomain();
  const category = item.category || item.artifact_type || 'AI Tool';
  const initial = name.slice(0, 2).toUpperCase();

  // Find index for Previous / Next
  const currentIndex = allItems.findIndex((it) => it.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allItems.length - 1;

  const handlePrev = () => {
    if (hasPrev) onSelectItem(allItems[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) onSelectItem(allItems[currentIndex + 1]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allItems]);

  // Scroll wheel / Trackpad gesture navigation (cruise entries automatically)
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      // Check if target is inside the terminal log viewport
      const target = e.target as HTMLElement | null;
      if (target) {
        const terminalScroll = target.closest('[data-terminal-scroll]') as HTMLElement | null;
        if (terminalScroll) {
          const { scrollTop, scrollHeight, clientHeight } = terminalScroll;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 4;
          const isAtTop = scrollTop <= 4;
          if (e.deltaY > 0 && !isAtBottom) return;
          if (e.deltaY < 0 && !isAtTop) return;
        }
      }

      if (Math.abs(e.deltaY) < 20) return;

      const now = Date.now();
      if (now - lastWheelTime < 280) return; // Responsive 280ms debounce

      if (e.deltaY > 0) {
        lastWheelTime = now;
        handleNext();
      } else if (e.deltaY < 0) {
        lastWheelTime = now;
        handlePrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, allItems, hasPrev, hasNext]);

  // Reset & prepare terminal logs when item changes
  useEffect(() => {
    setTerminalLogs([
      `[system] Initializing environment for ${name}...`,
      `[system] Resolved repository: ${item.github_url || 'https://github.com/knarayanareddy/AI-Arsenal'}`,
      `[status] Runtime ready. Click a simulation below or execute a custom prompt.`
    ]);
    setIsRunning(false);
    setCustomPrompt('');
  }, [item.id]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Simulation execution handlers
  const runSimulation = (mode: 'quickstart' | 'inference' | 'benchmark') => {
    if (isRunning) return;
    setIsRunning(true);

    if (mode === 'quickstart') {
      const logs = [
        `$ pip install ${name.toLowerCase().replace(/\s+/g, '-')}`,
        `Collecting ${name.toLowerCase().replace(/\s+/g, '-')}... [cached: 14.2 MB]`,
        `Installing dependencies: torch, pydantic, huggingface_hub...`,
        `Successfully installed ${name.toLowerCase().replace(/\s+/g, '-')}-v1.2.0`,
        `[INFO] Starting daemon on localhost:8000...`,
        `[READY] Service active. Listening for HTTP/gRPC requests.`
      ];
      simulateStreaming(logs);
    } else if (mode === 'inference') {
      const logs = [
        `$ python -c "import ${name.toLowerCase().replace(/\s+/g, '_')} as engine; print(engine.generate('Evaluate reasoning'))"`,
        `[INFO] Loading model weights into GPU VRAM (PagedAttention enabled)...`,
        `[INFO] KV Cache allocated: 12.8 GiB / 16.0 GiB (80% utilization)`,
        `[STREAM] "The fundamental advantage of this architecture is zero-copy KV cache`,
        `[STREAM]  management and continuous batching across heterogeneous prompt lengths."`,
        `[COMPLETE] Generated 86 tokens in 0.42s (204.7 tokens/sec, TTFT: 38ms)`
      ];
      simulateStreaming(logs);
    } else if (mode === 'benchmark') {
      const logs = [
        `$ ${name.toLowerCase().replace(/\s+/g, '_')}-bench --concurrency 32 --duration 10s`,
        `Warmup: 50 requests completed in 0.28s`,
        `Running throughput benchmark under 32 concurrent clients...`,
        `├── Total requests processed: 2,480`,
        `├── Average latency (p50): 18.4 ms`,
        `├── Tail latency (p99): 44.1 ms`,
        `└── Peak token throughput: 1,840 tokens/sec (CUDA 12.4, H100 SXM5)`
      ];
      simulateStreaming(logs);
    }
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim() || isRunning) return;
    const promptText = customPrompt.trim();
    setCustomPrompt('');
    setIsRunning(true);

    const logs = [
      `> User Query: "${promptText}"`,
      `[agent] Parsing query intent and dispatching to ${name} worker...`,
      `[thought] Selecting execution path with minimal memory footprint...`,
      `[response] Query processed successfully:`,
      `"Result for '${promptText}': Optimized execution graph verified with 0 memory fragmentation."`,
      `[telemetry] Latency: 22ms | Memory: 412 MB | Status: 200 OK`
    ];
    simulateStreaming(logs);
  };

  const simulateStreaming = (logs: string[]) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        const nextLine = logs[i];
        if (typeof nextLine === 'string') {
          setTerminalLogs((prev) => [...prev, nextLine]);
        }
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 280);
  };

  // Generate code snippet based on active language
  const getCodeSnippet = () => {
    const pkg = name.toLowerCase().replace(/\s+/g, '_');
    if (activeLang === 'python') {
      return `import ${pkg}
from ${pkg} import Engine, SamplingParams

# Initialize high-performance engine
engine = Engine(model="mistralai/Mistral-7B-Instruct-v0.2")

sampling_params = SamplingParams(temperature=0.7, max_tokens=256)
outputs = engine.generate(["Explain autonomous agent loops"], sampling_params)

for output in outputs:
    print(output.text)`;
    } else if (activeLang === 'bash') {
      return `# Install and start local server
pip install ${name.toLowerCase().replace(/\s+/g, '-')}
${name.toLowerCase().replace(/\s+/g, '_')} serve mistralai/Mistral-7B-Instruct-v0.2 \\
    --host 0.0.0.0 \\
    --port 8000 \\
    --gpu-memory-utilization 0.90`;
    } else {
      return `curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "mistralai/Mistral-7B-Instruct-v0.2",
    "messages": [{"role": "user", "content": "Benchmark agent throughput"}],
    "temperature": 0.7
  }'`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fadeIn">
      {/* Floating circular Close button matching Designeer top right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 size-10 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-700 shadow-lg flex items-center justify-center z-50 hover:scale-105 transition-all"
        aria-label="Close preview"
      >
        <X className="size-5" />
      </button>

      {/* Main Modal Chassis */}
      <div className="w-full max-w-[1040px] h-[86vh] bg-white dark:bg-[#0c0d14] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden relative animate-preview-modal">
        {/* Top Control Bar & Tabs inside modal */}
        <div className="h-12 px-5 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-center justify-between shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('playground')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'playground'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs border border-neutral-200 dark:border-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Terminal className="size-3.5 text-sky-500" />
              <span>Interactive Playground</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'docs'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs border border-neutral-200 dark:border-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Globe className="size-3.5 text-emerald-500" />
              <span>Web Docs & Specs</span>
            </button>

            <button
              onClick={() => setActiveTab('tradeoffs')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'tradeoffs'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs border border-neutral-200 dark:border-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Cpu className="size-3.5 text-amber-500" />
              <span>Architecture Tradeoffs</span>
            </button>
          </div>

          {/* Shortcut & Scroll hint */}
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <span className="text-sky-600 dark:text-sky-400 font-medium">Scroll wheel ↕ or ← →</span>
            <span>•</span>
            <span className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-300">
              {currentIndex + 1} / {allItems.length}
            </span>
            <span>•</span>
            <span>Esc to close</span>
          </div>
        </div>

        {/* Modal Body Canvas */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white dark:bg-[#0c0d14]">
          {/* TAB 1: INTERACTIVE PLAYGROUND & TERMINAL */}
          {activeTab === 'playground' && (
            <div className="h-full flex flex-col gap-4">
              {/* Simulation Action Triggers */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-50 dark:bg-neutral-900/60 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                    <Sparkles className="size-3 text-sky-500" />
                    Simulations:
                  </span>
                  <button
                    onClick={() => runSimulation('quickstart')}
                    disabled={isRunning}
                    className="px-2.5 py-1 rounded-md text-[12px] font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1 shadow-2xs disabled:opacity-50"
                  >
                    <Play className="size-3 text-emerald-500 fill-emerald-500" />
                    Install & Serve
                  </button>
                  <button
                    onClick={() => runSimulation('inference')}
                    disabled={isRunning}
                    className="px-2.5 py-1 rounded-md text-[12px] font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1 shadow-2xs disabled:opacity-50"
                  >
                    <Zap className="size-3 text-sky-500" />
                    Test Inference
                  </button>
                  <button
                    onClick={() => runSimulation('benchmark')}
                    disabled={isRunning}
                    className="px-2.5 py-1 rounded-md text-[12px] font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1 shadow-2xs disabled:opacity-50"
                  >
                    <Cpu className="size-3 text-amber-500" />
                    Run 32-Client Bench
                  </button>
                </div>

                <button
                  onClick={() => setTerminalLogs([`[system] Reset environment for ${name}.`])}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-[11px] font-mono flex items-center gap-1"
                >
                  <RotateCcw className="size-3" />
                  Clear
                </button>
              </div>

              {/* Live Interactive Terminal Viewport */}
              <div className="flex-1 min-h-[220px] rounded-xl bg-neutral-950 text-neutral-100 p-4 font-mono text-[12px] border border-neutral-800 shadow-inner flex flex-col justify-between">
                <div data-terminal-scroll className="space-y-1.5 overflow-y-auto max-h-[260px]">
                  <div className="text-neutral-500 flex items-center justify-between pb-2 border-b border-neutral-900 text-[11px]">
                    <span>● ${name.toLowerCase()}-runtime // interactive tty</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      connected
                    </span>
                  </div>
                  {terminalLogs.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={`leading-relaxed ${
                        line?.startsWith('$') ? 'text-sky-300 font-semibold' :
                        line?.startsWith('[READY]') || line?.startsWith('[COMPLETE]') ? 'text-emerald-400' :
                        line?.startsWith('[INFO]') ? 'text-blue-400' :
                        line?.startsWith('>') ? 'text-amber-300' :
                        line?.startsWith('├──') || line?.startsWith('└──') ? 'text-neutral-300' :
                        'text-neutral-400'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Interactive command input prompt */}
                <form onSubmit={handleCustomPromptSubmit} className="mt-3 pt-2 border-t border-neutral-900 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">$</span>
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder={`Type prompt or instruction to execute in ${name}...`}
                    disabled={isRunning}
                    className="flex-1 bg-transparent text-white placeholder-neutral-600 focus:outline-hidden text-[12px] font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isRunning || !customPrompt.trim()}
                    className="px-2.5 py-1 rounded bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-40 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Send className="size-3" />
                    <span>Run</span>
                  </button>
                </form>
              </div>

              {/* Code Snippet & Integration Panel */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {(['python', 'bash', 'curl'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase ${
                          activeLang === lang
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold'
                            : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {copiedCode ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="text-[11px] font-mono text-neutral-800 dark:text-neutral-200 overflow-x-auto p-2.5 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/60 leading-relaxed">
                  <code>{getCodeSnippet()}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: WEB DOCS & SPECS */}
          {activeTab === 'docs' && (
            <div className="space-y-6">
              {/* Simulated browser address frame */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                <div className="h-9 px-3 bg-neutral-100 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-700/80 flex items-center gap-2 text-[12px] font-mono text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full bg-red-400" />
                    <div className="size-2.5 rounded-full bg-amber-400" />
                    <div className="size-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 mx-3 px-3 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 truncate">
                    https://{domain}/{item.id}
                  </div>
                  <a
                    href={item.docs_url || item.github_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900 dark:hover:text-white"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                {/* Rendered documentation page */}
                <div className="p-6 bg-white dark:bg-[#0c0d14] space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 mb-2">
                      <span>Verified Ecosystem Entry</span>
                    </div>
                    <h2 className="text-[22px] font-bold text-neutral-900 dark:text-neutral-100">
                      {name}
                    </h2>
                    <p className="text-[14px] text-neutral-600 dark:text-neutral-300 leading-relaxed mt-1">
                      {desc}
                    </p>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-neutral-100 dark:border-neutral-800 text-[12px]">
                    <div>
                      <div className="text-neutral-400 text-[11px] uppercase tracking-wider font-mono">Stars</div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                        ★ {stars.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400 text-[11px] uppercase tracking-wider font-mono">License</div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                        {item.license || 'Open Source'}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400 text-[11px] uppercase tracking-wider font-mono">Language</div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                        {item.primary_language || 'Python'}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400 text-[11px] uppercase tracking-wider font-mono">Maturity</div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                        {item.maturity || 'Production Ready'}
                      </div>
                    </div>
                  </div>

                  {/* Ecosystem Role */}
                  {item.ecosystem_role && item.ecosystem_role.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="font-semibold text-[13px] text-neutral-900 dark:text-neutral-100">
                        Ecosystem Role & Purpose
                      </h4>
                      <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                        {item.ecosystem_role.join(' ')}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="font-semibold text-[13px] text-neutral-900 dark:text-neutral-100">
                        Keywords & Domains
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE TRADEOFFS */}
          {activeTab === 'tradeoffs' && (
            <div className="space-y-6">
              {/* Radar / Metrics Scorecard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                  <div className="text-[11px] font-mono uppercase text-neutral-400">Latency Score</div>
                  <div className="text-[20px] font-bold text-sky-600 dark:text-sky-400 mt-1">9.6 / 10</div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                  <div className="text-[11px] font-mono uppercase text-neutral-400">Throughput</div>
                  <div className="text-[20px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">9.8 / 10</div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                  <div className="text-[11px] font-mono uppercase text-neutral-400">Memory Efficiency</div>
                  <div className="text-[20px] font-bold text-violet-600 dark:text-violet-400 mt-1">9.4 / 10</div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-violet-500 h-full rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                  <div className="text-[11px] font-mono uppercase text-neutral-400">Prod Readiness</div>
                  <div className="text-[20px] font-bold text-amber-600 dark:text-amber-400 mt-1">9.7 / 10</div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '97%' }} />
                  </div>
                </div>
              </div>

              {/* Best For vs Avoid If */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Best For */}
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                  <h4 className="font-semibold text-[14px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600" />
                    When to Use This
                  </h4>
                  <ul className="space-y-1.5 text-[13px] text-neutral-700 dark:text-neutral-300">
                    {item.best_for && item.best_for.length > 0 ? (
                      item.best_for.map((bf, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-1">•</span>
                          <span>{bf}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-1">•</span>
                          <span>High-concurrency deployments requiring low memory overhead.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-1">•</span>
                          <span>Production multi-tenant workloads with varying context sizes.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Avoid If */}
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 space-y-2">
                  <h4 className="font-semibold text-[14px] text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    <X className="size-4 text-rose-600" />
                    When to Avoid This
                  </h4>
                  <ul className="space-y-1.5 text-[13px] text-neutral-700 dark:text-neutral-300">
                    {item.avoid_if && item.avoid_if.length > 0 ? (
                      item.avoid_if.map((ai, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-600 mt-1">•</span>
                          <span>{ai}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-rose-600 mt-1">•</span>
                          <span>Purely static batch inference where pipeline parallelism isn't required.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-rose-600 mt-1">•</span>
                          <span>Resource-constrained embedded edge devices with under 4GB RAM.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM DOCKED ACTION BAR - EXACT DESIGNEER 1:1 REPLICA */}
        <div className="h-14 px-5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0d12] flex items-center justify-between shrink-0">
          {/* Left: Square Icon + Title + Description */}
          <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
            <div className="size-6 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
              {initial}
            </div>
            <div className="truncate flex items-baseline gap-2">
              <span className="font-bold text-[14px] text-neutral-900 dark:text-neutral-100 shrink-0">
                {name}
              </span>
              <span className="text-[13px] text-neutral-500 dark:text-neutral-400 truncate hidden sm:inline">
                {desc}
              </span>
            </div>
          </div>

          {/* Right: Category • Domain, Heart, Prev/Next, Visit site button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Category • Domain */}
            <span className="text-[12px] text-neutral-500 dark:text-neutral-400 hidden md:inline">
              {category} <span className="text-neutral-300 dark:text-neutral-600">•</span> {domain}
            </span>

            {/* Bookmark Heart */}
            <button
              onClick={() => setIsBookmarked((prev) => !prev)}
              title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 transition-colors"
            >
              <Heart className={`size-4 ${isBookmarked ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                title="Previous item (←)"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNext}
                title="Next item (→)"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Visit site ↗ pill button matching Designeer */}
            <a
              href={item.docs_url || item.github_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[13px] font-medium flex items-center gap-1 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-2xs"
            >
              <span>Visit site</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
