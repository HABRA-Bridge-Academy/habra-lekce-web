<template>
  <v-toolbar 
  inverted-scroll
  title="HABRA - Lekce">
    <div class='d-flex flex-wrap ga-3'>
      <v-btn variant="tonal" >
        <router-link  :to="{ name: 'Registrace'}"> Registrace </router-link>
      </v-btn>
      <v-btn variant="tonal" >
        <router-link  :to="{ name: 'Přihlášení'}"> Přihlášení </router-link>
      </v-btn>
    </div>
  </v-toolbar>
  <HelloWorld />
  <HelloWorld />
</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router';
  
</script>
