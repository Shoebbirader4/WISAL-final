import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const reels = await prisma.videoReel.findMany({
      include: {
        product: {
          include: {
            seller: {
              select: {
                id: true,
                name: true,
                nameAr: true,
              },
            },
          },
        },
      },
      orderBy: [
        { views: 'desc' },
        { uploadDate: 'desc' },
      ],
      take: 50,
    });

    // Get comment counts for all reels
    const commentCounts = await Promise.all(
      reels.map((reel) =>
        prisma.reelComment.count({
          where: { reelId: reel.id },
        })
      )
    );

    const formattedReels = reels.map((reel, index) => ({
      id: reel.id,
      videoUrl: reel.videoUrl,
      thumbnailUrl: reel.thumbnailUrl,
      duration: reel.duration,
      views: reel.views,
      likes: reel.likes,
      uploadDate: reel.uploadDate.toISOString(),
      product: {
        id: reel.product.id,
        name: reel.product.name,
        nameAr: reel.product.nameAr,
        price: reel.product.price,
        currency: reel.product.currency,
        sellerId: reel.product.sellerId,
        sellerName: reel.product.seller.nameAr || reel.product.seller.name,
        images: JSON.parse(reel.product.images),
        category: reel.product.category,
        stock: reel.product.stock,
      },
      comments: commentCounts[index],
    }));

    return NextResponse.json(formattedReels);
  } catch (error) {
    console.error('Error fetching reels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reels' },
      { status: 500 }
    );
  }
}
