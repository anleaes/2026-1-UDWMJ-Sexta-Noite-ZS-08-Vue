<template>
  <q-page padding class="flex flex-center">
    <div class="full-width" style="max-width: 1000px;">
      
      <div class="text-h4 q-mb-xl text-primary text-weight-bold text-center">
        Central dos apps
      </div>

      <div class="row q-col-gutter-md">
        <div v-for="link in links" :key="link.rota" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-btn
            :to="link.rota"
            color="primary"
            class="full-width q-py-lg shadow-5"
            :icon="link.icone"
            :label="link.titulo"
            stack
            push
          />
        </div>
      </div>
      
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'IndexPage',
  
  data() {
    return {
      // lista de objetos com as rotas criadas no routes.js
      links: [
        { titulo: 'alunos', rota: '/alunos', icone: 'people' },
        { titulo: 'instrutores', rota: '/instrutores', icone: 'sports' },
        { titulo: 'exercicios', rota: '/exercicios', icone: 'fitness_center' },
        { titulo: 'alimentos', rota: '/alimentos', icone: 'restaurant' },
        { titulo: 'treinos', rota: '/treinos', icone: 'list_alt' },
        { titulo: 'planos mensalidade', rota: '/planosmensalidade', icone: 'payments' },
        { titulo: 'anamneses', rota: '/anamneses', icone: 'medical_information' },
        { titulo: 'planos alimentares', rota: '/planos-alimentares', icone: 'set_meal' },
        { titulo: 'refeicoes', rota: '/refeicoes', icone: 'local_dining' }
      ]
    }
  }
}
</script>