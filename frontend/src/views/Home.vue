<template>

<v-app-bar :elevation="2">

  <router-link  :to="{ name: 'test'}"> Odkaz pryc </router-link>
</v-app-bar>



  <HelloWorld />
</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router';
  
</script>
