import { defineComponent } from 'vue';
import MainPage from '../pages/MainPage.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import PostPage from '@/pages/PostPage.vue';
import PostItemPage from '@/pages/PostItemPage.vue';
import PostPageWithStore from '@/pages/PostPageWithStore.vue';

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
    path: '/store',
    component: PostPageWithStore
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
