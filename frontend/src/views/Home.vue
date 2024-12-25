

<template>
  <v-row>
    <v-col>
      <h2>Domovská stránka</h2>
      <v-skeleton-loader :loading="loading" type="heading">
        <LexicalViewer :editorState="homepage?.editorState"/>
      </v-skeleton-loader>

      {{ homepage?.editorState }}
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import Homepage from '@/class/homepage';
import LexicalViewer from '@/components/LexicalViewer.vue';
import { useArticleStore } from '@/stores/Article';
import { ref, onBeforeMount, computed } from 'vue';

const store = useArticleStore();
const homepage = ref(null as Homepage | null);
const loading = computed(() => homepage.value === null);

onBeforeMount( async () => homepage.value = await store.getHomepage());

</script>
