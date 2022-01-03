/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
  RouteLocationRaw,
} from 'vue-router';
import store from '@/store';
import HomePage from '../views/HomePage.vue';

type NavigationGuardReturn =
  | void
  | Error
  | RouteLocationRaw
  | boolean
  | NavigationGuardNext;

const isAuthenticated = async (
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> => {
  const { authenticated } = store.state;

  if (authenticated) {
    next();
    return;
  }

  next('/');
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/AuthPage.vue'),
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

router.beforeEach(async () => {
  await store.dispatch('fetchAuthenticated');
  return true;
});

export default router;
