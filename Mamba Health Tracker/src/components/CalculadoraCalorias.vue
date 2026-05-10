<template>
  <div class="p-6 bg-white rounded-xl shadow-md border border-gray-100">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">🍎 Módulo de Nutrição</h2>
    
    <div class="mb-6">
      <div class="flex justify-between text-sm mb-1 font-medium">
        <span class="text-gray-500">Progresso das Calorias</span>
        <span :class="totalConsumido > store.metaCalorica ? 'text-red-500' : 'text-green-600'">
          {{ totalConsumido }} / {{ store.metaCalorica }} kcal
        </span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div 
          class="h-full transition-all duration-700 ease-out" 
          :class="totalConsumido > store.metaCalorica ? 'bg-red-500' : 'bg-green-500'"
          :style="{ width: Math.min((totalConsumido / store.metaCalorica) * 100, 100) + '%' }"
        ></div>
      </div>
    </div>

    <form @submit.prevent="salvar" class="flex flex-col gap-3">
      <input v-model="nome" type="text" placeholder="Nome da refeição" class="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500" required />
      <input v-model.number="kcal" type="number" placeholder="Kcal" class="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500" required />
      <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-orange-200">
        Registrar Refeição
      </button>
    </form>
    
    <div class="mt-6 border-t pt-4">
      <h3 class="text-sm font-bold text-gray-700 mb-2">Refeições de Hoje</h3>
      <ul class="space-y-2 max-h-40 overflow-y-auto">
        <li v-for="ref in store.refeicoesDoDia" :key="ref.id" class="flex justify-between text-sm bg-gray-50 p-2 rounded">
          <span>{{ ref.nome }}</span>
          <span class="font-bold">{{ ref.kcal }} kcal</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHealthStore } from '../stores/health'

const store = useHealthStore()
const nome = ref('')
const kcal = ref(null)

const totalConsumido = computed(() => {
  return store.refeicoesDoDia.reduce((acc, item) => acc + item.kcal, 0)
})

const salvar = () => {
  store.adicionarRefeicao(nome.value, kcal.value)
  nome.value = ''
  kcal.value = null
}
</script>