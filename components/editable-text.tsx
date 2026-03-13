"use client";

import { useState, useRef, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

export function EditableText({
  value,
  onChange,
  className = "",
  placeholder = "—",
  multiline = false,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setVal(value);
  }, [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const trimmed = val.trim();
    if (trimmed !== value) onChange(trimmed || value);
  };

  if (editing) {
    const inputClass =
      "w-full rounded border border-warm-300/50 bg-warm-900 px-2 py-1 text-[#e8e0d0] outline-none focus:border-warm-300 font-mono text-xs " +
      className;

    return multiline ? (
      <textarea
        ref={ref as React.RefObject<HTMLTextAreaElement>}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setVal(value);
            setEditing(false);
          }
        }}
        className={inputClass + " min-h-[3rem] resize-y"}
      />
    ) : (
      <input
        ref={ref as React.RefObject<HTMLInputElement>}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setVal(value);
            setEditing(false);
          }
        }}
        className={inputClass}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      title="Click to edit"
      className={`block cursor-text border-b border-dashed border-warm-800 pb-px hover:border-warm-600 ${className}`}
    >
      {value || (
        <span className="italic text-zinc-600">{placeholder}</span>
      )}
    </span>
  );
}
