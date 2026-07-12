# CLAUDE.md

# Sahm Smart Restaurant POS Dashboard

## Project Overview

This project is a technical assignment for **Sahm Food**.

The goal is to build a production-quality Angular application that demonstrates scalable frontend architecture, maintainability, performance, and engineering best practices — not a complete POS system.

"Production-ready" refers to architecture, robustness, and error handling (loading/error/retry states, accessibility, typing) — not exhaustive feature completeness or visual polish. This is explicitly **not** a UI/UX challenge; engineering quality outranks visual design.

The application simulates a **Smart Restaurant POS Dashboard** used by:

- Cashiers
- Branch Managers
- Kitchen Staff
- Customer Support

The dashboard receives continuous live updates and combines traditional POS functionality with AI-powered recommendations.

---

# Project Goals

Demonstrate:

- Clean, feature-based architecture
- Scalable state management
- High performance
- Reusable components
- Strong TypeScript practices
- Reactive programming with RxJS + Angular Signals
- Testing
- Accessibility

---

# Tech Stack

**Framework:** Angular 21, Standalone Components

**State:** Angular Signals, Computed Signals, RxJS

**UI:** PrimeNG, Tailwind CSS v4, SCSS

**Backend:** Mock services, fake REST APIs, RxJS timers, fake WebSocket simulation

**Testing:** Jasmine, Karma

---

# Project Architecture

**Style:** Feature-first. Organize around business domains, not technical layers.

Each feature owns its own components, state, data access, models, and utilities.

```
src/app
  core/       — global infrastructure only
  shared/     — shared functionality only
  layout/
  features/
    orders/       (includes AI Assistant — it only exists in the context of an order)
    kitchen/
    search/
```

**Core vs Shared — concrete boundary:**

| Core | Shared |
|---|---|
| HTTP interceptors | Dumb/presentational reusable components |
| Route guards | Reusable pipes |
| Singleton services (auth, config, app-wide error handler) | Reusable directives |
| App-wide providers, tokens | Generic utility functions with no domain knowledge |

Rule of thumb: if it's a singleton that runs once for the whole app, it's Core. If it's reused UI/logic with no opinion about which feature calls it, it's Shared. If it knows about "orders" or "kitchen," it belongs in that feature — not Shared.

---

# Styling: PrimeNG vs Tailwind vs SCSS

To avoid three competing styling systems, divide responsibilities:

- **PrimeNG** — complex interactive components (tables, dropdowns, dialogs, forms) and their theming.
- **Tailwind** — layout, spacing, typography utilities, and one-off style tweaks.
- **SCSS** — only for things neither can do (complex animations, deep PrimeNG theme overrides). Avoid SCSS for anything Tailwind can express as utility classes.

**Tailwind v4 note:** v4 uses CSS-first config (`@theme` in a CSS file), not `tailwind.config.js`. Do not generate a JS config file unless the project explicitly uses one.

---

# Core Principles

Prefer: readability, maintainability, composition over duplication, feature isolation, strong typing, small reusable components, predictable state.

Avoid: large components/services, god objects, business logic in templates or components, `any`, deep nesting, duplicated logic, magic strings/numbers.

(These apply everywhere — component rules and coding standards below are the same principles applied to specific layers, not a separate list.)

---

# State Management Rules

- **Signals** — application state, UI state, computed state.
- **RxJS** — HTTP requests, polling, fake WebSocket, debouncing, retry strategies, request cancellation, streaming, async workflows.

Never use RxJS as application state. Never duplicate state. Keep stores small and feature-specific.

---

# Component Rules

Components: standalone, small, reusable, presentation-focused.

Components must NOT contain HTTP requests, business rules, or complex transformations — that logic belongs in stores or dedicated services.

---

# Performance Rules

Prefer: Signals, computed signals, `OnPush` change detection, `trackBy`, lazy loading where appropriate.

Prevent: unnecessary rendering, duplicate HTTP requests, memory leaks.

---

# Coding Standards

- Strict typing everywhere; no `any`
- `readonly` where appropriate
- Private fields when possible
- Short functions, focused components
- Composition over duplication
- Follow the Angular Style Guide
- Standalone components by default
- `inject()` for dependency injection
- `@if` / `@for` / `@switch` control-flow syntax
- `input()` / `output()` APIs
- Modern Angular APIs only

**File/naming conventions:**
- kebab-case for file and folder names
- No `.component` type suffixes in filenames (current Angular convention) — confirm against existing repo files before generating new ones, and match whatever convention is already present.

---

# Error Handling

Every async operation supports: Loading, Success, Error, Retry.

Never silently swallow errors.

---

# Testing

Prefer unit tests over component/UI tests, given the project's engineering-over-UX focus.

Test: stores, business logic, search behavior, retry logic, offline queue, state transitions.

Mock the fake REST/WebSocket layer at the service boundary — don't test against the literal timer/fake-latency implementation.

No fixed coverage percentage is mandated; prioritize coverage of business logic and state transitions over presentational components.

---

# Accessibility

Always consider: keyboard navigation, proper ARIA labels, semantic HTML, focus management.

---

# AI Usage

When generating code:

- Follow Angular best practices and keep architecture consistent.
- Respect the existing folder structure.
- Do not introduce unnecessary libraries.
- Do not over-engineer solutions.
- Explain architectural decisions when they're non-obvious.
- Generate production-ready code only — no TODOs or placeholder implementations unless explicitly requested.

If multiple implementations are possible, choose the one with the best balance of readability, scalability, and maintainability.

---

# Success Criteria

Every contribution should improve one or more of: Scalability, Readability, Performance, Maintainability, Testability, Reusability.

Never sacrifice architecture for short-term convenience. 



## Functional Requirements

### 1. Orders Board

The system must display orders coming from multiple channels:

- Walk-in
- Delivery
- Online

Orders move through the following lifecycle:

Received
→ Preparing
→ Ready
→ Delivered
→ Completed

Order updates may arrive from:

- Automatic updates
- Polling
- Simulated WebSocket events

Requirements:

- UI updates without page refresh.
- Avoid unnecessary component re-rendering.
- Use reactive patterns (Signals + RxJS).
- Components should only re-render when relevant data changes.

---

### 2. AI Order Assistant

Each order includes an AI recommendation panel.

The assistant can provide:

- Upselling suggestions
- Allergy warnings
- Missing order information
- Delivery risks
- Kitchen overload warnings

AI responses are asynchronous and may:

- Take several seconds
- Fail
- Retry automatically
- Stream partial responses (simulation)

Requirements:

- Handle loading, success, error and retry states.
- Support streamed updates.
- Do not block the rest of the UI.
- Keep AI state isolated from order state.

---

### 3. Kitchen Load Monitor

Display the current kitchen workload.

Kitchen workload affects:

- Order priorities
- Delay indicators
- Recommendation engine

Requirements:

- Live workload updates.
- Automatic priority recalculation.
- UI reacts without page refresh.
- Use computed Signals where possible.

---

### 4. Advanced Product Search

Implement a high-performance search experience.

Features:

- Instant filtering
- Debouncing
- Keyboard navigation
- Category filters
- Recent searches
- Highlight matched text

Requirements:

- Efficient handling of large datasets.
- Avoid unnecessary filtering operations.
- Prefer computed Signals and RxJS operators.

---

### 5. Offline Support

The application should tolerate temporary connection loss.

Requirements:

- Queue optimistic actions.
- Restore pending operations after reconnect.
- Prevent duplicated requests.
- Recover gracefully after reconnection. 

---------------------------------------------------

## Architecture Expectations

- Feature-first architecture.
- Standalone Angular components.
- Angular Signals for application state.
- RxJS only for asynchronous streams.
- No NgRx.
- Smart/Dumb component separation.
- Facade pattern where appropriate.
- Strong TypeScript typing.
- OnPush change detection.
- Reusable UI components.
- Avoid duplicated logic.
- Use computed Signals instead of imperative state when possible.
- Keep business logic inside Stores/Facades, never inside Components.