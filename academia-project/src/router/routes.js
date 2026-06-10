const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'alunos', component: () => import('pages/AlunosPage.vue') },
      { path: 'instrutores', component: () => import('pages/InstrutoresPage.vue') },
      { path: 'exercicios', component: () => import('pages/ExerciciosPage.vue') },
      { path: 'alimentos', component: () => import('pages/AlimentosPage.vue') },
      { path: 'treinos', component: () => import('pages/TreinosPage.vue') },
      { path: 'planosmensalidade', component: () => import('pages/PlanosMensalidadePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
