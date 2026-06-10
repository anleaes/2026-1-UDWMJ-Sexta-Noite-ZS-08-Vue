<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ treino.nome }}</div>
      <div class="text-caption text-grey">
        aluno id: {{ treino.aluno }} | instrutor id: {{ treino.instrutor || 'nenhum' }}
      </div>
      
      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="q-mt-sm bg-grey-9 q-pa-sm rounded-borders">
          <strong>descricao:</strong> 
          <div class="text-caption q-mt-xs">{{ treino.descricao || 'sem descricao' }}</div>
        </div>
        
        <div class="row justify-between q-mt-md">
          <span><strong>duracao:</strong> {{ treino.duracao_minutos }} min</span>
          <span><strong>criado em:</strong> {{ treino.data_criacao }}</span>
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
  name: 'TreinoCard',
  
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

<style scoped>
.my-card {
  transition: transform 0.2s ease-in-out;
}
.my-card:hover {
  transform: translateY(-5px);
}
</style>