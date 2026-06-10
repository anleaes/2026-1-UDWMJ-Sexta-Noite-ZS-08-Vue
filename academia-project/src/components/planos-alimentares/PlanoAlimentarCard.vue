<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ plano.titulo }}</div>
      <div class="text-caption text-grey q-mb-sm">Aluno #{{ plano.aluno }}</div>

      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="row justify-between q-mt-xs">
          <span><strong>Objetivo:</strong> {{ plano.objetivo }}</span>
          <span><strong>Calorias:</strong> {{ plano.calorias_diarias }} kcal</span>
        </div>
       
        <div class="row justify-between q-mt-xs text-grey-8">
          <span><strong>Início:</strong> {{ plano.data_inicio }}</span>
          <span><strong>Fim:</strong> {{ plano.data_fim || 'Não definido' }}</span>
        </div>
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
  name: 'PlanoAlimentarCard',
  emits: ['deletar', 'editar'],
  props: {
    plano: Object,
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.plano.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.plano)
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