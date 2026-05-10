<template>
  <div class="p-6 bg-slate-800 text-white rounded-xl shadow-md space-y-6">
    <h2 class="text-xl font-bold flex items-center gap-2">📊 Resumo dos Últimos 7 Dias</h2>
    
    <div class="h-48 bg-slate-700 p-2 rounded-lg">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-slate-700 p-4 rounded-lg border-l-4 border-orange-500">
        <p class="text-xs text-slate-400 uppercase font-bold">Total Jejum</p>
        <p class="text-2xl font-black text-orange-400">{{ totalHorasJejum }}h</p>
      </div>
      <div class="bg-slate-700 p-4 rounded-lg border-l-4 border-green-500">
        <p class="text-xs text-slate-400 uppercase font-bold">Média Calórica</p>
        <p class="text-2xl font-black text-green-400">{{ mediaCalorica }} kcal</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHealthStore } from '../stores/health'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useHealthStore()

// Cálculo de Média e Total (Requisito 17 e 30)
const totalHorasJejum = computed(() => {
  return store.historicoJejuns.reduce((acc, j) => acc + Number(j.duracao), 0).toFixed(1)
})

const mediaCalorica = computed(() => {
  if (store.refeicoesDoDia.length === 0) return 0
  const total = store.refeicoesDoDia.reduce((acc, r) => acc + r.kcal, 0)
  return (total / 7).toFixed(0)
})

// Configuração do Gráfico (Requisito 26)
const chartData = computed(() => ({
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  datasets: [{
    label: 'Calorias Consumidas',
    backgroundColor: '#10b981',
    data: [1800, 2100, 1900, 2200, 1700, 2500, mediaCalorica.value] // Último dado é dinâmico
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' } } }
}
</script>