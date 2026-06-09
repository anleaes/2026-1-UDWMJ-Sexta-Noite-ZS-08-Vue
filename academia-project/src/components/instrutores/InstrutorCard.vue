<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ instrutor.nome }} {{ instrutor.sobrenome }}</div>
      <div class="text-caption text-grey">CPF: {{ instrutor.cpf }}</div>

      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="row justify-between">
          <span><strong>CREF:</strong> {{ instrutor.cref }}</span>
          <span><strong>Especialidade:</strong> {{ especialidadeLabel }}</span>
        </div>
        <div class="row justify-between q-mt-xs">
          <span><strong>Salário:</strong> R$ {{ Number(instrutor.salario).toFixed(2) }}</span>
          <span><strong>Admissão:</strong> {{ instrutor.data_admissao }}</span>
        </div>
        <div class="row q-mt-xs">
          <span><strong>E-mail:</strong> {{ instrutor.email }}</span>
        </div>
        <div class="row q-mt-xs">
          <span><strong>Telefone:</strong> {{ instrutor.telefone }}</span>
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
  name: 'InstrutorCard',
  emits: ['deletar', 'editar'],
  props: {
    instrutor: Object,
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

<style scoped>
.my-card {
  transition: transform 0.2s ease-in-out;
}
.my-card:hover {
  transform: translateY(-5px);
}
</style>
