<template>
  <v-app-bar class="header" title="HABRA - Lekce">
    <div class='d-flex flex-wrap ga-3'>
      <v-chip :to="{ name: 'register' }" text="Registrace"></v-chip>
      <v-chip :to="{ name: 'login' }" text="Přihlášení"></v-chip>
    </div>
  </v-app-bar>
  <v-main>
    <v-container>
      <HelloWorld />
      <HelloWorld />
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router';

</script>

