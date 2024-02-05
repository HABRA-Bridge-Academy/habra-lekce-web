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
    <v-navigation-drawer height="100px" v-model="drawer" permanent v-if="auth" :title=userName>
      <v-list>
        <v-list-item prepend-icon="mdi-view-dashboard" :title=userName></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-1" title="1. Ročník"></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-2" title="2. Ročník" :to="{ name: 'year-overview', params: { number: 2 } }"></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-3" title="3. Ročník"></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-4" title="4. Ročník"></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-5" title="5. Ročník"></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-6" title="6. Ročník"></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-7" title="7. Ročník"></v-list-item>
        <v-list-item prepend-icon="mdi-numeric-8" title="8. Ročník"></v-list-item>
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
import router from '@/router';
import { useAuthStore } from '@/stores/Auth';
import { and } from '@vuelidate/validators';
import { ref } from 'vue'


const userStore = useAuthStore()
const auth = userStore.isAuthenticated
const userName = userStore.user?.firstName.concat(" ", userStore.user?.lastName, " - Přihlášen")
const drawer = ref(true)
const rail = ref(true)


</script>

<style>
.container {
  display: flex;
  gap: 15px;
}
</style>

