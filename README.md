# TypeScript Pomodoro Timer

A configurable Pomodoro timer built with vanilla HTML, CSS, and modern TypeScript, focusing on a clean separation of concerns and robust state management.

## Features

-   Switch between Pomodoro, Short Break, and Long Break modes.
-   Core timer controls: Start, Pause, and Reset.
-   The Reset button is context-aware, resetting the currently active mode.
-   Clear visual indication of the active timer mode and operational state.
-   Timer durations are fully configurable through a settings object.
-   Clean, modern, and responsive user interface.

## Architecture & Design Decisions

This project was built with a strong emphasis on a clean, decoupled architecture. The application logic is completely separated from the user interface, making the code more modular, reusable, and easier to maintain.

### The Engine vs. The Dashboard Model

-   **The Engine (`Timer.ts`):** A self-contained TypeScript class that is responsible for all time and state management. It has no knowledge of the HTML or the DOM. It is a pure, reusable "black box" that could be used in any JavaScript environment.

-   **The Dashboard (`app.ts`):** Acts as a controller or "bridge." It is responsible for listening to user events (button clicks), telling the Engine what to do, and updating the UI based on information it receives from the Engine.

### State Management: Mode vs. Status

A key architectural challenge was resolving a bug where the timer's state was being overwritten. The solution was to separate the two distinct types of state:

-   **`mode` (`TimerMode` enum):** Tracks the *type* of session (`Pomodoro`, `ShortBreak`, `LongBreak`). This state is long-lived and only changes when the user explicitly selects a new mode.
-   **`status` (`TimerStatus` enum):** Tracks the *operational status* (`Running`, `Paused`, `Stopped`). This state is short-lived and changes frequently as the user interacts with the start/pause co
## Architecture & Design Decisions

This project was built with a strong emphasis on a clean, decoupled architecture. The application logic is completely separated from the user interface, making the code more modular, reusable, and easier to maintain.

### The Engine vs. The Dashboard Model

-   **The Engine (`Timer.ts`):** A self-contained TypeScript class that is responsible for all time and state management. It has no knowledge of the HTML or the DOM. It is a pure, reusable "black box" that could be used in any JavaScript environment.

-   **The Dashboard (`app.ts`):** Acts as a controller or "bridge." It is responsible for listening to user events (button clicks), telling the Engine what to do, and updating the UI based on information it receives from the Engine.

### State Management: Mode vs. Status

A key architectural challenge was resolving a bug where the timer's state was being overwritten. The solution was to separate the two distinct types of state:

-   **`mode` (`TimerMode` enum):** Tracks the *type* of session (`Pomodoro`, `ShortBreak`, `LongBreak`). This state is long-lived and only changes when the user explicitly selects a new mode.
-   **`status` (`TimerStatus` enum):** Tracks the *operational status* (`Running`, `Paused`, `Stopped`). This state is short-lived and changes frequently as the user interacts with the start/pause controls.

This separation fixed the bug where the `reset()` function would "forget" which mode it was in, making the application's state management robust and predictable.

### Communication via Callbacks

Communication from the Engine back to the Dashboard is handled via callbacks (`onTick` and `onFinish`). This allows the Engine to announce important events ("a second has passed," "the timer is finished") without needing any knowledge of the UI, keeping it fully decoupled.
ntrols.

This separation fixed the bug where the `reset()` function would "forget" which mode it was in, making the application's state management robust and predictable.

### Communication via Callbacks

Communication from the Engine back to the Dashboard is handled via callbacks (`onTick` and `onFinish`). This allows the Engine to announce important events ("a second has passed," "the timer is finished") without needing any knowledge of the UI, keeping it fully decoupled.

### Configuration

The `Timer` class is not hardcoded. It receives a configuration object that conforms to the `TimerSettings` interface in its constructor. This makes the timer durations flexible and easy to change without altering the core class logic.
