<template>
    <article v-html="articleContent"></article>
    {{ articleList }}
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { articleStoreGet, articleStore } from '@/stores/Article';
import { onMounted } from 'vue';

const articleList = articleStore()
console.log(articleList)

const progress = ref(false)
const articleContent = ref(null as string | null)


async function loadArticle(id: string) {
    try {
        progress.value = true;
        const article = await articleStoreGet(id);
        articleContent.value = article.content
    } catch (error: any) {
    } finally {
        progress.value = false
    }
}
onMounted(() => loadArticle("65acfd0ca119d1e72324bc7e"))


</script>