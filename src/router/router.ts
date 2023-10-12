import { defineComponent } from 'vue';
import MainPage from '../pages/MainPage.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import PostPage from '@/pages/PostPage.vue';
import PostItemPage from '@/pages/PostItemPage.vue';

interface IRoute {
  path: string;
  component: ReturnType<typeof defineComponent>;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/posts/:id',
    component: PostItemPage
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;
