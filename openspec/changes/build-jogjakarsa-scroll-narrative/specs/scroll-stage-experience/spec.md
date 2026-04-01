# Scroll Stage Experience Spec

## ADDED Requirements

### Requirement: Ordered six-scene journey

The homepage SHALL present a single narrative journey composed of six ordered scenes named Welcoming, Destination, History, Culture, Culinary, and Technology.

#### Scenario: User starts the journey

- **WHEN** a user opens the homepage
- **THEN** the experience begins in the Welcoming scene
- **THEN** the later scenes are not yet active

#### Scenario: User completes the journey

- **WHEN** a user continues scrolling through the full experience
- **THEN** the scenes are presented in the declared order
- **THEN** the Technology scene is the final narrative state

### Requirement: Scroll-controlled stage progression

The system SHALL treat the viewport as a fixed stage and map scroll depth to scene progression instead of relying on a conventional document flow where each section simply scrolls past the viewport.

#### Scenario: User advances within a scene

- **WHEN** a user scrolls while a scene is active
- **THEN** the active scene remains staged while its configured motion progresses
- **THEN** the next scene does not become active until the transition threshold is reached

#### Scenario: User reverses direction

- **WHEN** a user scrolls backward across a completed scene boundary
- **THEN** the prior scene becomes active again
- **THEN** the experience restores the prior scene's staged state without a page reload

### Requirement: Layered visual depth

Each scene SHALL support layered visual motion so foreground, midground, background, and atmospheric elements can move at different rates to create depth.

#### Scenario: Welcome scene parallax

- **WHEN** the Welcoming scene is progressing
- **THEN** the foreground Karaton gate and the background Mount Merapi can animate at different rates
- **THEN** the scene preserves the perception of depth rather than moving all layers uniformly

### Requirement: Continuous scene transitions

The journey SHALL transition between scenes without full page reloads or abrupt visual discontinuities unless a sharp cut is intentionally defined as part of the narrative.

#### Scenario: Transition between scenes

- **WHEN** a user crosses from one scene into the next
- **THEN** the next scene is introduced through a defined transition state
- **THEN** the browser does not navigate to a separate page to continue the story
