<template>
  <div class="v-dropdown">
    <button @click="toggleDropdown" class="v-dropdown-button">
      {{ modelValue }}
      <IconArrow :class="['v-dropdown-icon', { 'rotate-icon': isOpen }]" />
    </button>
    <div v-if="isOpen" class="v-dropdown-menu">
      <ul class="v-dropdown-list">
        <li v-for="(item, index) in items" :key="index">
          <button class="v-dropdown-item" @click="selectItem(item)">
            {{ item }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconArrow from '../../Icons/IconArrow.vue';

interface VDropdown {
  modelValue: string;
  items: string[];
}

const emit = defineEmits(['update:modelValue']);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (item: string) => {
  emit('update:modelValue', item);
  isOpen.value = false;
};

defineProps<VDropdown>();
</script>

<style lang="scss">
@import '../../../../app/styles/main.scss';

.v-dropdown {
  position: relative;
  display: inline-block;
  font-weight: 600;

  .v-dropdown-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--size__font-medium);
    font-weight: 600;
    background-color: var(--color__primary);
    color: var(--color__typography-light);
    border: 5px solid var(--color__light);
    padding: 3% 5%;
    border-radius: 15px;
    cursor: pointer;
  }

  .v-dropdown-icon {
    margin-left: 200px;
    transition: transform 0.3s ease;
  }

  .rotate-icon {
    transform: rotate(180deg);
  }
  .v-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 999;
    background-color: var(--color__primary);
    border: 1px solid var(--color__light);
    color: var(--color__light);
    min-width: 400px;
    margin-top: 5px;
    padding: 0;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }

  .v-dropdown-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .v-dropdown-item {
      width: 100%;
      padding: 10px;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      font-size: var(--size__font-medium);
      color: var(--color__light);

      &:hover {
        background-color: var(--color__hover-light);
      }
    }
  }
}
</style>
