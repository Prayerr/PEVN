<template>
  <div>
    <input
      accept="image/*"
      class="avatar-edit"
      name="avatar-edit"
      type="file"
      @change="onFileChange"
    />
    <AvatarPreview :src="previewURL" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useTranslateItem from '@/shared/lib/use/useTranslateItem';
import AvatarPreview from '../AvatarPreview.vue';

const previewURL = ref<string | null>(null);
const error = ref<string>('');

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files[0]) {
    const file = files[0];

    if (file.size > 2 * 1024 * 1024) {
      error.value = useTranslateItem('fileSizeError');
      return;
    }

    previewURL.value = URL.createObjectURL(file);
  }
};
</script>

<style lang="scss">
.avatar-edit {
  display: block;
  margin-bottom: 1rem;
}

.avatar-preview {
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  margin-top: 1rem;
}

.error {
  color: red;
}
</style>
