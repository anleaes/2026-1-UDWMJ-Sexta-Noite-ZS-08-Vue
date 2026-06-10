<template>
  <q-item clickable class="q-pa-md">
    
    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ treino.nome }}
      </q-item-label>
      <q-item-label caption>
        Aluno: {{ treino.aluno }} | Instrutor: {{ treino.instrutor || 'n/a' }} | Duraçãoo: {{ treino.duracao_minutos }} min
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
  name: 'TreinoItem',
  
  emits: ['deletar', 'editar'],
  
  props: {
    treino: {
      type: Object,
      required: true
    }
  },
  
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.treino.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.treino)
    }
  }
}
</script>