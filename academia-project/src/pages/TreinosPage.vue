<template>
  <q-page padding>
    
    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Gerenciamento de treinos
    </div>

    <div class="row justify-end q-mb-lg">
      <q-toggle
        v-model="modoVisualizacao"
        color="primary" size="lg"
        checked-icon="view_list" unchecked-icon="grid_view"
        true-value="lista" false-value="grade"
        label="lista" left-label
      />
    </div>

    <div v-if="modoVisualizacao === 'grade'" class="row q-col-gutter-md">
      <div v-for="t in treinos" :key="t.id" class="col-12 col-sm-6 col-md-4">
        <TreinoCard 
          @deletar="deletarTreino" 
          @editar="abrirEdicao"
          :treino="t" 
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <TreinoItem 
        @deletar="deletarTreino" 
        @editar="abrirEdicao"
        v-for="t in treinos" 
        :key="t.id" 
        :treino="t" 
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <TreinoForm 
      :aberto="formAberto" 
      :treino-edit="treinoSelecionado"
      @fechar="formAberto = false" 
      @salvar="salvarTreino" 
    />

  </q-page>
</template>

<script>
// chamando os componentes pra dentro da pagina
import TreinoItem from '../components/treinos/TreinoItem.vue'
import TreinoCard from '../components/treinos/TreinoCard.vue'
import TreinoForm from '../components/treinos/TreinoForm.vue'

// backend django
import { apiFetch } from '../services/api.js' 

export default {
  name: 'TreinosPage',
  
  // declarando os componentes
  components: {
    TreinoItem,
    TreinoCard,
    TreinoForm
  },
  
  data() {
    return {
      treinos: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      treinoSelecionado: null
    }
  },
  
  // montagem da tela com os dados django
  mounted() {
    apiFetch('/treinos/')
      .then((dados) => {
        this.treinos = dados
      })
      .catch((error) => {
        console.error('error fetching treinos:', error)
      })
  },
  
  // metodos da page
  methods: {
    abrirCadastro() {
      this.treinoSelecionado = null
      this.formAberto = true
    },
    abrirEdicao(treino) {
      this.treinoSelecionado = treino
      this.formAberto = true
    },

    deletarTreino(id) {
      apiFetch(`/treinos/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.treinos = this.treinos.filter((t) => t.id !== id)
          this.$q.notify({ type: 'positive', message: 'treino deletado!' })
        })
        .catch((error) => {
          console.error('error deleting treino:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao excluir.' })
        })
    },

    salvarTreino(payload) {
      const dadosTreino = payload.treino
      const itensCarrinho = payload.itens

      if (dadosTreino.id) {
        // atualizacao requer logica aninhada complexa no backend
        apiFetch(`/treinos/${dadosTreino.id}/`, {
          method: 'PUT',
          body: JSON.stringify({ ...dadosTreino, itens: itensCarrinho })
        })
        .then((treinoAtualizado) => {
          const index = this.treinos.findIndex(t => t.id === dadosTreino.id)
          if (index !== -1) {
            this.treinos[index] = treinoAtualizado
          }
          this.formAberto = false
          this.$q.notify({ type: 'positive', message: 'treino atualizado!' })
        })
        .catch((error) => {
          console.error('error updating treino:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao atualizar.' })
        })
      } else {
        // rotina de criacao em cascata (cabecalho -> associativas)
        apiFetch('/treinos/', {
          method: 'POST',
          body: JSON.stringify(dadosTreino)
        })
        .then((novoTreino) => {
          
          const promessasItens = itensCarrinho.map(item => {
            const payloadItem = {
              ...item,
              treino: novoTreino.id // amarracao da fk
            }
            return apiFetch('/itemtreino/', { 
              method: 'POST', 
              body: JSON.stringify(payloadItem) 
            })
          })

          Promise.all(promessasItens)
            .then(() => {
              this.treinos.push(novoTreino)
              this.formAberto = false
              this.$q.notify({ type: 'positive', message: 'treino e itens salvos com sucesso!' })
            })
            .catch(err => {
              console.error('erro ao salvar itens no banco', err)
              this.$q.notify({ type: 'warning', message: 'treino criado, mas houve erro ao salvar alguns exercicios.' })
            })

        })
        .catch((error) => {
          console.error('error saving treino:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao criar treino cabecalho.' })
        })
      }
    }
  }
}
</script>