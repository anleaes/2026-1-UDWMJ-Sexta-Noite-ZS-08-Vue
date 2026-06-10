<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 700px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar refeição' : 'Nova refeição' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-8">
              <q-input outlined v-model="form.nome" label="Nome da Refeição" required />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                outlined
                v-model="form.horario"
                label="Horário"
                type="time"
                stack-label
                required
              />
            </div>

            <div class="col-12">
              <q-input
                outlined
                v-model="form.descricao"
                label="Descrição"
                type="textarea"
              />
            </div>

            <div class="col-12">
              <q-select
                outlined
                v-model="form.alimentos"
                :options="opcoesAlimentos"
                emit-value
                map-options
                multiple
                use-chips
                label="Alimentos"
              />
            </div>

            <div class="col-12">
              <q-select
                outlined
                v-model="form.plano_alimentar"
                :options="opcoesPlanoAlimentar"
                emit-value
                map-options
                clearable
                label="Plano Alimentar (opcional)"
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
  name: 'RefeicaoForm',

  props: {
    aberto: Boolean,
    refeicaoEdit: {
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
        horario: '',
        descricao: '',
        alimentos: [],
        plano_alimentar: null
      },
      opcoesAlimentos: [],
      opcoesPlanoAlimentar: []
    }
  },

  watch: {
    refeicaoEdit(novoValor) {
      if (novoValor) {
        this.form = { ...novoValor }
      } else {
        this.limparForm()
      }
    }
  },

  mounted() {
    apiFetch('/alimentos/')
      .then((dados) => {
        this.opcoesAlimentos = dados.map((a) => ({ label: a.nome, value: a.id }))
      })
      .catch((error) => console.error('error fetching alimentos:', error))

    apiFetch('/planosalimentares/')
      .then((dados) => {
        this.opcoesPlanoAlimentar = dados.map((p) => ({ label: p.titulo, value: p.id }))
      })
      .catch((error) => console.error('error fetching planosalimentares:', error))
  },

  methods: {
    limparForm() {
      this.form = {
        id: null,
        nome: '',
        horario: '',
        descricao: '',
        alimentos: [],
        plano_alimentar: null
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    }
  }
}
</script>
