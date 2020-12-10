const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayoutProyecto.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Proyecto.vue')
      },
      {
        path: '/informes',
        component: () => import('pages/Informes.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/index',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/scrumTeam',
        component: () => import('pages/ScrumTeam.vue')
      },
      {
        path: '/productBacklog',
        component: () => import('pages/ProductBacklog.vue')
      },
      {
        path: '/proyecto/:clave',
        component: () => import('pages/ProyectoSeleccionado.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
