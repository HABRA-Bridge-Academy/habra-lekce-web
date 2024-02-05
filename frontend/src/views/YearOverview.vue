<template>
    <h2>{{ year }}. Ročník</h2>
    <v-list v-if="getArticlesForYear(year)">
        <v-list-item v-for="article in getArticlesForYear(year)" :title="article.title" :to="{ name: 'article', params: {id: article.id}}"></v-list-item>
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

const year = 2; // TODO get from route

async function loadArticles() {
    try {
        progress.value = true;
        articlesByYear.value = await articleStore.getArticlesByYear();
    } catch (error: any) {
        console.error
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