<template>
  <div>
    <!-- Объявление директивы клика -->
    <MyButton v-on:click="addLike">like</MyButton>
    <!-- запись с @ аналогично записи выше -->
    <MyButton @click="removeLike">dislike</MyButton>
    <div>Количество лайков {{ likes }}</div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      likes: 0
    };
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    removeLike() {
      this.likes -= 1;
    }
  }
};
</script>

<style></style>
