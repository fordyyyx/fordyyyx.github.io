---
title: Descent from Olympus
summary: A Greek mythology dungeon crawler played in the terminal, with turn-based team combat, built in Python to sharpen my object-oriented programming.
status: In progress
statusNote: Playable
order: 2
tech: [Python, pytest, GitHub Actions]
role: Solo project. I designed the game and its class structure; AI wrote much of the implementation, all of the tests and the documentation, with me reviewing and directing.
repo: https://github.com/fordyyyx/python-dungeon-crawler-project
image: ../../assets/projects/DescentScreenshot.jpg
imageAlt: A fight in the terminal. Will and the Shade of Achilles defeat the Shade of Hector, which drops Hector's Helm, then gold and experience are awarded.
---

## About the game

A text-based dungeon crawler set in Greek mythology. The player types
commands into the terminal to explore, fight and loot. It features
turn-based team combat, spells, status effects, an inventory system and
recruitable AI-controlled companions.

Enemies use a utility-based AI: each turn, an enemy scores its possible
actions (attack, defend, brace or heal) and picks the best one for the
situation, so fights involving several characters play out tactically.

It's playable end to end: clone the repo and follow the instructions in the
README.

## Why I built it

To refresh my object-oriented programming in Python before starting
university, by building something fun.

## How it's built

Plain Python with an object-oriented class hierarchy, set up like a
professional codebase: a `src` layout with `pyproject.toml`, static type
checking, and a pytest suite (using monkeypatch to simulate the player's
typed input). GitHub Actions runs the tests on Python 3.10, 3.11 and 3.12 on
every push.

I led the design and the class structure. AI wrote much of the
implementation, all of the tests and the documentation, with me reviewing
and directing the work.

## What was hard

Adding new systems late in development. New features often meant adding
attributes to existing classes just to make new checks work. It taught me
how much easier a project is to extend when the design plans for that from
the start.
