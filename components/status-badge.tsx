"use client";

import { useState, useRef, useEffect } from "react";
import { ItemStatus, STATUS_CONFIG } from "@/lib/types";

interface StatusBadgeProps {
  status: ItemStatus;
  onChange: (status: ItemStatus) => void;
}

export function StatusBadge({ status, onChange }: StatusBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const config = STATUS_CONFIG[status];

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
        className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider transition-opacity hover:opacity-80 ${config.className}`}
      >
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${config.dotClassName}`}
        />
        {config.label}
        <span className="ml-0.5 text-[8px] opacity-60">▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[130px] overflow-hidden rounded-md border border-garage-border-accent bg-warm-900 shadow-xl">
          {(Object.keys(STATUS_CONFIG) as ItemStatus[]).map((key) => {
            const cfg = STATUS_CONFIG[key];
            return (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-[10px] font-bold tracking-wider transition-colors hover:bg-warm-800 ${
                  key === status ? "bg-warm-800" : ""
                } ${cfg.className}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${cfg.dotClassName}`}
                />
                {cfg.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
