<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ nomeExercicio }}</div>
      <div class="text-caption text-grey q-mb-sm">Treino: {{ nomeTreino }}</div>

      <q-separator class="q-my-sm" />

      <div class="row q-col-gutter-sm text-center q-mt-xs">
        <div class="col-3">
          <div class="text-h5 text-primary text-weight-bold">{{ item.series }}</div>
          <div class="text-caption text-grey">Séries</div>
        </div>
        <div class="col-3">
          <div class="text-h5 text-primary text-weight-bold">{{ item.repeticoes }}</div>
          <div class="text-caption text-grey">Reps</div>
        </div>
        <div class="col-3">
          <div class="text-h5 text-primary text-weight-bold">{{ item.carga_kg }}</div>
          <div class="text-caption text-grey">kg</div>
        </div>
        <div class="col-3">
          <div class="text-h5 text-primary text-weight-bold">{{ item.intervalo_segundos }}</div>
          <div class="text-caption text-grey">seg</div>
        </div>
      </div>

      <div v-if="item.observacoes" class="bg-grey-9 q-pa-sm rounded-borders q-mt-sm">
        <div class="text-caption"><strong>Obs:</strong> {{ item.observacoes }}</div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Editar" icon="edit" @click="avisarEdicao" />
      <q-btn flat color="negative" label="Excluir" icon="delete" @click="avisarExclusao" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'ItemTreinoCard',
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

<style scoped>
.my-card {
  transition: transform 0.2s ease-in-out;
}
.my-card:hover {
  transform: translateY(-5px);
}
</style>
