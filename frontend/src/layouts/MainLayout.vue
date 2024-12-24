<template>
  <v-app>
    <v-app-bar absolute height="150" flat>
    <v-spacer></v-spacer>
      <v-container class="habra-header">
        <v-row class="header-row">
          <v-col>
            <RouterLink :to="{ name: 'home' }">
              <Logo width="40px" variant="plain"></Logo>

              <h1
                class="text-white text-center font-weight-bold"
                :class="{ 'text-h4': !mobile, 'text-h5': mobile }"
              >

                Havířovská Bridžová Akademie
              </h1></RouterLink
            >
          </v-col>
          <v-col class="auth" cols="1">hello</v-col>
        </v-row>
        <v-row> 
          <v-col>
            <div>test</div>
          </v-col>
        </v-row>
        <v-btn
          icon="mdi-menu"
          @click="drawer = !drawer"
          v-show="mobile"
        ></v-btn>
      </v-container>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer absolute v-model="drawer" :temporary="mobile">
      <div class="sticky">
        <v-list class="nav-list">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            :title="userName"
            subtitle="Přihlášen"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-home"
            title="Domů"
            :to="{ name: 'home' }"
          ></v-list-item>
          <v-list-item
            v-for="year in years"
            :active="activeYear === year"
            :prepend-icon="'mdi-numeric-' + year"
            :title="year + '. Ročník'"
            :to="{ name: 'year-overview', params: { year } }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Odhlásit se"
            @click="logout"
          ></v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-main>
      <v-container class="habra-content">
        <v-row>
          <v-col>
            <RouterView></RouterView>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="habra-footer"> 
      <v-row>
        <v-col class="center">
          <span>
            &copy; {{ new Date().getFullYear() }} Bridžový Spolek Havířov
          </span>
          <router-link :to="{ name: 'privacy-policy' }"
            >Podmínky ochrany osobních údajů</router-link
          >
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script lang="ts" setup>
import Article from "@/class/article";
import { useArticleStore } from "@/stores/Article";
import { useAuthStore } from "@/stores/Auth";
import { computed, onMounted, watch } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { toast } from "@/plugins/toastify";
import Logo from "@/components/Logo.vue";

const userStore = useAuthStore();
const route = useRoute();
const progress = ref(false);
const router = useRouter();

const { mobile } = useDisplay();
const articleStore = useArticleStore();

const drawer = ref(false);

const auth = computed(() => userStore.isAuthenticated);
const user = computed(() => userStore.user);
const userName = computed(() => user.value?.fullName);

const articlesByYear = ref(null as Map<number, Article[]> | null);
const years = computed(() => [...(articlesByYear.value?.keys() ?? [])]);
const activeYear = computed(() =>
  route.params.year ? Number.parseInt(route.params.year as string) : undefined
);

onMounted(() => loadArticles());
async function loadArticles() {
  try {
    articlesByYear.value = await articleStore.getArticlesByYear();
  } catch (error: any) {
    console.error;
  } finally {
  }
}

watch(route, () => {
  if (route.name === "registered-user-info") drawer.value = false; // hide nav
});
onMounted(() => {
  if (route.name === "registered-user-info") drawer.value = false; // hide nav
});

const logout = async () => {
  try {
    progress.value = true;
    await userStore.logout();
    toast("Odhlášení proběhlo úspěšně.");
    router.push({ name: "login" });
  } catch (error: any) {
  } finally {
    progress.value = false;
  }
};
</script>

<style lang="scss" scoped>
a:has(h1) {
  text-decoration: none;
}

.v-row {
  margin: 0px;
}

.v-container {
  padding: 0px;
  max-width: 920px;
}

.header-row {
  gap: 10px;

  .v-col {
    background-color: #1b1b1e;
    color: white;
    padding: 20px;
  }

  .v-col.auth {
    aspect-ratio: 1;
  }
}

.habra-content, .habra-footer {
  border: 1px solid #1b1b1e;
}
</style>
