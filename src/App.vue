<script setup>
import AppHeader from './components/AppHeader.vue'
import AppNotification from './components/AppNotification.vue'
</script>

<template>
  <div class="app">
    <AppHeader />

    <main class="container">
      <router-view />
    </main>

    <AppNotification />
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
  text-align: left;
}
</style>