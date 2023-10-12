<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3 Practice</div>
    <nav class="navbar__btns">
      <MyButton @click="$router.push('/')">Главная</MyButton>
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
    </nav>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<style scoped>
.navbar {
  height: 50px;
  background-color: gray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 15px;
}

.navbar__btns {
  margin-left: auto;
  display: flex;
  gap: 20px;
}
</style>
