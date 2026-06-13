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
  validationSchema: schema,
  initialValues: { name: '', email: '', address: '' }
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [address, addressAttrs] = defineField('address')

const onSubmit = handleSubmit((values) => {
  userStore.login(values)
  notify('Вы успешно вошли', 'success')
  const redirect = route.query.redirect || { name: 'home' }
  router.push(redirect)
})
</script>

<template>
  <div class="login">
    <h1>Вход</h1>

    <form class="login-form" @submit="onSubmit">
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
        <label>Адрес доставки</label>
        <input v-model="address" v-bind="addressAttrs" type="text" />
        <span class="error">{{ errors.address }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Вход...' : 'Войти' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-weight: 500;
  font-size: 14px;
}

.field input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.field input:focus {
  outline: none;
  border-color: #42b983;
}

.error {
  color: #e74c3c;
  font-size: 12px;
  min-height: 14px;
}

button[type='submit'] {
  padding: 12px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}

button[type='submit']:disabled {
  background: #aaa;
  cursor: not-allowed;
}

button[type='submit']:hover:not(:disabled) {
  background: #369870;
}
</style>