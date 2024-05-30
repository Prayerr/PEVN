<template>
  <div class="v-progress">
    <ul class="v-progress__steps">
      <li></li>
    </ul>
    <span v-if="stepLabel" class="v-progress__label">{{ stepLabel }}</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss"></style>
