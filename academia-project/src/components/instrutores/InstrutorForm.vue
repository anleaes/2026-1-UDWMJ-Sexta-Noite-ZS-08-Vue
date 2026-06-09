<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 800px; max-width: 90vw;">

      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar instrutor' : 'Novo instrutor' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.nome" label="Nome" required />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.sobrenome" label="Sobrenome" required />
            </div>

            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.email" label="E-mail" type="email" required />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined v-model="form.telefone" label="Número de telefone" mask="(##) #####-####" unmasked-value required />
            </div>

            <div class="col-12 col-md-4">
              <q-input outlined v-model="form.cpf" label="CPF" mask="###.###.###-##" unmasked-value required />
            </div>
            <div class="col-12 col-md-4">
              <q-input outlined v-model="form.data_nascimento" label="Data de nascimento" type="date" stack-label required />
            </div>
            <div class="col-12 col-md-4">
              <q-input outlined v-model="form.cref" label="CREF" hint="Exemplo: 000000-G/RS" required />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                outlined
                v-model="form.especialidade"
                :options="opcoesEspecialidade"
                emit-value
                map-options
                label="Especialidade"
                required
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input outlined v-model="form.salario" label="Salário (R$)" type="number" step="0.01" required />
            </div>
            <div class="col-12 col-md-3">
              <q-input outlined v-model="form.data_admissao" label="Data de admissão" type="date" stack-label required />
            </div>
          </div>

          <div class="row justify-end q-mt-md q-gutter-sm">
            <q-btn flat label="cancelar" color="negative" @click="$emit('fechar')" />
            <q-btn type="submit" label="salvar" color="primary" />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'InstrutorForm',

  props: {
    aberto: Boolean,
    instrutorEdit: {
      type: Object,
      default: null,
    },
  },

  emits: ['fechar', 'salvar'],

  data() {
    return {
      form: {
        id: null,
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        cpf: '',
        data_nascimento: '',
        cref: '',
        especialidade: '',
        salario: null,
        data_admissao: '',
      },
      opcoesEspecialidade: [
        { label: 'Musculação', value: 'MUSC' },
        { label: 'Treinamento Funcional', value: 'FUNC' },
        { label: 'Pilates', value: 'PILA' },
        { label: 'Cross Training', value: 'CROS' },
        { label: 'Dança / Ritmos', value: 'DANC' },
        { label: 'Artes Marciais', value: 'LUTA' },
        { label: 'Natação', value: 'NATA' },
        { label: 'Ginástica Geral', value: 'GERA' },
      ],
    }
  },

  watch: {
    instrutorEdit(novoValor) {
      if (novoValor) {
        this.form = { ...novoValor }
      } else {
        this.limparForm()
      }
    },
  },

  methods: {
    limparForm() {
      this.form = {
        id: null,
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        cpf: '',
        data_nascimento: '',
        cref: '',
        especialidade: '',
        salario: null,
        data_admissao: '',
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    },
  },
}
</script>
