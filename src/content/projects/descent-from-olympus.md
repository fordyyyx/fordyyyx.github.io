---
title: Descent from Olympus
summary: A text-based dungeon crawler played in the terminal, built in Python to sharpen my object-oriented programming.
status: In progress
statusNote: Playable
order: 2
tech: [Python, pytest]
role: Solo project. I designed the game and its class structure; AI wrote much of the implementation, all of the tests and the documentation, with me reviewing and directing.
repo: https://github.com/fordyyyx/python-dungeon-crawler-project
image: ../../assets/projects/DescentScreenshot.jpg
imageAlt: A fight in the terminal. Will and the Shade of Achilles defeat the Shade of Hector, which drops Hector's Helm, then gold and experience are awarded.
---

## About the game

The player explores a dungeon by typing commands into the terminal. It's
playable end to end: clone the repo and follow the instructions in the
README.

## Why I built it

To refresh my object-oriented programming in Python before starting
university, by building something fun.

## How it's built

Plain Python, structured around classes for the game's systems. It's tested
with pytest, using monkeypatch to simulate the player's typed input.

I led the design and the class structure. AI wrote much of the
implementation, all of the tests and the documentation, with me reviewing
and directing the work.

## What was hard

Adding new systems late in development. New features often meant adding
attributes to existing classes just to make new checks work. It taught me
how much easier a project is to extend when the design plans for that from
the start.
