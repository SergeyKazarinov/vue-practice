<template>
  <div>
    <MyCounter />
    <h1>Страница с постами</h1>
    <MyInput
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      :placeholder="'Поиск'"
    />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
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
    <div
      v-intersection="loadMorePosts"
      ref="observer"
      style="height: 30px"
    ></div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @createPost="createPost" />
    </MyDialog>
  </div>
</template>

<script lang="ts">
import MyCounter from '@/components/MyCounter.vue';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export interface IPost {
  id: number;
  title: string;
  body: string;
}

export interface IOption {
  value: string;
  name: string;
}

export type TSelectedSort = keyof Omit<IPost, 'id'>;

interface IPostData {
  dialogVisible: boolean;
}

export default defineComponent({
  components: {
    MyCounter,
    PostForm,
    PostList
  },
  data(): IPostData {
    return {
      dialogVisible: false
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
      removePost: 'post/removePost',
      createPostStore: 'post/createPost'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNumber: number) {
      this.pageNumber = pageNumber;
    },
    createPost(post: IPost) {
      this.createPostStore(post);
      this.dialogVisible = false;
    }
  },
  computed: {
    ...mapState({
      posts: (state: any) => state.post.posts,
      isPostLoading: (state: any) => state.post.isPostLoading,
      pageNumber: (state: any) => state.post.pageNumber,
      limit: (state: any) => state.post.limit,
      totalPage: (state: any) => state.post.totalPage,
      searchQuery: (state: any) => state.post.searchQuery,
      selectedSort: (state: any) => state.post.selectedSort,
      sortOptions: (state: any) => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  mounted() {
    this.fetchPosts();
  }
});
</script>

<style lang="scss">
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
