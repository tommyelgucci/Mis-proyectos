# BrainBit — Expansion Roadmap

## Goal
Expand BrainBit without removing existing categories, generators, progress, AI tutor, AI sprint, or SnapDeploy/Groq integration.

## New learning layers

### 1. Exam simulation
- Timed mixed sessions.
- Configurable category mix.
- Difficulty ramp based on recent accuracy.
- End-of-session review with explanations.
- Store attempts separately so historical progress remains intact.

### 2. Adaptive practice
- Prioritize weak exercise types.
- Use minimum-attempt thresholds before classifying a weakness.
- Mix review items with new items to avoid repetitive drilling.

### 3. Lesson cards
For each category/type:
- concept summary;
- worked example;
- common mistake;
- short practice set;
- link into the existing generator.

### 4. Error notebook
Persist mistakes as reviewable items containing:
- exercise type;
- question snapshot;
- selected answer;
- correct answer;
- explanation;
- timestamp;
- review status.

### 5. Daily challenge
A deterministic local challenge seeded by the calendar date, with a small mixed set and streak tracking. It must work without authentication and sync when the user signs in.

## Implementation rules
1. Additive only: do not delete existing engines or HTML apps.
2. Reuse the Exercise contract and existing verifiers.
3. Never trust AI-generated answers without verification when a deterministic verifier exists.
4. Keep secrets in backend environment variables; never expose GROQ_API_KEY to Vite.
5. Keep SnapDeploy compatibility through the existing Docker/Node architecture.
6. Every new learning feature gets deterministic tests or verification scripts.

## Suggested order
1. Error notebook + storage schema.
2. Adaptive practice selector.
3. Exam simulation using mixedSprint and existing engines.
4. Lesson cards and worked examples.
5. Daily challenge and streaks.
6. Progress dashboard extensions.

This roadmap intentionally preserves the current BrainBit architecture and treats existing features as the base layer.