// Composables
import { useAuthStore } from '@/stores/Auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'clanek/:id',
        name: 'article',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),

      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    meta:{
      loggedOut: true
    }
  },  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/components/Logout.vue'),
    meta:{
      loggedOut: false
    }
  },
  {
    path: '/registration',
    name: 'register',
    component: () => import('@/components/Registration.vue'),
    meta: {
      loggedOut: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  const userStore = useAuthStore()

  if (to.meta.loggedIn && !userStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  if (to.meta.loggedOut && userStore.isAuthenticated) {
    return {
      name: 'Home'
    }
  }

  if (to.meta.admin && !userStore.isAdmin) {
    return {
      name: 'Home'
    }
  }
})


export default router
