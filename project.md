# 360-NFC-Valet

Premium hospitality valet app built with **React Native (Expo SDK 54)**, **TypeScript**, and **React Navigation**.

## Project Description

360 NFC Valet is a mobile application for premium hospitality valet services. It provides a secure, NFC-enabled flow for valet staff and drivers, with a clean, layered codebase designed for rapid feature growth.

## Tech Stack

| Layer        | Choice                                         |
| ------------ | ---------------------------------------------- |
| Framework    | React Native 0.81 / Expo SDK 54                |
| Language     | TypeScript (strict)                            |
| Navigation   | @react-navigation/native-stack                 |
| Styling      | StyleSheet / expo-linear-gradient              |
| Storage      | @react-native-async-storage/async-storage      |
| HTTP Client  | Native `fetch` wrapper (`src/api/client.ts`)   |

## Features

- Driver login screen with typed navigation
- Centralized API client with timeout and typed endpoints
- AsyncStorage-based token persistence
- Shared design system constants (colors, spacing, typography)
- Reusable UI primitives (e.g. `AppButton`)

## Getting Started

```bash
npm install                 # install dependencies
npm run serve               # start Expo dev server (Metro)
cp .env.example .env        # configure EXPO_PUBLIC_API_URL
```

## Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run serve`     | Start Expo dev server                |
| `npm run android`   | Start on Android emulator            |
| `npm run ios`       | Start on iOS simulator               |
| `npm run web`       | Start in browser                     |
| `npm run typecheck` | Run TypeScript type checking         |
| `npm run doctor`    | Validate Expo project health         |
| `npm run prebuild`  | Generate native android/ios projects |

## Documentation

- [README.md](./README.md) — overview and quick start
- [ARCHITECTURE.md](./ARCHITECTURE.md) — folder structure, data flow, conventions
- [AGENTS.md](./AGENTS.md) — guidance for AI coding agents working in this repo
