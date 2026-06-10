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
          :alimentos="alimentos"
          :planosAlimentares="planosAlimentares"
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
        :alimentos="alimentos"
        :planosAlimentares="planosAlimentares"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <RefeicaoForm
      :aberto="formAberto"
      :refeicao-edit="refeicaoSelecionada"
      @fechar="formAberto = false"
      @salvar="salvarRefeicao"
    />

  </q-page>
</template>

<script>
import RefeicaoItem from '../components/refeicoes/RefeicaoItem.vue'
import RefeicaoCard from '../components/refeicoes/RefeicaoCard.vue'
import RefeicaoForm from '../components/refeicoes/RefeicaoForm.vue'
import { apiFetch } from '../services/api.js'

export default {
  name: 'RefeicaosPage',

  components: {
    RefeicaoItem,
    RefeicaoCard,
    RefeicaoForm
  },

  data() {
    return {
      refeicoes: [],
      alimentos: [],
      planosAlimentares: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      refeicaoSelecionada: null
    }
  },

  mounted() {
    apiFetch('/refeicoes/')
      .then((dados) => { this.refeicoes = dados })
      .catch((error) => console.error('error fetching refeicoes:', error))

    apiFetch('/alimentos/')
      .then((dados) => { this.alimentos = dados })
      .catch((error) => console.error('error fetching alimentos:', error))

    apiFetch('/planosalimentares/')
      .then((dados) => { this.planosAlimentares = dados })
      .catch((error) => console.error('error fetching planosalimentares:', error))
  },

  methods: {
    abrirCadastro() {
      this.refeicaoSelecionada = null
      this.formAberto = true
    },
    abrirEdicao(refeicao) {
      this.refeicaoSelecionada = refeicao
      this.formAberto = true
    },

    deletarRefeicao(id) {
      apiFetch(`/refeicoes/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.refeicoes = this.refeicoes.filter((r) => r.id !== id)
          this.$q.notify({ type: 'positive', message: 'Refeição excluída!' })
        })
        .catch((error) => {
          console.error('error deleting refeicao:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir.' })
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
            console.error('error updating refeicao:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar registro.' })
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
            console.error('error saving refeicao:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar registro.' })
          })
      }
    }
  }
}
</script>
