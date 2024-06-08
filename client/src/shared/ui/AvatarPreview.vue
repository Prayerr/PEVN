<template>
  <div class="avatar__container">
    <img v-if="src" alt="Avatar Preview" class="avatar-preview" :src="src" />
  </div>
</template>

<script setup lang="ts">
interface IAvatarPreview {
  src: string | null;
}

defineProps<IAvatarPreview>();
</script>

<style lang="scss">
@import '../../app/styles/main.scss';

.avatar-container {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background-color: var(--color__light);
}

.avatar-preview {
  width: 100%;
  height: auto;
}
</style>
