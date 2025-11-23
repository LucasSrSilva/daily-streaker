import { prisma } from '../db/prismaClient.js';

export async function createUser(username) {
  return await prisma.user.create({ data: { username } });
}

export async function listUsers() {
  return await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getUser(id) {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
}
