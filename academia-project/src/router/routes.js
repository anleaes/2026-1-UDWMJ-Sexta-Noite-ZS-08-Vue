const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'alunos', component: () => import('pages/AlunosPage.vue') },
      { path: 'exercicios', component: () => import('pages/ExerciciosPage.vue') },
      { path: 'treinos', component: () => import('pages/TreinosPage.vue') },
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
