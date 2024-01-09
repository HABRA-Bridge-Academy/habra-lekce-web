<template>
  <v-app>
    <v-app-bar color="#1A237E" class="header" height="100">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <h1 class="text-white text-center text-h4 font-weight-bold">
        Havířovská Bridžová Akademie
      </h1>
      <v-spacer></v-spacer>
      <div class="container">
        <v-chip :to="{ name: 'register' }" text="Registrace" ></v-chip>
        <v-chip :to="{ name: 'login' }" text="Přihlášení"></v-chip>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

  <v-main>
    <v-container>
      <HelloWorld />
      <HelloWorld />
    </v-container>
  </v-main>
</v-app>
</template>
<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router';
</script>
<style>
.container{
  display: flex;
  gap: 15px;
}
</style>

