import { createWebHistory, createRouter } from 'vue-router'
import FormView from '@/views/FormView.vue'
import Listing from '@/components/PeopleListing.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Listing
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