<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 800px; max-width: 90vw;">
      
      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar aluno' : 'Novo aluno' }}</div>
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
              <q-select outlined v-model="form.genero" :options="opcoesGenero" emit-value map-options label="Gênero" required />
            </div>
            
            <div class="col-12 col-md-4">
              <q-input outlined v-model="form.peso" label="Peso (kg)" type="number" step="0.1" />
            </div>
            <div class="col-12 col-md-4">
              <q-input outlined v-model="form.altura" label="Altura (m)" type="number" step="0.01" />
            </div>
            <div class="col-12 col-md-4">
              <q-select outlined v-model="form.plano" :options="opcoesPlano" emit-value map-options label="Plano" required />
            </div>
            
            <div class="col-12">
              <q-input outlined v-model="form.objetivo" label="Objetivo" type="textarea" />
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
import { apiFetch } from '../../services/api.js'

export default {
  name: 'AlunoForm',
  
  props: {
    aberto: Boolean,
    // nova propriedade que recebe o aluno selecionado
    alunoEdit: {
      type: Object,
      default: null
    }
  },
  
  emits: ['fechar', 'salvar'],
  
  data() {
    return {
      form: {
        id: null,
        nome: '', sobrenome: '', email: '', telefone: '', cpf: '', data_nascimento: '',
        peso: null, altura: null, genero: '', objetivo: '', plano: null
      },
      opcoesGenero: [
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' },
        { label: 'Outro', value: 'O' },
        { label: 'Prefiro não informar', value: 'N' }
      ],
      opcoesPlano: []
    }
  },

  // observador para preencher o form quando clicar em editar
  watch: {
    alunoEdit(novoValor) {
      if (novoValor) {
        // copia os dados do aluno para o form desvinculando do objeto original
        this.form = { ...novoValor }
      } else {
        this.limparForm()
      }
    }
  },
  
  mounted() {
    apiFetch('/planosmensalidade/')
      .then((dados) => {
        this.opcoesPlano = dados.map((p) => {
          return { label: p.nome, value: p.id }
        })
      })
      .catch((error) => {
        console.error('error fetching planos:', error)
      })
  },
  
  methods: {
    limparForm() {
      this.form = {
        id: null, nome: '', sobrenome: '', email: '', telefone: '', cpf: '', data_nascimento: '',
        peso: null, altura: null, genero: '', objetivo: '', plano: null
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    }
  }
}
</script>