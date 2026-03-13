"use client";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "DELETE",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mx-4 max-w-sm rounded-xl border border-warm-800 bg-warm-900 p-6 shadow-2xl">
        <h3 className="mb-2 text-xs font-bold tracking-wider text-red-400">
          {title}
        </h3>
        <p className="mb-5 text-xs leading-relaxed text-zinc-400">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-900/60 px-4 py-2.5 text-xs font-bold tracking-wider text-red-200 transition-colors hover:bg-red-800/60"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-zinc-700 px-4 py-2.5 text-xs tracking-wider text-zinc-400 transition-colors hover:border-zinc-600"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
