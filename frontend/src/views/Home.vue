<template>
  <ArticleComp />
  <Yearcomp />
  <HelloWorld />

</template>
<script setup lang="ts">
import { ref } from 'vue';
import ArticleComp from '@/components/articleComp.vue';
import Yearcomp from '@/components/YearComp.vue';
import HelloWorld from '@/components/HelloWorld.vue'
 
 
const lekce = ref()
</script> 