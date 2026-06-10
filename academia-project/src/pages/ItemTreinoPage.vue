<template>
  <q-page padding>

    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Itens de Treino
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
      <div v-for="item in itensTreino" :key="item.id" class="col-12 col-sm-6 col-md-4">
        <ItemTreinoCard
          @deletar="deletarItem"
          @editar="abrirEdicao"
          :item="item"
          :exercicios="exercicios"
          :treinos="treinos"
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <ItemTreinoItem
        @deletar="deletarItem"
        @editar="abrirEdicao"
        v-for="item in itensTreino"
        :key="item.id"
        :item="item"
        :exercicios="exercicios"
        :treinos="treinos"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <ItemTreinoForm
      :aberto="formAberto"
      :item-edit="itemSelecionado"
      @fechar="formAberto = false"
      @salvar="salvarItem"
    />

  </q-page>
</template>

<script>
import ItemTreinoItem from '../components/itemtreino/ItemTreinoItem.vue'
import ItemTreinoCard from '../components/itemtreino/ItemTreinoCard.vue'
import ItemTreinoForm from '../components/itemtreino/ItemTreinoForm.vue'
import { apiFetch } from '../services/api.js'

export default {
  name: 'ItemTreinoPage',

  components: {
    ItemTreinoItem,
    ItemTreinoCard,
    ItemTreinoForm
  },

  data() {
    return {
      itensTreino: [],
      exercicios: [],
      treinos: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      itemSelecionado: null
    }
  },

  mounted() {
    apiFetch('/itemtreino/')
      .then((dados) => { this.itensTreino = dados })
      .catch((error) => console.error('error fetching itenstreino:', error))

    apiFetch('/exercicios/')
      .then((dados) => { this.exercicios = dados })
      .catch((error) => console.error('error fetching exercicios:', error))

    apiFetch('/treinos/')
      .then((dados) => { this.treinos = dados })
      .catch((error) => console.error('error fetching treinos:', error))
  },

  methods: {
    abrirCadastro() {
      this.itemSelecionado = null
      this.formAberto = true
    },
    abrirEdicao(item) {
      this.itemSelecionado = item
      this.formAberto = true
    },

    deletarItem(id) {
      apiFetch(`/itemtreino/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.itensTreino = this.itensTreino.filter((i) => i.id !== id)
          this.$q.notify({ type: 'positive', message: 'Item excluído!' })
        })
        .catch((error) => {
          console.error('error deleting item:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir.' })
        })
    },

    salvarItem(dados) {
      if (dados.id) {
        apiFetch(`/itemtreino/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados)
        })
          .then((itemAtualizado) => {
            const index = this.itensTreino.findIndex((i) => i.id === dados.id)
            if (index !== -1) {
              this.itensTreino[index] = itemAtualizado
            }
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Item atualizado com sucesso!' })
          })
          .catch((error) => {
            console.error('error updating item:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar registro.' })
          })
      } else {
        apiFetch('/itemtreino/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
          .then((novoItem) => {
            this.itensTreino.push(novoItem)
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Item criado com sucesso!' })
          })
          .catch((error) => {
            console.error('error saving item:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar registro.' })
          })
      }
    }
  }
}
</script>
