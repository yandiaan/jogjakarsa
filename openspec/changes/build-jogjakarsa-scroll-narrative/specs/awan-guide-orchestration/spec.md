## ADDED Requirements

### Requirement: Persistent guide availability
The experience SHALL keep Awan available as the guide character throughout the full six-scene journey.

#### Scenario: Guide persists across scenes
- **WHEN** a user moves from one scene to another
- **THEN** Awan remains part of the experience rather than disappearing permanently after the opening
- **THEN** the guide can reappear or reposition without breaking continuity

### Requirement: Scene-aware guide states
The system SHALL support scene-specific Awan states, including visual pose, placement, and guide script, while preserving one coherent character identity.

#### Scenario: Entering a new scene updates Awan
- **WHEN** the active scene changes from Destination to History
- **THEN** Awan can change visual state or placement to match the new scene
- **THEN** the guide still presents as the same character with continuous identity

### Requirement: Guided narrative cues
Each scene SHALL define at least one Awan cue that can provide guidance, framing, or transition language for that part of the journey.

#### Scenario: Scene introduces guidance
- **WHEN** a user enters the Culture scene
- **THEN** the system can present an Awan cue associated with Culture
- **THEN** the cue reflects that scene's narrative role rather than generic site-wide copy

### Requirement: Guidance remains available without blocking progress
The guide system SHALL support narrative guidance without forcing the user to wait for Awan to finish speaking before continuing through the experience.

#### Scenario: User scrolls during guide narration
- **WHEN** Awan is presenting a cue and the user continues interacting with the journey
- **THEN** the scene progression remains responsive
- **THEN** the guidance layer does not lock the scroll narrative in place unless a pause is intentionally configured