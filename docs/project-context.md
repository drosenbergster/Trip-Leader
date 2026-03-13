# Gear Garage — Project Context

## What Is This Project?

A personal gear inventory app for outdoor adventurers. Your digital garage — organized by activity, built for the person who actually owns the stuff. Every activity gets its own section, every item gets tracked, and you can see at a glance how ready you are for the next adventure.

**Mission:** Adventure is closer than you thought.

## Product Split (2026-03-12)

This project was originally conceived as "one app, two sections" — a Trip Planner + Gear Closet. That vision has been split into two independent products:

| Product | What It Does | Repo |
|---|---|---|
| **Gear Garage** | Personal gear inventory management, organized by activity | This repo |
| **Trip Leader** | Group trip logistics, shareable links, crew coordination | Separate repo (future) |

The two products may integrate in the future (a trip's packing list could pull from your Gear Garage) but they are developed independently.

## Current State (as of 2026-03-12)

### Phase: Product Discovery → Build

Planning is complete. Building has begun.

### Artifacts

| File | What It Is |
|---|---|
| `_bmad-output/planning-artifacts/product-brief-gear-garage.md` | **The Gear Garage Product Brief** — vision, target user, activity model, MVP scope |
| `_bmad-output/planning-artifacts/product-brief-trip-leader.md` | **The Trip Leader Product Brief** — saved for future separate development |
| `_bmad-output/planning-artifacts/product-brief-Rafting-Checklist-20260303-archived.md` | **Archived** — original combined product brief before the split |
| `_bmad-output/brainstorming/brainstorming-session-20260303-125302.md` | **The Brainstorming Session** — 108 questions, cross-pollination, morphological analysis. Covers both products. |
| `RaftGearManifest.jsx` | **Original prototype** — React gear inventory tracker for a Lower Deschutes raft trip. The seed that started the project. |

### Key Decisions

- **Two independent products** — Gear Garage (inventory) and Trip Leader (logistics) developed separately
- **Gear Garage first** — this repo, building now
- **Activity model** — gear organized by sport/activity, each activity has sport-specific categories and visuals
- **Primary user:** The gear head / adventure leader — one person across multiple sports
- **Tech stack:** Next.js + Tailwind CSS + Supabase + Vercel

### Activity Organization

The Gear Garage is organized by activity — each one with sport-specific categories:

- **Rafting** — Raft & Frame, Rowing, Waste System, Storage, Cooking & Fire, Safety, Pump, Tools, Permits, Personal Gear
- **Backcountry Skiing** — Skis & Bindings, Boots, Poles, Skins, Beacon/Shovel/Probe, Outerwear, Layers, Pack, Navigation, Emergency
- **Mountain Biking** — Bike & Frame, Wheels & Tires, Drivetrain, Protection, Tools & Repair, Hydration, Clothing
- **Hiking / Backpacking** — Pack, Shelter, Sleep System, Cooking, Water, Clothing, Navigation, Safety
- **Car Camping** — Shelter, Sleep, Kitchen & Cooking, Fire, Furniture, Lighting, Storage, Entertainment
- **Custom** — any activity, any categories

Each activity has: sport-specific default categories, visual treatments, items with status/condition/notes, readiness summary.

## v1 Scope — "The Garage Is Open"

- Garage Home — overview of all activities with readiness summaries
- Activity View — single sport's gear organized by category with visual gear cards
- Item Management — add/edit/delete items with name, detail, status, condition, notes
- Category Management — add/edit/delete/reorder categories within activities
- Activity Templates — pre-built defaults for common sports
- Custom Activities — create any activity with any categories
- Readiness Dashboard — per-activity and overall readiness
- Auth + persistent storage (Supabase)

## Design Principles

- Personal tool first — your garage, not a social network
- Organized by activity because that's how gear lives in your head
- Beautiful and tactile — you should want to open it and poke around
- See readiness at a glance
- Zero-overhead onboarding — useful the first time you add an item

## Data Model (Simplified)

```
GARAGE = {
  user:       { id, email, preferences }
  activities: [ {
    name, sport, icon, custom_settings,
    categories: [ {
      name, icon, sort_order,
      items: [ { name, detail, status, condition, notes, sort_order } ]
    } ]
  } ]
}
```
