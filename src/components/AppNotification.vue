<script setup>
import { useNotification } from '../composables/useNotification'

const { notifications, remove } = useNotification()
</script>

<template>
  <div class="notifications">
    <transition-group name="notify">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="notification"
        :class="`notification--${item.type}`"
        @click="remove(item.id)"
      >
        {{ item.message }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.notification {
  padding: 12px 20px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  max-width: 320px;
}

.notification--success {
  background: #42b983;
}

.notification--error {
  background: #e74c3c;
}

.notification--info {
  background: #3498db;
}

/* Анимация появления/исчезновения */
.notify-enter-active,
.notify-leave-active {
  transition: all 0.3s ease;
}

.notify-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notify-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>