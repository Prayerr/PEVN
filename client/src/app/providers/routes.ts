import PageLogin from '@/pages/PageLogin.vue';
import PageRegistration from '@/pages/PageRegistration.vue';
import DropdownDirection from '@/shared/ui/Dropdowns/DropdownDirection.vue';

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
    component: DropdownDirection,
  },
];

export default routes;
