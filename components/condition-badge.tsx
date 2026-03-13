"use client";

import { useState, useRef, useEffect } from "react";
import { ItemCondition, CONDITION_CONFIG } from "@/lib/types";

interface ConditionBadgeProps {
  condition: ItemCondition;
  onChange: (condition: ItemCondition) => void;
}

export function ConditionBadge({ condition, onChange }: ConditionBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const config = CONDITION_CONFIG[condition];

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`text-[10px] tracking-wide transition-opacity hover:opacity-80 ${config.className}`}
      >
        {config.label}
        <span className="ml-0.5 text-[8px] opacity-60">▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[110px] overflow-hidden rounded-md border border-garage-border-accent bg-warm-900 shadow-xl">
          {(Object.keys(CONDITION_CONFIG) as ItemCondition[]).map((key) => {
            const cfg = CONDITION_CONFIG[key];
            return (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-[10px] tracking-wide transition-colors hover:bg-warm-800 ${
                  key === condition ? "bg-warm-800" : ""
                } ${cfg.className}`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
