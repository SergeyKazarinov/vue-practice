<template>
  <select class="select" :value="modelValue" @change="changeOptions">
    <option disabled value="">Выберите тип сортировки</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
<script lang="ts">
import type { IOption } from '@/pages/PostPage.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MySelect',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array<IOption>,
      default: () => []
    }
  },
  methods: {
    changeOptions(option: Event) {
      this.$emit(
        'update:modelValue',
        (option.target as HTMLSelectElement).value
      );
    }
  }
});
</script>
<style scoped>
.select {
  border-radius: 10px;
  border: 1px solid var(--teal-color);
  color: var(--teal-color);
}
</style>
