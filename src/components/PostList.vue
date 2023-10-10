<template>
  <div v-if="posts && posts?.length > 0">
    <h3>Список постов</h3>
    <TransitionGroup name="post-list">
      <PostItem
        :post="post"
        v-for="post in posts"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </TransitionGroup>
  </div>
  <h2 v-else class="title">Список постов пустой</h2>
</template>

<script lang="ts">
import type { IPost } from '@/App.vue';
import { defineComponent } from 'vue';
import PostItem from './PostItem.vue';

export default defineComponent({
  props: {
    posts: {
      type: Array<IPost>,
      require: true
    }
  },
  components: { PostItem }
});
</script>

<style scoped>
.title {
  color: red;
}

.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
