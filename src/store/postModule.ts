import type { IOption, IPost } from '@/pages/PostPage.vue';
import type { TSelectedSort } from '@/pages/PostPageWithStore.vue';
import axios from 'axios';
import type { ActionContext, Commit } from 'vuex/types/index.js';

interface IPostData {
  posts: IPost[];
  isPostLoading: boolean;
  selectedSort: TSelectedSort | '';
  sortOptions: IOption[];
  pageNumber: number;
  limit: number;
  totalPage: number;
  searchQuery: string;
}

export const postModule = {
  namespaced: true,
  state: (): IPostData => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state: IPostData) {
      return [...state.posts].sort(
        (post1, post2) =>
          post1[state.selectedSort as TSelectedSort]?.localeCompare(
            post2[state.selectedSort as TSelectedSort]
          )
      );
    },
    sortedAndSearchedPosts(state: IPostData, getters: any) {
      return (getters.sortedPosts as IPost[]).filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }
  },
  mutations: {
    setPosts(state: IPostData, posts: IPost[]) {
      state.posts = posts;
    },
    setIsPostLoading(state: IPostData, boolean: boolean) {
      state.isPostLoading = boolean;
    },
    setPageNumber(state: IPostData, page: number) {
      state.pageNumber = page;
    },
    setSelectedSort(state: IPostData, selectedSort: TSelectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state: IPostData, searchQuery: string) {
      state.searchQuery = searchQuery;
    },
    setTotalPage(state: IPostData, totalPage: number) {
      state.totalPage = totalPage;
    },
    removePost(state: IPostData, post: IPost) {
      state.posts = state.posts.filter((item) => item.id !== post.id);
    },
    createPost(state: IPostData, post: IPost) {
      state.posts = [post, ...state.posts];
    }
  },
  actions: {
    async fetchPosts({ state, commit }: ActionContext<IPostData, any>) {
      try {
        commit('setIsPostLoading', true);
        const result = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.pageNumber,
              _limit: state.limit
            }
          }
        );
        commit(
          'setTotalPage',
          Math.ceil(result.headers['x-total-count'] / state.limit)
        );

        commit('setPosts', result.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('setIsPostLoading', false);
      }
    },
    async loadMorePosts({ state, commit }: ActionContext<IPostData, any>) {
      try {
        commit('setPageNumber', state.pageNumber + 1);
        const result = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.pageNumber,
              _limit: state.limit
            }
          }
        );

        commit('setPosts', [...state.posts, ...result.data]);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
