<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
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
  fio: yup.string().required('Введите ФИО').min(3, 'ФИО должно быть длиннее 3 символов'),
  email: yup.string().required('Введите email').email('Некорректный email'),
  phone: yup.string().required('Введите телефон').min(6, 'Телефон слишком короткий'),
  address: yup.string().required('Введите адрес').min(5, 'Минимум 5 символов'),
  comment: yup.string(),
  agreement: yup.boolean().oneOf([true], 'Нужно согласиться с правилами')
})

const { errors, handleSubmit, defineField, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    fio: customer.value?.name || '',
    email: customer.value?.email || '',
    phone: '',
    address: customer.value?.address || '',
    comment: '',
    agreement: false
  }
})

const [fio, fioAttrs] = defineField('fio')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [address, addressAttrs] = defineField('address')
const [comment, commentAttrs] = defineField('comment')
const [agreement, agreementAttrs] = defineField('agreement')

const onSubmit = handleSubmit(async (values) => {
  const order = {
    user: {
      fio: values.fio,
      email: values.email,
      phone: values.phone,
      address: values.address
    },
    comment: values.comment,
    items: items.value.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity
    })),
    total: totalPrice.value
  }

  await axios.post('https://httpbin.org/post', order)

  userStore.updateAddress(values.address)
  cartStore.clearCart()
  notify('Заказ успешно оформлен', 'success')
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="form-page">
    <router-link :to="{ name: 'cart' }" class="back-link">
      Назад в корзину
    </router-link>

    <h1>Оформление заказа</h1>

    <p v-if="items.length === 0" class="empty">
      Корзина пуста.
      <router-link to="/">Перейти в каталог</router-link>
    </p>

    <template v-else>
      <div class="order-summary">
        <strong>Ваш заказ:</strong>
        <ul>
          <li v-for="item in items" :key="item.id">
            {{ item.title }} × {{ item.quantity }} —
            ${{ (item.price * item.quantity).toFixed(2) }}
          </li>
        </ul>
        <p>Итого: <strong>${{ totalPrice.toFixed(2) }}</strong></p>
      </div>

      <form class="form" @submit="onSubmit">
        <h2>Данные покупателя</h2>

        <label>
          ФИО
          <input v-model="fio" v-bind="fioAttrs" type="text" placeholder="Иванов Иван Иванович">
          <span class="error">{{ errors.fio }}</span>
        </label>

        <label>
          Email
          <input v-model="email" v-bind="emailAttrs" type="email" placeholder="mail@example.com">
          <span class="error">{{ errors.email }}</span>
        </label>

        <label>
          Телефон
          <input v-model="phone" v-bind="phoneAttrs" type="tel" placeholder="+79990000000">
          <span class="error">{{ errors.phone }}</span>
        </label>

        <label>
          Адрес доставки
          <input v-model="address" v-bind="addressAttrs" type="text" placeholder="Город, улица, дом">
          <span class="error">{{ errors.address }}</span>
        </label>

        <label>
          Комментарий к заказу
          <textarea v-model="comment" v-bind="commentAttrs" rows="3"></textarea>
        </label>

        <label class="checkbox">
          <input v-model="agreement" v-bind="agreementAttrs" type="checkbox">
          Я согласен с правилами обработки заказа
        </label>
        <span class="error">{{ errors.agreement }}</span>

        <button class="submit-button" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Оформить заказ' }}
        </button>
      </form>
    </template>
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

.empty {
  padding: 1rem 0;
}

.order-summary {
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
}

.order-summary ul {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
}

.form {
  display: grid;
  gap: 1rem;
  max-width: 650px;
}

.form h2 {
  margin-top: 1.5rem;
  margin-bottom: 0;
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
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox input {
  width: auto;
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

.submit-button:hover:not(:disabled) {
  background: #369870;
}
</style>