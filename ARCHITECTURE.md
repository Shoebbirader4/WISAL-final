# WISAL Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     WISAL Platform                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Home Page   │  │ WISAL Reels  │  │   Product    │     │
│  │   (SSR)      │  │   (SSR)      │  │   Catalog    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Seller Portal│  │Admin Dashboard│  │  Checkout    │     │
│  │   (CSR)      │  │    (CSR)      │  │   (SSR)      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (NestJS)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Products   │  │    Orders    │  │    Users     │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Videos    │  │   Payments   │  │    Auth      │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │    Redis     │  │  S3/CDN      │     │
│  │ (Transactional)│ │  (Cache)    │  │  (Videos)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICES                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Mada     │  │   STC Pay    │  │ Cloudflare   │     │
│  │   Payment    │  │   Payment    │  │   Stream     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: WISAL Reels

```
User Opens /reels
       │
       ▼
┌─────────────────┐
│  Next.js SSR    │ ← Fetch initial reels data
│  Reels Page     │
└─────────────────┘
       │
       ▼
┌─────────────────┐
│  ReelItem       │ ← Render video player
│  Component      │
└─────────────────┘
       │
       ├─→ Video Player (HTML5)
       │   ├─→ Auto-play when in viewport
       │   └─→ Pause when out of viewport
       │
       ├─→ Product Overlay
       │   ├─→ Product name (Arabic)
       │   ├─→ Price (SAR)
       │   └─→ Add to Cart CTA
       │
       └─→ Social Actions
           ├─→ Like (POST /api/reels/:id/like)
           ├─→ Comment (POST /api/reels/:id/comment)
           └─→ Share (Native share API)
```

## User Flow: Shopping Journey

```
1. Home Page
   │
   ├─→ Browse Categories
   │   └─→ Product Listing
   │       └─→ Product Detail
   │
   └─→ WISAL Reels
       │
       ├─→ Watch Video
       │   │
       │   ├─→ Like/Comment/Share
       │   │
       │   └─→ Click Product
       │       └─→ Product Detail
       │
       └─→ Add to Cart
           │
           └─→ Checkout
               │
               ├─→ Select Payment (Mada/STC Pay)
               │
               └─→ Order Confirmation
                   │
                   └─→ Order Tracking
```

## Database Schema (Simplified)

```sql
-- Users
users
  ├─ id (PK)
  ├─ email
  ├─ role (buyer/seller/admin)
  └─ created_at

-- Products
products
  ├─ id (PK)
  ├─ seller_id (FK)
  ├─ name_ar
  ├─ name_en
  ├─ price
  └─ stock

-- Video Reels
video_reels
  ├─ id (PK)
  ├─ product_id (FK)
  ├─ video_url
  ├─ views
  ├─ likes
  └─ upload_date

-- Orders
orders
  ├─ id (PK)
  ├─ buyer_id (FK)
  ├─ total_amount
  ├─ status
  └─ created_at

-- Order Items
order_items
  ├─ id (PK)
  ├─ order_id (FK)
  ├─ product_id (FK)
  ├─ seller_id (FK)
  ├─ quantity
  └─ price
```

## API Endpoints (Planned)

```
# Products
GET    /api/products
GET    /api/products/:id
POST   /api/products (seller)
PUT    /api/products/:id (seller)
DELETE /api/products/:id (seller)

# Video Reels
GET    /api/reels
GET    /api/reels/:id
POST   /api/reels (seller)
POST   /api/reels/:id/like
POST   /api/reels/:id/comment
GET    /api/reels/:id/comments

# Orders
GET    /api/orders (buyer)
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id/status (seller)

# Cart
GET    /api/cart
POST   /api/cart/items
DELETE /api/cart/items/:id

# Payments
POST   /api/payments/mada
POST   /api/payments/stc-pay
GET    /api/payments/:id/status

# Auth
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE CDN                           │
│              (Global Edge Network)                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   LOAD BALANCER                             │
│              (AWS ALB / Nginx)                              │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌─────────────────────┐   ┌─────────────────────┐
│   Next.js Server    │   │   Next.js Server    │
│   (EC2 Instance 1)  │   │   (EC2 Instance 2)  │
└─────────────────────┘   └─────────────────────┘
                │                       │
                └───────────┬───────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   NestJS API Servers                        │
│              (Auto-scaling Group)                           │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌─────────────────────┐   ┌─────────────────────┐
│   PostgreSQL        │   │   Redis Cluster     │
│   (RDS Multi-AZ)    │   │   (ElastiCache)     │
└─────────────────────┘   └─────────────────────┘
```

## Security Layers

```
1. CDN Layer
   ├─→ DDoS Protection
   ├─→ WAF Rules
   └─→ SSL/TLS Termination

2. Application Layer
   ├─→ JWT Authentication
   ├─→ Rate Limiting
   ├─→ Input Validation
   └─→ CORS Configuration

3. Database Layer
   ├─→ Encrypted at Rest
   ├─→ VPC Isolation
   ├─→ Read Replicas
   └─→ Automated Backups

4. Payment Layer
   ├─→ PCI DSS Compliance
   ├─→ Tokenization
   └─→ 3D Secure
```

## Performance Optimization

```
Frontend
├─→ Next.js SSR/SSG
├─→ Image Optimization
├─→ Code Splitting
└─→ Lazy Loading

Backend
├─→ Redis Caching
├─→ Database Indexing
├─→ Connection Pooling
└─→ Query Optimization

Video Delivery
├─→ CDN Distribution
├─→ Adaptive Bitrate
├─→ Lazy Loading
└─→ Preloading Strategy
```

## Monitoring & Observability

```
Application Monitoring
├─→ Vercel Analytics
├─→ Sentry (Error Tracking)
└─→ Custom Metrics

Infrastructure Monitoring
├─→ CloudWatch (AWS)
├─→ Uptime Monitoring
└─→ Performance Metrics

Business Metrics
├─→ Video Engagement
├─→ Conversion Rates
├─→ Revenue Tracking
└─→ User Analytics
```
