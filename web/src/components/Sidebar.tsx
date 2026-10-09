import React from 'react';
import { 
  Boxes, 
  Wrench, 
  FileText, 
  GitFork, 
  Lightbulb, 
  BookOpen, 
  Gauge, 
  Users, 
  Compass,
  Cpu,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { VerticalId } from '../types';

export interface SectionCategory {
  id: string;
  name: string;
  count: number;
}

interface SidebarProps {
  activeVertical: VerticalId;
  onSelectVertical: (vertical: VerticalId) => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  counts: Record<VerticalId, number>;
  totalCount: number;
  sections: SectionCategory[];
  onOpenAgentModal: () => void;
  onOpenSubmitModal: () => void;
  className?: string;
}

const VERTICAL_ITEMS: { id: VerticalId; label: string; icon: React.ElementType }[] = [
  { id: 'projects', label: 'Projects', icon: Boxes },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'papers', label: 'Papers', icon: FileText },
  { id: 'architectures', label: 'Architectures', icon: GitFork },
  { id: 'tips', label: 'Tips', icon: Lightbulb },
  { id: 'guides', label: 'Guides', icon: BookOpen },
  { id: 'benchmarks', label: 'Benchmarks', icon: Gauge },
  { id: 'people', label: 'People', icon: Users },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeVertical,
  onSelectVertical,
  activeSection,
  onSelectSection,
  counts,
  totalCount,
  sections,
  onOpenAgentModal,
  onOpenSubmitModal,
  className = '',
}) => {
  return (
    <aside className={`w-[260px] sm:w-[270px] border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0d12] flex flex-col justify-between shrink-0 h-screen sticky top-0 p-5 overflow-y-auto ${className}`}>
      <div className="space-y-6">
        {/* Brand Orb & Identity */}
        <div>
          {/* Glowing Mesh Orb Avatar matching Designeer */}
          <div className="relative size-16 mb-4 group cursor-pointer" onClick={() => onSelectSection('')}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 blur-[6px] opacity-70 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <div className="relative size-16 rounded-full overflow-hidden border border-white/60 dark:border-white/20 shadow-inner bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 flex items-center justify-center">
              {/* Orb texture grid simulation */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
                  backgroundSize: '4px 4px'
                }}
              />
              <div className="relative text-white font-mono font-bold text-lg tracking-tighter drop-shadow">
                AI
              </div>
            </div>
          </div>

          {/* Site Title */}
          <h1 className="text-[17px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-baseline">
            <span>ai-arsenal</span>
            <span className="text-neutral-400 dark:text-neutral-500 font-normal ml-0.5">.xyz</span>
          </h1>

          {/* Bio / Description */}
          <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-snug mt-1.5">
            A curated collection of interface craft, inference engines, AI tools, and architectures for builders.
          </p>
        </div>

        {/* NAVIGATION Section */}
        <div>
          <div className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase mb-2 px-1">
            Navigation
          </div>
          <nav className="space-y-0.5">
            {VERTICAL_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeVertical === item.id;
              const count = counts[item.id] || 0;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectVertical(item.id);
                    onSelectSection('');
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                    isActive
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`size-4 shrink-0 ${isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`text-[12px] font-mono ${isActive ? 'text-neutral-500 dark:text-neutral-400' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SECTIONS Subcategory List */}
        {sections.length > 0 && (
          <div>
            <div className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase mb-2 px-1">
              Sections
            </div>
            <div className="space-y-0.5">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id || (!activeSection && sec.id === 'all');
                return (
                  <button
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id === 'all' ? '' : sec.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                      isActive
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-normal'
                    }`}
                  >
                    <span className="truncate">{sec.name}</span>
                    <span className={`text-[12px] font-mono ${isActive ? 'text-neutral-500 dark:text-neutral-400' : 'text-neutral-400 dark:text-neutral-500'}`}>
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sponsor Icons & Footer Links */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        {/* 4 Sponsor / Ecosystem Badges */}
        <div className="grid grid-cols-4 gap-2">
          {/* vLLM */}
          <a
            href="https://vllm.ai"
            target="_blank"
            rel="noopener noreferrer"
            title="vLLM Inference"
            className="size-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-center font-bold text-[12px] text-cyan-600 dark:text-cyan-400 hover:border-cyan-500 transition-colors"
          >
            vL
          </a>
          {/* Ollama */}
          <a
            href="https://ollama.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Ollama Local Models"
            className="size-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-center font-bold text-[13px] text-amber-600 dark:text-amber-400 hover:border-amber-500 transition-colors"
          >
            🦙
          </a>
          {/* LangChain */}
          <a
            href="https://langchain.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LangChain & LangGraph"
            className="size-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-center font-bold text-[13px] text-emerald-600 dark:text-emerald-400 hover:border-emerald-500 transition-colors"
          >
            🦜
          </a>
          {/* Hugging Face */}
          <a
            href="https://huggingface.co"
            target="_blank"
            rel="noopener noreferrer"
            title="Hugging Face"
            className="size-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-center font-bold text-[13px] text-yellow-600 dark:text-yellow-400 hover:border-yellow-500 transition-colors"
          >
            🤗
          </a>
        </div>

        {/* Footer Links matching Designeer */}
        <div className="flex items-center justify-between text-[12px] text-neutral-500 dark:text-neutral-400 font-medium">
          <button 
            onClick={onOpenSubmitModal} 
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Sponsor
          </button>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <a 
            href="https://github.com/knarayanareddy/AI-Arsenal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <button 
            onClick={onOpenAgentModal}
            className="hover:text-sky-500 transition-colors font-mono text-[11px]"
          >
            WebMCP
          </button>
        </div>
      </div>
    </aside>
  );
};
