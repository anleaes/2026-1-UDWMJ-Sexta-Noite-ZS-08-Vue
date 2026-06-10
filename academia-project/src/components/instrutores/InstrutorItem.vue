<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ instrutor.nome }} {{ instrutor.sobrenome }}
      </q-item-label>
      <q-item-label caption>
        CREF: {{ instrutor.cref }} | Especialidade: {{ especialidadeLabel }}
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
  name: 'InstrutorItem',
  emits: ['deletar', 'editar'],
  props: {
    instrutor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    especialidadeLabel() {
      const opcoes = {
        MUSC: 'Musculação',
        FUNC: 'Treinamento Funcional',
        PILA: 'Pilates',
        CROS: 'Cross Training',
        DANC: 'Dança / Ritmos',
        LUTA: 'Artes Marciais',
        NATA: 'Natação',
        GERA: 'Ginástica Geral',
      }
      return opcoes[this.instrutor.especialidade] || this.instrutor.especialidade
    },
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.instrutor.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.instrutor)
    },
  },
}
</script>
