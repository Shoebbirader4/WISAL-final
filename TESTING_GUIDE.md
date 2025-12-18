# 🧪 WISAL Testing Guide

## Quick Test Flow

### 1. Start the Application
```bash
cd wisal-marketplace
npm run dev
```

Visit: http://localhost:3000

### 2. Test Home Page
- ✅ Arabic RTL layout
- ✅ Hero section with "وصال WISAL"
- ✅ Three feature cards
- ✅ Gold CTA button
- ✅ Mobile navigation at bottom

### 3. Test WISAL Reels (Main Feature)

**Navigate to Reels:**
- Click "ابدأ التسوق الآن" button
- Or go directly to: http://localhost:3000/reels

**Test Video Feed:**
- ✅ Vertical scrolling (snap behavior)
- ✅ Videos auto-play when in view
- ✅ Videos pause when scrolled away
- ✅ Product info overlay (Arabic)
- ✅ Price in SAR
- ✅ Seller name
- ✅ View counter (top right)
- ✅ Like button (left side)
- ✅ Comment counter
- ✅ Share button

**Test Add to Cart (Not Logged In):**
1. Click "أضف إلى السلة" button
2. ⚠️ Alert: "يرجى تسجيل الدخول أولاً"

### 4. Test Login

**Navigate to Login:**
- Click "دخول" in bottom navigation
- Or go to: http://localhost:3000/login

**Test Accounts:**
```
Buyer:    buyer@wisal.sa / password123
Seller 1: seller1@wisal.sa / password123
Seller 2: seller2@wisal.sa / password123
Admin:    admin@wisal.sa / password123
```

**Login Flow:**
1. Enter email and password
2. Click "تسجيل الدخول"
3. ✅ Redirected to home page
4. ✅ Navigation shows "حسابي" instead of "دخول"

### 5. Test Add to Cart (Logged In)

**Go back to Reels:**
1. Navigate to /reels
2. Click "أضف إلى السلة" on any video
3. ✅ Alert: "تمت إضافة [product name] إلى السلة"
4. Try adding multiple products

### 6. Test Shopping Cart

**Navigate to Cart:**
- Click "السلة" in bottom navigation
- Or go to: http://localhost:3000/cart

**Test Cart Features:**
- ✅ See all added items
- ✅ Product name (Arabic)
- ✅ Seller name
- ✅ Price per item
- ✅ Quantity controls (+/-)
- ✅ Remove item (trash icon)
- ✅ Total price calculation
- ✅ "إتمام الطلب" button (shows alert - not implemented yet)

**Test Quantity Update:**
1. Click + button → quantity increases
2. Click - button → quantity decreases
3. ✅ Total updates automatically
4. ✅ Can't go below 1

**Test Remove Item:**
1. Click trash icon
2. ✅ Item removed immediately
3. ✅ Total recalculates

**Test Empty Cart:**
1. Remove all items
2. ✅ Shows "سلة التسوق فارغة"
3. ✅ "تصفح المنتجات" button

### 7. Test API Endpoints

**Using curl or browser:**

```bash
# Get reels
curl http://localhost:3000/api/reels

# Get products
curl http://localhost:3000/api/products

# Get current user (requires login)
curl http://localhost:3000/api/auth/me

# Get cart (requires login)
curl http://localhost:3000/api/cart
```

### 8. Test Database

**View database:**
```bash
npx prisma studio
```

**Check data:**
- Users table (4 users)
- Products table (3 products)
- VideoReels table (3 reels)
- CartItems table (your cart items)

## 🐛 Known Issues

### Fixed
- ✅ Thumbnail 404 errors (removed poster images)
- ✅ API compilation errors (fixed async/await)
- ✅ Prisma 7 compatibility (downgraded to v5)

### To Be Implemented
- ⏳ Checkout flow
- ⏳ Payment integration
- ⏳ Order history
- ⏳ Product search
- ⏳ Seller dashboard
- ⏳ Admin panel

## 📊 Expected Behavior

### Authentication
- ❌ Not logged in → Can browse, can't add to cart
- ✅ Logged in → Can browse and add to cart

### Cart
- ❌ Empty cart → Shows empty state
- ✅ Has items → Shows items with controls

### Reels
- ✅ Always accessible (public)
- ✅ Videos from database
- ✅ Real product data

## 🔍 Debugging

### Check Server Logs
The dev server shows all requests and errors in real-time.

### Check Browser Console
- Network tab: See API calls
- Console tab: See JavaScript errors

### Check Database
```bash
npx prisma studio
```

### Reset Database
```bash
# Stop the dev server first
rm prisma/dev.db
npx prisma migrate dev
npx tsx prisma/seed.ts
```

## ✅ Success Criteria

All these should work:
- [x] Home page loads
- [x] Reels page shows videos
- [x] Videos auto-play/pause
- [x] Login works
- [x] Add to cart works (when logged in)
- [x] Cart shows items
- [x] Quantity update works
- [x] Remove from cart works
- [x] Total calculates correctly
- [x] Navigation works
- [x] Arabic RTL layout
- [x] Mobile responsive

## 🎯 Performance

Expected load times:
- Home page: < 200ms
- Reels page: < 300ms
- API calls: < 50ms
- Cart operations: < 100ms

## 📱 Mobile Testing

Test on mobile viewport (Chrome DevTools):
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- iPad (768px)

All features should work on mobile!

---

**Happy Testing! 🚀**
