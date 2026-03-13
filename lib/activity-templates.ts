import { ItemStatus } from "./types";

interface TemplateItem {
  name: string;
  detail: string;
  status: ItemStatus;
  notes: string;
}

interface TemplateCategory {
  name: string;
  icon: string;
  items: TemplateItem[];
}

export interface ActivityTemplate {
  name: string;
  sport: string;
  icon: string;
  description: string;
  categories: TemplateCategory[];
}

export const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  {
    name: "Rafting",
    sport: "rafting",
    icon: "🚣",
    description: "Multi-day river trips — raft, frame, kitchen, safety, and everything in between",
    categories: [
      {
        name: "Raft & Frame",
        icon: "🚣",
        items: [
          { name: "Raft", detail: "Inflatable raft", status: "need", notes: "Self-bailing preferred" },
          { name: "Frame", detail: "Rowing frame", status: "need", notes: "Fits raft width, D-ring mounted" },
          { name: "Dry Box", detail: "Ammo can or custom", status: "need", notes: "Bracket-mounted in rowing bay" },
          { name: "Cooler", detail: "Hard cooler", status: "need", notes: "Sized for trip length" },
          { name: "Rail Decking", detail: "Wooden or composite", status: "need", notes: "Cam strap slots, full rail length" },
          { name: "Water Cans", detail: "Heavy duty x2", status: "need", notes: "Rigged to outside of frame" },
          { name: "Paco Pad", detail: "River pad", status: "need", notes: "Covers cooler for passenger seating" },
        ],
      },
      {
        name: "Rowing & Paddling",
        icon: "🏊",
        items: [
          { name: "Oars", detail: "Primary set", status: "need", notes: "Main rowing oars" },
          { name: "Spare Oar", detail: "Backup oar", status: "need", notes: "Critical safety redundancy" },
          { name: "Paddles", detail: "Passenger paddles", status: "need", notes: "54-60\" for raft width" },
        ],
      },
      {
        name: "Waste System",
        icon: "🗑️",
        items: [
          { name: "Groover", detail: "Ammo can system", status: "need", notes: "Required on permitted rivers" },
          { name: "Garbage Can", detail: "Steel ammo can", status: "need", notes: "Alongside groover" },
          { name: "Can Crusher", detail: "Wall-mount style", status: "need", notes: "Mount to garbage can lid" },
          { name: "Ash Bags", detail: "Contractor bags", status: "need", notes: "Double-bag ash, must be cold" },
        ],
      },
      {
        name: "Storage & Organization",
        icon: "📦",
        items: [
          { name: "Dry Bags", detail: "Personal gear bags", status: "need", notes: "Bow/stern triangles" },
          { name: "Gamma Lid Buckets", detail: "Food-grade", status: "need", notes: "Dry storage, food safe" },
          { name: "Strap Bags", detail: "Organization bags", status: "need", notes: "Straps, trash, misc" },
          { name: "Drop Bag", detail: "Catch-all dry bag", status: "need", notes: "Miscellaneous items" },
          { name: "Cam Straps", detail: "Assorted lengths", status: "need", notes: "Spare straps always useful" },
        ],
      },
      {
        name: "Cooking & Fire",
        icon: "🔥",
        items: [
          { name: "Camp Stove", detail: "2-burner", status: "need", notes: "Primary cooking" },
          { name: "Propane Tank", detail: "20lb tank", status: "need", notes: "Runs stove + fire pit" },
          { name: "Propane Fire Pit", detail: "Portable", status: "tbd", notes: "Alternative to wood fire" },
          { name: "Fire Pan", detail: "Metal, 2\"+ sides", status: "need", notes: "Required on many rivers" },
          { name: "Fire Blanket", detail: "LNT fire blanket", status: "need", notes: "Goes under fire pan" },
          { name: "Firewood", detail: "Pack-in wood", status: "need", notes: "Check local gathering rules" },
          { name: "Kitchen Kit", detail: "Camp kitchen gear", status: "need", notes: "Pots, pans, utensils" },
          { name: "Table", detail: "Camp table", status: "need", notes: "Straps to frame or rails" },
        ],
      },
      {
        name: "Safety",
        icon: "🦺",
        items: [
          { name: "PFDs", detail: "Life jackets", status: "need", notes: "One per person, non-negotiable" },
          { name: "Throw Bag", detail: "River throw bag", status: "need", notes: "Immediately accessible" },
          { name: "First Aid Kit", detail: "Comprehensive river kit", status: "need", notes: "Accessible during the day" },
          { name: "Knife", detail: "Accessible blade", status: "need", notes: "For entanglement, quickly reachable" },
          { name: "Whistles", detail: "One per person", status: "need", notes: "Attached to PFDs" },
          { name: "Helmets", detail: "Optional per class", status: "tbd", notes: "Based on crew comfort level" },
          { name: "Repair Kit", detail: "Raft-specific", status: "need", notes: "Match to raft material (PVC/Hypalon)" },
          { name: "Spare Valve Caps", detail: "Raft-specific", status: "need", notes: "Easy to lose, cheap insurance" },
        ],
      },
      {
        name: "Pump & Inflation",
        icon: "💨",
        items: [
          { name: "Pump", detail: "High-volume pump", status: "need", notes: "Double-chamber preferred" },
          { name: "Replacement Hose", detail: "Pump-specific", status: "need", notes: "Not interchangeable between models" },
        ],
      },
      {
        name: "Tools & Repair",
        icon: "🔧",
        items: [
          { name: "Multi-tool", detail: "Leatherman or similar", status: "need", notes: "River essential" },
          { name: "Adjustable Wrench", detail: "Crescent wrench", status: "need", notes: "Frame adjustments" },
          { name: "Allen Key Set", detail: "Hex key set", status: "need", notes: "For bolt adjustments" },
          { name: "Gorilla Tape", detail: "Heavy duty tape", status: "need", notes: "Stronger than duct tape" },
          { name: "Carabiners", detail: "Spare carabiners", status: "need", notes: "Always handy on a raft" },
          { name: "Webbing", detail: "Spare webbing", status: "need", notes: "Rigging, rescue, tie-downs" },
        ],
      },
      {
        name: "Permits & Logistics",
        icon: "📋",
        items: [
          { name: "Boater Pass", detail: "Recreation.gov or local", status: "need", notes: "Check requirements per river" },
          { name: "Shuttle", detail: "Car shuttle or service", status: "need", notes: "Arrange before launch day" },
          { name: "River Map", detail: "Waterproof map", status: "need", notes: "Know portages and hazards" },
          { name: "Gauge Check", detail: "USGS flow data", status: "need", notes: "Check day-of for water levels" },
        ],
      },
      {
        name: "Personal Gear",
        icon: "🎒",
        items: [
          { name: "Cold Weather Layers", detail: "Per crew size", status: "need", notes: "Canyon temps can drop at night" },
          { name: "Rain Gear", detail: "Per crew size", status: "need", notes: "Unexpected rain possible" },
          { name: "Cold Water Gloves", detail: "Neoprene", status: "need", notes: "Essential for cold-water rowing" },
          { name: "Sleeping Bags", detail: "Rated for conditions", status: "need", notes: "Verify rating before trip" },
          { name: "Headlamps", detail: "One per person", status: "need", notes: "Fresh batteries" },
          { name: "Lighters", detail: "Primary + backup", status: "need", notes: "Waterproof preferred" },
        ],
      },
    ],
  },
  {
    name: "Backcountry Skiing",
    sport: "backcountry-skiing",
    icon: "⛷️",
    description: "Touring and backcountry skiing — avalanche safety, uphill, and downhill gear",
    categories: [
      { name: "Skis & Bindings", icon: "🎿", items: [
        { name: "Skis", detail: "", status: "need", notes: "" },
        { name: "Bindings", detail: "", status: "need", notes: "" },
        { name: "Skins", detail: "", status: "need", notes: "" },
      ]},
      { name: "Boots & Poles", icon: "🥾", items: [
        { name: "Touring Boots", detail: "", status: "need", notes: "" },
        { name: "Poles", detail: "", status: "need", notes: "" },
      ]},
      { name: "Avalanche Safety", icon: "🔺", items: [
        { name: "Beacon", detail: "", status: "need", notes: "" },
        { name: "Shovel", detail: "", status: "need", notes: "" },
        { name: "Probe", detail: "", status: "need", notes: "" },
        { name: "Airbag Pack", detail: "", status: "tbd", notes: "" },
      ]},
      { name: "Outerwear", icon: "🧥", items: [
        { name: "Shell Jacket", detail: "", status: "need", notes: "" },
        { name: "Shell Pants", detail: "", status: "need", notes: "" },
        { name: "Insulated Layer", detail: "", status: "need", notes: "" },
        { name: "Gloves", detail: "", status: "need", notes: "" },
        { name: "Helmet", detail: "", status: "need", notes: "" },
        { name: "Goggles", detail: "", status: "need", notes: "" },
      ]},
      { name: "Layers", icon: "👕", items: [
        { name: "Base Layer Top", detail: "", status: "need", notes: "" },
        { name: "Base Layer Bottom", detail: "", status: "need", notes: "" },
        { name: "Mid Layer", detail: "", status: "need", notes: "" },
      ]},
      { name: "Pack & Essentials", icon: "🎒", items: [
        { name: "Touring Pack", detail: "", status: "need", notes: "" },
        { name: "Water / Hydration", detail: "", status: "need", notes: "" },
        { name: "Snacks / Food", detail: "", status: "need", notes: "" },
        { name: "Sunscreen", detail: "", status: "need", notes: "" },
        { name: "First Aid Kit", detail: "", status: "need", notes: "" },
      ]},
      { name: "Navigation & Communication", icon: "🧭", items: [
        { name: "Map / CalTopo", detail: "", status: "need", notes: "" },
        { name: "Compass", detail: "", status: "need", notes: "" },
        { name: "Satellite Communicator", detail: "", status: "tbd", notes: "" },
      ]},
      { name: "Overnight (If Applicable)", icon: "⛺", items: [
        { name: "Tent / Bivy", detail: "", status: "tbd", notes: "" },
        { name: "Sleeping Bag", detail: "", status: "tbd", notes: "" },
        { name: "Sleeping Pad", detail: "", status: "tbd", notes: "" },
        { name: "Stove", detail: "", status: "tbd", notes: "" },
      ]},
    ],
  },
  {
    name: "Mountain Biking",
    sport: "mountain-biking",
    icon: "🚵",
    description: "Trail and enduro riding — bike, protection, tools, and hydration",
    categories: [
      { name: "Bike & Frame", icon: "🚲", items: [
        { name: "Bike", detail: "", status: "need", notes: "" },
        { name: "Dropper Post", detail: "", status: "need", notes: "" },
      ]},
      { name: "Wheels & Tires", icon: "⭕", items: [
        { name: "Front Wheel", detail: "", status: "need", notes: "" },
        { name: "Rear Wheel", detail: "", status: "need", notes: "" },
        { name: "Spare Tube", detail: "", status: "need", notes: "" },
        { name: "Tire Sealant", detail: "", status: "need", notes: "" },
      ]},
      { name: "Protection", icon: "🛡️", items: [
        { name: "Helmet", detail: "", status: "need", notes: "" },
        { name: "Gloves", detail: "", status: "need", notes: "" },
        { name: "Knee Pads", detail: "", status: "tbd", notes: "" },
        { name: "Eyewear", detail: "", status: "need", notes: "" },
      ]},
      { name: "Tools & Repair", icon: "🔧", items: [
        { name: "Multi-tool", detail: "", status: "need", notes: "" },
        { name: "Tire Levers", detail: "", status: "need", notes: "" },
        { name: "Mini Pump / CO2", detail: "", status: "need", notes: "" },
        { name: "Chain Breaker", detail: "", status: "tbd", notes: "" },
      ]},
      { name: "Hydration & Nutrition", icon: "💧", items: [
        { name: "Water Bottles / Pack", detail: "", status: "need", notes: "" },
        { name: "Snacks", detail: "", status: "need", notes: "" },
      ]},
      { name: "Clothing", icon: "👕", items: [
        { name: "Riding Shorts", detail: "", status: "need", notes: "" },
        { name: "Jersey", detail: "", status: "need", notes: "" },
        { name: "Riding Shoes", detail: "", status: "need", notes: "" },
      ]},
    ],
  },
  {
    name: "Hiking / Backpacking",
    sport: "hiking-backpacking",
    icon: "🥾",
    description: "Day hikes to multi-day backpacking trips — the 10 essentials and beyond",
    categories: [
      { name: "Pack", icon: "🎒", items: [
        { name: "Backpack", detail: "", status: "need", notes: "" },
        { name: "Rain Cover", detail: "", status: "need", notes: "" },
      ]},
      { name: "Shelter", icon: "⛺", items: [
        { name: "Tent", detail: "", status: "need", notes: "" },
        { name: "Footprint", detail: "", status: "tbd", notes: "" },
      ]},
      { name: "Sleep System", icon: "🛏️", items: [
        { name: "Sleeping Bag", detail: "", status: "need", notes: "" },
        { name: "Sleeping Pad", detail: "", status: "need", notes: "" },
        { name: "Pillow", detail: "", status: "tbd", notes: "" },
      ]},
      { name: "Cooking", icon: "🔥", items: [
        { name: "Stove", detail: "", status: "need", notes: "" },
        { name: "Fuel", detail: "", status: "need", notes: "" },
        { name: "Cookware", detail: "", status: "need", notes: "" },
        { name: "Utensils", detail: "", status: "need", notes: "" },
      ]},
      { name: "Water", icon: "💧", items: [
        { name: "Water Bottles", detail: "", status: "need", notes: "" },
        { name: "Water Filter", detail: "", status: "need", notes: "" },
      ]},
      { name: "Clothing", icon: "👕", items: [
        { name: "Hiking Boots", detail: "", status: "need", notes: "" },
        { name: "Rain Jacket", detail: "", status: "need", notes: "" },
        { name: "Insulated Layer", detail: "", status: "need", notes: "" },
        { name: "Base Layers", detail: "", status: "need", notes: "" },
        { name: "Hiking Socks", detail: "", status: "need", notes: "" },
      ]},
      { name: "Navigation", icon: "🧭", items: [
        { name: "Map", detail: "", status: "need", notes: "" },
        { name: "Compass", detail: "", status: "need", notes: "" },
        { name: "GPS / Phone", detail: "", status: "need", notes: "" },
      ]},
      { name: "Safety", icon: "🦺", items: [
        { name: "First Aid Kit", detail: "", status: "need", notes: "" },
        { name: "Headlamp", detail: "", status: "need", notes: "" },
        { name: "Whistle", detail: "", status: "need", notes: "" },
        { name: "Fire Starter", detail: "", status: "need", notes: "" },
        { name: "Knife / Multi-tool", detail: "", status: "need", notes: "" },
        { name: "Sun Protection", detail: "", status: "need", notes: "" },
      ]},
    ],
  },
  {
    name: "Car Camping",
    sport: "car-camping",
    icon: "🏕️",
    description: "Drive-in camping — comfort-focused gear for campground and dispersed sites",
    categories: [
      { name: "Shelter", icon: "⛺", items: [
        { name: "Tent", detail: "", status: "need", notes: "" },
        { name: "Tarp / Shade", detail: "", status: "tbd", notes: "" },
      ]},
      { name: "Sleep", icon: "🛏️", items: [
        { name: "Sleeping Bag", detail: "", status: "need", notes: "" },
        { name: "Sleeping Pad / Cot", detail: "", status: "need", notes: "" },
        { name: "Pillow", detail: "", status: "need", notes: "" },
      ]},
      { name: "Kitchen & Cooking", icon: "🔥", items: [
        { name: "Camp Stove", detail: "", status: "need", notes: "" },
        { name: "Fuel / Propane", detail: "", status: "need", notes: "" },
        { name: "Cooler", detail: "", status: "need", notes: "" },
        { name: "Cookware", detail: "", status: "need", notes: "" },
        { name: "Utensils & Plates", detail: "", status: "need", notes: "" },
        { name: "Water Jug", detail: "", status: "need", notes: "" },
      ]},
      { name: "Fire", icon: "🪵", items: [
        { name: "Firewood", detail: "", status: "need", notes: "" },
        { name: "Fire Starter", detail: "", status: "need", notes: "" },
        { name: "Matches / Lighter", detail: "", status: "need", notes: "" },
      ]},
      { name: "Furniture", icon: "🪑", items: [
        { name: "Camp Chairs", detail: "", status: "need", notes: "" },
        { name: "Camp Table", detail: "", status: "need", notes: "" },
      ]},
      { name: "Lighting", icon: "🔦", items: [
        { name: "Lantern", detail: "", status: "need", notes: "" },
        { name: "Headlamp", detail: "", status: "need", notes: "" },
        { name: "String Lights", detail: "", status: "tbd", notes: "" },
      ]},
      { name: "Storage & Organization", icon: "📦", items: [
        { name: "Storage Bins", detail: "", status: "need", notes: "" },
        { name: "Trash Bags", detail: "", status: "need", notes: "" },
      ]},
    ],
  },
];
