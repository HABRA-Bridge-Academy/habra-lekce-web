<template>
  <v-app><v-app-bar color="#1A237E" class="header" height="100">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <h1 class="text-white text-center text-h4 font-weight-bold">
        Havířovská Bridžová Akademie
      </h1>
      <v-spacer></v-spacer>
      <div v-if="!auth" class="container">
        <v-chip :to="{ name: 'register' }" text="Registrace"></v-chip>
        <v-chip :to="{ name: 'login' }" text="Přihlášení"></v-chip>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" permanent absolute v-if="auth" :title=userName>
      <v-list>  
        <v-list-item prepend-icon="mdi-view-dashboard" :title=userName></v-list-item>
        <v-list-item v-for="year in years" :active="activeYear === year" :prepend-icon="'mdi-numeric-' + year" :title="year + '. Ročník'" :to="{ name: 'year-overview', params: {  year } }"></v-list-item>
      </v-list>

      <v-list-item prepend-icon="mdi-logout" title="Odhlasit se" :to="{ name: 'logout' }"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <RouterView></RouterView>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
import Article from '@/class/article';
import { useArticleStore } from '@/stores/Article';
import { useAuthStore } from '@/stores/Auth';
import { computed, onMounted } from 'vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';


const userStore = useAuthStore()
const auth = userStore.isAuthenticated
const userName = userStore.user?.firstName.concat(" ", userStore.user?.lastName, " - Přihlášen")
const drawer = ref(true)
const route = useRoute()


const years = computed(()=> [...articlesByYear.value?.keys() ?? []])
const articlesByYear = ref(null as Map<number, Article[]> | null)

const articleStore = useArticleStore();
onMounted(loadArticles)

const activeYear = computed(() =>  route.params.year ? Number.parseInt( route.params.year as string) : undefined)

async function loadArticles() {
    try {
        articlesByYear.value = await articleStore.getArticlesByYear();
    } catch (error: any) {
        console.error
    } finally {
    }
}

</script>

<style>
.container {
  display: flex;
  gap: 15px;
}
.xy{
  background-color: bisque;
}
</style>

