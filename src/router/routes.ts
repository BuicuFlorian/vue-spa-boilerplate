import type { RouteRecordRaw } from 'vue-router';

import DashboardView from '@/views/Dashboard.vue';
import LoginView from '@/views/Login.vue';
import { userStore } from '@/stores';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: userStore.isLoggedIn ? 'dashboard' : 'login'
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { forVisitors: true }
  },

  {
    path: '/sign-up',
    name: 'signup',
    component: () => import('@/views/SignUp.vue'),
    meta: { forVisitors: true }
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { forAuth: true }
  },

  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/PageNotFound.vue')
  },

  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
];