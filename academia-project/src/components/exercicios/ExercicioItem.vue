<template>
  <q-item clickable class="q-pa-md">
    
    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ exercicio.nome }}
      </q-item-label>
      <q-item-label caption>
        Dificuldade: {{ exercicio.dificuldade }}
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
  name: 'ExercicioItem',
  
  // eventos disparados para a pagina
  emits: ['deletar', 'editar'],
  
  // dados recebidos da pagina principal
  props: {
    exercicio: {
      type: Object,
      required: true
    }
  },
  
  // metodos que enviam o aviso de clique para a pagina principal
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.exercicio.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.exercicio)
    }
  }
}
</script>