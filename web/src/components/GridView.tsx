import React from 'react';
import { Star, ExternalLink, ArrowUpRight } from 'lucide-react';
import { EntryItem } from '../types';

interface GridViewProps {
  items: EntryItem[];
  onSelectItem: (item: EntryItem) => void;
}

export const GridView: React.FC<GridViewProps> = ({ items, onSelectItem }) => {
  return (
    <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const name = item.name || item.title || item.id;
        const desc = item.description || item.summary || item.decision_summary || item.problem || '';
        const stars = item.github_stars;
        const initial = name.slice(0, 2).toUpperCase();

        return (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f1016] p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                    {initial}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14px] text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {name}
                    </h3>
                  </div>
                </div>

                {stars && stars > 0 ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                    <Star className="size-3 text-amber-500 fill-amber-500/20" />
                    {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
                  </span>
                ) : null}
              </div>

              <p className="text-[13px] text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                {desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[12px]">
              <span className="text-neutral-400 font-mono text-[11px]">
                {item.primary_language || item.license || 'open-source'}
              </span>
              <span className="text-sky-600 dark:text-sky-400 font-medium flex items-center gap-0.5 group-hover:underline">
                Preview
                <ArrowUpRight className="size-3" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
