"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Category, GearItem, ItemStatus, ItemCondition } from "@/lib/types";
import { StatusBadge } from "./status-badge";
import { ConditionBadge } from "./condition-badge";
import { EditableText } from "./editable-text";

interface CategorySectionProps {
  category: Category;
  onUpdateCategory: (updates: Partial<Category>) => void;
  onDeleteCategory: () => void;
  onAddItem: () => void;
  onUpdateItem: (itemId: string, updates: Partial<GearItem>) => void;
  onDeleteItem: (itemId: string) => void;
  onSelectItem: (item: GearItem) => void;
}

export function CategorySection({
  category,
  onUpdateCategory,
  onDeleteCategory,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onSelectItem,
}: CategorySectionProps) {
  const [expanded, setExpanded] = useState(true);

  const haveCount = category.items.filter((i) => i.status === "have").length;
  const total = category.items.length;

  return (
    <div className="overflow-hidden rounded-lg border border-garage-border-accent">
      <div className="flex items-center bg-garage-card">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex flex-1 items-center gap-2 p-3 text-left"
        >
          <span className="text-lg">{category.icon}</span>
          <span className="flex-1 text-xs font-bold tracking-wider text-warm-300">
            {category.name}
          </span>
          <span className="mr-2 text-[10px] text-zinc-600">
            {haveCount}/{total}
          </span>
          {expanded ? (
            <ChevronUp size={14} className="text-zinc-600" />
          ) : (
            <ChevronDown size={14} className="text-zinc-600" />
          )}
        </button>
        <button
          onClick={onDeleteCategory}
          className="px-3 py-3 text-zinc-700 transition-colors hover:text-red-400"
          title="Delete category"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {expanded && (
        <>
          {category.items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-garage-border bg-garage-bg/50">
                    <th className="px-3 py-2 text-left text-[10px] font-normal tracking-wider text-zinc-600">
                      ITEM
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-normal tracking-wider text-zinc-600">
                      DETAIL
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-normal tracking-wider text-zinc-600">
                      STATUS
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-normal tracking-wider text-zinc-600">
                      CONDITION
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-normal tracking-wider text-zinc-600">
                      NOTES
                    </th>
                    <th className="w-8 px-2 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-b border-garage-border/50 transition-colors hover:bg-warm-900/30 ${
                        idx % 2 === 0 ? "bg-garage-surface" : "bg-garage-bg/30"
                      }`}
                    >
                      <td className="min-w-[120px] px-3 py-2 font-medium text-[#e8e0d0]">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="text-left hover:text-warm-300"
                        >
                          {item.name}
                        </button>
                      </td>
                      <td className="min-w-[150px] px-3 py-2 text-warm-500">
                        <EditableText
                          value={item.detail}
                          onChange={(v) =>
                            onUpdateItem(item.id, { detail: v })
                          }
                          placeholder="add detail..."
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-2">
                        <StatusBadge
                          status={item.status}
                          onChange={(s: ItemStatus) =>
                            onUpdateItem(item.id, { status: s })
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-2">
                        <ConditionBadge
                          condition={item.condition}
                          onChange={(c: ItemCondition) =>
                            onUpdateItem(item.id, { condition: c })
                          }
                        />
                      </td>
                      <td className="min-w-[180px] px-3 py-2 text-[11px] leading-relaxed text-zinc-500">
                        <EditableText
                          value={item.notes}
                          onChange={(v) =>
                            onUpdateItem(item.id, { notes: v })
                          }
                          placeholder="add notes..."
                          multiline
                        />
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="text-zinc-800 transition-colors hover:text-red-400"
                          title="Delete item"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={onAddItem}
            className="w-full border-t border-dashed border-garage-border p-2 text-[10px] tracking-wider text-zinc-600 transition-colors hover:bg-garage-card hover:text-warm-300"
          >
            + ADD ITEM
          </button>
        </>
      )}
    </div>
  );
}
