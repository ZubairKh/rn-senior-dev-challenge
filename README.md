# Senior React Native Engineer - Take-Home Challenge

## Table of Contents

- [Challenge Instructions](#senior-react-native-engineer---take-home-challenge)
- [Project Setup](#project-setup)
- [Authentication & Security Highlights](#authentication--security-highlights)
- [Environment Configuration](#environment-configuration)
- [Developer Scripts](#developer-scripts)
- [Weather Dashboard Highlights](#weather-dashboard-highlights)
- [Project Structure](#project-structure)
- [Testing Strategy](#testing-strategy)

<details>
<summary>Reviewer Challenge Information (Click to expand)</summary>

Build a **Health Environment Tracker** mobile application that helps users understand how environmental conditions might impact their health activities. The app integrates weather data and provides personalized activity recommendations.

- **Estimated Time:** 2 hours
- **Tech Stack:** React Native (Expo), TypeScript

## Description

Create a React Native application that:

- Authenticates users with a simple login flow
- Fetches and displays weather data from an external API
- Allows users to sort and filter

## Technical Requirements

### 1. Authentication

- register flow
- login screen with email/password
- Store auth state and implement a way to store registered users

### 2. External API Integration

- Fetch weather for at least 3 cities using a public free API of your choice

### 3. Main Dashboard

- Display weather in cards per city
- Add the ability to sort locations based on different parameters

## How to submit

- Please fork this repository as your starting point
- As a submission, provide us with a link to your finished repo
- Please include instructions for how to install and run the project in the readme

## Evaluation Criteria

- State Management
- Persistence
- Authentification & Security
- API Integration & Error Handling
- Architecture & Code Quality
- Advanced Features
- Development Experience

</details>

## Project Setup

- Install dependencies: `npm install`
- Copy environment file: `cp .env.example .env`
- Start Metro/Expo: `npm run start`
- Run on Android emulator: `npm run android`
- Lint: `npm run lint`
- Tests: `npm test`
- Format check: `npm run format`

## Authentication & Security Highlights

- Passwords are salted, peppered, and hashed client-side (`expo-crypto`) before storage.
- Sessions persist securely via `expo-secure-store` with AsyncStorage fallback when needed.
- Auth state and cached users hydrate on launch to avoid flash-of-unauthenticated screens.
- Pepper is injected via `EXPO_PUBLIC_AUTH_PASSWORD_PEPPER`; swap this per build (and note that production apps should hash on the server instead).
- Current demo intentionally skips login throttling/MFA—called out as future work so reviewers know the trade-offs.

> Future improvement: reintroduce login attempt throttling with persisted counters once the broader experience is finalized.

### Environment Configuration

Copy `.env.example` to `.env` and update values as needed:

```
EXPO_PUBLIC_AUTH_PASSWORD_PEPPER=put-your-own-pepper
EXPO_PUBLIC_OWM_API_URL=https://api.openweathermap.org
EXPO_PUBLIC_OWM_API_KEY=your-openweather-api-key
```

> Obtain a free API key from [OpenWeatherMap](https://openweathermap.org/api) and place it in `.env`.
> This pepper is only used client-side for the challenge; in production it should live on the server.

### Developer Scripts

- `npm test` runs the full Jest suite (unit, hook, and integration coverage).
- `npm run test:single -- path/to/file.test.tsx` executes an individual test file.
- `npm run lint` / `npm run format` keep the codebase consistent.
- `npm run lint-staged` is used by the pre-commit hook (Husky + lint-staged). If hooks aren't active, run `git config core.hooksPath .husky/_` once after cloning or run `npm run prepare` manually.

## Weather Dashboard Highlights

- Fetches live conditions for a curated list of cities with OpenWeather per-city requests (free-tier friendly).
- Sorting (name, temperature, humidity, wind) and filtering (all, comfortable, rainy) keep the data actionable.

**Improvement Opportunity:**

- Add a city search feature so users can search for and view weather conditions for any city of their choice, not just the static demo list. This would enhance personalization and real-world utility.

> **Note:**
> The city list is static for demo purposes, as the challenge only requires weather for at least 3 cities. In a real-world app, this can be easily extended to support dynamic city search or user-driven city management by updating the architecture to fetch cities from an API or allow user input.

### Project Structure

- `app/` – App entry, navigation, screens, and route layouts (including auth and settings).
- `assets/` – Fonts and images used throughout the app.
- `components/` – Reusable UI components, organized by feature:
  - `auth/` – Auth form fields, buttons, and scaffolding.
  - `common/` – Shared UI like full-screen loader.
  - `dashboard/` – Main dashboard screen and styles.
  - `layout/` – Backgrounds and layout helpers.
  - `ui/` – Icon and tab bar components.
  - `weather/` – Weather feature UI, further split into:
    - `card/` – Weather cards, metrics, health guide, and related helpers.
    - `controls/` – Segmented controls and filter/sort UI.
    - `actions/` – Dashboard header, greeting, refresh, and sign-out.
- `constants/` – App-wide constants (colors, routes, weather config, etc).
- `contexts/` – React context providers and reducers for auth and weather state.
- `hooks/` – Custom React hooks for color scheme, responsive layout, and feature logic.
- `services/` – API clients, storage, crypto, and feature logic (organized by domain).
- `types/` – TypeScript type definitions for app models and features.

## Testing Strategy

- **Auth:**
  - Unit tests for auth reducer, crypto helpers, and storage utilities (`__tests__/auth/`).
  - Integration test (`authProvider.integration.test.tsx`) covers the full register → login → logout flow with mocked native modules.
- **Weather:**
  - API tests for weather data fetching, error handling, and partial failures (`__tests__/weather/weatherApi.test.ts`).
  - Reducer tests for state, sorting, filtering, and error handling (`__tests__/weather/weatherReducer.test.ts`).
  - Storage tests for AsyncStorage, user preferences, clearing, and edge cases (`__tests__/weather/weatherStorage.test.ts`).
  - Insights utility tests for comfort/rainy detection, filtering, sorting, and scoring (`__tests__/weather/weatherInsights.test.ts`).
- **Test Utilities:**
  - Custom mocks for native modules and storage are provided in `__tests__/test-utils/mocks/` and used throughout tests for reliable isolation.
- Run the full suite with `npm test` (watchman disabled for sandbox compatibility).

## Possible Future Filter Options

The weather dashboard is designed to be easily extensible. Here are some additional filter options that could be added to enhance user experience:

- **Hot:** Show cities with high temperatures (e.g., above 30°C).
- **Cold:** Show cities with low temperatures (e.g., below 10°C).
- **Windy:** Show cities with high wind speeds (e.g., above 10 m/s).
- **Clear:** Show cities with clear weather (e.g., conditionId 800).
- **Cloudy:** Show cities with clouds (e.g., conditionId 801–804).
- **Humid:** Show cities with high humidity (e.g., above 80%).
- **Stormy:** Show cities with thunderstorm conditions (e.g., conditionId 200–232).

These filters can be implemented by extending the filter logic and UI configuration. See the code comments and `filterSnapshots` function for guidance.
