import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { EntryItem } from '../types';

interface FloatingAdPillProps {
  onSelectItem: (item: EntryItem) => void;
}

const FEATURED_PILLS = [
  {
    id: 'vllm',
    name: 'vLLM Engine',
    desc: 'High-throughput PagedAttention serving.',
    tag: 'SPONSORED',
    url: 'https://vllm.ai',
    stars: 38400,
  },
  {
    id: 'ollama',
    name: 'Ollama 3.3',
    desc: 'Run local LLMs with one CLI command.',
    tag: 'FEATURED',
    url: 'https://ollama.com',
    stars: 115000,
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    desc: 'Multi-agent state machines & cycles.',
    tag: 'FEATURED',
    url: 'https://langchain.com',
    stars: 19200,
  }
];

export const FloatingAdPill: React.FC<FloatingAdPillProps> = ({ onSelectItem }) => {
  const [visible, setVisible] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!visible) return null;

  const current = FEATURED_PILLS[activeIdx];

  return (
    <aside aria-label="Featured recommendation" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 animate-pill">
      {/* Main Pill */}
      <div 
        onClick={() => {
          onSelectItem({
            id: current.id,
            name: current.name,
            description: current.desc,
            docs_url: current.url,
            github_stars: current.stars,
            category: 'featured'
          } as EntryItem);
        }}
        className="group cursor-pointer bg-white dark:bg-[#12131a] border border-neutral-200/90 dark:border-neutral-700/80 shadow-xl hover:shadow-2xl rounded-2xl px-3.5 py-2 flex flex-col items-center gap-1.5 transition-all max-w-[340px] sm:max-w-[400px]"
      >
        <div className="flex items-center gap-3 w-full">
          {/* Icon */}
          <div className="size-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 shadow-2xs">
            {current.name.slice(0, 2).toUpperCase()}
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[13px] text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {current.name}
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-1 py-0.2 rounded border border-sky-200 dark:border-sky-800">
                {current.tag}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
              {current.desc}
            </p>
          </div>

          {/* Button */}
          <div className="h-7 px-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[12px] font-medium flex items-center gap-0.5 shrink-0 group-hover:bg-sky-600 dark:group-hover:bg-neutral-200 transition-colors shadow-2xs">
            <span>Visit</span>
            <ArrowUpRight className="size-3" />
          </div>
        </div>

        {/* Carousel dots indicator */}
        <div className="flex items-center gap-1 pt-0.5">
          {FEATURED_PILLS.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              className={`size-1 rounded-full transition-all ${
                activeIdx === idx 
                  ? 'bg-neutral-800 dark:bg-white w-2' 
                  : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setVisible(false)}
        title="Dismiss"
        className="size-8 rounded-full bg-white dark:bg-[#12131a] border border-neutral-200/90 dark:border-neutral-700/80 shadow-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 flex items-center justify-center transition-colors"
      >
        <X className="size-3.5" />
      </button>
    </aside>
  );
};
