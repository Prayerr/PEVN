<template>
  <div class="dropdown">
    <button class="dropdown__button" type="button" @click="toggleDropdown">
      {{ modelValue }}
      <IconArrow
        :class="['dropdown__icon', { 'dropdown__icon--rotated': isOpen }]"
      />
    </button>
    <div v-if="isOpen" class="dropdown__menu">
      <ul class="dropdown__list">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="dropdown__list-item"
        >
          <button
            class="dropdown__item"
            type="button"
            @click="selectItem(item)"
          >
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
  items: string[];
}

defineProps<VDropdown>();

const modelValue = defineModel<string>('modelValue', { default: '' });

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (item: string) => {
  modelValue.value = item;
  isOpen.value = false;
};
</script>

<style lang="scss">
@import '../../../../app/styles/main.scss';

.dropdown {
  position: relative;
  display: inline-block;

  &__button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--size__font-medium);
    font-weight: 600;
    background-color: var(--color__primary);
    color: var(--color__typography-light);
    border: 5px solid var(--color__light);
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
  }

  &__icon {
    margin-left: 10px;
    transition: transform 0.3s ease;
  }

  &__icon--rotated {
    transform: rotate(180deg);
  }

  &__menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 999;
    background-color: var(--color__primary);
    border: 2px solid var(--color__light);
    color: var(--color__light);
    min-width: 200px;
    margin-top: 5px;
    padding: 0;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__list-item {
    .dropdown__item {
      font-weight: 600;
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
