<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ refeicao.nome }}
      </q-item-label>
      <q-item-label caption>
        <q-icon name="schedule" size="xs" /> {{ refeicao.horario }}
        <span v-if="nomePlanoAlimentar"> &nbsp;|&nbsp; Plano: {{ nomePlanoAlimentar }}</span>
      </q-item-label>
      <q-item-label v-if="nomesAlimentos.length" caption class="q-mt-xs">
        <span class="text-teal">{{ nomesAlimentos.join(', ') }}</span>
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
  name: 'RefeicaoItem',
  emits: ['deletar', 'editar'],
  props: {
    refeicao: {
      type: Object,
      required: true
    },
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
