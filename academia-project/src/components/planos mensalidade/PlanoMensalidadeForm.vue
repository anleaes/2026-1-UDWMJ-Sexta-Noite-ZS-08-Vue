<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 600px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar plano' : 'Novo plano' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input outlined v-model="form.nome" label="Nome do Plano" required />
            </div>

            <div class="col-12">
              <q-input
                outlined
                v-model="form.descricao"
                label="Descrição"
                type="textarea"
                required
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                outlined
                v-model.number="form.valor"
                label="Valor (R$)"
                type="number"
                step="0.01"
                required
              />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                outlined
                v-model="form.duracao_dias"
                :options="opcoesVigencia"
                emit-value
                map-options
                label="Vigência"
                required
              />
            </div>

            <div class="col-12">
              <q-toggle v-model="form.ativo" label="Plano ativo" color="positive" />
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
  name: 'PlanoMensalidadeForm',

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
        nome: '',
        descricao: '',
        valor: null,
        duracao_dias: 30,
        ativo: true
      },
      opcoesVigencia: [
        { label: '30 dias', value: 30 },
        { label: '90 dias', value: 90 },
        { label: '180 dias', value: 180 },
        { label: '365 dias', value: 365 },
      ]
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
        nome: '',
        descricao: '',
        valor: null,
        duracao_dias: 30,
        ativo: true
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    }
  }
}
</script>
