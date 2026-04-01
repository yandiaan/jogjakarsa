## 1. Runtime foundation

- [ ] 1.1 Add Astro React integration and install the frontend dependencies needed for the interactive runtime, including React, React DOM, GSAP, and ScrollTrigger support.
- [ ] 1.2 Replace the starter homepage and layout shell with a homepage experience frame that can host the fixed-stage narrative, global UI, and client-side runtime.
- [ ] 1.3 Define the shared scene registry and cue data model for scene order, visual layers, Awan states, narration text, and audio transitions.

## 2. Scroll-stage experience

- [ ] 2.1 Build the client-side experience controller that tracks active scene, scroll progress, and forward/backward scene transitions.
- [ ] 2.2 Create the six scene components for Welcoming, Destination, History, Culture, Culinary, and Technology using placeholder-safe content and layer structure.
- [ ] 2.3 Implement scene-local GSAP ScrollTrigger timelines so each scene can pin, scrub, and hand off to the next scene without a page reload.
- [ ] 2.4 Add layered parallax and defined transition choreography for the core scene beats, including the Karaton gate and Mount Merapi welcome composition.

## 3. Awan guide orchestration

- [ ] 3.1 Build the persistent Awan guide layer with configurable visual state, placement, and text presentation.
- [ ] 3.2 Connect scene registry cues to Awan so each scene can trigger guide copy, transition prompts, and state changes.
- [ ] 3.3 Validate that Awan guidance remains non-blocking and does not freeze scene progression during normal scrolling.

## 4. Immersive media behavior

- [ ] 4.1 Implement the explicit media activation flow and shared controls for starting, muting, pausing, and resuming narration and background music.
- [ ] 4.2 Add synchronized caption rendering driven by the same cue metadata used for narration playback.
- [ ] 4.3 Implement scene-aware audio handoff logic so narration and music transitions do not overlap in conflicting ways.

## 5. Adaptive experience and validation

- [ ] 5.1 Add reduced-motion behavior that preserves the six-scene narrative while minimizing high-motion effects.
- [ ] 5.2 Add a simplified responsive presentation for constrained devices while preserving scene order, guidance, and media controls.
- [ ] 5.3 Test the experience across desktop and mobile breakpoints, then tune asset loading and animation complexity to keep the runtime stable.