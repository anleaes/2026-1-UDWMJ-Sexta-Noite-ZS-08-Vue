<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ exercicio.nome }}</div>
      <div class="text-caption text-grey">Dificuldade: {{ exercicio.dificuldade }}</div>
      
      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="q-mt-sm bg-grey-9 q-pa-sm rounded-borders">
          <strong>Descrição:</strong> 
          <div class="text-caption q-mt-xs">{{ exercicio.descricao || 'Não informada' }}</div>
        </div>
        <div class="q-mt-sm bg-grey-9 q-pa-sm rounded-borders">
          <strong>Instruções:</strong> 
          <div class="text-caption q-mt-xs">{{ exercicio.instrucoes || 'Não informadas' }}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="editar" icon="edit" @click="avisarEdicao" />
      <q-btn flat color="negative" label="excluir" icon="delete" @click="avisarExclusao" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'ExercicioCard',
  
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

<style scoped>
/* animacao simples ao passar o mouse por cima do card */
.my-card {
  transition: transform 0.2s ease-in-out;
}
.my-card:hover {
  transform: translateY(-5px);
}
</style>