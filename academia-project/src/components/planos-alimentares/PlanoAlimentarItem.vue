<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ plano.titulo }} (Aluno #{{ plano.aluno }})
      </q-item-label>
      <q-item-label caption>
        Objetivo: {{ plano.objetivo }} &nbsp;|&nbsp;
        Calorias: {{ plano.calorias_diarias }} kcal &nbsp;|&nbsp;
        Início: {{ plano.data_inicio }}
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
  name: 'PlanoAlimentarItem',
  emits: ['deletar', 'editar'],
  props: {
    plano: {
      type: Object,
      required: true
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