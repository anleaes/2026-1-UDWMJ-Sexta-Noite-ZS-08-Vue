<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="text-h6">{{ alimento.nome }}</div>
      <div class="text-caption text-grey q-mb-sm">{{ alimento.calorias_por_100g }} kcal / 100g</div>

      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div class="row justify-between q-mt-xs">
          <span><strong>Proteínas:</strong> {{ alimento.proteinas_g }}g</span>
          <span><strong>Carboidratos:</strong> {{ alimento.carboidratos_g }}g</span>
        </div>
        <div class="row justify-between q-mt-xs">
          <span><strong>Gorduras:</strong> {{ alimento.gorduras_g }}g</span>
          <span><strong>Fibras:</strong> {{ alimento.fibras_g }}g</span>
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
  name: 'AlimentoCard',
  emits: ['deletar', 'editar'],
  props: {
    alimento: Object,
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.alimento.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.alimento)
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
