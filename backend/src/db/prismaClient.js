import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
