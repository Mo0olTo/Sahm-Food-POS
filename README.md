# Smart Restaurant POS Dashboard

A modern Point of Sale (POS) dashboard built with **Angular 21** as part of the **Sahm Food Angular Engineer Technical Assessment**.

The application simulates a real restaurant environment where cashiers, kitchen staff, branch managers, and customer support teams can manage live orders, monitor kitchen workload, search products, receive AI recommendations, and continue working even when the network is unavailable.

---

# Tech Stack

- Angular 21
- TypeScript
- Angular Signals
- RxJS
- Tailwind CSS v4
- MockAPI
- Standalone Components

---

# Features

- Live Orders Workspace
- AI Order Assistant
- Kitchen Load Monitor
- Product Search
- Offline Support
- Optimistic Updates
- Automatic Retry
- Responsive Layout
- Error Handling
- Loading & Empty States

---

# Project Architecture

The application follows a **feature-based architecture** with clear separation of concerns.

```
                    User Interaction
                           │
                           ▼
                   Pages / Components
                           │
                           ▼
                       Facades
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
      Feature Stores                Data Services
       (Signals)                       (HTTP)
            │                             │
            └──────────────┬──────────────┘
                           ▼
                        MockAPI
```

## Architecture Layers

### Presentation Layer

Contains all UI-related code including:

- Pages
- Feature Components
- Shared Components
- Layout Components

The presentation layer is responsible only for rendering the UI and handling user interaction.

---

### Facade Layer

Each feature exposes a Facade that acts as the bridge between the UI and business logic.

Responsibilities include:

- Handling user actions
- Exposing Signals
- Calling services
- Coordinating feature logic

Components never communicate directly with the API.

---

### Store Layer

Each feature owns its own store built with Angular Signals.

Stores are responsible for:

- Holding state
- Updating state
- Computing derived values
- Providing reactive data

---

### Data Layer

The data layer is responsible for:

- HTTP requests
- API communication
- Mapping server responses
- Error handling

---

### Core Layer

The Core module contains application-wide functionality including:

- Offline support
- Network monitoring
- Global UI state
- Constants
- Shared services

---

# Folder Structure

```
src
└── app
    ├── core
    │
    │   ├── constants
    │   │   ├── API-ENDPOINTS.ts
    │   │   └── API_ROUTES.ts
    │   │
    │   ├── offline
    │   │   ├── models
    │   │   ├── network.service.ts
    │   │   ├── offline-queue.service.ts
    │   │   ├── offline-storage.service.ts
    │   │   ├── offline.handler.service.ts
    │   │   ├── offline.service.ts
    │   │   └── orders-offline.handler.service.ts
    │   │
    │   └── ui
    │       └── store
    │           └── ui.store.ts
    │
    ├── features
    │
    │   ├── kitchen
    │   │   ├── components
    │   │   ├── data
    │   │   ├── facade
    │   │   ├── models
    │   │   ├── store
    │   │   ├── kitchen.ts
    │   │   ├── kitchen.html
    │   │   ├── kitchen.scss
    │   │   └── kitchen.spec.ts
    │   │
    │   ├── orders
    │   │   ├── ai
    │   │   │
    │   │   ├── ai-chat
    │   │   │   ├── ai-chat.ts
    │   │   │   ├── ai-chat.html
    │   │   │   ├── ai-chat.scss
    │   │   │   └── ai-chat.spec.ts
    │   │   │
    │   │   ├── components
    │   │   │   ├── ai-loading
    │   │   │   ├── ai-message
    │   │   │   ├── ai-prompt
    │   │   │   ├── ai-response
    │   │   │   └── suggested-actions
    │   │   │
    │   │   ├── components
    │   │   ├── data
    │   │   ├── facade
    │   │   ├── models
    │   │   ├── new-order
    │   │   ├── order-details
    │   │   ├── store
    │   │   ├── orders.ts
    │   │   ├── orders.html
    │   │   ├── orders.scss
    │   │   └── orders.spec.ts
    │   │
    │   ├── products
    │   │   ├── components
    │   │   ├── data
    │   │   ├── facade
    │   │   ├── models
    │   │   └── store
    │   │
    │   └── search
    │       ├── components
    │       ├── facade
    │       ├── models
    │       ├── store
    │       ├── utils
    │       ├── search.ts
    │       ├── search.html
    │       ├── search.scss
    │       └── search.spec.ts
    │
    ├── layouts
    │   ├── bottom-nav
    │   ├── header
    │   ├── shell
    │   ├── sidebar
    │   └── workspace
    │
    ├── shared
    │
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.ts
    ├── app.html
    ├── app.scss
    └── environments
```

---

# Design Decisions

## Feature-Based Structure

The application is organized by business domains instead of technical layers.

Each feature owns its:

- Components
- Models
- Store
- Facade
- Data services

This improves scalability and keeps related code together.

---

## Standalone Components

Angular Standalone Components are used throughout the project.

Benefits include:

- Less boilerplate
- Simpler imports
- Easier lazy loading
- Better modularity

---

## Facade Pattern

A dedicated Facade exists for every feature.

The Facade:

- Connects components with stores
- Handles user actions
- Coordinates business logic
- Calls services

This keeps components clean and easy to maintain.

---

## Local Feature Stores

Each feature manages its own state independently.

Instead of a single global store, every feature contains its own Signal Store, making state easier to reason about and reducing unnecessary dependencies.

---

## Reusable Components

Shared UI elements are extracted into reusable components to reduce duplication and maintain a consistent user interface.

Examples include:

- Buttons
- Cards
- Inputs
- Empty States
- Skeleton Loaders
- Status Badges

---

## Offline-First Design

The application continues functioning when the network is unavailable.

Offline actions are queued and synchronized automatically once connectivity returns.

---

# State Management Approach

The project uses a **hybrid Signals + RxJS** architecture.

## Angular Signals

Signals are responsible for application state.

Each feature owns its own reactive state.

Examples include:

- Orders
- Selected Order
- Kitchen Status
- Search Results
- AI Messages
- UI State

Signals provide:

- Fine-grained updates
- Minimal boilerplate
- Excellent rendering performance

---

## RxJS

RxJS is used only where asynchronous behavior is required.

Examples include:

- HTTP requests
- Retry mechanisms
- AI response streaming
- Polling
- Timers
- Network events

Common operators include:

- switchMap
- mergeMap
- take
- timer
- interval
- catchError
- finalize

This combination keeps state simple while leveraging RxJS for asynchronous workflows.

---

# Performance Optimizations

Several optimizations were implemented to ensure smooth performance.

## OnPush Change Detection

Components use `ChangeDetectionStrategy.OnPush` to minimize unnecessary rendering.

---

## Signals

Signals update only the parts of the UI that depend on changed values.

---

## Computed Signals

Derived values such as filtered orders or kitchen load percentages are computed only when dependencies change.

---

## Lazy Loading

Features are structured to support lazy loading, reducing the initial bundle size.

---

## Optimistic Updates

Order changes appear immediately in the UI before server confirmation.

If the request fails, the previous state is restored.

---

## Offline Queue

Actions performed while offline are stored locally and synchronized automatically after reconnection.

---

## TrackBy Functions

Angular `trackBy` is used in lists to avoid unnecessary DOM recreation.

---

## Debounced Product Search

Search requests are delayed while typing to reduce API traffic.

---

## Skeleton Loading

Skeleton components provide smooth loading experiences and reduce layout shifts.

---

## Cached Feature State

Feature stores cache previously loaded data to minimize redundant API requests.

---

# Offline Support

Offline functionality is implemented inside the **core/offline** module.

Capabilities include:

- Network status monitoring
- Offline queue
- Local storage
- Automatic synchronization
- Retry mechanism

Orders created while offline remain visible and are synchronized automatically once the connection is restored.

---

# AI Order Assistant

The AI Assistant simulates asynchronous AI behavior.

Supported scenarios include:

- Loading state
- Delayed responses
- Streaming responses
- Retry on failure
- Error handling
- Suggested actions

This demonstrates how the application handles real-world AI interactions without blocking the user interface.

---

# Assumptions

The following assumptions were made during development:

- MockAPI serves as the backend.
- Authentication and authorization are outside the scope of this assessment.
- AI recommendations are simulated.
- Kitchen workload values are generated from mock data.
- Inventory management is not implemented.
- Payment processing is outside the project scope.
- Real-time updates are simulated without WebSockets.

---

# Known Limitations

Current limitations include:

- No authentication or user roles.
- AI functionality is simulated.
- Offline data is not persisted after browser storage is cleared.
- Kitchen analytics are based on mock data.
- No WebSocket integration.
- MockAPI rate limiting may temporarily affect requests.
- Test coverage is limited.

---

# Future Improvements

Possible future enhancements include:

- Real AI integration using OpenAI or Gemini.
- WebSocket support for live order updates.
- IndexedDB for persistent offline storage.
- Service Worker background synchronization.
- Push notifications.
- Authentication and authorization.
- Inventory management.
- Payment gateway integration.
- Customer loyalty features.
- Advanced analytics dashboard.
- Unit tests.
- Integration tests.
- End-to-end testing.
- Accessibility improvements (WCAG).
- Internationalization (i18n).
- Dark mode.

---

# Running the Project

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run start
```

Navigate to:

```
http://localhost:4200
```

---

# Author

**Mostafa Allam**

Frontend Developer

Built using Angular 21, Angular Signals, RxJS, Tailwind CSS, and a scalable feature-based architecture with a focus on performance, maintainability, and clean separation of concerns.