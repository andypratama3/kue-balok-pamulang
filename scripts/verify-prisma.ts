import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

async function main() {
  const connectionString =
    process.env.DATABASE_URL ?? process.env.DIRECT_URL;
  if (!connectionString) {
    console.error('✖ DATABASE_URL / DIRECT_URL belum diisi di .env');
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const products = await prisma.product.findMany({
    orderBy: { sort_order: 'asc' },
  });
  console.log(`Total produk via Prisma: ${products.length}`);
  for (const p of products) {
    console.log(`- ${p.name} | Rp ${p.price.toLocaleString('id-ID')} | ${p.image}`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
