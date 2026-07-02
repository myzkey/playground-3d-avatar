# Three.js + React + VRM Sample App

A sample React SPA built with TypeScript for displaying and controlling a VRM avatar in the browser.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

After the Vite dev server starts, open the displayed URL in your browser.

## Build

```bash
pnpm build
```

## GitHub Pages Deployment

Pushing to the `main` branch runs GitHub Actions, builds the app with `pnpm build`, and publishes the generated files for GitHub Pages.

On GitHub Actions, Vite's `base` is automatically set from the repository name as `/<repo-name>/`. In local development, it stays `/`.

For the GitHub Pages production build, the VRM file is not bundled into the Pages artifact. Instead, the app loads it from a GitHub raw URL. In local development, the app loads `public/avatar.vrm`.

## VRM Model Placement

The app loads a VRM model from:

```txt
public/avatar.vrm
```

The current sample uses `vroid/stable/AvatarSample_C.vrm` from `madjin/vrm-samples`. AvatarSample_A, AvatarSample_B, and AvatarSample_C are not CC0 models, so use them according to the VRoid Studio sample model terms.

To replace the avatar, put another VRM file at `public/avatar.vrm`.

If you want to change the file name or location, update `AVATAR_MODEL_URL` in `src/shared/config/avatar.ts`.

## Libraries

- Vite
- React
- TypeScript
- pnpm
- Three.js
- @react-three/fiber
- @react-three/drei
- @pixiv/three-vrm

## Directory Structure

```txt
src/
  app/
    providers/
    styles/
    main.tsx
  pages/
    avatar-page/
      ui/
        avatar-page.tsx
  widgets/
    avatar-viewer/
      ui/
        avatar-viewer.tsx
  features/
    change-expression/
      ui/
        expression-controls.tsx
    change-animation/
      ui/
        animation-controls.tsx
    reset-avatar/
      ui/
        reset-avatar-button.tsx
  entities/
    avatar/
      model/
        avatar-types.ts
      lib/
        bones.ts
        expression.ts
      ui/
        vrm-avatar.tsx
  shared/
    ui/
      button.tsx
    lib/
      class-names.ts
    config/
      avatar.ts
```

## Feature-Sliced Design Responsibilities

- `app`: React entry point, global styles, and app-wide provider location
- `pages`: Page-level composition. This app has the avatar control page
- `widgets`: Large page sections. This app has the 3D avatar viewer
- `features`: User actions such as changing expressions, changing animations, and resetting the avatar
- `entities`: Avatar-specific types, bone control, expression handling, and Three.js / VRM integration
- `shared`: Reusable UI, utilities, and configuration

Three.js and VRM-specific logic is kept mainly inside `entities/avatar`.

## Implemented Controls

- Display a VRM model
- Rotate, zoom, and pan with OrbitControls
- Change expressions: Neutral / Happy / Angry / Sad / Surprised
- Switch animations: Idle / Wave
- Make the face and gaze follow the mouse cursor
- Reset the avatar
- Responsive layout for desktop and tablet-sized screens

## Future Extensions

- Voice input
- Text-to-speech
- Lip sync
- ChatGPT or other AI integration
- Additional animations
- VRM model switching
- Background switching
- Character selection

When adding new features, keep interaction UI in `features`, domain logic such as VRM or audio handling in `entities`, and larger user-facing sections in `widgets`.
