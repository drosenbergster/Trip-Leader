import { Garage, Activity, Category, GearItem, ItemStatus, ItemCondition } from "./types";

const STORAGE_KEY = "gear-garage-v1";

function generateId(): string {
  return crypto.randomUUID();
}

export function loadGarage(): Garage {
  if (typeof window === "undefined") return { activities: [], version: 1 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.pockets && !parsed.activities) {
        parsed.activities = parsed.pockets;
        delete parsed.pockets;
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return { activities: [], version: 1 };
}

export function saveGarage(garage: Garage): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(garage));
  } catch {
    // ignore
  }
}

export function createActivity(
  name: string,
  sport: string,
  icon: string,
  description: string,
  categories: { name: string; icon: string; items?: { name: string; detail: string; status: ItemStatus; notes: string }[] }[]
): Activity {
  return {
    id: generateId(),
    name,
    sport,
    icon,
    description,
    createdAt: new Date().toISOString(),
    categories: categories.map((cat, i) => ({
      id: generateId(),
      name: cat.name,
      icon: cat.icon,
      sortOrder: i,
      items: (cat.items || []).map((item, j) => ({
        id: generateId(),
        name: item.name,
        detail: item.detail,
        status: item.status,
        condition: "unknown" as ItemCondition,
        notes: item.notes,
        sortOrder: j,
      })),
    })),
  };
}

export function createCategory(name: string, icon: string, sortOrder: number): Category {
  return {
    id: generateId(),
    name,
    icon,
    sortOrder,
    items: [],
  };
}

export function createItem(
  name: string,
  sortOrder: number,
  overrides?: Partial<GearItem>
): GearItem {
  return {
    id: generateId(),
    name,
    detail: "",
    status: "need",
    condition: "unknown",
    notes: "",
    sortOrder,
    ...overrides,
  };
}
