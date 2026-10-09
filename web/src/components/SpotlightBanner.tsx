import React, { useState } from 'react';
import { Megaphone, ExternalLink, ArrowUpRight } from 'lucide-react';
import { EntryItem } from '../types';

interface SpotlightBannerProps {
  onSelectItem: (item: EntryItem) => void;
}

const SPOTLIGHT_PAIRS: {
  id: string;
  badge: string;
  items: {
    name: string;
    description: string;
    url: string;
    tag: string;
    stars: string;
    entryRef: Partial<EntryItem>;
  }[];
}[] = [
  {
    id: 'pair-1',
    badge: 'SPONSORED',
    items: [
      {
        name: 'vLLM Serving Engine',
        description: 'High-throughput and memory-efficient LLM serving engine with PagedAttention and continuous batching.',
        url: 'https://vllm.ai',
        tag: 'Inference',
        stars: '38.4k',
        entryRef: {
          id: 'vllm',
          name: 'vLLM',
          description: 'High-throughput and memory-efficient LLM serving engine with PagedAttention and continuous batching.',
          github_url: 'https://github.com/vllm-project/vllm',
          docs_url: 'https://docs.vllm.ai',
          category: 'inference',
          primary_language: 'Python',
          license: 'Apache-2.0',
          github_stars: 38400,
        }
      },
      {
        name: 'Ollama Local Models',
        description: 'Get up and running with Llama 3.3, DeepSeek-R1, and Mistral locally on macOS, Linux, and Windows in one command.',
        url: 'https://ollama.com',
        tag: 'Runtimes',
        stars: '115k',
        entryRef: {
          id: 'ollama',
          name: 'Ollama',
          description: 'Get up and running with Llama 3.3, DeepSeek-R1, and Mistral locally on macOS, Linux, and Windows in one command.',
          github_url: 'https://github.com/ollama/ollama',
          docs_url: 'https://ollama.com',
          category: 'runtimes',
          primary_language: 'Go',
          license: 'MIT',
          github_stars: 115000,
        }
      }
    ]
  },
  {
    id: 'pair-2',
    badge: 'FEATURED',
    items: [
      {
        name: 'LangGraph Orchestrator',
        description: 'Build resilient language agents as controllable graphs with cycles, persistence, and human-in-the-loop.',
        url: 'https://langchain-ai.github.io/langgraph/',
        tag: 'Agents',
        stars: '19.2k',
        entryRef: {
          id: 'langgraph',
          name: 'LangGraph',
          description: 'Build resilient language agents as controllable graphs with cycles, persistence, and human-in-the-loop.',
          github_url: 'https://github.com/langchain-ai/langgraph',
          docs_url: 'https://langchain-ai.github.io/langgraph/',
          category: 'agents',
          primary_language: 'Python',
          license: 'MIT',
          github_stars: 19200,
        }
      },
      {
        name: 'Unsloth 5x Fast Fine-Tuning',
        description: 'Finetune Llama 3.3, Mistral, and Gemma 2-5x faster with 80% less memory using manual backprop kernels.',
        url: 'https://unsloth.ai',
        tag: 'Training',
        stars: '26.8k',
        entryRef: {
          id: 'unsloth',
          name: 'Unsloth',
          description: 'Finetune Llama 3.3, Mistral, and Gemma 2-5x faster with 80% less memory using manual backprop kernels.',
          github_url: 'https://github.com/unslothai/unsloth',
          docs_url: 'https://unsloth.ai',
          category: 'training',
          primary_language: 'Python',
          license: 'Apache-2.0',
          github_stars: 26800,
        }
      }
    ]
  }
];

export const SpotlightBanner: React.FC<SpotlightBannerProps> = ({ onSelectItem }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const currentPair = SPOTLIGHT_PAIRS[activeSlide];

  return (
    <div className="px-6 pt-6 pb-4">
      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentPair.items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelectItem(item.entryRef as EntryItem)}
            className="group cursor-pointer bg-[#f0f9ff] dark:bg-[#061826] border border-[#d0ecfe] dark:border-[#0c314f] hover:border-sky-300 dark:hover:border-sky-500/50 rounded-2xl p-4.5 transition-all shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Megaphone className="size-4 text-sky-600 dark:text-sky-400" />
                  <span className="font-semibold text-[14px] text-neutral-900 dark:text-neutral-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-sky-600 dark:text-sky-400 uppercase bg-sky-100/70 dark:bg-sky-950/80 px-1.5 py-0.5 rounded">
                  {currentPair.badge}
                </span>
              </div>

              <p className="text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-[13px]">
              <span className="text-sky-600 dark:text-sky-400 font-medium flex items-center gap-1 group-hover:underline">
                Explore preview
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                ★ {item.stars}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicator dots matching Designeer */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {SPOTLIGHT_PAIRS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`size-1.5 rounded-full transition-all ${
              activeSlide === i 
                ? 'bg-neutral-800 dark:bg-neutral-200 w-3' 
                : 'bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
