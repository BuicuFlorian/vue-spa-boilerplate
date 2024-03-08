import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { ComputedRef, Ref } from 'vue';

import { userApi } from '@/api/user';
import type { Credentials } from '@/types/User';
import type { UserStore } from '@/types/UserStore';

export const useUserStore = defineStore('users', (): UserStore => {
  const token: Ref<string|null> = ref(localStorage.getItem('token'));
  const isLoggedIn: ComputedRef<boolean> = computed(() => !!token.value);

  const destroySession = (): void => {
    token.value = null;
    localStorage.removeItem('token');
  };

  const authenticateUser = async (credentials: Credentials): Promise<void> => {
    const jwt = await userApi.authenticate(credentials);
    
    if (jwt) {
      localStorage.setItem('token', jwt);
      token.value = jwt;
    }
  };

  const setToken = (jwt: string): void => {
    localStorage.setItem('token', jwt);
    token.value = jwt;
  }

  return { token, isLoggedIn, destroySession, setToken, authenticateUser };
})
