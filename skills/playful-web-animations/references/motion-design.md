# Motion Design and Opportunity Selection

Use this reference to decide what should move, why it should move, and how much motion an interface can support.

## Opportunity Map

When auditing an existing interface, examine these moments in order:

1. **State feedback:** pressed, selected, saved, copied, loading, success, error, and disabled states.
2. **Continuity:** disclosure, menu, popover, dialog, drawer, tab, route, and list changes.
3. **Spatial explanation:** where an object came from, where it went, or how two views relate.
4. **Attention:** validation, newly available actions, important changes, and calls to action.
5. **Delight:** milestones, empty states, onboarding, brand moments, and small discoveries.

Start with gaps in feedback or continuity. Add delight after the interaction already feels clear and responsive.

For each candidate, record:

- trigger and affected element;
- category and intended user benefit;
- frequency and prominence;
- proposed motion and reduced-motion equivalent;
- implementation risk, including layout, interruption, and accessibility.

Prioritize high-benefit, low-distraction, reusable patterns. A small batch should normally share timing and movement language. Do not interpret “sprinkle” as a quota; a screen may need one improvement or none.

## Category Guidance

### Tangible

Use motion to connect cause and effect: a button depresses, a drawer follows its edge, an item moves toward its destination, or a control settles after release. Favor immediate response followed by a short settling phase. Avoid realism that makes the interface feel heavy or slow.

### Informative

Use motion when change over time is the concept: a process, transformation, comparison, or spatial relationship. Give users controls when the sequence is substantial. Ensure labels, static states, text, diagrams, or step controls communicate the same information without animation.

### Attention-Focusing

Use contrast in motion to establish a focal point. Prefer a single local cue triggered by a meaningful event. Avoid repeated pulsing, automatic loops, and simultaneous cues. Once the user has noticed or acted, stop asking for attention.

### Joyful

Attach delight to a meaningful event rather than arbitrary elapsed time. Good candidates include completion, discovery, progress, and playful direct manipulation. Keep essential actions available immediately; delight must not become a toll users pay repeatedly.

## Playfulness Without Clutter

Playfulness comes from an apt, slightly unexpected response—not necessarily from more movement. Consider:

- a tiny overshoot when an object settles;
- a contextual transform origin;
- secondary motion that follows a primary object;
- a brief stagger that reveals structure;
- a playful shape, icon, or color response at a meaningful moment;
- a rare celebratory flourish scaled to the achievement.

Keep the primary action legible. Secondary elements should move less, later, or both. If several elements compete, remove motion before reducing every animation into an indistinct compromise.

## Motion Vocabulary

Infer values from the product rather than imposing universal numbers. Establish a compact vocabulary:

- **quiet:** frequent feedback and hover/focus refinement;
- **standard:** disclosures, menus, and local state changes;
- **expressive:** rare onboarding, celebration, or brand moments;
- **enter and exit:** may use different easing and duration because appearance and disappearance have different perceptual jobs;
- **distance:** scale movement to the element and the spatial story, not the viewport by default;
- **stagger:** communicate order or grouping; keep total sequence time bounded.

Use springs when settling, direct manipulation, or interruption benefits from continuous velocity. Use duration-based easing when synchronization and a predictable endpoint matter more.
