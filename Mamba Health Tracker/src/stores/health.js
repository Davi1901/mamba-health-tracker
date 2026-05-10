import { defineStore } from 'pinia'

export const useHealthStore = defineStore('health', {
  state: () => ({
    // Módulo de Jejum [cite: 6]
    jejumAtivo: JSON.parse(localStorage.getItem('jejumAtivo')) || false,
    inicioJejum: localStorage.getItem('inicioJejum') || null,
    janelaSelecionada: localStorage.getItem('janelaSelecionada') || '16:8',
    historicoJejuns: JSON.parse(localStorage.getItem('historicoJejuns')) || [],

    // Módulo de Nutrição [cite: 11]
    metaCalorica: 2000,
    refeicoesDoDia: JSON.parse(localStorage.getItem('refeicoesDoDia')) || []
  }),

  actions: {
    iniciarJejum() {
      this.jejumAtivo = true
      this.inicioJejum = new Date().toISOString()
      this.saveToLocal()
    },

    finalizarJejum() {
      if (!this.inicioJejum) return
      const fim = new Date()
      const inicio = new Date(this.inicioJejum)
      
      // Cálculo matemático de horas [cite: 30]
      const diffMs = fim - inicio
      const totalHoras = (diffMs / (1000 * 60 * 60)).toFixed(1)

      this.historicoJejuns.unshift({
        id: Date.now(),
        data: inicio.toLocaleDateString(),
        duracao: totalHoras,
        janela: this.janelaSelecionada
      })

      this.jejumAtivo = false
      this.inicioJejum = null
      this.saveToLocal()
    },

    adicionarRefeicao(nome, kcal) {
      this.refeicoesDoDia.unshift({
        id: Date.now(),
        nome,
        kcal: Number(kcal),
        data: new Date().toLocaleTimeString()
      })
      this.saveToLocal()
    },

    saveToLocal() {
      localStorage.setItem('jejumAtivo', JSON.stringify(this.jejumAtivo))
      localStorage.setItem('inicioJejum', this.inicioJejum || '')
      localStorage.setItem('janelaSelecionada', this.janelaSelecionada)
      localStorage.setItem('historicoJejuns', JSON.stringify(this.historicoJejuns))
      localStorage.setItem('refeicoesDoDia', JSON.stringify(this.refeicoesDoDia))
    }
  }
})