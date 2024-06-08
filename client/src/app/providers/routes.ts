import PageLogin from '@/pages/PageLogin.vue';
import PageRegistration from '@/pages/PageRegistration.vue';
import PageMain from '@/pages/PageMain.vue';

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
  {
    path: '/',
    name: 'Main',
    component: PageMain,
  },
  {
    path: '/temp',
    name: 'temp',
  },
];

export default routes;
