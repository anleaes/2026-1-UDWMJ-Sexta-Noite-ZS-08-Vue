<template>
  <q-page padding>

    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Refeições
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
      <div v-for="r in refeicoes" :key="r.id" class="col-12 col-sm-6 col-md-4">
        <RefeicaoCard
          @deletar="deletarRefeicao"
          @editar="abrirEdicao"
          :refeicao="r"
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <RefeicaoItem
        @deletar="deletarRefeicao"
        @editar="abrirEdicao"
        v-for="r in refeicoes"
        :key="r.id"
        :refeicao="r"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="abrirCriacao" />
    </q-page-sticky>

    <RefeicaoForm
      :aberto="formAberto"
      :refeicaoEdit="refeicaoEdit"
      @fechar="formAberto = false"
      @salvar="salvarRefeicao"
    />

  </q-page>
</template>

<script>
import { apiFetch } from '../services/api.js' 
import RefeicaoCard from '../components/refeicoes/RefeicaoCard.vue'
import RefeicaoItem from '../components/refeicoes/RefeicaoItem.vue'
import RefeicaoForm from '../components/refeicoes/RefeicaoForm.vue'

export default {
  name: 'RefeicoesPage',

  components: {
    RefeicaoCard,
    RefeicaoItem,
    RefeicaoForm
  },

  data() {
    return {
      refeicoes: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      refeicaoEdit: null
    }
  },

  mounted() {
    this.buscarRefeicoes()
  },

  methods: {
    buscarRefeicoes() {
      apiFetch('/refeicoes/') 
        .then((dados) => {
          this.refeicoes = dados
        })
        .catch((error) => {
          console.error('Erro a carregar refeições:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao carregar os dados do servidor.' })
        })
    },

    abrirCriacao() {
      this.refeicaoEdit = null
      this.formAberto = true
    },

    abrirEdicao(refeicao) {
      this.refeicaoEdit = refeicao
      this.formAberto = true
    },

    deletarRefeicao(id) {
      apiFetch(`/refeicoes/${id}/`, {
        method: 'DELETE'
      })
        .then(() => {
          this.refeicoes = this.refeicoes.filter((r) => r.id !== id)
          this.$q.notify({ type: 'positive', message: 'Refeição excluída com sucesso!' })
        })
        .catch((error) => {
          console.error('Erro ao excluir refeição:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir o registo.' })
        })
    },

    salvarRefeicao(dados) {
      if (dados.id) {
        apiFetch(`/refeicoes/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados)
        })
          .then((refeicaoAtualizada) => {
            const index = this.refeicoes.findIndex((r) => r.id === dados.id)
            if (index !== -1) {
              this.refeicoes[index] = refeicaoAtualizada
            }
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Refeição atualizada com sucesso!' })
          })
          .catch((error) => {
            console.error('Erro ao atualizar refeição:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar o registo.' })
          })
      } else {
        apiFetch('/refeicoes/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
          .then((novaRefeicao) => {
            this.refeicoes.push(novaRefeicao)
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Refeição criada com sucesso!' })
          })
          .catch((error) => {
            console.error('Erro ao criar refeição:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar o registo.' })
          })
      }
    }
  }
}
</script>