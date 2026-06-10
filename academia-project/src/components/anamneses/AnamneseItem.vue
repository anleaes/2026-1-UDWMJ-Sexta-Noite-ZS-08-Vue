<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        Ficha Médica (Aluno #{{ anamnese.aluno }})
      </q-item-label>
      <q-item-label caption>
        Atualizado: {{ anamnese.ultima_atualizacao }} &nbsp;|&nbsp;
        Pressão: {{ anamnese.pressao_arterial || 'N/A' }} &nbsp;|&nbsp;
        Alergias: {{ anamnese.alergias ? 'Sim' : 'Não' }} &nbsp;|&nbsp;
        Restrições: {{ anamnese.restricoes_fisicas ? 'Sim' : 'Não' }}
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
  name: 'AnamneseItem',
  emits: ['deletar', 'editar'],
  props: {
    anamnese: {
      type: Object,
      required: true
    }
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