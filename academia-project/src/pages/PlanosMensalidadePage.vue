<template>
  <q-page padding>

    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Planos de Mensalidade
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
        <PlanoMensalidadeCard
          @deletar="deletarPlano"
          @editar="abrirEdicao"
          :plano="p"
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <PlanoMensalidadeItem
        @deletar="deletarPlano"
        @editar="abrirEdicao"
        v-for="p in planos"
        :key="p.id"
        :plano="p"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <PlanoMensalidadeForm
      :aberto="formAberto"
      :plano-edit="planoSelecionado"
      @fechar="formAberto = false"
      @salvar="salvarPlano"
    />

  </q-page>
</template>

<script>
import PlanoMensalidadeItem from '../components/planosmensalidade/PlanoMensalidadeItem.vue'
import PlanoMensalidadeCard from '../components/planosmensalidade/PlanoMensalidadeCard.vue'
import PlanoMensalidadeForm from '../components/planosmensalidade/PlanoMensalidadeForm.vue'
import { apiFetch } from '../services/api.js'

export default {
  name: 'PlanosMensalidadePage',

  components: {
    PlanoMensalidadeItem,
    PlanoMensalidadeCard,
    PlanoMensalidadeForm
  },

  data() {
    return {
      planos: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      planoSelecionado: null
    }
  },

  mounted() {
    apiFetch('/planosmensalidade/')
      .then((dados) => {
        this.planos = dados
      })
      .catch((error) => {
        console.error('error fetching planos:', error)
      })
  },

  methods: {
    abrirCadastro() {
      this.planoSelecionado = null
      this.formAberto = true
    },
    abrirEdicao(plano) {
      this.planoSelecionado = plano
      this.formAberto = true
    },

    deletarPlano(id) {
      apiFetch(`/planosmensalidade/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.planos = this.planos.filter((p) => p.id !== id)
          this.$q.notify({ type: 'positive', message: 'Plano excluído!' })
        })
        .catch((error) => {
          console.error('error deleting plano:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir.' })
        })
    },

    salvarPlano(dados) {
      if (dados.id) {
        apiFetch(`/planosmensalidade/${dados.id}/`, {
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
            console.error('error updating plano:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar registro.' })
          })
      } else {
        apiFetch('/planosmensalidade/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
          .then((novoPlano) => {
            this.planos.push(novoPlano)
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Plano criado com sucesso!' })
          })
          .catch((error) => {
            console.error('error saving plano:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar registro.' })
          })
      }
    }
  }
}
</script>
