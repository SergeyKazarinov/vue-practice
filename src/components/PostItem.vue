<template>
  <div class="post">
    <div><strong>Название: </strong>{{ post.title }}</div>
    <div><strong>Описание: </strong>{{ post.body }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true
    }
  }
});
</script>
<style></style>
