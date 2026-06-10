<template>
  <q-page padding>

    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Planos Alimentares
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
      <div v-for="p in planos" :key="p.id" class="col-12 col-sm-6 col-md-4">
        <PlanoAlimentarCard
          @deletar="deletarPlano"
          @editar="abrirEdicao"
          :plano="p"
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <PlanoAlimentarItem
        @deletar="deletarPlano"
        @editar="abrirEdicao"
        v-for="p in planos"
        :key="p.id"
        :plano="p"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="abrirCriacao" />
    </q-page-sticky>

    <PlanoAlimentarForm
      :aberto="formAberto"
      :planoEdit="planoEdit"
      @fechar="formAberto = false"
      @salvar="salvarPlano"
    />

  </q-page>
</template>

<script>
import { apiFetch } from '../services/api.js' 
import PlanoAlimentarCard from '../components/planos-alimentares/PlanoAlimentarCard.vue'
import PlanoAlimentarItem from '../components/planos-alimentares/PlanoAlimentarItem.vue'
import PlanoAlimentarForm from '../components/planos-alimentares/PlanoAlimentarForm.vue'

export default {
  name: 'PlanosAlimentaresPage',

  components: {
    PlanoAlimentarCard,
    PlanoAlimentarItem,
    PlanoAlimentarForm
  },

  data() {
    return {
      planos: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      planoEdit: null
    }
  },

  mounted() {
    this.buscarPlanos()
  },

  methods: {
    buscarPlanos() {
      apiFetch('/planosalimentares/') 
        .then((dados) => {
          this.planos = dados
        })
        .catch((error) => {
          console.error('Erro a carregar planos:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao carregar os dados do servidor.' })
        })
    },

    abrirCriacao() {
      this.planoEdit = null
      this.formAberto = true
    },

    abrirEdicao(plano) {
      this.planoEdit = plano
      this.formAberto = true
    },

    deletarPlano(id) {
      apiFetch(`/planosalimentares/${id}/`, {
        method: 'DELETE'
      })
        .then(() => {
          this.planos = this.planos.filter((p) => p.id !== id)
          this.$q.notify({ type: 'positive', message: 'Plano alimentar excluído com sucesso!' })
        })
        .catch((error) => {
          console.error('Erro ao excluir plano:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir o registo.' })
        })
    },

    salvarPlano(dados) {
      if (dados.id) {
        apiFetch(`/planosalimentares/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados)
        })
          .then((planoAtualizado) => {
            const index = this.planos.findIndex((p) => p.id === dados.id)
            if (index !== -1) {
              this.planos[index] = planoAtualizado
            }
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Plano atualizado com sucesso!' })
          })
          .catch((error) => {
            console.error('Erro ao atualizar plano:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar o registo.' })
          })
      } else {
        apiFetch('/planosalimentares/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
          .then((novoPlano) => {
            this.planos.push(novoPlano)
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Plano criado com sucesso!' })
          })
          .catch((error) => {
            console.error('Erro ao criar plano:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar o registo.' })
          })
      }
    }
  }
}
</script>