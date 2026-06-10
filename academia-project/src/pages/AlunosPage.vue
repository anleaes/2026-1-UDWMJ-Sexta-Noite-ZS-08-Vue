<template>
  <q-page padding>
    
    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Alunos matriculados
    </div>

    <div class="row justify-end q-mb-lg">
      <q-toggle
        v-model="modoVisualizacao"
        color="primary"
        size="lg"
        checked-icon="view_list"
        unchecked-icon="grid_view"
        true-value="lista"
        false-value="grade"
        label="lista"
        left-label
      />
    </div>

    <div v-if="modoVisualizacao === 'grade'" class="row q-col-gutter-md">
      <div v-for="a in alunos" :key="a.id" class="col-12 col-sm-6 col-md-4">
        <AlunoCard 
          @deletar="deletarAluno" 
          :aluno="a" 
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <AlunoItem 
        @deletar="deletarAluno" 
        v-for="a in alunos" 
        :key="a.id" 
        :aluno="a" 
      />
    </q-list>

    <AlunoForm 
      :aberto="formAberto" 
      @fechar="formAberto = false" 
      @salvar="salvarAluno" 
    />

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="formAberto = true" />
    </q-page-sticky>

  </q-page>
</template>

<script>
// chamando os componentes pra dentro da pagina
import AlunoItem from '../components/alunos/AlunoItem.vue'
import AlunoCard from '../components/alunos/AlunoCard.vue'
import AlunoForm from '../components/alunos/AlunoForm.vue'

// backend django
import { apiFetch } from '../services/api.js' 

export default {
  name: 'AlunosPage',
  
  // declarando os componentes
  components: {
    AlunoItem,
    AlunoCard,
    AlunoForm,
  },
  
  data() {
    return {
      alunos: [],
      modoVisualizacao: 'grade',
      formAberto: false,
    }
  },
  
  // montagem da tela com os dados django
  mounted() {
    apiFetch('/alunos/')
      .then((dados) => {
        this.alunos = dados
      })
      .catch((error) => {
        console.error('Error fetching alunos:', error)
      })
  },
  
  // métodos da page
  methods: {
    deletarAluno(id) {
      apiFetch(`/alunos/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.alunos = this.alunos.filter((a) => a.id !== id)
          this.$q.notify({ type: 'positive', message: 'Aluno deletado!' }) //atualiza a pagina e retorna sucesso
        })
        .catch((error) => {
          console.error('Error deleting aluno:', error)
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir.' })
        })
    },

    salvarAluno(dados) {
      // requisição post para criar registro
      apiFetch('/alunos/', {
        method: 'POST',
        body: JSON.stringify(dados)
      })
      .then((novoAluno) => {
        // adiciona o novo registro na tela sem recarregar
        this.alunos.push(novoAluno)
        this.formAberto = false
        this.$q.notify({ type: 'positive', message: 'aluno salvo com sucesso!' })
      })
      .catch((error) => {
        console.error('error saving aluno:', error)
        this.$q.notify({ type: 'negative', message: 'erro ao salvar registro.' })
      })
    },
  },
}
</script>