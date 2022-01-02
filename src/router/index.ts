/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized,
} from 'vue-router';
import { isAuthenticated as oryIsAuthenticated, ORY_URLS } from '@/auth/ory';
import HomePage from '../views/HomePage.vue';

const isAuthenticated = async (
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
): Promise<boolean> => {
  const authenticated = await oryIsAuthenticated();
  if (authenticated) return true;

  window.location.href = ORY_URLS.LOGIN;
  return false;
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/dashboardPage" */ '../views/admin/DashboardPage.vue'),
  },
  {
    path: '/admin/speak',
    name: 'Speak',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/speakPage" */ '../views/admin/SpeakPage.vue'),
  },
  {
    path: '/admin/debug',
    name: 'Debug',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/deubgPage" */ '../views/admin/DebugPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
