<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'
import { useNotification } from '../composables/useNotification'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const { notify } = useNotification()

const { items, totalPrice } = storeToRefs(cartStore)
const { customer } = storeToRefs(userStore)

const schema = yup.object({
  name: yup.string().required('Введите имя').min(2, 'Минимум 2 символа'),
  email: yup.string().required('Введите email').email('Некорректный email'),
  address: yup.string().required('Введите адрес').min(5, 'Минимум 5 символов'),
  comment: yup.string()
})

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  // Подставляем данные покупателя из стора как начальные значения
  initialValues: {
    name: customer.value?.name || '',
    email: customer.value?.email || '',
    address: customer.value?.address || '',
    comment: ''
  }
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [address, addressAttrs] = defineField('address')
const [comment, commentAttrs] = defineField('comment')

const onSubmit = handleSubmit((values) => {
  // Здесь обычно отправка заказа на сервер.
  // fakestoreapi заказ не сохраняет, поэтому просто имитируем успех.
  console.log('Заказ оформлен:', {
    customer: values,
    items: items.value,
    total: totalPrice.value
  })

  // Обновим адрес покупателя, если он его поменял
  userStore.updateAddress(values.address)

  cartStore.clearCart()
  notify('Заказ успешно оформлен!', 'success')
  router.push({ name: 'home' })
})
</script>

<template>
  <form class="checkout-form" @submit="onSubmit">
    <h2>Оформление заказа</h2>

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

    <div class="field">
      <label>Комментарий к заказу</label>
      <textarea v-model="comment" v-bind="commentAttrs" rows="3"></textarea>
      <span class="error">{{ errors.comment }}</span>
    </div>

    <div class="checkout-form__total">
      Итого к оплате: <strong>{{ totalPrice.toFixed(2) }} $</strong>
    </div>

    <button type="submit" :disabled="isSubmitting || items.length === 0">
      Подтвердить заказ
    </button>
  </form>
</template>

<style scoped>
.checkout-form {
  max-width: 480px;
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

.field input,
.field textarea {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: #42b983;
}

.error {
  color: #e74c3c;
  font-size: 12px;
  min-height: 14px;
}

.checkout-form__total {
  font-size: 18px;
  padding: 12px 0;
  border-top: 1px solid #e0e0e0;
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