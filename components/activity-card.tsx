"use client";

import Link from "next/link";
import { Activity, STATUS_CONFIG, ItemStatus } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
  onDelete: (id: string) => void;
}

export function ActivityCard({ activity, onDelete }: ActivityCardProps) {
  const allItems = activity.categories.flatMap((c) => c.items);
  const total = allItems.length;
  const haveCount = allItems.filter((i) => i.status === "have").length;
  const readiness = total > 0 ? Math.round((haveCount / total) * 100) : 0;

  const statusCounts: Record<ItemStatus, number> = {
    have: haveCount,
    need: allItems.filter((i) => i.status === "need").length,
    building: allItems.filter((i) => i.status === "building").length,
    tbd: allItems.filter((i) => i.status === "tbd").length,
  };

  return (
    <div className="group relative rounded-xl border border-garage-border-accent bg-garage-card transition-all hover:border-warm-700/50 hover:shadow-lg hover:shadow-warm-950/20">
      <Link href={`/activity/${activity.id}`} className="block p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activity.icon}</span>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-warm-300">
                {activity.name}
              </h3>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                {activity.categories.length} categories &middot; {total} items
              </p>
            </div>
          </div>
        </div>

        {activity.description && (
          <p className="mb-3 text-xs leading-relaxed text-zinc-500">
            {activity.description}
          </p>
        )}

        <div className="mb-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-warm-900">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <span className="text-xs font-medium text-zinc-400">
            {readiness}%
          </span>
        </div>

        <div className="flex gap-3">
          {(Object.keys(statusCounts) as ItemStatus[]).map((key) => {
            if (statusCounts[key] === 0) return null;
            const cfg = STATUS_CONFIG[key];
            return (
              <div key={key} className="flex items-center gap-1">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${cfg.dotClassName}`}
                />
                <span className="text-[10px] text-zinc-500">
                  {statusCounts[key]}
                </span>
                <span className="text-[9px] text-zinc-600">
                  {cfg.label.toLowerCase()}
                </span>
              </div>
            );
          })}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(activity.id);
        }}
        className="absolute right-3 top-3 rounded p-1.5 text-zinc-700 opacity-0 transition-all hover:bg-red-900/30 hover:text-red-400 group-hover:opacity-100"
        title="Delete activity"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
