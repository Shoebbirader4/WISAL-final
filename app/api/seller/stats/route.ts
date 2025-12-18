import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// GET /api/seller/stats - Get seller statistics
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userCookie.value);

    if (user.role !== 'SELLER' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get total products
    const totalProducts = await prisma.product.count({
      where: { sellerId: user.id },
    });

    // Get low stock products (stock < 10)
    const lowStockProducts = await prisma.product.count({
      where: {
        sellerId: user.id,
        stock: { lt: 10 },
      },
    });

    // Get total orders and revenue
    const orderItems = await prisma.orderItem.findMany({
      where: { sellerId: user.id },
      include: { order: true },
    });

    const totalOrders = new Set(orderItems.map(item => item.orderId)).size;
    const totalRevenue = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockProducts,
    });
  } catch (error) {
    console.error('Error fetching seller stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
