# Design

## Context

The current repository is an Astro starter with a single static page and no client-side runtime for animation, audio, or scene orchestration. The proposed experience replaces a conventional page flow with a fixed-stage scroll narrative composed of six scenes: Welcoming, Destination, History, Culture, Culinary, and Technology.

The project is being built by a two-person team, which makes maintainability a hard constraint. The implementation must support a cinematic presentation without collapsing into one monolithic animation file that is difficult to adjust. The design also needs to respect browser audio restrictions, mobile performance limits, and accessibility requirements such as reduced motion and visible narration text.

## Goals / Non-Goals

**Goals:**

- Create a scene-driven homepage architecture that maps scroll depth to a six-scene narrative journey.
- Keep the interactive runtime maintainable by separating scene content, scene orchestration, Awan guide behavior, and media control logic.
- Use Astro as the delivery shell while introducing a client-side runtime suitable for GSAP and scene state management.
- Support synchronized narration, music, captions, and motion-adaptive behavior without making the site unusable on mobile or reduced-motion contexts.

**Non-Goals:**

- Building a general-purpose page builder or reusable CMS for arbitrary stories.
- Supporting all possible animation techniques, including custom WebGL pipelines, in the first iteration.
- Creating a fully game-like interaction model beyond scrolling, media controls, and lightweight scene navigation.
- Solving multilingual narration, analytics strategy, or non-homepage content architecture in this change.

## Decisions

### 1. Use Astro as the document shell and a single React client island for the interactive runtime

The site will keep Astro for the document shell, route delivery, metadata, and baseline markup. A single React-powered runtime will manage shared client-side state such as active scene, progress, Awan state, and audio controls.

This is preferred over a full React single-page app because Astro keeps the outer shell simple and efficient. It is preferred over a pure Astro implementation because the runtime requires coordinated client-side state and lifecycle control across scenes.

Alternatives considered:

- Pure Astro with scattered scripts: rejected because scene coordination, audio state, and cross-scene transitions would become fragmented.
- Full React app: rejected because the project does not need SPA-style routing or a heavier client footprint for the entire document.

### 2. Model the experience as a scene registry instead of a single hard-coded page timeline

Each scene will be represented by structured configuration that defines copy, visual layers, transition hooks, Awan cues, and audio cues. Scene rendering can still use custom components, but the runtime will advance through an ordered registry instead of relying on one giant page-level script.

This preserves flexibility for a small team because most narrative edits stay localized to scene definitions rather than requiring a full re-read of one long file.

Alternatives considered:

- One large homepage component with inlined animation logic: rejected because it scales poorly as scenes grow.
- CMS-driven scene authoring: rejected for the first phase because it introduces overhead without solving the core orchestration problem.

### 3. Use GSAP with ScrollTrigger, but keep timelines scene-local and coordinate them through a global controller

GSAP with ScrollTrigger is the right animation foundation because the experience depends on pinned scenes, scroll scrubbing, and layered parallax. The runtime will use one global controller to determine which scene is active, but each scene will own its own GSAP timeline and lifecycle.

This avoids the brittleness of one master timeline that spans the entire journey. Scene-local timelines are easier to debug, tune, and disable for fallback modes.

Alternatives considered:

- Framer Motion: rejected because the required pinning and scroll-depth choreography are a better match for GSAP.
- One master GSAP timeline: rejected because it becomes difficult to maintain and isolate regressions.

### 4. Treat Awan as a persistent guide layer with scene-aware states

Awan will be managed as a guide system that persists across the full experience rather than as a separate asset embedded independently inside each scene. The guide layer will expose scene-aware states such as pose, placement, narration text, and transition prompts.

This keeps the character consistent and allows scenes to request guide behavior without re-implementing Awan logic multiple times.

Alternatives considered:

- Embedding a separate Awan instance per scene: rejected because it duplicates logic and makes continuity harder to preserve.
- Using only ambient narration with no persistent guide presence: rejected because the guide character is part of the core concept.

### 5. Gate media playback behind explicit user control and synchronize voiceover through cue metadata

Voiceover and background music will not assume autoplay. The experience will present an explicit user-controlled media entry point, and scene scripts will define cue metadata for narration text, timing, and music transitions.

This is necessary for browser compliance and gives users predictable control over audio-heavy storytelling.

Alternatives considered:

- Automatic playback on page load: rejected because browser policies and user expectations make it unreliable.
- Independent manual audio files with no cue system: rejected because captions and transitions would drift out of sync.

### 6. Ship multiple presentation modes instead of forcing one cinematic mode everywhere

The homepage will support a primary cinematic mode for capable environments, a reduced-motion mode for users with motion sensitivity, and a simplified responsive mode for smaller or weaker devices.

This is preferred over forcing identical choreography everywhere because the concept depends on preserving clarity and control, not reproducing every effect at all costs.

Alternatives considered:

- One full-motion experience for all users: rejected because it increases performance risk and accessibility failures.
- One fully static fallback only: rejected because it throws away too much of the concept on mobile.

## Risks / Trade-offs

- [Large media payloads] -> Mitigation: use scene-based asset loading, compressed imagery/audio, and simplified mobile variants.
- [Timeline drift between visuals, captions, and voiceover] -> Mitigation: drive media behavior from shared cue metadata rather than manual per-feature timing.
- [Monolithic animation code] -> Mitigation: isolate timelines per scene and keep orchestration concerns separate from scene content.
- [Mobile pinning and parallax instability] -> Mitigation: define a simplified responsive mode with fewer pinned layers and shorter timelines.
- [Awan becoming visually repetitive] -> Mitigation: define distinct guide states, scene-specific placement, and cadence rules in content configuration.
- [Accessibility regressions] -> Mitigation: make captions, mute/pause controls, and reduced-motion behavior part of the baseline design rather than polish work.

## Migration Plan

1. Add the required frontend dependencies and Astro integration for the interactive runtime.
2. Replace the starter homepage with an experience shell that can host scene orchestration, guide UI, and media controls.
3. Introduce a scene registry and implement six scene components with placeholder-safe assets and copy.
4. Integrate GSAP ScrollTrigger timelines scene by scene, validating desktop and mobile behavior as each scene lands.
5. Add Awan orchestration, captions, and audio control flows after the visual scene progression is stable.
6. Validate reduced-motion and responsive modes before release.

Rollback strategy: keep a static narrative fallback branch or simplified homepage version available so the team can temporarily disable the cinematic runtime if performance or media synchronization proves unstable.

## Open Questions

- How much of the full pinned-stage choreography should remain on mobile before switching to the simplified mode?
- Will Awan be delivered primarily through sprite sheets, layered image states, or a hybrid approach for different scenes?
- Does the first release require bilingual narration and captions, or only one language?
- Which scenes need dedicated music themes versus one continuous score with transitional accents?
