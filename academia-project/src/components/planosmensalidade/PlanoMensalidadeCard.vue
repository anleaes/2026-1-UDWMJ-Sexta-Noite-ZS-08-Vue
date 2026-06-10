<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="text-h6">{{ plano.nome }}</div>
        <q-badge :color="plano.ativo ? 'positive' : 'grey'" :label="plano.ativo ? 'Ativo' : 'Inativo'" />
      </div>

      <div class="text-caption text-grey q-mb-sm">{{ duracaoLabel }}</div>

      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="q-mb-xs bg-grey-9 q-pa-sm rounded-borders">
          <div class="text-caption">{{ plano.descricao }}</div>
        </div>
        <div class="text-h5 text-primary q-mt-sm text-weight-bold">
          R$ {{ Number(plano.valor).toFixed(2) }}
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
const OPCOES_VIGENCIA = {
  30: '30 dias',
  90: '90 dias',
  180: '180 dias',
  365: '365 dias',
}

export default {
  name: 'PlanoMensalidadeCard',
  emits: ['deletar', 'editar'],
  props: {
    plano: Object,
  },
  computed: {
    duracaoLabel() {
      return OPCOES_VIGENCIA[this.plano.duracao_dias] || `${this.plano.duracao_dias} dias`
    }
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
