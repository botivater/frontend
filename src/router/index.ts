import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';

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
    component: () => import(/* webpackChunkName: "admin/dashboardPage" */ '../views/admin/DashboardPage.vue'),
  },
  {
    path: '/admin/speak',
    name: 'Speak',
    component: () => import(/* webpackChunkName: "admin/speakPage" */ '../views/admin/SpeakPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
