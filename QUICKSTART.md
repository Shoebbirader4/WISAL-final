# WISAL Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd wisal-marketplace
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

## 📱 What to Test

### Home Page (`/`)
- ✅ Arabic RTL layout
- ✅ Hero section with WISAL branding
- ✅ Feature cards
- ✅ "ابدأ التسوق الآن" button → navigates to Reels

### WISAL Reels (`/reels`)
- ✅ Vertical video feed
- ✅ Scroll between videos (snap behavior)
- ✅ Auto-play when in view
- ✅ Product info overlay (Arabic)
- ✅ Price in SAR
- ✅ "أضف إلى السلة" button (shows alert)
- ✅ Like button (toggles red heart)
- ✅ View counter
- ✅ Comment/Share buttons

## 🎨 Branding Colors

- **Primary**: #1F3B66 (Deep Indigo)
- **Accent**: #FFC300 (Gold/Saffron)

## 🌐 Languages

- **Default**: Arabic (RTL)
- **Supported**: English (LTR) - ready for implementation

## 📂 Key Files to Explore

```
app/
├── page.tsx              # Home page
└── reels/page.tsx        # WISAL Reels feed

components/
├── ReelItem.tsx          # Video player component
└── Navigation.tsx        # Bottom nav bar

lib/
├── mock-data.ts          # Sample video data
└── utils.ts              # Helper functions

types/index.ts            # TypeScript types
```

## 🔧 Customization

### Add More Videos
Edit `lib/mock-data.ts`:
```typescript
export const mockReels: VideoReel[] = [
  {
    id: 'reel4',
    videoUrl: 'your-video-url.mp4',
    product: { /* product data */ },
    // ...
  }
];
```

### Change Translations
Edit `public/locales/ar/common.json` or `en/common.json`

### Modify Colors
Edit `app/globals.css`:
```css
:root {
  --primary-color: #YourColor;
  --accent-color: #YourColor;
}
```

## 📚 Documentation

- `README.md` - Project overview
- `FEATURES.md` - Feature checklist
- `DEVELOPMENT.md` - Development workflow
- `REELS_GUIDE.md` - Technical deep-dive on Reels
- `PROJECT_STRUCTURE.md` - File organization

## 🐛 Troubleshooting

### Port already in use?
```bash
npm run dev -- -p 3001
```

### TypeScript errors?
```bash
npm run build
```

### Need to reset?
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 🎯 Next Steps

1. **Test the Reels feed** - Main feature!
2. **Review the code** - Understand the structure
3. **Plan backend** - NestJS API design
4. **Set up database** - PostgreSQL schema
5. **Integrate payments** - Mada/STC Pay

## 💡 Tips

- The app is **Arabic-first** (RTL by default)
- Videos use **mock URLs** - replace with your CDN
- **Mobile-optimized** - test on phone viewport
- **Performance-focused** - uses SSR-ready Next.js

---

**Ready to build the future of Saudi e-commerce! 🇸🇦**
