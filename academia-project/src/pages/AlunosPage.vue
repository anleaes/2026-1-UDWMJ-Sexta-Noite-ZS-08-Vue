<template>
  <q-page padding>
    
    <div class="text-h4 q-mb-md text-primary text-weight-bold text-center">
      Alunos matriculados
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
      <div v-for="a in alunos" :key="a.id" class="col-12 col-sm-6 col-md-4">
        <AlunoCard 
          @deletar="deletarAluno" 
          @editar="abrirEdicao"
          :aluno="a" 
        />
      </div>
    </div>

    <q-list v-else bordered separator class="rounded-borders bg-dark">
      <AlunoItem 
        @deletar="deletarAluno" 
        @editar="abrirEdicao"
        v-for="a in alunos" 
        :key="a.id" 
        :aluno="a" 
      />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" class="shadow-4" @click="abrirCadastro" />
    </q-page-sticky>

    <AlunoForm 
      :aberto="formAberto" 
      :aluno-edit="alunoSelecionado"
      @fechar="formAberto = false" 
      @salvar="salvarAluno" 
    />

  </q-page>
</template>

<script>
import AlunoItem from '../components/alunos/AlunoItem.vue'
import AlunoCard from '../components/alunos/AlunoCard.vue'
import AlunoForm from '../components/alunos/AlunoForm.vue'
import { apiFetch } from '../services/api.js' 

export default {
  name: 'AlunosPage',
  
  components: {
    AlunoItem,
    AlunoCard,
    AlunoForm
  },
  
  data() {
    return {
      alunos: [],
      modoVisualizacao: 'grade',
      formAberto: false,
      alunoSelecionado: null // armazena temporariamente o aluno a ser editado
    }
  },
  
  mounted() {
    apiFetch('/alunos/')
      .then((dados) => {
        this.alunos = dados
      })
      .catch((error) => {
        console.error('error fetching alunos:', error)
      })
  },
  
  methods: {
    // metodos de controle do modal
    abrirCadastro() {
      this.alunoSelecionado = null
      this.formAberto = true
    },
    abrirEdicao(aluno) {
      this.alunoSelecionado = aluno
      this.formAberto = true
    },

    // metodos de api
    deletarAluno(id) {
      apiFetch(`/alunos/${id}/`, { method: 'DELETE' })
        .then(() => {
          this.alunos = this.alunos.filter((a) => a.id !== id)
          this.$q.notify({ type: 'positive', message: 'aluno deletado!' })
        })
        .catch((error) => {
          console.error('error deleting aluno:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao excluir.' })
        })
    },

    salvarAluno(dados) {
      // verifica se os dados possuem id para decidir entre put e post
      if (dados.id) {
        // rotina de atualizacao (put)
        apiFetch(`/alunos/${dados.id}/`, {
          method: 'PUT',
          body: JSON.stringify(dados)
        })
        .then((alunoAtualizado) => {
          // encontra a posicao do aluno antigo e substitui pelo atualizado
          const index = this.alunos.findIndex(a => a.id === dados.id)
          if (index !== -1) {
            this.alunos[index] = alunoAtualizado
          }
          this.formAberto = false
          this.$q.notify({ type: 'positive', message: 'aluno atualizado com sucesso!' })
        })
        .catch((error) => {
          console.error('error updating aluno:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao atualizar registro.' })
        })
      } else {
        // rotina de criacao (post)
        apiFetch('/alunos/', {
          method: 'POST',
          body: JSON.stringify(dados)
        })
        .then((novoAluno) => {
          this.alunos.push(novoAluno)
          this.formAberto = false
          this.$q.notify({ type: 'positive', message: 'aluno criado com sucesso!' })
        })
        .catch((error) => {
          console.error('error saving aluno:', error)
          this.$q.notify({ type: 'negative', message: 'erro ao criar registro.' })
        })
      }
    }
  }
}
</script>