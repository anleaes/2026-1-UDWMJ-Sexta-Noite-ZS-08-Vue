<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 700px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar item de treino' : 'Novo item de treino' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-6">
              <q-select
                outlined
                v-model="form.treino"
                :options="opcoesTreinos"
                emit-value
                map-options
                label="Treino"
                required
              />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                outlined
                v-model="form.exercicio"
                :options="opcoesExercicios"
                emit-value
                map-options
                label="Exercício"
                required
              />
            </div>

            <div class="col-6 col-md-3">
              <q-input
                outlined
                v-model.number="form.series"
                label="Séries"
                type="number"
                min="1"
                required
              />
            </div>

            <div class="col-6 col-md-3">
              <q-input
                outlined
                v-model.number="form.repeticoes"
                label="Repetições"
                type="number"
                min="1"
                required
              />
            </div>

            <div class="col-6 col-md-3">
              <q-input
                outlined
                v-model.number="form.carga_kg"
                label="Carga (kg)"
                type="number"
                step="0.5"
                min="0"
                required
              />
            </div>

            <div class="col-6 col-md-3">
              <q-input
                outlined
                v-model.number="form.intervalo_segundos"
                label="Intervalo (seg)"
                type="number"
                min="0"
                required
              />
            </div>

            <div class="col-12">
              <q-input
                outlined
                v-model="form.observacoes"
                label="Observações"
                type="textarea"
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
import { apiFetch } from '../../services/api.js'

export default {
  name: 'ItemTreinoForm',

  props: {
    aberto: Boolean,
    itemEdit: {
      type: Object,
      default: null
    }
  },

  emits: ['fechar', 'salvar'],

  data() {
    return {
      form: {
        id: null,
        treino: null,
        exercicio: null,
        series: null,
        repeticoes: null,
        carga_kg: null,
        intervalo_segundos: null,
        observacoes: ''
      },
      opcoesTreinos: [],
      opcoesExercicios: []
    }
  },

  watch: {
    itemEdit(novoValor) {
      if (novoValor) {
        this.form = { ...novoValor }
      } else {
        this.limparForm()
      }
    }
  },

  mounted() {
    apiFetch('/treinos/')
      .then((dados) => {
        this.opcoesTreinos = dados.map((t) => ({ label: t.nome, value: t.id }))
      })
      .catch((error) => console.error('error fetching treinos:', error))

    apiFetch('/exercicios/')
      .then((dados) => {
        this.opcoesExercicios = dados.map((e) => ({ label: e.nome, value: e.id }))
      })
      .catch((error) => console.error('error fetching exercicios:', error))
  },

  methods: {
    limparForm() {
      this.form = {
        id: null,
        treino: null,
        exercicio: null,
        series: null,
        repeticoes: null,
        carga_kg: null,
        intervalo_segundos: null,
        observacoes: ''
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    }
  }
}
</script>
