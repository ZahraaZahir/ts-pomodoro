# TypeScript Pomodoro Timer

A configurable Pomodoro timer built with HTML, CSS, and modern TypeScript, focusing on clean separation of concerns and state management.

## Features

-   Switch between Pomodoro, Short Break, and Long Break modes.
-   Timer controls: Start, Pause, and Reset.
-   The Reset button is context-aware, resetting the currently active mode.
-   Clear visual indication of the active timer mode and operational state.
-   Timer durations are fully configurable through a settings object.
-   Clean, modern, and responsive user interface.

## State Management: Mode vs. Status

A key architectural challenge was resolving a bug where the timer's state was being overwritten. The solution was to separate the two distinct types of state:

-   **`mode` (`TimerMode` enum):** Tracks the *type* of session (`Pomodoro`, `ShortBreak`, `LongBreak`). This state is long-lived and only changes when the user explicitly selects a new mode.
-   **`status` (`TimerStatus` enum):** Tracks the *operational status* (`Running`, `Paused`, `Stopped`). This state is short-lived and changes frequently as the user interacts with the start/pause cotrols.
