# Development Guide

## Quick Start

```bash
cd wisal-marketplace
npm install
npm run dev
```

Visit: http://localhost:3000

## Key Routes

- `/` - Home page (Arabic RTL by default)
- `/reels` - **WISAL Reels** shoppable video feed

## Development Workflow

### 1. Adding New Translations

Edit `public/locales/{ar,en}/common.json`:

```json
{
  "new_key": "Arabic text",
  "nested": {
    "key": "Value"
  }
}
```

### 2. Creating New Pages

```tsx
// app/new-page/page.tsx
export default function NewPage() {
  return <div>Content</div>;
}
```

### 3. Adding Components

```tsx
// components/MyComponent.tsx
export default function MyComponent() {
  return <div>Component</div>;
}
```

## RTL Support

The app automatically applies RTL for Arabic:
- `<html dir="rtl">` in layout.tsx
- Tailwind classes work bidirectionally
- Use logical properties: `ms-4` (margin-start) instead of `ml-4`

## Video Optimization

Current implementation uses:
- HTML5 video player
- Lazy loading with Intersection Observer
- Auto-play/pause based on viewport
- Snap scrolling for smooth UX

### Production Video CDN

Replace mock URLs in `lib/mock-data.ts` with:
- Cloudflare Stream URLs
- AWS CloudFront URLs

## API Integration

Create API routes in `app/api/`:

```tsx
// app/api/reels/route.ts
export async function GET() {
  const reels = await fetchReelsFromDB();
  return Response.json(reels);
}
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:
- API endpoints
- Payment gateway keys
- Database URLs

## Building for Production

```bash
npm run build
npm start
```

## Next Steps

1. **Backend**: Build NestJS API
2. **Auth**: Implement user authentication
3. **Payments**: Integrate Mada/STC Pay
4. **Database**: Connect PostgreSQL + Redis
5. **CDN**: Set up video delivery
6. **Seller Portal**: Build vendor interface
7. **Admin Dashboard**: Platform management
