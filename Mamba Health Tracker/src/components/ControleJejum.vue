<template>
  <div class="p-6 bg-white rounded-lg shadow-md mt-4">
    <h2 class="text-xl font-bold mb-4">Controle de Jejum</h2>
    
    <div class="flex gap-2 mb-4">
      <button 
        v-for="opção in ['16:8', '18:6', '20:4']" 
        :key="opção"
        @click="store.janelaSelecionada = opção"
        :class="['px-3 py-1 rounded', store.janelaSelecionada === opção ? 'bg-orange-600 text-white' : 'bg-gray-200']"
      >
        {{ opção }}
      </button>
    </div>

    <div class="text-center">
      <div v-if="store.jejumAtivo" class="text-3xl font-mono mb-4 text-orange-600">
        Jejum em Andamento...
      </div>
      
      <button 
        @click="store.jejumAtivo ? store.finalizarJejum() : store.iniciarJejum()"
        :class="['w-full py-3 rounded-lg font-bold text-white transition', store.jejumAtivo ? 'bg-red-500' : 'bg-green-600']"
      >
        {{ store.jejumAtivo ? 'Finalizar Jejum' : 'Iniciar Jejum' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useHealthStore } from '../stores/health'
const store = useHealthStore() // Usando Composition API recomendada [cite: 19, 23]
</script>