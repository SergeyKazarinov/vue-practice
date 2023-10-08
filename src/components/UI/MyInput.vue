<template>
  <input class="input" :value="modelValue" @input="updateInput" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyInput',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event: Event) {
      const element = event.target as HTMLInputElement;
      this.$emit('update:modelValue', element.value);
    }
  }
});
</script>

<style>
.input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--teal-color);
}
</style>
