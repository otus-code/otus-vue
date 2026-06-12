<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { login } = useAuth()

const schema = yup.object({
  username: yup
    .string()
    .required('Введите логин'),

  password: yup
    .string()
    .required('Введите пароль')
})

const {
  errors,
  handleSubmit,
  defineField,
  isSubmitting
} = useForm({
  validationSchema: schema,
  initialValues: {
    username: '',
    password: ''
  }
})

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(() => {
  login()
  router.push(route.query.redirect || { name: 'createProduct' })
})
</script>

<template>
  <div class="login-page">
    <h1>Вход</h1>

    <form class="form" @submit="onSubmit">
      <label>
        Логин
        <input
          v-model="username"
          v-bind="usernameAttrs"
          type="text"
          placeholder="Логин"
        >
        <span class="error">{{ errors.username }}</span>
      </label>

      <label>
        Пароль
        <input
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          placeholder="Пароль"
        >
        <span class="error">{{ errors.password }}</span>
      </label>

      <button class="submit-button" type="submit" :disabled="isSubmitting">
        Войти
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 450px;
  margin: 0 auto;
}

.form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.4rem;
  font-weight: 600;
}

input {
  padding: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
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