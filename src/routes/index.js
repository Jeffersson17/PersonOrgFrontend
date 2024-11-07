import { createWebHistory, createRouter } from 'vue-router'
import FormView from '@/views/FormView.vue'
import HomePageView from '@/views/HomePageView.vue';
import EditForm from '@/components/EditForm.vue';

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
  {
    path: '/update/:id',
    name: 'Update',
    component: EditForm,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;