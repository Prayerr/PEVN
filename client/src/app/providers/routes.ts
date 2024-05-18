import PageLogin from '@/pages/PageLogin.vue';
import PageRegistration from '@/pages/PageRegistration.vue';
import NavBar from '@/widgets/NavBar.vue';

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
    path: '/temp',
    name: 'temp',
    component: NavBar,
  },
];

export default routes;
