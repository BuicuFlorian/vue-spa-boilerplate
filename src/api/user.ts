import type { Credentials, NewUser } from '@/types/User';
import { http } from '@/utils/http';

/**
 * Authenticate the given user.
 * 
 * @param {Credentials} credentials 
 */
async function authenticate(credentials: Credentials): Promise<string> {
  const data = await http.post('/api/login', credentials);

  return data.token;
}

/**
 * Create a new account.
 * 
 * @param {NewUser} user 
 * @returns {Promise<any>}
 */
async function registerUser(user: NewUser): Promise<any> {
  return await http.post('/api/sign-up', user);
}

export const userApi = {
  authenticate,
  registerUser
}