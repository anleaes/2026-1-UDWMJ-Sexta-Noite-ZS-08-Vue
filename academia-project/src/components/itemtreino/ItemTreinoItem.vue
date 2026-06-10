<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ nomeExercicio }}
      </q-item-label>
      <q-item-label caption>
        Treino: {{ nomeTreino }}
      </q-item-label>
      <q-item-label caption class="q-mt-xs">
        {{ item.series }}x{{ item.repeticoes }} &nbsp;|&nbsp;
        {{ item.carga_kg }}kg &nbsp;|&nbsp;
        Intervalo: {{ item.intervalo_segundos }}s
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn size="sm" flat round color="primary" icon="edit" @click="avisarEdicao" />
        <q-btn size="sm" flat round color="negative" icon="delete" @click="avisarExclusao" />
      </div>
    </q-item-section>

  </q-item>
</template>

<script>
export default {
  name: 'ItemTreinoItem',
  emits: ['deletar', 'editar'],
  props: {
    item: {
      type: Object,
      required: true
    },
    exercicios: {
      type: Array,
      default: () => []
    },
    treinos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    nomeExercicio() {
      const found = this.exercicios.find((e) => e.id === this.item.exercicio)
      return found ? found.nome : `Exercício #${this.item.exercicio}`
    },
    nomeTreino() {
      const found = this.treinos.find((t) => t.id === this.item.treino)
      return found ? found.nome : `Treino #${this.item.treino}`
    }
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.item.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.item)
    }
  }
}
</script>
