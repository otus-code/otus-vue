<script setup>
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useProductsStore } from '../stores/products'
import { useNotification } from '../composables/useNotification'

const router = useRouter()
const productsStore = useProductsStore()
const { notify } = useNotification()

const schema = yup.object({
  title: yup
    .string()
    .required('Введите название товара')
    .min(3, 'Минимум 3 символа'),
  price: yup
    .number()
    .typeError('Цена должна быть числом')
    .required('Введите цену')
    .positive('Цена должна быть больше нуля'),
  description: yup
    .string()
    .required('Введите описание')
    .min(10, 'Минимум 10 символов'),
  category: yup.string().required('Введите категорию'),
  image: yup
    .string()
    .required('Введите ссылку на изображение')
    .url('Введите корректный URL')
})

const { errors, handleSubmit, defineField, isSubmitting, resetForm } = useForm({
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

const onSubmit = handleSubmit((values) => {
  const newProduct = {
    title: values.title,
    price: Number(values.price),
    description: values.description,
    category: values.category,
    image: values.image
  }

  // Добавляем товар в каталог (стейт Pinia)
  productsStore.addProduct(newProduct)

  resetForm()
  notify('Товар успешно создан', 'success')
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="form-page">
    <router-link :to="{ name: 'home' }" class="back-link">
      Назад в каталог
    </router-link>

    <h1>Добавить товар</h1>

    <form class="form" @submit="onSubmit">
      <label>
        Название
        <input
          v-model="title"
          v-bind="titleAttrs"
          type="text"
          placeholder="Например: Кроссовки Nike"
        >
        <span class="error">{{ errors.title }}</span>
      </label>

      <label>
        Цена ($)
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
        <input
          v-model="category"
          v-bind="categoryAttrs"
          type="text"
          placeholder="Например: electronics"
        >
        <span class="error">{{ errors.category }}</span>
      </label>

      <label>
        Ссылка на изображение
        <input
          v-model="image"
          v-bind="imageAttrs"
          type="url"
          placeholder="https://..."
        >
        <span class="error">{{ errors.image }}</span>
      </label>

      <label>
        Описание
        <textarea
          v-model="description"
          v-bind="descriptionAttrs"
          rows="4"
          placeholder="Подробное описание товара"
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
textarea {
  padding: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #42b983;
}

textarea {
  resize: vertical;
  min-height: 90px;
}

.error {
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: normal;
  min-height: 1rem;
}

.submit-button {
  margin-top: 0.5rem;
  padding: 0.8rem 1rem;
  border: none;
  background: #42b983;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background: #369870;
}
</style>