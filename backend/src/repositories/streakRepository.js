import { prisma } from '../db/prismaClient.js';

export async function createStreakItem(userId, title) {
  return await prisma.streakItem.create({ data: { userId, title } });
}

export async function listStreakItemsByUser(userId) {
  return await prisma.streakItem.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

export async function getStreakItem(id) {
  return await prisma.streakItem.findUnique({ where: { id: Number(id) } });
}

export async function addLog(streakItemId, date) {
  const logDate = toDateMidnight(date);
  try {
    return await prisma.streakLog.create({ data: { streakItemId, logDate } });
  } catch (e) {
    if (e.code === 'P2002') return null;
    throw e;
  }
}

export async function removeLog(streakItemId, date) {
  const logDate = toDateMidnight(date);
  const result = await prisma.streakLog.deleteMany({ where: { streakItemId, logDate } });
  return result.count > 0;
}

export async function listLogs(streakItemId) {
  const rows = await prisma.streakLog.findMany({ where: { streakItemId }, select: { logDate: true }, orderBy: { logDate: 'desc' } });
  return rows.map(r => r.logDate);
}

function toDateMidnight(d) {
  const s = typeof d === 'string' ? d : (d instanceof Date ? d.toISOString().slice(0,10) : String(d));
  return new Date(s + 'T00:00:00Z');
}
