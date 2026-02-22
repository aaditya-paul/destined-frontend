# Destined — Dating App Frontend

**Destined** is a modern, editorial-style dating app built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/). It features a rich onboarding experience, card-based profile discovery, a full-featured real-time-ready chat system, and a polished design system — all written in TypeScript.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Screens & Navigation](#screens--navigation)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Key Components](#key-components)
- [Context & State Management](#context--state-management)
- [Linting](#linting)
- [Contributing](#contributing)

---

## Features

### Onboarding (3-Step Flow)
- **Step 1 – Basic Identity**: First/last name, date of birth (with minimum-age validation), gender, height, dating preference, location, job title, and school/college.
- **Step 2 – Bio & Interests**: Free-text bio (up to 500 characters), interest chip selection (up to 10 interests), optional voice-note recording (up to 2 minutes), and an optional multiple-choice poll that other users can answer on your profile.
- **Step 3 – Profile Builder**: Upload and arrange up to 6 profile photos (with per-image prompt/caption), add profile prompts, and finalise the profile.

### Home — Card Discovery
- Animated swipe-style card stack with slide-out and rotate animations.
- Like or Pass with dedicated action buttons.
- **Compliment Modal**: when you like someone, send them a personalised compliment before the card leaves the stack.

### Explore
- Masonry-grid layout of curated profiles.
- Glassmorphism details overlay with name, age, and location.
- Match-percentage badge on each card.

### Likes
- Masonry grid of people who have liked your profile.
- Shows the compliment they sent, if any.

### Chats
- Conversation list sorted by unread status and recency.
- Inline search to filter by name or message content.
- Online presence indicator and typing indicator.
- Pull-to-refresh.

### Chat Screen (Rich Messaging)
- **Text messages** with sent / delivered / read receipts.
- **Image messages** (from camera or photo library) with full-screen pinch-to-zoom viewer.
- **Video messages** with a full-screen player.
- **Multi-select media** — pick multiple photos/videos at once, add individual captions, then send as a grouped media message.
- **Voice messages** — record and send audio clips with waveform-style display and playback.
- **Swipe to reply** — swipe any message to set it as a reply reference.
- **Emoji reactions** — long-press a message to react or pick from an emoji picker.
- **Message actions sheet** — copy text, reply, react, or delete (your own messages).
- **Date separators** automatically group messages by day.
- Scroll-to-bottom floating button.
- Typing indicator shown at the top of the inverted list.

### Profile Tab
- Profile strength score (0–100) calculated from completeness of photos, bio, interests, voice note, and basic info.
- Overview card with avatar, name, age, and key details.
- Quick-access buttons: Preview Profile, Edit Profile, Settings.
- Stats summary: photos uploaded, interests selected, bio character count.

### Settings
- Account details (phone, email).
- Notification and discovery toggles.
- Age range and distance preference display.
- Legal pages (Privacy Policy, Terms of Service, Licenses).
- Log out and Delete Account.

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | [React Native](https://reactnative.dev/) 0.81.5 |
| Runtime | [Expo](https://expo.dev/) SDK 54 |
| Language | TypeScript 5.9 |
| Navigation | [Expo Router](https://expo.github.io/router/) 6 (file-based) |
| Animations | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) 4 |
| Gestures | [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) |
| Audio / Video | [expo-av](https://docs.expo.dev/versions/latest/sdk/av/) |
| Image Picker | [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) |
| Visual Effects | [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur/), [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) |
| Haptics | [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) |
| Clipboard | [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/) |
| Icons | [@expo/vector-icons](https://icons.expo.fyi/) (Ionicons) |
| Fonts | ZonaPro Bold / ExtraLight, Manrope Variable |
| Build / Deploy | [EAS Build](https://docs.expo.dev/build/introduction/) |

---

## Project Structure

```
destined-frontend/
├── app/                        # Expo Router screens (file-based routing)
│   ├── _layout.tsx             # Root layout — fonts, navigation theme, OnboardingProvider
│   ├── index.tsx               # Entry redirect (login or main tabs)
│   ├── login.tsx               # Login / "Continue with Google" screen
│   ├── modal.tsx               # Generic modal screen
│   ├── profile-preview.tsx     # Preview your profile as others see it
│   ├── user-profile.tsx        # View another user's full profile
│   ├── settings.tsx            # App settings screen
│   ├── (tabs)/                 # Bottom-tab navigation group
│   │   ├── _layout.tsx         # Tab bar layout with floating active-tab bubble
│   │   ├── home.tsx            # Card discovery (swipe) screen
│   │   ├── explore.tsx         # Masonry grid explore screen
│   │   ├── likes.tsx           # People who liked you
│   │   ├── chats.tsx           # Conversations list
│   │   └── profile.tsx         # Your profile dashboard
│   ├── chat/
│   │   └── [id].tsx            # Dynamic chat screen (rich messaging)
│   └── onboarding/
│       ├── basic-identity.tsx  # Onboarding step 1 — personal details
│       ├── bio-interests.tsx   # Onboarding step 2 — bio, interests, voice, poll
│       └── profile-builder.tsx # Onboarding step 3 — photos & prompts
│
├── components/
│   ├── ProfileView.tsx         # Full scrollable profile card (used on Home)
│   ├── chat/                   # Chat-specific components
│   │   ├── ChatActionSheet.tsx
│   │   ├── ChatHeader.tsx
│   │   ├── ChatInput.tsx       # Input bar with voice recording, media picker
│   │   ├── DateSeparator.tsx
│   │   ├── EmojiReactionPicker.tsx
│   │   ├── FullscreenVideoPlayer.tsx
│   │   ├── MediaCaptionModal.tsx
│   │   ├── MediaGroup.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── ReplyPreview.tsx
│   │   ├── ScrollToBottomButton.tsx
│   │   ├── SwipeableMessage.tsx
│   │   ├── TypingIndicator.tsx
│   │   ├── VideoPlayerBubble.tsx
│   │   ├── VoiceMessageBubble.tsx
│   │   └── ZoomableImage.tsx
│   └── ui/                     # Shared / design-system components
│       ├── ComplimentHeader.tsx
│       ├── ComplimentModal.tsx
│       ├── Cta_btn.tsx         # Primary call-to-action button
│       ├── DatePicker.tsx
│       ├── DecorativeStripes.tsx
│       ├── Dropdown.tsx
│       ├── EditorialComponents.tsx  # EditorialHeader, SectionLabel, LikeableCard
│       ├── ImageUpload.tsx
│       ├── InterestChip.tsx
│       ├── LogoBranding.tsx
│       ├── ProgressBar.tsx
│       ├── PromptModal.tsx
│       ├── TextInput.tsx
│       └── like_unline_actionsBtn.tsx  # Like / Pass action buttons
│
├── constants/
│   ├── globalStyles.ts         # Design tokens: colors, fonts, spacing, border radius
│   ├── theme.ts                # Light/dark colors + platform font maps
│   ├── data.ts                 # Dropdown option arrays (gender, height, interests, etc.)
│   ├── microcopies.ts          # All UI copy strings (onboarding labels, placeholders, errors)
│   └── profilePrompts.ts       # Predefined profile prompt questions
│
├── context/
│   ├── OnboardingContext.tsx   # React context + provider for onboarding state
│   └── types.ts                # TypeScript interfaces (OnboardingData, Message, Chat, …)
│
├── data/
│   └── dummyData.ts            # Mock profiles and chat data for development
│
├── hooks/
│   ├── use-color-scheme.ts     # Cross-platform color scheme hook
│   ├── use-color-scheme.web.ts # Web-specific override
│   └── use-theme-color.ts      # Resolves a color token for the current theme
│
├── utils/
│   └── chatHelpers.ts          # Chat list builder, time formatters
│
├── assets/
│   ├── fonts/                  # ZonaPro-Bold.otf, ZonaPro-ExtraLight.otf, Manrope variable
│   └── images/                 # App icons, splash, logo variants
│
├── app.json                    # Expo app config (name, icons, plugins, EAS project ID)
├── eas.json                    # EAS Build profiles (development, preview, production)
├── tsconfig.json
├── eslint.config.js
└── package.json
```

---

## Design System

All design tokens live in [`constants/globalStyles.ts`](constants/globalStyles.ts) and are imported across every screen and component.

### Colors

| Token | Value | Usage |
|---|---|---|
| `colors.primary` | `#FF6347` | Buttons, badges, active states |
| `colors.secondary` | `#1E3A5F` | Text headings, secondary buttons |
| `colors.text` | `#1E1E1E` | Body text |
| `colors.textSecondary` | `#8A8A8A` | Labels, placeholders, hints |
| `colors.background` | `#F8F8F8` | Screen backgrounds |
| `colors.white` | `#FFFFFF` | Cards, inputs |
| `colors.border` | `#E0E0E0` | Dividers, input borders |

### Typography

| Token | Font | Notes |
|---|---|---|
| `fontFamilies.bold` | `ZonaPro-Bold` | Headers, labels, buttons |
| `fontFamilies.variable` | `ZonaPro-Variable` | Body text |
| `fontFamilies.primary.regular` | `ZonaPro-Variable` | Standard text |
| `fontFamilies.primary.medium` | `ZonaPro-Variable` | Semi-emphasis |

Font sizes follow a named scale: `xs` (12) → `sm` (16) → `base` (18) → `lg` (24) → `xl` (32) → `2xl` (36).

### Spacing

A consistent spacing scale (in px): `xs` 5 · `sm` 8 · `md` 12 · `lg` 16 · `xl` 20 · `2xl` 32 · `3xl` 40.

### Border Radius

`sm` 10 · `md` 20 · `lg` 25 · `full` 9999.

#### Usage Example

```tsx
import { colors, fontFamilies, fontSizes, spacing, borderRadius } from "@/constants/globalStyles";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  label: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.white,
  },
});
```

---

## Screens & Navigation

```
/                       → index.tsx (redirects to login or tabs)
/login                  → Login screen (Google sign-in)
/onboarding/
  basic-identity        → Step 1: Personal details
  bio-interests         → Step 2: Bio, interests, voice note, poll
  profile-builder       → Step 3: Photos & prompts
/(tabs)/
  home                  → Card discovery with Like/Pass
  explore               → Masonry profile grid
  likes                 → Profiles that liked you
  chats                 → Conversation list
  profile               → Your profile dashboard
/chat/[id]              → Full chat screen
/user-profile           → View another user's profile
/profile-preview        → Preview your own profile
/settings               → App settings
/modal                  → Generic modal
```

The bottom tab bar uses a floating active-tab bubble effect where the active icon floats above the bar in a circle with a primary-colour background.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — installed automatically via `npx`
- For iOS: macOS with Xcode 15+ and a simulator or physical device
- For Android: Android Studio with an emulator or physical device with USB debugging enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/aaditya-paul/destined-frontend.git
cd destined-frontend

# Install dependencies
npm install
```

---

## Running the App

### Start the development server

```bash
npx expo start
```

The Metro bundler will launch. From the terminal you can then:

| Key | Action |
|---|---|
| `i` | Open in iOS Simulator |
| `a` | Open in Android Emulator |
| `w` | Open in web browser |
| `r` | Reload the app |
| Scan QR | Open in [Expo Go](https://expo.dev/go) on a physical device |

### Platform-specific commands

```bash
# iOS (requires macOS + Xcode)
npm run ios

# Android (requires Android Studio / ADB)
npm run android

# Web
npm run web
```

### Reset to a blank project

```bash
npm run reset-project
```

This moves the current `app/` directory to `app-example/` and creates a fresh empty `app/` directory, useful for starting over from scratch.

---

## Building for Production

Destined uses [EAS Build](https://docs.expo.dev/build/introduction/) for cloud-based native builds.

### Install the EAS CLI

```bash
npm install -g eas-cli
eas login
```

### Build profiles (defined in `eas.json`)

| Profile | Purpose |
|---|---|
| `development` | Internal development client (debug build) |
| `preview` | Internal distribution build for QA/testing |
| `production` | Store-ready build with auto-incremented version |
| `test` | APK build for Android testing |

### Run a build

```bash
# iOS production build
eas build --platform ios --profile production

# Android production build
eas build --platform android --profile production

# Both platforms
eas build --platform all --profile production
```

### Submit to app stores

```bash
eas submit --platform ios
eas submit --platform android
```

---

## Key Components

### `components/ProfileView.tsx`
Renders a complete scrollable user profile as seen on the Home swipe screen. Accepts a `profile` prop and an optional `onCardLike` callback invoked when the user likes an individual card element (e.g. a photo or prompt).

### `components/ui/EditorialComponents.tsx`
Exports `EditorialHeader`, `SectionLabel`, and `LikeableCard`.

- **`EditorialHeader`** — bold title + subtitle used as the page heading across all screens.
- **`SectionLabel`** — small all-caps spaced label for grouping form sections.
- **`LikeableCard`** — a card with an optional like button, used on the profile for voice notes and polls.

### `components/ui/Cta_btn.tsx`
Primary call-to-action button. Accepts `text`, `btnColor`, `onPress`, and an optional `disabled` flag.

### `components/chat/ChatInput.tsx`
The full input bar component that handles:
- Text input with a send button
- Voice recording (hold-to-record with haptic feedback)
- Camera and photo library pickers
- Multi-media picker
- Reply preview banner

### `components/chat/MessageBubble.tsx`
Renders a single chat message bubble that adapts its layout based on `type` (`text`, `image`, `video`, `voice`, `media`). Handles reactions, reply previews, delivery status icons, and long-press.

### `components/chat/SwipeableMessage.tsx`
Wraps `MessageBubble` with a horizontal pan gesture to trigger a reply action.

---

## Context & State Management

### `OnboardingContext`

Located at [`context/OnboardingContext.tsx`](context/OnboardingContext.tsx), this React context stores all user data collected during onboarding and is consumed by the profile screens.

```tsx
import { useOnboarding } from "@/context/OnboardingContext";

const { data, updateData, resetData } = useOnboarding();

// Update a field
updateData({ firstName: "Alex" });

// Reset everything
resetData();
```

**`OnboardingData` shape** (see [`context/types.ts`](context/types.ts)):

| Field | Type | Description |
|---|---|---|
| `firstName` / `lastName` | `string` | User's name |
| `dateOfBirth` | `Date` | Used for age calculation (18+ enforced) |
| `gender` | `Gender` | Man / Woman / Non-binary / Prefer not to say |
| `lookingFor` | `LookingFor` | Men / Women / Everyone |
| `datingPreference` | `DatingPreference` | Long-term / Short-term / Figuring it out / New friends |
| `location` | `string` | City / region |
| `height` | `string` | Formatted as `5'11"` |
| `jobTitle` / `school` | `string` | Occupation and education |
| `bio` | `string` | Free-text bio (max 500 chars) |
| `interests` | `string[]` | Up to 10 selected interest tags |
| `poll` | `PollData` | Optional MCQ poll with question, options, and correct answer |
| `voiceNoteUri` | `string \| null` | File URI of recorded voice note |
| `voiceNoteDuration` | `string \| null` | Formatted duration (e.g. `"1:30"`) |
| `images` | `(ImageItem \| undefined)[]` | Array of 6 slots for profile photos |

---

## Linting

The project uses ESLint with the `eslint-config-expo` preset.

```bash
npm run lint
```

---

## Contributing

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Follow the existing code style — TypeScript, functional components, `StyleSheet.create` for styles, and tokens from `constants/globalStyles.ts`.
3. Add or update relevant types in `context/types.ts`.
4. Run the linter before opening a pull request:
   ```bash
   npm run lint
   ```
5. Open a pull request against the `main` branch with a clear description of the change.

---

## License

This project is private. All rights reserved.
