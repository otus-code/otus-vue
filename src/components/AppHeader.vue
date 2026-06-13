<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

const { totalCount } = storeToRefs(cartStore)
const { customer, isAuthenticated } = storeToRefs(userStore)

function handleLogout() {
  userStore.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="app-header">
    <nav class="app-header__nav">
      <RouterLink :to="{ name: 'home' }" class="nav-link">Главная</RouterLink>
      <RouterLink :to="{ name: 'createProduct' }" class="nav-link">
        Добавить товар
      </RouterLink>
      <RouterLink :to="{ name: 'cart' }" class="nav-link">
        Корзина
        <span v-if="totalCount" class="cart-badge">{{ totalCount }}</span>
      </RouterLink>
    </nav>

    <div class="user-block">
      <template v-if="isAuthenticated">
        <div class="user-info">
          <span class="user-name">{{ customer.name }}</span>
          <span class="user-address">{{ customer.address }}</span>
        </div>
        <button class="logout-btn" @click="handleLogout">Выйти</button>
      </template>
      <template v-else>
        <RouterLink :to="{ name: 'login' }" class="login-link">Войти</RouterLink>
      </template>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background: #f3f4f6;
}

.nav-link.router-link-exact-active {
  color: #42b983;
  background: #ecfdf5;
}

.cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: #42b983;
  border-radius: 10px;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  text-align: right;
  line-height: 1.2;
}

.user-name {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
}

.user-address {
  font-size: 12px;
  color: #6b7280;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.logout-btn {
  padding: 0.5rem 0.9rem;
  border: none;
  border-radius: 6px;
  background: #fee2e2;
  color: #dc2626;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #fecaca;
}

.login-link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: #42b983;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}

.login-link:hover {
  background: #369870;
}

@media (max-width: 650px) {
  .app-header {
    flex-direction: column;
    align-items: stretch;
  }

  .app-header__nav {
    justify-content: center;
    flex-wrap: wrap;
  }

  .user-block {
    justify-content: space-between;
  }

  .user-info {
    text-align: left;
  }
}
</style>