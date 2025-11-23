import { registerUser, getAllUsers, findUser } from '../services/userService.js';

export async function createUserHandler(req, res, next) {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'username required' });
    const user = await registerUser(username);
    res.status(201).json(user);
  } catch (err) { next(err); }
}

export async function listUsersHandler(req, res, next) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) { next(err); }
}

export async function getUserHandler(req, res, next) {
  try {
    const { id } = req.params;
    const user = await findUser(id);
    if (!user) return res.status(404).json({ error: 'not found' });
    res.json(user);
  } catch (err) { next(err); }
}
