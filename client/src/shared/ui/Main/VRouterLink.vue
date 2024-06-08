<template>
  <router-link :class="['link', linkClass]" :to="link">
    <slot />
    {{ linkText }}
  </router-link>
</template>

<script setup lang="ts">
interface IVRouterLink {
  link: string;
  linkText?: string;
  linkClass?: string;
}

withDefaults(defineProps<IVRouterLink>(), {
  linkText: '',
});
</script>

<style lang="scss">
.link {
  text-decoration: none;
}
</style>
