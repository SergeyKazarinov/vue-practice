<template>
  <div>
    <h3>Список постов</h3>
    <PostItem
      :post="post"
      v-for="post in posts"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
  </div>
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

<style scoped></style>
