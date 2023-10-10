<template>
  <div>
    <MyCounter />
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" :placeholder="'Поиск'" />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <!-- Короткая запись v-bind:posts - :posts -->
    <PostList
      v-if="!isPostLoading"
      v-bind:posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
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

export interface IOption {
  value: string;
  name: string;
}

type TSelectedSort = keyof Omit<IPost, 'id'>;

interface IAppData {
  posts: IPost[];
  dialogVisible: boolean;
  isPostLoading: boolean;
  selectedSort: TSelectedSort | '';
  sortOptions: IOption[];
  searchQuery: string;
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
      isPostLoading: false,
      searchQuery: '',
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' }
      ]
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
  },
  watch: {
    // имя функции должно быть таким же, как и название свойства в data
    selectedSort(newValue: TSelectedSort) {
      // this.posts.sort(
      //   (post1, post2) => post1[newValue]?.localeCompare(post2[newValue])
      // );
    },
    // этот способ изменяет стейт постов, для корректной работы необходимо создавать отдельный стейт. Лучше использовать computed свойство, т.к. он не изменяет стейт, а вовзращает новый массив
    searchQuery(value: string) {
      // this.posts = this.posts.filter((post) =>
      // post.title.toLowerCase().includes(value.toLowerCase())
      // );
    }
  },
  // либо использовать computed свойство для сортировке. Тогда sortedPosts необходимо забиндить в postList вместо posts
  computed: {
    sortedPosts() {
      return [...this.posts].sort(
        (post1, post2) =>
          post1[this.selectedSort as TSelectedSort]?.localeCompare(
            post2[this.selectedSort as TSelectedSort]
          )
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>
