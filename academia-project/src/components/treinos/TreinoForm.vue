<template>
  <q-dialog :model-value="aberto" persistent @update:model-value="$emit('fechar')">
    <q-card style="width: 900px; max-width: 95vw;">
      
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ form.id ? 'editar treino' : 'novo treino' }}</div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        
        <div class="text-subtitle1 text-weight-bold q-mb-sm">1. dados do treino</div>
        <div class="row q-col-gutter-sm q-mb-md">
          <div class="col-12">
            <q-input outlined v-model="form.nome" label="nome do treino" required />
          </div>
          <div class="col-12 col-md-6">
            <q-select outlined v-model="form.aluno" :options="opcoesAlunos" emit-value map-options label="selecione o aluno" required />
          </div>
          <div class="col-12 col-md-6">
            <q-select outlined v-model="form.instrutor" :options="opcoesInstrutores" emit-value map-options label="selecione o instrutor" />
          </div>
          <div class="col-12 col-md-4">
            <q-input outlined v-model="form.duracao_minutos" label="duracao (minutos)" type="number" required />
          </div>
          <div class="col-12 col-md-8">
            <q-input outlined v-model="form.descricao" label="descricao" />
          </div>
        </div>

        <q-separator class="q-my-md" />

        <div class="text-subtitle1 text-weight-bold q-mb-sm">2. adicionar exercicio</div>
        <div class="row q-col-gutter-sm q-mb-md items-center">
          <div class="col-12">
            <q-select outlined v-model="itemAtual.exercicio" :options="opcoesExercicios" emit-value map-options label="selecione um exercicio" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.series" label="series" type="number" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.repeticoes" label="repeticoes" type="number" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.carga_kg" label="carga (kg)" type="number" step="0.1" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.intervalo_segundos" label="intervalo (seg)" type="number" />
          </div>
          <div class="col-12">
            <q-btn color="positive" class="full-width text-weight-bold" label="adicionar ao carrinho" @click="adicionarAoCarrinho" />
          </div>
        </div>

        <q-separator class="q-my-md" />

        <div class="text-subtitle1 text-weight-bold q-mb-sm text-grey-8">
          <q-icon name="shopping_cart" size="sm" /> itens no treino ({{ itensCarrinho.length }})
        </div>
        
        <q-list bordered separator class="rounded-borders">
          <q-item v-if="itensCarrinho.length === 0">
            <q-item-section class="text-grey text-italic">nenhum exercicio adicionado ainda.</q-item-section>
          </q-item>
          
          <q-item v-for="(item, index) in itensCarrinho" :key="index">
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ obterNomeExercicio(item.exercicio) }}</q-item-label>
              <q-item-label caption>
                series: {{ item.series }} | rep: {{ item.repeticoes }} | carga: {{ item.carga_kg }}kg | int: {{ item.intervalo_segundos }}s
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat round color="negative" icon="delete" size="sm" @click="removerDoCarrinho(index)" />
            </q-item-section>
          </q-item>
        </q-list>

      </q-card-section>

      <q-card-actions align="center" class="bg-grey-2 q-pa-md q-gutter-y-sm column">
        <q-btn color="primary" class="full-width" label="salvar treino completo" @click="salvar" />
        <q-btn color="negative" class="full-width" label="cancelar" @click="$emit('fechar')" />
      </q-card-actions>
      
    </q-card>
  </q-dialog>
</template>

<script>
// chamando a configuracao de api para backend django
import { apiFetch } from '../../services/api.js'

export default {
  name: 'TreinoForm',
  
  // propriedades recebidas
  props: {
    aberto: Boolean,
    treinoEdit: {
      type: Object,
      default: null
    }
  },
  
  emits: ['fechar', 'salvar'],
  
  data() {
    return {
      // estrutura principal da classe treino
      form: {
        id: null, nome: '', aluno: null, instrutor: null, duracao_minutos: null, descricao: ''
      },
      // estrutura temporaria para itens
      itemAtual: {
        exercicio: null, series: null, repeticoes: null, carga_kg: null, intervalo_segundos: null
      },
      // array de associativas
      itensCarrinho: [],
      
      // select options
      opcoesAlunos: [],
      opcoesInstrutores: [],
      opcoesExercicios: []
    }
  },

  // monitora abertura do modal e preenche dados
// monitora abertura do modal e preenche dados
  watch: {
    aberto(novoValor) {
      if (novoValor && this.treinoEdit) {
        this.form = { ...this.treinoEdit }
        // correcao: buscando o id do objeto selecionado e nao do booleano
        this.carregarItensDoTreino(this.treinoEdit.id)
      } else if (novoValor) {
        this.limparForm()
      }
    }
  },

  // requisicoes base executadas ao montar
  mounted() {
    apiFetch('/alunos/').then(dados => {
      this.opcoesAlunos = dados.map(a => ({ label: `${a.nome} ${a.sobrenome}`, value: a.id }))
    })
    apiFetch('/instrutores/').then(dados => {
      this.opcoesInstrutores = dados.map(i => ({ label: `${i.nome} ${i.sobrenome}`, value: i.id }))
    })
    apiFetch('/exercicios/').then(dados => {
      this.opcoesExercicios = dados.map(e => ({ label: e.nome, value: e.id }))
    })
  },
  
  methods: {
    // busca e filtra manualmente os itens da associativa
    carregarItensDoTreino(treinoId) {
      apiFetch(`/itemtreino/?treino=${treinoId}`)
        .then((dados) => {
          // trava de seguranca no frontend para ignorar itens de outros treinos
          const itensFiltrados = dados.filter(item => item.treino === treinoId || item.treino?.id === treinoId)

          this.itensCarrinho = itensFiltrados.map(item => ({
            id: item.id,
            exercicio: item.exercicio,
            series: item.series,
            repeticoes: item.repeticoes,
            carga_kg: item.carga_kg,
            intervalo_segundos: item.intervalo_segundos
          }))
        })
        .catch((error) => {
          console.error('error fetching itens do treino:', error)
        })
    },

    // traduz id de exercicio para nome
    obterNomeExercicio(id) {
      const ex = this.opcoesExercicios.find(e => e.value === id)
      return ex ? ex.label : 'exercicio desconhecido'
    },

    // adiciona no array temporario e reseta inputs
    adicionarAoCarrinho() {
      if (!this.itemAtual.exercicio) {
        this.$q.notify({ type: 'warning', message: 'selecione um exercicio primeiro.' })
        return
      }
      this.itensCarrinho.push({ ...this.itemAtual })
      this.itemAtual = { exercicio: null, series: null, repeticoes: null, carga_kg: null, intervalo_segundos: null }
    },
    
    // exclui pelo indice
    removerDoCarrinho(index) {
      this.itensCarrinho.splice(index, 1)
    },

    // reseta formulario completo
    limparForm() {
      this.form = { id: null, nome: '', aluno: null, instrutor: null, duracao_minutos: null, descricao: '' }
      this.itensCarrinho = []
      this.itemAtual = { exercicio: null, series: null, repeticoes: null, carga_kg: null, intervalo_segundos: null }
    },

    // emite payload final para a pagina processar
    salvar() {
      if (this.itensCarrinho.length === 0) {
        this.$q.notify({ type: 'warning', message: 'adicione pelo menos um exercicio ao treino.' })
        return
      }

      const payloadCompleto = {
        treino: this.form,
        itens: this.itensCarrinho
      }

      this.$emit('salvar', payloadCompleto)
    }
  }
}
</script>