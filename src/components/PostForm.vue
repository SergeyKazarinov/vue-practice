<template>
  <div>
    <h2>Создание поста</h2>
    <from class="form" @submit.prevent>
      <input
        @input="titleInput"
        v-bind:value="post.title"
        name="title"
        class="input"
        type="text"
        placeholder="Название"
      />
      <!-- двухсторонее связывание можно реализовать как выше, используя слушатель @input и v-bind:value или использовать v-model, как ниже -->
      <input
        v-model="post.body"
        name="body"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button class="btn" @click="createPost">Создать</button>
    </from>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data(): { post: { title: string; body: string; id?: string | number } } {
    return {
      post: {
        title: '',
        body: ''
      }
    };
  },
  methods: {
    titleInput(event: Event) {
      const element = event.target as HTMLInputElement;
      this.post.title = element.value;
    },
    createPost() {
      this.post.id = Date.now();
      this.$emit('createPost', this.post);
      this.post = {
        title: '',
        body: ''
      };
    }
  }
});
</script>
<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--teal-color);
}

.btn {
  align-self: end;
  padding: 10px 15px;
  background: none;
  color: var(--teal-color);
  border: 1px solid var(--teal-color);
}
</style>
