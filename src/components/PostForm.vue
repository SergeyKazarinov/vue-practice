<template>
  <div>
    <h2>Создание поста</h2>
    <from class="form" @submit.prevent>
      <MyInput
        @input="titleInput"
        v-bind:value="post.title"
        name="title"
        class="input"
        type="text"
        placeholder="Название"
      />
      <!-- двухсторонее связывание можно реализовать как выше, используя слушатель @input и v-bind:value или использовать v-model, как ниже -->
      <MyInput
        v-model="post.body"
        name="body"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <MyButton class="btn" @click="createPost">Создать</MyButton>
    </from>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '@/components/UI/MyButton.vue';

export default defineComponent({
  components: {
    MyButton
  },
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
  },
  // Отслеживание изменения объекта. Чтобы отследить изменение каждого поля объекта используется функция handler и свойство deep
  watch: {
    post: {
      handler(newVal) {
        console.log(newVal);
      },
      deep: true
    }
  }
});
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.btn {
  align-self: end;
}
</style>
