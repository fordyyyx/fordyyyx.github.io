---
title: Strava Training Analysis
summary: SQL analysis of 228 of my own Strava activities from March 2023 to June 2026, across six sports.
status: In progress
statusNote: More analyses planned
order: 3
tech: [PostgreSQL, SQL, DBeaver]
role: Solo project.
repo: https://github.com/fordyyyx/strava-analysis-jun26
chart:
  title: Intensity score by sport (running = 100)
  bars:
    - { label: Running, value: 100.0 }
    - { label: Squash, value: 92.9 }
    - { label: Football, value: 88.1 }
    - { label: Rowing, value: 85.2 }
    - { label: Cycling, value: 72.8 }
---

## The questions

- **Which sport is actually the most physically demanding?** Do team sports
  like football and squash rival dedicated cardio sessions for intensity?
- **Has my aerobic fitness improved over time?** For runs only: at the same
  level of effort, has my pace or distance improved year on year?

## How it's built

I exported my raw activity data from Strava and loaded it into a PostgreSQL
database, then wrote the analysis in SQL using DBeaver.

Raw heart rate and effort aren't directly comparable across sports with
different session lengths, so I normalised effort and calories per minute,
then built a composite intensity score: heart rate (40%), effort per minute
(40%) and calories per minute (20%).

## What I found

| Sport    | Sessions | Intensity score |
| -------- | -------: | --------------: |
| Running  |      124 |           100.0 |
| Squash   |        9 |            92.9 |
| Football |       13 |            88.1 |
| Rowing   |        7 |            85.2 |
| Cycling  |       60 |            72.8 |

Running is my highest-volume sport, but squash and football reach nearly the
same cardiovascular intensity per minute. Team sports turn out to be a very
efficient training stimulus. Indoor cycling scores noticeably lower, which
fits the steady-state effort of trainer sessions.

## What was hard

Getting the raw export into a clean, usable format. Once the data was right,
the analysis followed.
