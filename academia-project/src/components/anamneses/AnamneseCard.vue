<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">Ficha Médica - Aluno #{{ anamnese.aluno }}</div>
      <div class="text-caption text-grey q-mb-sm">Atualizado em: {{ anamnese.ultima_atualizacao }}</div>

      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="row justify-between q-mt-xs">
          <span><strong>Pressão:</strong> {{ anamnese.pressao_arterial || 'N/A' }}</span>
          <span><strong>Fumante:</strong> {{ anamnese.fumante ? 'Sim' : 'Não' }}</span>
        </div>
       
        <div class="row justify-between q-mt-xs">
          <span><strong>Diabetes:</strong> {{ anamnese.diabetes ? 'Sim' : 'Não' }}</span>
          <span><strong>Prob. Cardíacos:</strong> {{ anamnese.problemas_cardiacos ? 'Sim' : 'Não' }}</span>
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
  name: 'AnamneseCard',
  emits: ['deletar', 'editar'],
  props: {
    anamnese: Object,
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.anamnese.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.anamnese)
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