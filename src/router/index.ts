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
    path: '/admin/statistics',
    name: 'Statistics',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/statisticsPage" */ '../views/admin/StatisticsPage.vue'),
  },
  {
    path: '/admin/speak',
    name: 'Speak',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/speakPage" */ '../views/admin/SpeakPage.vue'),
  },
  {
    path: '/admin/commands',
    name: 'Commands',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/commandsPage" */ '../views/admin/CommandsPage.vue'),
  },
  {
    path: '/admin/commands/lists/create',
    name: 'Create command list',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/createCommandListPage" */ '../views/admin/CreateCommandListPage.vue'),
  },
  {
    path: '/admin/commands/lists/:id/update',
    name: 'Update command list',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/updateCommandListPage" */ '../views/admin/UpdateCommandListPage.vue'),
  },
  {
    path: '/admin/flows',
    name: 'Flows',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/flows/FlowsPage" */ '../views/admin/flows/FlowsPage.vue'),
  },
  {
    path: '/admin/flows/reactionFlows/create',
    name: 'Create reaction flow',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/flows/reactionFlows/ReactionFlowCreatePage" */ '../views/admin/flows/reactionFlows/ReactionFlowCreatePage.vue'),
  },
  {
    path: '/admin/flows/reactionFlows/:id/update',
    name: 'Update reaction flow',
    beforeEnter: [isAuthenticated],
    component: () => import(/* webpackChunkName: "admin/flows/reactionFlows/ReactionFlowUpdatePage" */ '../views/admin/flows/reactionFlows/ReactionFlowUpdatePage.vue'),
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
