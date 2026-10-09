import React, { useEffect, useRef, useState } from 'react';
import { Star, ExternalLink, Terminal, Sparkles, Layers, Cpu, Zap } from 'lucide-react';
import { EntryItem } from '../types';

interface HoverPreviewCardProps {
  item: EntryItem;
  position: { x: number; y: number } | null;
  visible: boolean;
}

export const HoverPreviewCard: React.FC<HoverPreviewCardProps> = ({
  item,
  position,
  visible,
}) => {
  const cardWidth = 360;
  const cardHeight = 310;
  const padding = 20;

  // Spring interpolated coordinates for butter-smooth gliding
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: position ? position.x + 24 : 0,
    y: position ? position.y - 40 : 0,
  });

  const targetRef = useRef<{ x: number; y: number }>({
    x: position ? position.x + 24 : 0,
    y: position ? position.y - 40 : 0,
  });

  const currentRef = useRef<{ x: number; y: number }>({
    x: position ? position.x + 24 : 0,
    y: position ? position.y - 40 : 0,
  });

  // Update target coordinates whenever mouse position moves
  useEffect(() => {
    if (!position) return;

    let left = position.x + 24;
    let top = position.y - 40;

    // Boundary clamping
    if (left + cardWidth > window.innerWidth - padding) {
      left = position.x - cardWidth - 24;
    }
    if (left < padding) left = padding;

    if (top + cardHeight > window.innerHeight - padding) {
      top = window.innerHeight - cardHeight - padding;
    }
    if (top < padding) top = padding;

    targetRef.current = { x: left, y: top };
  }, [position]);

  // Smooth lerp animation loop (Apple-style inertia spring)
  useEffect(() => {
    let animId: number;

    const lerp = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      // 0.22 factor gives instant responsiveness with zero jitter
      currentRef.current.x += dx * 0.22;
      currentRef.current.y += dy * 0.22;

      setCoords({
        x: Math.round(currentRef.current.x * 10) / 10,
        y: Math.round(currentRef.current.y * 10) / 10,
      });

      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!visible || !position) return null;

  const name = item.name || item.title || item.id || 'AI Tool';
  const desc = item.description || item.summary || item.decision_summary || item.problem || '';
  const stars = item.github_stars;
  const category = item.category || item.artifact_type || 'AI Tool';
  const initial = name.slice(0, 2).toUpperCase();

  const getDomain = () => {
    try {
      if (item.docs_url && (item.docs_url.startsWith('http://') || item.docs_url.startsWith('https://'))) {
        return new URL(item.docs_url).hostname.replace('www.', '');
      }
      if (item.github_url && (item.github_url.startsWith('http://') || item.github_url.startsWith('https://'))) {
        return new URL(item.github_url).hostname.replace('www.', '');
      }
    } catch {}
    return 'ai-arsenal.xyz';
  };
  const domain = getDomain();
  const pkg = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
      }}
      className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform select-none"
    >
      <div className="w-[360px] glass-card rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 relative">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-12 -right-12 size-36 bg-sky-500/10 dark:bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Mini Preview Canvas */}
        <div className="h-36 bg-neutral-950/95 dark:bg-neutral-950 p-3.5 flex flex-col justify-between relative overflow-hidden border-b border-neutral-800/80">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Mini Window Controls & Status */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
              <span className="size-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              <span className="size-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full shadow-2xs">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE RUNTIME</span>
            </div>
          </div>

          {/* Mini Interactive Code Viewport */}
          <div className="relative z-10 font-mono text-[11px] leading-relaxed space-y-1 text-neutral-300">
            <div className="text-sky-300 font-semibold truncate">$ pip install {pkg}</div>
            <div className="text-neutral-500 text-[10px] truncate">import {pkg.replace(/-/g, '_')} as engine</div>
            <div className="text-emerald-400/90 text-[10px] flex items-center gap-1.5 pt-0.5">
              <span>● latency: 18ms</span>
              <span>•</span>
              <span>throughput: 1.8k tps</span>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          {/* Title Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 shadow-2xs">
                {initial}
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-neutral-900 dark:text-neutral-100 leading-tight">
                  {name}
                </h4>
                <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {domain}
                </p>
              </div>
            </div>

            {stars && stars > 0 ? (
              <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 px-2 py-0.5 rounded-md">
                <Star className="size-3 text-amber-500 fill-amber-500" />
                {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
              </span>
            ) : null}
          </div>

          {/* Description */}
          <p className="text-[12px] text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {desc}
          </p>

          {/* Badges / Keywords */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {item.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/40 dark:border-neutral-700/40 text-neutral-600 dark:text-neutral-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer Call to Action */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-neutral-400 truncate max-w-[140px]">
              {category}
            </span>
            <span className="text-sky-600 dark:text-sky-400 font-medium flex items-center gap-1">
              <Layers className="size-3" />
              <span>Click or ⌘ E to inspect</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
