import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';

import { routes } from './routes';
import { userStore } from '@/stores';

export function routerFactory(): Router {
  const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });

  router.beforeEach((to, from, next) => {
    if (to.meta.forVisitors) {
      if (userStore.isLoggedIn) {
        next({ path: '/dashboard' });
      } else {
        next();
      }
    } else if (to.meta.forAuth) {
      if (!userStore.isLoggedIn) {
        next('/login');
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return router;
}
