"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Warehouse,
} from "lucide-react";
import {
  Garage,
  Activity,
  GearItem,
  ItemStatus,
  STATUS_CONFIG,
} from "@/lib/types";
import { loadGarage, saveGarage, createCategory, createItem } from "@/lib/store";
import { CategorySection } from "@/components/category-section";
import { ItemModal } from "@/components/item-modal";
import { ConfirmModal } from "@/components/confirm-modal";

export default function ActivityView() {
  const params = useParams();
  const activityId = params.id as string;

  const [garage, setGarage] = useState<Garage>({ activities: [], version: 1 });
  const [loaded, setLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    item: GearItem;
    categoryId: string;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "category" | "item";
    categoryId: string;
    itemId?: string;
    label: string;
  } | null>(null);
  const [filter, setFilter] = useState<"all" | ItemStatus>("all");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("📦");

  useEffect(() => {
    setGarage(loadGarage());
    setLoaded(true);
  }, []);

  const activity = garage.activities.find((a: Activity) => a.id === activityId);

  const persist = useCallback(
    (updated: Garage) => {
      setGarage(updated);
      saveGarage(updated);
    },
    []
  );

  const updateActivity = useCallback(
    (updater: (activity: Activity) => Activity) => {
      const updated = {
        ...garage,
        activities: garage.activities.map((a: Activity) =>
          a.id === activityId ? updater(a) : a
        ),
      };
      persist(updated);
    },
    [garage, activityId, persist]
  );

  const handleUpdateItem = (categoryId: string, itemId: string, updates: Partial<GearItem>) => {
    updateActivity((a) => ({
      ...a,
      categories: a.categories.map((c) =>
        c.id !== categoryId
          ? c
          : {
              ...c,
              items: c.items.map((i) =>
                i.id !== itemId ? i : { ...i, ...updates }
              ),
            }
      ),
    }));
  };

  const handleAddItem = (categoryId: string) => {
    const cat = activity?.categories.find((c) => c.id === categoryId);
    const newItem = createItem("New Item", cat?.items.length ?? 0);
    updateActivity((a) => ({
      ...a,
      categories: a.categories.map((c) =>
        c.id !== categoryId
          ? c
          : { ...c, items: [...c.items, newItem] }
      ),
    }));
    setSelectedItem({ item: newItem, categoryId });
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    updateActivity((a) => ({
      ...a,
      categories: a.categories.map((c) =>
        c.id !== categoryId
          ? c
          : { ...c, items: c.items.filter((i) => i.id !== itemId) }
      ),
    }));
    setDeleteTarget(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    updateActivity((a) => ({
      ...a,
      categories: a.categories.filter((c) => c.id !== categoryId),
    }));
    setDeleteTarget(null);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    updateActivity((a) => ({
      ...a,
      categories: [
        ...a.categories,
        createCategory(
          newCategoryName.trim(),
          newCategoryIcon,
          a.categories.length
        ),
      ],
    }));
    setNewCategoryName("");
    setNewCategoryIcon("📦");
    setShowAddCategory(false);
  };

  const handleSaveItem = (updates: Partial<GearItem>) => {
    if (!selectedItem) return;
    handleUpdateItem(selectedItem.categoryId, selectedItem.item.id, updates);
    setSelectedItem(null);
  };

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xs tracking-wider text-zinc-600">LOADING...</div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-sm text-zinc-400">Activity not found</p>
        <Link
          href="/"
          className="text-xs text-warm-300 hover:text-warm-200"
        >
          Back to Garage
        </Link>
      </div>
    );
  }

  const allItems = activity.categories.flatMap((c) => c.items);
  const totalItems = allItems.length;
  const haveCount = allItems.filter((i) => i.status === "have").length;
  const readiness =
    totalItems > 0 ? Math.round((haveCount / totalItems) * 100) : 0;

  const statusCounts: Record<ItemStatus, number> = {
    have: haveCount,
    need: allItems.filter((i) => i.status === "need").length,
    building: allItems.filter((i) => i.status === "building").length,
    tbd: allItems.filter((i) => i.status === "tbd").length,
  };

  const filteredCategories = activity.categories
    .map((cat) => ({
      ...cat,
      items:
        filter === "all"
          ? cat.items
          : cat.items.filter((i) => i.status === filter),
    }))
    .filter((cat) => filter === "all" || cat.items.length > 0);

  const CATEGORY_ICONS = [
    "📦", "🔧", "🦺", "🔥", "💧", "🎒", "👕", "🧭",
    "⛺", "🛏️", "🚣", "🏊", "🗑️", "💨", "📋", "🪑",
    "🔦", "🛡️", "⭕", "🎿", "🥾", "🧥", "🔺",
  ];

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 border-b border-warm-800 pb-5">
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-1.5 text-[10px] tracking-wider text-zinc-500 transition-colors hover:text-warm-300"
          >
            <ArrowLeft size={12} />
            <Warehouse size={12} />
            GEAR GARAGE
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{activity.icon}</span>
              <div>
                <h1 className="text-lg font-bold tracking-wider text-warm-300">
                  {activity.name}
                </h1>
                {activity.description && (
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {activity.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {[
              { label: "TOTAL", count: totalItems, color: "text-warm-300" },
              ...Object.entries(statusCounts)
                .filter(([, count]) => count > 0)
                .map(([key, count]) => ({
                  label: STATUS_CONFIG[key as ItemStatus].label,
                  count,
                  color:
                    key === "have"
                      ? "text-emerald-400"
                      : key === "need"
                      ? "text-red-400"
                      : key === "building"
                      ? "text-amber-400"
                      : "text-zinc-500",
                })),
            ].map(({ label, count, color }) => (
              <div key={label} className="flex items-baseline gap-1">
                <span className={`text-xl font-bold ${color}`}>{count}</span>
                <span className="text-[10px] tracking-wider text-zinc-600">
                  {label}
                </span>
              </div>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-warm-900">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${readiness}%` }}
                />
              </div>
              <span className="text-xs text-zinc-400">{readiness}% ready</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(
              [
                ["all", "ALL GEAR"],
                ["have", "HAVE IT"],
                ["need", "NEED IT"],
                ["building", "IN PROGRESS"],
                ["tbd", "TBD"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded px-3 py-1.5 text-[10px] font-medium tracking-wider transition-colors ${
                  filter === key
                    ? "bg-warm-300 text-warm-950"
                    : "border border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-[10px] tracking-wide text-zinc-600">
            click any cell to edit &middot; click item name for detail view
          </span>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {filteredCategories.map((cat) => (
            <CategorySection
              key={cat.id}
              category={cat}
              onUpdateCategory={(updates) =>
                updateActivity((a) => ({
                  ...a,
                  categories: a.categories.map((c) =>
                    c.id !== cat.id ? c : { ...c, ...updates }
                  ),
                }))
              }
              onDeleteCategory={() =>
                setDeleteTarget({
                  type: "category",
                  categoryId: cat.id,
                  label: cat.name,
                })
              }
              onAddItem={() => handleAddItem(cat.id)}
              onUpdateItem={(itemId, updates) =>
                handleUpdateItem(cat.id, itemId, updates)
              }
              onDeleteItem={(itemId) => {
                const item = cat.items.find((i) => i.id === itemId);
                setDeleteTarget({
                  type: "item",
                  categoryId: cat.id,
                  itemId,
                  label: item?.name || "this item",
                });
              }}
              onSelectItem={(item) =>
                setSelectedItem({ item, categoryId: cat.id })
              }
            />
          ))}
        </div>

        {/* Add Category */}
        {showAddCategory ? (
          <div className="mt-3 rounded-lg border border-warm-800 bg-garage-card p-4">
            <div className="mb-3 text-[10px] font-bold tracking-wider text-warm-300">
              NEW CATEGORY
            </div>
            <div className="flex gap-3">
              <input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCategory();
                  if (e.key === "Escape") setShowAddCategory(false);
                }}
                placeholder="Category name..."
                autoFocus
                className="flex-1 rounded border border-garage-border-accent bg-garage-surface px-3 py-2 text-xs text-[#e8e0d0] outline-none placeholder:text-zinc-600 focus:border-warm-600"
              />
              <div className="flex gap-1">
                {CATEGORY_ICONS.slice(0, 8).map((ic) => (
                  <button
                    key={ic}
                    onClick={() => setNewCategoryIcon(ic)}
                    className={`flex h-8 w-8 items-center justify-center rounded text-sm ${
                      newCategoryIcon === ic
                        ? "border border-warm-300 bg-warm-800"
                        : "hover:bg-warm-800/50"
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                className="rounded bg-warm-300 px-4 py-1.5 text-[10px] font-bold tracking-wider text-warm-950 hover:bg-warm-200 disabled:opacity-40"
              >
                CREATE
              </button>
              <button
                onClick={() => setShowAddCategory(false)}
                className="rounded border border-zinc-700 px-4 py-1.5 text-[10px] tracking-wider text-zinc-500 hover:border-zinc-600"
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCategory(true)}
            className="mt-3 w-full rounded-lg border border-dashed border-garage-border-accent p-3 text-[10px] tracking-wider text-zinc-600 transition-colors hover:border-warm-700/50 hover:text-warm-300"
          >
            <Plus size={12} className="mr-1 inline" />
            ADD CATEGORY
          </button>
        )}
      </div>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem?.item ?? null}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onSave={handleSaveItem}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        open={!!deleteTarget}
        title={
          deleteTarget?.type === "category"
            ? "DELETE CATEGORY"
            : "DELETE ITEM"
        }
        message={
          deleteTarget?.type === "category"
            ? `Delete "${deleteTarget.label}" and all its items? This can't be undone.`
            : `Delete "${deleteTarget?.label}"?`
        }
        onConfirm={() => {
          if (!deleteTarget) return;
          if (deleteTarget.type === "category") {
            handleDeleteCategory(deleteTarget.categoryId);
          } else if (deleteTarget.itemId) {
            handleDeleteItem(deleteTarget.categoryId, deleteTarget.itemId);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
