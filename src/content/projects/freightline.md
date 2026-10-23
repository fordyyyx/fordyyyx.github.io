---
title: Freightline
summary: A logistics tycoon game on a real-world map. Grow a local delivery firm into a global distribution network.
status: In progress
statusNote: Early development
order: 2
tech: [TypeScript, React, Vite, Vitest, Leaflet, SPARQL (Wikidata), GitHub Actions]
role: Solo project. I'm the product owner and developer, with Claude (AI) as a pair programmer.
repo: https://github.com/fordyyyx/freightline
demo: https://fordyyyx.github.io/freightline/
image: ../../assets/projects/FreightlineScreenshot-cropped.png
imageAlt: Freightline's map view, an early build showing the outline of South West England on a Leaflet map.
---

## Why I built it

I play Euro Truck Simulator 2 and I like idle games, and Freightline sits
somewhere in between. It's deliberately not an idle game: it's a
resource-management game where your decisions matter, rather than one that
plays itself. Think of the business side of a haulage company, without the
driving.

## How it's built

The map is drawn with Leaflet, and real place data comes from Wikidata,
queried with SPARQL. The game is written in TypeScript with React, built
with Vite and tested with Vitest. GitHub Actions runs the checks and deploys
each new version to GitHub Pages.

I design and develop the game myself, and use Claude as a pair programmer:
it reviews my code, suggests improvements, and sometimes writes code when I'm
working in a language or library I'm less familiar with.

## How I'm running it

I plan the work in agile sprints, acting as both product owner and
developer. The first playable release is due in December 2026.

## What's been hard

Getting to grips with TypeScript and React components, especially passing
data between components with props. It's getting much easier now that I'm
doing it in the context of a real game.
