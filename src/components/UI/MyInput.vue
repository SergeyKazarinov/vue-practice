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
      // Используется двухсторонне связывание без именования. В этом случае используется modelValue (именнованное было бы так update:value)
      // в родителе используется v-model
      this.$emit('update:modelValue', element.value);
    }
  }
});
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--teal-color);
}
</style>
