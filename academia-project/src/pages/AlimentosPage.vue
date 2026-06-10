<template>
  <q-page padding>

    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Alimentos
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
      <div v-for="a in alimentos" :key="a.id" class="col-12 col-sm-6 col-md-4">
        <AlimentoCard
          @deletar="deletarAlimento"
          @editar="abrirEdicao"
          :alimento="a"
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <AlimentoItem
        @deletar="deletarAlimento"
        @editar="abrirEdicao"
        v-for="a in alimentos"
        :key="a.id"
        :alimento="a"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <AlimentoForm
      :aberto="formAberto"
      :alimento-edit="alimentoSelecionado"
      @fechar="formAberto = false"
      @salvar="salvarAlimento"
    />

  </q-page>
</template>

<script>
import AlimentoItem from '../components/alimentos/AlimentoItem.vue'
import AlimentoCard from '../components/alimentos/AlimentoCard.vue'
import AlimentoForm from '../components/alimentos/AlimentoForm.vue'
import { apiFetch } from '../services/api.js'

export default {
  name: 'AlimentosPage',

  components: {
    AlimentoItem,
    AlimentoCard,
    AlimentoForm
  },

  data() {
    return {
      alimentos: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      alimentoSelecionado: null
    }
  },

  mounted() {
    apiFetch('/alimentos/')
      .then((dados) => {
        this.alimentos = dados
      })
      .catch((error) => {
        console.error('error fetching alimentos:', error)
      })
  },

  methods: {
    abrirCadastro() {
      this.alimentoSelecionado = null
      this.formAberto = true
    },
    abrirEdicao(alimento) {
      this.alimentoSelecionado = alimento
      this.formAberto = true
    },

    deletarAlimento(id) {
      apiFetch(`/alimentos/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.alimentos = this.alimentos.filter((a) => a.id !== id)
          this.$q.notify({ type: 'positive', message: 'Alimento excluído!' })
        })
        .catch((error) => {
          console.error('error deleting alimento:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir.' })
        })
    },

    salvarAlimento(dados) {
      if (dados.id) {
        apiFetch(`/alimentos/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados)
        })
          .then((alimentoAtualizado) => {
            const index = this.alimentos.findIndex((a) => a.id === dados.id)
            if (index !== -1) {
              this.alimentos[index] = alimentoAtualizado
            }
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Alimento atualizado com sucesso!' })
          })
          .catch((error) => {
            console.error('error updating alimento:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar registro.' })
          })
      } else {
        apiFetch('/alimentos/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
          .then((novoAlimento) => {
            this.alimentos.push(novoAlimento)
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Alimento criado com sucesso!' })
          })
          .catch((error) => {
            console.error('error saving alimento:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar registro.' })
          })
      }
    }
  }
}
</script>
