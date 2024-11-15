import { createWebHistory, createRouter } from 'vue-router'
import FormView from '@/views/FormView.vue'
import HomePageView from '@/views/HomePageView.vue';
import EditForm from '@/components/EditForm.vue';
import OrganizationListing from '@/components/Organization/OrganizationListing.vue';
import RegisterOrg from '@/components/Organization/RegisterOrg.vue';

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
  },
  {
    path: '/organization/listing',
    name: 'ListingOrganization',
    component: OrganizationListing
  },
  {
    path: '/organization/register/',
    name: 'RegisterOrganization',
    component: RegisterOrg
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;