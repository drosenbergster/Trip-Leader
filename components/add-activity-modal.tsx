"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ACTIVITY_TEMPLATES, ActivityTemplate } from "@/lib/activity-templates";

interface AddActivityModalProps {
  open: boolean;
  onClose: () => void;
  onCreateFromTemplate: (template: ActivityTemplate) => void;
  onCreateCustom: (name: string, icon: string, description: string) => void;
}

const ICONS = [
  "🚣", "⛷️", "🚵", "🥾", "🏕️", "🏊", "🎣", "🧗", "🏄",
  "⛺", "🛶", "🪂", "🏂", "🤿", "🧭", "🔥", "🪵", "🎿",
  "🏔️", "🌊", "🚲", "🐻", "🦅", "☀️", "🌙",
];

export function AddActivityModal({
  open,
  onClose,
  onCreateFromTemplate,
  onCreateCustom,
}: AddActivityModalProps) {
  const [mode, setMode] = useState<"choose" | "custom">("choose");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🎒");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const reset = () => {
    setMode("choose");
    setName("");
    setIcon("🎒");
    setDescription("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative mx-4 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-warm-800 bg-warm-900 p-6 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300"
        >
          <X size={18} />
        </button>

        {mode === "choose" ? (
          <>
            <h2 className="mb-1 text-sm font-bold tracking-wider text-warm-300">
              ADD AN ACTIVITY
            </h2>
            <p className="mb-5 text-xs text-zinc-500">
              Start from a template or build your own
            </p>

            <div className="mb-4 space-y-2">
              {ACTIVITY_TEMPLATES.map((template) => (
                <button
                  key={template.sport}
                  onClick={() => {
                    onCreateFromTemplate(template);
                    handleClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg border border-garage-border-accent bg-garage-surface p-3 text-left transition-colors hover:border-warm-700/50 hover:bg-warm-900/50"
                >
                  <span className="text-2xl">{template.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-bold tracking-wide text-warm-300">
                      {template.name}
                    </div>
                    <div className="mt-0.5 text-[10px] text-zinc-500">
                      {template.description}
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-600">
                    {template.categories.length} categories
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setMode("custom")}
              className="w-full rounded-lg border border-dashed border-garage-border-accent p-3 text-center text-xs tracking-wider text-zinc-500 transition-colors hover:border-warm-700/50 hover:text-warm-300"
            >
              + CREATE CUSTOM ACTIVITY
            </button>
          </>
        ) : (
          <>
            <h2 className="mb-5 text-sm font-bold tracking-wider text-warm-300">
              CUSTOM ACTIVITY
            </h2>

            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] tracking-wider text-zinc-500">
                NAME
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) {
                    onCreateCustom(name.trim(), icon, description.trim());
                    handleClose();
                  }
                }}
                placeholder="e.g. Fly Fishing, Surfing, Climbing..."
                autoFocus
                className="w-full rounded border border-garage-border-accent bg-garage-surface px-3 py-2 text-xs text-[#e8e0d0] outline-none placeholder:text-zinc-600 focus:border-warm-600"
              />
            </div>

            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] tracking-wider text-zinc-500">
                DESCRIPTION
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short description of this activity..."
                className="w-full rounded border border-garage-border-accent bg-garage-surface px-3 py-2 text-xs text-[#e8e0d0] outline-none placeholder:text-zinc-600 focus:border-warm-600"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[10px] tracking-wider text-zinc-500">
                ICON
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ICONS.map((ic) => (
                  <button
                    key={ic}
                    onClick={() => setIcon(ic)}
                    className={`flex h-9 w-9 items-center justify-center rounded text-lg transition-colors ${
                      icon === ic
                        ? "border border-warm-300 bg-warm-800"
                        : "border border-transparent hover:bg-warm-800/50"
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (name.trim()) {
                    onCreateCustom(name.trim(), icon, description.trim());
                    handleClose();
                  }
                }}
                disabled={!name.trim()}
                className="flex-1 rounded-lg bg-warm-300 px-4 py-2.5 text-xs font-bold tracking-wider text-warm-950 transition-colors hover:bg-warm-200 disabled:opacity-40"
              >
                CREATE
              </button>
              <button
                onClick={() => setMode("choose")}
                className="flex-1 rounded-lg border border-zinc-700 px-4 py-2.5 text-xs tracking-wider text-zinc-400 transition-colors hover:border-zinc-600"
              >
                BACK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
