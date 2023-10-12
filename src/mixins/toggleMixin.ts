import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      // двухсторонее связывание именнованное - у родителя используется v-model:show
      this.$emit('update:show', false);
    }
  },
  mounted() {}
});
