

<template>
  <v-row>
    <v-col>
      <h2>Domovská stránka</h2>
      <LexicalViewer :serialized-state="homepage?.editorState" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import Homepage from '@/class/homepage';
import LexicalViewer from '@/components/LexicalViewer.vue';
import { useArticleStore } from '@/stores/Article';
import { ref, onBeforeMount } from 'vue';

const store = useArticleStore();
const homepage = ref(null as Homepage | null);

onBeforeMount( async () => homepage.value = await store.getHomepage());

</script>
