import { Router } from 'express';
import { createUserHandler, listUsersHandler, getUserHandler } from '../controllers/userController.js';
import { createStreakHandler, listStreaksHandler, getStreakHandler, logHandler, deleteLogHandler } from '../controllers/streakController.js';

const router = Router();

router.get('/health', (_, res) => res.json({ ok: true }));

// Users
router.post('/users', createUserHandler);
router.get('/users', listUsersHandler);
router.get('/users/:id', getUserHandler);

// Streaks
router.post('/streaks', createStreakHandler);
router.get('/users/:userId/streaks', listStreaksHandler);
router.get('/streaks/:id', getStreakHandler);
router.post('/streaks/:id/log', logHandler);
router.delete('/streaks/:id/log/:date', deleteLogHandler);

export default router;
