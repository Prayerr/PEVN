<template>
  <div class="dropdown-direction">
    <span class="dropdown-label">{{ $t('direction') }}</span>
    <VDropdown v-model="selectedItem" :items="translatedItems" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import VDropdown from '../Main/Dropdown/VDropdown.vue';

const { t } = useI18n();

const itemsDirections = [
  'directions.programming',
  'directions.design',
  'directions.information security',
  'directions.microelectronics',
  'directions.media',
  'directions.other',
];

const translatedItems = computed<string[]>(() =>
  itemsDirections.map((key) => t(key)),
);

const selectedItem = ref<string>(translatedItems.value[5]);
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.dropdown-direction {
  display: flex;
  flex-direction: column;
  align-items: center;

  .dropdown-label {
    font-weight: 600;
    color: var(--color__typography-light);
    font-size: var(--size__font-medium);
  }
}
</style>
