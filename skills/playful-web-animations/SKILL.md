---
name: playful-web-animations
description: Design, implement, and audit purposeful web animation for UI interactions, explainers, attention cues, and moments of delight. Use when adding motion to an existing interface, building a UI that should account for motion from the start, or reviewing a project for tasteful animation opportunities. Do not use for video, character animation, or decorative motion unrelated to interface behavior.
---

# Playful Web Animations

Create motion that makes an interface clearer, more tangible, and more memorable without making it busy. Treat animation as part of interaction design rather than decoration applied everywhere.

## Start With Purpose

Before implementing motion, state what the animation accomplishes and classify it as one or more of:

- **Tangible:** makes an interaction feel physical, responsive, or spatially coherent.
- **Informative:** teaches or demonstrates something through motion. Provide an equivalent non-animated way to understand it.
- **Attention-focusing:** directs attention, emphasizes feedback, or supports a call to action. Use sparingly because repeated cues become distracting.
- **Joyful:** adds emotion, personality, brand character, or a memorable surprise.

If no category fits, omit the animation. An animation may serve multiple categories, but each claimed purpose must be visible in the result.

Read [references/motion-design.md](references/motion-design.md) when choosing what to animate, auditing an existing interface, or deciding how much playfulness is appropriate.

## Choose the Operating Mode

### Implement a Requested Animation

Clarify the interaction states, direction of change, and purpose from context. Match the project's existing animation approach. Implement the smallest coherent motion system that covers normal use, rapid reversal, and reduced motion.

### Build a UI With Motion in Mind

Design state and component boundaries so enter, exit, feedback, and layout changes can animate cleanly. Identify motion opportunities while designing, but keep the static hierarchy, affordances, and feedback complete without animation.

### Sprinkle Motion Onto an Existing UI

Inspect the interface and existing conventions before editing. Produce a short opportunity map, then implement a restrained, coherent batch of the highest-value moments. Prefer recurring interaction primitives—buttons, disclosures, dialogs, navigation, state changes—over isolated flourishes. Preserve the product's visual language and business behavior.

Unless the user requests an audit only, a request to add or sprinkle animation authorizes implementing the selected in-scope improvements. Explain the selected opportunities briefly rather than stopping for approval when the choices are reversible and consistent with the existing design.

## Implementation Principles

- Preserve causality: motion should begin from the control, object, or location that caused the change.
- Preserve continuity: entering, exiting, and rearranging elements should maintain a believable spatial relationship.
- Make interactions interruptible. Rapid toggles or reversals should continue smoothly from the current visual state instead of restarting or snapping.
- Match energy to context. Frequent utility interactions should be quick and quiet; rare celebratory moments can be more expressive.
- Use a small shared motion vocabulary for durations, easing, springs, distances, and stagger rather than inventing values per component.
- Favor `transform` and `opacity` for frequent motion, but choose semantic correctness and visual continuity over blanket performance rules.
- Prefer the platform or the project's existing motion library. Do not add a dependency merely for a simple transition; do not replace an established animation stack without a concrete reason.
- Keep playful details near meaningful events. Avoid perpetual motion, competing focal points, large entrance cascades, and animation on every hover target.
- Respect input modality. Hover motion must not carry information unavailable to keyboard or touch users.
- Provide a useful `prefers-reduced-motion` experience. Remove non-essential movement and replace informative motion with an equivalent static or low-motion presentation.

Read [references/implementation-and-verification.md](references/implementation-and-verification.md) before implementing non-trivial choreography, enter/exit behavior, layout animation, or spring motion.

## Verify the Result

Exercise initial render, normal interaction, rapid repeated interaction, mid-animation reversal, keyboard use, touch-sized viewport, and reduced-motion mode. Check that motion does not cause layout shifts, obscure focus, block input, delay essential feedback, or leave stale inline styles and timers.

When browser automation is available, use it for behavior and reduced-motion checks. Treat screenshots as evidence of endpoints only; inspect the transition itself when animation quality matters.
