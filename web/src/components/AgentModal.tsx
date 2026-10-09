import React, { useState } from 'react';
import { X, Terminal, Sparkles, Play, Check, Copy, ExternalLink, Code2 } from 'lucide-react';
import { EntryItem } from '../types';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  allDocs: EntryItem[];
}

export const AgentModal: React.FC<AgentModalProps> = ({
  isOpen,
  onClose,
  allDocs,
}) => {
  const [selectedTool, setSelectedTool] = useState('search_arsenal');
  const [queryInput, setQueryInput] = useState('vLLM');
  const [idInput, setIdInput] = useState('vllm');
  const [resultJson, setResultJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRunTool = () => {
    if (selectedTool === 'search_arsenal') {
      const q = queryInput.toLowerCase();
      const hits = allDocs.filter((d) => 
        (d.name || d.title || d.id).toLowerCase().includes(q) ||
        (d.description || d.summary || '').toLowerCase().includes(q)
      ).slice(0, 5);

      setResultJson(JSON.stringify({
        status: 'success',
        tool: 'search_arsenal',
        query: queryInput,
        count: hits.length,
        results: hits.map(h => ({
          id: h.id,
          name: h.name || h.title,
          phase: h.phase,
          stars: h.github_stars,
          license: h.license,
          description: h.description || h.summary
        }))
      }, null, 2));
    } else if (selectedTool === 'get_entry_dossier') {
      const found = allDocs.find(d => d.id.toLowerCase() === idInput.toLowerCase()) || allDocs[0];
      setResultJson(JSON.stringify({
        status: 'success',
        tool: 'get_entry_dossier',
        id: found.id,
        dossier: found
      }, null, 2));
    } else if (selectedTool === 'list_architectures') {
      const archs = allDocs.filter(d => !!d.approaches).slice(0, 4);
      setResultJson(JSON.stringify({
        status: 'success',
        tool: 'list_architectures',
        count: archs.length,
        items: archs.map(a => ({
          id: a.id,
          title: a.title,
          category: a.category,
          decision_summary: a.decision_summary,
          approaches_count: a.approaches?.length
        }))
      }, null, 2));
    } else if (selectedTool === 'compare_entries') {
      const entryA = allDocs.find(d => d.id.includes('vllm')) || allDocs[0];
      const entryB = allDocs.find(d => d.id.includes('llama')) || allDocs[1];
      setResultJson(JSON.stringify({
        status: 'success',
        tool: 'compare_entries',
        comparison: {
          entry_a: { id: entryA.id, name: entryA.name || entryA.title, stars: entryA.github_stars, license: entryA.license, stack: entryA.primary_language },
          entry_b: { id: entryB.id, name: entryB.name || entryB.title, stars: entryB.github_stars, license: entryB.license, stack: entryB.primary_language },
        }
      }, null, 2));
    }
  };

  const copyResult = () => {
    if (resultJson) {
      navigator.clipboard.writeText(resultJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-3xl bg-surface border border-line rounded-card shadow-2xl overflow-hidden animate-modal flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-line flex items-center justify-between bg-field/40">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-control bg-accent-tint border border-accent-solid/30 flex items-center justify-center text-accent-solid">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-headline text-ink">
                WebMCP Browser Agent Interface
              </h3>
              <p className="text-micro font-mono text-ink-3">
                W3C Draft Standard: Browser-invocable Model Context Protocol Tools
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-control text-ink-3 hover:text-ink hover:bg-field tap">
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <p className="text-body text-ink-2">
            Browsing AI agents can invoke registered WebMCP tools directly without fetching or scraping HTML. All tools return validated machine-readable contracts from <code className="text-accent-solid font-mono text-micro">/data/*.json</code>.
          </p>

          {/* Tool Selection Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'search_arsenal', label: 'search_arsenal' },
              { id: 'get_entry_dossier', label: 'get_entry_dossier' },
              { id: 'list_architectures', label: 'list_architectures' },
              { id: 'compare_entries', label: 'compare_entries' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTool(t.id);
                  setResultJson(null);
                }}
                className={`px-3 py-2 rounded-control font-mono text-caption tap border text-left truncate ${
                  selectedTool === t.id
                    ? 'bg-field text-accent-solid border-accent-solid/40 font-medium'
                    : 'bg-field/50 text-ink-3 hover:text-ink border-line'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tool Inputs */}
          <div className="p-3.5 rounded-control bg-field/60 border border-line-soft space-y-3 font-mono text-caption">
            {selectedTool === 'search_arsenal' && (
              <div>
                <label className="text-micro text-ink-3 block mb-1">Argument: query</label>
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="w-full h-8 px-2.5 rounded bg-surface border border-line text-ink outline-none"
                  placeholder="e.g. vLLM, agent framework, RAG"
                />
              </div>
            )}

            {selectedTool === 'get_entry_dossier' && (
              <div>
                <label className="text-micro text-ink-3 block mb-1">Argument: id</label>
                <input
                  type="text"
                  value={idInput}
                  onChange={(e) => setIdInput(e.target.value)}
                  className="w-full h-8 px-2.5 rounded bg-surface border border-line text-ink outline-none"
                  placeholder="e.g. vllm, accelerate, llama-cpp"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-micro text-ink-3">Simulates browser execution of registered WebMCP tool</span>
              <button
                type="button"
                onClick={handleRunTool}
                className="px-4 py-1.5 rounded-control bg-accent-solid hover:bg-accent-solid/90 text-black font-semibold text-caption font-mono flex items-center gap-1.5 tap"
              >
                <Play className="size-3 fill-black" />
                Execute Tool
              </button>
            </div>
          </div>

          {/* JSON Result Output */}
          {resultJson && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-micro text-ink-3">
                <span>Output Payload (JSON Contract):</span>
                <button
                  onClick={copyResult}
                  className="hover:text-ink flex items-center gap-1"
                >
                  {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-control bg-inset border border-line font-mono text-micro text-ink-2 overflow-x-auto max-h-56 leading-relaxed">
                {resultJson}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-line bg-surface flex items-center justify-between text-caption font-mono text-ink-3">
          <div className="flex items-center gap-3">
            <a href="./mcp.json" target="_blank" rel="noopener noreferrer" className="hover:text-ink flex items-center gap-1">
              <span>View mcp.json</span>
              <ExternalLink className="size-3" />
            </a>
            <a href="./llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-ink flex items-center gap-1">
              <span>View llms.txt</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-control bg-field border border-line hover:text-ink tap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
