<template>
  <div class="min-h-screen bg-gray-50 p-4 pb-10">
    <div class="max-w-2xl mx-auto space-y-6">
      <header class="text-center py-4">
        <h1 class="text-3xl font-black text-slate-800">MAMBA <span class="text-orange-500">HEALTH</span></h1>
      </header>

      <DashboardSemanal />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ControleJejum />
        <CalculadoraCalorias />
      </div>

      <HistoricoGeral />
    </div>
  </div>
</template>

<script setup>
import DashboardSemanal from './components/DashboardSemanal.vue'
import ControleJejum from './components/ControleJejum.vue'
import CalculadoraCalorias from './components/CalculadoraCalorias.vue'
import HistoricoGeral from './components/HistoricoGeral.vue'
</script>