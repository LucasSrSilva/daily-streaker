import { createUser, listUsers, getUser } from '../repositories/usersRepository.js';

export async function registerUser(username) {
  return await createUser(username);
}

export async function getAllUsers() {
  return await listUsers();
}

export async function findUser(id) {
  return await getUser(id);
}
