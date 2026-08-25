# Implementation and Verification

Use this reference for non-trivial UI motion. Adapt to the project's framework and animation stack.

## Select the Mechanism

- **CSS transition:** binary or continuously changing state with a natural reversible path.
- **CSS keyframes:** a defined multi-stage sequence, decorative flourish, or loop.
- **Web Animations API:** runtime orchestration, playback control, or dynamic keyframes without an animation dependency.
- **Existing motion library:** presence management, gesture-driven motion, shared layout, springs, or established project conventions.

Do not introduce a new library until platform features and existing dependencies are insufficient for the required behavior.

## State and Interruption

Model semantic UI state separately from animation phase. Avoid timers as the source of truth for whether content exists or an action is complete.

For enter and exit motion:

- keep exiting content mounted until its visual exit completes when appropriate;
- prevent invisible content from remaining focusable or clickable;
- handle re-entry during exit without a flash or stale completion callback;
- restore focus according to the interaction pattern, independent of animation duration.

For rapid reversal, transition from the current rendered value. CSS transitions and spring systems often provide this naturally; imperative sequences need explicit cancellation or retargeting.

## Timing and Easing

Choose timing from frequency, distance, size, and consequence:

- frequent feedback should respond immediately;
- larger travel generally needs more time than a local opacity or scale change;
- exits can finish briskly once the destination is understood;
- stagger should reveal relationship without delaying access to the final item;
- overshoot belongs on suitable tangible or joyful motion, not every transition.

Avoid using `transition: all`; name the properties whose changes are intentional. This prevents accidental animation of layout, color, or state changes added later.

## Rendering and Layout

Prefer compositor-friendly properties for frequent or large motion, especially `transform` and `opacity`. When a layout property is necessary, measure the actual cost rather than rewriting a correct interaction around a slogan.

Watch for:

- layout reads interleaved with style writes;
- transforms that create unexpected containing blocks or stacking contexts;
- scale animations that distort borders, text, or shadows;
- animated height with unknown content;
- content jumping when an exiting element leaves layout;
- scroll-driven work tied directly to unthrottled events;
- long-running animations consuming resources offscreen.

## Reduced Motion

Reduced motion is not equivalent to removing all feedback. Under `prefers-reduced-motion: reduce`:

- remove large travel, parallax, spinning, zooming, and decorative loops;
- shorten or replace spatial transitions with subtle opacity or immediate state changes;
- preserve status, hierarchy, and cause-and-effect;
- provide static stages, labels, or controls for informative animation;
- avoid JavaScript motion that ignores the media query.

If the project exposes an in-app motion preference, honor it consistently with or in addition to the operating-system preference.

## Verification Matrix

Verify the cases relevant to the component:

| Case | Expected behavior |
| --- | --- |
| Initial render | No unintended entrance replay, flash, or hydration mismatch |
| Normal interaction | Clear cause and effect; essential feedback is immediate |
| Rapid repeat | No queued animation backlog or duplicated callbacks |
| Mid-motion reversal | Continues from the current visual state without snapping |
| Keyboard | Focus remains visible and follows the interaction pattern |
| Touch | No dependency on hover; gestures do not block scrolling unexpectedly |
| Reduced motion | Meaning and feedback remain without non-essential movement |
| Resize/content change | Endpoints remain correct; no stale measurements |
| Unmount/navigation | Animations, observers, listeners, and timers clean up |
| Performance | No sustained jank, avoidable layout shift, or input blocking |

Prefer testing observable states and cleanup over assertions about exact durations. Exact timing tests are brittle unless timing itself is a product requirement.
