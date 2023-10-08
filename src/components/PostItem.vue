<template>
  <div class="post">
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <MyButton>Удалить</MyButton>
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

.post__btns {
}
</style>
