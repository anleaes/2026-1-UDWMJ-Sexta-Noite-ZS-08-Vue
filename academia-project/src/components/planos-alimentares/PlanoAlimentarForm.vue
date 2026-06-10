<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 700px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar Plano Alimentar' : 'Novo Plano Alimentar' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-8">
              <q-input outlined v-model="form.titulo" label="Título do Plano" required />
            </div>
            <div class="col-12 col-md-4">
              <q-input outlined v-model.number="form.aluno" label="ID do Aluno" type="number" required />
            </div>

            <div class="col-12 col-md-8">
              <q-input outlined v-model="form.objetivo" label="Objetivo" required />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                outlined
                v-model.number="form.calorias_diarias"
                label="Calorias Diárias"
                type="number"
                required
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.data_inicio" label="Data de Início" type="date" required />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.data_fim" label="Data de Fim (Opcional)" type="date" />
            </div>

            <div class="col-12">
              <q-input
                outlined
                v-model="form.descricao"
                label="Descrição / Refeições"
                type="textarea"
                rows="4"
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
  name: 'PlanoAlimentarForm',

  props: {
    aberto: Boolean,
    planoEdit: {
      type: Object,
      default: null
    }
  },

  emits: ['fechar', 'salvar'],

  data() {
    return {
      form: {
        id: null,
        aluno: null,
        titulo: '',
        descricao: '',
        objetivo: '',
        data_inicio: '',
        data_fim: null,
        calorias_diarias: null
      }
    }
  },

  watch: {
    planoEdit(novoValor) {
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
        aluno: null,
        titulo: '',
        descricao: '',
        objetivo: '',
        data_inicio: '',
        data_fim: null,
        calorias_diarias: null
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    }
  }
}
</script>