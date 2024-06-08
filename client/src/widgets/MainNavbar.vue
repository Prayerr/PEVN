<template>
  <div class="navbar">
    <ul class="navbar__items">
      <li>
        <LinkHome class="navbar__link" />
        <LinkProfile class="navbar__link" />
        <DropdownNavbar />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import LinkHome from '@/shared/ui/Links/LinkHome.vue';
import LinkProfile from '@/shared/ui/Links/LinkProfile.vue';
import DropdownNavbar from '@/shared/ui/Dropdowns/DropdownNavbar.vue';
</script>

<style lang="scss">
@import '../app/styles/main.scss';

.navbar {
  background-color: var(--color__primary);
  display: flex;
  width: 35%;
  margin: 10px;
  border-radius: 100px;

  .navbar__items {
    list-style: none;
  }

  .navbar__link {
    color: var(--color__light);
    margin-right: 40px;

    &:hover {
      @include link-hover;
    }
  }
}
</style>
