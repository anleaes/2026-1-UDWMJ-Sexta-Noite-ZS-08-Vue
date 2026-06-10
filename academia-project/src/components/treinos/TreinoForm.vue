<template>
  <q-dialog :model-value="aberto" persistent @update:model-value="$emit('fechar')">
    <q-card style="width: 900px; max-width: 95vw;">
      
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ form.id ? 'Editar treino' : 'Novo treino' }}</div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        
        <div class="text-subtitle1 text-weight-bold q-mb-sm">1. Dados do treino</div>
        <div class="row q-col-gutter-sm q-mb-md">
          <div class="col-12">
            <q-input outlined v-model="form.nome" label="Nome do treino" required />
          </div>
          <div class="col-12 col-md-6">
            <q-select outlined v-model="form.aluno" :options="opcoesAlunos" emit-value map-options label="Selecione o aluno" required />
          </div>
          <div class="col-12 col-md-6">
            <q-select outlined v-model="form.instrutor" :options="opcoesInstrutores" emit-value map-options label="Selecione o instrutor" />
          </div>
          <div class="col-12 col-md-4">
            <q-input outlined v-model="form.duracao_minutos" label="Duração (minutos)" type="number" required />
          </div>
          <div class="col-12 col-md-8">
            <q-input outlined v-model="form.descricao" label="Descrição" />
          </div>
        </div>

        <q-separator class="q-my-md" />

        <div class="text-subtitle1 text-weight-bold q-mb-sm">2. Adicionar exercício</div>
        <div class="row q-col-gutter-sm q-mb-md items-center">
          <div class="col-12">
            <q-select outlined v-model="itemAtual.exercicio" :options="opcoesExercicios" emit-value map-options label="Selecione um exercício" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.series" label="Séries" type="number" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.repeticoes" label="Repetições" type="number" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.carga_kg" label="Carga (kg)" type="number" step="0.1" />
          </div>
          <div class="col-6 col-md-3">
            <q-input outlined v-model="itemAtual.intervalo_segundos" label="Intervalo (seg)" type="number" />
          </div>
          <div class="col-12">
            <q-btn color="positive" class="full-width text-weight-bold" label="Adicionar ao carrinho" @click="adicionarAoCarrinho" />
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
// backend django
import { apiFetch } from '../../services/api.js'

export default {
  name: 'TreinoForm',
  
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
      // cabecalho do treino
      form: {
        id: null, nome: '', aluno: null, instrutor: null, duracao_minutos: null, descricao: ''
      },
      // variavel temporaria para os inputs do carrinho
      itemAtual: {
        exercicio: null, series: null, repeticoes: null, carga_kg: null, intervalo_segundos: null
      },
      // array que armazena os itens da associativa
      itensCarrinho: [],
      
      // listas para popular os dropdowns
      opcoesAlunos: [],
      opcoesInstrutores: [],
      opcoesExercicios: []
    }
  },

  watch: {
    // limpa ou preenche os dados ao abrir o modal
    aberto(novoValor) {
      if (novoValor && this.treinoEdit) {
        this.form = { ...this.treinoEdit }
        // assumindo que o backend ja retorne os itens aninhados ao editar
        this.carregarItensDoTreino(novoValor.id);
      } else if (novoValor) {
        this.limparForm()
      }
    }
  },

  // carrega dependencias do backend
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

    carregarItensDoTreino(treinoId) {
    // Filtramos pelo ID do treino (ajuste o parâmetro conforme seu backend/DRF)
    apiFetch(`/itemtreino/?treino=${treinoId}`)
      .then((dados) => {
        // Mapeia os dados recebidos para o formato que seu carrinho entende
        this.itensCarrinho = dados.map(item => ({
          id: item.id, // Importante manter o ID para o PUT/DELETE funcionar
          exercicio: item.exercicio,
          series: item.series,
          repeticoes: item.repeticoes,
          carga_kg: item.carga_kg,
          intervalo_segundos: item.intervalo_segundos
        }));
      })
      .catch((error) => {
        console.error('Erro ao carregar itens do treino:', error);
      });
    },

    // cruza o id com a lista para mostrar o nome no carrinho
    obterNomeExercicio(id) {
      const ex = this.opcoesExercicios.find(e => e.value === id)
      return ex ? ex.label : 'exercicio desconhecido'
    },

    // logica de manipulacao do array local
    adicionarAoCarrinho() {
      if (!this.itemAtual.exercicio) {
        this.$q.notify({ type: 'warning', message: 'selecione um exercicio primeiro.' })
        return
      }
      // empurra uma copia do item atual para o array
      this.itensCarrinho.push({ ...this.itemAtual })
      
      // limpa os inputs temporarios
      this.itemAtual = { exercicio: null, series: null, repeticoes: null, carga_kg: null, intervalo_segundos: null }
    },
    
    removerDoCarrinho(index) {
      this.itensCarrinho.splice(index, 1)
    },

    limparForm() {
      this.form = { id: null, nome: '', aluno: null, instrutor: null, duracao_minutos: null, descricao: '' }
      this.itensCarrinho = []
      this.itemAtual = { exercicio: null, series: null, repeticoes: null, carga_kg: null, intervalo_segundos: null }
    },

    // empacota cabecalho e itens num payload unico
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