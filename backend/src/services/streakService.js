import { createStreakItem, listStreakItemsByUser, getStreakItem, addLog, removeLog, listLogs } from '../repositories/streakRepository.js';
import { findUser } from './userService.js';
import { computeStreaks } from '../utils/streakCalc.js';

export async function createStreak(userId, title) {
  const user = await findUser(userId);
  if (!user) throw new Error('User not found');
  return await createStreakItem(userId, title);
}

export async function listStreaksForUser(userId) {
  const items = await listStreakItemsByUser(userId);
  const enriched = [];
  for (const item of items) {
    const logs = await listLogs(item.id);
    const { current, longest } = computeStreaks(logs);
    enriched.push({ ...item, streak: { current, longest }, logs });
  }
  return enriched;
}

export async function getStreak(id) {
  const item = await getStreakItem(id);
  if (!item) return null;
  const logs = await listLogs(id);
  const { current, longest } = computeStreaks(logs);
  return { ...item, streak: { current, longest }, logs };
}

export async function logToday(streakId) {
  const numericId = Number(streakId);
  if (Number.isNaN(numericId)) throw new Error('Invalid streak id');
  const item = await getStreakItem(numericId);
  if (!item) throw new Error('Streak item not found');
  const todayIso = new Date().toISOString().slice(0, 10);
  await addLog(numericId, todayIso);
  return await getStreak(numericId);
}

export async function removeLogDate(streakId, date) {
  const numericId = Number(streakId);
  if (Number.isNaN(numericId)) throw new Error('Invalid streak id');
  const isoDate = typeof date === 'string' ? date : new Date(date).toISOString().slice(0, 10);
  await removeLog(numericId, isoDate);
  return await getStreak(numericId);
}
