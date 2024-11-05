import { createWebHistory, createRouter } from 'vue-router'

import ListingView from './ListingView.vue'
import FormView from './FormView.vue'

const routes = [
  { path: '/', component: ListingView },
  { path: '/about', component: FormView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;