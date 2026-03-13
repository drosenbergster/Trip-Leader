---
date: 2026-03-12
author: D
splitFrom: product-brief-Rafting-Checklist-20260303.md
---

# Product Brief: Trip Leader

## Executive Summary

A trip planning and group coordination app for outdoor adventurers — built by a trip leader who needed it. Create a trip, build the itinerary, invite crew, plan meals, assign tasks, track costs — share it all with one link. The real competitor isn't other apps — it's winging it and hoping for the best.

**Mission:** The trip leader's shoulders drop. They enjoy the trip they planned.

---

## Core Vision

### Problem Statement

Leading a group outdoor trip means carrying every detail in your head with no way to verify any of it. The person who planned the trip can never enjoy it.

### Problem Impact

- Trip leaders burn out and stop volunteering to lead
- Planning is scattered across group texts, spreadsheets, and memory
- Cost sharing is awkward and always falls on the leader
- Lessons from past trips are lost
- Participants show up underprepared because communication was scattered

### Why Existing Solutions Fall Short

Nothing understands what a "trip" is: people + place + time + shared logistics. Current tools solve fragments. The real competitor is doing nothing — defaulting to memory, scattered messages, and hoping it comes together.

### Proposed Solution

**Trip Leader** — create a trip, share a link, and the trip explains itself. One app for the full lifecycle: plan, prep, execute, settle up. The trip leader is a publisher. Participants are readers with different appetites.

### Design Principles

- Shareable trip in under 5 minutes or it fails
- View trip pages without an account
- Trip planning, not project management — feels like planning a fun thing
- The app provides structure; the leader provides knowledge
- Progressive disclosure — one link serves both the "just tell me when" person and the deep-diver

### Key Differentiators

1. **Confidence Engine** — Makes the invisible visible. See that things are on track instead of hoping they are.
2. **Progressive Disclosure** — One link serves both the minimal and deep-dive participant.
3. **Knowledge That Compounds** — Past trips become templates. The intelligence is yours, earned through use.
4. **The Leader Is a Publisher** — Not a shared-doc coordinator. They publish a trip. Crew members consume it.

### Product Personality

> "Intentional and planned, but fun and loose and ready to dive into."
> The feeling of a well-packed truck at 6am — everything's in its place, crew's rolling in, coffee's on.

---

## Target Users

### Primary: The Adventure Leader

Plans multi-day group trips (rafting, backcountry skiing, backpacking, car camping). Carries the mental load for the whole crew.

**What success looks like:**
- Can see at a glance that the trip is on track — green lights across the board
- Shares one link and the trip explains itself
- Past trips become templates that make the next one faster
- Their shoulders drop. They enjoy the trip they planned.

### Secondary: The Participant

Gets a link from the leader. Opens it in their browser. Sees the trip plan. No account required to view.

**What success looks like:**
- Opens the link and immediately understands: where, when, what to bring
- Feels informed without being overwhelmed
- Can contribute if they want to, without obligation

---

## MVP Scope

### v1 — "One Trip, One Link, It Works"

**Trip Planning Core (simplified skeleton):**
- Trip Overview (dates, route with named locations + map link, description)
- Crew Roster (invite via shareable link, see who's confirmed)
- Itinerary (day-by-day plan)
- Meal Plan (meals by day, who's cooking, grocery list)
- Shareable Trip Page (one link, no login to view, progressive disclosure)
- Basic Packing List (per-trip checklist, who's bringing what)

**Stress Reduction Layer:**
- Cost Ledger (log expenses + receipts, auto-calculate settlement)
- Readiness Dashboard (per-person status, leader sees all at a glance)
- Task Board (assign responsibilities, section delegation with visible status)

### Out of Scope — v2

- Configurable reminders (time-sequenced, leader-only or crew-wide)
- Post-trip brain dump (voice-to-text → structured data → action items)
- Trip templates / cloning (past trips become reusable starting points)
- Pre-trip PDF generation (leader-curated downloadable packet)
- Resource Library (growing collection of maps, videos, guides across trips)
- Participant profiles (dietary, medical, experience — carried across trips)
- Co-leader role with scoped permissions

### Universal Trip Data Model

```
TRIP = {
  overview:     { dates, route, description, type, map_link }
  crew:         [ { person, role, readiness, bring_list, expenses } ]
  itinerary:    [ { day, plan, location, notes } ]
  meals:        [ { day, meal, menu, cook, grocery_list } ]
  tasks:        [ { task, owner, status } ]
  costs:        [ { item, amount, paid_by, split_among, receipt } ]
  emergency:    { contacts, hospitals, evacuation_notes }
}
```

---

## Relationship to Gear Garage

Trip Leader and Gear Garage are **independent products** developed separately.

- **Trip Leader** = group trip logistics and communication (let's plan this trip together)
- **Gear Garage** = personal inventory management (what do I own?)

The Trip Leader's packing list is a per-trip checklist — it does NOT require inventory management. In the future, Trip Leader could optionally pull from a user's Gear Garage to pre-populate packing lists, but the two products are fully independent.

Built with integration in mind. Developed independently.

---

## Success Metrics

### The Only Metric That Matters

> Does it make the trip leader's process simpler? If yes, keep building. If no, fix it.

### MVP Success Gate

> Plan a real trip in the app. Share the link with real crew. Use it through the full lifecycle — plan, prep, trip, settle costs. If the process was simpler than the old way, v1 worked.
