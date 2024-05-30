<template>
  <VDropdown
    :items="languages"
    v-model="selectedLanguage"
    @update:modelValue="changeLanguage"
    class="language-selector"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import VDropdown from '@/shared/ui/Main/Dropdown/VDropdown.vue';

const { locale } = useI18n();

const languages: string[] = ['en', 'ru'];

const selectedLanguage = ref<string>(localStorage.getItem('language') ?? 'en');

const changeLanguage = (language: string) => {
  locale.value = language;
  localStorage.setItem('language', language);
};
</script>

<style scoped lang="scss">
@import '../../app/styles/main.scss';
</style>
