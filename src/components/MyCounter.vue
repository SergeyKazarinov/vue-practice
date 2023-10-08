<template>
  <div>
    <!-- Объявление директивы клика -->
    <button v-on:click="addLike">like</button>
    <!-- запись с @ аналогично записи выше -->
    <button @click="removeLike">dislike</button>
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
