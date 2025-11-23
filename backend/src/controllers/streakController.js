import { createStreak, listStreaksForUser, getStreak, logToday, removeLogDate } from '../services/streakService.js';

export async function createStreakHandler(req, res, next) {
  try {
    const { userId, title } = req.body;
    if (!userId || !title) return res.status(400).json({ error: 'userId and title required' });
    const item = await createStreak(userId, title);
    res.status(201).json(item);
  } catch (err) { next(err); }
}

export async function listStreaksHandler(req, res, next) {
  try {
    const { userId } = req.params;
    const streaks = await listStreaksForUser(parseInt(userId));
    res.json(streaks);
  } catch (err) { next(err); }
}

export async function getStreakHandler(req, res, next) {
  try {
    const { id } = req.params;
    const streak = await getStreak(parseInt(id));
    if (!streak) return res.status(404).json({ error: 'not found' });
    res.json(streak);
  } catch (err) { next(err); }
}

export async function logHandler(req, res, next) {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return res.status(400).json({ error: 'invalid id' });
    const updated = await logToday(numericId);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteLogHandler(req, res, next) {
  try {
    const { id, date } = req.params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return res.status(400).json({ error: 'invalid id' });
    const updated = await removeLogDate(numericId, date);
    res.json(updated);
  } catch (err) { next(err); }
}
