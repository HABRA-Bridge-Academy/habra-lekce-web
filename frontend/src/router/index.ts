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
        name: 'frontpage',
        component: () => import('@/views/Frontpage.vue'),
      },
      {
        path: '/domu',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'podminky-ochrany-osobnich-udaju',
        name: 'privacy-policy',
        component: () => import('@/views/PrivacyPolicyView.vue'),
      },
      {
        path: 'rocnik/:year',
        name: 'year-overview',
        component: () => import('@/views/YearOverview.vue'),
        meta:{
          loggedIn: true}
      },
      {
        path: 'clanek/:id',
        name: 'article',
        component: () => import('@/views/Article.vue'),
        meta:{
          loggedIn: true}
          },
      {
        path: 'rocnik/:year/clanek/:id',
        name: 'lesson',
        component: () => import('@/views/Article.vue'),
        meta:{
          loggedIn: true}
        },
    ],
  },
  {
    path: '/prihlaseni',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    meta:{
      loggedOut: true
    }
  },  {
    path: '/odhlaseni',
    name: 'logout',
    component: () => import('@/components/Logout.vue'),
    meta:{
      loggedIn: true
    }
  },
  {
    path: '/registrace',
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
