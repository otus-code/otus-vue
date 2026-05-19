<script setup lang="ts">
import { ref } from 'vue'

// Применяем ref для реактивных данных
const homeTeam = ref('Динамо')
const awayTeam = ref('Спартак')
const homeScore = ref(3)
const awayScore = ref(2)

// Демонстрация работы с .value (Composition API)
function addGoal(team: 'home' | 'away') {
  if (team === 'home') homeScore.value++
  else awayScore.value++
}
</script>

<template>
  <div class="match">
    <h1>{{ homeTeam }} — {{ awayTeam }}</h1>
    <p class="score">{{ homeScore }} : {{ awayScore }}</p>
    <div>
      <button @click="addGoal('home')">+1 Динамо</button>
      <button @click="addGoal('away')">+1 Спартак</button>
    </div>
  </div>
</template>

<style scoped>
.match { text-align: center; margin-top: 2rem; }
.score { font-size: 2.5rem; font-weight: bold; margin: 0.5rem 0; }
button { margin: 0 0.5rem; padding: 0.5rem 1rem; cursor: pointer; }
</style>
