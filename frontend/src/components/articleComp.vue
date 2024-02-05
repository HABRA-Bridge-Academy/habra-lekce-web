<template>
    <article v-html="articleContent"></article>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { articleStoreGet, articleStore } from '@/stores/Article';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute() 
const progress = ref(false)
const articleContent = ref(null as string | null)
const articleId = (String(route.params.id))
 
async function loadArticle(id: string|null) {
    if (id == null)
        id = "65acfd0ca119d1e72324bc8c" 
    try {
        progress.value = true;
        const article = await articleStoreGet(id);
        articleContent.value = article.content
    } catch (error: any) {
    } finally {
        progress.value = false
    }
}

loadArticle(articleId)


</script>