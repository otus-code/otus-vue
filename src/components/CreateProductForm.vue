<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useNotification } from '../composables/useNotification'

const router = useRouter()
const { showNotification } = useNotification()

const schema = yup.object({
  title: yup
    .string()
    .required('Введите название товара')
    .min(3, 'Название слишком короткое'),

  price: yup
    .number()
    .typeError('Цена должна быть числом')
    .required('Введите цену')
    .positive('Цена должна быть больше 0'),

  description: yup
    .string()
    .required('Введите описание')
    .min(10, 'Описание должно быть длиннее 10 символов'),

  category: yup
    .string()
    .required('Выберите категорию'),

  image: yup
    .string()
    .required('Введите ссылку на изображение')
    .url('Введите корректный URL')
})

const {
  errors,
  handleSubmit,
  defineField,
  isSubmitting,
  resetForm
} = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  }
})

const [title, titleAttrs] = defineField('title')
const [price, priceAttrs] = defineField('price')
const [description, descriptionAttrs] = defineField('description')
const [category, categoryAttrs] = defineField('category')
const [image, imageAttrs] = defineField('image')

const onSubmit = handleSubmit(async (values) => {
  const newProduct = {
    title: values.title,
    price: Number(values.price),
    description: values.description,
    category: values.category,
    image: values.image
  }

  await axios.post('https://fakestoreapi.com/products', newProduct)

  resetForm()
  showNotification('Товар успешно создан')
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="form-page">
    <router-link to="/" class="back-link">
      Назад
    </router-link>

    <h1>Создание нового товара</h1>

    <form class="form" @submit="onSubmit">
      <label>
        Название товара
        <input
          v-model="title"
          v-bind="titleAttrs"
          type="text"
          placeholder="Название товара"
        >
        <span class="error">{{ errors.title }}</span>
      </label>

      <label>
        Цена
        <input
          v-model="price"
          v-bind="priceAttrs"
          type="number"
          min="0"
          step="0.01"
          placeholder="99.99"
        >
        <span class="error">{{ errors.price }}</span>
      </label>

      <label>
        Категория
        <select
          v-model="category"
          v-bind="categoryAttrs"
        >
          <option value="">Выберите категорию</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
        </select>
        <span class="error">{{ errors.category }}</span>
      </label>

      <label>
        Ссылка на изображение
        <input
          v-model="image"
          v-bind="imageAttrs"
          type="text"
          placeholder="https://example.com/image.png"
        >
        <span class="error">{{ errors.image }}</span>
      </label>

      <label>
        Описание
        <textarea
          v-model="description"
          v-bind="descriptionAttrs"
          placeholder="Описание товара"
        ></textarea>
        <span class="error">{{ errors.description }}</span>
      </label>

      <button class="submit-button" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Создание...' : 'Создать товар' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-page {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  background: #6b7280;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
}

.form {
  display: grid;
  gap: 1rem;
  max-width: 650px;
}

label {
  display: grid;
  gap: 0.4rem;
  font-weight: 600;
}

input,
select,
textarea {
  padding: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.error {
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: normal;
}

.submit-button {
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  border: none;
  background: #42b983;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>