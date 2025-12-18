# WISAL Reels - Technical Guide

## Overview

WISAL Reels is the core differentiating feature - a vertical-scrolling, shoppable video feed optimized for web performance.

## Architecture

```
┌─────────────────────────────────┐
│     Reels Page Container        │
│  (Snap scroll, full viewport)   │
│                                 │
│  ┌───────────────────────────┐ │
│  │     Reel Item #1          │ │
│  │  ┌─────────────────────┐  │ │
│  │  │   Video Player      │  │ │
│  │  │   (HTML5 <video>)   │  │ │
│  │  └─────────────────────┘  │ │
│  │                           │ │
│  │  Overlay:                 │ │
│  │  - Views counter (top)    │ │
│  │  - Action buttons (side)  │ │
│  │  - Product info (bottom)  │ │
│  │  - Add to Cart CTA        │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │     Reel Item #2          │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

## Component Structure

### ReelsPage (`app/reels/page.tsx`)
- Manages scroll state
- Tracks current video index
- Fetches video data
- Handles lazy loading

### ReelItem (`components/ReelItem.tsx`)
- Individual video player
- Auto-play/pause logic
- Shoppable overlay UI
- Social engagement buttons

## Video Player Logic

```typescript
// Auto-play when in viewport
useEffect(() => {
  if (isActive) {
    video.play();
  } else {
    video.pause();
    video.currentTime = 0;
  }
}, [isActive]);
```

## Scroll Behavior

```css
/* Snap scrolling */
.reels-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
}

.reel-item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

## Performance Optimizations

1. **Lazy Loading**: Videos load only when near viewport
2. **Intersection Observer**: Detects when video enters/exits view
3. **Resource Management**: Pauses off-screen videos
4. **Preloading**: Next video preloads while current plays

## Shoppable UI Elements

### Product Info Overlay (Bottom)
- Product name (Arabic)
- Seller name
- Price in SAR
- "Add to Cart" button (prominent CTA)

### Action Buttons (Side)
- Like/Heart (with counter)
- Comment (with counter)
- Share

### Metadata (Top)
- View counter

## Data Flow

```
Mock Data → ReelsPage → ReelItem → Video Player
                ↓
         User Interaction
                ↓
         Cart/Like/Comment
```

## API Integration (Future)

```typescript
// Fetch reels from backend
const response = await fetch('/api/reels', {
  method: 'GET',
  headers: {
    'Accept-Language': locale,
  },
});

const reels = await response.json();
```

## Video CDN Integration

Replace mock URLs with:

```typescript
// Cloudflare Stream
videoUrl: `https://customer-${code}.cloudflarestream.com/${videoId}/manifest/video.m3u8`

// AWS CloudFront
videoUrl: `https://d111111abcdef8.cloudfront.net/videos/${videoId}.mp4`
```

## Mobile Optimization

- Touch-friendly buttons (min 44x44px)
- Swipe gestures for navigation
- Optimized video quality based on connection
- Reduced data usage with adaptive streaming

## Analytics Events

Track these events:
- Video view (>3 seconds)
- Video completion
- Product click
- Add to cart
- Like/comment/share
- Scroll depth

## Testing

```bash
# Run dev server
npm run dev

# Navigate to /reels
# Test:
# - Scroll between videos
# - Auto-play/pause
# - Add to cart
# - Like button
# - RTL layout
```
