<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import toggleMixin from '@/mixins/toggleMixin';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyDialog',
  mixins: [toggleMixin] // закоментированный код ниже заменяет данный миксин
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // methods: {
  //   hideDialog() {
  //     // двухсторонее связывание именнованное - у родителя используется v-model:show
  //     this.$emit('update:show', false);
  //   }
  // }
});
</script>

<style scoped>
.dialog {
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 320px;
  padding: 15px;
}
</style>
