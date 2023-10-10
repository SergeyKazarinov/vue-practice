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
    <div class="page__wrapper">
      <div
        class="page"
        v-for="page in totalPage"
        :key="page"
        :class="{ page_active: page === pageNumber }"
        @click="changePage(page)"
      >
        {{ page }}
      </div>
    </div>
    <div ref="observer" style="height: 30px"></div>
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
  pageNumber: number;
  limit: number;
  totalPage: number;
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
      pageNumber: 1,
      limit: 10,
      totalPage: 0,
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
    changePage(pageNumber: number) {
      this.pageNumber = pageNumber;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const result = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.pageNumber,
              _limit: this.limit
            }
          }
        );
        this.totalPage = Math.ceil(
          result.headers['x-total-count'] / this.limit
        );

        this.posts = result.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.pageNumber += 1;
        const result = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.pageNumber,
              _limit: this.limit
            }
          }
        );
        this.posts = [...this.posts, ...result.data];
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && this.pageNumber < this.totalPage) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);

    observer.observe(this.$refs.observer as Element);
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
    // для пагинации постраничной
    // pageNumber() {
    //   this.fetchPosts();
    // }
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

<style lang="scss">
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

.page__wrapper {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;

  &_active {
    border: 2px solid var(--teal-color);
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
