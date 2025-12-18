# Deployment Guide

## Production Build

```bash
npm run build
npm start
```

## Deployment Options

### 1. Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Configuration:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
- Add all variables from `.env.local.example`

### 2. AWS (EC2 + CloudFront)

**EC2 Setup:**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and build
git clone <repo>
cd wisal-marketplace
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "wisal" -- start
pm2 save
pm2 startup
```

**CloudFront:**
- Create distribution pointing to EC2
- Configure for video delivery
- Enable HTTPS

### 3. Docker

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t wisal-marketplace .
docker run -p 3000:3000 wisal-marketplace
```

## Environment Variables

Required for production:

```env
# API
NEXT_PUBLIC_API_URL=https://api.wisal.sa

# Video CDN
NEXT_PUBLIC_VIDEO_CDN_URL=https://video.wisal.sa

# Database
DATABASE_URL=postgresql://user:pass@host:5432/wisal
REDIS_URL=redis://host:6379

# Payments
MADA_API_KEY=prod_key
STC_PAY_API_KEY=prod_key

# Auth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://wisal.sa
```

## Performance Optimization

### 1. Video CDN Setup

**Cloudflare Stream:**
```typescript
// Configure in next.config.ts
images: {
  domains: ['customer-code.cloudflarestream.com'],
}
```

**AWS CloudFront:**
- Create S3 bucket for videos
- Set up CloudFront distribution
- Enable caching policies

### 2. Database Optimization

**PostgreSQL:**
- Index on product_id, seller_id
- Partitioning for orders table
- Connection pooling

**Redis:**
- Cache video feed data
- Session storage
- Rate limiting

### 3. CDN Configuration

- Enable Gzip/Brotli compression
- Set cache headers
- Optimize images with Next.js Image

## Monitoring

### Application Monitoring
- Vercel Analytics
- Google Analytics
- Sentry for error tracking

### Performance Metrics
- Core Web Vitals
- Video load times
- API response times

## Security

### SSL/TLS
- Use HTTPS everywhere
- Configure HSTS headers

### API Security
- Rate limiting
- CORS configuration
- API key rotation

### Payment Security
- PCI DSS compliance
- Secure payment gateway integration
- Encrypted data transmission

## Scaling

### Horizontal Scaling
- Load balancer (AWS ALB/ELB)
- Multiple EC2 instances
- Auto-scaling groups

### Database Scaling
- Read replicas
- Connection pooling
- Query optimization

### CDN Scaling
- Multi-region distribution
- Edge caching
- Video transcoding

## Backup Strategy

### Database Backups
- Daily automated backups
- Point-in-time recovery
- Cross-region replication

### Media Backups
- S3 versioning
- Glacier for archival
- Regular backup testing

## Rollback Plan

```bash
# Vercel
vercel rollback

# PM2
pm2 reload wisal --update-env

# Docker
docker pull wisal-marketplace:previous-tag
docker-compose up -d
```

## Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
```

## Launch Checklist

- [ ] Production build tested
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] CDN configured for videos
- [ ] Payment gateways tested
- [ ] SSL certificates installed
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Arabic/RTL layout verified
- [ ] Mobile responsiveness tested
- [ ] SEO optimization complete
