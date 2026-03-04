---
stepsCompleted: [1, 2, 3, 4, 5, 6]
workflow_completed: true
inputDocuments: ['_bmad-output/brainstorming/brainstorming-session-20260303-125302.md', 'RaftGearManifest.jsx']
date: 2026-03-03
author: D
---

# Product Brief: Rafting-Checklist

## Executive Summary

A trip planning and gear management app for outdoor adventurers -- built by a trip leader who needed it. Two sections, one app: a Trip Planner that turns group logistics into a shareable link, and a Gear Closet that tracks what you own and shows you how ready you are for the next adventure. The real competitor isn't other apps -- it's winging it and hoping for the best. Mission: adventure is closer than you thought.

---

## Core Vision

### Problem Statement

Leading a group outdoor trip means carrying every detail in your head with no way to verify any of it. The person who planned the trip can never enjoy it.

### Problem Impact

- Trip leaders burn out and stop volunteering to lead
- Planning is scattered across group texts, spreadsheets, and memory
- Gear sits in garages with no visibility into condition or readiness
- Cost sharing is awkward and always falls on the leader
- Lessons from past trips are lost
- People don't realize how close they are to their next adventure

### Why Existing Solutions Fall Short

Nothing understands what a "trip" is: people + place + time + shared logistics. Current tools solve fragments. The real competitor is doing nothing -- defaulting to memory, scattered messages, and hoping it comes together.

### Proposed Solution

One app, two sections. **Trip Planner**: create a trip, build the itinerary, invite crew, plan meals, assign tasks, track costs -- share it all with one link. **Gear Closet**: track what you own, flag what needs maintenance, build wishlists -- see how ready you are for the next adventure. They connect when you want them to.

### Design Principles

- Shareable trip in under 5 minutes or it fails
- View trip pages without an account
- Trip planning, not project management -- feels like planning a fun thing
- The app provides structure; the leader provides knowledge
- One app until complexity justifies separation

### Key Differentiators

1. **Confidence Engine** -- Makes the invisible visible. See that things are on track instead of hoping they are.
2. **Gear-to-Adventure Pipeline** -- Connects what you own to what's possible.
3. **Progressive Disclosure** -- One link serves both the minimal and deep-dive participant.
4. **Knowledge That Compounds** -- Past trips become templates. The gear closet builds over time. The intelligence is yours, earned through use.

### Product Personality

> "Intentional and planned, but fun and loose and ready to dive into."
> Built first as a personal tool. Designed for anyone who plans adventures.

---

## Target Users

### Primary User: The Adventure Leader

One person, two modes. Plans multi-day group trips (rafting, backcountry skiing, backpacking, car camping) and obsesses over gear. Sometimes they're in trip mode -- Deschutes next month, need to plan meals, confirm the shuttle, get the crew aligned. Sometimes they're in gear mode -- Sunday in the garage cataloging what they own, flagging what needs repair, researching what to buy next.

This person ranges from the experienced leader with a full quiver of gear running their fifth Deschutes trip, to the aspiring adventurer with a growing collection who's three items away from their first overnight ski tour. The app serves both ends because the mission is the same: adventure is closer than you thought.

**How they experience the problem today:**
- Every trip detail lives in their head with no external verification
- Planning is scattered across group texts, spreadsheets, and memory
- Gear sits in the garage with no visibility into condition or completeness
- They carry the full mental load and can't relax until they're sure everyone is taken care of
- Lessons from past trips are lost because there's no capture mechanism

**What success looks like:**
- Can see at a glance that the trip is on track -- green lights across the board
- Shares one link and the trip explains itself
- Gear closet shows them what they have, what they need, and how close they are to the next adventure
- Past trips become templates that make the next one faster
- Their shoulders drop. They enjoy the trip they planned.

### Secondary User: The Participant

Gets a link from the Adventure Leader. Opens it in their browser. Sees the trip plan. Some participants skim -- dates, location, what to bring, done. Others go deep -- itinerary, maps, meal plan, rapid videos, avy forecasts. Progressive disclosure handles both without separate personas.

No account required to view. Account optional if they want to contribute (claim a meal, mark what they're bringing, log expenses) or track their own gear.

**What success looks like:**
- Opens the link and immediately understands: where, when, what to bring
- Feels informed without being overwhelmed
- Can contribute if they want to, without obligation
- Sees that the leader has things handled -- and that's enough to feel ready

### User Journeys

**Adventure Leader -- First Trip**
New Trip → dates + route (2 min) → itinerary → meals → share link → see readiness dashboard ("Sarah confirmed, Jake hasn't opened it") → **Aha: first time seeing engagement instead of wondering** → post-trip brain dump → clone trip 6 months later, 80% done.

**Adventure Leader -- Gear Mode**
Gear Closet → catalog gear → tag condition → build wishlist → see "you're 4 items away from being ready for a backcountry ski trip" → **Aha: adventure is closer than you thought.**

**Participant -- Link Only**
Receive link → open in browser, no login → dates, route, what to bring → **Aha: "I just need rain gear and a sleeping bag. Everything else is handled."** → close page, feel ready.

### Design Filter

> Built for the experienced trip leader. Accessible and exciting to everyone else.

---

## Success Metrics

### User Success (Primary -- Does It Work for D?)

1. **Trip Adoption** -- The next real trip gets planned in the app instead of group texts and memory. If it doesn't replace the current process, it failed.
2. **Crew Engagement** -- Participants open the shared link and find what they need without asking the leader separately. Fewer "what should I bring?" texts = working.
3. **Night-Before Confidence** -- The leader can look at a dashboard and see status instead of running a mental checklist. The stress goes down, not up.
4. **Reuse Over Restart** -- Trip #2 takes meaningfully less effort than trip #1 because past trips inform future ones.
5. **Gear Closet Persistence** -- The gear closet gets updated after trips and before purchases. It becomes the source of truth for "what do I own?"

### Product Success (If It Grows)

- Other trip leaders find it useful without requiring a tutorial
- Participants voluntarily engage beyond the minimum (claim meals, log expenses, browse resources)
- The app gets used across different trip types, not just rafting
- Someone clones a trip template created by another leader

### The Only Metric That Matters

> Does it make the trip leader's process simpler? If yes, keep building. If no, fix it.

### Non-Goals

- User acquisition targets -- this isn't a growth-stage startup
- Revenue or monetization metrics -- premature until proven useful
- Feature count -- more features ≠ more value

---

## MVP Scope

### v1 -- "The Full Trip Leader Experience"

**Trip Planning Core:**
- Trip Overview (dates, route with named locations + map link, description)
- Crew Roster (invite via shareable link, see who's confirmed)
- Itinerary (day-by-day plan)
- Meal Plan (meals by day, who's cooking, grocery list)
- Shareable Trip Page (one link, no login to view, progressive disclosure)
- Basic Gear/Packing List (per-trip checklist, who's bringing what)

**Stress Reduction Layer:**
- Gear Closet (persistent personal inventory, condition tracking, wishlists)
- Cost Ledger (log expenses + receipts, auto-calculate settlement)
- Readiness Dashboard (per-person status, leader sees all at a glance)
- Configurable Reminders (time-sequenced, leader-only or crew-wide)
- Task Board (assign responsibilities, section delegation with visible status)

### Out of Scope -- v2

- Post-trip brain dump (voice-to-text → structured data → action items)
- Trip templates / cloning (past trips become reusable starting points)
- Pre-trip PDF generation (leader-curated downloadable packet)
- Resource Library (growing collection of maps, videos, guides across trips)
- Participant profiles (dietary, medical, experience -- carried across trips)

### MVP Success Gate

> Plan a real trip in the app. Share the link with real crew. Use it through the full lifecycle -- plan, prep, trip, settle costs. If the process was simpler than the old way, v1 worked.

### Future Vision

If this works for D, it works for other trip leaders. The v2 features (templates, brain dump, resource library, profiles) turn it from a single-trip tool into a compounding system where every trip makes the next one better. Eventually, trip templates could be shared between users, the resource library could become community-sourced, and the gear-to-adventure pipeline could suggest trips based on what you own. But none of that matters until v1 passes the gate.
