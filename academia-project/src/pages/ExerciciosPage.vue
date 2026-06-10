<template>
  <q-page padding>
    
    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Lista de exercícios
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
      <div v-for="e in exercicios" :key="e.id" class="col-12 col-sm-6 col-md-4">
        <ExercicioCard 
          @deletar="deletarExercicio" 
          @editar="abrirEdicao"
          :exercicio="e" 
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <ExercicioItem 
        @deletar="deletarExercicio" 
        @editar="abrirEdicao"
        v-for="e in exercicios" 
        :key="e.id" 
        :exercicio="e" 
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <ExercicioForm 
      :aberto="formAberto" 
      :exercicio-edit="exercicioSelecionado"
      @fechar="formAberto = false" 
      @salvar="salvarExercicio" 
    />

  </q-page>
</template>

<script>
// importacao dos componentes da pasta exercicios
import ExercicioItem from '../components/exercicios/ExercicioItem.vue'
import ExercicioCard from '../components/exercicios/ExercicioCard.vue'
import ExercicioForm from '../components/exercicios/ExercicioForm.vue'
import { apiFetch } from '../services/api.js' 

export default {
  name: 'ExerciciosPage',
  
  components: {
    ExercicioItem,
    ExercicioCard,
    ExercicioForm
  },
  
  data() {
    return {
      exercicios: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      exercicioSelecionado: null
    }
  },
  
  mounted() {
    apiFetch('/exercicios/')
      .then((dados) => {
        this.exercicios = dados
      })
      .catch((error) => {
        console.error('error fetching exercicios:', error)
      })
  },
  
  methods: {
    abrirCadastro() {
      this.exercicioSelecionado = null
      this.formAberto = true
    },
    abrirEdicao(exercicio) {
      this.exercicioSelecionado = exercicio
      this.formAberto = true
    },

    deletarExercicio(id) {
      apiFetch(`/exercicios/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.exercicios = this.exercicios.filter((e) => e.id !== id)
          this.$q.notify({ type: 'positive', message: 'exercicio deletado!' })
        })
        .catch((error) => {
          console.error('error deleting exercicio:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao excluir.' })
        })
    },

    salvarExercicio(dados) {
      if (dados.id) {
        apiFetch(`/exercicios/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados)
        })
        .then((exercicioAtualizado) => {
          const index = this.exercicios.findIndex(e => e.id === dados.id)
          if (index !== -1) {
            this.exercicios[index] = exercicioAtualizado
          }
          this.formAberto = false
          this.$q.notify({ type: 'positive', message: 'exercicio atualizado!' })
        })
        .catch((error) => {
          console.error('error updating exercicio:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao atualizar.' })
        })
      } else {
        apiFetch('/exercicios/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
        .then((novoExercicio) => {
          this.exercicios.push(novoExercicio)
          this.formAberto = false
          this.$q.notify({ type: 'positive', message: 'exercicio criado!' })
        })
        .catch((error) => {
          console.error('error saving exercicio:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao criar.' })
        })
      }
    }
  }
}
</script>