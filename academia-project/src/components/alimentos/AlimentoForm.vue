<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 700px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar alimento' : 'Novo alimento' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input outlined v-model="form.nome" label="Nome do Alimento" required />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                outlined
                v-model.number="form.calorias_por_100g"
                label="Calorias por 100g (kcal)"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                outlined
                v-model.number="form.proteinas_g"
                label="Proteínas (g)"
                type="number"
                step="0.01"
                required
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                outlined
                v-model.number="form.carboidratos_g"
                label="Carboidratos (g)"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                outlined
                v-model.number="form.gorduras_g"
                label="Gorduras (g)"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                outlined
                v-model.number="form.fibras_g"
                label="Fibras (g)"
                type="number"
                step="0.01"
              />
            </div>
          </div>

          <div class="row justify-end q-mt-md q-gutter-sm">
            <q-btn flat label="Cancelar" color="negative" @click="$emit('fechar')" />
            <q-btn type="submit" label="Salvar" color="primary" />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AlimentoForm',

  props: {
    aberto: Boolean,
    alimentoEdit: {
      type: Object,
      default: null
    }
  },

  emits: ['fechar', 'salvar'],

  data() {
    return {
      form: {
        id: null,
        nome: '',
        calorias_por_100g: null,
        proteinas_g: null,
        carboidratos_g: null,
        gorduras_g: null,
        fibras_g: 0
      }
    }
  },

  watch: {
    alimentoEdit(novoValor) {
      if (novoValor) {
        this.form = { ...novoValor }
      } else {
        this.limparForm()
      }
    }
  },

  methods: {
    limparForm() {
      this.form = {
        id: null,
        nome: '',
        calorias_por_100g: null,
        proteinas_g: null,
        carboidratos_g: null,
        gorduras_g: null,
        fibras_g: 0
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    }
  }
}
</script>
