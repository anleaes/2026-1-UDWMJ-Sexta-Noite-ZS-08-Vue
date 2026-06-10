<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ plano.nome }}
        <q-badge :color="plano.ativo ? 'positive' : 'grey'" :label="plano.ativo ? 'Ativo' : 'Inativo'" class="q-ml-sm" />
      </q-item-label>
      <q-item-label caption>
        {{ duracaoLabel }} &nbsp;|&nbsp; R$ {{ Number(plano.valor).toFixed(2) }}
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
const OPCOES_VIGENCIA = {
  30: '30 dias',
  90: '90 dias',
  180: '180 dias',
  365: '365 dias',
}

export default {
  name: 'PlanoMensalidadeItem',
  emits: ['deletar', 'editar'],
  props: {
    plano: {
      type: Object,
      required: true
    }
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
