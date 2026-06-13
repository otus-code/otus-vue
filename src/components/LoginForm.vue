<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useNotification } from '../composables/useNotification'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { notify } = useNotification()

const schema = yup.object({
  name: yup.string().required('Введите имя').min(2, 'Минимум 2 символа'),
  email: yup.string().required('Введите email').email('Некорректный email'),
  address: yup.string().required('Введите адрес').min(5, 'Минимум 5 символов')
})

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [address, addressAttrs] = defineField('address')

const onSubmit = handleSubmit((values) => {
  userStore.login(values)
  notify('Вы успешно вошли', 'success')
  const redirect = route.query.redirect || '/'
  router.push(redirect)
})
</script>

<template>
  <form class="login-form" @submit="onSubmit">
    <h2>Вход</h2>

    <div class="field">
      <label>Имя</label>
      <input v-model="name" v-bind="nameAttrs" type="text" />
      <span class="error">{{ errors.name }}</span>
    </div>

    <div class="field">
      <label>Email</label>
      <input v-model="email" v-bind="emailAttrs" type="email" />
      <span class="error">{{ errors.email }}</span>
    </div>

    <div class="field">
      <label>Адрес</label>
      <input v-model="address" v-bind="addressAttrs" type="text" />
      <span class="error">{{ errors.address }}</span>
    </div>

    <button type="submit" :disabled="isSubmitting">Войти</button>
  </form>
</template>