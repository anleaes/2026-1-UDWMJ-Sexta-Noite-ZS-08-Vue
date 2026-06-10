<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 700px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar Refeição' : 'Nova Refeição' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-8">
              <q-input outlined v-model="form.nome" label="Nome da Refeição (ex: Café da Manhã)" required />
            </div>
            <div class="col-12 col-md-4">
              <q-input outlined v-model="form.horario" label="Horário" type="time" required />
            </div>

            <div class="col-12 col-md-4">
              <q-input outlined v-model.number="form.plano_alimentar" label="ID do Plano Alimentar" type="number" />
            </div>
            
            <div class="col-12 col-md-8">
              <q-select
                outlined
                v-model="form.alimentos"
                multiple
                use-chips
                use-input
                new-value-mode="add-unique"
                label="IDs dos Alimentos"
                hint="Digite o ID do alimento e aperte Enter"
              />
            </div>

            <div class="col-12">
              <q-input
                outlined
                v-model="form.descricao"
                label="Descrição Adicional"
                type="textarea"
                rows="3"
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
        plano_alimentar: null,
        alimentos: [],
        descricao: ''
      }
    }
  },

  watch: {
    refeicaoEdit(novoValor) {
      if (novoValor) {
        // Copiamos os valores, mas garantimos que "alimentos" é um array
        this.form = { ...novoValor, alimentos: novoValor.alimentos || [] }
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
        horario: '',
        plano_alimentar: null,
        alimentos: [],
        descricao: ''
      }
    },
    salvar() {
      // O Django precisa que a lista de alimentos seja de números inteiros
      const payload = { ...this.form }
      if (payload.alimentos && payload.alimentos.length > 0) {
        payload.alimentos = payload.alimentos.map(Number)
      }
      this.$emit('salvar', payload)
      this.limparForm()
    }
  }
}
</script>