# Trip Leader -- Project Context

## What Is This Project?

A trip planning and gear management app for outdoor adventurers. Two sections, one app: a **Trip Planner** that turns group logistics into a shareable link, and a **Gear Closet** that tracks what you own and shows you how ready you are for the next adventure.

**Mission:** Adventure is closer than you thought.

## Current State (as of 2026-03-03)

### Phase: Product Discovery -- Complete

Two BMAD workflows have been completed:

1. **Brainstorming Session** -- 108 questions, 14 cross-pollinated patterns from 5 domains, full morphological analysis, 8 themes, prioritized feature roadmap
2. **Product Brief** -- Executive summary, core vision, target users, success metrics, MVP scope with v1/v2 split

### Artifacts

| File | What It Is |
|---|---|
| `RaftGearManifest.jsx` | Original React prototype -- a gear inventory tracker for a Lower Deschutes raft trip. Single component, localStorage persistence, inline editing, status tracking. This is the seed that started the project. |
| `_bmad-output/planning-artifacts/product-brief-Rafting-Checklist-20260303.md` | **The Product Brief** -- the primary planning document. Contains vision, problem statement, target users, success metrics, MVP scope, and design principles. Start here for project context. |
| `_bmad-output/brainstorming/brainstorming-session-20260303-125302.md` | **The Brainstorming Session** -- deep research artifact. 100 questions, cross-pollination results, morphological grid, universal trip data model, and full idea organization. Reference for detailed feature rationale. |

### Key Decisions Made

- **One app, two sections** (Trip Planner + Gear Closet) -- could separate later
- **Primary user:** The Adventure Leader (one person, two modes -- trip planning + gear management)
- **Secondary user:** The Participant (views trip via shareable link, no account required)
- **Product personality:** "Intentional and planned, but fun and loose and ready to dive into"
- **USA domestic only** for v1
- **Product boundary:** Trips where people plan and live together (not day hikes)
- **Not:** a social network, route planner, messaging app, or booking tool

### v1 Scope

**Trip Planning Core:**
- Trip Overview (dates, route, map link, description)
- Crew Roster (invite via shareable link, confirmations)
- Itinerary (day-by-day plan)
- Meal Plan (meals by day, who's cooking, grocery list)
- Shareable Trip Page (one link, no login to view, progressive disclosure)
- Basic Gear/Packing List (per-trip checklist, who's bringing what)

**Stress Reduction Layer:**
- Gear Closet (persistent personal inventory, condition tracking, wishlists)
- Cost Ledger (log expenses + receipts, auto-calculate settlement)
- Readiness Dashboard (per-person status, leader sees all)
- Configurable Reminders (time-sequenced, leader-only or crew-wide)
- Task Board (assign responsibilities, section delegation)

### v2 Scope (Future)
- Post-trip brain dump (voice-to-text → structured data)
- Trip templates / cloning
- Pre-trip PDF generation
- Resource Library
- Participant profiles (dietary, medical, carried across trips)

### Universal Trip Data Model

```
TRIP = {
  overview:     { dates, route, description, type, map_link }
  crew:         [ { person, role, readiness, bring_list, expenses } ]
  itinerary:    [ { day, plan, location, notes } ]
  meals:        [ { day, meal, menu, cook, grocery_list } ]
  tasks:        [ { task, owner, status } ]
  resources:    [ { name, link_or_file, type } ]
  reminders:    [ { trigger_time, audience, message } ]
  costs:        [ { item, amount, paid_by, split_among, receipt } ]
  emergency:    { contacts, hospitals, evacuation_notes }
  post_trip:    { brain_dump, gear_notes, location_intel, learnings }
  gear_closet:  → optional link to persistent inventory
}
```

## Recommended Next Steps

1. **Create PRD** -- Detailed product requirements, user stories, acceptance criteria (`bmad-bmm-create-prd`)
2. **Create UX Design** -- Trip page design, progressive disclosure UX, gear closet UI (`bmad-bmm-create-ux-design`)
3. **Create Architecture** -- Tech stack, data model, auth, shareable link infrastructure (`bmad-bmm-create-architecture`)
4. **Build** -- Expand from the existing `RaftGearManifest.jsx` prototype

## Design Principles

- Shareable trip in under 5 minutes or it fails
- View trip pages without an account
- Trip planning, not project management -- feels like planning a fun thing
- The app provides structure; the leader provides knowledge
- One app until complexity justifies separation

## Key Differentiators

1. **Confidence Engine** -- Makes the invisible visible
2. **Gear-to-Adventure Pipeline** -- Connects what you own to what's possible
3. **Progressive Disclosure** -- One link serves minimal and deep-dive participants
4. **Knowledge That Compounds** -- Past trips become templates; intelligence earned through use
