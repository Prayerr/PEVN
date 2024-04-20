import { createRouter, createWebHistory } from 'vue-router';

import RegistrationForm from '../components/RegistrationForm.vue';
import AuthForm from '../components/AuthForm.vue';
import Profile from '../components/UserMain.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegistrationForm,
  },
  {
    path: '/login',
    name: 'Auth',
    component: AuthForm,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
