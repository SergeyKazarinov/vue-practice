<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyButton'
});
</script>
<style scoped lang="scss">
.btn {
  padding: 10px 15px;
  background: none;
  color: var(--teal-color);
  border: 1px solid var(--teal-color);
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
}
</style>
