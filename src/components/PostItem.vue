<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
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
<style scoped>
.post {
  padding: 15px;
  border: 2px solid var(--teal-color);
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
