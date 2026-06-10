<template>
  <q-dialog :model-value="aberto" @update:model-value="$emit('fechar')">
    <q-card style="width: 700px; max-width: 80vw;">
      
      <q-card-section>
        <div class="text-h6">{{ form.id ? 'Editar exercício' : 'Novo exercício' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="salvar" class="q-gutter-md">
          
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-8">
              <q-input outlined v-model="form.nome" label="Nome do exercício" required />
            </div>
            <div class="col-12 col-md-4">
              <q-select outlined v-model="form.dificuldade" :options="opcoesDificuldade" emit-value map-options label="Dificuldade" required />
            </div>
            
            <div class="col-12">
              <q-input outlined v-model="form.descricao" label="Descrição" type="textarea" rows="3" />
            </div>
            
            <div class="col-12">
              <q-input outlined v-model="form.instrucoes" label="Instruções para execução" type="textarea" rows="3" />
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
  name: 'ExercicioForm',
  
  props: {
    aberto: Boolean,
    exercicioEdit: {
      type: Object,
      default: null
    }
  },
  
  emits: ['fechar', 'salvar'],
  
  data() {
    return {
      // mapeamento exato dos campos do diagrama para a classe exercicio
      form: {
        id: null,
        nome: '',
        descricao: '',
        instrucoes: '',
        dificuldade: ''
      },
      // definicao das opcoes de dificuldade
      opcoesDificuldade: [
        { label: 'Fácil', value: 'F' },
        { label: 'Médio', value: 'M' },
        { label: 'Díficil', value: 'D' }
      ]
    }
  },

  watch: {
    exercicioEdit(novoValor) {
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
        id: null, nome: '', descricao: '', instrucoes: '', dificuldade: ''
      }
    },
    salvar() {
      this.$emit('salvar', this.form)
      this.limparForm()
    }
  }
}
</script>