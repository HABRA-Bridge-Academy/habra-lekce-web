<template>
    <v-chip>ahaa</v-chip>
</template>

<script lang="ts">
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
        console.log("jede to")
    } catch (error: any) {
        console.error("nejede to")
        console.error(error)
    } finally {
        progress.value = false
    }
}

const years = computed(()=> articlesByYear.value?.keys())

function getArticlesForYear(year: number) {
    const articles = articlesByYear.value?.get(year)
    if(!articles) return;
    const sorted = articles.toSorted(a => a.meta.number);

    return sorted;
}


onMounted(() => loadArticles())

</script>