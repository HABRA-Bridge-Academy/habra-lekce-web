<template>
  <v-app>
    <v-app-bar absolute color="#1A237E" height="100" >
      <v-btn icon="mdi-menu" @click="drawer = !drawer" v-show="mobile"></v-btn>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <RouterLink :to="{ name: 'home'}">
      <h1 class="text-white text-center font-weight-bold" :class="{ 'text-h4': !mobile, 'text-h5': mobile, }">
        Havířovská Bridžová Akademie
      </h1></RouterLink>
      <v-spacer></v-spacer>
      <div v-if="!auth" class="container">
        <v-chip :to="{ name: 'register' }" text="Registrace"></v-chip>
        <v-chip :to="{ name: 'login' }" text="Přihlášení"></v-chip>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer absolute v-model="drawer" v-if="auth" :temporary="mobile" :title=userName>
      <div class="sticky">
        <v-list class="nav-list">
          <v-list-item prepend-icon="mdi-view-dashboard" :title=userName subtitle="Přihlášen"></v-list-item>
          <v-list-item prepend-icon="mdi-home" title="Domů" :to="{ name: 'home' }"></v-list-item>
          <v-list-item v-for="year in years" :active="activeYear === year" :prepend-icon="'mdi-numeric-' + year"
            :title="year + '. Ročník'" :to="{ name: 'year-overview', params: { year } }"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Odhlásit se" @click="logout"></v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <RouterView></RouterView>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <v-row>
        <v-col class="center">
          <span>
            &copy; {{ new Date().getFullYear() }} Bridžový Spolek Havířov
          </span>
          <router-link :to="{name: 'privacy-policy'}">Podmínky ochrany osobních údajů</router-link>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script lang="ts" setup>
import Article from '@/class/article';
import { useArticleStore } from '@/stores/Article';
import { useAuthStore } from '@/stores/Auth';
import { computed, onMounted } from 'vue';
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { toast } from '@/plugins/toastify'


const userStore = useAuthStore()
const auth = userStore.isAuthenticated
const userName = userStore.user?.firstName.concat(" ", userStore.user?.lastName)
const drawer = ref(true)
const route = useRoute()
const progress = ref(false)
const router = useRouter()


const { mobile } = useDisplay();


const years = computed(() => [...articlesByYear.value?.keys() ?? []])
const articlesByYear = ref(null as Map<number, Article[]> | null)

const articleStore = useArticleStore();
onMounted(loadArticles)

const activeYear = computed(() => route.params.year ? Number.parseInt(route.params.year as string) : undefined)

async function loadArticles() {
  try {
    articlesByYear.value = await articleStore.getArticlesByYear();
  } catch (error: any) {
    console.error
  } finally {
  }
}

const logout = async () => {
    try {
        progress.value = true;
        await userStore.logout( );
        toast("Odhlášení proběhlo úspěšně.")
        router.push({ name: 'login' })
        ;

    } catch (error: any) {        }
     finally {
        progress.value = false;
    }
}

</script>

<style>
.container {
  display: flex;
  gap: 15px;
}

body .v-navigation-drawer__content {
  overflow: unset;
}

.sticky {
  position: sticky;
  top: 0;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-main {
  min-height: 90%;
}

.v-footer span, .v-footer a {
  color: rgb(119, 119, 119);
  text-decoration: none;
}
</style>

