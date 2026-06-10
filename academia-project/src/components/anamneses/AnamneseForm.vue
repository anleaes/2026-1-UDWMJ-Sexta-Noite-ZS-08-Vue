<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 800px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar Anamnese' : 'Nova Anamnese' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-6">
              <q-input outlined v-model.number="form.aluno" label="ID do Aluno" type="number" required />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.pressao_arterial" label="Pressão Arterial" placeholder="Ex: 120/80" />
            </div>

            <div class="col-6 col-md-3">
              <q-toggle v-model="form.problemas_cardiacos" label="Prob. Cardíacos" color="negative" />
            </div>
            <div class="col-6 col-md-3">
              <q-toggle v-model="form.cirurgias_recentes" label="Cirurgia Recente" color="negative" />
            </div>
            <div class="col-6 col-md-3">
              <q-toggle v-model="form.diabetes" label="Diabetes" color="negative" />
            </div>
            <div class="col-6 col-md-3">
              <q-toggle v-model="form.fumante" label="Fumante" color="negative" />
            </div>

            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.alergias" label="Alergias" type="textarea" rows="3" />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.restricoes_fisicas" label="Restrições Físicas" type="textarea" rows="3" />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.medicamentos_em_uso" label="Medicamentos em Uso" type="textarea" rows="3" />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.observacoes" label="Observações" type="textarea" rows="3" />
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
  name: 'AnamneseForm',

  props: {
    aberto: Boolean,
    anamneseEdit: {
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
        problemas_cardiacos: false,
        cirurgias_recentes: false,
        alergias: '',
        restricoes_fisicas: '',
        medicamentos_em_uso: '',
        pressao_arterial: '',
        diabetes: false,
        fumante: false,
        observacoes: ''
      }
    }
  },

  watch: {
    anamneseEdit(novoValor) {
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
        problemas_cardiacos: false,
        cirurgias_recentes: false,
        alergias: '',
        restricoes_fisicas: '',
        medicamentos_em_uso: '',
        pressao_arterial: '',
        diabetes: false,
        fumante: false,
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