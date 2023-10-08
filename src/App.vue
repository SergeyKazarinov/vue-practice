<template>
  <div>
    <MyCounter />
    <PostForm @createPost="createPost" />
    <!-- Короткая запись v-bind:posts - :posts -->
    <PostList v-bind:posts="posts" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostForm from '@/components/PostForm.vue';
import MyCounter from '@/components/MyCounter.vue';
import PostList from '@/components/PostList.vue';

export interface IPost {
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  components: {
    MyCounter,
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [
        { id: 1, title: 'JavaScript', body: 'Описание поста' },
        { id: 2, title: 'JavaScript', body: 'Описание поста' },
        { id: 3, title: 'JavaScript', body: 'Описание поста' }
      ],
      title: '',
      body: ''
    };
  },
  methods: {
    createPost(post: IPost) {
      this.posts.push(post);
    }
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --teal-color: teal;
}

.app {
  padding: 20px;
}
</style>
