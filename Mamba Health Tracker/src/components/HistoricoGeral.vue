<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="p-4 bg-white rounded-xl shadow-sm border">
      <h3 class="font-bold text-gray-700 mb-3 underline">Histórico de Jejuns</h3>
      <div v-if="store.historicoJejuns.length === 0" class="text-xs text-gray-400">Nenhum registro.</div>
      <ul class="space-y-2">
        <li v-for="j in store.historicoJejuns" :key="j.id" class="text-sm flex justify-between bg-orange-50 p-2 rounded">
          <span>{{ j.data }} ({{ j.janela }})</span>
          <span class="font-bold text-orange-700">{{ j.duracao }}h</span>
        </li>
      </ul>
    </div>

    <div class="p-4 bg-white rounded-xl shadow-sm border">
      <h3 class="font-bold text-gray-700 mb-3 underline">Refeições do Dia</h3>
      <div v-if="store.refeicoesDoDia.length === 0" class="text-xs text-gray-400">Nenhum registro.</div>
      <ul class="space-y-2">
        <li v-for="r in store.refeicoesDoDia" :key="r.id" class="text-sm flex justify-between bg-green-50 p-2 rounded">
          <span>{{ r.nome }}</span>
          <span class="font-bold text-green-700">{{ r.kcal }} kcal</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useHealthStore } from '../stores/health'
const store = useHealthStore()
</script>