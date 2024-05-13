import { createRouter, createWebHistory } from 'vue-router';

import AuthForm from '../components/AuthForm.vue';
import NavBar from '../components/NavBar.vue';
import UserProfile from '../components/UserProfile.vue';
import RegistrationForm from '../components/RegistrationForm.vue';

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
    path: '/profile/:username',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/temp',
    name: 'temp',
    component: NavBar,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
