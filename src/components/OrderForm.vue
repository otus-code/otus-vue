<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useCart } from '../composables/useCart'
import { useNotification } from '../composables/useNotification'

const router = useRouter()
const { items, totalPrice, clearCart } = useCart()
const { showNotification } = useNotification()

const schema = yup.object({
  fio: yup
    .string()
    .required('Введите ФИО')
    .min(3, 'ФИО должно быть длиннее 3 символов'),

  birthDate: yup
    .string()
    .required('Введите дату рождения'),

  email: yup
    .string()
    .required('Введите email')
    .email('Некорректный email'),

  phone: yup
    .string()
    .required('Введите телефон')
    .min(6, 'Телефон слишком короткий'),

  needAddress: yup
    .boolean(),

  country: yup
    .string()
    .when('needAddress', {
      is: true,
      then: (schema) => schema.required('Выберите страну'),
      otherwise: (schema) => schema
    }),

  city: yup
    .string()
    .when('needAddress', {
      is: true,
      then: (schema) => schema.required('Введите город'),
      otherwise: (schema) => schema
    }),

  street: yup
    .string()
    .when('needAddress', {
      is: true,
      then: (schema) => schema.required('Введите улицу'),
      otherwise: (schema) => schema
    }),

  house: yup
    .string()
    .when('needAddress', {
      is: true,
      then: (schema) => schema.required('Введите дом'),
      otherwise: (schema) => schema
    }),

  cardNumber: yup
    .string()
    .required('Введите номер карты')
    .min(12, 'Номер карты слишком короткий'),

  cardDate: yup
    .string()
    .required('Введите срок действия карты'),

  cardCvv: yup
    .string()
    .required('Введите CVV')
    .min(3, 'CVV должен содержать минимум 3 символа')
    .max(4, 'CVV должен содержать максимум 4 символа'),

  agreement: yup
    .boolean()
    .oneOf([true], 'Нужно согласиться с правилами')
})

const {
  errors,
  handleSubmit,
  defineField,
  isSubmitting
} = useForm({
  validationSchema: schema,
  initialValues: {
    fio: '',
    birthDate: '',
    email: '',
    phone: '',
    needAddress: false,
    country: '',
    city: '',
    street: '',
    house: '',
    cardNumber: '',
    cardDate: '',
    cardCvv: '',
    agreement: false
  }
})

const [fio, fioAttrs] = defineField('fio')
const [birthDate, birthDateAttrs] = defineField('birthDate')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [needAddress, needAddressAttrs] = defineField('needAddress')
const [country, countryAttrs] = defineField('country')
const [city, cityAttrs] = defineField('city')
const [street, streetAttrs] = defineField('street')
const [house, houseAttrs] = defineField('house')
const [cardNumber, cardNumberAttrs] = defineField('cardNumber')
const [cardDate, cardDateAttrs] = defineField('cardDate')
const [cardCvv, cardCvvAttrs] = defineField('cardCvv')
const [agreement, agreementAttrs] = defineField('agreement')

const onSubmit = handleSubmit(async (values) => {
  const order = {
    user: {
      fio: values.fio,
      birthDate: values.birthDate,
      email: values.email,
      phone: values.phone
    },
    address: values.needAddress
      ? {
          country: values.country,
          city: values.city,
          street: values.street,
          house: values.house
        }
      : null,
    payment: {
      cardNumber: values.cardNumber,
      cardDate: values.cardDate,
      cardCvv: values.cardCvv
    },
    agreement: values.agreement,
    items: items.value.map((item) => ({
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity
    })),
    total: totalPrice.value
  }

  await axios.post('https://httpbin.org/post', order)

  clearCart()
  showNotification('Заказ успешно оформлен')
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
          <li v-for="item in items" :key="item.product.id">
            {{ item.product.title }} × {{ item.quantity }} —
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </li>
        </ul>
        <p>Итого: <strong>${{ totalPrice.toFixed(2) }}</strong></p>
      </div>

      <form class="form" @submit="onSubmit">
        <h2>Данные пользователя</h2>

        <label>
          ФИО
          <input
            v-model="fio"
            v-bind="fioAttrs"
            type="text"
            placeholder="Иванов Иван Иванович"
          >
          <span class="error">{{ errors.fio }}</span>
        </label>

        <label>
          Дата рождения
          <input
            v-model="birthDate"
            v-bind="birthDateAttrs"
            type="date"
          >
          <span class="error">{{ errors.birthDate }}</span>
        </label>

        <label>
          Email
          <input
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            placeholder="mail@example.com"
          >
          <span class="error">{{ errors.email }}</span>
        </label>

        <label>
          Телефон
          <input
            v-model="phone"
            v-bind="phoneAttrs"
            type="tel"
            placeholder="+79990000000"
          >
          <span class="error">{{ errors.phone }}</span>
        </label>

        <h2>Адрес</h2>

        <label class="checkbox">
          <input
            v-model="needAddress"
            v-bind="needAddressAttrs"
            type="checkbox"
          >
          Ввести адрес доставки
        </label>

        <div v-if="needAddress" class="address-block">
          <label>
            Страна
            <select
              v-model="country"
              v-bind="countryAttrs"
            >
              <option value="">Выберите страну</option>
              <option value="Россия">Россия</option>
              <option value="Беларусь">Беларусь</option>
              <option value="Казахстан">Казахстан</option>
              <option value="Армения">Армения</option>
            </select>
            <span class="error">{{ errors.country }}</span>
          </label>

          <label>
            Город
            <input
              v-model="city"
              v-bind="cityAttrs"
              type="text"
              placeholder="Москва"
            >
            <span class="error">{{ errors.city }}</span>
          </label>

          <label>
            Улица
            <input
              v-model="street"
              v-bind="streetAttrs"
              type="text"
              placeholder="Ленина"
            >
            <span class="error">{{ errors.street }}</span>
          </label>

          <label>
            Дом
            <input
              v-model="house"
              v-bind="houseAttrs"
              type="text"
              placeholder="10"
            >
            <span class="error">{{ errors.house }}</span>
          </label>
        </div>

        <h2>Оплата</h2>

        <label>
          Номер карты
          <input
            v-model="cardNumber"
            v-bind="cardNumberAttrs"
            type="text"
            placeholder="0000 0000 0000 0000"
          >
          <span class="error">{{ errors.cardNumber }}</span>
        </label>

        <label>
          Срок действия карты
          <input
            v-model="cardDate"
            v-bind="cardDateAttrs"
            type="month"
          >
          <span class="error">{{ errors.cardDate }}</span>
        </label>

        <label>
          CVV
          <input
            v-model="cardCvv"
            v-bind="cardCvvAttrs"
            type="password"
            placeholder="123"
          >
          <span class="error">{{ errors.cardCvv }}</span>
        </label>

        <label class="checkbox">
          <input
            v-model="agreement"
            v-bind="agreementAttrs"
            type="checkbox"
          >
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
select {
  padding: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox input {
  width: auto;
}

.address-block {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
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