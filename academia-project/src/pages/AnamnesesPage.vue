<template>
  <q-page padding>

    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Fichas Médicas (Anamneses)
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
      <div v-for="a in anamneses" :key="a.id" class="col-12 col-sm-6 col-md-4">
        <AnamneseCard
          @deletar="deletarAnamnese"
          @editar="abrirEdicao"
          :anamnese="a"
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <AnamneseItem
        @deletar="deletarAnamnese"
        @editar="abrirEdicao"
        v-for="a in anamneses"
        :key="a.id"
        :anamnese="a"
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="abrirCriacao" />
    </q-page-sticky>

    <AnamneseForm
      :aberto="formAberto"
      :anamneseEdit="anamneseEdit"
      @fechar="formAberto = false"
      @salvar="salvarAnamnese"
    />

  </q-page>
</template>

<script>

import { apiFetch } from '../services/api.js' 
import AnamneseCard from '../components/anamneses/AnamneseCard.vue'
import AnamneseItem from '../components/anamneses/AnamneseItem.vue'
import AnamneseForm from '../components/anamneses/AnamneseForm.vue'

export default {
  name: 'AnamnesePage',

  components: {
    AnamneseCard,
    AnamneseItem,
    AnamneseForm
  },

  data() {
    return {
      anamneses: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      anamneseEdit: null
    }
  },

  mounted() {
    this.buscarAnamneses()
  },

  methods: {
    buscarAnamneses() {
      apiFetch('/anamneses/') 
        .then((dados) => {
          this.anamneses = dados
        })
        .catch((error) => {
          console.error('Erro a carregar anamneses:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao carregar os dados do servidor.' })
        })
    },

    abrirCriacao() {
      this.anamneseEdit = null
      this.formAberto = true
    },

    abrirEdicao(anamnese) {
      this.anamneseEdit = anamnese
      this.formAberto = true
    },

    deletarAnamnese(id) {
      apiFetch(`/anamneses/${id}/`, {
        method: 'DELETE'
      })
        .then(() => {
          
          this.anamneses = this.anamneses.filter((a) => a.id !== id)
          this.$q.notify({ type: 'positive', message: 'Anamnese excluída com sucesso!' })
        })
        .catch((error) => {
          console.error('Erro ao excluir anamnese:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir o registo.' })
        })
    },

    salvarAnamnese(dados) {
      if (dados.id) {
      
        apiFetch(`/anamneses/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados)
        })
          .then((anamneseAtualizada) => {
            const index = this.anamneses.findIndex((a) => a.id === dados.id)
            if (index !== -1) {
              this.anamneses[index] = anamneseAtualizada
            }
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Anamnese atualizada com sucesso!' })
          })
          .catch((error) => {
            console.error('Erro ao atualizar anamnese:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao atualizar o registo.' })
          })
      } else {
     
        apiFetch('/anamneses/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
          .then((novaAnamnese) => {
            this.anamneses.push(novaAnamnese)
            this.formAberto = false
            this.$q.notify({ type: 'positive', message: 'Anamnese criada com sucesso!' })
          })
          .catch((error) => {
            console.error('Erro ao criar anamnese:', error)
            this.$q.notify({ type: 'negative', message: 'Erro ao criar o registo.' })
          })
      }
    }
  }
}
</script>