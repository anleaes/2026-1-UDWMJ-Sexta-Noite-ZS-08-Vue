<template>
  <q-page padding>

    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Instrutores
    </div>

    <div class="row justify-end q-mb-lg">
      <q-toggles
        v-model="modoVisualizacao"
        color="primary" size="lg"
        checked-icon="view_list" unchecked-icon="grid_view"
        true-value="lista" false-value="grade"
        label="lista" left-label
      />
    </div>

    <div v-if="modoVisualizacao === 'grade'" class="row q-col-gutter-md">
      <div v-for="i in instrutores" :key="i.id" class="col-12 col-sm-6 col-md-4">
        <InstrutorCard
          @deletar="deletarInstrutor"
          @editar="abrirEdicao"
          :instrutor="i"
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <InstrutorItem
        @deletar="deletarInstrutor"
        @editar="abrirEdicao"
        v-for="i in instrutores"
        :key="i.id"
        :instrutor="i"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <InstrutorForm
      :aberto="formAberto"
      :instrutor-edit="instrutorSelecionado"
      @fechar="formAberto = false"
      @salvar="salvarInstrutor"
    />

  </q-page>
</template>

<script>
import InstrutorItem from '../components/instrutores/InstrutorItem.vue'
import InstrutorCard from '../components/instrutores/InstrutorCard.vue'
import InstrutorForm from '../components/instrutores/InstrutorForm.vue'
import { apiFetch } from '../services/api.js'

export default {
  name: 'InstrutoresPage',

  components: {
    InstrutorItem,
    InstrutorCard,
    InstrutorForm,
  },

  data() {
    return {
      instrutores: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      instrutorSelecionado: null,
    }
  },

  mounted() {
    apiFetch('/instrutores/')
      .then((dados) => {
        this.instrutores = dados
      })
      .catch((error) => {
        console.error('error fetching instrutores:', error)
      })
  },

  methods: {
    abrirCadastro() {
      this.instrutorSelecionado = null
      this.formAberto = true
    },
    abrirEdicao(instrutor) {
      this.instrutorSelecionado = instrutor
      this.formAberto = true
    },

    deletarInstrutor(id) {
      apiFetch(`/instrutores/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.instrutores = this.instrutores.filter((i) => i.id !== id)
          this.$q.notify({ type: 'positive', message: 'Instrutor excluído!' })
        })
        .catch((error) => {
          console.error('error deleting instrutor:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir.' })
        })
    },

    salvarInstrutor(dados) {
      if (dados.id) {
        apiFetch(`/instrutores/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados),
        })
          .then((instrutorAtualizado) => {
            const index = this.instrutores.findIndex((i) => i.id === dados.id)
            if (index !== -1) {
              this.instrutores[index] = instrutorAtualizado
            }
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Instrutor atualizado com sucesso!' })
          })
          .catch((error) => {
            console.error('error updating instrutor:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar registro.' })
          })
      } else {
        apiFetch('/instrutores/', {
          method: 'POST',
          body: JSON.stringify(dados),
        })
          .then((novoInstrutor) => {
            this.instrutores.push(novoInstrutor)
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Instrutor criado com sucesso!' })
          })
          .catch((error) => {
            console.error('error saving instrutor:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar registro.' })
          })
      }
    },
  },
}
</script>
