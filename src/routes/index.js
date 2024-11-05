import { createWebHistory, createRouter } from 'vue-router'
import ListingView from '../views/FormView.vue'
import FormView from '../views/ListingView.vue'

const routes = [
  { path: '/', component: ListingView },
  { path: '/about', component: FormView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;