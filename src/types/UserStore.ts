import type { ComputedRef, Ref } from 'vue';
import type { Credentials } from './User';

export interface UserStore { 
  token: Ref<string|null>;
  isLoggedIn: ComputedRef<boolean>;
  destroySession(): void;
  authenticateUser(credentials: Credentials): Promise<void>;
  setToken(jwt: string): void;
}