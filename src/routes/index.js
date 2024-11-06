import { createWebHistory, createRouter } from 'vue-router'
import FormView from '@/views/FormView.vue'
import HomePageView from '@/views/HomePageView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePageView
  },
  {
    path: '/create',
    name: 'Create',
    component: FormView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;