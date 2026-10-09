import React from 'react';
import { 
  User, 
  Plus, 
  Search, 
  Layers, 
  List, 
  LayoutGrid, 
  PanelRight,
  Sun, 
  Moon,
  Menu
} from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenExplorePreview: () => void;
  onOpenSubmitModal: () => void;
  onToggleMobileMenu: () => void;
  viewMode: 'list' | 'split' | 'grid';
  onToggleViewMode: (mode: 'list' | 'split' | 'grid') => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  onOpenExplorePreview,
  onOpenSubmitModal,
  onToggleMobileMenu,
  viewMode,
  onToggleViewMode,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="h-14 px-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between sticky top-0 z-20 bg-white/75 dark:bg-[#0c0d12]/75 backdrop-blur-xl">
      {/* Left controls */}
      <div className="flex items-center gap-2">
        {/* Mobile menu trigger */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Toggle menu"
        >
          <Menu className="size-4" />
        </button>

        {/* Log in button */}
        <button
          onClick={() => alert('AI Arsenal is an open-source public catalog. No login required to browse, explore, or query via WebMCP!')}
          className="h-8 px-3 rounded-full glass-pill hover:bg-neutral-100/60 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-200 text-[13px] font-medium flex items-center gap-1.5 transition-all"
        >
          <User className="size-3.5 text-neutral-400" />
          <span>Log in</span>
        </button>

        {/* Plus / Submit button */}
        <button
          onClick={onOpenSubmitModal}
          title="Submit an AI tool, paper, or architecture"
          className="size-8 rounded-full glass-pill hover:bg-neutral-100/60 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-200 flex items-center justify-center transition-all"
        >
          <Plus className="size-4 text-neutral-500 dark:text-neutral-300" />
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Search ⌘ K */}
        <button
          onClick={onOpenCommandPalette}
          className="h-8 px-3 rounded-full glass-pill hover:bg-neutral-100/60 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 text-[13px] font-medium flex items-center gap-2 transition-all group"
        >
          <Search className="size-3.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
          <kbd className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">⌘ K</kbd>
        </button>

        {/* Explore ⌘ E */}
        <button
          onClick={onOpenExplorePreview}
          title="Open interactive preview modal for tools"
          className="h-8 px-3 rounded-full glass-pill hover:bg-neutral-100/60 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 text-[13px] font-medium flex items-center gap-2 transition-all group"
        >
          <Layers className="size-3.5 text-sky-500 transition-colors" />
          <kbd className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">⌘ E</kbd>
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5" />

        {/* View Mode Toggle: List vs Split vs Grid */}
        <div className="flex items-center gap-0.5 glass-pill p-0.5 rounded-lg">
          <button
            onClick={() => onToggleViewMode('list')}
            title="List view (hover preview)"
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'list'
                ? 'text-neutral-900 dark:text-white bg-white/90 dark:bg-white/[0.12] shadow-2xs font-semibold'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            <List className="size-4" />
          </button>
          <button
            onClick={() => onToggleViewMode('split')}
            title="Auto-preview on scroll (live split pane)"
            className={`p-1.5 rounded-md transition-all flex items-center gap-1 ${
              viewMode === 'split'
                ? 'text-sky-600 dark:text-sky-400 bg-white/90 dark:bg-white/[0.12] shadow-2xs font-semibold'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            <PanelRight className="size-4" />
          </button>
          <button
            onClick={() => onToggleViewMode('grid')}
            title="Grid view"
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'grid'
                ? 'text-neutral-900 dark:text-white bg-white/90 dark:bg-white/[0.12] shadow-2xs font-semibold'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            <LayoutGrid className="size-4" />
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title="Toggle light / dark theme"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-0.5"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>
    </header>
  );
};
