<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ refeicao.nome }}</div>
      <div class="text-caption text-grey q-mb-sm">Horário: {{ refeicao.horario }}</div>

      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="row justify-between q-mt-xs">
          <span><strong>Plano Alimentar (ID):</strong> {{ refeicao.plano_alimentar || 'N/A' }}</span>
        </div>
        <div class="row justify-between q-mt-xs">
          <span><strong>Alimentos (IDs):</strong> {{ refeicao.alimentos?.join(', ') || 'Nenhum' }}</span>
        </div>
        <div class="q-mt-sm text-grey-8" v-if="refeicao.descricao">
          <strong>Descrição:</strong> {{ refeicao.descricao }}
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
  name: 'RefeicaoCard',
  emits: ['deletar', 'editar'],
  props: {
    refeicao: Object,
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.refeicao.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.refeicao)
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