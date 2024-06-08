<template>
  <div class="birthday-selector">
    <button
      aria-label="Select day"
      class="birthday-selector__button"
      @keydown="keyChange('day', $event)"
      @wheel="changeValue('day', $event)"
    >
      <span class="birthday-selector__value">{{ day }}</span>
    </button>
    <button
      aria-label="Select month"
      class="birthday-selector__button"
      @keydown="keyChange('month', $event)"
      @wheel="changeValue('month', $event)"
    >
      <span class="birthday-selector__value">{{ monthName }}</span>
    </button>
    <button
      aria-label="Select year"
      class="birthday-selector__button"
      @keydown="keyChange('year', $event)"
      @wheel="changeValue('year', $event)"
    >
      <span class="birthday-selector__value">{{ year }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentYear = new Date().getFullYear();

const maxYear = currentYear - 12;
const minYear = 1970;

const date = ref<Date>(new Date(2000, 0, 1));

const savedLanguage: string = localStorage.getItem('language') ?? 'en';

const day = computed<number>(() => date.value.getDate());
const month = computed<number>(() => date.value.getMonth() + 1);
const year = computed<number>(() => date.value.getFullYear());

const monthName = computed<string>(() =>
  date.value.toLocaleString(savedLanguage, { month: 'short' }),
);

const ensureDateBoundaries = (newDate: Date): Date => {
  if (newDate.getFullYear() < minYear) {
    newDate.setFullYear(minYear, 0, 1);
  } else if (newDate.getFullYear() > maxYear) {
    newDate.setFullYear(maxYear, 11, 31);
  }

  const maxDays: number = new Date(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    0,
  ).getDate();

  if (newDate.getDate() > maxDays) {
    newDate.setDate(maxDays);
  }

  return newDate;
};

const updateFunctions: Record<string, (date: Date, delta: number) => void> = {
  day: (date, delta) => date.setDate(date.getDate() + delta),
  month: (date, delta) => date.setMonth(date.getMonth() + delta),
  year: (date, delta) => date.setFullYear(date.getFullYear() + delta),
};

const updateValue = (type: string, delta: number) => {
  const newDate = new Date(date.value);

  if (updateFunctions[type]) {
    updateFunctions[type](newDate, delta);
  }

  date.value = ensureDateBoundaries(newDate);
};

const changeValue = (type: string, event: WheelEvent) => {
  const delta = Math.sign(event.deltaY);
  updateValue(type, delta);
};

const keyChange = (type: string, event: KeyboardEvent): void => {
  const increaseKeys: string[] = ['ArrowUp', 'E', 'e', 'У', 'у'];
  const decreaseKeys: string[] = ['ArrowDown', 'Q', 'q', 'Й', 'й'];

  if (increaseKeys.includes(event.key)) {
    updateValue(type, 1);
  } else if (decreaseKeys.includes(event.key)) {
    updateValue(type, -1);
  }
};
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.birthday-selector {
  display: flex;
  justify-content: space-between;
  color: var(--color__typography-light);
  border: 5px solid var(--color__light);
  padding: 5px;
  border-radius: 15px;

  .birthday-selector__button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-align: center;
  }

  .birthday-selector__value {
    font-weight: 600;
    font-size: 2em;
    color: var(--color__typography-light);
  }
}
</style>
