import PageLogin from '@/pages/PageLogin.vue';
import PageRegistration from '@/pages/PageRegistration.vue';

const routes = [
  {
    path: '/registration',
    name: 'Registration',
    component: PageRegistration,
  },
  {
    path: '/login',
    name: 'Login',
    component: PageLogin,
  },
];

export default routes;
