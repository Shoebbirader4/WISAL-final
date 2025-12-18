import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating thumbnail URLs...');

  await prisma.videoReel.updateMany({
    data: {
      thumbnailUrl: '',
    },
  });

  console.log('✅ Thumbnails updated!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
