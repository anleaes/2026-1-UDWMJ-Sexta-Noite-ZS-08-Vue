<template>
  <q-item clickable class="q-pa-md">

    <q-item-section>
      <q-item-label class="text-weight-bold text-h6">
        {{ alimento.nome }}
      </q-item-label>
      <q-item-label caption>
        {{ alimento.calorias_por_100g }} kcal/100g &nbsp;|&nbsp;
        Prot: {{ alimento.proteinas_g }}g &nbsp;|&nbsp;
        Carb: {{ alimento.carboidratos_g }}g &nbsp;|&nbsp;
        Gord: {{ alimento.gorduras_g }}g &nbsp;|&nbsp;
        Fibr: {{ alimento.fibras_g }}g
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
  name: 'AlimentoItem',
  emits: ['deletar', 'editar'],
  props: {
    alimento: {
      type: Object,
      required: true
    }
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
