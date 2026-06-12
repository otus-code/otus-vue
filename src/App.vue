<script setup>
import AppHeader from './components/AppHeader.vue'
import { useNotification } from './composables/useNotification'

const { notification } = useNotification()
</script>

<template>
  <div class="app">
    <AppHeader />

    <main class="container">
      <div v-if="notification" class="notification">
        {{ notification }}
      </div>

      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f4f6f8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.notification {
  padding: 1rem;
  margin-bottom: 1rem;
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
  border-radius: 8px;
}
</style>