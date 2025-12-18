# WISAL Project Structure

```
wisal-marketplace/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with RTL support
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles + Tailwind
│   └── reels/
│       └── page.tsx             # 🎥 WISAL Reels (Main Feature)
│
├── components/                   # React Components
│   ├── ReelItem.tsx             # Individual video reel with shoppable UI
│   └── Navigation.tsx           # Bottom navigation bar
│
├── lib/                         # Utilities & Data
│   ├── utils.ts                 # Helper functions (formatPrice, formatViews)
│   └── mock-data.ts             # Mock video reels data
│
├── types/                       # TypeScript Types
│   └── index.ts                 # Product, VideoReel, CartItem types
│
├── public/
│   └── locales/                 # i18n translations
│       ├── ar/
│       │   └── common.json      # Arabic translations
│       └── en/
│           └── common.json      # English translations
│
├── next.config.ts               # Next.js config with i18n
├── next-i18next.config.js       # i18n configuration
└── tsconfig.json                # TypeScript config
```

## Key Files

### 🎯 Core Feature: WISAL Reels
- `app/reels/page.tsx` - Main reels feed with vertical scrolling
- `components/ReelItem.tsx` - Video player with shoppable overlay

### 🌐 Internationalization
- `public/locales/{ar,en}/common.json` - Translations
- `app/layout.tsx` - RTL support via `dir="rtl"`

### 🎨 Styling
- `app/globals.css` - Tailwind + custom CSS variables
- Brand colors: Primary (#1F3B66), Accent (#FFC300)

### 📦 Types
- `types/index.ts` - Product, VideoReel, CartItem interfaces
