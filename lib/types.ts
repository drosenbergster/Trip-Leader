export type ItemStatus = "have" | "need" | "building" | "tbd";

export type ItemCondition = "excellent" | "good" | "fair" | "poor" | "unknown";

export interface GearItem {
  id: string;
  name: string;
  detail: string;
  status: ItemStatus;
  condition: ItemCondition;
  notes: string;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  items: GearItem[];
  sortOrder: number;
}

export interface Activity {
  id: string;
  name: string;
  sport: string;
  icon: string;
  description: string;
  categories: Category[];
  createdAt: string;
}

export interface Garage {
  activities: Activity[];
  version: number;
}

export const STATUS_CONFIG: Record<
  ItemStatus,
  { label: string; className: string; dotClassName: string }
> = {
  have: {
    label: "HAVE IT",
    className: "bg-emerald-900/40 text-emerald-300",
    dotClassName: "bg-emerald-400",
  },
  need: {
    label: "NEED IT",
    className: "bg-red-900/40 text-red-300",
    dotClassName: "bg-red-400",
  },
  building: {
    label: "IN PROGRESS",
    className: "bg-amber-900/40 text-amber-300",
    dotClassName: "bg-amber-400",
  },
  tbd: {
    label: "TBD",
    className: "bg-zinc-700/40 text-zinc-400",
    dotClassName: "bg-zinc-500",
  },
};

export const CONDITION_CONFIG: Record<
  ItemCondition,
  { label: string; className: string }
> = {
  excellent: { label: "Excellent", className: "text-emerald-400" },
  good: { label: "Good", className: "text-sky-400" },
  fair: { label: "Fair", className: "text-amber-400" },
  poor: { label: "Poor", className: "text-red-400" },
  unknown: { label: "Unknown", className: "text-zinc-500" },
};
