// Composables
import { useAuthStore } from "@/stores/Auth";
import { before } from "node:test";
import path from "path";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: "podminky-ochrany-osobnich-udaju",
        name: "privacy-policy",
        component: () => import("@/views/PrivacyPolicy.vue"),
      },
      {
        path: "rocnik/:year",
        name: "year-overview",
        component: () => import("@/views/YearOverview.vue"),
        meta: {
          loggedIn: true,
        },
      },
      {
        path: "clanek/:id",
        name: "article",
        component: () => import("@/views/Article.vue"),
        meta: {
          loggedIn: true,
        },
      },
      {
        path: "rocnik/:year/clanek/:id",
        name: "lesson",
        component: () => import("@/views/Article.vue"),
        meta: {
          loggedIn: true,
        },
      },
      {
        path: "vitejte",
        name: "registered-user-info",
        component: () => import("@/views/RegisteredUserInfoblock.vue"),
        meta: {
          loggedIn: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/FocusLayout.vue"),
    children: [
      {
        path: "/prihlaseni",
        name: "login",
        component: () => import("@/views/user/LoginView.vue"),
        meta: {
          loggedOut: true,
        },
      },
      {
        path: "/odhlaseni",
        name: "logout",
        component: ()=> import ("@/views/user/LogoutView.vue")
      },
      {
        path: "/registrace",
        name: "register",
        component: () => import("@/views/user/RegisterView.vue"),
        meta: {
          loggedOut: true,
        },
      }
    ],
  },
  {
    path: "/test",
    component: () => import("@/components/LexicalViewer.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const userStore = useAuthStore();

  if (to.meta.loggedIn && !userStore.isAuthenticated) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }


  if (to.meta.loggedOut && userStore.isAuthenticated) {
    return {
      name: "home",
    };
  }

  if (to.meta.admin && !userStore.isAdmin) {
    return {
      name: "home",
    };
  }
});

export default router;
