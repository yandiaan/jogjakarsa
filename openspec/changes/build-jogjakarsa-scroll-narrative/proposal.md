# Proposal

## Why

Jogjakarsa needs to present Yogyakarta as an interactive story rather than a conventional informational site. The current Astro starter does not provide a narrative structure, guide character system, or scroll choreography capable of delivering a cinematic six-scene journey with synchronized visuals and audio.

## What Changes

- Replace the starter homepage with a scene-based scroll experience that treats the viewport as a fixed stage and advances the story through scroll depth.
- Introduce six narrative scenes covering welcome, destination, history, culture, culinary, and technology, with smooth visual transitions between them.
- Add Awan as a persistent guide character that appears across scenes, delivers contextual guidance, and anchors the tone of the experience.
- Add synchronized immersive media behavior for voiceover, background music, captions, and scene-aware playback controls.
- Add responsive and reduced-motion behavior so the experience remains usable on mobile devices and for users who cannot or do not want to consume a highly animated version.

## Capabilities

### New Capabilities

- `scroll-stage-experience`: A fixed-viewport, scroll-driven narrative experience that advances through six cinematic scenes with orchestrated transitions and parallax depth.
- `awan-guide-orchestration`: A guide-character layer that keeps Awan present across the journey with scene-aware narration, visual states, and transition cues.
- `immersive-media-experience`: Audio, captioning, playback controls, and motion-adaptive behavior that support the narrative without sacrificing usability or performance.

### Modified Capabilities

- None.

## Impact

- Affected code will include the homepage route, layout shell, new scene components, shared client-side orchestration, and content configuration.
- New frontend dependencies are expected for React integration and GSAP with ScrollTrigger.
- The change introduces coordinated animation, audio, accessibility, and asset-loading concerns that must be managed as a single narrative system rather than isolated page sections.
