# Senior React Native Engineer - Take-Home Challenge

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

- Fetches live conditions for Berlin, London, Paris, Amsterdam, and Prague with OpenWeather per-city requests (free-tier friendly).
- Caches the latest snapshots and user preferences locally for instant rehydration and offline resilience.
- Sorting (name, temperature, humidity, wind) and filtering (all, comfortable, rainy) keep the data actionable.
- Responsive cards, pull-to-refresh, and quick settings panel (theme toggle + sign-out) mirror modern native dashboard patterns across portrait and landscape modes.

### Project Structure

- `components/weather/card` – self-contained card, styling, and metric helpers.
- `components/weather/controls` – segmented control UI and meta row.
- `components/weather/dashboard` – hero header copy, sign-out CTA, and layout.
- `contexts/` – auth and weather providers backed by reducers and services.
- `services/` – API, storage, and crypto utilities kept framework-agnostic for reuse.

## Testing Strategy

- Unit tests cover auth reducer, crypto helpers, and storage utilities under `__tests__/auth/`.
- Integration test (`authProvider.integration.test.tsx`) exercises the full register → login → logout flow with mocked native modules.
- Run the full suite with `npm test` (watchman disabled for sandbox compatibility).
