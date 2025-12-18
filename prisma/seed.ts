import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@wisal.sa' },
    update: {},
    create: {
      email: 'buyer@wisal.sa',
      password: hashedPassword,
      name: 'Ahmed Al-Saud',
      nameAr: 'أحمد السعود',
      role: 'BUYER',
      phone: '+966501234567',
    },
  });

  const seller1 = await prisma.user.upsert({
    where: { email: 'seller1@wisal.sa' },
    update: {},
    create: {
      email: 'seller1@wisal.sa',
      password: hashedPassword,
      name: 'Elegance Store',
      nameAr: 'متجر الأناقة',
      role: 'SELLER',
      phone: '+966507654321',
    },
  });

  const seller2 = await prisma.user.upsert({
    where: { email: 'seller2@wisal.sa' },
    update: {},
    create: {
      email: 'seller2@wisal.sa',
      password: hashedPassword,
      name: 'Tech Store',
      nameAr: 'تك ستور',
      role: 'SELLER',
      phone: '+966509876543',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@wisal.sa' },
    update: {},
    create: {
      email: 'admin@wisal.sa',
      password: hashedPassword,
      name: 'Admin User',
      nameAr: 'المسؤول',
      role: 'ADMIN',
    },
  });

  console.log('✅ Users created');

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Premium Leather Bag',
      nameAr: 'حقيبة جلدية فاخرة',
      description: 'High-quality leather bag with elegant design',
      descriptionAr: 'حقيبة جلدية عالية الجودة بتصميم أنيق',
      price: 299.99,
      stock: 15,
      category: 'fashion',
      images: JSON.stringify(['/products/bag1.jpg', '/products/bag2.jpg']),
      sellerId: seller1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Wireless Headphones',
      nameAr: 'سماعات لاسلكية',
      description: 'Premium wireless headphones with noise cancellation',
      descriptionAr: 'سماعات لاسلكية فاخرة مع عزل الضوضاء',
      price: 449.99,
      stock: 30,
      category: 'electronics',
      images: JSON.stringify(['/products/headphones1.jpg']),
      sellerId: seller2.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Smart Watch Pro',
      nameAr: 'ساعة ذكية برو',
      description: 'Advanced smartwatch with health tracking',
      descriptionAr: 'ساعة ذكية متقدمة مع تتبع صحي',
      price: 899.99,
      stock: 20,
      category: 'electronics',
      images: JSON.stringify(['/products/watch1.jpg', '/products/watch2.jpg']),
      sellerId: seller2.id,
    },
  });

  console.log('✅ Products created');

  // Create video reels
  await prisma.videoReel.create({
    data: {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: '',
      duration: 30,
      views: 125000,
      likes: 8500,
      productId: product1.id,
      sellerId: seller1.id,
    },
  });

  await prisma.videoReel.create({
    data: {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnailUrl: '',
      duration: 25,
      views: 89000,
      likes: 5200,
      productId: product2.id,
      sellerId: seller2.id,
    },
  });

  await prisma.videoReel.create({
    data: {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: '',
      duration: 15,
      views: 156000,
      likes: 12300,
      productId: product3.id,
      sellerId: seller2.id,
    },
  });

  console.log('✅ Video reels created');
  console.log('\n🎉 Seeding completed!');
  console.log('\n📧 Test accounts:');
  console.log('   Buyer: buyer@wisal.sa / password123');
  console.log('   Seller 1: seller1@wisal.sa / password123');
  console.log('   Seller 2: seller2@wisal.sa / password123');
  console.log('   Admin: admin@wisal.sa / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
