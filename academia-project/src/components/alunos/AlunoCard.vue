<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ aluno.nome }} {{ aluno.sobrenome }}</div>
      <div class="text-caption text-grey">CPF: {{ aluno.cpf }}</div>
      
      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="row justify-between">
          <span><strong>Gênero:</strong> {{ aluno.genero }}</span>
          <span><strong>Plano ID:</strong> {{ aluno.plano }}</span>
        </div>
        <div class="row justify-between q-mt-xs">
          <span><strong>Peso:</strong> {{ aluno.peso }}kg</span>
          <span><strong>Altura:</strong> {{ aluno.altura }}m</span>
        </div>
        <div class="row justify-between q-mt-xs">
          <span><strong>Matrícula:</strong> {{ aluno.data_matricula }}</span>
        </div>
        <div class="q-mt-sm bg-grey-9 q-pa-sm rounded-borders">
          <strong>Objetivo:</strong> 
          <div class="text-caption q-mt-xs">{{ aluno.objetivo || 'Não informado' }}</div>
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
export default {
  name: 'AlunoCard',
  emits: ['deletar', 'editar'],
  props: {
    aluno: Object,
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.aluno.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.aluno)
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