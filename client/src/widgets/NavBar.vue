<template>
  <nav class="navbar" aria-label="Site Navigation">
    <ul class="navbar__list">
      <router-link
        aria-label="Main"
        to="/"
        class="navbar__list-main navbar__list-item--main"
      >
        IT.NXT_
      </router-link>
      <li>
        <router-link
          to="/profile"
          aria-label="My profile"
          class="navbar__list-item"
        >
          <IconProfile />
        </router-link>
      </li>
      <li>
        <router-link to="/" class="navbar__list-item">
          <IconHome />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import IconProfile from '@/shared/ui/Icons/Navbar/IconProfile.vue';
import IconHome from '@/shared/ui/Icons/Navbar/IconHome.vue';
</script>

<style scoped lang="scss">
@import '@/app/styles/main.scss';

.navbar {
  position: fixed;
  background: $primary-color;
  border-radius: 20px;
  top: 5px;
  left: 5px;
  width: 35%;
}

.navbar__list {
  display: flex;
  padding-left: 0;
  height: 100%;
  align-items: center;
  list-style-type: none;

  .navbar__list-item {
    margin-right: 30px;

    &:hover {
      color: $icon-hover-color;
      transition: color 0.3s ease-in-out;
    }

    &--main {
      font-size: 32px;
      margin: 0 25px;

      &:hover {
        @include gradient-animation-hover;
      }
    }

    &:not(:hover) {
      color: $typography-light-color;
      transition: color 0.3s ease-in-out;
    }
  }
}

.navbar__list a {
  color: #ffffff;
  text-decoration: none;
}

.navbar__item--profile {
  margin-left: auto;
  margin-right: 1%;
}

@media (max-width: 768px) {
  .navbar {
    height: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navbar__list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navbar__logo {
    margin-bottom: 10px;
  }
}
</style>
