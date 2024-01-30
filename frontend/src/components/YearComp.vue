<template>
    <v-chip>ahaa</v-chip>
</template>

<script lang="ts">
import Article from '@/class/article';
import { articleStore } from '@/stores/Article';
import { onMounted, ref } from 'vue';

const progress = ref(false) 
const articleLists = ref(null as any | null)
async function loadArticles() {
    try {
        progress.value = true;
        const article = await articleStore();
        console.log("jede to")
        articleLists.value = article
    } catch (error: any) {
        console.error("nejede to")
    } finally {
        progress.value = false
    }
function  selectArticlesByMeta(year: number, number: number){
    for
}
onMounted(() => loadArticles())
}
</script>