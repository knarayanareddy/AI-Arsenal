import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Eye, 
  Layers, 
  Cpu, 
  Zap, 
  Bot, 
  Database, 
  Flame, 
  ShieldCheck, 
  Eye as VisionIcon,
  Wrench,
  FileText,
  Star
} from 'lucide-react';
import { EntryItem, VerticalId } from '../types';
import { HoverPreviewCard } from './HoverPreviewCard';

interface SectionGroup {
  id: string;
  number: string;
  title: string;
  description: string;
  items: EntryItem[];
}

interface ListViewProps {
  items: EntryItem[];
  vertical: VerticalId;
  activeSection: string;
  onSelectItem: (item: EntryItem) => void;
  activeHoverItem?: EntryItem | null;
  onHoverItemChange?: (item: EntryItem | null) => void;
}

// Map entries to custom color and glyph
function getItemIcon(item: EntryItem) {
  const name = item.name || item.title || item.id;
  const initial = name.slice(0, 2).toUpperCase();
  const category = (item.category || item.subcategory || item.phase || '').toLowerCase();

  let bg = 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950';
  if (category.includes('agent')) bg = 'bg-sky-600 text-white';
  else if (category.includes('infer') || category.includes('runtime')) bg = 'bg-cyan-600 text-white';
  else if (category.includes('rag') || category.includes('vector')) bg = 'bg-emerald-600 text-white';
  else if (category.includes('fine') || category.includes('train')) bg = 'bg-violet-600 text-white';
  else if (category.includes('eval') || category.includes('guard')) bg = 'bg-amber-600 text-white';
  else if (category.includes('vision') || category.includes('multi')) bg = 'bg-rose-600 text-white';

  return { initial, bg };
}

export const ListView: React.FC<ListViewProps> = ({
  items,
  vertical,
  activeSection,
  onSelectItem,
  activeHoverItem,
  onHoverItemChange,
}) => {
  // Group items into Designeer-style numbered sections
  const sectionGroups: SectionGroup[] = React.useMemo(() => {
    if (items.length === 0) return [];

    // Categorize items
    const groupsMap = new Map<string, { number: string; title: string; description: string; items: EntryItem[] }>();

    if (vertical === 'projects' || vertical === 'tools') {
      const defs = [
        {
          id: 'infer',
          number: '01',
          title: 'Inference Engines & Runtimes',
          description: 'High-throughput serving, continuous batching, CUDA kernels, and quantization.',
          match: (item: EntryItem) => {
            const str = `${item.category} ${item.subcategory} ${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
            return str.includes('infer') || str.includes('serving') || str.includes('runtime') || str.includes('vllm') || str.includes('tgi') || str.includes('ollama') || str.includes('quant');
          }
        },
        {
          id: 'agents',
          number: '02',
          title: 'Autonomous Agents & Multi-Agent Workflows',
          description: 'Agent orchestrators, tool execution, planning runtimes, and collaborative loops.',
          match: (item: EntryItem) => {
            const str = `${item.category} ${item.subcategory} ${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
            return str.includes('agent') || str.includes('autogen') || str.includes('crew') || str.includes('langgraph') || str.includes('swarm') || str.includes('mcp');
          }
        },
        {
          id: 'rag',
          number: '03',
          title: 'RAG & Vector Retrieval',
          description: 'Hybrid search, semantic chunking, vector databases, and neural rerankers.',
          match: (item: EntryItem) => {
            const str = `${item.category} ${item.subcategory} ${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
            return str.includes('rag') || str.includes('vector') || str.includes('retriev') || str.includes('embed') || str.includes('qdrant') || str.includes('chroma');
          }
        },
        {
          id: 'train',
          number: '04',
          title: 'Fine-Tuning & Model Training',
          description: 'Parameter-efficient fine-tuning (PEFT), LoRA, distillation, and RL alignment.',
          match: (item: EntryItem) => {
            const str = `${item.category} ${item.subcategory} ${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
            return str.includes('train') || str.includes('fine-tun') || str.includes('lora') || str.includes('unsloth') || str.includes('axolotl') || str.includes('trl');
          }
        },
        {
          id: 'eval',
          number: '05',
          title: 'Evals, Observability & Guardrails',
          description: 'Tracing, latency profiling, prompt security, hallucination detection, and benchmarks.',
          match: (item: EntryItem) => {
            const str = `${item.category} ${item.subcategory} ${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
            return str.includes('eval') || str.includes('observ') || str.includes('guard') || str.includes('trace') || str.includes('monitor') || str.includes('safety');
          }
        },
        {
          id: 'multimodal',
          number: '06',
          title: 'Multimodal, Vision & Voice',
          description: 'Vision-language models, document extraction, OCR, TTS, and spatial intelligence.',
          match: (item: EntryItem) => {
            const str = `${item.category} ${item.subcategory} ${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
            return str.includes('vision') || str.includes('multi') || str.includes('ocr') || str.includes('audio') || str.includes('speech') || str.includes('image');
          }
        },
      ];

      defs.forEach(d => groupsMap.set(d.id, { number: d.number, title: d.title, description: d.description, items: [] }));

      // Fallback group for rest
      groupsMap.set('ecosystem', {
        number: '07',
        title: 'Core Tooling & Infrastructure',
        description: 'Developer utilities, SDKs, tokenizers, and general production libraries.',
        items: []
      });

      items.forEach(item => {
        let placed = false;
        for (const def of defs) {
          if (def.match(item)) {
            groupsMap.get(def.id)?.items.push(item);
            placed = true;
            break;
          }
        }
        if (!placed) {
          groupsMap.get('ecosystem')?.items.push(item);
        }
      });
    } else {
      // General grouping by category or default
      const grouped = new Map<string, EntryItem[]>();
      items.forEach(item => {
        const cat = item.category || item.artifact_type || item.phase || 'general';
        if (!grouped.has(cat)) grouped.set(cat, []);
        grouped.get(cat)!.push(item);
      });

      let idx = 1;
      grouped.forEach((groupItems, cat) => {
        const numStr = String(idx).padStart(2, '0');
        const formattedTitle = cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        groupsMap.set(cat, {
          number: numStr,
          title: formattedTitle,
          description: `Curated ${cat} resources and references for production systems.`,
          items: groupItems
        });
        idx++;
      });
    }

    const result: SectionGroup[] = [];
    groupsMap.forEach((val, id) => {
      if (val.items.length > 0) {
        result.push({
          id,
          number: val.number,
          title: val.title,
          description: val.description,
          items: val.items
        });
      }
    });

    return result;
  }, [items, vertical]);

  const [hoveredItem, setHoveredItem] = useState<EntryItem | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const hideTimeoutRef = useRef<any>(null);

  const handleRowMouseEnter = (item: EntryItem, e: React.MouseEvent) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setHoveredItem(item);
    setMousePos({ x: e.clientX, y: e.clientY });
    if (onHoverItemChange) onHoverItemChange(item);
  };

  const handleRowMouseMove = (item: EntryItem, e: React.MouseEvent) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!hoveredItem || hoveredItem.id !== item.id) {
      setHoveredItem(item);
      if (onHoverItemChange) onHoverItemChange(item);
    }
  };

  const handleRowMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      if (onHoverItemChange) onHoverItemChange(null);
    }, 120);
  };

  // Scroll detection to update active item in real-time as user scrolls down the list
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rowElements = document.querySelectorAll<HTMLElement>('[data-item-id]');
          if (rowElements.length === 0) {
            ticking = false;
            return;
          }

          const targetY = window.innerHeight * 0.35; // focal point in upper viewport
          let closestItem: EntryItem | null = null;
          let minDistance = Infinity;

          rowElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top - targetY);
            if (dist < minDistance && rect.bottom > 0 && rect.top < window.innerHeight) {
              minDistance = dist;
              const id = el.getAttribute('data-item-id');
              const found = items.find((it) => it.id === id);
              if (found) closestItem = found;
            }
          });

          if (closestItem && onHoverItemChange) {
            onHoverItemChange(closestItem);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, onHoverItemChange]);

  if (items.length === 0) {
    return (
      <div className="py-24 text-center text-neutral-400">
        <p className="text-[14px]">No entries match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 space-y-10 relative">
      {sectionGroups.map((section) => (
        <section key={section.id} id={section.id} className="space-y-2">
          {/* Section Header matching Designeer: 01 Title Description */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2.5 pb-2 border-b border-neutral-100 dark:border-neutral-800/80">
            <span className="font-mono text-[12px] text-neutral-400 dark:text-neutral-500 font-medium">
              {section.number}
            </span>
            <h2 className="text-[15px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {section.title}
            </h2>
            <span className="text-[13px] text-neutral-500 dark:text-neutral-400 font-normal">
              {section.description}
            </span>
          </div>

          {/* Section Items: One-line rows matching Designeer */}
          <div className="divide-y divide-neutral-100/60 dark:divide-neutral-900/60">
            {section.items.map((item) => {
              const { initial, bg } = getItemIcon(item);
              const name = item.name || item.title || item.id;
              const desc = item.description || item.summary || item.decision_summary || item.problem || '';
              const stars = item.github_stars;
              const isHovered = (hoveredItem?.id === item.id) || (activeHoverItem?.id === item.id);

              return (
                <div
                  key={item.id}
                  data-item-id={item.id}
                  onClick={() => onSelectItem(item)}
                  onMouseEnter={(e) => handleRowMouseEnter(item, e)}
                  onMouseMove={(e) => handleRowMouseMove(item, e)}
                  onMouseLeave={handleRowMouseLeave}
                  className={`group cursor-pointer py-2.5 px-2 -mx-2 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                    isHovered 
                      ? 'bg-neutral-100/80 dark:bg-neutral-800/80' 
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {/* Left: Icon, Name, Dot, Description */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Custom square icon */}
                    <div className={`size-6 rounded-md ${bg} flex items-center justify-center font-mono font-bold text-[10px] shrink-0 shadow-2xs`}>
                      {initial}
                    </div>

                    {/* Title */}
                    <span className={`font-semibold text-[14px] shrink-0 transition-colors ${
                      isHovered 
                        ? 'text-sky-600 dark:text-sky-400' 
                        : 'text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                    }`}>
                      {name}
                    </span>

                    {/* Middle dot */}
                    <span className="text-neutral-300 dark:text-neutral-600 select-none">•</span>

                    {/* Description */}
                    <span className="text-[13px] text-neutral-500 dark:text-neutral-400 truncate">
                      {desc}
                    </span>
                  </div>

                  {/* Right: Meta & Preview Trigger on Hover */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    {stars && stars > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                        <Star className="size-3 text-amber-500 fill-amber-500/20" />
                        {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
                      </span>
                    )}

                    {item.primary_language && (
                      <span className="hidden md:inline-block text-[11px] font-mono text-neutral-400 dark:text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80">
                        {item.primary_language}
                      </span>
                    )}

                    {/* Preview Badge hint */}
                    <span className={`transition-opacity flex items-center gap-1 text-[11px] font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-2 py-0.5 rounded ${
                      isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <Layers className="size-2.5" />
                      Preview ⌘ E
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Floating Hover & Scroll Preview Popover Card */}
      {hoveredItem && (
        <HoverPreviewCard
          item={hoveredItem}
          position={mousePos}
          visible={!!hoveredItem}
        />
      )}
    </div>
  );
};
