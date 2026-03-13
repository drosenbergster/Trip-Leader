---
date: 2026-03-12
author: D
splitFrom: product-brief-Rafting-Checklist-20260303.md
---

# Product Brief: Gear Garage

## Executive Summary

A personal gear inventory app for outdoor adventurers — organized by activity, built for the person who actually owns the stuff. The Gear Garage is your digital garage: every activity gets its own space, every item gets tracked, and you can see at a glance how ready you are for the next adventure. Not a trip planner, not a social tool — just you and your gear.

**Mission:** Adventure is closer than you thought.

---

## Core Vision

### Problem Statement

Gear sits in garages, closets, and storage bins with no visibility into what you own, what condition it's in, or what's missing. The person who leads trips and collects gear carries all of that in their head — and forgets half of it when it matters.

### Problem Impact

- No single source of truth for what you own across sports
- Gear condition degrades silently — you discover a broken zipper the night before a trip
- Wishlists live in browser tabs and mental notes
- You don't realize how close you are to being ready for a new activity
- Duplicate purchases because you forgot what's in the bin

### Why Existing Solutions Fall Short

Spreadsheets are dead on arrival — nobody maintains them. Gear tracking features in trip planning apps are afterthoughts bolted onto logistics tools. Nothing is built gear-first, organized by how you actually think about your stuff (by sport, by activity, by adventure type).

### Proposed Solution

**Gear Garage** — one app, organized by activity. Each activity is a self-contained world for that sport's gear, with appropriate categories, visuals, and defaults. You can have rafting, backcountry skiing, mountain biking — each built out in the way that makes sense for that sport.

### Design Principles

- Personal tool first — this is your garage, not a social network
- Organized by activity because that's how gear lives in your head
- Beautiful and tactile — you should want to open it and poke around
- See readiness at a glance — how complete is each activity?
- Zero-overhead onboarding — useful the first time you add an item

### Key Differentiators

1. **Activity-Specific Organization** — Not a flat list. Each activity gets its own visual world with appropriate categories, icons, and structure.
2. **Gear-to-Adventure Pipeline** — Connects what you own to what's possible. "You're 3 items away from being ready for a backcountry ski tour."
3. **Condition Intelligence** — Track wear, flag maintenance, catch problems before they become trip-day surprises.
4. **Knowledge That Compounds** — Your inventory builds over time. Every item added, every condition update, every purchase makes the system smarter.

### Product Personality

> "Sunday in the garage, cataloging what you own."
> Built for the person who gets excited about gear. Designed to make that excitement useful.

---

## Target User

### The Gear Head / Adventure Leader

One person who both leads outdoor trips and obsesses over gear. They range from the experienced leader with a full quiver running their fifth Deschutes trip, to the aspiring adventurer three items away from their first overnight ski tour.

They participate in multiple outdoor sports — rafting, backcountry skiing, mountain biking, hiking, backpacking, car camping — and own gear across all of them. The garage, the gear closet, the storage unit, the truck — it's all scattered and held together by memory.

**How they experience the problem today:**
- Gear is scattered across physical locations with no unified inventory
- Condition of gear is unknown until you pull it out and inspect it
- "What do I need?" is answered by memory and last-minute Amazon orders
- Cross-sport gear overlap is invisible (that headlamp works for camping AND skiing)
- Wishlists are browser tabs that get lost

**What success looks like:**
- Open the app, tap "Rafting," see everything you own and everything you need
- Flag an item as needing repair and actually remember to fix it
- See "you're 90% ready for backcountry skiing" and feel motivated to close the gap
- Stop buying duplicates because you forgot what's in the bin
- One source of truth that builds over time

---

## Activity Organization

The Gear Garage is organized by **activity** — sport-specific collections within one personal garage.

### How Activities Work

Each activity represents one sport or outdoor pursuit. Activities come with:

- **Sport-specific default categories** — pre-populated suggestions the user can customize
- **Sport-appropriate visuals** — icons, imagery, and structure that match the activity
- **Items** with: name, status (have/need/building/tbd), condition, detail, notes
- **Readiness summary** — at a glance, how complete is this activity?
- **Full customization** — add/remove/reorder categories and items

### Example Activities

**Rafting:**
Categories — Raft & Frame, Rowing & Paddling, Waste System, Storage & Organization, Cooking & Fire, Safety, Pump & Inflation, Tools & Repair, Permits & Logistics, Personal Gear

**Backcountry Skiing:**
Categories — Skis & Bindings, Boots, Poles, Skins, Beacon/Shovel/Probe, Outerwear, Layers, Pack, Navigation, Emergency, Camping (if overnight)

**Mountain Biking:**
Categories — Bike & Frame, Wheels & Tires, Drivetrain, Protection, Tools & Repair, Hydration, Clothing

**Hiking / Backpacking:**
Categories — Pack, Shelter, Sleep System, Cooking, Water, Clothing, Navigation, Safety, Toiletries

**Car Camping:**
Categories — Shelter, Sleep, Kitchen & Cooking, Fire, Furniture, Lighting, Storage, Entertainment

**Custom:**
Users can create any activity with fully custom categories.

---

## Success Metrics

### User Success (Does It Work for D?)

1. **Adoption** — The gear inventory lives in the app, not in memory. If it doesn't replace the current mental model, it failed.
2. **Persistence** — The app gets updated after trips and before purchases. It becomes the source of truth.
3. **Readiness Clarity** — You can look at an activity and immediately see what you have, what you need, and how ready you are.
4. **Cross-Sport Awareness** — You discover gear overlap and readiness for new activities you hadn't considered.
5. **Condition Tracking** — Gear issues get flagged and fixed before they become trip-day problems.

### Non-Goals

- User acquisition targets
- Revenue or monetization
- Social features or sharing (that's Trip Leader's job)
- Trip planning or logistics

---

## MVP Scope

### v1 — "The Garage Is Open"

- **Garage Home** — overview of all activities with readiness summaries
- **Activity View** — single sport's gear organized by category with visual gear cards
- **Item Management** — add/edit/delete items with name, detail, status, condition, notes
- **Category Management** — add/edit/delete/reorder categories within activities
- **Activity Templates** — pre-built default categories for common sports (rafting, skiing, MTB, hiking, camping)
- **Custom Activities** — create any activity with any categories
- **Readiness Dashboard** — per-activity and overall readiness percentages
- **Persistent Storage** — data persists across sessions (Supabase)
- **Auth** — simple auth so your garage is yours

### Out of Scope — v2

- Wishlist section with purchase links
- Photo attachments for items
- Maintenance scheduling and reminders
- Cross-activity gear tagging (one headlamp used across multiple activities)
- Integration with Trip Leader (link activity gear to trip packing lists)
- Import/export
- Gear value tracking

---

## Relationship to Trip Leader

Gear Garage and Trip Leader are **independent products** developed separately.

- **Gear Garage** = personal inventory management (what do I own?)
- **Trip Leader** = group trip logistics and communication (let's plan this trip together)

They may integrate in the future — a trip's packing list could reference your Gear Garage inventory — but neither depends on the other. Gear Garage is useful without ever planning a trip. Trip Leader is useful without ever tracking gear.

Built with integration in mind. Developed independently.
