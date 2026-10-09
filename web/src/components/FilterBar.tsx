import React from 'react';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  phases: string[];
  selectedPhase: string;
  onSelectPhase: (phase: string) => void;
  maturities: string[];
  selectedMaturity: string;
  onSelectMaturity: (m: string) => void;
  languages: string[];
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  selectedHealth: string;
  onSelectHealth: (h: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  phases,
  selectedPhase,
  onSelectPhase,
  maturities,
  selectedMaturity,
  onSelectMaturity,
  languages,
  selectedLanguage,
  onSelectLanguage,
  selectedHealth,
  onSelectHealth,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="px-4 sm:px-8 py-3 bg-surface/50 border-b border-line flex flex-wrap items-center gap-2.5 text-caption">
      {/* Search Filter in Current Section */}
      <div className="relative min-w-[200px] flex-1 max-w-xs">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter in this section..."
          className="w-full h-8 pl-3 pr-8 rounded-control bg-field border border-line focus:border-line-strong text-ink placeholder:text-ink-3 font-sans text-caption outline-none tap"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-2 text-ink-3 hover:text-ink"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <div className="h-4 w-px bg-line hidden sm:block"></div>

      {/* Phase Dropdown */}
      {phases.length > 0 && (
        <select
          value={selectedPhase}
          onChange={(e) => onSelectPhase(e.target.value)}
          aria-label="Filter by Phase"
          className="h-8 px-2.5 rounded-control bg-field border border-line text-ink text-caption font-mono outline-none tap hover:border-line-strong cursor-pointer"
        >
          <option value="">All Phases ({phases.length})</option>
          {phases.map((p) => (
            <option key={p} value={p}>
              Phase: {p}
            </option>
          ))}
        </select>
      )}

      {/* Maturity Dropdown */}
      {maturities.length > 0 && (
        <select
          value={selectedMaturity}
          onChange={(e) => onSelectMaturity(e.target.value)}
          aria-label="Filter by Maturity"
          className="h-8 px-2.5 rounded-control bg-field border border-line text-ink text-caption font-mono outline-none tap hover:border-line-strong cursor-pointer"
        >
          <option value="">All Maturities</option>
          {maturities.map((m) => (
            <option key={m} value={m}>
              Maturity: {m}
            </option>
          ))}
        </select>
      )}

      {/* Language Dropdown */}
      {languages.length > 0 && (
        <select
          value={selectedLanguage}
          onChange={(e) => onSelectLanguage(e.target.value)}
          aria-label="Filter by Language"
          className="h-8 px-2.5 rounded-control bg-field border border-line text-ink text-caption font-mono outline-none tap hover:border-line-strong cursor-pointer"
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              Lang: {l}
            </option>
          ))}
        </select>
      )}

      {/* Health Signal Pill Filter */}
      <div className="flex items-center gap-1">
        {['actively-maintained', 'production-proven'].map((h) => {
          const isSelected = selectedHealth === h;
          return (
            <button
              key={h}
              onClick={() => onSelectHealth(isSelected ? '' : h)}
              className={`h-8 px-2.5 rounded-control font-mono text-[11px] tap border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-accent-tint text-accent-solid border-accent-solid/40 font-medium'
                  : 'bg-field text-ink-3 hover:text-ink border-line'
              }`}
            >
              <span className={`size-1.5 rounded-full ${isSelected ? 'bg-accent-solid' : 'bg-ink-3'}`}></span>
              {h}
            </button>
          );
        })}
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="h-8 px-2 rounded-control text-ink-3 hover:text-ink text-micro font-mono flex items-center gap-1 tap hover:bg-field"
        >
          <X className="size-3" />
          Reset filters
        </button>
      )}
    </div>
  );
};
