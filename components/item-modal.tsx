"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { GearItem, ItemStatus, ItemCondition, STATUS_CONFIG, CONDITION_CONFIG } from "@/lib/types";

interface ItemModalProps {
  item: GearItem | null;
  open: boolean;
  onClose: () => void;
  onSave: (updates: Partial<GearItem>) => void;
}

export function ItemModal({ item, open, onClose, onSave }: ItemModalProps) {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<ItemStatus>("need");
  const [condition, setCondition] = useState<ItemCondition>("unknown");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDetail(item.detail);
      setStatus(item.status);
      setCondition(item.condition);
      setNotes(item.notes);
    }
  }, [item]);

  if (!open || !item) return null;

  const handleSave = () => {
    onSave({ name, detail, status, condition, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-xl border border-warm-800 bg-warm-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300"
        >
          <X size={18} />
        </button>

        <h2 className="mb-5 text-sm font-bold tracking-wider text-warm-300">
          EDIT ITEM
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[10px] tracking-wider text-zinc-500">
              NAME
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-garage-border-accent bg-garage-surface px-3 py-2 text-xs text-[#e8e0d0] outline-none focus:border-warm-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] tracking-wider text-zinc-500">
              DETAIL
            </label>
            <input
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Brand, model, size..."
              className="w-full rounded border border-garage-border-accent bg-garage-surface px-3 py-2 text-xs text-[#e8e0d0] outline-none placeholder:text-zinc-600 focus:border-warm-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[10px] tracking-wider text-zinc-500">
                STATUS
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(STATUS_CONFIG) as ItemStatus[]).map((key) => {
                  const cfg = STATUS_CONFIG[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setStatus(key)}
                      className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold tracking-wider transition-all ${
                        status === key
                          ? cfg.className + " ring-1 ring-warm-300/30"
                          : "bg-zinc-800/50 text-zinc-500 hover:bg-zinc-800"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          status === key ? cfg.dotClassName : "bg-zinc-600"
                        }`}
                      />
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] tracking-wider text-zinc-500">
                CONDITION
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(CONDITION_CONFIG) as ItemCondition[]).map(
                  (key) => {
                    const cfg = CONDITION_CONFIG[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setCondition(key)}
                        className={`rounded px-2 py-1 text-[10px] tracking-wide transition-all ${
                          condition === key
                            ? cfg.className +
                              " bg-zinc-800 ring-1 ring-warm-300/30"
                            : "text-zinc-500 hover:bg-zinc-800"
                        }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] tracking-wider text-zinc-500">
              NOTES
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specs, care notes, where you store it..."
              rows={3}
              className="w-full resize-y rounded border border-garage-border-accent bg-garage-surface px-3 py-2 text-xs leading-relaxed text-[#e8e0d0] outline-none placeholder:text-zinc-600 focus:border-warm-600"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-warm-300 px-4 py-2.5 text-xs font-bold tracking-wider text-warm-950 transition-colors hover:bg-warm-200"
          >
            SAVE
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-700 px-4 py-2.5 text-xs tracking-wider text-zinc-400 transition-colors hover:border-zinc-600"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
