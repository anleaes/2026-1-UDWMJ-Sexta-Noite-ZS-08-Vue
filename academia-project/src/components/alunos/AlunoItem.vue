<template>
  <q-item clickable class="q-pa-md">
    
    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ aluno.nome }} {{ aluno.sobrenome }}
      </q-item-label>
      <q-item-label caption>
        CPF: {{ aluno.cpf }} | Plano: {{ aluno.plano }}
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
  name: 'AlunoItem',
  emits: ['deletar', 'editar'],
  props: {
    aluno: {
      type: Object,
      required: true
    }
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