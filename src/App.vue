<script setup lang="ts">
import { ref } from 'vue'

const homeTeam = ref('Динамо')
const awayTeam = ref('Спартак')
const homeScore = ref(3)
const awayScore = ref(2)

function addGoal(team: 'home' | 'away') {
  if (team === 'home') homeScore.value++
  else awayScore.value++
}

// состав Динамо, Спартак
const squadDynamo = ref(['Сметанин', 'Штанюк', 'Кобелев', 'Точилин', 'Терехин'])
const squadSpartak = ref(['Черчесов', 'Хлестов', 'Цымбаларь', 'Евсеев', 'Ширко'])

const showLineup = ref(true)

const colors = ref({
  default: '#ffffff',
  hover: '#ffeb3b'
})
</script>

<template>
  <div class="match">
    <h1>{{ homeTeam }} — {{ awayTeam }}</h1>
    <p class="score">{{ homeScore }} : {{ awayScore }}</p>
    
    <div v-show="showLineup" class="lineup">
      <div class="team-players">
        <h3>{{ homeTeam }}</h3>
        <ul>
          <li v-for="playerD in squadDynamo" :key="playerD">{{ playerD }}</li>
        </ul>
      </div>
      <div class="team-players">
        <h3>{{ awayTeam }}</h3>
        <ul>
          <li v-for="playerS in squadSpartak" :key="playerS">{{ playerS }}</li>
        </ul>
      </div>
    </div>
  
    <div class="controls">
      <button @click="addGoal('home')">+1 {{ homeTeam }}</button>
      <button @click="addGoal('away')">+1 {{ awayTeam }}</button>
      
      <button 
        @click="showLineup = !showLineup"
        :style="{
          '--text-default': colors.default,
          '--text-hover': colors.hover
        }"
        class="hover-target"
      >
        {{ showLineup ? '🙈 Скрыть' : '👁️ Показать' }} составы
      </button>
    </div>
  </div>
</template>

<style scoped>
.match { 
  text-align: center; 
  margin-top: 2rem; 
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.score { 
  font-size: 2.5rem; 
  font-weight: bold; 
  margin: 0.5rem 0; 
}
.lineup {
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 2rem;
}
.team-players {
  text-align: left;
  width: 45%;
}
.team-players h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}
.team-players ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.team-players li {
  padding: 0.25rem 0;
  font-size: 0.95rem;
  border-bottom: 1px dashed #ddd;
}
.team-players li:last-child {
  border-bottom: none;
}
.controls {
  margin-top: 2rem;
}
button { 
  margin: 0 0.5rem; 
  padding: 0.5rem 1rem; 
  cursor: pointer;
  background: #42b983;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
}
button:hover {
  background: #35966a;
}

.hover-target {
  color: var(--text-default);
  transition: color 0.3s ease;
}

.hover-target:hover {
  color: var(--text-hover);
}
</style>