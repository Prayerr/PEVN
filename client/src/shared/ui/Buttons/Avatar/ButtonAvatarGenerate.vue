<template>
  <VButton text="generate" @click="generateAvatar" />
  <canvas ref="canvas" width="100" height="100"></canvas>
</template>

<script setup lang="ts">
import VButton from '../../Main/Buttons/VButton.vue';
</script>

<style lang="scss"></style>
