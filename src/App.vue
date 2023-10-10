<template>
  <div>
    <MyCounter />
    <h1>Страница с постами</h1>
    <MyButton class="createBtn" @click="showDialog">Создать пост</MyButton>
    <!-- Короткая запись v-bind:posts - :posts -->
    <PostList v-if="!isPostLoading" v-bind:posts="posts" @remove="removePost" />
    <div v-else>Идет загрузка...</div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @createPost="createPost" />
    </MyDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostForm from '@/components/PostForm.vue';
import MyCounter from '@/components/MyCounter.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';

export interface IPost {
  id: number;
  title: string;
  body: string;
}

interface IAppData {
  posts: IPost[];
  dialogVisible: boolean;
  isPostLoading: boolean;
}

export default defineComponent({
  components: {
    MyCounter,
    PostForm,
    PostList
  },
  data(): IAppData {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false
    };
  },
  methods: {
    createPost(post: IPost) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post: IPost) {
      this.posts = this.posts?.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const result = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        );

        this.posts = result.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isPostLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
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

.createBtn {
  margin: 15px 0;
}
</style>
