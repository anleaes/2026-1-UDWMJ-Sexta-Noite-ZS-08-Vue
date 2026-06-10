<template>
  <q-card class="my-card shadow-4 rounded-borders">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="text-h6">{{ refeicao.nome }}</div>
        <q-chip icon="schedule" color="primary" text-color="white" size="sm">
          {{ refeicao.horario }}
        </q-chip>
      </div>

      <q-separator class="q-my-sm" />

      <div class="text-subtitle2 text-weight-regular">
        <div v-if="refeicao.descricao" class="bg-grey-9 q-pa-sm rounded-borders q-mb-sm">
          <div class="text-caption">{{ refeicao.descricao }}</div>
        </div>

        <div v-if="nomesAlimentos.length" class="q-mt-xs">
          <div class="text-caption text-grey q-mb-xs"><strong>Alimentos:</strong></div>
          <div class="row q-gutter-xs">
            <q-chip
              v-for="nome in nomesAlimentos"
              :key="nome"
              size="sm"
              color="teal"
              text-color="white"
              icon="restaurant"
            >
              {{ nome }}
            </q-chip>
          </div>
        </div>

        <div v-if="nomePlanoAlimentar" class="q-mt-sm text-caption text-grey">
          <strong>Plano Alimentar:</strong> {{ nomePlanoAlimentar }}
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
  name: 'RefeicaoCard',
  emits: ['deletar', 'editar'],
  props: {
    refeicao: Object,
    alimentos: {
      type: Array,
      default: () => []
    },
    planosAlimentares: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    nomesAlimentos() {
      if (!this.refeicao.alimentos || !this.alimentos.length) return []
      return this.refeicao.alimentos.map((id) => {
        const found = this.alimentos.find((a) => a.id === id)
        return found ? found.nome : id
      })
    },
    nomePlanoAlimentar() {
      if (!this.refeicao.plano_alimentar || !this.planosAlimentares.length) return null
      const found = this.planosAlimentares.find((p) => p.id === this.refeicao.plano_alimentar)
      return found ? found.titulo : null
    }
  },
  methods: {
    avisarExclusao() {
      this.$emit('deletar', this.refeicao.id)
    },
    avisarEdicao() {
      this.$emit('editar', this.refeicao)
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
