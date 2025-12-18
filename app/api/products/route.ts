import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const relatedTo = searchParams.get('relatedTo'); // For related products

    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { nameAr: { contains: search } },
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Related products - same category, exclude current product
    if (relatedTo) {
      const currentProduct = await prisma.product.findUnique({
        where: { id: relatedTo },
        select: { category: true },
      });
      if (currentProduct) {
        where.category = currentProduct.category;
        where.NOT = { id: relatedTo };
      }
    }

    // Sorting
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price-asc') orderBy = { price: 'asc' };
    if (sortBy === 'price-desc') orderBy = { price: 'desc' };
    if (sortBy === 'name') orderBy = { name: 'asc' };

    const products = await prisma.product.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            nameAr: true,
          },
        },
      },
      orderBy,
      take: relatedTo ? 6 : undefined, // Limit related products
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      images: JSON.parse(product.images),
      sellerName: product.seller.nameAr || product.seller.name,
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
