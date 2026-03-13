"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Warehouse } from "lucide-react";
import { Garage, Activity, ItemStatus } from "@/lib/types";
import { loadGarage, saveGarage, createActivity } from "@/lib/store";
import { ActivityTemplate } from "@/lib/activity-templates";
import { ActivityCard } from "@/components/activity-card";
import { AddActivityModal } from "@/components/add-activity-modal";
import { ConfirmModal } from "@/components/confirm-modal";

export default function GarageHome() {
  const [garage, setGarage] = useState<Garage>({ activities: [], version: 1 });
  const [loaded, setLoaded] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    setGarage(loadGarage());
    setLoaded(true);
  }, []);

  const persist = useCallback(
    (updated: Garage) => {
      setGarage(updated);
      saveGarage(updated);
    },
    []
  );

  const handleCreateFromTemplate = (template: ActivityTemplate) => {
    const activity = createActivity(
      template.name,
      template.sport,
      template.icon,
      template.description,
      template.categories.map((c) => ({
        name: c.name,
        icon: c.icon,
        items: c.items,
      }))
    );
    persist({ ...garage, activities: [...garage.activities, activity] });
  };

  const handleCreateCustom = (
    name: string,
    icon: string,
    description: string
  ) => {
    const activity = createActivity(name, name.toLowerCase(), icon, description, []);
    persist({ ...garage, activities: [...garage.activities, activity] });
  };

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    persist({
      ...garage,
      activities: garage.activities.filter((a) => a.id !== deleteTarget),
    });
    setDeleteTarget(null);
  };

  const deleteTargetName = garage.activities.find(
    (a) => a.id === deleteTarget
  )?.name;

  const allItems = garage.activities.flatMap((a) =>
    a.categories.flatMap((c) => c.items)
  );
  const totalItems = allItems.length;
  const haveCount = allItems.filter((i) => i.status === "have").length;
  const overallReadiness =
    totalItems > 0 ? Math.round((haveCount / totalItems) * 100) : 0;

  const statusSummary: { key: ItemStatus; count: number }[] = [
    { key: "have", count: haveCount },
    {
      key: "need",
      count: allItems.filter((i) => i.status === "need").length,
    },
    {
      key: "building",
      count: allItems.filter((i) => i.status === "building").length,
    },
    {
      key: "tbd",
      count: allItems.filter((i) => i.status === "tbd").length,
    },
  ];

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xs tracking-wider text-zinc-600">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 border-b border-warm-800 pb-6">
          <div className="flex items-center gap-3">
            <Warehouse size={24} className="text-warm-300" />
            <div>
              <h1 className="text-lg font-bold tracking-wider text-warm-300">
                GEAR GARAGE
              </h1>
              <p className="text-[11px] tracking-wide text-zinc-500">
                Your digital garage &mdash; gear organized by activity
              </p>
            </div>
          </div>

          {totalItems > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-warm-300">
                  {totalItems}
                </span>
                <span className="text-[10px] tracking-wider text-zinc-500">
                  ITEMS
                </span>
              </div>

              {statusSummary.map(({ key, count }) => {
                if (count === 0) return null;
                const colors: Record<ItemStatus, string> = {
                  have: "text-emerald-400",
                  need: "text-red-400",
                  building: "text-amber-400",
                  tbd: "text-zinc-500",
                };
                const labels: Record<ItemStatus, string> = {
                  have: "HAVE",
                  need: "NEED",
                  building: "IN PROGRESS",
                  tbd: "TBD",
                };
                return (
                  <div
                    key={key}
                    className="flex items-baseline gap-1"
                  >
                    <span
                      className={`text-lg font-bold ${colors[key]}`}
                    >
                      {count}
                    </span>
                    <span className="text-[10px] tracking-wider text-zinc-600">
                      {labels[key]}
                    </span>
                  </div>
                );
              })}

              <div className="ml-auto flex items-center gap-2">
                <div className="h-1.5 w-28 overflow-hidden rounded-full bg-warm-900">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${overallReadiness}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-400">
                  {overallReadiness}% ready
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Activities Grid */}
        {garage.activities.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {garage.activities.map((activity: Activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onDelete={handleDelete}
              />
            ))}

            <button
              onClick={() => setShowAddModal(true)}
              className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-garage-border-accent text-zinc-600 transition-all hover:border-warm-700/50 hover:text-warm-300"
            >
              <div className="flex flex-col items-center gap-2">
                <Plus size={20} />
                <span className="text-[10px] tracking-wider">
                  ADD ACTIVITY
                </span>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Warehouse size={48} className="mb-4 text-zinc-700" />
            <h2 className="mb-2 text-sm font-bold tracking-wider text-zinc-400">
              YOUR GARAGE IS EMPTY
            </h2>
            <p className="mb-6 max-w-sm text-center text-xs leading-relaxed text-zinc-600">
              Add your first activity to start tracking gear. Pick a
              template or create your own.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-lg bg-warm-300 px-6 py-3 text-xs font-bold tracking-wider text-warm-950 transition-colors hover:bg-warm-200"
            >
              + ADD YOUR FIRST ACTIVITY
            </button>
          </div>
        )}
      </div>

      <AddActivityModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreateFromTemplate={handleCreateFromTemplate}
        onCreateCustom={handleCreateCustom}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="DELETE ACTIVITY"
        message={`Delete "${deleteTargetName}" and all its gear? This can't be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
