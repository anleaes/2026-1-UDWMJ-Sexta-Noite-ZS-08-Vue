<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ refeicao.nome }}
      </q-item-label>
      <q-item-label caption>
        Horário: {{ refeicao.horario }} &nbsp;|&nbsp;
        Plano: #{{ refeicao.plano_alimentar || 'N/A' }} &nbsp;|&nbsp;
        Alimentos: {{ refeicao.alimentos?.join(', ') || 'Nenhum' }}
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
  name: 'RefeicaoItem',
  emits: ['deletar', 'editar'],
  props: {
    refeicao: {
      type: Object,
      required: true
    }
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