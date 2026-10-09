import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar, SectionCategory } from './components/Sidebar';
import { Header } from './components/Header';
import { SpotlightBanner } from './components/SpotlightBanner';
import { ListView } from './components/ListView';
import { GridView } from './components/GridView';
import { PreviewModal } from './components/PreviewModal';
import { FloatingAdPill } from './components/FloatingAdPill';
import { CommandPalette } from './components/CommandPalette';
import { SubmitModal } from './components/SubmitModal';
import { AgentModal } from './components/AgentModal';
import { VerticalId, EntryItem } from './types';
import { Loader2 } from 'lucide-react';

const VERTICAL_DATA_FILES: Record<VerticalId, string> = {
  projects: './data/projects.json',
  tools: './data/tools.json',
  papers: './data/papers.json',
  architectures: './data/architectures.json',
  tips: './data/tips.json',
  guides: './data/guides.json',
  benchmarks: './data/benchmarks.json',
  people: './data/people.json',
};

export const App: React.FC = () => {
  const [activeVertical, setActiveVertical] = useState<VerticalId>('projects');
  const [activeSection, setActiveSection] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Data states
  const [verticalData, setVerticalData] = useState<Record<VerticalId, EntryItem[]>>({
    projects: [],
    tools: [],
    papers: [],
    architectures: [],
    tips: [],
    guides: [],
    benchmarks: [],
    people: [],
  });

  const [counts, setCounts] = useState<Record<VerticalId, number>>({
    projects: 500,
    tools: 218,
    papers: 138,
    architectures: 29,
    tips: 171,
    guides: 59,
    benchmarks: 52,
    people: 25,
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [selectedItem, setSelectedItem] = useState<EntryItem | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [agentModalOpen, setAgentModalOpen] = useState<boolean>(false);
  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Theme synchronization (Default is Light Mode to match Designeer)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Keyboard shortcuts: Cmd+K and Cmd+E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        setSelectedItem((prev) => {
          if (prev) return null; // toggle close
          const currentList = verticalData[activeVertical] || [];
          return currentList[0] || null;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVertical, verticalData]);

  // Load stats.json
  useEffect(() => {
    fetch('./data/stats.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.entries) {
          setCounts({
            projects: data.entries.projects || 500,
            tools: data.entries.tools || 218,
            papers: data.entries.papers || 138,
            architectures: data.entries.architectures || 29,
            tips: data.entries.tips || 171,
            guides: data.entries.guides || 59,
            benchmarks: data.entries.benchmarks || 52,
            people: data.entries.people || 25,
          });
        }
      })
      .catch((err) => console.warn('Could not load stats.json:', err));
  }, []);

  // Load current vertical data
  useEffect(() => {
    if (verticalData[activeVertical].length > 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const file = VERTICAL_DATA_FILES[activeVertical];
    fetch(file)
      .then((res) => res.json())
      .then((data) => {
        const items = data.items || data;
        setVerticalData((prev) => ({
          ...prev,
          [activeVertical]: items,
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error loading ${file}:`, err);
        setLoading(false);
      });
  }, [activeVertical]);

  // Pre-fetch projects and tools for immediate search
  useEffect(() => {
    if (verticalData.projects.length === 0) {
      fetch(VERTICAL_DATA_FILES.projects)
        .then((res) => res.json())
        .then((data) => {
          setVerticalData((prev) => ({ ...prev, projects: data.items || data }));
        })
        .catch(() => {});
    }
    if (verticalData.tools.length === 0) {
      fetch(VERTICAL_DATA_FILES.tools)
        .then((res) => res.json())
        .then((data) => {
          setVerticalData((prev) => ({ ...prev, tools: data.items || data }));
        })
        .catch(() => {});
    }
  }, []);

  const allLoadedItems = useMemo(() => {
    return Object.values(verticalData).flat();
  }, [verticalData]);

  const currentItems = verticalData[activeVertical] || [];

  // Dynamic sections computation for Sidebar based on activeVertical
  const sidebarSections: SectionCategory[] = useMemo(() => {
    const total = counts[activeVertical] || currentItems.length;
    if (activeVertical === 'projects') {
      return [
        { id: 'all', name: 'All Projects', count: total },
        { id: 'infer', name: 'Inference Engines', count: 82 },
        { id: 'agents', name: 'Autonomous Agents', count: 124 },
        { id: 'rag', name: 'RAG & Retrieval', count: 94 },
        { id: 'train', name: 'Fine-Tuning & Weights', count: 68 },
        { id: 'eval', name: 'Evals & Guardrails', count: 72 },
        { id: 'multimodal', name: 'Multimodal & Vision', count: 60 },
      ];
    } else if (activeVertical === 'tools') {
      return [
        { id: 'all', name: 'All Tools', count: total },
        { id: 'cli', name: 'Developer CLI & IDE', count: 64 },
        { id: 'observability', name: 'Observability & Tracing', count: 46 },
        { id: 'prompt', name: 'Prompt Engineering', count: 38 },
        { id: 'orchestration', name: 'Workflow Orchestration', count: 42 },
        { id: 'quant', name: 'Model Registry & Quant', count: 28 },
      ];
    } else if (activeVertical === 'papers') {
      return [
        { id: 'all', name: 'All Papers', count: total },
        { id: 'reasoning', name: 'Reasoning & CoT', count: 44 },
        { id: 'attention', name: 'Attention & Architecture', count: 36 },
        { id: 'alignment', name: 'Alignment & RLHF', count: 32 },
        { id: 'compression', name: 'Quantization & Speed', count: 26 },
      ];
    } else if (activeVertical === 'architectures') {
      return [
        { id: 'all', name: 'All Patterns', count: total },
        { id: 'agent-patterns', name: 'Agent Workflows', count: 12 },
        { id: 'hybrid-rag', name: 'Hybrid RAG', count: 9 },
        { id: 'speculative', name: 'Speculative Decoding', count: 8 },
      ];
    }
    return [
      { id: 'all', name: `All ${activeVertical.charAt(0).toUpperCase() + activeVertical.slice(1)}`, count: total }
    ];
  }, [activeVertical, counts, currentItems.length]);

  // Filter items by activeSection if selected
  const filteredItems = useMemo(() => {
    if (!activeSection || activeSection === 'all') return currentItems;

    return currentItems.filter((item) => {
      const text = `${item.category} ${item.subcategory} ${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
      if (activeSection === 'infer') return text.includes('infer') || text.includes('serving') || text.includes('vllm') || text.includes('runtime') || text.includes('quant');
      if (activeSection === 'agents') return text.includes('agent') || text.includes('autogen') || text.includes('crew') || text.includes('langgraph') || text.includes('swarm');
      if (activeSection === 'rag') return text.includes('rag') || text.includes('vector') || text.includes('retriev') || text.includes('embed');
      if (activeSection === 'train') return text.includes('train') || text.includes('fine-tun') || text.includes('lora') || text.includes('unsloth');
      if (activeSection === 'eval') return text.includes('eval') || text.includes('observ') || text.includes('guard') || text.includes('trace');
      if (activeSection === 'multimodal') return text.includes('vision') || text.includes('multi') || text.includes('ocr') || text.includes('image');
      if (activeSection === 'cli') return text.includes('cli') || text.includes('terminal') || text.includes('ide');
      if (activeSection === 'observability') return text.includes('observ') || text.includes('trace') || text.includes('monitor');
      if (activeSection === 'prompt') return text.includes('prompt') || text.includes('dspy');
      if (activeSection === 'orchestration') return text.includes('orchestrat') || text.includes('workflow') || text.includes('dag');
      return true;
    });
  }, [currentItems, activeSection]);

  const totalCatalogEntries = useMemo(() => {
    return Object.values(counts).reduce((a, b) => a + b, 0);
  }, [counts]);

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Centered Chassis matching Designeer */}
      <div className="max-w-[1320px] mx-auto min-h-screen bg-white dark:bg-[#0c0d12] border-x border-neutral-200 dark:border-neutral-800 flex shadow-xs relative">
        {/* Left Rail Sidebar */}
        <Sidebar
          activeVertical={activeVertical}
          onSelectVertical={(vert) => {
            setActiveVertical(vert);
            setActiveSection('');
            setMobileMenuOpen(false);
          }}
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
          counts={counts}
          totalCount={totalCatalogEntries}
          sections={sidebarSections}
          onOpenAgentModal={() => setAgentModalOpen(true)}
          onOpenSubmitModal={() => setSubmitModalOpen(true)}
          className={`${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 flex shadow-2xl' : 'hidden lg:flex'}`}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 min-h-screen bg-white dark:bg-[#0c0d12]">
          {/* Top Header Bar */}
          <Header
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenExplorePreview={() => {
              const currentList = filteredItems.length > 0 ? filteredItems : currentItems;
              if (currentList.length > 0) setSelectedItem(currentList[0]);
            }}
            onOpenSubmitModal={() => setSubmitModalOpen(true)}
            onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
            isDark={isDark}
            onToggleTheme={() => setIsDark((prev) => !prev)}
          />

          {/* Top Spotlight Carousel Banner */}
          <SpotlightBanner onSelectItem={(it) => setSelectedItem(it)} />

          {/* Subtle Divider */}
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 mx-6" />

          {/* Main List or Grid Section */}
          <div className="flex-1 pb-24">
            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center gap-3 text-neutral-400">
                <Loader2 className="size-6 animate-spin text-sky-500" />
                <span className="font-mono text-[13px]">Indexing {activeVertical} dataset...</span>
              </div>
            ) : viewMode === 'list' ? (
              <ListView
                items={filteredItems}
                vertical={activeVertical}
                activeSection={activeSection}
                onSelectItem={(it) => setSelectedItem(it)}
              />
            ) : (
              <GridView
                items={filteredItems}
                onSelectItem={(it) => setSelectedItem(it)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Live Interactive Preview Modal (⌘ E / Row Click) */}
      {selectedItem && (
        <PreviewModal
          item={selectedItem}
          allItems={filteredItems.length > 0 ? filteredItems : currentItems}
          onClose={() => setSelectedItem(null)}
          onSelectItem={(it) => setSelectedItem(it)}
        />
      )}

      {/* Floating Ad / Featured Pill matching Designeer */}
      <FloatingAdPill onSelectItem={(it) => setSelectedItem(it)} />

      {/* Global Cmd+K Search Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        allDocs={allLoadedItems}
        onSelectItem={(it) => setSelectedItem(it)}
      />

      {/* Submit Resource Modal */}
      <SubmitModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
      />

      {/* WebMCP Agent API Console Modal */}
      <AgentModal
        isOpen={agentModalOpen}
        onClose={() => setAgentModalOpen(false)}
        allDocs={allLoadedItems}
      />
    </div>
  );
};
export default App;
