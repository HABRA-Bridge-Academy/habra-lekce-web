<template>
    <v-list v-if="getArticlesForYear(2)">
        <v-list-item v-for="article in getArticlesForYear(2)" :title="article.title"></v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import Article from '@/class/article';
import {  useArticleStore } from '@/stores/Article';
import { computed } from 'vue';
import { onMounted, ref } from 'vue';

const progress = ref(false) 
const articlesByYear = ref(null as Map<number, Article[]> | null)

const articleStore = useArticleStore();

async function loadArticles() {
    try {
        progress.value = true;
        articlesByYear.value = await articleStore.getArticlesByYear();
        console.log("jede seznam")
    } catch (error: any) {
        console.error("nejede to")
    } finally {
        progress.value = false
    }
}
const years = computed(()=> [...articlesByYear.value?.keys() ?? []])

function getArticlesForYear(year: number) {
    const articles = articlesByYear.value?.get(year)
    if(!articles) return;
    const sorted = articles.toSorted((a,b) =>a.meta.number- b.meta.number);

    return sorted;
}


onMounted(() => loadArticles())

</script>